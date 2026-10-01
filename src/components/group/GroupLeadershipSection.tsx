import React from 'react';
import { useStore } from '../../context/StoreContext';
import { SARINDA_GROUP_DATA } from '../../data/groupData';
import { Quote, Sparkles, ShieldCheck, HeartHandshake, Award, Compass } from 'lucide-react';

export const GroupLeadershipSection: React.FC = () => {
  const { lang } = useStore();
  const { chairman, managingDirector } = SARINDA_GROUP_DATA.leadership;

  const coreValues = [
    {
      icon: ShieldCheck,
      title: lang === 'en' ? 'Uncompromised Hygiene & Quality' : 'শতভাগ স্বাস্থ্যসম্মত ও গুণগত মান',
      desc: lang === 'en' 
        ? 'From organic spice sourcing to spotless resort grounds, quality is non-negotiable across every Sarinda brand.'
        : 'খাবারের কাঁচামাল সংগ্রহ থেকে শুরু করে রিসোর্ট ও বেকারির প্রতিটি ধাপে শতভাগ স্বাস্থ্যবিধি ও গুণগত মান বজায় রাখা হয়।'
    },
    {
      icon: HeartHandshake,
      title: lang === 'en' ? 'Authentic Hospitality' : 'আন্তরিক আতিথেয়তা ও গ্রাহক সেবা',
      desc: lang === 'en'
        ? 'We treat every diner, resident guest, and customer with heartfelt warmth rooted in traditional hospitality.'
        : 'প্রতিটি অতিথিকে আমরা নিজের পরিবারের সদস্যের মতো পরম শ্রদ্ধায় ও স্নেহে আন্তরিক সেবা প্রদান করি।'
    },
    {
      icon: Compass,
      title: lang === 'en' ? 'Progressive Modern Innovation' : 'আধুনিক প্রযুক্তি ও নান্দনিকতা',
      desc: lang === 'en'
        ? 'Embracing smart architecture, digital online ordering, and eco-sustainable tourism.'
        : 'আর্কিটেকচারাল লাইটিং, ডিজিটাল অর্ডারিং ও ইকো-ফ্রেন্ডলি পর্যটন ব্যবস্থার মাধ্যমে আধুনিক জীবনযাত্রার প্রসার।'
    },
    {
      icon: Award,
      title: lang === 'en' ? 'Generations of Community Trust' : 'প্রজন্মের পর প্রজন্ম অটুট বিশ্বাস',
      desc: lang === 'en'
        ? 'Rooted in Mymensingh since 2008, proud to be a pillar of pride and community progress.'
        : '২০০৮ সাল থেকে ময়মনসিংহের মানুষের বিশ্বস্ত ভালোবাসা ও অনুপ্রেরণায় আমাদের এই অগ্রযাত্রা।'
    }
  ];

  return (
    <section id="leadership" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>{lang === 'en' ? 'Leadership & Vision' : 'নেতৃত্ব ও দর্শন'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-brand-primary leading-tight">
            {lang === 'en' ? 'Guiding Principles of Sarinda Group' : 'সারিন্দা গ্রুপের মূল চালিকাশক্তি'}
          </h2>

          <p className="text-base sm:text-lg text-brand-muted mt-3 font-medium">
            {lang === 'en'
              ? 'Driven by visionary leadership dedicated to elevating regional hospitality, lifestyle, and local commerce.'
              : 'দূরদর্শী নেতৃত্বের দিকনির্দেশনায় ময়মনসিংহকে আন্তর্জাতিক মানের আতিথেয়তা ও আধুনিক জীবনধারায় প্রতিষ্ঠিত করার প্রত্যয়।'}
          </p>
        </div>

        {/* Leadership Message Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Chairman Card */}
          <div className="bg-brand-cream/60 rounded-3xl p-8 border border-brand-border shadow-soft flex flex-col justify-between relative group hover:border-brand-gold/50 transition">
            <Quote className="w-12 h-12 text-brand-gold/30 absolute top-6 right-6 pointer-events-none" />

            <div>
              <p className="text-sm sm:text-base text-brand-charcoal italic leading-relaxed font-medium mb-6">
                "{lang === 'en' ? chairman.message : chairman.banglaMessage}"
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-brand-border">
              <img
                src={chairman.image}
                alt={chairman.name}
                className="w-16 h-16 rounded-2xl object-cover shadow-sm border-2 border-white"
              />
              <div>
                <h4 className="font-serif text-lg font-black text-brand-primary">
                  {lang === 'en' ? chairman.name : chairman.banglaName}
                </h4>
                <p className="text-xs font-bold text-brand-accent">
                  {lang === 'en' ? chairman.role : chairman.banglaRole}
                </p>
              </div>
            </div>
          </div>

          {/* Managing Director Card */}
          <div className="bg-brand-cream/60 rounded-3xl p-8 border border-brand-border shadow-soft flex flex-col justify-between relative group hover:border-brand-gold/50 transition">
            <Quote className="w-12 h-12 text-brand-gold/30 absolute top-6 right-6 pointer-events-none" />

            <div>
              <p className="text-sm sm:text-base text-brand-charcoal italic leading-relaxed font-medium mb-6">
                "{lang === 'en' ? managingDirector.message : managingDirector.banglaMessage}"
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-brand-border">
              <img
                src={managingDirector.image}
                alt={managingDirector.name}
                className="w-16 h-16 rounded-2xl object-cover shadow-sm border-2 border-white"
              />
              <div>
                <h4 className="font-serif text-lg font-black text-brand-primary">
                  {lang === 'en' ? managingDirector.name : managingDirector.banglaName}
                </h4>
                <p className="text-xs font-bold text-brand-accent">
                  {lang === 'en' ? managingDirector.role : managingDirector.banglaRole}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillars of Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-white border border-brand-border/80 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-black text-brand-primary">
                    {val.title}
                  </h4>
                  <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                    {val.desc}
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
