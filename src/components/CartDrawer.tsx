import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { translations } from '../data/translations';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedCheckout }) => {
  const {
    lang,
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDeliveryFee,
    cartDiscount,
    cartTotal,
    appliedOffer,
    applyOffer,
    removeOffer,
    setActiveTab,
    menu,
    addToCart
  } = useStore();
  const t = translations[lang];

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyOffer(promoInput);
    if (res.success) {
      setPromoMessage({ type: 'success', text: res.message });
    } else {
      setPromoMessage({ type: 'error', text: res.message });
    }
  };

  // Upsell suggestion: Borhani or Firni if not in cart
  const borhaniItem = menu.find(m => m.id === 'shahi-borhani-bottle');
  const firniItem = menu.find(m => m.id === 'zafrani-firni');
  const hasBorhaniInCart = cart.some(ci => ci.menuItem.id === 'shahi-borhani-bottle');
  const suggestedUpsell = !hasBorhaniInCart ? borhaniItem : firniItem;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-brand-border">
          
          {/* Header */}
          <div className="p-5 border-b border-brand-border flex items-center justify-between bg-brand-cream/40">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-primary text-white flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-lg text-brand-primary">
                  {t.yourCart}
                </h2>
                <p className="text-xs text-brand-muted">
                  {cart.length} {lang === 'en' ? 'unique items' : 'টি পদ'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-brand-charcoal/70 hover:bg-brand-cream transition cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-brand-cream flex items-center justify-center text-brand-leaf/50 mb-4">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-charcoal">
                {t.emptyCart}
              </h3>
              <p className="text-xs text-brand-muted mt-1.5 max-w-xs leading-relaxed">
                {t.emptyCartSub}
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveTab('menu');
                  const menuSec = document.getElementById('menu');
                  if (menuSec) menuSec.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-6 px-6 py-3 rounded-2xl bg-brand-primary text-white text-xs font-bold shadow-md hover:bg-brand-dark transition cursor-pointer"
              >
                {t.browseDishes}
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              
              {/* Items List */}
              <div className="space-y-3">
                {cart.map((cartItem, idx) => {
                  const basePrice = cartItem.selectedPortion ? cartItem.selectedPortion.price : cartItem.menuItem.price;
                  const itemAddonsTotal = cartItem.selectedAddons.reduce((sum, a) => sum + a.price, 0);
                  const itemLinePrice = (basePrice + itemAddonsTotal) * cartItem.quantity;

                  return (
                    <div
                      key={cartItem.id}
                      className="p-3.5 rounded-2xl bg-brand-cream/30 border border-brand-border flex gap-3 items-start"
                    >
                      <img
                        src={cartItem.menuItem.image}
                        alt={cartItem.menuItem.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-serif font-bold text-sm text-brand-charcoal truncate">
                            {lang === 'en' ? cartItem.menuItem.name : cartItem.menuItem.banglaName}
                          </h4>
                          <button
                            onClick={() => removeFromCart(idx)}
                            className="text-brand-muted hover:text-red-500 transition p-1 cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Selected Portion if any */}
                        {cartItem.selectedPortion && (
                          <div className="mt-0.5">
                            <span className="inline-block bg-brand-primary/10 text-brand-primary text-[11px] px-2 py-0.5 rounded-md font-bold">
                              {lang === 'en' ? cartItem.selectedPortion.name : cartItem.selectedPortion.banglaName}
                            </span>
                          </div>
                        )}

                        {/* Add-ons list if any */}
                        {cartItem.selectedAddons.length > 0 && (
                          <div className="mt-1 space-y-0.5">
                            {cartItem.selectedAddons.map((addon) => (
                              <span
                                key={addon.id}
                                className="inline-block bg-white text-brand-leaf border border-brand-border text-[10px] px-2 py-0.5 rounded-md font-semibold mr-1"
                              >
                                + {lang === 'en' ? addon.name : addon.banglaName}
                              </span>
                            ))}
                          </div>
                        )}

                        {cartItem.notes && (
                          <p className="text-[11px] italic text-brand-muted mt-1">
                            "{cartItem.notes}"
                          </p>
                        )}

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-brand-border bg-white rounded-xl p-0.5">
                            <button
                              onClick={() => updateCartQuantity(idx, cartItem.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-brand-charcoal hover:bg-brand-cream rounded-lg transition"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-brand-primary">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(idx, cartItem.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-brand-charcoal hover:bg-brand-cream rounded-lg transition"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-extrabold text-sm text-brand-primary">
                            ৳{itemLinePrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Upsell recommendation */}
              {suggestedUpsell && (
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={suggestedUpsell.image}
                      alt={suggestedUpsell.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-800 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> {lang === 'en' ? 'Add To Complete Meal' : 'মিল পারফেক্ট করুন'}
                      </span>
                      <p className="text-xs font-bold text-brand-charcoal">
                        {lang === 'en' ? suggestedUpsell.name : suggestedUpsell.banglaName}
                      </p>
                      <span className="text-xs font-extrabold text-brand-primary">৳{suggestedUpsell.price}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(suggestedUpsell, 1)}
                    className="px-3 py-1.5 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-dark transition cursor-pointer"
                  >
                    + Add
                  </button>
                </div>
              )}

              {/* Promo Code Input */}
              <div className="p-3.5 rounded-2xl bg-brand-cream/40 border border-brand-border">
                {appliedOffer ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-brand-leaf" />
                      <div>
                        <span className="text-xs font-bold text-brand-primary">
                          Code: {appliedOffer.code}
                        </span>
                        <p className="text-[10px] text-brand-leaf font-semibold">
                          {appliedOffer.discountPercent}% Discount Applied (-৳{cartDiscount})
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={removeOffer}
                      className="text-xs text-red-500 font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="SARINDA15 or FAMILY20"
                        className="flex-1 px-3 py-2 rounded-xl bg-white border border-brand-border text-xs uppercase font-bold text-brand-charcoal focus:outline-none focus:ring-1 focus:ring-brand-primary"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-brand-primary text-white rounded-xl text-xs font-bold hover:bg-brand-dark transition"
                      >
                        {t.applyCode}
                      </button>
                    </div>
                    {promoMessage && (
                      <p
                        className={`text-[11px] font-medium ${
                          promoMessage.type === 'success' ? 'text-brand-leaf' : 'text-red-500'
                        }`}
                      >
                        {promoMessage.text}
                      </p>
                    )}
                  </form>
                )}
              </div>

            </div>
          )}

          {/* Footer Summary & Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-brand-border bg-brand-cream/50 space-y-3">
              <div className="space-y-1.5 text-xs text-brand-charcoal">
                <div className="flex justify-between">
                  <span className="text-brand-muted">{t.subtotal}</span>
                  <span className="font-bold">৳{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">{t.deliveryFee}</span>
                  <span className="font-bold">৳{cartDeliveryFee}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-brand-leaf font-bold">
                    <span>{t.discount}</span>
                    <span>-৳{cartDiscount}</span>
                  </div>
                )}
                <div className="border-t border-brand-border pt-2 flex justify-between text-base font-extrabold text-brand-primary">
                  <span>{t.grandTotal}</span>
                  <span>৳{cartTotal}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onProceedCheckout();
                }}
                className="w-full py-4 rounded-2xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-sm shadow-elevated hover:shadow-float flex items-center justify-center gap-2 transition duration-200 cursor-pointer"
              >
                <span>{t.proceedCheckout}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
