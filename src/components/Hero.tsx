import React from 'react';
import { useStore } from '../context/StoreContext';
import { translations } from '../data/translations';
import { ArrowRight, CalendarDays, Star, Flame, Sparkles, Clock, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const { lang, setActiveTab, setIsReservationOpen, setDetailItem, menu } = useStore();
  const t = translations[lang];

  // Find the signature dish
  const signatureDish = menu.find(item => item.id === 'kacchi-special') || menu[0];

  const handleOrderClick = () => {
    setActiveTab('menu');
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-20 bg-gradient-to-b from-brand-cream via-brand-cream/60 to-white">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-leaf/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-brand-accent/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-brand-accent" />
              <span>{t.heroTag}</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-brand-primary leading-[1.12]">
              {t.heroTitle}
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-brand-charcoal/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t.heroSub}
            </p>

            {/* Highlights List */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs sm:text-sm font-medium text-brand-charcoal/90">
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-brand-border shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-brand-leaf" />
                {lang === 'en' ? 'Slow Dum Cooked' : 'আসল দম রান্না'}
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-brand-border shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-brand-leaf" />
                {lang === 'en' ? 'Pure Mustard Oil & Ghee' : 'খাঁটি ঘি ও সরিষার তেল'}
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-brand-border shadow-xs">
                <Clock className="w-4 h-4 text-brand-leaf" />
                {lang === 'en' ? '30-40 Min Delivery' : '৩০-৪০ মিনিটে ডেলিভারি'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                onClick={handleOrderClick}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-brand-primary hover:bg-brand-dark transition-all duration-200 shadow-elevated hover:shadow-float flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{t.orderNow}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition duration-200" />
              </button>

              <button
                onClick={() => setIsReservationOpen(true)}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl text-base font-bold text-brand-primary bg-white hover:bg-brand-cream border-2 border-brand-primary/20 hover:border-brand-primary transition-all duration-200 shadow-soft flex items-center justify-center gap-2 cursor-pointer"
              >
                <CalendarDays className="w-5 h-5 text-brand-leaf" />
                <span>{t.bookTable}</span>
              </button>
            </div>

            {/* Social Proof Snippet */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-brand-muted">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-brand-primary text-white text-[11px] font-bold ring-2 ring-white">
                  +1k
                </div>
              </div>
              <div>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-brand-charcoal font-medium">
                  {lang === 'en' ? 'Rated 4.9 by 1,200+ food lovers' : '১২০০+ ভোজনরসিকের প্রিয় রেস্তোরাঁ'}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Food Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Dish Plate Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border-4 border-white transform transition hover:scale-[1.01] duration-300">
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80"
                  alt="Sarinda Special Kacchi Biryani"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-brand-accent px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase">
                      {lang === 'en' ? 'Signature Dish' : 'সিগনেচার পদ'}
                    </span>
                    <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {lang === 'en' ? 'Heritage Recipe' : 'ঐতিহ্যবাহী স্বাদ'}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                    {lang === 'en' ? signatureDish.name : signatureDish.banglaName}
                  </h3>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-brand-gold">৳{signatureDish.price}</span>
                      {signatureDish.originalPrice && (
                        <span className="text-sm line-through text-white/70">৳{signatureDish.originalPrice}</span>
                      )}
                    </div>
                    <button
                      onClick={() => setDetailItem(signatureDish)}
                      className="px-4 py-1.5 rounded-xl bg-white text-brand-primary text-xs font-bold hover:bg-brand-gold hover:text-white transition cursor-pointer"
                    >
                      {lang === 'en' ? 'Quick View & Order' : 'বিস্তারিত ও অর্ডার'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Top Right */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-elevated border border-brand-border flex items-center gap-3 animate-bounce duration-1000">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Flame className="w-5 h-5 fill-amber-500" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-bold text-brand-muted">
                    {lang === 'en' ? 'This Month' : 'এই মাসে'}
                  </p>
                  <p className="text-xs font-extrabold text-brand-charcoal">
                    {lang === 'en' ? '5,000+ Biryani Served' : '৫০০০+ কাচ্চি অর্ডার'}
                  </p>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Left */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-brand-primary text-white px-4 py-3 rounded-2xl shadow-float flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-brand-gold">
                  <Star className="w-6 h-6 fill-brand-gold" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-base font-black">4.9 / 5.0</span>
                    <span className="text-xs text-brand-cream/70 font-normal">(1.2k+ reviews)</span>
                  </div>
                  <p className="text-[11px] text-brand-gold font-medium">
                    {lang === 'en' ? 'Dhaka’s Top Rated Kacchi' : 'ঢাকার শীর্ষ পছন্দের কাচ্চি'}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
