import React from 'react';
import { useStore } from '../context/StoreContext';
import { translations } from '../data/translations';
import { INITIAL_REVIEWS } from '../data/initialData';
import { Star, Quote, Sparkles, CheckCircle2 } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { lang } = useStore();
  const t = translations[lang];

  return (
    <section className="py-20 bg-brand-cream/40 border-t border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>{lang === 'en' ? 'Customer Voices' : 'অতিথিদের অভিজ্ঞতা'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-primary">
            {t.reviewsTitle}
          </h2>
          <p className="text-sm sm:text-base text-brand-muted mt-2">
            {t.reviewsSub}
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIAL_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-7 rounded-3xl border border-brand-border shadow-soft hover:shadow-elevated transition duration-300 flex flex-col justify-between relative"
            >
              <Quote className="w-8 h-8 text-brand-primary/15 absolute top-6 right-6" />

              <div>
                {/* Stars */}
                <div className="flex text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-brand-charcoal leading-relaxed italic">
                  "{lang === 'en' ? rev.comment : rev.banglaComment}"
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-brand-border/60 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-brand-primary/20"
                />
                <div>
                  <h4 className="font-serif font-bold text-sm text-brand-primary flex items-center gap-1">
                    {rev.author}
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-leaf" />
                  </h4>
                  <p className="text-[11px] text-brand-muted">
                    {rev.dishOrdered}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Stats footer */}
        <div className="mt-12 bg-white rounded-3xl p-6 border border-brand-border flex flex-wrap items-center justify-around gap-6 text-center shadow-xs">
          <div>
            <div className="font-serif text-3xl font-black text-brand-primary">4.9 / 5.0</div>
            <p className="text-xs font-semibold text-brand-muted mt-0.5">Overall Food & Service Rating</p>
          </div>
          <div className="hidden sm:block w-px h-10 bg-brand-border" />
          <div>
            <div className="font-serif text-3xl font-black text-brand-primary">1,200+</div>
            <p className="text-xs font-semibold text-brand-muted mt-0.5">Google & Social Reviews</p>
          </div>
          <div className="hidden sm:block w-px h-10 bg-brand-border" />
          <div>
            <div className="font-serif text-3xl font-black text-brand-primary">98%</div>
            <p className="text-xs font-semibold text-brand-muted mt-0.5">Recommend Sarinda to Friends</p>
          </div>
        </div>

      </div>
    </section>
  );
};
