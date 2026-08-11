import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import pg from 'pg';
import { SEED_PRODUCTS } from '../src/data/products';

// ============================================================================
// Inisialisasi Supabase untuk Kue Balok Pamulang
//  1. (Opsional) Membuat tabel + RLS + bucket + policy Storage bila
//     DATABASE_URL (Postgres connection string) tersedia di .env
//  2. Membuat bucket Storage "products" (publik) bila belum ada
//  3. Mengunduh & mengunggah gambar produk ke Storage
//  4. Mengisi (upsert) tabel "products" — image memakai path relatif Storage
//
// Jalankan:
//   npm run db:init
//
// Prasyarat:
//  - .env berisi VITE_SUPABASE_URL dan VITE_SUPABASE_SERVER_KEY (service role)
//  - Untuk pembuatan tabel otomatis, isi juga DATABASE_URL:
//      postgres://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres
//    (ambil dari Project Settings → Database → Connection string → Pooler).
//    Tanpa DATABASE_URL, tabel harus dibuat manual lewat supabase_schema.sql
//    di Supabase SQL Editor.
// ============================================================================

const BUCKET = 'products';
const FOLDER = 'seed';

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.VITE_SUPABASE_SERVER_KEY;
const databaseUrl = process.env.DATABASE_URL;

if (!url || !serviceKey) {
  console.error(
    '✖ Kredensial Supabase belum lengkap.\n' +
      '  Isi VITE_SUPABASE_URL dan VITE_SUPABASE_SERVER_KEY di file .env',
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
});

function log(label: string, message: string) {
  console.log(`${label} ${message}`);
}

function logError(message: string) {
  console.error(`✖ ${message}`);
}

// ── 0. (Opsional) Buat tabel & RLS via DATABASE_URL ──────────────────────────
// DDL idempotent: aman dijalankan berulang kali.
const SCHEMA_SQL = `
-- 1. Tabel products
CREATE TABLE IF NOT EXISTS public.products (
  id          text PRIMARY KEY,
  name        text NOT NULL,
  price       integer NOT NULL DEFAULT 0,
  image       text,
  category    text NOT NULL DEFAULT 'classic'
              CHECK (category IN ('signature', 'classic', 'topping')),
  variant     text,
  color       text,
  text_color  text,
  badge       text,
  description text,
  is_active   boolean NOT NULL DEFAULT true,
  sort_order  integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 2. Bucket Storage "products" (publik)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('products', 'products', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO UPDATE
  SET public = EXCLUDED.public,
      file_size_limit = EXCLUDED.file_size_limit,
      allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 3. Policy tabel (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'products' AND policyname = 'Produk aktif bisa dibaca siapa saja') THEN
    CREATE POLICY "Produk aktif bisa dibaca siapa saja" ON public.products FOR SELECT USING (is_active = true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'products' AND policyname = 'Admin bisa baca semua produk') THEN
    CREATE POLICY "Admin bisa baca semua produk" ON public.products FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'products' AND policyname = 'Admin bisa insert produk') THEN
    CREATE POLICY "Admin bisa insert produk" ON public.products FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'products' AND policyname = 'Admin bisa update produk') THEN
    CREATE POLICY "Admin bisa update produk" ON public.products FOR UPDATE USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'products' AND policyname = 'Admin bisa delete produk') THEN
    CREATE POLICY "Admin bisa delete produk" ON public.products FOR DELETE USING (true);
  END IF;
END $$;

-- 4. Policy Storage (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Gambar produk bisa diakses publik') THEN
    CREATE POLICY "Gambar produk bisa diakses publik" ON storage.objects FOR SELECT
      USING (bucket_id = 'products' AND storage.allow_any_operation(array['object.get_authenticated_info', 'object.get_authenticated']));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Siapa saja boleh upload gambar produk') THEN
    CREATE POLICY "Siapa saja boleh upload gambar produk" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'products');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Siapa saja boleh update gambar produk') THEN
    CREATE POLICY "Siapa saja boleh update gambar produk" ON storage.objects FOR UPDATE USING (bucket_id = 'products');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Siapa saja boleh delete gambar produk') THEN
    CREATE POLICY "Siapa saja boleh delete gambar produk" ON storage.objects FOR DELETE USING (bucket_id = 'products');
  END IF;
END $$;
`;

async function ensureSchemaViaDatabase(): Promise<void> {
  const client = new pg.Client({ connectionString: databaseUrl, ssl: { rejectUnauthorized: false } });
  await client.connect();
  try {
    await client.query(SCHEMA_SQL);
    log('✓', 'Tabel products + RLS + bucket + policy Storage berhasil dibuat via DATABASE_URL.');
  } finally {
    await client.end();
  }
}

// ── 1. Pastikan bucket Storage ada ────────────────────────────────────────────
async function ensureBucket(): Promise<void> {
  const { data: buckets } = await supabase.storage.listBuckets();
  if (buckets?.some((b) => b.id === BUCKET)) {
    log('✓', `Bucket "${BUCKET}" sudah ada.`);
    return;
  }

  const { error } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: 5 * 1024 * 1024, // 5MB
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  });

  if (error) {
    throw new Error(`Gagal membuat bucket "${BUCKET}": ${error.message}`);
  }
  log('✓', `Bucket "${BUCKET}" berhasil dibuat (publik, max 5MB).`);
}

// ── 2. Unduh & unggah gambar ke Storage ───────────────────────────────────────
function extFromContentType(contentType: string): string {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
  };
  return map[contentType.toLowerCase()] ?? 'jpg';
}

async function uploadImage(productId: string, imageUrl: string): Promise<string> {
  const res = await fetch(imageUrl);
  if (!res.ok) {
    throw new Error(`Gagal mengunduh ${imageUrl} (status ${res.status}).`);
  }

  const contentType = res.headers.get('content-type') || 'image/jpeg';
  const arrayBuffer = await res.arrayBuffer();
  const path = `${FOLDER}/${productId}.${extFromContentType(contentType)}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, arrayBuffer, {
    contentType,
    cacheControl: '3600',
    upsert: true,
  });

  if (error) {
    throw new Error(`Gagal upload ${path}: ${error.message}`);
  }
  return path;
}

// ── 3. Seed produk (upsert) ───────────────────────────────────────────────────
async function seedProducts(): Promise<void> {
  const { error: tableCheck } = await supabase.from('products').select('id').limit(1);
  if (tableCheck) {
    throw new Error(
      `Tabel "products" belum ada. Jalankan dulu supabase_schema.sql di Supabase SQL Editor (atau isi DATABASE_URL di .env lalu jalankan ulang).\n  Detail: ${tableCheck.message}`,
    );
  }

  for (const product of SEED_PRODUCTS) {
    const isExternalUrl = Boolean(product.image?.startsWith('http'));
    const image = isExternalUrl
      ? await uploadImage(product.id, product.image as string)
      : product.image;

    const { error } = await supabase
      .from('products')
      .upsert(
        {
          ...product,
          image,
          created_at: undefined, // biarkan DB memakai default now()
        },
        { onConflict: 'id' },
      );

    if (error) {
      throw new Error(`Gagal menyimpan produk "${product.name}": ${error.message}`);
    }

    log('✓', `Produk "${product.name}" siap (gambar: ${image}).`);
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  console.log('\n=== Inisialisasi Supabase — Kue Balok Pamulang ===\n');

  try {
    if (databaseUrl) {
      await ensureSchemaViaDatabase();
    } else {
      log('ℹ', 'DATABASE_URL tidak ditemukan — lewati pembuatan tabel (jalankan supabase_schema.sql manual).');
    }

    await ensureBucket();
    await seedProducts();
    console.log('\n=== Selesai. Semua produk & gambar berhasil diinisialisasi. ===\n');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    logError(message);
    process.exit(1);
  }
}

main();
