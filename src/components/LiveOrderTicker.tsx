import React, { useState, useEffect } from 'react';
import { Flame, ShoppingBag, X } from 'lucide-react';

interface NotificationItem {
  name: string;
  location: string;
  item: string;
  timeAgo: string;
}

export default function LiveOrderTicker() {
  const notifications: NotificationItem[] = [
    { name: 'Rina S.', location: 'Pamulang Permai', item: 'Box Custom 10 Pcs Full Topping Lumer', timeAgo: '2 menit lalu' },
    { name: 'Budi W.', location: 'Surya Kencana', item: 'Kue Balok Original Cokelat 5 Pcs', timeAgo: '5 menit lalu' },
    { name: 'Siti M.', location: 'Vila Pamulang', item: 'Signature Mix Rasa 10 Pcs', timeAgo: '9 menit lalu' },
    { name: 'Dimas A.', location: 'Sekitar Unpam', item: 'Box 6 Pcs Mix Cokelat & Keju', timeAgo: '12 menit lalu' },
    { name: 'Nadia P.', location: 'Pondok Cabe', item: 'Kue Balok Matcha Green Tea Lumer', timeAgo: '15 menit lalu' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 500);
    }, 7000);

    return () => clearInterval(interval);
  }, [isDismissed, notifications.length]);

  if (isDismissed) return null;

  const currentNotif = notifications[currentIndex];

  return (
    <div 
      className={`fixed bottom-6 left-6 z-40 max-w-sm transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="bg-primary text-on-primary p-4 rounded-2xl shadow-2xl border border-surface/20 flex items-center gap-3 relative overflow-hidden backdrop-blur-md">
        
        {/* Glowing Badge Icon */}
        <div className="w-10 h-10 rounded-xl bg-tertiary-fixed-dim/30 flex items-center justify-center flex-shrink-0 text-tertiary-fixed-dim border border-surface/20">
          <Flame className="w-5 h-5 fill-current animate-pulse text-amber-400" />
        </div>

        <div className="flex-grow min-w-0 pr-4">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-label-bold text-xs text-on-primary truncate">
              {currentNotif.name}
            </span>
            <span className="text-[10px] bg-surface/20 px-2 py-0.5 rounded-full text-on-primary/80">
              {currentNotif.location}
            </span>
          </div>
          <p className="font-body-md text-xs text-on-primary/90 truncate">
            Baru saja memesan: <span className="font-bold text-amber-300">{currentNotif.item}</span>
          </p>
          <span className="text-[10px] text-on-primary/60 block mt-0.5">
            {currentNotif.timeAgo} • Terkonfirmasi WhatsApp
          </span>
        </div>

        <button 
          onClick={() => setIsDismissed(true)}
          className="text-on-primary/60 hover:text-on-primary p-1 rounded-full hover:bg-surface/20 transition-colors"
          aria-label="Tutup notifikasi"
        >
          <X className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
