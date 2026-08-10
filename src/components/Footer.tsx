import React from 'react';
import { Navigation, QrCode, Sliders, Share2, Instagram, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#ffe9e4]/60 py-16 border-t border-[#f5ddd8]">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-[#d5c2bf]/30">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img 
              alt="Logo Kue Balok Pamulang" 
              className="h-6 w-auto grayscale opacity-80" 
              src="/logo.jpg" 
            /> 
            <span className="font-['Bricolage_Grotesque'] text-xl font-bold text-[#230904]">
              Kue Balok Pamulang
            </span>
          </div>

          <p className="font-['Be_Vietnam_Pro'] text-sm text-[#514441] max-w-xs leading-relaxed">
            Kue balok lezat, hangat, dan berkualitas tinggi yang dipanggang segar setiap hari di pusat Pamulang.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-2 text-[#514441]">
            <a
              href="https://www.instagram.com/kuebaloklumer.pamulang/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/80 border border-[#d5c2bf]/40 hover:bg-[#230904] hover:text-white transition-all shadow-sm"
              aria-label="Instagram Kue Balok Pamulang"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href="https://www.tiktok.com/@kuebaloklumer.pamulang"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/80 border border-[#d5c2bf]/40 hover:bg-[#230904] hover:text-white transition-all shadow-sm flex items-center justify-center font-bold text-xs"
              aria-label="TikTok Kue Balok Pamulang"
            >
              {/* TikTok Icon */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.82V7.63a6.34 6.34 0 0 0-5.11 6.25 6.34 6.34 0 1 0 11.45-3.67 8.3 8.3 0 0 0 4.67 1.48v-3.5a4.85 4.85 0 0 1-1.4.15z"/>
              </svg>
            </a>

            <a
              href="https://wa.me/6285717066697"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/80 border border-[#d5c2bf]/40 hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
              aria-label="WhatsApp Kue Balok Pamulang"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        {/* Jam Operasional Column */}
        <div>
          <h4 className="font-['Be_Vietnam_Pro'] text-xs font-bold text-[#230904] uppercase tracking-wider mb-6">
            JAM OPERASIONAL
          </h4>
          <ul className="space-y-3 font-['Be_Vietnam_Pro'] text-sm text-[#514441]">
            <li>Senin - Jumat: 09:00 - 21:00</li>
            <li>Sabtu - Minggu: 08:00 - 22:00</li>
          </ul>
        </div>
        
        {/* Lokasi & Kontak Column */}
        <div>
          <h4 className="font-['Be_Vietnam_Pro'] text-xs font-bold text-[#230904] uppercase tracking-wider mb-6">
            LOKASI & KONTAK
          </h4>
          <p className="font-['Be_Vietnam_Pro'] text-sm text-[#514441] mb-2 leading-relaxed">
            Jl. Surya Kencana No. 12<br/>
            Pamulang, Tangerang Selatan, Banten 15417
          </p>
          <a
            href="https://wa.me/6285717066697"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono font-bold text-[#ba821b] hover:underline block mb-4"
          >
            WhatsApp: +62 857-1706-6697
          </a>
          <a 
            href="https://maps.google.com/?q=Jl.+Surya+Kencana+No.+12+Pamulang+Barat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#230904] hover:text-[#ba821b] transition-colors bg-white/80 px-3 py-2 rounded-lg border border-[#d5c2bf]/40"
          >
            <Navigation className="w-3.5 h-3.5" /> Petunjuk Arah Google Maps
          </a>
        </div>

      </div>
      
      <div className="max-w-[1200px] mx-auto px-6 mt-8 text-center text-[#514441] text-xs font-['Be_Vietnam_Pro']">
        © {new Date().getFullYear()} Kue Balok Pamulang. Dibuat dengan sepenuh hati.
      </div>
    </footer>
  );
}
