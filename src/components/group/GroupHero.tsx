import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { SARINDA_GROUP_DATA } from '../../data/groupData';
import { 
  Building2, 
  UtensilsCrossed, 
  Palmtree, 
  Cake, 
  Flame, 
  Lamp, 
  ArrowRight, 
  Calendar, 
  Sparkles,
  PhoneCall
} from 'lucide-react';

export const GroupHero: React.FC = () => {
  const { lang, setCurrentView, openGroupInquiry } = useStore();
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      concernId: 'sobari-resort',
      title: lang === 'bn' ? 'সারিন্দা সবারি রিসোর্ট' : 'Sarinda Sobari Resort',
      tagline: lang === 'bn' ? 'ময়মনসিংহের সুইজারল্যান্ড — সবুজ প্রকৃতি ও সুইমিংপুল' : 'The Viral "Switzerland of Mymensingh"',
      description: lang === 'bn' 
        ? 'বিশাল সুইমিংপুল, কাঠের কটেজ ও ৫০০ টাকার রিডিম্যাবল ফুড কুপন সমৃদ্ধ ভাইরাল রিসোর্ট।'
        : 'Luxury wooden eco-cottages, crystal blue swimming pool & serene lake greenery.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
      badge: lang === 'bn' ? 'ভাইরাল রিসোর্ট' : 'Viral Resort',
      color: 'from-emerald-950/95 via-emerald-950/85 to-black/90',
      actionText: lang === 'bn' ? 'রিসোর্ট বুকিং' : 'Explore Resort'
    },
    {
      concernId: 'sarinda-restaurant',
      title: lang === 'bn' ? 'সারিন্দা রেস্টুরেন্ট অ্যান্ড ক্যাটারিং' : 'Sarinda Restaurant & Catering',
      tagline: lang === 'bn' ? 'ঐতিহ্যবাহী শাহী দম কাচ্চি ও ১৮ বছরের সুনাম' : 'Mymensingh’s Legendary Shahi Kacchi',
      description: lang === 'bn' 
        ? 'খাঁটি ঘিয়ে তামার ডেকে রান্না করা শাহী কাচ্চি, খাসির রেজালা ও ৫০০০+ অতিথির রাজকীয় ক্যাটারিং।'
        : 'Legendary slow-cooked Dam Kacchi Biryani & full-scale wedding catering since 2008.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
      badge: lang === 'bn' ? 'ঐতিহ্যবাহী স্বাদ' : 'Culinary Heritage',
      color: 'from-amber-950/95 via-[#1a0e05]/85 to-black/90',
      actionText: lang === 'bn' ? 'অনলাইন ফুড অর্ডার' : 'Order Food Online'
    },
    {
      concernId: 'sarinda-bakery',
      title: lang === 'bn' ? 'সারিন্দা বেকারি অ্যান্ড কনফেকশনারি' : 'Sarinda Bakery & Confectionery',
      tagline: lang === 'bn' ? 'কাস্টম ডিজাইনার কেক, পেস্ট্রি ও খাঁটি মিষ্টি' : 'Custom 3D Celebration Cakes & Bakes',
      description: lang === 'bn' 
        ? 'প্রতিটি উৎসবের জন্য তাজা বেকড থিম কেক, পেস্ট্রি ও খাঁটি ঘিয়ে ভাজা ঐতিহ্যবাহী মিষ্টি।'
        : 'Handcrafted designer birthday cakes, live oven bakes & pure ghee Bengali sweets.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=85',
      badge: lang === 'bn' ? '৩টি আউটলেট' : '3 City Outlets',
      color: 'from-pink-950/95 via-[#200511]/85 to-black/90',
      actionText: lang === 'bn' ? 'কেক প্রি-অর্ডার' : 'Explore Bakery'
    },
    {
      concernId: 'sorgorom-restaurant',
      title: lang === 'bn' ? 'সরগরম রেস্টুরেন্ট অ্যান্ড ক্যাফে' : 'Sorgorom Restaurant & Cafe',
      tagline: lang === 'bn' ? 'সিজলার্স, মেগা বার্গার ও জমজমাট আড্ডা' : 'Sizzling Steaks & Vibrant Cafe Vibes',
      description: lang === 'bn' 
        ? 'চরপাড়া মোড়ের সবচেয়ে প্রিয় আড্ডা — ধোঁয়া ওঠা কাস্ট-আইরন সিজলিং স্টেক ও কোল্ড কফি বার।'
        : 'Cast-iron sizzling platters, gourmet loaded burgers & energetic cafe conversations.',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=85',
      badge: lang === 'bn' ? 'চরপাড়া মোড়' : 'Charpara Mor',
      color: 'from-red-950/95 via-[#200705]/85 to-black/90',
      actionText: lang === 'bn' ? 'সিজলিং মেন্যু' : 'View Sizzlers'
    },
    {
      concernId: 'sarinda-lights',
      title: lang === 'bn' ? 'সারিন্দা লাইটস, ফ্যান ও ইলেকট্রিক্যালস' : 'Sarinda Lights, Fans & Electricals',
      tagline: lang === 'bn' ? 'রাজকীয় ঝাড়বাতি, লাক্সারি সিলিং ফ্যান ও লাইটিং' : 'Luxury Chandeliers, Fans & Smart Lights',
      description: lang === 'bn' 
        ? 'সবারি রিসোর্টের রাতের আলোকসজ্জার রূপকার — আমদানিকৃত ক্রিস্টাল ঝাড়বাতি ও বিএলডিসি ফ্যান শোরুম।'
        : 'Imported crystal chandeliers, smart BLDC ceiling fans & architectural lighting.',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=85',
      badge: lang === 'bn' ? 'লাইটিং ও ফ্যান শোরুম' : 'Lighting & Fans',
      color: 'from-yellow-950/95 via-[#1f1902]/85 to-black/90',
      actionText: lang === 'bn' ? 'প্রোডাক্ট ক্যাটালগ' : 'Explore Products'
    }
  ];

  // Gentle slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const currentSlide = heroSlides[activeSlide];

  return (
    <section className="relative overflow-hidden bg-brand-dark text-white min-h-[580px] lg:min-h-[660px] flex flex-col justify-between">
      
      {/* Background Slides */}
      {heroSlides.map((slide, idx) => (
        <div
          key={slide.concernId}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.color}`} />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/85" />
        </div>
      ))}

      {/* Decorative Golden Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-gold/12 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-10 flex-1 flex flex-col justify-center">
        
        <div className="max-w-2xl">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-brand-gold/30 text-brand-gold text-xs font-black uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>{currentSlide.badge}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-200">{lang === 'bn' ? 'সারিন্দা গ্রুপ' : 'Sarinda Group'}</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-md">
            {currentSlide.title}
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-xl text-brand-gold font-bold mt-2 font-serif tracking-wide drop-shadow">
            {currentSlide.tagline}
          </p>

          {/* Concise Description */}
          <p className="text-xs sm:text-sm text-gray-200 mt-3 leading-relaxed font-medium drop-shadow-sm max-w-xl">
            {currentSlide.description}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 mt-7">
            
            {/* Direct Venture View */}
            <button
              onClick={() => setCurrentView(currentSlide.concernId as any)}
              className="bg-brand-accent hover:bg-brand-accentHover text-white px-5 py-3 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-float hover:scale-102 transition cursor-pointer group"
            >
              <span>{currentSlide.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Universal Inquiry */}
            <button
              onClick={() => openGroupInquiry(currentSlide.concernId)}
              className="bg-white/12 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-brand-gold" />
              <span>{lang === 'bn' ? 'বুকিং ও কোটেশন' : 'Book / Quotation'}</span>
            </button>

            {/* Direct Phone */}
            <a
              href="tel:+8801852363235"
              className="px-3.5 py-3 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 text-gray-200 hover:text-white transition flex items-center gap-2 text-xs font-semibold"
            >
              <PhoneCall className="w-3.5 h-3.5 text-brand-gold" />
              <span className="hidden sm:inline">+880 1712-121434</span>
            </a>

          </div>

        </div>

        {/* Carousel Selector Thumbnails */}
        <div className="mt-10 pt-5 border-t border-white/12">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
            {heroSlides.map((slide, idx) => {
              const isCurrent = idx === activeSlide;
              return (
                <button
                  key={slide.concernId}
                  onClick={() => setActiveSlide(idx)}
                  className={`p-2 sm:p-2.5 rounded-xl text-left transition-all duration-300 cursor-pointer border ${
                    isCurrent
                      ? 'bg-white/20 backdrop-blur-md border-brand-gold shadow-sm scale-102'
                      : 'bg-black/35 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-[9px] font-black uppercase tracking-wider ${isCurrent ? 'text-brand-gold' : 'text-gray-400'}`}>
                      0{idx + 1}
                    </span>
                    {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping" />}
                  </div>
                  <p className="text-[11px] sm:text-xs font-extrabold text-white truncate">
                    {slide.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Bottom Group Stats Ribbon */}
      <div className="relative z-10 bg-black/70 backdrop-blur-md border-t border-white/10 py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          
          <div className="flex flex-col items-center">
            <span className="font-serif text-lg sm:text-xl font-black text-brand-gold">
              {SARINDA_GROUP_DATA.stats.experienceYears}
            </span>
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">
              {lang === 'bn' ? 'সুনামের ঐতিহ্য' : 'Years of Trust'}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-serif text-lg sm:text-xl font-black text-brand-gold">
              {SARINDA_GROUP_DATA.stats.sisterBrands}
            </span>
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">
              {lang === 'bn' ? 'প্রধান ব্র্যান্ড' : 'Sister Concerns'}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-serif text-lg sm:text-xl font-black text-brand-gold">
              {SARINDA_GROUP_DATA.stats.activeOutlets}
            </span>
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">
              {lang === 'bn' ? 'শাখা ও আউটলেট' : 'City Outlets'}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-serif text-lg sm:text-xl font-black text-brand-gold">
              {SARINDA_GROUP_DATA.stats.teamMembers}
            </span>
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">
              {lang === 'bn' ? 'প্রশিক্ষিত কর্মী' : 'Team Members'}
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col items-center">
            <span className="font-serif text-lg sm:text-xl font-black text-brand-gold">
              {SARINDA_GROUP_DATA.stats.annualGuests}
            </span>
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">
              {lang === 'bn' ? 'বার্ষিক সন্তুষ্ট অতিথি' : 'Happy Guests'}
            </span>
          </div>

        </div>
      </div>

    </section>
  );
};
