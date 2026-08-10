import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ChefHat, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulasi delay kecil untuk kesan verifikasi
    await new Promise(resolve => setTimeout(resolve, 600));

    if (password === adminPassword) {
      // Simpan sesi admin di sessionStorage (hilang saat tab ditutup)
      sessionStorage.setItem('kbp_admin_auth', 'true');
      onLogin();
    } else {
      setError('Password salah. Coba lagi.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0604] via-[#230904] to-[#3d1d16] flex items-center justify-center p-6">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header band */}
          <div className="bg-gradient-to-r from-[#230904] to-[#7e544b] p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#ba821b]/20 border border-[#ba821b]/30 flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-8 h-8 text-[#ba821b]" />
            </div>
            <h1 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-white mb-1">
              Admin Panel
            </h1>
            <p className="text-white/60 text-sm font-['Be_Vietnam_Pro']">
              Kue Balok Pamulang — Manajemen Produk
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="admin-password" className="block text-sm font-bold text-[#230904] mb-2 font-['Be_Vietnam_Pro']">
                  Password Admin
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                    <Lock className="w-4 h-4 text-[#514441]" />
                  </div>
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="w-full pl-10 pr-12 py-3.5 border-2 border-[#f5ddd8] rounded-xl font-['Be_Vietnam_Pro'] text-sm focus:outline-none focus:border-[#ba821b] transition-colors bg-[#fff8f6]"
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3.5 flex items-center text-[#514441] hover:text-[#230904] transition-colors"
                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-xl text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="font-['Be_Vietnam_Pro']">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !password}
                className="w-full bg-[#230904] text-white py-4 rounded-xl font-['Be_Vietnam_Pro'] font-bold text-sm hover:bg-[#3d1d16] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Memverifikasi...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" /> Masuk ke Admin Panel
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-[#514441]/60 mt-6 font-['Be_Vietnam_Pro']">
              Halaman ini hanya untuk administrator toko.
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-white/50 hover:text-white text-sm font-['Be_Vietnam_Pro'] transition-colors"
          >
            ← Kembali ke Website
          </a>
        </div>
      </div>
    </div>
  );
}
