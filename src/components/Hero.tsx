import React from 'react';
import { Star, ArrowRight, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenCart?: () => void;
}

export default function Hero({ onOpenCart }: HeroProps) {
  return (
    <section className="relative w-full min-h-[870px] flex items-center justify-center overflow-hidden pt-20 bg-[#fff8f6]">
      {/* Background with subtle grid of cakes */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC-hdJd04qD_8tjgILzc6plKlOypXKMAbPkyfPS1NdYkc7CI3pTbhuh-2sBeXUT_AsgShwq7Lzg5nLAY5K5cE0600F5EXJlwOqWD4FxgdadmgFJ300Gb-4EcfLtYYmU-khLv3UUTPUi4MLp2CIVFKzKlK6gezaqQJMwACd3HjDEZ42i_h3vPlATWL3ZLZ8KIMFS-j29JGJpR_1otlv1vrWbkFaW9zXk3nTJXupcuKzEllh2iM5vYWZO')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#fff8f6] via-[#fff8f6]/80 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Column */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 pt-12 md:pt-0">
          <div className="inline-flex items-center gap-2 bg-[#ffddaf]/40 text-[#ba821b] border border-[#ba821b]/20 px-4 py-1.5 rounded-full w-fit">
            <Star className="w-3.5 h-3.5 fill-current text-[#ba821b]" />
            <span className="font-['Be_Vietnam_Pro'] text-[12px] font-bold uppercase tracking-wider">
              KUALITAS PREMIUM ARTISANAL
            </span>
          </div>
          
          <h1 className="font-['Bricolage_Grotesque'] text-[56px] leading-[64px] font-extrabold text-[#230904] max-w-2xl">
            Lumer di Mulut, <br/>
            <span className="text-[#7e544b]">Lumer di Hati</span>
          </h1>
          
          <p className="font-['Be_Vietnam_Pro'] text-[18px] leading-[28px] text-[#514441] max-w-lg">
            Nikmati sensasi kue balok premium dengan berbagai varian topping lumer yang menggoda. Dipanggang dengan sepenuh hati setiap hari untuk menemani momen manismu.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <a 
              href="#menu"
              className="bg-[#230904] text-white px-8 py-4 rounded-xl font-bold text-sm hover:scale-[1.02] transition-all flex items-center gap-2 shadow-md group"
            >
              Lihat Menu
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="#locations"
              className="flex items-center gap-3 px-5 py-3 bg-[#fff8f6] rounded-xl border border-[#230904]/10 shadow-sm hover:bg-[#ffe9e4] transition-colors"
            >
              <MapPin className="w-5 h-5 text-[#ba821b]" />
              <div className="flex flex-col">
                <span className="font-bold text-[10px] text-[#230904] uppercase tracking-wider">Cabang Utama</span>
                <span className="text-sm font-medium text-[#514441]">Pamulang</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative mt-12 md:mt-0">
          
          {/* Circular Baked Badge */}
          <div className="absolute -top-6 -left-6 z-20 bg-[#ba821b] text-white w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-xl rotate-12 text-center p-2">
            <span className="font-bold text-[9px] tracking-widest uppercase">DIPANGGANG</span>
            <span className="font-['Bricolage_Grotesque'] text-xl font-black leading-none mt-0.5">Segar</span>
          </div>

          {/* Kue Balok Image Card */}
          <div className="relative w-full max-w-md aspect-square rounded-[2rem] overflow-hidden shadow-[0_24px_48px_rgba(61,29,22,0.15)] group">
            <img 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEiJSiZoHwuaUC55-AII880newJe0j_q2xVAwTNsyhGE_DHBWXwA3qQ1ijnUKPwbw0lrptL0LN6DffoGmDRqF5EC_JoxV4AhPgBYm_Z1vMrD5Lz06M7pk1WusdHEflHI7dZBCvkROukitrPBiBcdJSEIjZ7MHYmUv8nXtFBBASKkqRuQ6DmYtniZ9iqeZuYZFycx_1VhNYQczH-71U77MQIMVK1FJBF3NtaKl2Iq7rNmt1a01Zz7IE"
              alt="Kue Balok Pamulang Lumer Segar"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
