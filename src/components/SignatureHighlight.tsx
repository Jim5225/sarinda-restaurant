import React from 'react';
import { useStore } from '../context/StoreContext';
import { translations } from '../data/translations';
import { Sparkles, Check, ShoppingBag, Award } from 'lucide-react';

export const SignatureHighlight: React.FC = () => {
  const { lang, setDetailItem, menu } = useStore();
  const t = translations[lang];

  const signature = menu.find(item => item.id === 'special-kacchi-biryani' || item.isSignature) || menu[0];

  return (
    <section className="py-16 bg-brand-primary text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-leaf/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-brand-accent/20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Image composition */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img
                  src={signature.image}
                  alt={signature.name}
                  className="w-full h-80 sm:h-96 object-cover transform hover:scale-105 transition duration-700"
                />
                <div className="absolute top-4 left-4 bg-brand-gold text-brand-dark px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-lg">
                  <Award className="w-4 h-4" />
                  {lang === 'en' ? 'Signature Masterpiece' : 'সারিন্দার সেরা পদ'}
                </div>
              </div>

              {/* Floating review highlight */}
              <div className="absolute -bottom-6 right-4 sm:-right-4 bg-white text-brand-charcoal p-4 rounded-2xl shadow-xl max-w-xs border border-brand-border">
                <p className="text-xs italic text-brand-muted">
                  "{lang === 'en' ? 'Mutton was so succulent it literally melted. Spiced to absolute perfection!' : 'মাংসটা মুখে দিলেই মিলিয়ে যায়, একদম আসল শাহী দম বিরিয়ানির স্বাদ।'}"
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] font-bold text-brand-primary">
                  <span>Tanvir A. (Verified Customer)</span>
                  <span className="text-amber-500">★★★★★</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text & Culinary Craftsmanship */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold text-xs sm:text-sm font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'en' ? 'Crown Jewel of Sarinda' : 'আমাদের সেরা নিবেদন'}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-black leading-tight tracking-tight">
              {lang === 'en' ? signature.name : signature.banglaName}
            </h2>

            <p className="text-base sm:text-lg font-medium text-brand-cream/90 leading-relaxed">
              {lang === 'en' ? signature.description : signature.banglaDescription}
            </p>

            {/* Quality Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                lang === 'en' ? 'Prime farm mutton cuts' : 'সেরা মানের খাসির মাংস',
                lang === 'en' ? 'Fragrant aged Chinigura rice' : 'সুগন্ধি পুরোনো চিনিগুঁড়া চাল',
                lang === 'en' ? 'Shahi saffron & pure ghee' : 'শাহী জাফরান ও খাঁটি গাওয়া ঘি',
                lang === 'en' ? 'Sealed earthen handi dum' : 'সিল্ড মাটির হাঁড়িতে খাঁটি দম'
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm sm:text-base font-bold text-brand-cream">
                  <div className="w-6 h-6 rounded-full bg-brand-leaf/40 flex items-center justify-center text-brand-gold shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Price and CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-5xl font-black text-brand-gold">৳{signature.price}</span>
                {signature.originalPrice && (
                  <span className="text-xl font-bold line-through text-white/50">৳{signature.originalPrice}</span>
                )}
              </div>

              <button
                onClick={() => setDetailItem(signature)}
                className="px-8 py-4 rounded-2xl bg-brand-accent hover:bg-brand-accentHover text-white font-black text-base shadow-elevated hover:shadow-float flex items-center gap-2.5 transition duration-200 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{t.addToCart}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
