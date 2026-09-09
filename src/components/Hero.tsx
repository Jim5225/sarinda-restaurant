import React from 'react';
import { useStore } from '../context/StoreContext';
import { translations } from '../data/translations';
import {
  ArrowRight,
  CalendarDays,
  Star,
  Flame,
  Sparkles,
  Clock,
  CheckCircle2,
  ShoppingBag
} from 'lucide-react';

export const Hero: React.FC = () => {
  const {
    lang,
    setActiveTab,
    setIsReservationOpen,
    setDetailItem,
    menu,
    addToCart,
    setIsCartOpen
  } = useStore();
  const t = translations[lang];

  // Signature dish
  const signatureDish = menu.find(item => item.id === 'special-kacchi-biryani') || menu.find(item => item.id === 'kacchi-biryani') || menu[0];

  const handleOrderClick = () => {
    setActiveTab('menu');
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-16 bg-gradient-to-b from-brand-cream via-brand-cream/60 to-white">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-leaf/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-brand-accent/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/25 text-brand-primary text-xs sm:text-sm font-extrabold shadow-xs">
              <Sparkles className="w-4 h-4 text-brand-accent" />
              <span>{t.heroTag}</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-brand-primary leading-[1.14]">
              {t.heroTitle}
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-brand-charcoal font-semibold max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t.heroSub}
            </p>

            {/* Highlights List */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1 text-xs sm:text-sm font-bold text-brand-charcoal">
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-brand-border shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-brand-leaf font-bold" />
                {lang === 'en' ? 'Slow Dum Cooked' : 'আসল দম রান্না'}
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-brand-border shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-brand-leaf font-bold" />
                {lang === 'en' ? 'Pure Mustard Oil & Ghee' : 'খাঁটি ঘি ও সরিষার তেল'}
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-brand-border shadow-xs">
                <Clock className="w-4 h-4 text-brand-leaf font-bold" />
                {lang === 'en' ? '30-40 Min Delivery' : '৩০-৪০ মিনিটে ডেলিভারি'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={handleOrderClick}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-black text-white bg-brand-primary hover:bg-brand-dark transition-all duration-200 shadow-elevated hover:shadow-float flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>{t.orderNow}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition duration-200" />
              </button>

              <button
                onClick={() => setIsReservationOpen(true)}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl text-base font-black text-brand-primary bg-white hover:bg-brand-cream border-2 border-brand-primary/30 hover:border-brand-primary transition-all duration-200 shadow-soft flex items-center justify-center gap-2 cursor-pointer"
              >
                <CalendarDays className="w-5 h-5 text-brand-leaf" />
                <span>{t.bookTable}</span>
              </button>
            </div>

            {/* Social Proof Snippet */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-brand-muted">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                <div className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-brand-primary text-white text-xs font-black ring-2 ring-white">
                  +1k
                </div>
              </div>
              <div>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-brand-charcoal font-bold">
                  {lang === 'en' ? 'Rated 4.9 by 1,200+ food lovers' : '১২০০+ ভোজনরসিকের প্রিয় রেস্তোরাঁ'}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Food Showcase Media Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border-4 border-white h-[500px] sm:h-[530px] flex flex-col justify-end group">
              <img
                src={signatureDish.image}
                alt={signatureDish.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white relative z-10">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="bg-brand-accent px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase shadow-md flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    {lang === 'en' ? 'Signature Masterpiece' : 'সারিন্দার সেরা সিগনেচার'}
                  </span>
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                    {lang === 'en' ? 'Heritage Dum Pukht' : 'ঐতিহ্যবাহী দম পোক্ত'}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-4xl font-black leading-tight text-white drop-shadow-md">
                  {lang === 'en' ? signatureDish.name : signatureDish.banglaName}
                </h3>
                
                <p className="text-xs sm:text-sm font-medium text-white/90 line-clamp-2 mt-1.5 leading-relaxed max-w-lg">
                  {lang === 'en' ? signatureDish.description : signatureDish.banglaDescription}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-white/20">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl sm:text-4xl font-black text-brand-gold">৳{signatureDish.price}</span>
                    {signatureDish.originalPrice && (
                      <span className="text-sm sm:text-base font-bold line-through text-white/70">৳{signatureDish.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setDetailItem(signatureDish)}
                      className="px-5 py-2.5 rounded-xl bg-white text-brand-primary text-xs sm:text-sm font-black hover:bg-brand-gold hover:text-white transition shadow-sm cursor-pointer"
                    >
                      {lang === 'en' ? 'Quick View' : 'বিস্তারিত দেখুন'}
                    </button>
                    <button
                      onClick={() => {
                        addToCart(signatureDish, 1);
                        setIsCartOpen(true);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white text-xs sm:text-sm font-black transition shadow-sm cursor-pointer flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{t.addToCart}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Live Badge at Top Right */}
            <div className="absolute -top-3 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-elevated border border-brand-border flex items-center gap-3 z-20">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-500">
                <Flame className="w-5 h-5 fill-amber-500" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-black text-brand-muted leading-tight">
                  {lang === 'en' ? 'This Month' : 'এই মাসে'}
                </p>
                <p className="text-xs sm:text-sm font-black text-brand-charcoal leading-tight">
                  {lang === 'en' ? '5,000+ Biryani Served' : '৫০০০+ কাচ্চি অর্ডার'}
                </p>
              </div>
            </div>

            {/* Floating Trust Badge at Bottom Left */}
            <div className="hidden sm:flex absolute -bottom-4 -left-2 sm:-left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-elevated border border-brand-border items-center gap-3 z-20">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-black text-brand-leaf leading-tight">
                  {lang === 'en' ? '100% Halal Meat' : '১০০% হালাল ও খাঁটি'}
                </p>
                <p className="text-xs font-black text-brand-primary leading-tight">
                  {lang === 'en' ? 'Freshly Cooked Daily' : 'প্রতিদিন তাজা রান্না'}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
