import React from 'react';
import { Flame, Sparkles, Truck, Gift, Star } from 'lucide-react';

export default function PromoTicker() {
  const items = [
    { icon: Flame, text: 'DIPANGGANG SEGAR SETIAP HARI DI CABANG PAMULANG' },
    { icon: Sparkles, text: 'ISIAN 100% COKELAT LUMER BELGIAN PREMIUM' },
    { icon: Truck, text: 'GRATIS ONGKIR SE-PAMULANG MIN. ORDER 50K' },
    { icon: Gift, text: 'TERIMA PESANAN EVENT, ARISAN & ULANG TAHUN' },
    { icon: Star, text: 'RATING 4.9/5 DARI 1.200+ PELANGGAN SETIA' },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-[#230904] via-[#3d1d16] to-[#230904] text-white py-2.5 overflow-hidden border-b border-[#ba821b]/30 shadow-md relative z-30">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Repeat list twice for seamless infinite scrolling marquee effect */}
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-2 mx-6 text-xs font-['Be_Vietnam_Pro'] font-bold tracking-wider text-amber-200">
              <Icon className="w-4 h-4 text-[#ba821b] animate-pulse flex-shrink-0" />
              <span>{item.text}</span>
              <span className="text-[#ba821b]/50 ml-4 font-black">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
