import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { translations } from '../data/translations';
import { X, Search, Plus, Star } from 'lucide-react';
import { MenuItem } from '../types';

export const SearchModal: React.FC = () => {
  const { lang, isSearchOpen, setIsSearchOpen, menu, setDetailItem, addToCart, setIsCartOpen } = useStore();
  const t = translations[lang];
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return menu.filter(
      item =>
        item.name.toLowerCase().includes(q) ||
        item.banglaName.includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [query, menu]);

  if (!isSearchOpen) return null;

  const handleSelect = (item: MenuItem) => {
    setIsSearchOpen(false);
    setDetailItem(item);
  };

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.addons && item.addons.length > 0) {
      handleSelect(item);
    } else {
      addToCart(item, 1);
      setIsSearchOpen(false);
      setIsCartOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-brand-border flex flex-col max-h-[80vh]">
        
        {/* Search Header */}
        <div className="p-4 sm:p-5 border-b border-brand-border flex items-center gap-3 bg-brand-cream/30">
          <Search className="w-5 h-5 text-brand-leaf shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="flex-1 text-base sm:text-lg text-brand-charcoal bg-transparent focus:outline-none placeholder:text-brand-muted/60"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-brand-muted hover:text-brand-charcoal px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 rounded-xl text-brand-charcoal/70 hover:bg-brand-cream transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
          {!query.trim() ? (
            <div className="text-center py-8 text-brand-muted">
              <p className="text-xs uppercase tracking-wider font-bold mb-3">Popular Searches</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Kacchi Biryani', 'Mutton Rezala', 'Chicken Roast', 'Borhani', 'Firni', 'Royal Platter'].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="px-3.5 py-1.5 rounded-full bg-brand-cream text-xs font-semibold text-brand-charcoal hover:bg-brand-primary hover:text-white transition cursor-pointer"
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-10 text-brand-muted">
              <p className="text-sm font-semibold">No dishes found for "{query}"</p>
              <p className="text-xs mt-1">Try another keyword like biryani, mutton, or chicken.</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-brand-muted font-semibold uppercase tracking-wider px-1">
                Found {searchResults.length} {searchResults.length === 1 ? 'dish' : 'dishes'}
              </p>
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="flex items-center justify-between p-3 rounded-2xl border border-brand-border/60 hover:border-brand-primary/40 hover:bg-brand-cream/30 transition cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase text-brand-leaf">
                          {item.category}
                        </span>
                        <div className="flex items-center text-amber-500 text-[10px]">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span className="ml-0.5 font-bold">{item.rating}</span>
                        </div>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-brand-charcoal group-hover:text-brand-primary transition">
                        {lang === 'en' ? item.name : item.banglaName}
                      </h4>
                      <p className="text-xs font-black text-brand-primary mt-0.5">
                        ৳{item.price}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleQuickAdd(item, e)}
                    className="p-2.5 rounded-xl bg-brand-cream group-hover:bg-brand-primary group-hover:text-white text-brand-primary transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
