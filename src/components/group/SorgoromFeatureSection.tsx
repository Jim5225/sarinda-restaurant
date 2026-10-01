import React from 'react';
import { useStore } from '../../context/StoreContext';
import { SARINDA_GROUP_DATA } from '../../data/groupData';
import { 
  Flame, 
  MapPin, 
  Phone, 
  Coffee, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  ArrowRight,
  Clock
} from 'lucide-react';

export const SorgoromFeatureSection: React.FC = () => {
  const { lang, openGroupInquiry } = useStore();

  const sorgorom = SARINDA_GROUP_DATA.ventures.find(v => v.id === 'sorgorom-restaurant')!;

  return (
    <section id="sorgorom-section" className="py-20 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 text-white overflow-hidden relative">
      {/* Warm Ambient Grill Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-black uppercase tracking-wider mb-3 border border-orange-500/30">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>{lang === 'en' ? 'Charpara Hotspot Since 2018' : 'চরপাড়ার সবচেয়ে জনপ্রিয় আড্ডা'}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {lang === 'en' ? 'Sorgorom Restaurant & Cafe' : 'সরগরম রেস্টুরেন্ট অ্যান্ড ক্যাফে'}
            </h2>

            <p className="text-base sm:text-lg text-gray-300 mt-3 font-medium">
              {lang === 'en'
                ? 'Smoking hot sizzling steaks, loaded crunch burgers, vibrant coffee conversations, and authentic Bengali cuisine under Sarinda Group.'
                : 'ধোঁয়া ওঠা কাস্ট-আইরন সিজলার্স, মেগা ক্রাঞ্চ বার্গার, প্রিমিয়াম কফি এবং বন্ধুদের জমজমাট আড্ডার আধুনিক ক্যাফে রেস্তোরাঁ।'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openGroupInquiry('sorgorom-restaurant')}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white px-6 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg hover:scale-102 transition cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{lang === 'en' ? 'Reserve a Table / Party' : 'টেবিল বা পার্টি বুক করুন'}</span>
            </button>

            <a
              href="tel:+8801834535135"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 transition"
            >
              <Phone className="w-4 h-4 text-orange-400" />
              <span>+880 1834-535135</span>
            </a>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Main Visual Carousel / Collage */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-elevated border-2 border-white/20">
              <img
                src={sorgorom.heroImage}
                alt="Sorgorom Food and Atmosphere"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="px-3 py-1 rounded-full bg-orange-600/90 text-white text-xs font-black backdrop-blur-md">
                  {lang === 'en' ? '★ Smoking Hot Cast-Iron Sizzlers' : '★ ধোঁয়া ওঠা সিজলিং প্ল্যাটিনাম'}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-black mt-2">
                  {lang === 'en' ? 'Sizzling Beef & Chicken Steaks' : 'সিজলিং বিফ ও চিকেন স্টেক'}
                </h3>
              </div>
            </div>

            {/* Thumbnail Gallery Row */}
            <div className="grid grid-cols-3 gap-3">
              {sorgorom.galleryImages.slice(0, 3).map((img, i) => (
                <div key={i} className="h-28 rounded-2xl overflow-hidden shadow-sm border border-white/15">
                  <img src={img} alt="Sorgorom Dish" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                </div>
              ))}
            </div>
          </div>

          {/* Sorgorom Details Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 shadow-soft">
              <div className="flex items-center gap-2 text-orange-400 font-black text-xs uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4" />
                <span>{lang === 'en' ? 'Charpara Mor, Mymensingh' : 'চরপাড়া মোড়, ময়মনসিংহ'}</span>
              </div>

              <h4 className="font-serif text-2xl font-black text-white">
                {lang === 'en' ? 'The Ultimate Hangout for Food Lovers' : 'ভোজনরসিক ও আড্ডাপ্রিয়দের সেরা গন্তব্য'}
              </h4>

              <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
                {lang === 'en'
                  ? 'Located right in the buzzing Charpara medical hub, Sorgorom offers a cozy, energetic atmosphere with indoor air-conditioned seating, quick service, and mouthwatering fusion meals.'
                  : 'চরপাড়া মোড়ের প্রাণকেন্দ্রে অবস্থিত সরগরম রেস্তোরাঁ পরিবারের সদস্য ও তরুণ বন্ধুদের জন্য একটি আরামদায়ক, আধুনিক ও প্রাণবন্ত খাবারের পরিবেশ নিশ্চিত করে।'}
              </p>

              {/* Highlights Checklist */}
              <div className="mt-4 space-y-2 pt-3 border-t border-white/15 text-xs text-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>{lang === 'en' ? 'Hot Cast-Iron Sizzlers & Steaks' : 'কাস্ট-আইরন তাওয়ায় পরিবেশিত সিজলিং স্টেক'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>{lang === 'en' ? 'Loaded Burgers & Crispy Wings' : 'চিজি মেগা বার্গার ও ক্রিস্পি বাফেলো উইংস'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>{lang === 'en' ? 'Authentic Bengali Lunch & Curries' : 'দুপুরের খাঁটি ভুনা বিফ, খাসি ও ভাত-পোলাও'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>{lang === 'en' ? 'Chilled Mocktails, Frappes & Espresso' : 'রঙিন রিফ্রেশিং মকটেল ও কোল্ড কফি বার'}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-gray-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  <span>7:30 AM - 10:30 PM (Daily)</span>
                </span>
                <a href="tel:+8801834535135" className="text-orange-400 font-bold hover:underline">
                  +880 1834-535135
                </a>
              </div>
            </div>

            {/* Birthday / Friends Treat Box */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-orange-600/30 to-red-600/30 border border-orange-500/40 backdrop-blur-md flex items-center justify-between gap-4">
              <div>
                <p className="font-serif font-black text-sm text-white">
                  {lang === 'en' ? 'Planning a Birthday or Friend Treat?' : 'ফ্রেন্ডস পার্টি বা জন্মদিন আয়োজন?'}
                </p>
                <p className="text-[11px] text-gray-300 mt-0.5">
                  {lang === 'en' ? 'Pre-book a booth with combo meals & cake setup' : 'আগে থেকে বুথ বুক করে পান আকর্ষণীয় কম্বো ডিসকাউন্ট'}
                </p>
              </div>

              <button
                onClick={() => openGroupInquiry('sorgorom-restaurant')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-3.5 py-2 rounded-xl font-black text-xs shrink-0 transition cursor-pointer"
              >
                {lang === 'en' ? 'Book Booth' : 'বুক করুন'}
              </button>
            </div>
          </div>

        </div>

        {/* Sorgorom Menu Highlights */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
              {lang === 'en' ? 'Popular Sizzlers & Cravings' : 'জনপ্রিয় সিজলার্স ও খাবার তালিকা'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              {lang === 'en' ? 'Freshly prepared to order with sizzling heat' : 'অর্ডার অনুযায়ী সরাসরি গরম তাওয়া থেকে পরিবেশিত'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sorgorom.pricingOrSpec?.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 hover:border-orange-500/50 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-400 px-2 py-0.5 rounded bg-orange-500/20 inline-block mb-3">
                    {lang === 'en' ? 'Hot Favorite' : 'জনপ্রিয় আইটেম'}
                  </span>

                  <h4 className="font-serif text-lg font-black text-white">
                    {lang === 'en' ? item.label : item.banglaLabel}
                  </h4>

                  <div className="my-3">
                    <span className="font-serif text-2xl font-black text-orange-400">
                      {item.price}
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {lang === 'en' ? item.details : item.banglaDetails}
                  </p>
                </div>

                <div className="pt-6">
                  <a
                    href="tel:+8801834535135"
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Order by Phone' : 'কল করে অর্ডার দিন'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
