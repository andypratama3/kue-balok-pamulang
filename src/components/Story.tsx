import React from 'react';
import { Star, Heart, ThumbsUp, Medal, Flame } from 'lucide-react';

export default function Story() {
  return (
    <section className="w-full bg-[#fff8f6] pt-20" id="about">
      
      {/* Hero Story */}
      <div className="max-w-[1200px] mx-auto px-6 mb-32">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 bg-[#ffe9e4] border border-[#f5ddd8] text-[#514441] px-4 py-1.5 rounded-full mb-8">
              <Star className="w-4 h-4 text-[#ba821b]" />
              <span className="font-['Be_Vietnam_Pro'] text-[12px] font-bold uppercase tracking-wider">CERITA KAMI</span>
            </div>

            <h2 className="font-['Bricolage_Grotesque'] text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#230904] mb-8 leading-[1.1]">
              Menghadirkan Pengalaman <br/>
              <span className="relative inline-block">
                <span className="relative z-10 italic">Lumer</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-[#ffddaf]/60 -z-0 rounded"></span>
              </span>
              <br/> Sempurna
            </h2>

            <p className="font-['Be_Vietnam_Pro'] text-base md:text-lg text-[#514441] leading-relaxed max-w-md mb-10">
              Di Kue Balok Pamulang, kami percaya bahwa setiap gigitan harus memberikan kenyamanan dan kehangatan sejati. Perjalanan kami dimulai dari keinginan sederhana: menyempurnakan resep Kue Balok tradisional menjadi mahakarya kuliner manis yang mampu melelehkan hati.
            </p>
            
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                <div className="w-11 h-11 rounded-full bg-[#ffe9e4] flex items-center justify-center border-2 border-white text-[#7e544b]">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div className="w-11 h-11 rounded-full bg-[#ffe9e4] flex items-center justify-center border-2 border-white text-[#7e544b]">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <div className="w-11 h-11 rounded-full bg-[#ffddaf] flex items-center justify-center border-2 border-white text-[#281800]">
                  <ThumbsUp className="w-5 h-5 fill-current" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-[#230904]">Dicintai Lebih dari 10.000+</span>
                <span className="font-['Be_Vietnam_Pro'] text-xs text-[#514441]">Pecinta Kuliner Manis</span>
              </div>
            </div>

          </div>
          
          <div className="w-full lg:w-1/2 relative">
            {/* Background card container */}
            <div className="absolute top-10 -left-10 w-full h-full bg-[#ffe9e4]/60 rounded-[3rem] -z-10 rotate-3 border border-[#f5ddd8]"></div>
            
            <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] shadow-xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000" 
                alt="Chef Lina menyiapkan Kue Balok Pamulang" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl flex items-center gap-4 shadow-lg border border-[#f5ddd8]">
                <div className="w-12 h-12 bg-[#230904] rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  <Medal className="w-6 h-6 text-[#ba821b]" />
                </div>
                <div>
                  <span className="font-bold text-xs text-[#230904] uppercase tracking-wide block mb-0.5">CHEF LINA</span>
                  <span className="font-['Be_Vietnam_Pro'] text-xs text-[#514441]">Kepala Koki Pastry & Pengrajin Kue</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* The Art of the Melt */}
      <div className="max-w-[1200px] mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h3 className="font-['Bricolage_Grotesque'] text-4xl font-bold text-[#230904] mb-4">Seni Kelezatan Lumer</h3>
          <p className="font-['Be_Vietnam_Pro'] text-base md:text-lg text-[#514441] max-w-2xl mx-auto leading-relaxed">
            Menciptakan tekstur 'lumer' yang khas membutuhkan lebih dari sekadar resep; ini membutuhkan dedikasi tanpa kompromi pada proses pembuatan kue serta bahan-bahan terbaik pilihan alam.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <div className="bg-[#ffe9e4]/50 p-10 rounded-[2rem] flex flex-col justify-start border border-[#f5ddd8]/50">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm mb-8 text-[#ba821b]">
              <Star className="w-8 h-8 fill-current" />
            </div>
            <h4 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[#230904] mb-4">Bahan Premium</h4>
            <p className="font-['Be_Vietnam_Pro'] text-sm text-[#514441] leading-relaxed">
              Kami hanya menggunakan cokelat murni pilihan, olahan susu segar, dan tepung berkualitas tinggi. Kami tidak pernah berkompromi pada kualitas rasa.
            </p>
          </div>
          
          <div className="bg-[#ffe9e4]/90 p-10 rounded-[2rem] flex flex-col justify-start border border-[#f5ddd8]/50">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm mb-8 text-[#230904]">
              <Flame className="w-8 h-8 fill-current text-[#ba821b]" />
            </div>
            <h4 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[#230904] mb-4">Dipanggang Batch Kecil</h4>
            <p className="font-['Be_Vietnam_Pro'] text-sm text-[#514441] leading-relaxed">
              Untuk memastikan bagian tengah kue tetap meleleh sempurna, setiap loyang Kue Balok dipanggang dalam jumlah kecil yang dipantau dengan cermat.
            </p>
          </div>
          
          <div className="bg-[#ffe9e4]/50 p-10 rounded-[2rem] flex flex-col justify-start border border-[#f5ddd8]/50">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm mb-8 text-[#7e544b]">
              <Flame className="w-8 h-8" />
            </div>
            <h4 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[#230904] mb-4">Dipanggang Segar Setiap Hari</h4>
            <p className="font-['Be_Vietnam_Pro'] text-sm text-[#514441] leading-relaxed">
              Oven kami mulai bekerja sebelum fajar. Kami percaya kue balok paling nikmat disajikan dalam kondisi paling segar, membawa kehangatan langsung ke tangan Anda.
            </p>
          </div>
        </div>
      </div>

      {/* Dark Quote Banner */}
      <div className="w-full bg-[#230904] py-28 text-center px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="font-['Bricolage_Grotesque'] text-5xl text-[#ba821b] font-serif mb-6 font-bold">
            ”
          </div>
          <h2 className="font-['Bricolage_Grotesque'] text-3xl md:text-5xl lg:text-6xl text-white font-extrabold leading-tight mb-10">
            "Membuat kue bukan sekadar mencampur bahan-bahan; ini adalah tentang menyalurkan kehangatan dan kepedulian menjadi sesuatu yang dapat Anda nikmati."
          </h2>
          <p className="font-['Be_Vietnam_Pro'] text-amber-200/90 italic text-sm md:text-base flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#ba821b]/50 block"></span>
            Tim Kue Balok Pamulang
            <span className="w-8 h-px bg-[#ba821b]/50 block"></span>
          </p>
        </div>
      </div>

    </section>
  );
}
