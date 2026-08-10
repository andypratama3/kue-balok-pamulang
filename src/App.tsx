import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PromoTicker from './components/PromoTicker';
import Hero from './components/Hero';
import Features from './components/Features';
import Products from './components/Products';
import CustomBoxBuilder from './components/CustomBoxBuilder';
import Location from './components/Location';
import Story from './components/Story';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import Footer from './components/Footer';
import CartDrawer, { CartItem } from './components/CartDrawer';
import LiveOrderTicker from './components/LiveOrderTicker';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import { MessageCircle } from 'lucide-react';

type AppPage = 'home' | 'admin';

function getCurrentPage(): AppPage {
  const params = new URLSearchParams(window.location.search);
  return params.get('page') === 'admin' ? 'admin' : 'home';
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<AppPage>(getCurrentPage);
  const [isAdminAuthed, setIsAdminAuthed] = useState<boolean>(
    () => sessionStorage.getItem('kbp_admin_auth') === 'true'
  );

  // Listen URL changes (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => setCurrentPage(getCurrentPage());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync URL when page changes via internal state
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlPage = params.get('page') === 'admin' ? 'admin' : 'home';
    if (urlPage !== currentPage) {
      const newUrl = currentPage === 'admin' ? '/?page=admin' : '/';
      window.history.pushState(null, '', newUrl);
    }
  }, [currentPage]);

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === newItem.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      } else {
        return [...prev, newItem];
      }
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // ── Admin Page ──
  if (currentPage === 'admin') {
    if (!isAdminAuthed) {
      return (
        <AdminLogin
          onLogin={() => setIsAdminAuthed(true)}
        />
      );
    }
    return (
      <AdminPanel
        onLogout={() => {
          setIsAdminAuthed(false);
          setCurrentPage('home');
          window.history.pushState(null, '', '/');
        }}
      />
    );
  }

  // ── Main Website ──
  return (
    <div className="min-h-screen flex flex-col bg-[#fff8f6] font-['Be_Vietnam_Pro'] text-[#230904] selection:bg-[#ffddaf] selection:text-[#230904]">
      {/* Top Announcement Ticker */}
      <PromoTicker />

      {/* Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-grow">
        <Hero onOpenCart={() => setIsCartOpen(true)} />
        <Features />
        <Products onAddToCart={handleAddToCart} />
        <CustomBoxBuilder onAddToCart={handleAddToCart} />
        <Location />
        <Story />
        <Testimonials />
        <Faq />
      </main>

      {/* Footer */}
      <Footer />

      {/* Live Social Proof Order Notification */}
      <LiveOrderTicker />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href="https://wa.me/6285717066697?text=Halo%20Kue%20Balok%20Pamulang,%20saya%20mau%20pesan%20Kue%20Balok%20Lumer!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group border-2 border-white"
        aria-label="Chat WhatsApp Admin"
      >
        <span className="absolute -top-2 -right-2 bg-rose-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full animate-bounce shadow-md">
          Chat WA
        </span>
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </div>
  );
}
