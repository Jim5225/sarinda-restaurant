import React from 'react';
import { useStore } from '../context/StoreContext';
import { translations } from '../data/translations';
import { UtensilsCrossed, ShoppingBag, ArrowRight } from 'lucide-react';

export const MobileStickyBar: React.FC = () => {
  const { lang, setActiveTab, setIsCartOpen, cartCount, cartTotal } = useStore();
  const t = translations[lang];

  const handleMenuClick = () => {
    setActiveTab('menu');
    const menuSec = document.getElementById('menu');
    if (menuSec) menuSec.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-border px-4 py-2.5 shadow-2xl flex items-center justify-between gap-3">
      {/* Menu Shortcut */}
      <button
        onClick={handleMenuClick}
        className="flex flex-col items-center justify-center p-1.5 text-brand-charcoal hover:text-brand-primary"
      >
        <UtensilsCrossed className="w-5 h-5 text-brand-primary" />
        <span className="text-[10px] font-bold mt-0.5">{t.navMenu}</span>
      </button>

      {/* Cart Shortcut with Badge */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center justify-center p-1.5 text-brand-charcoal hover:text-brand-primary"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 text-brand-primary" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-brand-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-bold mt-0.5">
          {cartCount > 0 ? `৳${cartTotal}` : t.yourCart}
        </span>
      </button>

      {/* Primary Direct Order CTA */}
      <button
        onClick={handleMenuClick}
        className="flex-1 py-3 px-4 rounded-2xl bg-brand-primary text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98"
      >
        <span>{t.orderNow}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
