import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { translations } from '../data/translations';
import { Tag, Copy, Check, ArrowRight, Sparkles, Clock } from 'lucide-react';
import { Offer } from '../types';

export const OffersSection: React.FC = () => {
  const { lang, offers, applyOffer, setIsCartOpen, setActiveTab } = useStore();
  const t = translations[lang];
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleApplyAndOrder = (offer: Offer) => {
    applyOffer(offer.code);
    setActiveTab('menu');
    const menuSec = document.getElementById('menu');
    if (menuSec) menuSec.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="offers" className="py-16 bg-brand-cream/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-accent/15 text-brand-accent text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Exclusive Savings' : 'বিশেষ ছাড় ও অফার'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-primary">
            {lang === 'en' ? 'Current Special Offers' : 'চলতি সেরা অফার ও ডিসকাউন্ট'}
          </h2>
          <p className="text-sm sm:text-base text-brand-muted mt-2">
            {lang === 'en'
              ? 'Save more on your favorite biryanis, platters, and family feasts with these limited-time deals.'
              : 'আপনার পছন্দের খাবার অর্ডারে আকর্ষণীয় ছাড় উপভোগ করতে কুপন কোড ব্যবহার করুন।'}
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-3xl overflow-hidden border border-brand-border/80 shadow-soft hover:shadow-elevated transition duration-300 flex flex-col group"
            >
              {/* Image banner */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 bg-brand-accent text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow">
                  {offer.badge}
                </span>
                <div className="absolute bottom-3 left-4 text-white">
                  <span className="font-extrabold text-2xl text-brand-gold">
                    {offer.discountPercent}% OFF
                  </span>
                </div>
              </div>

              {/* Offer Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif font-bold text-lg text-brand-charcoal">
                    {lang === 'en' ? offer.title : offer.banglaTitle}
                  </h3>
                  <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                    {lang === 'en' ? offer.description : offer.banglaDescription}
                  </p>
                  
                  <div className="flex items-center gap-1.5 text-[11px] text-brand-leaf font-semibold mt-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{offer.validity}</span>
                  </div>
                </div>

                {/* Promo Code & Action */}
                <div className="pt-3 border-t border-brand-border space-y-3">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-brand-cream/60 border border-dashed border-brand-border">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-brand-leaf" />
                      <span className="font-mono font-bold text-sm tracking-wider text-brand-primary">
                        {offer.code}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(offer.code)}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-brand-cream border border-brand-border text-[11px] font-semibold text-brand-charcoal transition flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode === offer.code ? (
                        <>
                          <Check className="w-3 h-3 text-brand-leaf" />
                          <span className="text-brand-leaf">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => handleApplyAndOrder(offer)}
                    className="w-full py-3 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
                  >
                    <span>{lang === 'en' ? 'Apply Code & Order' : 'অফার নিয়ে অর্ডার করুন'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
