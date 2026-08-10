import React from 'react';
import { Croissant, Leaf, Heart } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Croissant className="w-7 h-7 text-[#7e544b]" />,
      title: "Freshly Baked",
      description: "Dipanggang segar setiap hari untuk menjamin kehangatan dan kelembutan tekstur kue balok saat Anda nikmati.",
      bgClass: "bg-[#ffe9e4]"
    },
    {
      icon: <Leaf className="w-7 h-7 text-[#ba821b]" />,
      title: "Bahan Pilihan",
      description: "Hanya menggunakan coklat premium dan bahan berkualitas tinggi tanpa pengawet untuk rasa yang otentik.",
      bgClass: "bg-[#ffddaf]/60"
    },
    {
      icon: <Heart className="w-7 h-7 text-[#7e544b]" />,
      title: "Lumer di Hati",
      description: "Tekstur lumer di dalam yang memberikan sensasi manis yang menenangkan, cocok untuk berbagai momen.",
      bgClass: "bg-[#ffe9e4]"
    }
  ];

  return (
    <section className="w-full py-20 bg-[#ffe9e4]/40 relative mt-[-2rem] pt-24 rounded-t-[3rem] z-20">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="font-['Bricolage_Grotesque'] text-4xl md:text-5xl font-bold text-[#230904] mb-4">
            Mengapa Kue Balok Pamulang?
          </h2>
          <p className="font-['Be_Vietnam_Pro'] text-base md:text-lg text-[#514441] max-w-2xl mx-auto">
            Kami menggunakan bahan-bahan terbaik untuk memastikan setiap gigitan memberikan sensasi lumer yang tak terlupakan.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-10 rounded-[2rem] shadow-[0_8px_24px_rgba(61,29,22,0.04)] hover:shadow-[0_12px_32px_rgba(61,29,22,0.08)] transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className={`w-20 h-20 rounded-full ${feature.bgClass} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[#230904] mb-4">
                {feature.title}
              </h3>
              <p className="font-['Be_Vietnam_Pro'] text-base text-[#514441] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
