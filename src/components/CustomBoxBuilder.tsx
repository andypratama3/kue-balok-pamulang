import React, { useState } from 'react';
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
    { id: 'keju', name: 'Keju Cheddar Melimpah', color: 'bg-[#f4be42]', textColor: 'text-primary', priceAdd: 1000 },
    { id: 'matcha', name: 'Green Tea Matcha', color: 'bg-[#6b904e]', textColor: 'text-white', priceAdd: 1000 },
    { id: 'tiramisu', name: 'Tiramisu Espresso', color: 'bg-[#8c6543]', textColor: 'text-white', priceAdd: 1000 },
    { id: 'taro', name: 'Taro Velvet', color: 'bg-[#7c5aa6]', textColor: 'text-white', priceAdd: 1000 },
    { id: 'strawberry', name: 'Strawberry Cream', color: 'bg-[#e05670]', textColor: 'text-white', priceAdd: 1000 },
  ];

  const totalFilled = (Object.values(selectedToppings) as number[]).reduce((acc: number, count: number) => acc + count, 0);

  const basePrice = boxSize === 6 ? 22000 : 36000;
  
  // Calculate extra cost from toppings
  const extraCost = (Object.entries(selectedToppings) as [string, number][]).reduce((sum: number, [topId, count]: [string, number]) => {
    const top = availableToppings.find(t => t.id === topId);
    return sum + (top ? top.priceAdd * count : 0);
  }, 0);

  const totalPrice = basePrice + extraCost;

  const handleAddTopping = (id: string) => {
    if (totalFilled >= boxSize) return;
    setSelectedToppings(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleRemoveTopping = (id: string) => {
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
  };

  const handleReset = () => {
    setSelectedToppings({});
  };

  const handleAddCustomBoxToCart = () => {
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
  };

  return (
    <section className="w-full py-20 bg-surface relative overflow-hidden" id="custom-box">
      <div className="max-w-container-max mx-auto px-gutter relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-on-tertiary-container/10 text-on-tertiary-container border border-on-tertiary-container/20 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-on-tertiary-container" />
            <span className="font-label-bold text-xs uppercase tracking-wider">Fitur Eksklusif</span>
          </div>
          <h2 className="font-display-lg text-4xl md:text-5xl text-primary font-bold mb-4">
            Buat Box Paket Balok-mu Sendiri!
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-xl">
            Bebas racik varian rasa Kue Balok Pamulang kesukaanmu dalam 1 box. Dipanggang fresh sesuai kombinasi pilihanmu!
          </p>
        </div>

        {/* Builder Interface */}
        <div className="bg-surface-container rounded-[2.5rem] border border-outline-variant/30 p-8 md:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Select Box Size */}
            <div>
              <label className="font-label-bold text-xs uppercase tracking-wider text-on-surface-variant block mb-3">
                1. Pilih Ukuran Box
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => { setBoxSize(6); handleReset(); }}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${
                    boxSize === 6
                      ? 'border-primary bg-primary text-on-primary shadow-lg scale-[1.02]'
                      : 'border-outline-variant/40 bg-surface text-primary hover:border-primary/50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-headline-md text-lg">Box 6 Pcs</span>
                    <span className="font-price-display text-sm">Rp 22.000</span>
                  </div>
                  <p className="font-body-md text-xs opacity-80">Pas untuk cemilan 1-2 orang</p>
                </button>

                <button
                  type="button"
                  onClick={() => { setBoxSize(10); handleReset(); }}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${
                    boxSize === 10
                      ? 'border-primary bg-primary text-on-primary shadow-lg scale-[1.02]'
                      : 'border-outline-variant/40 bg-surface text-primary hover:border-primary/50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-headline-md text-lg">Box 10 Pcs</span>
                    <span className="font-price-display text-sm">Rp 36.000</span>
                  </div>
                  <p className="font-body-md text-xs opacity-80">Paling pas untuk rame-rame & keluarga</p>
                </button>
              </div>
            </div>

            {/* Step 2: Choose Toppings */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="font-label-bold text-xs uppercase tracking-wider text-on-surface-variant block">
                  2. Pilih Topping Varian ({totalFilled}/{boxSize} Pcs)
                </label>
                {totalFilled > 0 && (
                  <button 
                    onClick={handleReset} 
                    className="text-xs text-on-surface-variant hover:text-primary flex items-center gap-1 font-medium"
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
                      className="bg-surface p-3.5 rounded-xl border border-outline-variant/30 flex items-center justify-between shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${top.color} ${top.textColor} flex items-center justify-center font-bold text-xs shadow-sm`}>
                          {top.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-headline-md text-xs text-primary">{top.name}</h4>
                          <span className="text-[10px] text-on-surface-variant">
                            {top.priceAdd > 0 ? `+Rp ${top.priceAdd.toLocaleString('id-ID')}/pc` : 'Tanpa Biaya Tambahan'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {count > 0 && (
                          <button
                            onClick={() => handleRemoveTopping(top.id)}
                            className="w-7 h-7 rounded-lg bg-surface-container text-primary font-bold hover:bg-surface-variant transition-colors flex items-center justify-center text-sm"
                          >
                            -
                          </button>
                        )}
                        <span className="font-headline-md text-xs min-w-[16px] text-center font-bold">
                          {count}
                        </span>
                        <button
                          disabled={isFull}
                          onClick={() => handleAddTopping(top.id)}
                          className={`w-7 h-7 rounded-lg font-bold transition-all flex items-center justify-center text-sm ${
                            isFull 
                              ? 'bg-outline-variant/30 text-on-surface-variant/40 cursor-not-allowed'
                              : 'bg-primary text-on-primary hover:bg-primary-container'
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
          <div className="lg:col-span-5 bg-surface p-8 rounded-3xl border border-outline-variant/30 flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20 mb-6">
                <div>
                  <h3 className="font-headline-md text-xl text-primary">Preview Box Custom</h3>
                  <span className="text-xs text-on-surface-variant font-medium">Kue Balok Pamulang</span>
                </div>
                <div className="bg-tertiary-fixed-dim/20 text-on-tertiary-container text-xs px-3 py-1 rounded-full font-label-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> Artisanal
                </div>
              </div>

              {/* Box Visual Grid */}
              <div className="mb-6">
                <div className="text-xs font-label-bold text-on-surface-variant mb-2">
                  Kapasitas Box ({totalFilled}/{boxSize} kue):
                </div>
                <div className={`grid ${boxSize === 6 ? 'grid-cols-3' : 'grid-cols-5'} gap-2.5 bg-surface-container p-4 rounded-2xl border border-outline-variant/20`}>
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
                            : 'border-dashed border-outline-variant/50 bg-surface/50 text-on-surface-variant/40'
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
              <div className="bg-surface-container/50 p-4 rounded-xl space-y-2 mb-6 text-xs text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Base Box ({boxSize} Pcs)</span>
                  <span>Rp {basePrice.toLocaleString('id-ID')}</span>
                </div>
                {extraCost > 0 && (
                  <div className="flex justify-between text-on-tertiary-container font-medium">
                    <span>Tambahan Topping Premium</span>
                    <span>+Rp {extraCost.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-outline-variant/30 text-sm font-bold text-primary">
                  <span>Total Harga Box</span>
                  <span className="font-price-display text-xl">Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              disabled={totalFilled < boxSize}
              onClick={handleAddCustomBoxToCart}
              className={`w-full py-4 rounded-xl font-label-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                totalFilled === boxSize
                  ? 'bg-primary text-on-primary hover:bg-primary-container hover:scale-[1.02]'
                  : 'bg-outline-variant/30 text-on-surface-variant/50 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalFilled === boxSize 
                ? 'Tambahkan Box Custom ke Keranjang' 
                : `Lengkapi ${boxSize - totalFilled} Kue Lagi`}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
