import React, { useState } from 'react';
import { Star, ShoppingCart, Plus, Minus } from 'lucide-react';
import { CartItem } from './CartDrawer';

interface ProductsProps {
  onAddToCart?: (item: CartItem) => void;
}

export default function Products({ onAddToCart }: ProductsProps) {
  const [signatureQty, setSignatureQty] = useState(1);

  const toppings = [
    { 
      name: 'GREEN TEA', 
      color: 'bg-[#96bd76]', 
      text: 'text-white',
      img: 'https://images.unsplash.com/photo-1534432182912-638548dd0676?auto=format&fit=crop&q=80&w=400',
      price: 24000
    },
    { 
      name: 'TIRAMISU', 
      color: 'bg-[#a37c56]', 
      text: 'text-white',
      img: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&q=80&w=400',
      price: 24000
    },
    { 
      name: 'STRAWBERRY', 
      color: 'bg-[#f48a97]', 
      text: 'text-white',
      img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=400',
      price: 24000
    },
    { 
      name: 'VANILA', 
      color: 'bg-[#f1ecc7]', 
      text: 'text-[#230904]',
      img: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=400',
      price: 24000
    },
    { 
      name: 'TARO', 
      color: 'bg-[#927dd0]', 
      text: 'text-white',
      img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
      price: 24000
    }
  ];

  const handleAddSignature = () => {
    if (onAddToCart) {
      onAddToCart({
        id: 'mix-rasa-5',
        name: 'Kue Balok Lumer Mix Rasa',
        price: 23000,
        quantity: signatureQty,
        variant: '5 Pcs (Mix Rasa)',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEiJSiZoHwuaUC55-AII880newJe0j_q2xVAwTNsyhGE_DHBWXwA3qQ1ijnUKPwbw0lrptL0LN6DffoGmDRqF5EC_JoxV4AhPgBYm_Z1vMrD5Lz06M7pk1WusdHEflHI7dZBCvkROukitrPBiBcdJSEIjZ7MHYmUv8nXtFBBASKkqRuQ6DmYtniZ9iqeZuYZFycx_1VhNYQczH-71U77MQIMVK1FJBF3NtaKl2Iq7rNmt1a01Zz7IE'
      });
    }
  };

  const handleAddClassic = (id: string, name: string, price: number, img: string) => {
    if (onAddToCart) {
      onAddToCart({
        id,
        name,
        price,
        quantity: 1,
        variant: '5 Pcs',
        image: img
      });
    }
  };

  return (
    <section className="w-full py-20 bg-[#fff8f6] relative" id="menu">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-[#230904] text-[#ba821b] px-4 py-1.5 rounded-full mb-6 shadow-sm">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-['Be_Vietnam_Pro'] text-[12px] font-bold uppercase tracking-wider">DIPANGGANG SEGAR SETIAP HARI</span>
          </div>
          <h2 className="font-['Bricolage_Grotesque'] text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#230904] max-w-3xl mb-4">
            Temukan Kelezatan Hakiki <span className="text-[#7e544b]">Kue Balok Lumer</span>
          </h2>
          <p className="font-['Be_Vietnam_Pro'] text-base md:text-lg text-[#514441] max-w-2xl leading-relaxed">
            Nikmati kelezatan khas Kue Balok Pamulang yang dipanggang sempurna dengan lapisan luar renyah dan isian cokelat lumer melimpah. Dibuat dengan bahan-bahan premium di jantung kota Pamulang.
          </p>
        </div>

        {/* Signature Selection */}
        <div className="mb-20">
          <div className="flex justify-between items-end border-b border-[#d5c2bf]/30 pb-4 mb-8">
            <div>
              <h3 className="font-[#Bricolage_Grotesque] text-3xl font-bold text-[#230904]">Pilihan Spesial Signature</h3>
              <p className="font-[#Be_Vietnam_Pro] text-sm text-[#514441] mt-1">Pengalaman perpaduan varian rasa paling diminati.</p>
            </div>
            <Star className="w-7 h-7 text-[#d5c2bf]" />
          </div>

          <div className="bg-white rounded-[2rem] shadow-[0_12px_32px_rgba(61,29,22,0.06)] overflow-hidden flex flex-col lg:flex-row border border-[#f5ddd8]/40">
            <div className="w-full lg:w-3/5 relative min-h-[350px]">
              <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                <span className="bg-[#ffddaf] text-[#281800] px-4 py-1.5 rounded-full font-bold text-[12px] flex items-center gap-1 shadow-sm w-fit">
                  <Star className="w-3.5 h-3.5 fill-current" /> PALING LARIS
                </span>
                <span className="bg-[#230904] text-white px-4 py-1.5 rounded-full font-bold text-[12px] shadow-sm w-fit">
                  FULL TOPPING MIX RASA
                </span>
              </div>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEiJSiZoHwuaUC55-AII880newJe0j_q2xVAwTNsyhGE_DHBWXwA3qQ1ijnUKPwbw0lrptL0LN6DffoGmDRqF5EC_JoxV4AhPgBYm_Z1vMrD5Lz06M7pk1WusdHEflHI7dZBCvkROukitrPBiBcdJSEIjZ7MHYmUv8nXtFBBASKkqRuQ6DmYtniZ9iqeZuYZFycx_1VhNYQczH-71U77MQIMVK1FJBF3NtaKl2Iq7rNmt1a01Zz7IE" 
                alt="Kue Balok Lumer Mix Rasa" 
                className="w-full h-full object-cover min-h-[350px]"
              />
            </div>
            
            <div className="w-full lg:w-2/5 p-8 lg:p-10 flex flex-col justify-center">
              <h4 className="font-['Bricolage_Grotesque'] text-3xl font-bold text-[#230904] mb-3 leading-tight">
                Kue Balok Lumer<br/>Mix Rasa
              </h4>
              <p className="font-['Be_Vietnam_Pro'] text-sm text-[#514441] mb-8 leading-relaxed">
                Kenikmatan tertinggi. Kombinasi variasi topping terbaik kami (Green Tea, Tiramisu, Strawberry, Vanilla, dan Taro) di atas isian cokelat lumer yang meleleh sempurna. Cocok untuk dinikmati bersama...
              </p>
              
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="font-bold text-[10px] text-[#514441] uppercase tracking-wider block mb-1">HARGA PER 5 PCS</span>
                  <span className="font-['Bricolage_Grotesque'] text-3xl font-extrabold text-[#230904]">Rp 23.000</span>
                </div>
                
                <div className="flex items-center bg-[#ffe9e4] rounded-xl p-1 border border-[#d5c2bf]/30">
                  <button 
                    onClick={() => setSignatureQty(Math.max(1, signatureQty - 1))}
                    className="w-8 h-8 flex items-center justify-center text-[#230904] bg-white rounded-lg shadow-sm font-bold"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-['Bricolage_Grotesque'] text-lg font-bold">{signatureQty}</span>
                  <button 
                    onClick={() => setSignatureQty(signatureQty + 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#230904] hover:bg-white rounded-lg transition-colors font-bold"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <button 
                onClick={handleAddSignature}
                className="w-full bg-[#230904] text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#3d1d16] transition-colors shadow-md hover:scale-[1.01]"
              >
                <ShoppingCart className="w-5 h-5" /> Tambah ke Pesanan
              </button>
            </div>
          </div>
        </div>

        {/* Classics & Specialty */}
        <div className="mb-20">
          <div className="border-b border-[#d5c2bf]/30 pb-4 mb-8">
            <h3 className="font-['Bricolage_Grotesque'] text-3xl font-bold text-[#230904]">Varian Klasik & Spesial</h3>
            <p className="font-['Be_Vietnam_Pro'] text-sm text-[#514441] mt-1">Resep otentik legendaris yang mengawali segalanya.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Original Card */}
            <div className="bg-white rounded-[2rem] shadow-[0_8px_24px_rgba(61,29,22,0.04)] overflow-hidden flex flex-col border border-[#f5ddd8]/40 hover:shadow-lg transition-shadow">
              <div className="h-[250px] relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800" 
                  alt="Original Coklat" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[#230904] mb-2">Kue Balok<br/>Original Coklat</h4>
                  <p className="font-['Be_Vietnam_Pro'] text-sm text-[#514441] mb-6 leading-relaxed">
                    Varian original terfavorit. Cokelat murni berkualitas tinggi dengan lelehan hangat di bagian tengah kue.
                  </p>
                </div>
                
                <div className="flex items-end justify-between pt-4 border-t border-[#f5ddd8]/40">
                  <div>
                    <span className="font-bold text-[10px] text-[#514441] uppercase block mb-1">5 PCS</span>
                    <span className="font-['Bricolage_Grotesque'] text-2xl font-extrabold text-[#230904]">Rp 18.000</span>
                  </div>
                  <button 
                    onClick={() => handleAddClassic('ori-5', 'Kue Balok Original Coklat', 18000, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800')}
                    className="bg-[#ffe9e4] text-[#230904] px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1 hover:bg-[#f5ddd8] transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Tambah
                  </button>
                </div>
              </div>
            </div>

            {/* Keju Card */}
            <div className="bg-white rounded-[2rem] shadow-[0_8px_24px_rgba(61,29,22,0.04)] overflow-hidden flex flex-col border border-[#f5ddd8]/40 hover:shadow-lg transition-shadow">
              <div className="h-[250px] relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=800" 
                  alt="Original Coklat Full Toping Keju" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[#230904] mb-2">Original Coklat<br/>Full Toping Keju</h4>
                  <p className="font-['Be_Vietnam_Pro'] text-sm text-[#514441] mb-6 leading-relaxed">
                    Perpaduan sempurna rasa manis dan gurih. Kue balok cokelat klasik ditaburi keju cheddar parut melimpah di atasnya.
                  </p>
                </div>
                
                <div className="flex items-end justify-between pt-4 border-t border-[#f5ddd8]/40">
                  <div>
                    <span className="font-bold text-[10px] text-[#514441] uppercase block mb-1">5 PCS</span>
                    <span className="font-['Bricolage_Grotesque'] text-2xl font-extrabold text-[#230904]">Rp 25.000</span>
                  </div>
                  <button 
                    onClick={() => handleAddClassic('keju-5', 'Original Coklat Full Toping Keju', 25000, 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=800')}
                    className="bg-[#ffe9e4] text-[#230904] px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1 hover:bg-[#f5ddd8] transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Tambah
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Varian Toping */}
        <div>
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px bg-[#d5c2bf]/50 flex-grow max-w-[120px]"></div>
            <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[#230904] uppercase tracking-widest text-center">VARIAN TOPPING</h3>
            <div className="h-px bg-[#d5c2bf]/50 flex-grow max-w-[120px]"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {toppings.map((topping, idx) => (
              <div 
                key={idx} 
                onClick={() => handleAddClassic(`top-${topping.name.toLowerCase()}`, `Kue Balok ${topping.name}`, topping.price, topping.img)}
                className="bg-white rounded-2xl p-4 flex flex-col items-center border border-[#f5ddd8] shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <div className={`px-4 py-1 rounded-full text-[10px] font-bold mb-4 -mt-7 shadow-sm ${topping.color} ${topping.text}`}>
                  {topping.name}
                </div>
                <div className="w-full aspect-square rounded-xl bg-[#ffe9e4] mb-3 overflow-hidden p-1">
                  <img 
                    src={topping.img} 
                    alt={topping.name} 
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="font-['Be_Vietnam_Pro'] text-xs font-bold text-[#514441] mb-1">5 PCS</span>
                <span className="text-[11px] text-[#ba821b] font-bold">Rp {topping.price.toLocaleString('id-ID')}</span>
              </div>
            ))}
          </div>
          
          <p className="text-center font-['Be_Vietnam_Pro'] text-sm text-[#514441] mt-10">
            Pilih varian rasa favoritmu atau nikmati semuanya sekaligus dalam box Signature Mix Rasa kami.
          </p>
        </div>

      </div>
    </section>
  );
}
