import React from 'react';
import { useStore } from '../../../context/StoreContext';
import { SARINDA_GROUP_DATA } from '../../../data/groupData';
import { 
  ArrowLeft, 
  Lamp, 
  Lightbulb, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin,
  Calendar
} from 'lucide-react';

export const LightsPage: React.FC = () => {
  const { lang, setCurrentView, openGroupInquiry } = useStore();

  const lights = SARINDA_GROUP_DATA.ventures.find(v => v.id === 'sarinda-lights')!;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      
      {/* Top Strip */}
      <div className="bg-slate-900 text-white py-3 px-4 sticky top-0 z-40 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              setCurrentView('group');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-xs sm:text-sm font-black text-amber-300 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'en' ? 'Back to Sarinda Group Hub' : 'সারিন্দা গ্রুপ পোর্টালে ফিরুন'}</span>
          </button>

          <span className="bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded text-[11px] font-black">
            {lang === 'en' ? 'Lighting & Décor' : 'লাইটিং ও ইন্টেরিয়র'}
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative min-h-[460px] flex items-center overflow-hidden">
        <img
          src={lights.heroImage}
          alt="Sarinda Lights"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-black/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-wider mb-4">
              <Lamp className="w-4 h-4" />
              <span>{lang === 'en' ? 'Architectural Illumination' : 'আর্কিটেকচারাল লাইটিং'}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              {lang === 'en' ? 'Sarinda Lights & Interior Décor' : 'সারিন্দা লাইটস অ্যান্ড ইন্টেরিয়র'}
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-amber-300 font-bold mt-2">
              {lang === 'en' ? lights.tagline : lights.banglaTagline}
            </p>

            <p className="text-sm sm:text-base text-gray-300 mt-4 leading-relaxed max-w-2xl">
              {lang === 'en' ? lights.description : lights.banglaDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                onClick={() => openGroupInquiry('sarinda-lights')}
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 px-6 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-float hover:scale-102 transition cursor-pointer"
              >
                <Lightbulb className="w-4 h-4" />
                <span>{lang === 'en' ? 'Request Consultation' : 'কনসালটেন্সি ও কোটেশন'}</span>
              </button>

              <a
                href="tel:+8801712121434"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 transition"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>+880 1712-121434</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lighting Catalog */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <h2 className="font-serif text-2xl font-black text-white">
                {lang === 'en' ? 'Curated Lighting Portfolio' : 'ঝাড়বাতি ও লাইটিং কালেকশন'}
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                {lang === 'en' ? 'Powers the night beauty of Sarinda Sobari Resort' : 'সবারি রিসোর্টের রাতের আলোকসজ্জায় ব্যবহৃত'}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
              <MapPin className="w-4 h-4" />
              <span>C.K. Ghosh Road Commercial Area, Mymensingh</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {lights.pricingOrSpec?.map((item, idx) => (
              <div key={idx} className="bg-white/5 rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-black text-base text-white">{lang === 'en' ? item.label : item.banglaLabel}</h3>
                  <p className="font-serif text-xl sm:text-2xl font-black text-amber-400 my-2">{item.price}</p>
                  <p className="text-xs text-gray-300">{lang === 'en' ? item.details : item.banglaDetails}</p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => openGroupInquiry('sarinda-lights')}
                    className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    {lang === 'en' ? 'Get Price Quote' : 'কোটেশন জানুন'}
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
