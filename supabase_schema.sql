-- ============================================================
-- Schema SQL lengkap untuk Kue Balok Pamulang
--  1. Tabel products + Row Level Security
--  2. Bucket Storage "products" (publik)
--  3. RLS Storage (baca publik, upload/update/delete anon)
--  4. Seed data produk default
--
-- Cara pakai:
--   A) Otomatis:  npm run db:init   (script service key, upload gambar juga)
--   B) Manual:    Supabase Dashboard → SQL Editor → jalankan file ini
-- ============================================================

-- ============================================================
-- 1. TABEL PRODUCTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.products (
  id          text PRIMARY KEY,
  name        text NOT NULL,
  price       integer NOT NULL DEFAULT 0,
  image       text,                -- URL lengkap ATAU path relatif di bucket "products"
  category    text NOT NULL DEFAULT 'classic'
              CHECK (category IN ('signature', 'classic', 'topping')),
  variant     text,
  color       text,                -- Tailwind CSS class untuk warna badge topping (contoh: bg-[#96bd76])
  text_color  text,                -- Tailwind CSS class untuk warna teks badge topping (contoh: text-white)
  badge       text,                -- Label badge (contoh: PALING LARIS, GREEN TEA)
  description text,
  is_active   boolean NOT NULL DEFAULT true,
  sort_order  integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Aktifkan Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Website publik hanya bisa membaca produk yang aktif
CREATE POLICY "Produk aktif bisa dibaca siapa saja"
  ON public.products
  FOR SELECT
  USING (is_active = true);

-- Admin (anon key) bisa baca semua produk (termasuk nonaktif)
-- CATATAN: Untuk keamanan produksi lebih tinggi, gunakan Supabase Auth + service_role.
CREATE POLICY "Admin bisa baca semua produk"
  ON public.products
  FOR SELECT
  USING (true);

-- CRUD via anon key untuk Admin Panel (skala UMKM)
CREATE POLICY "Admin bisa insert produk"
  ON public.products
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin bisa update produk"
  ON public.products
  FOR UPDATE
  USING (true);

CREATE POLICY "Admin bisa delete produk"
  ON public.products
  FOR DELETE
  USING (true);

-- ============================================================
-- 2. BUCKET STORAGE "products" (publik)
--    Bucket ini dipakai `getImageUrl()` & form upload di Admin Panel.
-- ============================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('products', 'products', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO UPDATE
  SET public = EXCLUDED.public,
      file_size_limit = EXCLUDED.file_size_limit,
      allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ============================================================
-- 3. RLS STORAGE (storage.objects)
--    Publik boleh download gambar produk (untuk website).
--    Anon boleh upload/update/delete gambar via Admin Panel.
-- ============================================================
CREATE POLICY "Gambar produk bisa diakses publik"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'products' AND storage.allow_any_operation(array['object.get_authenticated_info', 'object.get_authenticated']));

CREATE POLICY "Siapa saja boleh upload gambar produk"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'products');

CREATE POLICY "Siapa saja boleh update gambar produk"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'products');

CREATE POLICY "Siapa saja boleh delete gambar produk"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'products');

-- ============================================================
-- 4. SEED DATA — produk default Kue Balok Pamulang
--    Catatan: gambar memakai URL eksternal agar langsung tampil.
--    Setelah menjalankan `npm run db:init`, gambar otomatis
--    diunggah ke bucket "products" dan `image` diganti path relatif.
-- ============================================================
INSERT INTO public.products (id, name, price, image, category, variant, color, text_color, badge, description, is_active, sort_order) VALUES
(
  'mix-rasa-5',
  'Kue Balok Lumer Mix Rasa',
  23000,
  'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800',
  'signature', '5 Pcs (Mix Rasa)', NULL, NULL, 'PALING LARIS',
  'Kenikmatan tertinggi. Kombinasi variasi topping terbaik kami (Green Tea, Tiramisu, Strawberry, Vanilla, dan Taro) di atas isian cokelat lumer yang meleleh sempurna. Cocok untuk dinikmati bersama.',
  true, 0
),
(
  'ori-5',
  'Kue Balok Original Coklat',
  18000,
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
  'classic', '5 Pcs', NULL, NULL, NULL,
  'Varian original terfavorit. Cokelat murni berkualitas tinggi dengan lelehan hangat di bagian tengah kue.',
  true, 1
),
(
  'keju-5',
  'Original Coklat Full Toping Keju',
  25000,
  'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=800',
  'classic', '5 Pcs', NULL, NULL, NULL,
  'Perpaduan sempurna rasa manis dan gurih. Kue balok cokelat klasik ditaburi keju cheddar parut melimpah di atasnya.',
  true, 2
),
(
  'top-green-tea',
  'Kue Balok GREEN TEA',
  24000,
  'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=400',
  'topping', '5 Pcs', 'bg-[#96bd76]', 'text-white', 'GREEN TEA',
  'Paduan matcha premium dengan isian cokelat lumer.',
  true, 3
),
(
  'top-tiramisu',
  'Kue Balok TIRAMISU',
  24000,
  'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&q=80&w=400',
  'topping', '5 Pcs', 'bg-[#a37c56]', 'text-white', 'TIRAMISU',
  'Cita rasa kopi Italia dengan sentuhan cokelat lumer.',
  true, 4
),
(
  'top-strawberry',
  'Kue Balok STRAWBERRY',
  24000,
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=400',
  'topping', '5 Pcs', 'bg-[#f48a97]', 'text-white', 'STRAWBERRY',
  'Segar asam manis stroberi berpadu dengan cokelat lumer.',
  true, 5
),
(
  'top-vanila',
  'Kue Balok VANILA',
  24000,
  'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=400',
  'topping', '5 Pcs', 'bg-[#f1ecc7]', 'text-[#230904]', 'VANILA',
  'Klasik vanila lembut dengan isian cokelat premium.',
  true, 6
),
(
  'top-taro',
  'Kue Balok TARO',
  24000,
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
  'topping', '5 Pcs', 'bg-[#927dd0]', 'text-white', 'TARO',
  'Aroma taro ungu yang harum dengan cokelat lumer di dalamnya.',
  true, 7
)
ON CONFLICT (id) DO NOTHING;  -- Jangan timpa jika sudah ada
