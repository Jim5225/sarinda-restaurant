import React from 'react';
import { useStore } from '../../../context/StoreContext';
import { SARINDA_GROUP_DATA } from '../../../data/groupData';
import { 
  ArrowLeft, 
  Cake, 
  MapPin, 
  Phone, 
  Gift, 
  Calendar, 
  Star, 
  CheckCircle2, 
  Clock,
  Sparkles
} from 'lucide-react';

export const BakeryPage: React.FC = () => {
  const { lang, setCurrentView, openGroupInquiry } = useStore();

  const bakery = SARINDA_GROUP_DATA.ventures.find(v => v.id === 'sarinda-bakery')!;

  return (
    <div className="min-h-screen bg-slate-50 text-brand-charcoal flex flex-col">
      
      {/* Top Strip */}
      <div className="bg-pink-950 text-white py-3 px-4 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              setCurrentView('group');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-xs sm:text-sm font-black text-pink-300 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'en' ? 'Back to Sarinda Group Hub' : 'সারিন্দা গ্রুপ পোর্টালে ফিরুন'}</span>
          </button>

          <span className="bg-pink-700 text-white px-2.5 py-0.5 rounded text-[11px] font-black">
            {lang === 'en' ? 'Bakery & Sweets' : 'বেকারি ও মিষ্টি'}
          </span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative bg-pink-900 text-white min-h-[460px] flex items-center overflow-hidden">
        <img
          src={bakery.heroImage}
          alt="Sarinda Bakery"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-950/95 via-pink-950/80 to-black/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/30 text-xs font-black uppercase tracking-wider mb-4">
              <Cake className="w-4 h-4" />
              <span>{lang === 'en' ? 'Artisanal Confectionery' : 'আর্টিস্যানাল বেকারি ও মিষ্টি'}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              {lang === 'en' ? 'Sarinda Bakery & Confectionery' : 'সারিন্দা বেকারি অ্যান্ড কনফেকশনারি'}
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-pink-300 font-bold mt-2">
              {lang === 'en' ? bakery.tagline : bakery.banglaTagline}
            </p>

            <p className="text-sm sm:text-base text-gray-200 mt-4 leading-relaxed max-w-2xl">
              {lang === 'en' ? bakery.description : bakery.banglaDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                onClick={() => openGroupInquiry('sarinda-bakery')}
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-float hover:scale-102 transition cursor-pointer"
              >
                <Gift className="w-4 h-4" />
                <span>{lang === 'en' ? 'Pre-Order Custom Cake' : 'কাস্টম কেক প্রি-অর্ডার'}</span>
              </button>

              <a
                href="tel:+8801712121434"
                className="bg-white/15 hover:bg-white/25 text-white border border-white/30 px-5 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 transition"
              >
                <Phone className="w-4 h-4 text-pink-300" />
                <span>+880 1712-121434</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Outlets in Town */}
        <div className="bg-white rounded-3xl p-8 border border-pink-200 shadow-soft">
          <h2 className="font-serif text-2xl font-black text-brand-primary mb-6">
            {lang === 'en' ? '3 Prime Outlets in Mymensingh' : 'ময়মনসিংহে আমাদের ৩টি প্রধান শাখা'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bakery.branches?.map((branch, i) => (
              <div key={i} className="p-5 rounded-2xl bg-pink-50/70 border border-pink-100 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-black text-base text-brand-primary">
                    {lang === 'en' ? branch.name : branch.banglaName}
                  </h3>
                  <p className="text-xs text-brand-muted mt-2">
                    {lang === 'en' ? branch.address : branch.banglaAddress}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-pink-200/60 flex items-center justify-between">
                  <a href={`tel:${branch.phone}`} className="text-xs font-bold text-pink-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{branch.phone}</span>
                  </a>
                  <span className="text-[11px] text-gray-500">8 AM - 11 PM</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing / Spec */}
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-brand-primary text-center mb-8">
            {lang === 'en' ? 'Signature Cakes & Fresh Bakes' : 'জনপ্রিয় কেক ও মিষ্টির মূল্যতালিকা'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bakery.pricingOrSpec?.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-pink-100 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-black text-brand-primary">{lang === 'en' ? item.label : item.banglaLabel}</h3>
                  <p className="font-serif text-2xl font-black text-pink-700 my-2">{item.price}</p>
                  <p className="text-xs text-brand-muted">{lang === 'en' ? item.details : item.banglaDetails}</p>
                </div>
                <div className="pt-6">
                  <button
                    onClick={() => openGroupInquiry('sarinda-bakery')}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    {lang === 'en' ? 'Order Cake' : 'অর্ডার দিন'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
