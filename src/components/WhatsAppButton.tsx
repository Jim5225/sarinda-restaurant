import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const { lang, cart, cartCount, cartTotal, cartDeliveryFee, deliveryArea } = useStore();
  const [showFlyout, setShowFlyout] = useState(false);

  const restaurantPhone = '8801712121434'; // Official Sarinda Restaurant WhatsApp Number

  const buildWhatsAppUrl = (customText?: string) => {
    let message = '';

    if (customText) {
      message = customText;
    } else if (cart.length > 0) {
      const itemsList = cart
        .map((item) => {
          const name = lang === 'en' ? item.menuItem.name : item.menuItem.banglaName;
          const basePrice = item.selectedPortion ? item.selectedPortion.price : item.menuItem.price;
          const addonSum = item.selectedAddons.reduce((s, a) => s + a.price, 0);
          const lineTotal = (basePrice + addonSum) * item.quantity;
          return `• ${item.quantity}x ${name} — ৳${lineTotal}`;
        })
        .join('\n');

      message =
        `*আসসালামু আলাইকুম সারিন্দা রেস্তোরাঁ!* 🍽️\n` +
        `আমি ওয়েবসাইট থেকে সরাসরি নিচের খাবারগুলো অর্ডার করতে চাই:\n\n` +
        `*খাবারের তালিকা:*\n${itemsList}\n\n` +
        `-------------------------\n` +
        `• মোট আইটেম: ${cartCount}টি\n` +
        `• ডেলিভারি এলাকা: ${deliveryArea || 'সি কে ঘোষ রোড / টাউন হল'}\n` +
        `• ডেলিভারি ফি: ৳${cartDeliveryFee}\n` +
        `• *সর্বমোট প্রদেয়:* ৳${cartTotal}\n` +
        `-------------------------\n\n` +
        `দয়া করে আমার অর্ডারটি কনফার্ম করুন ও ডেলিভারির সময় জানিয়ে দিন। ধন্যবাদ!`;
    } else {
      message =
        `আসসালামু আলাইকুম সারিন্দা রেস্তোরাঁ! 🍽️\n` +
        `আমি আপনাদের সুস্বাদু কাচ্চি বিরিয়ানি ও অন্যান্য খাবার অর্ডার করতে চাই। আজকের স্পেশাল মেনু ও ডেলিভারি সম্পর্কে জানতে পারি কি?`;
    }

    return `https://wa.me/${restaurantPhone}?text=${encodeURIComponent(message)}`;
  };

  const handleLaunchWhatsApp = (customText?: string) => {
    const url = buildWhatsAppUrl(customText);
    window.open(url, '_blank', 'noopener,noreferrer');
    setShowFlyout(false);
  };

  return (
    <>
      {/* Floating WhatsApp Launcher */}
      <div className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 flex items-center gap-3">
        {/* Animated Tooltip Pill (Desktop) */}
        <div
          onClick={() => handleLaunchWhatsApp()}
          className="hidden md:flex items-center gap-2 bg-[#075E54] text-white py-2 px-3.5 rounded-2xl shadow-elevated border border-[#25D366]/40 cursor-pointer hover:bg-[#128C7E] transition backdrop-blur-md group"
        >
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
          <span className="text-xs font-bold text-white group-hover:underline">
            {cart.length > 0
              ? lang === 'en'
                ? `Order Cart (${cartCount} items) on WhatsApp`
                : `হোয়াটসঅ্যাপে কার্ট (${cartCount}টি আইটেম) অর্ডার করুন`
              : lang === 'en'
              ? 'Chat & Order on WhatsApp'
              : 'হোয়াটসঅ্যাপে সরাসরি চ্যাট ও অর্ডার'}
          </span>
        </div>

        {/* WhatsApp Main Button */}
        <div className="relative">
          <button
            onClick={() => {
              if (cart.length > 0) {
                handleLaunchWhatsApp();
              } else {
                setShowFlyout(!showFlyout);
              }
            }}
            className="relative group p-3.5 sm:p-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-float hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border-2 border-white shadow-[#25D366]/40"
            aria-label="WhatsApp Order"
          >
            {/* WhatsApp Vector Icon */}
            <svg
              className="w-7 h-7 fill-current drop-shadow-xs"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.031 2C6.496 2 2 6.496 2 12.031c0 1.77.462 3.498 1.34 5.021L2 22l5.086-1.332A9.98 9.98 0 0 0 12.03 22c5.536 0 10.03-4.496 10.03-10.031C22.062 6.496 17.568 2 12.031 2zm0 18.337a8.27 8.27 0 0 1-4.228-1.157l-.303-.18-3.14.823.838-3.059-.197-.314A8.272 8.272 0 0 1 3.766 12.03c0-4.557 3.708-8.265 8.265-8.265 4.557 0 8.265 3.708 8.265 8.265 0 4.557-3.708 8.265-8.265 8.265zm4.536-6.19c-.248-.125-1.47-.726-1.698-.809-.228-.083-.394-.125-.56.125-.166.249-.644.809-.789.975-.145.166-.29.187-.539.062-.249-.125-1.05-.387-2-1.234-.739-.66-1.238-1.474-1.383-1.723-.145-.249-.015-.383.109-.507.112-.112.249-.29.373-.435.125-.145.166-.249.249-.415.083-.166.041-.311-.021-.435-.062-.125-.56-1.349-.768-1.847-.202-.486-.407-.42-.56-.428l-.477-.008c-.166 0-.436.062-.664.311-.228.249-.871.851-.871 2.075s.892 2.407 1.017 2.573c.125.166 1.754 2.679 4.249 3.757.594.257 1.058.41 1.42.525.597.19 1.14.163 1.569.099.479-.071 1.47-.602 1.678-1.183.208-.581.208-1.079.145-1.183-.062-.104-.228-.166-.477-.291z" />
            </svg>

            {/* Cart Count Badge if items exist */}
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-accent text-white font-extrabold text-[11px] min-w-5 h-5 px-1 rounded-full flex items-center justify-center border-2 border-white animate-bounce shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* Pulsing ring indicator */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping -z-10" />
        </div>
      </div>

      {/* Interactive Quick Flyout for Fast Ordering */}
      {showFlyout && (
        <div className="fixed bottom-36 sm:bottom-24 left-4 sm:left-6 z-50 w-72 sm:w-80 bg-white rounded-3xl shadow-2xl border border-brand-border p-4 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-brand-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-xs text-brand-charcoal">সারিন্দা রেস্তোরাঁ WhatsApp</p>
                <p className="text-[10px] text-brand-leaf font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-leaf animate-pulse" />
                  সারিন্দা লাইভ এজেন্ট সক্রিয়
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowFlyout(false)}
              className="p-1 rounded-lg text-brand-muted hover:text-brand-charcoal hover:bg-brand-cream transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-brand-charcoal mt-3 leading-relaxed">
            আসসালামু আলাইকুম! সরাসরি হোয়াটসঅ্যাপে অর্ডার বা যেকোনো তথ্য জানতে নিচের যেকোনো অপশনে ক্লিক করুন:
          </p>

          <div className="mt-3 space-y-2">
            <button
              onClick={() =>
                handleLaunchWhatsApp(
                  'আসসালামু আলাইকুম! আমি ২ প্লেট স্পেশাল কাচ্চি বিরিয়ানি ও শাহী বোরহানি অর্ডার করতে চাই।'
                )
              }
              className="w-full text-left p-2.5 rounded-xl bg-brand-cream/60 hover:bg-brand-primary hover:text-white text-xs font-semibold text-brand-charcoal transition flex items-center justify-between group cursor-pointer"
            >
              <span>🍛 ২টা কাচ্চি বিরিয়ানি অর্ডার করব</span>
              <span className="text-[10px] text-brand-muted group-hover:text-white">এখনই পাঠান →</span>
            </button>

            <button
              onClick={() =>
                handleLaunchWhatsApp(
                  'আসসালামু আলাইকুম! আপনাদের আজকের ফুল মেনু ও স্পেশাল অফারগুলো দেখতে চাই।'
                )
              }
              className="w-full text-left p-2.5 rounded-xl bg-brand-cream/60 hover:bg-brand-primary hover:text-white text-xs font-semibold text-brand-charcoal transition flex items-center justify-between group cursor-pointer"
            >
              <span>📜 আজকের মেনু ও অফার তালিকা</span>
              <span className="text-[10px] text-brand-muted group-hover:text-white">পাঠান →</span>
            </button>

            <button
              onClick={() =>
                handleLaunchWhatsApp(
                  'আসসালামু আলাইকুম! আমি আজ একটি টেবিল/কেবিন অগ্রিম বুকিং দিতে চাই।'
                )
              }
              className="w-full text-left p-2.5 rounded-xl bg-brand-cream/60 hover:bg-brand-primary hover:text-white text-xs font-semibold text-brand-charcoal transition flex items-center justify-between group cursor-pointer"
            >
              <span>🪑 টেবিল বা কেবিন বুকিং দিতে চাই</span>
              <span className="text-[10px] text-brand-muted group-hover:text-white">পাঠান →</span>
            </button>
          </div>

          <button
            onClick={() => handleLaunchWhatsApp()}
            className="w-full mt-3 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
          >
            <span>সরাসরি হোয়াটসঅ্যাপে কথা বলুন</span>
          </button>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;
