import React from 'react';
import { useStore } from '../../../context/StoreContext';
import { SARINDA_GROUP_DATA } from '../../../data/groupData';
import { 
  ArrowLeft, 
  Flame, 
  MapPin, 
  Phone, 
  Calendar, 
  Clock, 
  CheckCircle2,
  UtensilsCrossed
} from 'lucide-react';

export const SorgoromPage: React.FC = () => {
  const { lang, setCurrentView, openGroupInquiry } = useStore();

  const sorgorom = SARINDA_GROUP_DATA.ventures.find(v => v.id === 'sorgorom-restaurant')!;

  return (
    <div className="min-h-screen bg-stone-950 text-white flex flex-col">
      
      {/* Top Strip */}
      <div className="bg-stone-900 text-white py-3 px-4 sticky top-0 z-40 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              setCurrentView('group');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-xs sm:text-sm font-black text-orange-400 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'en' ? 'Back to Sarinda Group Hub' : 'সারিন্দা গ্রুপ পোর্টালে ফিরুন'}</span>
          </button>

          <span className="bg-orange-600 text-white px-2.5 py-0.5 rounded text-[11px] font-black">
            {lang === 'en' ? 'Sorgorom Restaurant & Cafe' : 'সরগরম রেস্টুরেন্ট অ্যান্ড ক্যাফে'}
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative min-h-[460px] flex items-center overflow-hidden">
        <img
          src={sorgorom.heroImage}
          alt="Sorgorom Restaurant"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/85 to-black/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-400/30 text-xs font-black uppercase tracking-wider mb-4">
              <Flame className="w-4 h-4" />
              <span>{lang === 'en' ? 'Charpara Mor Hotspot' : 'চরপাড়া মোড়ের প্রাণবন্ত আড্ডা'}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              {lang === 'en' ? 'Sorgorom Restaurant & Cafe' : 'সরগরম রেস্টুরেন্ট অ্যান্ড ক্যাফে'}
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-orange-400 font-bold mt-2">
              {lang === 'en' ? sorgorom.tagline : sorgorom.banglaTagline}
            </p>

            <p className="text-sm sm:text-base text-gray-300 mt-4 leading-relaxed max-w-2xl">
              {lang === 'en' ? sorgorom.description : sorgorom.banglaDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                onClick={() => openGroupInquiry('sorgorom-restaurant')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-float hover:scale-102 transition cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'en' ? 'Reserve a Table / Party' : 'টেবিল বা পার্টি বুক করুন'}</span>
              </button>

              <a
                href="tel:+8801834535135"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 transition"
              >
                <Phone className="w-4 h-4 text-orange-400" />
                <span>+880 1834-535135</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Specialties */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <h2 className="font-serif text-2xl font-black text-white">
                {lang === 'en' ? 'Sizzlers & Popular Platters' : 'জনপ্রিয় সিজলিং প্ল্যাটিনাম ও বার্গার'}
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                {lang === 'en' ? 'Served smoking hot on cast iron' : 'ধোঁয়া ওঠা কাস্ট আয়রনে পরিবেশিত'}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-orange-400 font-bold">
              <MapPin className="w-4 h-4" />
              <span>Charpara Road, Mymensingh</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sorgorom.pricingOrSpec?.map((item, idx) => (
              <div key={idx} className="bg-white/5 rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-black text-base text-white">{lang === 'en' ? item.label : item.banglaLabel}</h3>
                  <p className="font-serif text-2xl font-black text-orange-400 my-2">{item.price}</p>
                  <p className="text-xs text-gray-300">{lang === 'en' ? item.details : item.banglaDetails}</p>
                </div>
                <div className="pt-4">
                  <a
                    href="tel:+8801834535135"
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Call to Order' : 'কল করুন'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
