import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ── Konfigurasi dari environment ──────────────────────────────────────────────
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Set true jika kredensial sudah diisi di .env / .env.local
export const isSupabaseConfigured: boolean = Boolean(supabaseUrl && supabaseAnonKey);

// Bucket Storage tempat menyimpan gambar produk (harus konsisten dengan schema SQL)
export const PRODUCTS_STORAGE_BUCKET = 'products';

function createSupabaseClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Buat client dummy agar aplikasi tetap berjalan tanpa crash saat belum dikonfigurasi.
    // Semua query akan error "not configured", lalu fallback data dipakai.
    console.warn(
      '[Supabase] ⚠️ Belum terkonfigurasi: VITE_SUPABASE_URL dan/atau VITE_SUPABASE_ANON_KEY ' +
        'tidak ada saat build. Semua fetch/upload akan gagal ke placeholder.supabase.co. ' +
        'Isi env lalu rebuild/redeploy.',
    );
    return createClient('https://placeholder.supabase.co', 'placeholder', {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
  }
  console.info('[Supabase] Terkonfigurasi ✓ URL:', supabaseUrl);
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

export const supabase: SupabaseClient = createSupabaseClient();

// ── Helper: Buat URL publik gambar dari Supabase Storage ──────────────────────
// Jika image adalah path relatif (misal: "products/gambar.jpg"),
// otomatis dikonversi ke URL Supabase Storage publik.
// Jika image sudah berupa URL lengkap (https://...), dikembalikan apa adanya.
// Jika Supabase belum dikonfigurasi, kembalikan string kosong.
export function getImageUrl(image: string | null | undefined): string {
  if (!image) return '';

  // Sudah URL lengkap, kembalikan langsung
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }

  if (!isSupabaseConfigured) {
    return '';
  }

  // Path relatif → konversi ke Supabase Storage public URL
  const { data } = supabase.storage.from(PRODUCTS_STORAGE_BUCKET).getPublicUrl(image);
  return data.publicUrl;
}

export type ProductCategory = 'signature' | 'classic' | 'topping';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string | null;
  category: ProductCategory;
  variant: string | null;
  color: string | null;       // Tailwind CSS class untuk warna badge topping
  text_color: string | null;  // Tailwind CSS class untuk warna teks badge topping
  badge: string | null;       // Label badge (misal: "PALING LARIS")
  description: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}
