import React from 'react';
import { ShoppingBag, ShieldCheck, ChefHat } from 'lucide-react';

interface HeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function Header({ cartCount = 0, onOpenCart }: HeaderProps) {
  return (
    <header className="fixed top-9 left-0 w-full z-40 bg-[#fff8f6]/95 backdrop-blur-md border-b border-[#f5ddd8]/80 shadow-sm transition-all">
      <div className="h-20 w-full px-6 max-w-[1240px] mx-auto flex items-center justify-between">
        
        {/* Logo & Brand Name */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#230904] to-[#7e544b] border border-[#ba821b]/30 flex items-center justify-center p-1.5 shadow-md group-hover:scale-105 transition-transform">
            <img
              alt="Logo Kue Balok Pamulang"
              className="h-6 w-auto object-contain"
              src="/logo.jpg"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-['Bricolage_Grotesque'] text-2xl font-black text-[#230904] tracking-tight group-hover:text-[#7e544b] transition-colors leading-none">
              Kue Balok Pamulang
            </span>
            <span className="text-[10px] text-[#ba821b] font-bold tracking-widest uppercase mt-0.5">
              Lumer • Fresh • Artisanal
            </span>
          </div>
        </a>
        
        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-['Be_Vietnam_Pro'] font-bold">
          <a href="#" className="text-[#230904] hover:text-[#ba821b] transition-colors relative group py-1">
            Beranda
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ba821b] scale-x-100 transition-transform origin-left" />
          </a>
          <a href="#menu" className="text-[#514441] hover:text-[#230904] transition-colors relative group py-1">
            Menu Lumer
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ba821b] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </a>
          <a href="#locations" className="text-[#514441] hover:text-[#230904] transition-colors relative group py-1">
            Lokasi Outlet
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ba821b] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </a>
          <a href="#story" className="text-[#514441] hover:text-[#230904] transition-colors relative group py-1">
            Cerita Rasa
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ba821b] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          
          {/* Admin Quick Link */}
          <a
            href="/?page=admin"
            className="p-2.5 rounded-xl text-[#514441] hover:text-[#230904] hover:bg-[#ffe9e4] border border-transparent hover:border-[#f5ddd8] transition-all flex items-center gap-1.5 text-xs font-bold"
            title="Kelola Produk (Admin)"
          >
            <ChefHat className="w-4 h-4 text-[#ba821b]" />
            <span className="hidden sm:inline">Admin</span>
          </a>

          {/* Cart Button */}
          <button 
            onClick={onOpenCart}
            className="bg-[#230904] text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl font-bold text-xs sm:text-sm hover:bg-[#3d1d16] hover:scale-[1.03] active:scale-[0.98] transition-all relative shadow-md flex items-center gap-2 group"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span>Pesanan</span>
            {cartCount > 0 && (
              <span className="bg-[#ba821b] text-white text-[11px] px-2 py-0.5 rounded-full font-bold animate-bounce shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
}
