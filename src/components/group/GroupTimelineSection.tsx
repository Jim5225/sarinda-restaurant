import React from 'react';
import { useStore } from '../../context/StoreContext';
import { SARINDA_GROUP_DATA } from '../../data/groupData';
import { Milestone, Sparkles, Building2, Award } from 'lucide-react';

export const GroupTimelineSection: React.FC = () => {
  const { lang } = useStore();

  return (
    <section id="story" className="py-20 bg-brand-cream/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>{lang === 'en' ? 'Our Historic Journey' : 'আমাদের গৌরবের ইতিহাস'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-brand-primary leading-tight">
            {lang === 'en' ? 'From a Beloved Restaurant to an Empire' : 'একটি স্বপ্ন থেকে ময়মনসিংহের শীর্ষ শিল্পগ্রুপ'}
          </h2>

          <p className="text-base sm:text-lg text-brand-muted mt-3 font-medium">
            {lang === 'en'
              ? 'Over 18 years of continuous trust, culinary excellence, and landmark expansions across hospitality and modern lifestyle.'
              : '১৮ বছরেরও বেশি সময় ধরে গ্রাহকদের অবিচল আস্থা, সততা ও উৎকর্ষের ধারাবাহিক গল্প।'}
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          
          {/* Central Vertical Line (visible on desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-brand-gold via-brand-primary/40 to-brand-gold/20 rounded-full" />

          <div className="space-y-8 md:space-y-12">
            {SARINDA_GROUP_DATA.milestones.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-6 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white p-6 rounded-3xl border border-brand-border shadow-soft hover:shadow-elevated transition-all group">
                      
                      <div className={`flex items-center gap-2 mb-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                        <span className="px-2.5 py-0.5 rounded-full bg-brand-gold/15 text-brand-dark font-black text-xs">
                          {item.brand}
                        </span>
                        <span className="font-serif text-sm font-black text-brand-accent">
                          {item.year}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-black text-brand-primary group-hover:text-brand-accent transition">
                        {lang === 'en' ? item.title : item.banglaTitle}
                      </h3>

                      <p className="text-xs sm:text-sm text-brand-muted mt-2 leading-relaxed">
                        {lang === 'en' ? item.description : item.banglaDescription}
                      </p>
                    </div>
                  </div>

                  {/* Year Node Badge on Center Line */}
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary border-4 border-white shadow-elevated text-brand-gold font-serif font-black text-xs flex items-center justify-center shrink-0 z-10 md:my-0 -my-3">
                    {item.year.slice(2)}
                  </div>

                  {/* Empty counterpart space for alternating alignment on desktop */}
                  <div className="hidden md:block w-1/2" />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
