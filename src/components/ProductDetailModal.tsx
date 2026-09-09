import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { translations } from '../data/translations';
import { X, Plus, Minus, Check, Star, Flame, ShoppingBag } from 'lucide-react';
import { Addon } from '../types';

export const ProductDetailModal: React.FC = () => {
  const { lang, detailItem, setDetailItem, addToCart, setIsCartOpen } = useStore();
  const t = translations[lang];

  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [specialNote, setSpecialNote] = useState('');

  if (!detailItem) return null;

  const handleAddonToggle = (addon: Addon) => {
    setSelectedAddons((prev) => {
      const exists = prev.some((a) => a.id === addon.id);
      if (exists) {
        return prev.filter((a) => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const itemTotal = (detailItem.price + addonsTotal) * quantity;

  const handleAddToCart = () => {
    addToCart(detailItem, quantity, selectedAddons, specialNote.trim() || undefined);
    setDetailItem(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-brand-border flex flex-col max-h-[90vh]">
        
        {/* Header Image */}
        <div className="relative h-64 sm:h-72 w-full bg-brand-cream shrink-0">
          <img
            src={detailItem.image}
            alt={detailItem.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => setDetailItem(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-xs transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 bg-black/70 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold">{detailItem.rating}</span>
            <span className="text-white/70">({detailItem.reviewsCount} reviews)</span>
          </div>

          {detailItem.isSpicy && (
            <div className="absolute bottom-3 right-4 bg-red-600/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-bold">
              <Flame className="w-3.5 h-3.5" />
              <span>{t.spicyBadge}</span>
            </div>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Title and Price */}
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-leaf">
                {detailItem.category}
              </span>
              {detailItem.isAvailable ? (
                <span className="text-xs font-semibold text-brand-leaf flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  {lang === 'en' ? 'Available Now' : 'উপলব্ধ আছে'}
                </span>
              ) : (
                <span className="text-xs font-semibold text-red-500">
                  {t.outOfStock}
                </span>
              )}
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-primary mt-1">
              {lang === 'en' ? detailItem.name : detailItem.banglaName}
            </h2>

            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-black text-brand-primary">
                ৳{detailItem.price}
              </span>
              {detailItem.originalPrice && (
                <span className="text-sm line-through text-brand-muted">
                  ৳{detailItem.originalPrice}
                </span>
              )}
            </div>

            <p className="text-sm text-brand-charcoal/80 mt-3 leading-relaxed">
              {lang === 'en' ? detailItem.description : detailItem.banglaDescription}
            </p>
          </div>

          {/* Upsells / Add-ons Section */}
          {detailItem.addons && detailItem.addons.length > 0 && (
            <div className="border-t border-brand-border pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-brand-charcoal uppercase tracking-wider">
                  {t.completeYourMeal}
                </h3>
                <span className="text-[11px] text-brand-muted">Optional</span>
              </div>

              <div className="space-y-2">
                {detailItem.addons.map((addon) => {
                  const isChecked = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => handleAddonToggle(addon)}
                      className={`flex items-center justify-between p-3 rounded-2xl border transition cursor-pointer ${
                        isChecked
                          ? 'border-brand-primary bg-brand-primary/5'
                          : 'border-brand-border bg-brand-cream/30 hover:bg-brand-cream/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                            isChecked
                              ? 'bg-brand-primary border-brand-primary text-white'
                              : 'border-brand-muted/40 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-sm font-semibold text-brand-charcoal">
                          {lang === 'en' ? addon.name : addon.banglaName}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-brand-primary">
                        +৳{addon.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Cooking Note */}
          <div className="border-t border-brand-border pt-4">
            <label className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-2">
              {lang === 'en' ? 'Special Cooking Instructions (Optional)' : 'বিশেষ কোনো নির্দেশনা (ঐচ্ছিক)'}
            </label>
            <input
              type="text"
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder={lang === 'en' ? 'e.g. Less spicy, pack extra salad' : 'যেমন: কম ঝাল দিন, সালাদ বেশি দিন'}
              className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream/40 border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-brand-border bg-brand-cream/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Quantity Controls */}
          <div className="flex items-center border border-brand-border bg-white rounded-2xl p-1 shadow-xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-brand-charcoal hover:bg-brand-cream transition cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-bold text-sm text-brand-primary">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-brand-charcoal hover:bg-brand-cream transition cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAddToCart}
            disabled={!detailItem.isAvailable}
            className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-2xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition duration-200 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t.addToCart}</span>
            <span className="mx-1">•</span>
            <span className="font-extrabold text-brand-gold">৳{itemTotal}</span>
          </button>

        </div>

      </div>
    </div>
  );
};
