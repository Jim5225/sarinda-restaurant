import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { translations } from '../data/translations';
import { ShoppingBag, Phone, Menu as MenuIcon, X, Search, UtensilsCrossed, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const { lang, setLang, activeTab, setActiveTab, cartCount, setIsCartOpen, setIsSearchOpen, setIsReservationOpen } = useStore();
  const t = translations[lang];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.navHome },
    { id: 'menu', label: t.navMenu },
    { id: 'offers', label: t.navOffers },
    { id: 'gallery', label: t.navGallery },
    { id: 'about', label: t.navAbout },
    { id: 'contact', label: t.navContact },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-border shadow-sm transition-all">
      {/* Top Banner Notice */}
      <div className="bg-brand-primary text-white text-xs sm:text-sm py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="bg-brand-accent px-2.5 py-0.5 rounded text-[11px] font-black tracking-wide uppercase">
              Special
            </span>
            <span className="text-brand-cream font-bold">
              {lang === 'en' ? 'Use code SARINDA15 for 15% off your first order!' : 'কোড SARINDA15 ব্যবহারে প্রথম অর্ডারে পাচ্ছেন ১৫% ছাড়!'}
            </span>
          </div>
          <div className="flex items-center space-x-6 text-brand-cream text-xs font-bold">
            <span>{t.openHours}</span>
            <span>•</span>
            <a href="tel:+8801712121434" className="hover:text-brand-gold transition flex items-center gap-1.5 font-extrabold">
              <Phone className="w-3.5 h-3.5 text-brand-gold" /> +880 1712-121434
            </a>
            <span>•</span>
            <button 
              onClick={() => setActiveTab('admin')} 
              className="text-white hover:text-brand-gold underline text-xs font-black flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
              {t.navAdmin}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center text-brand-gold shadow-md group-hover:scale-105 transition duration-300">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <div className="font-serif text-2xl md:text-3xl font-black tracking-tight text-brand-primary flex items-center gap-1">
                Sarinda <span className="text-brand-accent text-lg">✦</span>
              </div>
              <p className="text-[11px] tracking-widest uppercase font-extrabold text-brand-leaf -mt-1">
                Restaurant & Catering
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-xl text-[15px] font-extrabold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-brand-primary bg-brand-primary/10 shadow-xs'
                      : 'text-brand-charcoal hover:text-brand-primary hover:bg-brand-cream'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-xl text-brand-charcoal/70 hover:text-brand-primary hover:bg-brand-cream transition cursor-pointer"
              title="Search dishes"
            >
              <Search className="w-5 h-5 font-bold" />
            </button>

            {/* Language Switch */}
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="px-3 py-1.5 rounded-xl border border-brand-border text-xs sm:text-sm font-black text-brand-primary hover:bg-brand-cream transition cursor-pointer shadow-xs"
              title="Switch Language"
            >
              {lang === 'en' ? 'বাংলা' : 'ENG'}
            </button>

            {/* Table Reservation Button (Desktop) */}
            <button
              onClick={() => setIsReservationOpen(true)}
              className="hidden sm:inline-flex items-center px-4.5 py-2.5 rounded-xl text-sm font-extrabold text-brand-primary border-2 border-brand-primary/30 hover:border-brand-primary hover:bg-brand-primary hover:text-white transition cursor-pointer"
            >
              {t.bookTable}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-brand-cream hover:bg-brand-primary/10 text-brand-primary transition cursor-pointer"
              title="View Bag"
            >
              <ShoppingBag className="w-5 h-5 font-bold" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary CTA - Order Now */}
            <button
              onClick={() => handleNavClick('menu')}
              className="hidden md:inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm sm:text-base font-black text-white bg-brand-primary hover:bg-brand-dark transition duration-200 shadow-md hover:shadow-lg cursor-pointer transform active:scale-95"
            >
              {t.orderNow}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-brand-charcoal/80 hover:bg-brand-cream transition"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-brand-border px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1 py-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-semibold transition ${
                  activeTab === item.id
                    ? 'text-brand-primary bg-brand-cream font-bold'
                    : 'text-brand-charcoal/80 hover:bg-brand-cream/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-brand-border/60 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsReservationOpen(true);
              }}
              className="w-full py-3 rounded-xl font-bold text-sm text-brand-primary border border-brand-primary/30 text-center hover:bg-brand-cream"
            >
              {t.bookTable}
            </button>
            <button
              onClick={() => handleNavClick('menu')}
              className="w-full py-3 rounded-xl font-bold text-sm text-white bg-brand-primary text-center shadow-md"
            >
              {t.orderNow}
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setActiveTab('admin');
              }}
              className="w-full py-2 rounded-xl text-xs text-brand-muted hover:text-brand-primary flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-brand-leaf" />
              {t.navAdmin}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
