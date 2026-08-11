import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase, Product } from '../lib/supabase';
import { SEED_PRODUCTS } from '../data/products';

// ── Hook untuk website publik (hanya produk aktif) ────────────────────────────
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (fetchError) throw fetchError;

      if (data && data.length > 0) {
        setProducts(data as Product[]);
      } else {
        // Jika belum ada data di database, gunakan fallback
        setProducts(SEED_PRODUCTS);
      }
    } catch (err: unknown) {
      console.warn('[useProducts] Supabase belum terinisialisasi atau error, menggunakan fallback data:', err);
      setError(`Gagal fetch dari Supabase (fallback data dipakai): ${err instanceof Error ? err.message : String(err)}`);
      setProducts(SEED_PRODUCTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const memoizedProducts = useMemo(() => products, [products]);

  return { products: memoizedProducts, loading, error, refetch: fetchProducts };
}

// ── Hook untuk Admin (semua produk termasuk nonaktif) ─────────────────────────
export function useAllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true });

      if (fetchError) throw fetchError;

      if (data && data.length > 0) {
        setProducts(data as Product[]);
      } else {
        setProducts(SEED_PRODUCTS);
      }
    } catch (err: unknown) {
      console.warn('[useAllProducts] Gagal fetch dari database:', err);
      setError(`Gagal fetch dari database (fallback dipakai): ${err instanceof Error ? err.message : String(err)}`);
      setProducts(SEED_PRODUCTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const memoizedProducts = useMemo(() => products, [products]);

  const createProduct = useCallback(async (product: Omit<Product, 'created_at'> & { id?: string }) => {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();
    if (error) throw error;
    await fetchAll();
    return data;
  }, [fetchAll]);

  const updateProduct = useCallback(async (id: string, updates: Partial<Product>) => {
    const { error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id);
    if (error) throw error;
    await fetchAll();
  }, [fetchAll]);

  const deleteProduct = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    if (error) throw error;
    await fetchAll();
  }, [fetchAll]);

  return { products: memoizedProducts, loading, error, refetch: fetchAll, createProduct, updateProduct, deleteProduct };
}
