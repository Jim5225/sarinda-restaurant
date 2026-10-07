import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Building2, 
  Phone, 
  UtensilsCrossed, 
  Palmtree, 
  Cake, 
  Flame, 
  Lamp, 
  MapPin, 
  ShieldCheck, 
  Menu as MenuIcon, 
  X, 
  Calendar, 
  ChevronDown,
  Globe,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export const GroupHeader: React.FC = () => {
  const { 
    lang, 
    setLang, 
    currentView, 
    setCurrentView, 
    setActiveTab, 
    openGroupInquiry,
    cartCount,
    setIsCartOpen
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConcernsDropdownOpen, setIsConcernsDropdownOpen] = useState(false);

  const concernsList = [
    {
      id: 'sarinda-restaurant',
      name: lang === 'bn' ? 'সারিন্দা রেস্টুরেন্ট' : 'Sarinda Restaurant',
      tagline: lang === 'bn' ? 'শাহী কাচ্চি ও ক্যাটারিং' : 'Authentic Kacchi & Catering',
      icon: UtensilsCrossed,
      color: 'text-amber-500',
      action: () => setCurrentView('restaurant'),
      badge: lang === 'bn' ? 'অনলাইন অর্ডার' : 'Order Online'
    },
    {
      id: 'sobari-resort',
      name: lang === 'bn' ? 'সারিন্দা সবারি রিসোর্ট' : 'Sarinda Sobari Resort',
      tagline: lang === 'bn' ? 'সুইমিংপুল ও ইকো কটেজ' : 'Switzerland of Mymensingh',
      icon: Palmtree,
      color: 'text-emerald-500',
      action: () => setCurrentView('resort'),
      badge: lang === 'bn' ? 'ভাইরাল রিসোর্ট' : 'Viral Resort'
    },
    {
      id: 'sarinda-bakery',
      name: lang === 'bn' ? 'সারিন্দা বেকারি' : 'Sarinda Bakery',
      tagline: lang === 'bn' ? 'ডিজাইনার কেক ও মিষ্টি' : 'Designer Cakes & Sweets',
      icon: Cake,
      color: 'text-pink-500',
      action: () => setCurrentView('bakery'),
      badge: lang === 'bn' ? '৩টি আউটলেট' : '3 Outlets'
    },
    {
      id: 'sorgorom-restaurant',
      name: lang === 'bn' ? 'সরগরম রেস্টুরেন্ট' : 'Sorgorom Restaurant',
      tagline: lang === 'bn' ? 'সিজলার্স ও ক্যাফে' : 'Sizzlers & Cafe',
      icon: Flame,
      color: 'text-orange-500',
      action: () => setCurrentView('sorgorom'),
      badge: lang === 'bn' ? 'জনপ্রিয় আড্ডা' : 'Youth Hangout'
    },
    {
      id: 'sarinda-lights',
      name: lang === 'bn' ? 'সারিন্দা লাইটস ও ফ্যান' : 'Sarinda Lights & Fans',
      tagline: lang === 'bn' ? 'ঝাড়বাতি, সিলিং ফ্যান ও লাইটিং' : 'Chandeliers & Fans',
      icon: Lamp,
      color: 'text-yellow-500',
      action: () => setCurrentView('lights'),
      badge: lang === 'bn' ? 'প্রিমিয়াম শোরুম' : 'Showroom'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    if (currentView !== 'group') {
      setCurrentView('group');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-brand-border/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] transition-all">
      {/* Top Corporate Strip */}
      <div className="bg-gradient-to-r from-brand-dark via-[#103024] to-brand-dark text-white text-xs py-2 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          
          <div className="flex items-center space-x-2 text-xs">
            <span className="bg-brand-gold text-brand-dark font-black px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider shadow-xs">
              Est. 2008
            </span>
            <span className="text-gray-300 hidden sm:inline font-medium">
              {lang === 'bn'
                ? 'সারিন্দা গ্রুপ — আতিথেয়তা, রিসোর্ট, রেস্তোরাঁ, বেকারি ও আধুনিক জীবনধারা'
                : 'Sarinda Group — Hospitality, Resorts, Restaurants, Bakery & Modern Living'}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs font-semibold ml-auto">
            {/* 24/7 Hotline */}
            <a 
              href="tel:+8801712121434" 
              className="text-brand-gold hover:text-white transition flex items-center gap-1.5 font-bold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+880 1712-121434</span>
            </a>

            <span className="text-gray-600 hidden md:inline">|</span>

            {/* Language Segmented Switch */}
            <div className="inline-flex items-center bg-white/10 rounded-full p-0.5 border border-white/15">
              <button
                onClick={() => setLang('bn')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-black transition-all cursor-pointer ${
                  lang === 'bn'
                    ? 'bg-brand-gold text-brand-dark shadow-xs'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-black transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-brand-gold text-brand-dark shadow-xs'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            <span className="text-gray-600 hidden md:inline">|</span>

            {/* Admin Portal */}
            <button
              onClick={() => setActiveTab('admin')}
              className="text-gray-300 hover:text-brand-gold flex items-center gap-1 transition text-xs cursor-pointer font-bold"
              title="Admin & POS Management"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
              <span className="hidden sm:inline">Admin POS</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Corporate Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Group Logo */}
          <div 
            onClick={() => { setCurrentView('group'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-primary via-brand-dark to-[#091b14] flex items-center justify-center text-brand-gold shadow-md group-hover:scale-105 transition-all duration-300 border border-brand-gold/30">
              <Building2 className="w-5 h-5 text-brand-gold" />
            </div>
            <div>
              <div className="font-serif text-2xl font-black tracking-tight text-brand-primary flex items-center gap-1.5 leading-none">
                SARINDA <span className="text-brand-gold text-base">✦</span>
              </div>
              <p className="text-[10px] tracking-[0.25em] uppercase font-black text-brand-leaf mt-1">
                GROUP • BANGLADESH
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            
            {/* Home / Group Overview */}
            <button
              onClick={() => { setCurrentView('group'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`px-3.5 py-2 rounded-xl text-[14px] font-bold transition-all cursor-pointer ${
                currentView === 'group'
                  ? 'text-brand-primary bg-brand-primary/10 font-black'
                  : 'text-brand-charcoal hover:text-brand-primary hover:bg-brand-cream/80'
              }`}
            >
              {lang === 'bn' ? 'হোম' : 'Home'}
            </button>

            {/* All Concerns Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsConcernsDropdownOpen(!isConcernsDropdownOpen)}
                onMouseEnter={() => setIsConcernsDropdownOpen(true)}
                className={`px-3.5 py-2 rounded-xl text-[14px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentView !== 'group'
                    ? 'text-brand-primary bg-brand-primary/10 font-black'
                    : 'text-brand-charcoal hover:text-brand-primary hover:bg-brand-cream/80'
                }`}
              >
                <span>{lang === 'bn' ? 'অঙ্গপ্রতিষ্ঠানসমূহ' : 'Our Ventures'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isConcernsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isConcernsDropdownOpen && (
                <div 
                  onMouseLeave={() => setIsConcernsDropdownOpen(false)}
                  className="absolute top-full left-0 mt-1 w-80 bg-white rounded-2xl shadow-elevated border border-brand-border py-2.5 z-50 animate-fadeIn"
                >
                  <div className="px-4 py-1.5 border-b border-brand-border mb-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">
                      {lang === 'bn' ? 'সারিন্দা গ্রুপের ব্র্যান্ডসমূহ' : 'Sarinda Group Portfolio'}
                    </p>
                  </div>

                  {concernsList.map((concern) => {
                    const Icon = concern.icon;
                    return (
                      <button
                        key={concern.id}
                        onClick={() => {
                          concern.action();
                          setIsConcernsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2.5 flex items-start gap-3 hover:bg-brand-cream transition text-left cursor-pointer group"
                      >
                        <div className="p-2 rounded-xl bg-gray-50 group-hover:bg-brand-primary/10 transition mt-0.5">
                          <Icon className={`w-4 h-4 ${concern.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-brand-primary text-xs group-hover:text-brand-accent transition">
                              {concern.name}
                            </span>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-brand-cream text-brand-leaf border border-brand-leaf/20">
                              {concern.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-brand-muted mt-0.5">
                            {concern.tagline}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Direct Quick Concern Links */}
            <button
              onClick={() => setCurrentView('restaurant')}
              className={`px-3 py-2 rounded-xl text-[14px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'restaurant'
                  ? 'text-brand-primary bg-brand-primary/10 font-black'
                  : 'text-brand-charcoal hover:text-brand-primary hover:bg-brand-cream/80'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4 text-amber-600" />
              <span>{lang === 'bn' ? 'রেস্টুরেন্ট' : 'Restaurant'}</span>
            </button>

            <button
              onClick={() => setCurrentView('resort')}
              className={`px-3 py-2 rounded-xl text-[14px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'resort'
                  ? 'text-brand-primary bg-brand-primary/10 font-black'
                  : 'text-brand-charcoal hover:text-brand-primary hover:bg-brand-cream/80'
              }`}
            >
              <Palmtree className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'bn' ? 'সবারি রিসোর্ট' : 'Sobari Resort'}</span>
            </button>

            <button
              onClick={() => setCurrentView('bakery')}
              className={`px-3 py-2 rounded-xl text-[14px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'bakery'
                  ? 'text-brand-primary bg-brand-primary/10 font-black'
                  : 'text-brand-charcoal hover:text-brand-primary hover:bg-brand-cream/80'
              }`}
            >
              <Cake className="w-4 h-4 text-pink-600" />
              <span>{lang === 'bn' ? 'বেকারি' : 'Bakery'}</span>
            </button>

            <button
              onClick={() => setCurrentView('sorgorom')}
              className={`px-3 py-2 rounded-xl text-[14px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'sorgorom'
                  ? 'text-brand-primary bg-brand-primary/10 font-black'
                  : 'text-brand-charcoal hover:text-brand-primary hover:bg-brand-cream/80'
              }`}
            >
              <Flame className="w-4 h-4 text-orange-600" />
              <span>{lang === 'bn' ? 'সরগরম' : 'Sorgorom'}</span>
            </button>

            <button
              onClick={() => setCurrentView('lights')}
              className={`px-3 py-2 rounded-xl text-[14px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'lights'
                  ? 'text-brand-primary bg-brand-primary/10 font-black'
                  : 'text-brand-charcoal hover:text-brand-primary hover:bg-brand-cream/80'
              }`}
            >
              <Lamp className="w-4 h-4 text-yellow-600" />
              <span>{lang === 'bn' ? 'লাইটস ও ফ্যান' : 'Lights & Fans'}</span>
            </button>

            {/* Branches / Locations */}
            <button
              onClick={() => scrollToSection('locations')}
              className="px-3 py-2 rounded-xl text-[14px] font-bold text-brand-charcoal hover:text-brand-primary hover:bg-brand-cream/80 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <MapPin className="w-4 h-4 text-brand-muted" />
              <span>{lang === 'bn' ? 'লোকেশন' : 'Outlets'}</span>
            </button>

          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            
            {/* Cart Icon (if food in cart) */}
            {cartCount > 0 && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl bg-brand-cream text-brand-primary hover:bg-brand-primary/10 transition cursor-pointer"
                title="View Food Order Bag"
              >
                <ShoppingBag className="w-5 h-5 text-brand-accent" />
                <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              </button>
            )}

            {/* Main Navbar Language Switcher (visible on desktop & tablet) */}
            <div className="hidden sm:inline-flex items-center bg-brand-cream/80 border border-brand-border rounded-xl p-1 shadow-2xs">
              <button
                onClick={() => setLang('bn')}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  lang === 'bn'
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'text-brand-charcoal hover:text-brand-primary'
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'text-brand-charcoal hover:text-brand-primary'
                }`}
              >
                EN
              </button>
            </div>

            {/* Book / Inquiry Action Button */}
            <button
              onClick={() => openGroupInquiry()}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-brand-accent to-brand-accentHover text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm hover:shadow-md hover:scale-102 transition cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'রিসোর্ট ও ইভেন্ট বুকিং' : 'Resort & Event Booking'}</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-brand-cream text-brand-primary hover:bg-brand-primary/10 transition cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-brand-border px-4 pt-2 pb-6 space-y-3 animate-fadeIn shadow-elevated">
          
          <div className="flex items-center justify-between px-2 pt-2 pb-1 border-b border-brand-border">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-muted">
              {lang === 'bn' ? 'সারিন্দা গ্রুপের ব্র্যান্ডসমূহ' : 'Sarinda Brands'}
            </p>
            {/* Mobile Language Toggle */}
            <div className="inline-flex items-center bg-gray-100 rounded-full p-0.5">
              <button
                onClick={() => setLang('bn')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-black transition-all ${
                  lang === 'bn' ? 'bg-brand-primary text-white' : 'text-gray-600'
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-black transition-all ${
                  lang === 'en' ? 'bg-brand-primary text-white' : 'text-gray-600'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {concernsList.map((concern) => {
              const Icon = concern.icon;
              return (
                <button
                  key={concern.id}
                  onClick={() => {
                    concern.action();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-brand-cream/60 hover:bg-brand-cream text-left transition"
                >
                  <Icon className={`w-5 h-5 ${concern.color}`} />
                  <div>
                    <p className="font-extrabold text-xs text-brand-primary">{concern.name}</p>
                    <p className="text-[10px] text-brand-muted">{concern.badge}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-brand-border flex flex-col gap-2">
            <button
              onClick={() => {
                setCurrentView('group');
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center font-extrabold text-brand-primary bg-brand-cream rounded-xl text-xs"
            >
              {lang === 'bn' ? 'গ্রুপ পরিচিতি ও ইতিহাস' : 'Corporate Overview'}
            </button>

            <button
              onClick={() => {
                scrollToSection('locations');
              }}
              className="w-full py-2.5 text-center font-extrabold text-brand-charcoal bg-gray-100 rounded-xl text-xs"
            >
              {lang === 'bn' ? 'সকল শাখার ঠিকানা ও যোগাযোগ' : 'All Outlets Directory'}
            </button>

            <button
              onClick={() => {
                openGroupInquiry();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center font-black text-white bg-brand-accent rounded-xl text-xs shadow-md"
            >
              {lang === 'bn' ? 'রিসোর্ট বুকিং ও ইভেন্ট কোটেশন' : 'Book Resort / Plan Event'}
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
