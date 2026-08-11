# Kue Balok Pamulang

Landing page + toko online Kue Balok Pamulang dengan Admin Panel CRUD produk
berbasis **Supabase** (PostgreSQL + Storage).

## Teknologi

- React 19 + Vite + Tailwind CSS v4
- Supabase (`@supabase/supabase-js`) untuk database & storage gambar
- Prisma ORM (`@prisma/client` + `@prisma/adapter-pg`) untuk akses database & migrations
- lucide-react untuk ikon

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Konfigurasi environment — salin `.env.example` ke `.env` lalu isi:
   ```bash
   cp .env.example .env
   ```
   Isi `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, dan
   `VITE_SUPABASE_SERVER_KEY` (service role, khusus script inisialisasi —
   jangan diekspos ke frontend). Untuk pembuatan tabel otomatis, isi juga
   `DATABASE_URL` (Postgres Pooler connection string).

3. Inisialisasi otomatis (buat tabel + bucket + upload gambar + seed):
   ```bash
   npm run db:init
   ```
   - Dengan `DATABASE_URL` terisi: script membuat tabel + RLS + policy Storage
     secara otomatis.
   - Tanpa `DATABASE_URL`: buka `supabase_schema.sql` di **Supabase Dashboard
     → SQL Editor → Run** terlebih dahulu.

4. Jalankan aplikasi:
   ```bash
   npm run dev
   ```

## Prisma

Prisma dipakai sebagai ORM client + alat sinkronisasi schema (tabel dibuat lewat
SQL di `supabase_schema.sql` / `npm run db:init`, bukan migration Prisma).

- Sinkronisasi schema: `npm run db:push` — pakai `DIRECT_URL` (session pooler)
  karena transaction pooler (pgbouncer) tidak kompatibel dengan Prisma.
- Generate client: `npx prisma generate` (output ke `src/generated/prisma`, gitignored)
- Verifikasi baca data: `npm run db:verify`

Contoh pemakaian client:
```ts
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
```

## Admin Panel

- URL: `http://localhost:3000/?page=admin`
- Password: diatur lewat `VITE_ADMIN_PASSWORD` di `.env`

## Struktur Penting

| File | Fungsi |
| --- | --- |
| `src/lib/supabase.ts` | Client Supabase + helper `getImageUrl()` |
| `src/hooks/useProducts.ts` | Hook CRUD produk (publik + admin) |
| `src/data/products.ts` | Data produk default (fallback + sumber seed) |
| `scripts/init-supabase.ts` | Inisialisasi bucket & seed (`npm run db:init`) |
| `scripts/verify-prisma.ts` | Verifikasi baca produk via Prisma (`npm run db:verify`) |
| `supabase_schema.sql` | Schema tabel, RLS, bucket Storage, & seed SQL |
| `prisma/schema.prisma` | Model Product untuk Prisma ORM |
