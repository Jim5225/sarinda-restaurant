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
  Star, 
  ShieldCheck, 
  Users, 
  Award,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export const GroupHero: React.FC = () => {
  const { lang, setCurrentView, openGroupInquiry } = useStore();
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      concernId: 'sobari-resort',
      title: lang === 'en' ? 'Sarinda Sobari Resort' : 'সারিন্দা সবারি রিসোর্ট',
      tagline: lang === 'en' ? 'The Viral "Switzerland of Mymensingh"' : 'ময়মনসিংহের সুইজারল্যান্ড — সবুজ প্রকৃতি ও সুইমিংপুল',
      description: lang === 'en' 
        ? 'Escape into luxury wooden eco-cottages, crystal blue swimming pools, and serene lake greenery in Akua Morolpara.' 
        : 'আকুয়া মোড়লপাড়ায় অবস্থিত নান্দনিক কাঠের কটেজ, ঝলমলে সুইমিংপুল এবং পরিবার ও বন্ধুদের অবকাশের স্বপ্নপুরী।',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
      badge: lang === 'en' ? 'Viral Destination' : 'সেরা রিসোর্ট',
      color: 'from-emerald-900/90 via-emerald-950/80 to-black/90',
      actionText: lang === 'en' ? 'Explore Resort' : 'রিসোর্ট দেখুন'
    },
    {
      concernId: 'sarinda-restaurant',
      title: lang === 'en' ? 'Sarinda Restaurant & Catering' : 'সারিন্দা রেস্টুরেন্ট অ্যান্ড ক্যাটারিং',
      tagline: lang === 'en' ? 'Mymensingh’s Legendary Shahi Kacchi Biryani' : 'ঐতিহ্যবাহী শাহী কাচ্চি ও রাজকীয় ক্যাটারিং',
      description: lang === 'en' 
        ? 'Serving authentic slow-cooked Kacchi Biryani, rich Mughlai curries, and family hospitality since 2008.' 
        : '২০০৮ সাল থেকে খাঁটি ঘিয়ে রান্না করা শাহী দম কাচ্চি, খাসির রেজালা ও ৫০০০+ অতিথির রাজকীয় ক্যাটারিং।',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
      badge: lang === 'en' ? 'Culinary Heritage' : 'ঐতিহ্যবাহী স্বাদ',
      color: 'from-amber-950/90 via-[#1a0e05]/85 to-black/90',
      actionText: lang === 'en' ? 'Order Food Online' : 'অনলাইন খাবার অর্ডার'
    },
    {
      concernId: 'sarinda-bakery',
      title: lang === 'en' ? 'Sarinda Bakery & Confectionery' : 'সারিন্দা বেকারি অ্যান্ড কনফেকশনারি',
      tagline: lang === 'en' ? 'Custom 3D Celebration Cakes & Fresh Pastries' : 'কাস্টম ডিজাইনার কেক, পেস্ট্রি ও খাঁটি মিষ্টি',
      description: lang === 'en' 
        ? 'Handcrafted designer birthday cakes, live oven bakes, and pure ghee Bengali sweets across 3 city branches.' 
        : 'প্রতিটি উৎসবকে রঙিন করতে টাটকা ওভেন বেকড কেক, মাখনের সুবাসিত পেস্ট্রি ও খাঁটি ঘিয়ে ভাজা মিষ্টি।',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=85',
      badge: lang === 'en' ? '3 Outlets in Mymensingh' : 'শহরে ৩টি শাখা',
      color: 'from-pink-950/90 via-[#200511]/85 to-black/90',
      actionText: lang === 'en' ? 'Explore Bakery' : 'বেকারি মেন্যু'
    },
    {
      concernId: 'sorgorom-restaurant',
      title: lang === 'en' ? 'Sorgorom Restaurant & Cafe' : 'সরগরম রেস্টুরেন্ট অ্যান্ড ক্যাফে',
      tagline: lang === 'en' ? 'Sizzling Steaks, Loaded Burgers & Youth Hangout' : 'সিজলার্স, রসালো বার্গার ও প্রাণবন্ত আড্ডা',
      description: lang === 'en' 
        ? 'The buzzing social hotspot at Charpara Mor famous for cast-iron sizzling platters, steaks, and coffee.' 
        : 'চরপাড়া মোড়ের সবচেয়ে জনপ্রিয় আড্ডার স্থান — ধোঁয়া ওঠা সিজলার্স, মেগা বার্গার ও ফ্রেশ কোল্ড কফি।',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=85',
      badge: lang === 'en' ? 'Charpara Mor' : 'চরপাড়া মোড়',
      color: 'from-red-950/90 via-[#200705]/85 to-black/90',
      actionText: lang === 'en' ? 'View Sizzlers' : 'সিজলিং মেন্যু'
    },
    {
      concernId: 'sarinda-lights',
      title: lang === 'en' ? 'Sarinda Lights & Interior Décor' : 'সারিন্দা লাইটস অ্যান্ড ইন্টেরিয়র',
      tagline: lang === 'en' ? 'Imperial Crystal Chandeliers & Resort Illumination' : 'রাজকীয় ঝাড়বাতি ও আর্কিটেকচারাল লাইটিং',
      description: lang === 'en' 
        ? 'Illuminating Sarinda Sobari Resort and premium duplexes with imported crystal chandeliers & smart LED systems.' 
        : 'সবারি রিসোর্টের দৃষ্টিনন্দন রাতের আলোকসজ্জার নেপথ্যে — আমদানিকৃত রাজকীয় ঝাড়বাতি ও স্মার্ট এলইডি সলিউশন।',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=85',
      badge: lang === 'en' ? 'Lighting & Interior' : 'আলোকসজ্জা ও ইন্টেরিয়র',
      color: 'from-yellow-950/90 via-[#1f1902]/85 to-black/90',
      actionText: lang === 'en' ? 'Explore Lighting' : 'লাইটিং কালেকশন'
    }
  ];

  // Auto rotate slides gently
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const currentSlide = heroSlides[activeSlide];

  return (
    <section className="relative overflow-hidden bg-brand-dark text-white min-h-[620px] lg:min-h-[700px] flex flex-col justify-between">
      
      {/* Background Image Carousel with Smooth Transitions */}
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
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/80" />
        </div>
      ))}

      {/* Decorative Gold Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-gold/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-12 flex-1 flex flex-col justify-center">
        
        <div className="max-w-3xl">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-brand-gold/40 text-brand-gold text-xs font-black tracking-wide uppercase mb-5 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-brand-gold" />
            <span>{currentSlide.badge}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-200">{lang === 'en' ? 'A Concern of Sarinda Group' : 'সারিন্দা গ্রুপের অঙ্গপ্রতিষ্ঠান'}</span>
          </div>

          {/* Dynamic Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-md">
            {currentSlide.title}
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-2xl text-brand-gold font-bold mt-2 font-serif tracking-wide drop-shadow">
            {currentSlide.tagline}
          </p>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-200 mt-4 leading-relaxed max-w-2xl font-medium drop-shadow-sm">
            {currentSlide.description}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mt-8">
            
            {/* View Specific Venture */}
            <button
              onClick={() => setCurrentView(currentSlide.concernId as any)}
              className="bg-brand-accent hover:bg-brand-accentHover text-white px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 shadow-float hover:scale-102 transition cursor-pointer group"
            >
              <span>{currentSlide.actionText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Universal Group Inquiry */}
            <button
              onClick={() => openGroupInquiry(currentSlide.concernId)}
              className="bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center gap-2 hover:scale-102 transition cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-brand-gold" />
              <span>{lang === 'en' ? 'Book / Quotation' : 'বুকিং ও কোটেশন'}</span>
            </button>

            {/* Direct Phone Call */}
            <a
              href="tel:+8801712121434"
              className="px-4 py-3.5 rounded-2xl bg-black/40 hover:bg-black/60 border border-white/10 text-gray-300 hover:text-white transition flex items-center gap-2 text-sm font-semibold"
            >
              <PhoneCall className="w-4 h-4 text-brand-gold" />
              <span className="hidden sm:inline">+880 1712-121434</span>
            </a>

          </div>

        </div>

        {/* Carousel Selector Thumbnails / Cards */}
        <div className="mt-12 pt-6 border-t border-white/15">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
            {lang === 'en' ? 'Select Venture to Explore:' : 'অঙ্গপ্রতিষ্ঠান নির্বাচন করুন:'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
            {heroSlides.map((slide, idx) => {
              const isCurrent = idx === activeSlide;
              return (
                <button
                  key={slide.concernId}
                  onClick={() => setActiveSlide(idx)}
                  className={`p-2.5 sm:p-3 rounded-2xl text-left transition-all duration-300 cursor-pointer border ${
                    isCurrent
                      ? 'bg-white/20 backdrop-blur-md border-brand-gold shadow-md translate-y-[-2px]'
                      : 'bg-black/40 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${isCurrent ? 'text-brand-gold' : 'text-gray-400'}`}>
                      0{idx + 1}
                    </span>
                    {isCurrent && <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />}
                  </div>
                  <p className="text-xs sm:text-sm font-extrabold text-white truncate">
                    {slide.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Bottom Group Stats Ribbon */}
      <div className="relative z-10 bg-black/60 backdrop-blur-md border-t border-white/10 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
          
          <div className="flex flex-col items-center">
            <span className="font-serif text-xl sm:text-2xl font-black text-brand-gold">
              {SARINDA_GROUP_DATA.stats.experienceYears}
            </span>
            <span className="text-[11px] font-bold text-gray-300 mt-0.5 uppercase tracking-wider">
              {lang === 'en' ? 'Years of Legacy' : 'বছরের ঐতিহ্য'}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-serif text-xl sm:text-2xl font-black text-brand-gold">
              {SARINDA_GROUP_DATA.stats.sisterBrands}
            </span>
            <span className="text-[11px] font-bold text-gray-300 mt-0.5 uppercase tracking-wider">
              {lang === 'en' ? 'Sister Concerns' : 'টি অঙ্গপ্রতিষ্ঠান'}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-serif text-xl sm:text-2xl font-black text-brand-gold">
              {SARINDA_GROUP_DATA.stats.activeOutlets}
            </span>
            <span className="text-[11px] font-bold text-gray-300 mt-0.5 uppercase tracking-wider">
              {lang === 'en' ? 'City Outlets' : 'আউটলেট ও শাখা'}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-serif text-xl sm:text-2xl font-black text-brand-gold">
              {SARINDA_GROUP_DATA.stats.teamMembers}
            </span>
            <span className="text-[11px] font-bold text-gray-300 mt-0.5 uppercase tracking-wider">
              {lang === 'en' ? 'Hospitality Staff' : 'কর্মী ও শেফ'}
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col items-center">
            <span className="font-serif text-xl sm:text-2xl font-black text-brand-gold">
              {SARINDA_GROUP_DATA.stats.annualGuests}
            </span>
            <span className="text-[11px] font-bold text-gray-300 mt-0.5 uppercase tracking-wider">
              {lang === 'en' ? 'Happy Guests / Year' : 'বার্ষিক সন্তুষ্ট অতিথি'}
            </span>
          </div>

        </div>
      </div>

    </section>
  );
};
