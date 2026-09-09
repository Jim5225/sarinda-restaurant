import React from 'react';
import { useStore } from '../context/StoreContext';
import { translations } from '../data/translations';
import { ShieldCheck, Flame, Zap, Users2 } from 'lucide-react';

export const TrustIndicators: React.FC = () => {
  const { lang } = useStore();
  const t = translations[lang];

  const features = [
    {
      icon: Flame,
      title: t.trust1Title,
      desc: t.trust1Desc,
      bg: 'bg-orange-50 text-brand-accent'
    },
    {
      icon: ShieldCheck,
      title: t.trust2Title,
      desc: t.trust2Desc,
      bg: 'bg-emerald-50 text-brand-leaf'
    },
    {
      icon: Zap,
      title: t.trust3Title,
      desc: t.trust3Desc,
      bg: 'bg-amber-50 text-amber-600'
    },
    {
      icon: Users2,
      title: t.trust4Title,
      desc: t.trust4Desc,
      bg: 'bg-blue-50 text-blue-600'
    }
  ];

  return (
    <section className="py-10 bg-white border-y border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, index) => {
            const Icon = f.icon;
            return (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 rounded-2xl bg-brand-cream/50 hover:bg-brand-cream border border-brand-border/40 transition duration-200"
              >
                <div className={`p-3 rounded-xl shrink-0 ${f.bg}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-black text-lg text-brand-primary">
                    {f.title}
                  </h4>
                  <p className="text-sm font-semibold text-brand-muted mt-1 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
