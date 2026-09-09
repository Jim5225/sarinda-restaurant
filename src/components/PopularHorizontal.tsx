import React, { useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { translations } from '../data/translations';
import { ChevronLeft, ChevronRight, Plus, Star, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';

export const PopularHorizontal: React.FC = () => {
  const { lang, menu, addToCart, setDetailItem, setIsCartOpen } = useStore();
  const t = translations[lang];
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const popularItems = menu.filter((item) => item.isPopular);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const hasAddons = item.addons && item.addons.length > 0;
    const hasPortions = item.portions && item.portions.length > 0;
    if (hasAddons || hasPortions) {
      setDetailItem(item);
    } else {
      addToCart(item, 1);
      setIsCartOpen(true);
    }
  };

  return (
    <section className="py-14 bg-brand-cream/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-brand-leaf mb-1">
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'en' ? 'Chef Recommended' : 'শেফের সেরা পরামর্শ'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-brand-primary tracking-tight">
              {t.popularDishes}
            </h2>
            <p className="text-base sm:text-lg font-semibold text-brand-muted mt-1.5">
              {t.popularSub}
            </p>
          </div>

          {/* Slider controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-2xl border-2 border-brand-border bg-white text-brand-charcoal hover:bg-brand-primary hover:text-white transition shadow-sm cursor-pointer"
              aria-label="Previous dishes"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-2xl border-2 border-brand-border bg-white text-brand-charcoal hover:bg-brand-primary hover:text-white transition shadow-sm cursor-pointer"
              aria-label="Next dishes"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Horizontal Card Slider */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-4 pt-1 no-scrollbar snap-x scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {popularItems.map((item) => {
            const hasAddons = item.addons && item.addons.length > 0;
            const hasPortions = item.portions && item.portions.length > 0;
            const displayPortionNote = lang === 'en' ? item.portionNote : (item.banglaPortionNote || item.portionNote);

            return (
              <div
                key={item.id}
                onClick={() => setDetailItem(item)}
                className="w-72 sm:w-80 shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-brand-border/80 shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col group cursor-pointer"
              >
                {/* Image & Badges */}
                <div className="relative h-48 overflow-hidden bg-brand-cream">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  {item.isSignature && (
                    <span className="absolute top-3 left-3 bg-brand-primary text-brand-gold text-xs font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                      ★ {t.signatureBadge}
                    </span>
                  )}
                  {displayPortionNote && (
                    <span className="absolute top-3 right-3 bg-brand-primary/95 text-white text-xs font-black px-3 py-1 rounded-full shadow border border-white/20">
                      {displayPortionNote}
                    </span>
                  )}
                  <div className="absolute bottom-2 left-3 bg-black/75 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{item.rating}</span>
                    <span className="text-[11px] text-white/80 font-medium">({item.reviewsCount})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-brand-leaf">
                      {(t.categoryNames as any)?.[item.category] || item.category}
                    </span>
                    <h3 className="font-serif font-black text-xl text-brand-charcoal group-hover:text-brand-primary transition mt-1 line-clamp-1">
                      {lang === 'en' ? item.name : item.banglaName}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-brand-muted mt-1.5 line-clamp-2 leading-relaxed">
                      {lang === 'en' ? item.description : item.banglaDescription}
                    </p>
                  </div>

                  {/* Price and Add CTA */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-brand-border/60">
                    <div>
                      {hasPortions && item.portions && item.portions.length > 1 ? (
                        <div className="flex flex-col">
                          <span className="font-black text-lg text-brand-primary">
                            {lang === 'en'
                              ? `৳${item.portions[0].price} - ৳${item.portions[item.portions.length - 1].price}`
                              : `${item.portions[0].price}৳ - ${item.portions[item.portions.length - 1].price}৳`}
                          </span>
                          <span className="text-xs font-bold text-brand-muted">
                            {lang === 'en' ? 'Choose size' : 'সাইজ নির্বাচন করুন'}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-black text-2xl text-brand-primary">
                            {lang === 'en' ? `৳${item.price}` : `${item.price}৳`}
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs font-bold line-through text-brand-muted">
                              {lang === 'en' ? `৳${item.originalPrice}` : `${item.originalPrice}৳`}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleAdd(item, e)}
                      disabled={!item.isAvailable}
                      className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 transition shadow-sm cursor-pointer ${
                        !item.isAvailable
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-brand-primary text-white hover:bg-brand-dark group-hover:scale-105 active:scale-95'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{(hasAddons || hasPortions) ? t.customise : t.addToCart}</span>
                    </button>
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
