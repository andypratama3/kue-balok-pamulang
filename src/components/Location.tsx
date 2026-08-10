import React from 'react';
import { MapPin, Clock, Navigation, FileText, Coffee, Store, ShoppingBag, Phone } from 'lucide-react';

export default function Location() {
  return (
    <section className="w-full bg-[#fff8f6] relative" id="locations">
      
      {/* Banner */}
      <div className="w-full h-[400px] relative flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC-hdJd04qD_8tjgILzc6plKlOypXKMAbPkyfPS1NdYkc7CI3pTbhuh-2sBeXUT_AsgShwq7Lzg5nLAY5K5cE0600F5EXJlwOqWD4FxgdadmgFJ300Gb-4EcfLtYYmU-khLv3UUTPUi4MLp2CIVFKzKlK6gezaqQJMwACd3HjDEZ42i_h3vPlATWL3ZLZ8KIMFS-j29JGJpR_1otlv1vrWbkFaW9zXk3nTJXupcuKzEllh2iM5vYWZO')" }}
        >
          <div className="absolute inset-0 bg-[#fff8f6]/75 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[#ba821b] mb-4 bg-[#ffddaf]/30 border border-[#ba821b]/20 px-4 py-1.5 rounded-full">
            <Store className="w-4 h-4" />
            <span className="font-['Be_Vietnam_Pro'] text-[12px] font-bold uppercase tracking-wider">DIPANGGANG SEGAR SETIAP HARI</span>
          </div>
          
          <h2 className="font-['Bricolage_Grotesque'] text-5xl md:text-6xl font-extrabold text-[#230904] mb-4">
            Cabang Pamulang
          </h2>
          
          <p className="font-['Be_Vietnam_Pro'] text-base md:text-lg text-[#514441] max-w-xl mx-auto mb-8 leading-relaxed">
            <strong>Lumer di mulut</strong>, <strong>lumer di hati</strong>. Kunjungi toko utama kami di Pamulang untuk menikmati kue balok hangat yang baru saja keluar dari oven.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <a 
              href="https://maps.google.com/?q=Jl.+Surya+Kencana+No.+12+Pamulang+Barat"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#230904] text-white px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-md"
            >
              <Navigation className="w-4 h-4" /> Petunjuk Arah
            </a>
            <a 
              href="https://wa.me/6285717066697?text=Halo%20Kue%20Balok%20Pamulang,%20saya%20mau%20tanya%20menu%20dan%20lokasi"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-md"
            >
              <Phone className="w-4 h-4" /> Hubungi WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Kunjungi Kami & Jam Operasional */}
          <div className="w-full lg:w-1/3 flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-[#ba821b]" />
                <h3 className="font-['Bricolage_Grotesque'] text-3xl font-bold text-[#230904]">Kunjungi Kami</h3>
              </div>
              <div className="bg-[#ffe9e4] rounded-2xl p-8 border border-[#f5ddd8]/50 space-y-4">
                <div>
                  <h4 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[#230904] mb-2">Alamat Lengkap</h4>
                  <p className="font-['Be_Vietnam_Pro'] text-sm text-[#514441] leading-relaxed">
                    Jl. Surya Kencana No. 12<br/>
                    Pamulang Barat, Kec. Pamulang<br/>
                    Kota Tangerang Selatan<br/>
                    Banten 15417
                  </p>
                </div>

                <div className="pt-3 border-t border-[#d5c2bf]/30">
                  <h5 className="font-bold text-xs text-[#230904] uppercase tracking-wider mb-1">Telepon / WA Official:</h5>
                  <a
                    href="https://wa.me/6285717066697"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm font-bold text-[#ba821b] hover:underline"
                  >
                    +62 857-1706-6697
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-[#ba821b]" />
                <h3 className="font-['Bricolage_Grotesque'] text-3xl font-bold text-[#230904]">Jam Operasional</h3>
              </div>
              <div className="bg-[#ffe9e4] rounded-2xl p-8 flex flex-col gap-4 border border-[#f5ddd8]/50">
                <div className="flex justify-between items-center border-b border-[#d5c2bf]/30 pb-4">
                  <span className="font-['Be_Vietnam_Pro'] text-sm text-[#514441]">Senin - Jumat</span>
                  <span className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#230904]">09:00 - 21:00</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#d5c2bf]/30 pb-4">
                  <span className="font-['Be_Vietnam_Pro'] text-sm text-[#514441]">Sabtu</span>
                  <span className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#230904]">08:00 - 22:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-['Be_Vietnam_Pro'] text-sm text-[#514441]">Minggu</span>
                  <span className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#230904]">08:00 - 22:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps UI */}
          <div className="w-full lg:w-2/3 h-full min-h-[480px] rounded-[2rem] overflow-hidden bg-[#f5ddd8] relative shadow-md border border-[#d5c2bf]/40">
            <iframe
              title="Peta Cabang Pamulang"
              src="https://maps.google.com/maps?q=-6.3456,106.7351&z=15&output=embed"
              className="w-full h-full min-h-[480px] border-0"
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
            
            <div className="absolute bottom-6 left-6 right-6 bg-white p-4 rounded-xl flex items-center justify-between shadow-lg border border-[#f5ddd8]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#230904] rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-bold text-[10px] text-[#514441] uppercase tracking-wider block mb-0.5">TERSEDIA PARKIR LUAS</span>
                  <span className="font-['Be_Vietnam_Pro'] text-sm text-[#230904] font-bold">Mobil & Motor</span>
                </div>
              </div>
              <a 
                href="https://maps.google.com/?q=Jl.+Surya+Kencana+No.+12+Pamulang+Barat"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ffe9e4] text-[#230904] px-5 py-2.5 rounded-lg font-bold text-xs hover:bg-[#f5ddd8] transition-colors"
              >
                Buka di Maps
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Why Cabang Pamulang */}
      <div className="w-full bg-[#ffe9e4]/40 py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-['Bricolage_Grotesque'] text-4xl font-bold text-[#230904] mb-4">
              Mengapa Cabang Pamulang?
            </h2>
            <p className="font-['Be_Vietnam_Pro'] text-base text-[#514441]">
              Pengalaman terbaik menikmati Kue Balok Lumer Pamulang.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl flex flex-col items-center text-center shadow-sm border border-[#f5ddd8]">
              <div className="w-16 h-16 rounded-full bg-[#ffe9e4] flex items-center justify-center text-[#7e544b] mb-6">
                <Coffee className="w-8 h-8" />
              </div>
              <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[#230904] mb-3">Dipanggang Segar</h3>
              <p className="font-['Be_Vietnam_Pro'] text-sm text-[#514441] leading-relaxed">
                Dipanggang langsung di tempat. Nikmati aroma semerbak coklat dan sensasi lumer seketika.
              </p>
            </div>
            
            <div className="bg-white p-10 rounded-3xl flex flex-col items-center text-center shadow-sm border border-[#f5ddd8]">
              <div className="w-16 h-16 rounded-full bg-[#ffddaf]/60 flex items-center justify-center text-[#281800] mb-6">
                <Store className="w-8 h-8" />
              </div>
              <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[#230904] mb-3">Area Makan di Tempat</h3>
              <p className="font-['Be_Vietnam_Pro'] text-sm text-[#514441] leading-relaxed">
                Tersedia tempat duduk yang nyaman untuk bersantai menikmati kue balok hangat bersama keluarga atau teman.
              </p>
            </div>
            
            <div className="bg-white p-10 rounded-3xl flex flex-col items-center text-center shadow-sm border border-[#f5ddd8]">
              <div className="w-16 h-16 rounded-full bg-[#ffe9e4] flex items-center justify-center text-[#7e544b] mb-6">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[#230904] mb-3">Pengambilan Cepat</h3>
              <p className="font-['Be_Vietnam_Pro'] text-sm text-[#514441] leading-relaxed">
                Pesan online dan ambil langsung tanpa antre. Solusi cepat untuk oleh-oleh atau cemilan sore.
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
