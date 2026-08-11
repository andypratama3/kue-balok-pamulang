import React, { useState } from 'react';
import { Star, ArrowRight, MapPin, Flame, Clock, Sparkles, ShieldCheck, ShoppingBag } from 'lucide-react';

interface HeroProps {
  onOpenCart?: () => void;
}

export default function Hero({ onOpenCart }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'lumer' | 'keju' | 'matcha'>('lumer');
  const bakedCount = 148;

  const heroItems = {
    lumer: {
      title: 'Cokelat Lumer Original',
      tag: 'BEST SELLER #1',
      price: 'Rp 18.000',
      desc: 'Isian cokelat Belgian lumer hangat yang melimpah begitu digigit.',
      img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
    },
    keju: {
      title: 'Full Toping Keju',
      tag: 'FAVORIT GURIH',
      price: 'Rp 25.000',
      desc: 'Cokelat lumer khas bertabur keju cheddar parut tebal di atasnya.',
      img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=800',
    },
    matcha: {
      title: 'Green Tea Lumer',
      tag: 'AROMA PREMIUM',
      price: 'Rp 24.000',
      desc: 'Matcha khas Jepang yang wangi dipadu kelembutan kue balok hangat.',
      img: 'https://images.unsplash.com/photo-1534432182912-638548dd0676?auto=format&fit=crop&q=80&w=400',
    },
  };

  const currentHero = heroItems[activeTab];

  return (
    <section className="relative w-full min-h-[800px] flex flex-col justify-center overflow-hidden pt-28 pb-16 bg-[#fff8f6]">
      {/* Background Mesh Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#ffe3d6] via-[#ffd0c2]/30 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-[#ffddaf]/20 rounded-full blur-3xl pointer-events-none" />



      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Column - Copy & CTA */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 pt-4">
          
          {/* Kitchen Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-[#230904] text-[#ba821b] border border-[#ba821b]/40 px-4 py-1.5 rounded-full shadow-lg">
              <span className="font-['Be_Vietnam_Pro'] text-[12px] font-bold tracking-wider text-amber-200 uppercase">
                DAPUR BUKA • FRESH DIPANGGANG SETIAP HARI
              </span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 bg-[#ffddaf]/50 text-[#7e544b] border border-[#ba821b]/20 px-3 py-1 rounded-full text-xs font-bold">
              <Flame className="w-3.5 h-3.5 fill-current text-rose-500" />
              <span>Fresh From Oven</span>
            </div>
          </div>
          
          {/* Main Title */}
          <h1 className="font-['Bricolage_Grotesque'] text-[42px] sm:text-[52px] lg:text-[60px] leading-[1.1] font-extrabold text-[#230904] tracking-tight">
            Sensasi Lumer <br />
            <span className="bg-gradient-to-r from-[#7e544b] via-[#ba821b] to-[#230904] bg-clip-text text-transparent">
              Kue Balok Pamulang
            </span>
          </h1>
          
          <p className="font-['Be_Vietnam_Pro'] text-base sm:text-lg text-[#514441] max-w-lg leading-relaxed">
            Lapisan luar renyah panggang arang arang modern, dengan isian cokelat lumer berkualitas tinggi yang langsung meleleh di gigitan pertama. Fresh setiap hari di Pamulang!
          </p>

          {/* Quick Flavor Switcher Tabs */}
          <div className="flex items-center gap-2 bg-[#ffe9e4]/70 p-1.5 rounded-2xl border border-[#f5ddd8] w-fit shadow-inner">
            {(['lumer', 'keju', 'matcha'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-['Be_Vietnam_Pro'] transition-all ${
                  activeTab === tab
                    ? 'bg-[#230904] text-white shadow-md scale-[1.03]'
                    : 'text-[#514441] hover:text-[#230904] hover:bg-white/60'
                }`}
              >
                {tab === 'lumer' && '🍫 Cokelat Lumer'}
                {tab === 'keju' && '🧀 Toping Keju'}
                {tab === 'matcha' && '🍵 Green Tea'}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <a 
              href="#menu"
              className="bg-[#230904] text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-[#3d1d16] hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-3 shadow-xl group hover:shadow-2xl hover:shadow-[#230904]/20"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
              Pesan Menu Lumer
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform text-amber-300" />
            </a>
            
            <a 
              href="#locations"
              className="flex items-center gap-3 px-5 py-3.5 bg-white rounded-2xl border border-[#f5ddd8] shadow-sm hover:shadow-md hover:border-[#ba821b]/40 transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#ffe9e4] flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5 text-[#ba821b]" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[10px] text-[#230904] uppercase tracking-wider">Cabang Pamulang</span>
                <span className="text-xs font-semibold text-[#514441]">Jl. Pamulang Permai Raya</span>
              </div>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#f5ddd8]/80 max-w-lg">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 flex-shrink-0" />
              <div className="text-xs">
                <span className="font-extrabold text-[#230904] block leading-none">4.9 / 5.0</span>
                <span className="text-[10px] text-[#514441]">1.200+ Ulasan</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#ba821b] flex-shrink-0" />
              <div className="text-xs">
                <span className="font-extrabold text-[#230904] block leading-none">15 - 30 Mnt</span>
                <span className="text-[10px] text-[#514441]">Siap Antar</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <div className="text-xs">
                <span className="font-extrabold text-[#230904] block leading-none">100% Halal</span>
                <span className="text-[10px] text-[#514441]">Bahan Premium</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column - Interactive Card & Dynamic Visual */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative mt-8 md:mt-0">
          
          {/* Floating Fresh Badge */}
          <div className="absolute -top-6 -left-4 sm:left-4 z-20 bg-gradient-to-br from-[#ba821b] to-[#8d5d0e] text-white px-5 py-3 rounded-2xl shadow-2xl rotate-[-6deg] flex items-center gap-3 border-2 border-white animate-bounce duration-1000">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Flame className="w-5 h-5 fill-amber-200 text-amber-200 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider block text-amber-100">Dipanggang Segar</span>
              <span className="font-['Bricolage_Grotesque'] text-base font-extrabold leading-none">Hati-Hati Panas! 🔥</span>
            </div>
          </div>

          {/* Main Hero Card with Preview Image & Switcher info */}
          <div className="relative w-full max-w-md bg-white p-4 sm:p-5 rounded-[2.5rem] shadow-[0_32px_64px_rgba(61,29,22,0.12)] border border-[#f5ddd8]/80 group">
            
            {/* Image Container with Dynamic Glow */}
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-4 bg-[#ffe9e4]">
              <img 
                key={activeTab}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 ease-out animate-fadeIn" 
                src={currentHero.img}
                alt={currentHero.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              
              {/* Badge on Image */}
              <div className="absolute top-4 right-4 bg-[#230904]/90 backdrop-blur-md text-amber-300 font-bold text-[11px] px-3.5 py-1.5 rounded-full border border-amber-500/30 shadow-lg">
                {currentHero.tag}
              </div>

              {/* Bottom Card Title Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs text-amber-300 font-bold uppercase tracking-wider block mb-0.5">Varian Populer</span>
                <h3 className="font-['Bricolage_Grotesque'] text-2xl font-extrabold drop-shadow">
                  {currentHero.title}
                </h3>
              </div>
            </div>

            {/* Card Content & Action */}
            <div className="px-2 pb-2">
              <p className="text-xs text-[#514441] mb-4 leading-relaxed font-['Be_Vietnam_Pro']">
                {currentHero.desc}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-[#f5ddd8]">
                <div>
                  <span className="text-[10px] text-[#514441] uppercase tracking-wider font-bold block">Harga Per Box (5 Pcs)</span>
                  <span className="font-['Bricolage_Grotesque'] text-2xl font-black text-[#230904]">
                    {currentHero.price}
                  </span>
                </div>

                <a 
                  href="#menu"
                  className="bg-[#ffe9e4] hover:bg-[#230904] text-[#230904] hover:text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm group/btn"
                >
                  <span>Pesan Varian Ini</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

          </div>

          {/* Secondary Floating Card */}
          <div className="absolute -bottom-6 -right-2 sm:right-0 z-20 bg-white p-3.5 rounded-2xl shadow-xl border border-[#f5ddd8] flex items-center gap-3 max-w-[220px] animate-pulse">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 font-bold text-sm">
              👑
            </div>
            <div>
              <span className="font-bold text-xs text-[#230904] block leading-tight">Racikan Resep Otentik</span>
              <span className="text-[10px] text-[#514441]">Cokelat Lumer Melimpah</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
