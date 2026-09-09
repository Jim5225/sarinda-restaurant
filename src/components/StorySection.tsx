import React from 'react';
import { useStore } from '../context/StoreContext';
import { translations } from '../data/translations';
import { Sparkles, Heart, Award, ShieldCheck } from 'lucide-react';

export const StorySection: React.FC = () => {
  const { lang, setIsReservationOpen } = useStore();
  const t = translations[lang];

  return (
    <section id="about" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Images Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-soft h-56">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
                  alt="Restaurant Ambiance"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="bg-brand-primary text-white p-6 rounded-3xl space-y-2">
                <div className="font-serif text-3xl font-extrabold text-brand-gold">15+</div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-cream/80">
                  {lang === 'en' ? 'Years of Culinary Heritage' : 'বছরের রন্ধন ঐতিহ্য'}
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="bg-brand-cream p-6 rounded-3xl border border-brand-border space-y-2">
                <div className="font-serif text-3xl font-extrabold text-brand-primary">100k+</div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                  {lang === 'en' ? 'Happy Guests Served' : 'সন্তুষ্ট গ্রাহক'}
                </p>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-soft h-56">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
                  alt="Food Cooking"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-leaf/10 text-brand-leaf text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Our Heritage & Passion' : 'ঐতিহ্য ও ভালোবাসা'}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-primary leading-tight">
              {t.ourStory}
            </h2>

            <p className="text-sm sm:text-base text-brand-charcoal/80 leading-relaxed">
              {t.storyP1}
            </p>

            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              {t.storyP2}
            </p>

            {/* Core Values Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-accent flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-brand-primary">
                    {lang === 'en' ? 'Cooked with Love' : 'ভালোবাসা দিয়ে রান্না'}
                  </h4>
                  <p className="text-xs text-brand-muted mt-0.5">
                    {lang === 'en' ? 'Traditional slow fire cooking with hand-ground spices.' : 'ঘরোয়া মমতায় তৈরি খাঁটি মশলার নিখুঁত রান্না।'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-leaf flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-brand-primary">
                    {lang === 'en' ? 'Uncompromised Hygiene' : 'নিখুঁত স্বাস্থ্যবিধি'}
                  </h4>
                  <p className="text-xs text-brand-muted mt-0.5">
                    {lang === 'en' ? 'Spotless modern kitchen meeting top food safety standards.' : 'সর্বোচ্চ স্বাস্থ্যসম্মত পরিবেশে খাবার প্রস্তুত।'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsReservationOpen(true)}
                className="px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
              >
                {lang === 'en' ? 'Visit Us — Reserve a Table' : 'আমাদের রেস্তোরাঁয় আসুন — টেবিল বুক করুন'}
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
