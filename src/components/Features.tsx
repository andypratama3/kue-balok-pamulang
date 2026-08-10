import React from 'react';
import { Flame, Sparkles, Heart, Award, ShieldCheck, Truck } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Flame className="w-8 h-8 text-[#ba821b]" />,
      title: "Dipanggang Fresh Tiap Jam",
      tag: "100% SEGAR",
      description: "Dipanggang hangat langsung saat ada pesanan untuk menjamin lelehan cokelat di bagian dalam kue tetap melimpah.",
      bgClass: "bg-[#ffddaf]/40 border-[#ba821b]/30"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-[#7e544b]" />,
      title: "Resep Cokelat Belgia",
      tag: "BAHAN PREMIUM",
      description: "Hanya menggunakan kakao & cokelat murni berkualitas tinggi tanpa bahan pengawet sintesis untuk rasa paling otentik.",
      bgClass: "bg-[#ffe9e4] border-[#7e544b]/20"
    },
    {
      icon: <Heart className="w-8 h-8 text-rose-500" />,
      title: "Lumer Di Gigitan Pertama",
      tag: "SENSASI KHAS",
      description: "Tekstur luar yang renyah berpadu dengan lelehan cokelat yang kaya rasa, siap menghangatkan harimu.",
      bgClass: "bg-rose-50 border-rose-200"
    }
  ];

  const stats = [
    { number: '10.000+', label: 'Box Terjual', icon: Award },
    { number: '100%', label: 'Bahan Halal', icon: ShieldCheck },
    { number: '4.9 ★', label: 'Rating Ulasan', icon: Sparkles },
    { number: '15-30 Mnt', label: 'Estimasi Kirim', icon: Truck },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-[#fff8f6] via-[#ffe9e4]/60 to-[#fff8f6] relative mt-[-2rem] pt-24 rounded-t-[3rem] z-20 overflow-hidden">
      
      {/* Background Decorative Circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#ffddaf]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#ffe9e4] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#230904] text-[#ba821b] px-4 py-1.5 rounded-full mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 fill-current" />
            <span className="font-['Be_Vietnam_Pro'] text-[12px] font-bold uppercase tracking-wider">
              KEUNGGULAN KAMI
            </span>
          </div>

          <h2 className="font-['Bricolage_Grotesque'] text-4xl md:text-5xl font-extrabold text-[#230904] mb-4">
            Mengapa Memilih <span className="text-[#7e544b]">Kue Balok Pamulang?</span>
          </h2>
          <p className="font-['Be_Vietnam_Pro'] text-base md:text-lg text-[#514441] max-w-2xl mx-auto leading-relaxed">
            Dedikasi rasa otentik dengan racikan cokelat lumer berkualitas tinggi di Pamulang.
          </p>
        </div>
        
        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white/80 backdrop-blur-md p-8 sm:p-10 rounded-[2.5rem] border border-[#f5ddd8] shadow-[0_12px_32px_rgba(61,29,22,0.04)] hover:shadow-[0_20px_40px_rgba(61,29,22,0.12)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group relative overflow-hidden"
            >
              {/* Badge */}
              <span className="absolute top-5 right-5 text-[10px] font-bold text-[#ba821b] bg-[#ffddaf]/40 px-3 py-1 rounded-full border border-[#ba821b]/20">
                {feature.tag}
              </span>

              {/* Icon Container with Hover Animation */}
              <div className={`w-20 h-20 rounded-2xl ${feature.bgClass} border flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm`}>
                {feature.icon}
              </div>

              <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[#230904] mb-3">
                {feature.title}
              </h3>
              <p className="font-['Be_Vietnam_Pro'] text-sm text-[#514441] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Live Interactive Stats Counter Bar */}
        <div className="bg-[#230904] text-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-[#ba821b]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center relative z-10">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex flex-col items-center justify-center p-3 group">
                  <Icon className="w-6 h-6 text-[#ba821b] mb-2 group-hover:scale-125 transition-transform" />
                  <span className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-black text-amber-300 mb-1 tracking-tight">
                    {stat.number}
                  </span>
                  <span className="font-['Be_Vietnam_Pro'] text-xs font-semibold text-white/80 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
