import React, { useState, useCallback, useMemo } from 'react';
import { Sparkles, Plus, Check, ShoppingCart, RefreshCw, Star } from 'lucide-react';
import { CartItem } from './CartDrawer';

interface CustomBoxBuilderProps {
  onAddToCart: (item: CartItem) => void;
}

export default function CustomBoxBuilder({ onAddToCart }: CustomBoxBuilderProps) {
  const [boxSize, setBoxSize] = useState<6 | 10>(6);
  const [selectedToppings, setSelectedToppings] = useState<{ [key: string]: number }>({});

  const availableToppings = [
    { id: 'cokelat', name: 'Cokelat Lumer Original', color: 'bg-[#3d1d16]', textColor: 'text-white', priceAdd: 0 },
    { id: 'keju', name: 'Keju Cheddar Melimpah', color: 'bg-[#f4be42]', textColor: 'text-primary', priceAdd: 0 },
    { id: 'matcha', name: 'Green Tea Matcha', color: 'bg-[#6b904e]', textColor: 'text-white', priceAdd: 0 },
    { id: 'tiramisu', name: 'Tiramisu Espresso', color: 'bg-[#8c6543]', textColor: 'text-white', priceAdd: 0 },
    { id: 'taro', name: 'Taro Velvet', color: 'bg-[#7c5aa6]', textColor: 'text-white', priceAdd: 0 },
    { id: 'strawberry', name: 'Strawberry Cream', color: 'bg-[#e05670]', textColor: 'text-white', priceAdd: 0 },
  ];

  const totalFilled = useMemo(() => 
    (Object.values(selectedToppings) as number[]).reduce((acc: number, count: number) => acc + count, 0), 
    [selectedToppings]
  );

  const basePrice = useMemo(() => boxSize === 6 ? 22000 : 36000, [boxSize]);
  
  const totalPrice = basePrice;

  const handleAddTopping = useCallback((id: string) => {
    if (totalFilled >= boxSize) return;
    setSelectedToppings(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  }, [totalFilled, boxSize]);

  const handleRemoveTopping = useCallback((id: string) => {
    if (!selectedToppings[id]) return;
    setSelectedToppings(prev => {
      const next = { ...prev };
      if (next[id] === 1) {
        delete next[id];
      } else {
        next[id] -= 1;
      }
      return next;
    });
  }, [selectedToppings]);

  const handleReset = useCallback(() => {
    setSelectedToppings({});
  }, []);

  const handleAddCustomBoxToCart = useCallback(() => {
    if (totalFilled < boxSize) return;

    const toppingSummary = (Object.entries(selectedToppings) as [string, number][])
      .map(([topId, count]) => {
        const topName = availableToppings.find(t => t.id === topId)?.name;
        return `${count}x ${topName}`;
      })
      .join(', ');

    const customCartItem: CartItem = {
      id: `custom-box-${boxSize}-${Date.now()}`,
      name: `Box Custom ${boxSize} Pcs`,
      price: totalPrice,
      quantity: 1,
      variant: toppingSummary,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800"
    };

    onAddToCart(customCartItem);
    handleReset();
  }, [totalFilled, boxSize, totalPrice, selectedToppings, onAddToCart, handleReset]);

  return (
    <section className="w-full py-20 bg-[#fff8f6] relative overflow-hidden" id="custom-box">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-[#ffddaf]/40 text-[#ba821b] border border-[#ba821b]/20 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[#ba821b]" />
            <span className="font-['Be_Vietnam_Pro'] text-xs font-bold uppercase tracking-wider">FITUR EKSLUSIF</span>
          </div>
          <h2 className="font-['Bricolage_Grotesque'] text-4xl md:text-5xl font-extrabold text-[#230904] mb-4">
            Buat Box Paket Balok-mu Sendiri!
          </h2>
          <p className="font-['Be_Vietnam_Pro'] text-base text-[#514441] max-w-xl">
            Bebas racik varian rasa Kue Balok Pamulang kesukaanmu dalam 1 box tanpa biaya tambahan!
          </p>
        </div>

        {/* Builder Interface */}
        <div className="bg-[#ffe9e4]/40 rounded-[2.5rem] border border-[#f5ddd8] p-8 md:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Select Box Size */}
            <div>
              <label className="font-bold text-xs uppercase tracking-wider text-[#514441] block mb-3">
                1. Pilih Ukuran Box
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => { setBoxSize(6); handleReset(); }}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${
                    boxSize === 6
                      ? 'border-[#230904] bg-[#230904] text-white shadow-lg scale-[1.02]'
                      : 'border-[#d5c2bf]/40 bg-white text-[#230904] hover:border-[#230904]/50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-['Bricolage_Grotesque'] text-lg font-bold">Box 6 Pcs</span>
                    <span className="font-['Bricolage_Grotesque'] text-sm font-extrabold">Rp 22.000</span>
                  </div>
                  <p className="font-['Be_Vietnam_Pro'] text-xs opacity-80">Pas untuk cemilan 1-2 orang</p>
                </button>

                <button
                  type="button"
                  onClick={() => { setBoxSize(10); handleReset(); }}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${
                    boxSize === 10
                      ? 'border-[#230904] bg-[#230904] text-white shadow-lg scale-[1.02]'
                      : 'border-[#d5c2bf]/40 bg-white text-[#230904] hover:border-[#230904]/50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-['Bricolage_Grotesque'] text-lg font-bold">Box 10 Pcs</span>
                    <span className="font-['Bricolage_Grotesque'] text-sm font-extrabold">Rp 36.000</span>
                  </div>
                  <p className="font-['Be_Vietnam_Pro'] text-xs opacity-80">Paling pas untuk rame-rame & keluarga</p>
                </button>
              </div>
            </div>

            {/* Step 2: Choose Toppings */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="font-bold text-xs uppercase tracking-wider text-[#514441] block">
                  2. Pilih Topping Varian ({totalFilled}/{boxSize} Pcs)
                </label>
                {totalFilled > 0 && (
                  <button 
                    onClick={handleReset} 
                    className="text-xs text-[#514441] hover:text-[#230904] flex items-center gap-1 font-medium"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset Pilihan
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableToppings.map((top) => {
                  const count = selectedToppings[top.id] || 0;
                  const isFull = totalFilled >= boxSize;

                  return (
                    <div 
                      key={top.id}
                      className="bg-white p-3.5 rounded-xl border border-[#f5ddd8] flex items-center justify-between shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${top.color} ${top.textColor} flex items-center justify-center font-bold text-xs shadow-sm`}>
                          {top.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-['Bricolage_Grotesque'] text-xs font-bold text-[#230904]">{top.name}</h4>
                          <span className="text-[10px] text-[#514441] font-medium block">
                            Bebas Pilih (Tanpa Biaya Tambahan)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {count > 0 && (
                          <button
                            onClick={() => handleRemoveTopping(top.id)}
                            className="w-7 h-7 rounded-lg bg-[#ffe9e4] text-[#230904] font-bold hover:bg-[#f5ddd8] transition-colors flex items-center justify-center text-sm"
                          >
                            -
                          </button>
                        )}
                        <span className="font-['Bricolage_Grotesque'] text-xs min-w-[16px] text-center font-bold">
                          {count}
                        </span>
                        <button
                          disabled={isFull}
                          onClick={() => handleAddTopping(top.id)}
                          className={`w-7 h-7 rounded-lg font-bold transition-all flex items-center justify-center text-sm ${
                            isFull 
                              ? 'bg-[#d5c2bf]/30 text-[#514441]/40 cursor-not-allowed'
                              : 'bg-[#230904] text-white hover:bg-[#3d1d16]'
                          }`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Visual Box Preview */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-[#f5ddd8] flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#f5ddd8] mb-6">
                <div>
                  <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[#230904]">Preview Box Custom</h3>
                  <span className="text-xs text-[#514441] font-medium">Kue Balok Pamulang</span>
                </div>
                <div className="bg-[#ffddaf]/40 text-[#ba821b] text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" /> Artisanal
                </div>
              </div>

              {/* Box Visual Grid */}
              <div className="mb-6">
                <div className="text-xs font-bold text-[#514441] mb-2">
                  Kapasitas Box ({totalFilled}/{boxSize} kue):
                </div>
                <div className={`grid ${boxSize === 6 ? 'grid-cols-3' : 'grid-cols-5'} gap-2.5 bg-[#ffe9e4]/60 p-4 rounded-2xl border border-[#f5ddd8]`}>
                  {Array.from({ length: boxSize }).map((_, index) => {
                    let filledTopping: any = null;
                    let currentCount = 0;
                    
                    const entries = Object.entries(selectedToppings) as [string, number][];
                    for (const [topId, count] of entries) {
                      if (index >= currentCount && index < currentCount + count) {
                        filledTopping = availableToppings.find(t => t.id === topId);
                        break;
                      }
                      currentCount += count;
                    }

                    return (
                      <div
                        key={index}
                        className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 border-2 transition-all duration-300 ${
                          filledTopping
                            ? `${filledTopping.color} ${filledTopping.textColor} border-transparent shadow-md scale-95`
                            : 'border-dashed border-[#d5c2bf]/60 bg-white/50 text-[#514441]/40'
                        }`}
                      >
                        {filledTopping ? (
                          <>
                            <Check className="w-4 h-4 mb-0.5" />
                            <span className="text-[9px] font-bold text-center leading-tight truncate max-w-full">
                              {filledTopping.name.split(' ')[0]}
                            </span>
                          </>
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-[#ffe9e4]/40 p-4 rounded-xl space-y-2 mb-6 text-xs text-[#514441]">
                <div className="flex justify-between">
                  <span>Harga Paket Box ({boxSize} Pcs)</span>
                  <span className="font-bold">Rp {basePrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Topping Varian Pilihan</span>
                  <span>Gratis / Tanpa Biaya Tambahan</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[#d5c2bf]/30 text-sm font-bold text-[#230904]">
                  <span>Total Harga Box</span>
                  <span className="font-['Bricolage_Grotesque'] text-2xl font-extrabold">Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              disabled={totalFilled < boxSize}
              onClick={handleAddCustomBoxToCart}
              className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                totalFilled === boxSize
                  ? 'bg-[#230904] text-white hover:bg-[#3d1d16] hover:scale-[1.02]'
                  : 'bg-[#d5c2bf]/30 text-[#514441]/50 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalFilled === boxSize 
                ? 'Tambahkan Box Custom ke Keranjang' 
                : `Pilih ${boxSize - totalFilled} Kue Lagi`}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
