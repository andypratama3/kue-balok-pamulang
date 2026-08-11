import React from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
  image?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    let message = `*HALO KUE BALOK PAMULANG!* 👋\n`;
    message += `Saya mau pesan Kue Balok Lumer hangat:\n\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* ${item.variant ? `(${item.variant})` : ''}\n`;
      message += `   Qty: ${item.quantity} x Rp ${item.price.toLocaleString('id-ID')} = *Rp ${(item.price * item.quantity).toLocaleString('id-ID')}*\n`;
    });

    message += `\n-----------------------------------\n`;
    message += `*TOTAL PESANAN: Rp ${totalPrice.toLocaleString('id-ID')}*\n`;
    message += `-----------------------------------\n\n`;
    message += `📌 *Metode:* (Dine-in / Takeaway / Delivery)\n`;
    message += `📍 *Alamat/Catatan:* \n\n`;
    message += `Mohon konfirmasi ketersediaan & ongkir ya kak! Terima kasih. 🙏🔥`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6285717066697?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface border-l border-outline-variant/30 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-6 bg-primary text-on-primary flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-tertiary-fixed-dim/20 flex items-center justify-center border border-surface/20">
                <ShoppingBag className="w-5 h-5 text-tertiary-fixed-dim" />
              </div>
              <div>
                <h3 className="font-headline-md text-lg text-on-primary">Keranjang Pesanan</h3>
                <p className="font-body-md text-xs text-on-primary/70">Kue Balok Pamulang - Freshly Baked</p>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="p-2 text-on-primary/80 hover:text-on-primary hover:bg-surface/10 rounded-full transition-colors"
              aria-label="Tutup keranjang"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center mb-4 text-on-surface-variant/40">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h4 className="font-headline-md text-xl text-primary mb-2">Keranjang Masih Kosong</h4>
                <p className="font-body-md text-sm text-on-surface-variant max-w-xs mb-6">
                  Pilih varian Kue Balok Pamulang favoritmu dan nikmati sensasi lumer di mulut!
                </p>
                <button 
                  onClick={onClose}
                  className="bg-primary text-on-primary px-6 py-3 rounded-xl font-label-bold text-sm hover:bg-primary-container transition-colors shadow-sm"
                >
                  Lihat Menu Sekarang
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
                  <span className="font-label-bold text-xs uppercase tracking-wider text-on-surface-variant">
                    {totalItems} Items Pilihan
                  </span>
                  <button 
                    onClick={onClearCart}
                    className="text-xs text-error-container hover:underline flex items-center gap-1 font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Kosongkan
                  </button>
                </div>

                {items.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-surface-container/60 p-4 rounded-2xl border border-outline-variant/30 flex gap-4 items-center shadow-sm"
                  >
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 rounded-xl object-cover border border-outline-variant/30 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-primary-fixed flex items-center justify-center text-primary font-bold text-xs flex-shrink-0">
                        BALOK
                      </div>
                    )}

                    <div className="flex-grow min-w-0">
                      <h5 className="font-headline-md text-sm text-primary truncate">{item.name}</h5>
                      {item.variant && (
                        <span className="text-[11px] text-on-surface-variant block font-medium">
                          {item.variant}
                        </span>
                      )}
                      <div className="font-price-display text-sm text-primary mt-1">
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-surface rounded-lg border border-outline-variant/30 p-1">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-primary hover:bg-surface-container rounded transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-headline-md text-xs">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-primary hover:bg-surface-container rounded transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-surface-container border-t border-outline-variant/30 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-body-md text-sm text-on-surface-variant">Subtotal Pesanan</span>
                <span className="font-price-display text-2xl text-primary font-bold">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-on-surface-variant bg-surface p-2.5 rounded-lg border border-outline-variant/20">
                <Sparkles className="w-4 h-4 text-on-tertiary-container flex-shrink-0" />
                <span>Dipanggang fresh saat pesanan dikonfirmasi.</span>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full bg-[#25D366] text-white py-4 rounded-xl font-label-bold text-base flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-all shadow-lg hover:scale-[1.01] group"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                Pesan via WhatsApp Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
