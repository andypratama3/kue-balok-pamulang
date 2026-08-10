import React from 'react';

interface HeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function Header({ cartCount = 0, onOpenCart }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#fff8f6]/90 backdrop-blur-md border-b border-[#f5ddd8]/50">
      <div className="h-20 w-full px-6 max-w-[1200px] mx-auto flex items-center justify-between">
        
        {/* Logo & Brand Name */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#ffe9e4] border border-[#f5ddd8] flex items-center justify-center p-1">
            <img
              alt="Logo Kue Balok Pamulang"
              className="h-5 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzVtGNVlOKraOwBYqLp1GwTlJRTIKzUCyI4OJTigKDvTWoUNN78RQnBgw2yoLkd-65J5F59u8Y7fOqH7Iihss-MEUQm_vaQ-7I_PqCe6yKxfrOc5Ij-M4BYCimV4u9KNrlNYiCrvmlNlF2fSewZUsWa55pBd2DY7Dw4ZBsLCsos41DZWYA9tijxF2cuMPo4c4tIkh3yIlcTyaIO3KYvtAp5jcVKOQ67j2kSXFayciIR0LE00_6XswL"
            />
          </div>
          <span className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[#230904]">
            Kue Balok Pamulang
          </span>
        </a>
        
        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm">
          <a href="#" className="font-bold text-[#230904] hover:text-[#7e544b] transition-colors">Beranda</a>
          <a href="#menu" className="text-[#514441] hover:text-[#230904] transition-colors">Menu</a>
          <a href="#locations" className="text-[#514441] hover:text-[#230904] transition-colors">Lokasi Outlet</a>
          <a href="#about" className="text-[#514441] hover:text-[#230904] transition-colors">Tentang Kami</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenCart}
            className="bg-[#230904] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:scale-[1.02] transition-all relative shadow-sm"
          >
            Pesan Sekarang
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ba821b] text-white text-[11px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
          
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#d5c2bf] flex-shrink-0">
            <img
              alt="Profil Pelanggan"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqTLBy_xgSS8CklORk8oWIOiBbDJ7ANeQQPVjosh7zxHwsNibtO8VQuErVuIQJO5m6zeLU570mUhjOsh_vqo2sDdlNzd-XC-wNMA2N7a2xvkv5Iy_vcqGjpZf-1PQ6PeBklRRNs0EsrExzzKOC65z94F_IUP-SpCl4tsOg2zJSUqK-V-xOqKFvY3TLyVZgbrQ_3FvX-DB5m8W53ETLS5rC3GxEQHSjk_cDDb_rz_MwcX6_xa4thRN7"
            />
          </div>
        </div>

      </div>
    </header>
  );
}
