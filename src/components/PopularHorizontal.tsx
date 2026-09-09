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
    if (item.addons && item.addons.length > 0) {
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
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-leaf mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Chef Recommended' : 'শেফের সেরা পরামর্শ'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-primary">
              {t.popularDishes}
            </h2>
            <p className="text-sm text-brand-muted mt-1">
              {t.popularSub}
            </p>
          </div>

          {/* Slider controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-xl border border-brand-border bg-white text-brand-charcoal hover:bg-brand-primary hover:text-white transition shadow-xs cursor-pointer"
              aria-label="Previous dishes"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-xl border border-brand-border bg-white text-brand-charcoal hover:bg-brand-primary hover:text-white transition shadow-xs cursor-pointer"
              aria-label="Next dishes"
            >
              <ChevronRight className="w-5 h-5" />
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
            return (
              <div
                key={item.id}
                onClick={() => setDetailItem(item)}
                className="w-72 sm:w-80 shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-brand-border/70 shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col group cursor-pointer"
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
                    <span className="absolute top-3 left-3 bg-brand-primary text-brand-gold text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                      ★ {t.signatureBadge}
                    </span>
                  )}
                  {item.originalPrice && (
                    <span className="absolute top-3 right-3 bg-brand-accent text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
                      SAVE ৳{item.originalPrice - item.price}
                    </span>
                  )}
                  <div className="absolute bottom-2 left-3 bg-black/60 backdrop-blur-xs text-white text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{item.rating}</span>
                    <span className="text-[10px] text-white/70">({item.reviewsCount})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-leaf">
                      {item.category}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-brand-charcoal group-hover:text-brand-primary transition mt-1 line-clamp-1">
                      {lang === 'en' ? item.name : item.banglaName}
                    </h3>
                    <p className="text-xs text-brand-muted mt-1.5 line-clamp-2 leading-relaxed">
                      {lang === 'en' ? item.description : item.banglaDescription}
                    </p>
                  </div>

                  {/* Price and Add CTA */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-brand-border/60">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-extrabold text-xl text-brand-primary">৳{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-xs line-through text-brand-muted">৳{item.originalPrice}</span>
                        )}
                      </div>
                      <span className="text-[10px] text-brand-muted block">
                        {item.prepTime || '20 mins'}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleAdd(item, e)}
                      disabled={!item.isAvailable}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition shadow-xs cursor-pointer ${
                        !item.isAvailable
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-brand-primary text-white hover:bg-brand-dark group-hover:scale-105 active:scale-95'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{hasAddons ? t.customise : t.addToCart}</span>
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
