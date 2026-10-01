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
      name: lang === 'en' ? 'Sarinda Restaurant' : 'সারিন্দা রেস্টুরেন্ট',
      tagline: lang === 'en' ? 'Authentic Kacchi & Catering' : 'ঐতিহ্যবাহী কাচ্চি ও ক্যাটারিং',
      icon: UtensilsCrossed,
      color: 'text-amber-500',
      action: () => setCurrentView('restaurant'),
      badge: lang === 'en' ? 'Order Online' : 'অনলাইন অর্ডার'
    },
    {
      id: 'sobari-resort',
      name: lang === 'en' ? 'Sarinda Sobari Resort' : 'সারিন্দা সবারি রিসোর্ট',
      tagline: lang === 'en' ? 'Switzerland of Mymensingh' : 'ময়মনসিংহের সুইজারল্যান্ড',
      icon: Palmtree,
      color: 'text-emerald-500',
      action: () => setCurrentView('resort'),
      badge: lang === 'en' ? 'Viral Destination' : 'সেরা রিসোর্ট'
    },
    {
      id: 'sarinda-bakery',
      name: lang === 'en' ? 'Sarinda Bakery' : 'সারিন্দা বেকারি',
      tagline: lang === 'en' ? 'Designer Cakes & Sweets' : 'ডিজাইনার কেক ও মিষ্টি',
      icon: Cake,
      color: 'text-pink-500',
      action: () => setCurrentView('bakery'),
      badge: lang === 'en' ? '3 Outlets' : '৩টি শাখা'
    },
    {
      id: 'sorgorom-restaurant',
      name: lang === 'en' ? 'Sorgorom Restaurant' : 'সরগরম রেস্টুরেন্ট',
      tagline: lang === 'en' ? 'Sizzlers, Steaks & Cafe' : 'সিজলার্স, স্টেক ও ক্যাফে',
      icon: Flame,
      color: 'text-orange-500',
      action: () => setCurrentView('sorgorom'),
      badge: lang === 'en' ? 'Youth Hangout' : 'জনপ্রিয় আড্ডা'
    },
    {
      id: 'sarinda-lights',
      name: lang === 'en' ? 'Sarinda Lights & Décor' : 'সারিন্দা লাইটস অ্যান্ড ইন্টেরিয়র',
      tagline: lang === 'en' ? 'Chandeliers & Resort Lighting' : 'ঝাড়বাতি ও রিসোর্ট আলোকসজ্জা',
      icon: Lamp,
      color: 'text-yellow-500',
      action: () => setCurrentView('lights'),
      badge: lang === 'en' ? 'Architectural' : 'আর্কিটেকচারাল'
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-border shadow-sm transition-all">
      {/* Top Corporate Strip */}
      <div className="bg-brand-dark text-white text-xs py-2 px-4 border-b border-brand-dark/50">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          
          <div className="flex items-center space-x-2 text-xs">
            <span className="bg-brand-gold text-brand-dark font-black px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
              Est. 2008
            </span>
            <span className="text-gray-300 hidden sm:inline">
              {lang === 'en'
                ? 'Sarinda Group — Hospitality, Resorts, Restaurants, Bakery & Modern Living'
                : 'সারিন্দা গ্রুপ — আতিথেয়তা, রিসোর্ট, রেস্তোরাঁ, বেকারি ও আধুনিক লাইফস্টাইল'}
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs font-semibold ml-auto">
            {/* 24/7 Hotline */}
            <a 
              href="tel:+8801712121434" 
              className="text-brand-gold hover:text-white transition flex items-center gap-1 font-bold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+880 1712-121434</span>
            </a>

            <span className="text-gray-600 hidden md:inline">|</span>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="flex items-center gap-1 text-gray-200 hover:text-brand-gold transition cursor-pointer font-bold px-2 py-0.5 rounded bg-white/10"
            >
              <Globe className="w-3.5 h-3.5 text-brand-gold" />
              <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
            </button>

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
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-primary via-brand-dark to-[#091b14] flex items-center justify-center text-brand-gold shadow-md group-hover:scale-105 transition-all duration-300 border border-brand-gold/30">
              <Building2 className="w-6 h-6 text-brand-gold" />
            </div>
            <div>
              <div className="font-serif text-2xl md:text-3xl font-black tracking-tight text-brand-primary flex items-center gap-1.5 leading-none">
                SARINDA <span className="text-brand-gold text-lg">✦</span>
              </div>
              <p className="text-[11px] tracking-[0.2em] uppercase font-black text-brand-leaf mt-1">
                GROUP • BANGLADESH
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            
            {/* Home / Group Overview */}
            <button
              onClick={() => { setCurrentView('group'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`px-3.5 py-2 rounded-xl text-[14px] font-extrabold transition-all cursor-pointer ${
                currentView === 'group'
                  ? 'text-brand-primary bg-brand-primary/10'
                  : 'text-brand-charcoal hover:text-brand-primary hover:bg-brand-cream'
              }`}
            >
              {lang === 'en' ? 'Overview' : 'সারসংক্ষেপ'}
            </button>

            {/* All Concerns Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsConcernsDropdownOpen(!isConcernsDropdownOpen)}
                onMouseEnter={() => setIsConcernsDropdownOpen(true)}
                className={`px-3.5 py-2 rounded-xl text-[14px] font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentView !== 'group'
                    ? 'text-brand-primary bg-brand-primary/10'
                    : 'text-brand-charcoal hover:text-brand-primary hover:bg-brand-cream'
                }`}
              >
                <span>{lang === 'en' ? 'All Sister Concerns' : 'সকল অঙ্গপ্রতিষ্ঠান'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isConcernsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isConcernsDropdownOpen && (
                <div 
                  onMouseLeave={() => setIsConcernsDropdownOpen(false)}
                  className="absolute top-full left-0 mt-1 w-80 bg-white rounded-2xl shadow-elevated border border-brand-border py-3 z-50 animate-fadeIn"
                >
                  <div className="px-4 py-2 border-b border-brand-border mb-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">
                      {lang === 'en' ? 'Sarinda Group Portfolio' : 'সারিন্দা গ্রুপের প্রতিষ্ঠানসমূহ'}
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
                          <Icon className={`w-5 h-5 ${concern.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-brand-primary text-sm group-hover:text-brand-accent transition">
                              {concern.name}
                            </span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-cream text-brand-leaf border border-brand-leaf/20">
                              {concern.badge}
                            </span>
                          </div>
                          <p className="text-xs text-brand-muted mt-0.5">
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
                  : 'text-brand-charcoal hover:text-brand-primary hover:bg-brand-cream'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4 text-amber-600" />
              <span>{lang === 'en' ? 'Restaurant' : 'রেস্টুরেন্ট'}</span>
            </button>

            <button
              onClick={() => setCurrentView('resort')}
              className={`px-3 py-2 rounded-xl text-[14px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'resort'
                  ? 'text-brand-primary bg-brand-primary/10 font-black'
                  : 'text-brand-charcoal hover:text-brand-primary hover:bg-brand-cream'
              }`}
            >
              <Palmtree className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'en' ? 'Sobari Resort' : 'সবারি রিসোর্ট'}</span>
            </button>

            <button
              onClick={() => setCurrentView('bakery')}
              className={`px-3 py-2 rounded-xl text-[14px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'bakery'
                  ? 'text-brand-primary bg-brand-primary/10 font-black'
                  : 'text-brand-charcoal hover:text-brand-primary hover:bg-brand-cream'
              }`}
            >
              <Cake className="w-4 h-4 text-pink-600" />
              <span>{lang === 'en' ? 'Bakery' : 'বেকারি'}</span>
            </button>

            <button
              onClick={() => setCurrentView('sorgorom')}
              className={`px-3 py-2 rounded-xl text-[14px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'sorgorom'
                  ? 'text-brand-primary bg-brand-primary/10 font-black'
                  : 'text-brand-charcoal hover:text-brand-primary hover:bg-brand-cream'
              }`}
            >
              <Flame className="w-4 h-4 text-orange-600" />
              <span>{lang === 'en' ? 'Sorgorom' : 'সরগরম'}</span>
            </button>

            <button
              onClick={() => setCurrentView('lights')}
              className={`px-3 py-2 rounded-xl text-[14px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'lights'
                  ? 'text-brand-primary bg-brand-primary/10 font-black'
                  : 'text-brand-charcoal hover:text-brand-primary hover:bg-brand-cream'
              }`}
            >
              <Lamp className="w-4 h-4 text-yellow-600" />
              <span>{lang === 'en' ? 'Lights' : 'লাইটস'}</span>
            </button>

            {/* Branches / Locations */}
            <button
              onClick={() => scrollToSection('locations')}
              className="px-3 py-2 rounded-xl text-[14px] font-bold text-brand-charcoal hover:text-brand-primary hover:bg-brand-cream transition-all cursor-pointer flex items-center gap-1.5"
            >
              <MapPin className="w-4 h-4 text-brand-muted" />
              <span>{lang === 'en' ? 'Locations' : 'শাখা সমূহ'}</span>
            </button>

          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Cart Icon (if food in cart) */}
            {cartCount > 0 && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl bg-brand-cream text-brand-primary hover:bg-brand-primary/10 transition cursor-pointer"
                title="View Food Order Bag"
              >
                <ShoppingBag className="w-5 h-5 text-brand-accent" />
                <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              </button>
            )}

            {/* Book / Inquiry Action Button */}
            <button
              onClick={() => openGroupInquiry()}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-brand-accent to-brand-accentHover text-white px-4 py-2.5 rounded-xl font-black text-sm shadow-md hover:shadow-lg hover:scale-102 transition cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{lang === 'en' ? 'Resort & Event Booking' : 'রিসোর্ট ও ইভেন্ট বুকিং'}</span>
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
          
          <div className="px-2 pt-2 pb-1 border-b border-brand-border">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-muted">
              {lang === 'en' ? 'Explore Sarinda Brands' : 'সারিন্দা গ্রুপের প্রতিষ্ঠানসমূহ'}
            </p>
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
                    <p className="font-extrabold text-sm text-brand-primary">{concern.name}</p>
                    <p className="text-[11px] text-brand-muted">{concern.badge}</p>
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
              className="w-full py-2.5 text-center font-extrabold text-brand-primary bg-brand-cream rounded-xl text-sm"
            >
              {lang === 'en' ? 'Corporate Overview & History' : 'গ্রুপ পরিচিতি ও ইতিহাস'}
            </button>

            <button
              onClick={() => {
                scrollToSection('locations');
              }}
              className="w-full py-2.5 text-center font-extrabold text-brand-charcoal bg-gray-100 rounded-xl text-sm"
            >
              {lang === 'en' ? 'All Branches Directory' : 'সকল শাখার ঠিকানা ও যোগাযোগ'}
            </button>

            <button
              onClick={() => {
                openGroupInquiry();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-3 text-center font-black text-white bg-brand-accent rounded-xl text-sm shadow-md"
            >
              {lang === 'en' ? 'Book Resort / Plan Event' : 'রিসোর্ট বুকিং ও ইভেন্ট কোটেশন'}
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
