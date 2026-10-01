import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { SARINDA_GROUP_DATA, GroupSisterConcern } from '../../data/groupData';
import { 
  Building2, 
  UtensilsCrossed, 
  Palmtree, 
  Cake, 
  Flame, 
  Lamp, 
  Pizza, 
  Scissors, 
  MapPin, 
  Clock, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Phone,
  Sparkles,
  Calendar
} from 'lucide-react';

export const VenturesGrid: React.FC = () => {
  const { lang, setCurrentView, openGroupInquiry } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: lang === 'en' ? 'All Sister Concerns' : 'সকল অঙ্গপ্রতিষ্ঠান' },
    { id: 'dining', label: lang === 'en' ? 'Dining & Hospitality' : 'রেস্তোরাঁ ও আতিথেয়তা' },
    { id: 'resort', label: lang === 'en' ? 'Resort & Tourism' : 'রিসোর্ট ও পর্যটন' },
    { id: 'bakery', label: lang === 'en' ? 'Bakery & Sweets' : 'বেকারি ও মিষ্টি' },
    { id: 'lighting', label: lang === 'en' ? 'Lighting & Lifestyle' : 'লাইটিং ও লাইফস্টাইল' },
  ];

  const getConcernCategoryFilter = (concern: GroupSisterConcern) => {
    if (concern.id === 'sarinda-restaurant' || concern.id === 'sorgorom-restaurant' || concern.id === 'pizza-shuttle') {
      return 'dining';
    }
    if (concern.id === 'sobari-resort') {
      return 'resort';
    }
    if (concern.id === 'sarinda-bakery') {
      return 'bakery';
    }
    if (concern.id === 'sarinda-lights' || concern.id === 'starline-sparkle') {
      return 'lighting';
    }
    return 'other';
  };

  const filteredVentures = SARINDA_GROUP_DATA.ventures.filter((v) => {
    if (activeCategory === 'all') return true;
    return getConcernCategoryFilter(v) === activeCategory;
  });

  const getConcernIcon = (id: string) => {
    switch (id) {
      case 'sarinda-restaurant': return UtensilsCrossed;
      case 'sobari-resort': return Palmtree;
      case 'sarinda-bakery': return Cake;
      case 'sorgorom-restaurant': return Flame;
      case 'sarinda-lights': return Lamp;
      case 'pizza-shuttle': return Pizza;
      case 'starline-sparkle': return Scissors;
      default: return Building2;
    }
  };

  const handleConcernAction = (venture: GroupSisterConcern) => {
    switch (venture.id) {
      case 'sarinda-restaurant':
        setCurrentView('restaurant');
        break;
      case 'sobari-resort':
        setCurrentView('resort');
        break;
      case 'sarinda-bakery':
        setCurrentView('bakery');
        break;
      case 'sorgorom-restaurant':
        setCurrentView('sorgorom');
        break;
      case 'sarinda-lights':
        setCurrentView('lights');
        break;
      default:
        openGroupInquiry(venture.id);
        break;
    }
  };

  return (
    <section id="ventures" className="py-20 bg-brand-cream/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-black tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>{lang === 'en' ? 'Our Diversified Portfolio' : 'সারিন্দা গ্রুপ পোর্টফোলিও'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-brand-primary tracking-tight">
            {lang === 'en' ? 'Sister Concerns & Enterprises' : 'সারিন্দা গ্রুপের সকল শপ ও প্রতিষ্ঠান'}
          </h2>

          <p className="text-brand-muted text-base sm:text-lg mt-3 font-medium">
            {lang === 'en'
              ? 'Explore our distinguished brands spanning award-winning restaurants, eco-luxury resort, artisanal bakeries, fast food, and architectural lighting solutions.'
              : 'ঐতিহ্যবাহী রেস্তোরাঁ, ভাইরাল সবারি রিসোর্ট, প্রিমিয়াম বেকারি, সিজলিং ক্যাফে ও আর্কিটেকচারাল লাইটিং — সবই সারিন্দা গ্রুপের এক ছাতার নিচে।'}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-brand-primary text-white shadow-md scale-105'
                    : 'bg-white text-brand-charcoal hover:bg-brand-primary/10 border border-brand-border'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ventures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVentures.map((venture) => {
            const Icon = getConcernIcon(venture.id);

            return (
              <div
                key={venture.id}
                className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 border border-brand-border flex flex-col group"
              >
                {/* Venture Image Banner */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={venture.heroImage}
                    alt={venture.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    <span className="px-3 py-1 rounded-full bg-brand-primary/90 text-brand-gold text-xs font-black backdrop-blur-md flex items-center gap-1.5 shadow-sm border border-brand-gold/30">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? venture.category : venture.banglaCategory}</span>
                    </span>

                    <span className="px-2.5 py-1 rounded-full bg-black/60 text-white text-xs font-bold backdrop-blur-md flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{venture.rating}</span>
                      <span className="text-[10px] text-gray-300">({venture.reviewsCount})</span>
                    </span>
                  </div>

                  {/* Bottom Image Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-[11px] font-black uppercase tracking-wider text-brand-gold">
                      {lang === 'en' ? `Established ${venture.established}` : `${venture.established} সালে প্রতিষ্ঠিত`}
                    </p>
                    <h3 className="font-serif text-xl sm:text-2xl font-black text-white leading-tight">
                      {lang === 'en' ? venture.name : venture.banglaName}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  {/* Tagline */}
                  <div>
                    <p className="text-sm font-bold text-brand-accent">
                      {lang === 'en' ? venture.tagline : venture.banglaTagline}
                    </p>
                    <p className="text-xs text-brand-muted mt-2 line-clamp-3 leading-relaxed">
                      {lang === 'en' ? venture.description : venture.banglaDescription}
                    </p>
                  </div>

                  {/* Highlights Bullet Points */}
                  <div className="space-y-2 py-2 border-y border-brand-border/60">
                    {(lang === 'en' ? venture.highlights : venture.banglaHighlights).slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-brand-charcoal font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Location & Contact Meta */}
                  <div className="text-xs text-brand-muted space-y-1.5 pt-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-brand-leaf shrink-0" />
                      <span className="truncate">{lang === 'en' ? venture.address : venture.banglaAddress}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-brand-leaf shrink-0" />
                      <span>{lang === 'en' ? venture.hours : venture.banglaHours}</span>
                    </div>
                  </div>

                  {/* Dual Card Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleConcernAction(venture)}
                      className="flex-1 bg-brand-primary hover:bg-brand-dark text-white py-2.5 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:scale-101 transition cursor-pointer"
                    >
                      <span>
                        {venture.id === 'sarinda-restaurant'
                          ? (lang === 'en' ? 'Order Food / Menu' : 'খাবার অর্ডার ও মেন্যু')
                          : venture.id === 'sobari-resort'
                          ? (lang === 'en' ? 'Resort Packages' : 'রিসোর্ট প্যাকেজ')
                          : venture.id === 'sarinda-bakery'
                          ? (lang === 'en' ? 'Bakery & Cakes' : 'কেক ও বেকারি')
                          : venture.id === 'sorgorom-restaurant'
                          ? (lang === 'en' ? 'Sizzlers & Cafe' : 'সিজলার্স ও ক্যাফে')
                          : venture.id === 'sarinda-lights'
                          ? (lang === 'en' ? 'Lighting Catalog' : 'লাইটিং ক্যাটালগ')
                          : (lang === 'en' ? 'Explore Venture' : 'বিস্তারিত দেখুন')}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => openGroupInquiry(venture.id)}
                      className="p-2.5 rounded-xl border border-brand-border bg-brand-cream hover:bg-brand-primary/10 text-brand-primary transition cursor-pointer"
                      title={lang === 'en' ? 'Direct Booking & Inquiry' : 'সরাসরি বুকিং ও অনুসন্ধান'}
                    >
                      <Calendar className="w-4 h-4 text-brand-accent" />
                    </button>

                    <a
                      href={`tel:${venture.phone}`}
                      className="p-2.5 rounded-xl border border-brand-border bg-brand-cream hover:bg-brand-primary/10 text-brand-primary transition cursor-pointer"
                      title="Call Concern"
                    >
                      <Phone className="w-4 h-4 text-brand-emerald" />
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
