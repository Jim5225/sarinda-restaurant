import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { translations } from '../data/translations';
import { Search, Plus, Star, Flame, Sparkles, Filter, Check } from 'lucide-react';
import { MenuItem } from '../types';

export const MenuSection: React.FC = () => {
  const { lang, menu, addToCart, setDetailItem, setIsCartOpen } = useStore();
  const t = translations[lang];

  const categories: Array<MenuItem['category'] | 'All'> = [
    'All',
    'Biryani',
    'Khichuri',
    'Kebab',
    'Meat',
    'Fish',
    'Rice',
    'Vorta & Dal',
    'Naan & Paratha',
    'Kebab Platter',
    'Dessert',
    'Drinks'
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpicy, setFilterSpicy] = useState(false);
  const [filterSignatureOnly, setFilterSignatureOnly] = useState(false);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const filteredMenu = useMemo(() => {
    return menu.filter((item) => {
      // Category match
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query) || item.banglaName.includes(query);
        const matchDesc = item.description.toLowerCase().includes(query) || item.banglaDescription.includes(query);
        if (!matchName && !matchDesc) return false;
      }
      // Filters
      if (filterSpicy && !item.isSpicy) return false;
      if (filterSignatureOnly && !item.isSignature) return false;

      return true;
    });
  }, [menu, selectedCategory, searchQuery, filterSpicy, filterSignatureOnly]);

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const hasAddons = item.addons && item.addons.length > 0;
    const hasPortions = item.portions && item.portions.length > 0;
    if (hasAddons || hasPortions) {
      setDetailItem(item);
    } else {
      addToCart(item, 1);
      setAddedToast(lang === 'en' ? `Added ${item.name}` : `${item.banglaName} যোগ করা হয়েছে`);
      setTimeout(() => setAddedToast(null), 2500);
    }
  };

  return (
    <section id="menu" className="py-16 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Toast Feedback */}
        {addedToast && (
          <div className="fixed bottom-20 right-6 z-50 bg-brand-primary text-white px-4 py-3 rounded-2xl shadow-float flex items-center gap-2 border border-brand-leaf animate-in slide-in-from-bottom">
            <Check className="w-5 h-5 text-brand-gold stroke-[3]" />
            <span className="text-sm font-bold">{addedToast}</span>
            <button
              onClick={() => setIsCartOpen(true)}
              className="ml-2 underline text-xs text-brand-gold hover:text-white"
            >
              {lang === 'en' ? 'View Bag' : 'ব্যাগ দেখুন'}
            </button>
          </div>
        )}

        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>{lang === 'en' ? 'Freshly Prepared Daily' : 'প্রতিদিন টাটকা তৈরি'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-primary">
            {lang === 'en' ? 'Our Digital Menu' : 'সারিন্দার ডিজিটাল মেনু'}
          </h2>
          <p className="text-sm sm:text-base text-brand-muted mt-2">
            {lang === 'en'
              ? 'Select your favorite dishes and order directly for fast delivery or dine-in pre-order.'
              : 'আপনার পছন্দের পদ নির্বাচন করুন এবং দ্রুত হোম ডেলিভারি পেতে সরাসরি অর্ডার করুন।'}
          </p>
        </div>

        {/* Search Bar & Filter Controls */}
        <div className="bg-brand-cream/60 p-4 rounded-3xl border border-brand-border mb-8 shadow-xs">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition"
              />
            </div>

            {/* Quick Filter Toggles */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
              <button
                onClick={() => setFilterSignatureOnly(!filterSignatureOnly)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  filterSignatureOnly
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'bg-white text-brand-charcoal border border-brand-border hover:bg-brand-cream'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span>{lang === 'en' ? 'Chef Signature' : 'শেফ স্পেশাল'}</span>
              </button>

              <button
                onClick={() => setFilterSpicy(!filterSpicy)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  filterSpicy
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-brand-charcoal border border-brand-border hover:bg-brand-cream'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-red-500" />
                <span>{lang === 'en' ? 'Spicy Items' : 'ঝাল আইটেম'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-4 mb-8 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-2xl text-sm sm:text-[15px] font-black whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-brand-primary text-white shadow-md scale-102'
                    : 'bg-brand-cream text-brand-charcoal hover:bg-brand-primary/10 hover:text-brand-primary border border-brand-border'
                }`}
              >
                {cat === 'All' ? t.allCategories : (t.categoryNames as any)?.[cat] || cat}
              </button>
            );
          })}
        </div>

        {/* Dishes Grid */}
        {filteredMenu.length === 0 ? (
          <div className="text-center py-16 bg-brand-cream/30 rounded-3xl border border-dashed border-brand-border">
            <Filter className="w-10 h-10 text-brand-muted mx-auto mb-2 opacity-50" />
            <p className="font-serif text-lg text-brand-charcoal font-bold">
              {lang === 'en' ? 'No dishes found matching your criteria' : 'আপনার পছন্দের কোনো খাবার পাওয়া যায়নি'}
            </p>
            <p className="text-xs sm:text-sm text-brand-muted mt-1 font-semibold">
              {lang === 'en' ? 'Try searching for something else or clear filters.' : 'অন্য কোনো নাম দিয়ে সার্চ করুন অথবা ফিল্টার ক্লিয়ার করুন।'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setFilterSpicy(false);
                setFilterSignatureOnly(false);
              }}
              className="mt-4 px-5 py-2.5 bg-brand-primary text-white rounded-xl text-xs sm:text-sm font-bold"
            >
              {lang === 'en' ? 'Reset Filters' : 'ফিল্টার রিসেট করুন'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMenu.map((item) => {
              const hasAddons = item.addons && item.addons.length > 0;
              const hasPortions = item.portions && item.portions.length > 0;
              const needsCustomise = hasAddons || hasPortions;
              const displayPortionNote = lang === 'en' ? item.portionNote : (item.banglaPortionNote || item.portionNote);

              return (
                <div
                  key={item.id}
                  onClick={() => setDetailItem(item)}
                  className="bg-white rounded-3xl overflow-hidden border border-brand-border/80 shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col group cursor-pointer"
                >
                  {/* Image container */}
                  <div className="relative h-48 overflow-hidden bg-brand-cream">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      loading="lazy"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {item.isSignature && (
                        <span className="bg-brand-primary/95 text-brand-gold text-[11px] font-black px-3 py-1 rounded-full shadow uppercase tracking-wider backdrop-blur-xs">
                          ★ {t.signatureBadge}
                        </span>
                      )}
                      {item.isPopular && !item.isSignature && (
                        <span className="bg-amber-600/95 text-white text-[11px] font-black px-3 py-1 rounded-full shadow uppercase tracking-wider backdrop-blur-xs">
                          🔥 {t.bestsellerBadge}
                        </span>
                      )}
                    </div>

                    {displayPortionNote && (
                      <span className="absolute top-3 right-3 bg-brand-primary/95 backdrop-blur-xs text-white text-xs font-black px-2.5 py-1 rounded-full shadow border border-white/20">
                        {displayPortionNote}
                      </span>
                    )}

                    {/* Rating badge */}
                    <div className="absolute bottom-2 left-3 bg-black/70 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{item.rating}</span>
                      <span className="text-[11px] text-white/80">({item.reviewsCount})</span>
                    </div>

                    {item.prepTime && (
                      <div className="absolute bottom-2 right-3 bg-white/95 backdrop-blur-xs text-brand-charcoal text-xs font-bold px-2.5 py-1 rounded-lg shadow-xs">
                        {item.prepTime}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-brand-leaf mb-1">
                        <span>{(t.categoryNames as any)?.[item.category] || item.category}</span>
                        {item.isSpicy && (
                          <span className="text-red-500 flex items-center gap-0.5 font-bold">
                            <Flame className="w-3.5 h-3.5" /> {t.spicyBadge}
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif font-black text-lg sm:text-xl text-brand-charcoal group-hover:text-brand-primary transition line-clamp-1">
                        {lang === 'en' ? item.name : item.banglaName}
                      </h3>

                      <p className="text-xs sm:text-sm text-brand-muted mt-1.5 line-clamp-2 leading-relaxed font-semibold">
                        {lang === 'en' ? item.description : item.banglaDescription}
                      </p>
                    </div>

                    {/* Price and Add CTA */}
                    <div className="flex items-center justify-between mt-5 pt-3 border-t border-brand-border/60">
                      <div>
                        {hasPortions && item.portions && item.portions.length > 1 ? (
                          <div className="flex flex-col">
                            <span className="font-black text-base sm:text-lg text-brand-primary">
                              {lang === 'en' 
                                ? `৳${item.portions[0].price} - ৳${item.portions[item.portions.length - 1].price}`
                                : `${item.portions[0].price}৳ - ${item.portions[item.portions.length - 1].price}৳`}
                            </span>
                            <span className="text-xs text-brand-muted font-bold">
                              {lang === 'en' ? 'Choose size' : 'সাইজ নির্বাচন করুন'}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-black text-xl sm:text-2xl text-brand-primary">
                              {lang === 'en' ? `৳${item.price}` : `${item.price}৳`}
                            </span>
                            {item.originalPrice && (
                              <span className="text-xs sm:text-sm line-through text-brand-muted font-bold">
                                {lang === 'en' ? `৳${item.originalPrice}` : `${item.originalPrice}৳`}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={(e) => handleQuickAdd(item, e)}
                        disabled={!item.isAvailable}
                        className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 transition shadow-xs cursor-pointer ${
                          !item.isAvailable
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-brand-primary text-white hover:bg-brand-dark group-hover:scale-105 active:scale-95'
                        }`}
                      >
                        <Plus className="w-4 h-4 font-bold" />
                        <span>{needsCustomise ? t.customise : t.addToCart}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
