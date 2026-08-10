import React, { useState, useRef } from 'react';
import {
  Plus, Pencil, Trash2, X, Check, ChefHat, LogOut,
  Loader2, AlertCircle, PackagePlus, ToggleLeft, ToggleRight,
  Image as ImageIcon, Tag, DollarSign, AlignLeft, Layers, Hash,
  Upload, Link as LinkIcon
} from 'lucide-react';
import { useAllProducts } from '../hooks/useProducts';
import { Product, ProductCategory, supabase, getImageUrl } from '../lib/supabase';

interface AdminPanelProps {
  onLogout: () => void;
}

const EMPTY_FORM: Omit<Product, 'created_at'> = {
  id: '',
  name: '',
  price: 0,
  image: '',
  category: 'classic',
  variant: '5 Pcs',
  color: '',
  text_color: '',
  badge: '',
  description: '',
  is_active: true,
  sort_order: 0,
};

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  signature: '⭐ Signature',
  classic: '🍫 Klasik',
  topping: '🎨 Topping',
};

const TOPPING_COLOR_OPTIONS = [
  { label: 'Hijau (Green Tea)', color: 'bg-[#96bd76]', textColor: 'text-white' },
  { label: 'Cokelat (Tiramisu)', color: 'bg-[#a37c56]', textColor: 'text-white' },
  { label: 'Pink (Strawberry)', color: 'bg-[#f48a97]', textColor: 'text-white' },
  { label: 'Krem (Vanila)', color: 'bg-[#f1ecc7]', textColor: 'text-[#230904]' },
  { label: 'Ungu (Taro)', color: 'bg-[#927dd0]', textColor: 'text-white' },
  { label: 'Custom (isi manual)', color: '', textColor: '' },
];

export default function AdminPanel({ onLogout }: AdminPanelProps) {
  const { products, loading, error, createProduct, updateProduct, deleteProduct } = useAllProducts();
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<Omit<Product, 'created_at'>>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<ProductCategory | 'all'>('all');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageMode, setImageMode] = useState<'url' | 'upload'>('url');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openCreateModal = () => {
    setEditingProduct(null);
    setForm(EMPTY_FORM);
    setSaveError('');
    setShowModal(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setForm({ ...product });
    setSaveError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setSaveError('');
  };

  const handleSave = async () => {
    if (!form.name.trim()) { setSaveError('Nama produk wajib diisi.'); return; }
    if (!form.id.trim()) { setSaveError('ID produk wajib diisi (contoh: ori-5).'); return; }
    if (form.price <= 0) { setSaveError('Harga harus lebih dari 0.'); return; }

    setSaving(true);
    setSaveError('');
    try {
      if (editingProduct) {
        // Update — jangan update id/created_at
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...updates } = form;
        await updateProduct(editingProduct.id, updates);
      } else {
        await createProduct(form);
      }
      closeModal();
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : 'Gagal menyimpan produk.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteProduct(id);
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  const handleToggleActive = async (product: Product) => {
    try {
      await updateProduct(product.id, { is_active: !product.is_active });
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setUploadingImage(true);
    setSaveError('');
    try {
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(fileName, file, { upsert: false });
      if (uploadError) throw uploadError;
      // Simpan path relatif — getImageUrl() akan konversi ke URL publik
      setForm(f => ({ ...f, image: fileName }));
    } catch (err: unknown) {
      setSaveError(`Gagal upload gambar: ${err instanceof Error ? err.message : 'Error tidak diketahui'}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const filteredProducts = filterCategory === 'all'
    ? products
    : products.filter(p => p.category === filterCategory);

  const handleLogout = () => {
    sessionStorage.removeItem('kbp_admin_auth');
    onLogout();
  };

  return (
    <div className="min-h-screen bg-[#fff8f6] font-['Be_Vietnam_Pro']">
      {/* ── Top Bar ── */}
      <div className="bg-[#230904] text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#ba821b]/20 border border-[#ba821b]/30 flex items-center justify-center">
            <ChefHat className="w-5 h-5 text-[#ba821b]" />
          </div>
          <div>
            <h1 className="font-['Bricolage_Grotesque'] font-bold text-lg leading-none">Admin Panel</h1>
            <p className="text-white/50 text-xs">Kue Balok Pamulang</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="text-white/60 hover:text-white text-sm transition-colors hidden sm:block">
            ← Lihat Website
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" /> Keluar
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Stats + Actions ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            {(['all', 'signature', 'classic', 'topping'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${filterCategory === cat
                  ? 'bg-[#230904] text-white'
                  : 'bg-white text-[#514441] border border-[#f5ddd8] hover:border-[#ba821b]'
                  }`}
              >
                {cat === 'all' ? `Semua (${products.length})` : `${CATEGORY_LABELS[cat]} (${products.filter(p => p.category === cat).length})`}
              </button>
            ))}
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-[#ba821b] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#a06e12] transition-colors shadow-sm"
          >
            <PackagePlus className="w-4 h-4" /> Tambah Produk
          </button>
        </div>

        {/* ── Database Init Banner ── */}
        {error && (
          <div className="mb-6 bg-amber-50 border border-amber-300 rounded-2xl p-5 shadow-sm text-amber-900">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-2 flex-grow">
                <h3 className="font-bold text-base">Inisialisasi Tabel Supabase Diperlukan</h3>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Tabel <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono">products</code> belum ada di database Supabase Anda (<code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono">hcwzsdiujdzywtbxubqm</code>).
                  Klik tombol di bawah untuk menyalin query SQL, lalu tempel & jalankan di Supabase.
                </p>
                
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      const sql = `-- Buat tabel products
CREATE TABLE IF NOT EXISTS public.products (
  id          text PRIMARY KEY,
  name        text NOT NULL,
  price       integer NOT NULL DEFAULT 0,
  image       text,
  category    text NOT NULL DEFAULT 'classic' CHECK (category IN ('signature', 'classic', 'topping')),
  variant     text,
  color       text,
  text_color  text,
  badge       text,
  description text,
  is_active   boolean NOT NULL DEFAULT true,
  sort_order  integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Aktifkan RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow read active" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow insert" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Allow delete" ON public.products FOR DELETE USING (true);

-- Seed initial data
INSERT INTO public.products (id, name, price, image, category, variant, color, text_color, badge, description, is_active, sort_order) VALUES
('mix-rasa-5', 'Kue Balok Lumer Mix Rasa', 23000, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEiJSiZoHwuaUC55-AII880newJe0j_q2xVAwTNsyhGE_DHBWXwA3qQ1ijnUKPwbw0lrptL0LN6DffoGmDRqF5EC_JoxV4AhPgBYm_Z1vMrD5Lz06M7pk1WusdHEflHI7dZBCvkROukitrPBiBcdJSEIjZ7MHYmUv8nXtFBBASKkqRuQ6DmYtniZ9iqeZuYZFycx_1VhNYQczH-71U77MQIMVK1FJBF3NtaKl2Iq7rNmt1a01Zz7IE', 'signature', '5 Pcs (Mix Rasa)', NULL, NULL, 'PALING LARIS', 'Kenikmatan tertinggi. Kombinasi variasi topping terbaik kami.', true, 0),
('ori-5', 'Kue Balok Original Coklat', 18000, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800', 'classic', '5 Pcs', NULL, NULL, NULL, 'Varian original terfavorit. Cokelat murni berkualitas tinggi.', true, 1),
('keju-5', 'Original Coklat Full Toping Keju', 25000, 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=800', 'classic', '5 Pcs', NULL, NULL, NULL, 'Perpaduan sempurna manis dan gurih.', true, 2),
('top-green-tea', 'Kue Balok GREEN TEA', 24000, 'https://images.unsplash.com/photo-1534432182912-638548dd0676?auto=format&fit=crop&q=80&w=400', 'topping', '5 Pcs', 'bg-[#96bd76]', 'text-white', 'GREEN TEA', 'Paduan matcha premium.', true, 3),
('top-tiramisu', 'Kue Balok TIRAMISU', 24000, 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&q=80&w=400', 'topping', '5 Pcs', 'bg-[#a37c56]', 'text-white', 'TIRAMISU', 'Cita rasa kopi Italia.', true, 4),
('top-strawberry', 'Kue Balok STRAWBERRY', 24000, 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=400', 'topping', '5 Pcs', 'bg-[#f48a97]', 'text-white', 'STRAWBERRY', 'Segar asam manis stroberi.', true, 5),
('top-vanila', 'Kue Balok VANILA', 24000, 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=400', 'topping', '5 Pcs', 'bg-[#f1ecc7]', 'text-[#230904]', 'VANILA', 'Klasik vanila lembut.', true, 6),
('top-taro', 'Kue Balok TARO', 24000, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400', 'topping', '5 Pcs', 'bg-[#927dd0]', 'text-white', 'TARO', 'Aroma taro ungu harum.', true, 7)
ON CONFLICT (id) DO NOTHING;`;
                      navigator.clipboard.writeText(sql);
                      alert('Query SQL berhasil disalin ke clipboard! Silakan paste & Run di Supabase SQL Editor.');
                    }}
                    className="bg-[#230904] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#3d1d16] transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    📋 Salin Query SQL Inisialisasi
                  </button>

                  <a
                    href="https://supabase.com/dashboard/project/hcwzsdiujdzywtbxubqm/sql/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-amber-700 transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    🚀 Buka Supabase SQL Editor ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Product Table ── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="w-10 h-10 text-[#ba821b] animate-spin" />
            <p className="text-[#514441] text-sm">Memuat produk...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#f5ddd8] p-16 text-center">
            <PackagePlus className="w-12 h-12 text-[#d5c2bf] mx-auto mb-3" />
            <p className="text-[#514441] font-bold">Belum ada produk</p>
            <p className="text-[#514441]/60 text-sm mt-1">Klik "Tambah Produk" untuk mulai.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#f5ddd8] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#fff8f6] border-b border-[#f5ddd8]">
                    <th className="text-left px-4 py-3 font-bold text-[#514441] text-xs uppercase tracking-wider">Produk</th>
                    <th className="text-left px-4 py-3 font-bold text-[#514441] text-xs uppercase tracking-wider hidden md:table-cell">Kategori</th>
                    <th className="text-right px-4 py-3 font-bold text-[#514441] text-xs uppercase tracking-wider">Harga</th>
                    <th className="text-center px-4 py-3 font-bold text-[#514441] text-xs uppercase tracking-wider hidden sm:table-cell">Status</th>
                    <th className="text-right px-4 py-3 font-bold text-[#514441] text-xs uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f5ddd8]">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className={`hover:bg-[#fff8f6] transition-colors ${!product.is_active ? 'opacity-50' : ''}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {product.image ? (
                            <img src={getImageUrl(product.image)} alt={product.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-[#f5ddd8]" />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-[#ffe9e4] flex items-center justify-center flex-shrink-0">
                              <ImageIcon className="w-5 h-5 text-[#d5c2bf]" />
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-[#230904]">{product.name}</p>
                            <p className="text-[#514441]/60 text-xs">{product.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="bg-[#ffe9e4] text-[#230904] px-2.5 py-1 rounded-full text-xs font-bold">
                          {CATEGORY_LABELS[product.category]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-[#230904]">
                        Rp {product.price.toLocaleString('id-ID')}
                      </td>
                      <td className="px-4 py-3 text-center hidden sm:table-cell">
                        <button
                          onClick={() => handleToggleActive(product)}
                          className="text-[#514441] hover:text-[#230904] transition-colors"
                          title={product.is_active ? 'Klik untuk nonaktifkan' : 'Klik untuk aktifkan'}
                        >
                          {product.is_active
                            ? <ToggleRight className="w-8 h-8 text-green-500 mx-auto" />
                            : <ToggleLeft className="w-8 h-8 text-gray-400 mx-auto" />
                          }
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEditModal(product)}
                            className="p-2 text-[#514441] hover:text-[#230904] hover:bg-[#ffe9e4] rounded-lg transition-colors"
                            title="Edit produk"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          {confirmDeleteId === product.id ? (
                            <div className="flex items-center gap-1 bg-red-50 px-2 py-1 rounded-lg border border-red-200">
                              <span className="text-xs text-red-600 font-bold">Hapus?</span>
                              <button
                                onClick={() => handleDelete(product.id)}
                                disabled={deletingId === product.id}
                                className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                                title="Konfirmasi hapus"
                              >
                                {deletingId === product.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="p-1 text-[#514441] hover:bg-gray-100 rounded transition-colors"
                                title="Batal"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDeleteId(product.id)}
                              className="p-2 text-[#514441] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Hapus produk"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ── Modal Form ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-[#f5ddd8] px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
              <div className="flex items-center gap-2">
                {editingProduct ? <Pencil className="w-5 h-5 text-[#ba821b]" /> : <Plus className="w-5 h-5 text-[#ba821b]" />}
                <h2 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[#230904]">
                  {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
                </h2>
              </div>
              <button onClick={closeModal} className="p-2 hover:bg-[#ffe9e4] rounded-xl transition-colors text-[#514441]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* ID Produk */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-[#514441] uppercase tracking-wider mb-1.5">
                  <Hash className="w-3.5 h-3.5" /> ID Produk *
                </label>
                <input
                  type="text"
                  value={form.id}
                  onChange={e => setForm(f => ({ ...f, id: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                  placeholder="contoh: ori-coklat-5pcs"
                  disabled={!!editingProduct}
                  className="w-full px-4 py-3 border-2 border-[#f5ddd8] rounded-xl text-sm focus:outline-none focus:border-[#ba821b] transition-colors bg-[#fff8f6] disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                />
                {!editingProduct && <p className="text-xs text-[#514441]/60 mt-1">Hanya huruf kecil, angka, dan tanda - (tidak bisa diubah setelah disimpan)</p>}
              </div>

              {/* Nama */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-[#514441] uppercase tracking-wider mb-1.5">
                  <Tag className="w-3.5 h-3.5" /> Nama Produk *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Kue Balok Original Coklat"
                  className="w-full px-4 py-3 border-2 border-[#f5ddd8] rounded-xl text-sm focus:outline-none focus:border-[#ba821b] transition-colors bg-[#fff8f6]"
                />
              </div>

              {/* Harga & Kategori */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-[#514441] uppercase tracking-wider mb-1.5">
                    <DollarSign className="w-3.5 h-3.5" /> Harga (Rp) *
                  </label>
                  <input
                    type="number"
                    value={form.price || ''}
                    onChange={e => setForm(f => ({ ...f, price: parseInt(e.target.value) || 0 }))}
                    placeholder="18000"
                    min={0}
                    className="w-full px-4 py-3 border-2 border-[#f5ddd8] rounded-xl text-sm focus:outline-none focus:border-[#ba821b] transition-colors bg-[#fff8f6]"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-[#514441] uppercase tracking-wider mb-1.5">
                    <Layers className="w-3.5 h-3.5" /> Kategori
                  </label>
                  <select
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value as ProductCategory }))}
                    className="w-full px-4 py-3 border-2 border-[#f5ddd8] rounded-xl text-sm focus:outline-none focus:border-[#ba821b] transition-colors bg-[#fff8f6]"
                  >
                    <option value="signature">⭐ Signature</option>
                    <option value="classic">🍫 Klasik</option>
                    <option value="topping">🎨 Topping</option>
                  </select>
                </div>
              </div>

              {/* Gambar Produk */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-[#514441] uppercase tracking-wider mb-2">
                  <ImageIcon className="w-3.5 h-3.5" /> Gambar Produk
                </label>

                {/* Tab: URL vs Upload */}
                <div className="flex gap-1 bg-[#f5ddd8]/50 p-1 rounded-xl mb-3">
                  <button
                    type="button"
                    onClick={() => setImageMode('url')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
                      imageMode === 'url' ? 'bg-white shadow-sm text-[#230904]' : 'text-[#514441]'
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" /> URL Eksternal
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageMode('upload')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
                      imageMode === 'upload' ? 'bg-white shadow-sm text-[#230904]' : 'text-[#514441]'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" /> Upload ke Supabase
                  </button>
                </div>

                {imageMode === 'url' ? (
                  <input
                    type="url"
                    value={form.image || ''}
                    onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-3 border-2 border-[#f5ddd8] rounded-xl text-sm focus:outline-none focus:border-[#ba821b] transition-colors bg-[#fff8f6]"
                  />
                ) : (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                      className="w-full border-2 border-dashed border-[#d5c2bf] rounded-xl py-6 flex flex-col items-center gap-2 hover:border-[#ba821b] hover:bg-[#fff8f6] transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {uploadingImage ? (
                        <><Loader2 className="w-6 h-6 text-[#ba821b] animate-spin" /><span className="text-xs text-[#514441]">Mengupload...</span></>
                      ) : (
                        <><Upload className="w-6 h-6 text-[#ba821b]" /><span className="text-xs font-bold text-[#514441]">Klik untuk pilih gambar</span><span className="text-[11px] text-[#514441]/60">JPG, PNG, WebP — maks 5MB</span></>
                      )}
                    </button>
                    {form.image && !form.image.startsWith('http') && (
                      <p className="text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded-lg mt-2 font-mono">
                        ✓ Tersimpan: {form.image}
                      </p>
                    )}
                  </div>
                )}

                {/* Preview gambar */}
                {form.image && (
                  <div className="mt-3">
                    <img
                      src={getImageUrl(form.image)}
                      alt="Preview"
                      className="h-28 rounded-xl object-cover border border-[#f5ddd8]"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                )}
              </div>

              {/* Deskripsi */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-[#514441] uppercase tracking-wider mb-1.5">
                  <AlignLeft className="w-3.5 h-3.5" /> Deskripsi
                </label>
                <textarea
                  value={form.description || ''}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Deskripsi produk..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-[#f5ddd8] rounded-xl text-sm focus:outline-none focus:border-[#ba821b] transition-colors bg-[#fff8f6] resize-none"
                />
              </div>

              {/* Varian & Badge */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#514441] uppercase tracking-wider mb-1.5 block">Varian</label>
                  <input
                    type="text"
                    value={form.variant || ''}
                    onChange={e => setForm(f => ({ ...f, variant: e.target.value }))}
                    placeholder="5 Pcs"
                    className="w-full px-4 py-3 border-2 border-[#f5ddd8] rounded-xl text-sm focus:outline-none focus:border-[#ba821b] transition-colors bg-[#fff8f6]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#514441] uppercase tracking-wider mb-1.5 block">Badge Label</label>
                  <input
                    type="text"
                    value={form.badge || ''}
                    onChange={e => setForm(f => ({ ...f, badge: e.target.value }))}
                    placeholder="PALING LARIS"
                    className="w-full px-4 py-3 border-2 border-[#f5ddd8] rounded-xl text-sm focus:outline-none focus:border-[#ba821b] transition-colors bg-[#fff8f6]"
                  />
                </div>
              </div>

              {/* Topping Colors (hanya muncul jika kategori topping) */}
              {form.category === 'topping' && (
                <div>
                  <label className="text-xs font-bold text-[#514441] uppercase tracking-wider mb-2 block">Warna Badge Topping</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {TOPPING_COLOR_OPTIONS.map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => {
                          if (opt.color) {
                            setForm(f => ({ ...f, color: opt.color, text_color: opt.textColor }));
                          }
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-xs font-bold transition-all ${form.color === opt.color && opt.color
                          ? 'border-[#ba821b] bg-[#fff8f6]'
                          : 'border-[#f5ddd8] hover:border-[#ba821b]/50'
                          }`}
                      >
                        {opt.color && (
                          <span className={`w-5 h-5 rounded-full flex-shrink-0 ${opt.color}`} />
                        )}
                        <span className="text-[#230904]">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                  {/* Custom color inputs */}
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div>
                      <label className="text-xs text-[#514441]/70 mb-1 block">CSS Color Class (bg-)</label>
                      <input
                        type="text"
                        value={form.color || ''}
                        onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                        placeholder="bg-[#96bd76]"
                        className="w-full px-3 py-2 border-2 border-[#f5ddd8] rounded-xl text-xs focus:outline-none focus:border-[#ba821b] bg-[#fff8f6] font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#514441]/70 mb-1 block">CSS Text Color Class</label>
                      <input
                        type="text"
                        value={form.text_color || ''}
                        onChange={e => setForm(f => ({ ...f, text_color: e.target.value }))}
                        placeholder="text-white"
                        className="w-full px-3 py-2 border-2 border-[#f5ddd8] rounded-xl text-xs focus:outline-none focus:border-[#ba821b] bg-[#fff8f6] font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Sort Order & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#514441] uppercase tracking-wider mb-1.5 block">Urutan Tampil</label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))}
                    min={0}
                    className="w-full px-4 py-3 border-2 border-[#f5ddd8] rounded-xl text-sm focus:outline-none focus:border-[#ba821b] transition-colors bg-[#fff8f6]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#514441] uppercase tracking-wider mb-1.5 block">Status</label>
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, is_active: !f.is_active }))}
                    className={`w-full px-4 py-3 rounded-xl text-sm font-bold transition-colors border-2 flex items-center justify-center gap-2 ${form.is_active
                      ? 'bg-green-50 border-green-300 text-green-700'
                      : 'bg-gray-50 border-gray-300 text-gray-500'
                      }`}
                  >
                    {form.is_active ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                    {form.is_active ? 'Aktif' : 'Nonaktif'}
                  </button>
                </div>
              </div>

              {/* Save Error */}
              {saveError && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-xl text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />{saveError}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 border-2 border-[#f5ddd8] text-[#514441] rounded-xl font-bold text-sm hover:border-[#d5c2bf] transition-colors"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-[#230904] text-white px-4 py-3 rounded-xl font-bold text-sm hover:bg-[#3d1d16] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
                >
                  {saving ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</>
                  ) : (
                    <><Check className="w-4 h-4" /> {editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
