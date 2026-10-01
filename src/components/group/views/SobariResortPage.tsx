import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { SARINDA_GROUP_DATA } from '../../../data/groupData';
import { 
  Building2, 
  ArrowLeft, 
  Palmtree, 
  Waves, 
  Home, 
  Ticket, 
  Calendar, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Star,
  Users,
  Compass,
  Sparkles
} from 'lucide-react';

export const SobariResortPage: React.FC = () => {
  const { lang, setCurrentView, openGroupInquiry } = useStore();
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [guestCount, setGuestCount] = useState(4);

  const resort = SARINDA_GROUP_DATA.ventures.find(v => v.id === 'sobari-resort')!;

  return (
    <div className="min-h-screen bg-slate-50 text-brand-charcoal flex flex-col">
      
      {/* Top Floating Return to Group Hub Strip */}
      <div className="bg-emerald-950 text-white py-3 px-4 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              setCurrentView('group');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-xs sm:text-sm font-black text-emerald-300 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'en' ? 'Back to Sarinda Group Hub' : 'সারিন্দা গ্রুপ পোর্টালে ফিরুন'}</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="hidden sm:inline text-gray-300">{lang === 'en' ? 'A Venture of Sarinda Group' : 'সারিন্দা গ্রুপের অঙ্গপ্রতিষ্ঠান'}</span>
            <span className="bg-emerald-700 text-white px-2 py-0.5 rounded text-[11px] font-black">
              {lang === 'en' ? 'Resort Portal' : 'রিসোর্ট পোর্টাল'}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-emerald-900 text-white min-h-[500px] flex items-center overflow-hidden">
        <img
          src={resort.heroImage}
          alt="Sarinda Sobari Resort"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/80 to-black/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-black uppercase tracking-wider mb-4">
              <Palmtree className="w-4 h-4" />
              <span>{lang === 'en' ? 'The Viral Switzerland of Mymensingh' : 'ময়মনসিংহের সুইজারল্যান্ড'}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              {lang === 'en' ? 'Sarinda Sobari Resort' : 'সারিন্দা সবারি রিসোর্ট'}
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-emerald-300 font-bold mt-2">
              {lang === 'en' ? resort.tagline : resort.banglaTagline}
            </p>

            <p className="text-sm sm:text-base text-gray-200 mt-4 leading-relaxed max-w-2xl">
              {lang === 'en' ? resort.description : resort.banglaDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                onClick={() => openGroupInquiry('sobari-resort')}
                className="bg-emerald-500 hover:bg-emerald-600 text-emerald-950 px-6 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-float hover:scale-102 transition cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'en' ? 'Book Cottage / Plan Event' : 'কটেজ বা ইভেন্ট বুক করুন'}</span>
              </button>

              <a
                href="tel:+8801979121434"
                className="bg-white/15 hover:bg-white/25 text-white border border-white/30 px-5 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 transition"
              >
                <Phone className="w-4 h-4 text-emerald-300" />
                <span>+880 1979-121434</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Entry Food Coupon Explainer */}
        <div className="bg-white rounded-3xl p-8 border-2 border-emerald-200 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 text-emerald-700 font-black text-xs uppercase tracking-wider mb-2">
                <Ticket className="w-5 h-5 text-emerald-600" />
                <span>{lang === 'en' ? 'Entry Pass & Dining System' : 'প্রবেশ কুপন ও ডাইনিং সিস্টেম'}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-black text-brand-primary">
                {lang === 'en' ? '100% Redeemable Food Coupon System' : '৳ ৫০০ প্রবেশ ফি = ১০০% খাবারের কুপন!'}
              </h2>

              <p className="text-sm text-brand-muted mt-3 leading-relaxed">
                {lang === 'en'
                  ? 'Sarinda Sobari Resort welcomes day visitors with an entry coupon of ৳500 per person. You can redeem the full amount at our lakeside restaurant for fresh Biryani, BBQ, steaks, or desserts!'
                  : 'সবারি রিসোর্টে আগত অতিথিদের জন্য রয়েছে ৫০০ টাকার ফুড কুপন সিস্টেম। এই কুপন ব্যবহার করে রিসোর্টের লেকভিউ রেস্তোরাঁ থেকে কাচ্চি বিরিয়ানি, বারবিকিউ, মিষ্টি কিংবা পছন্দসই খাবার সমমূল্যে গ্রহণ করতে পারবেন!'}
              </p>

              <div className="mt-4 flex items-center gap-3 text-xs font-bold text-emerald-900">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'en' ? 'Day Visit: 9:00 AM - 9:00 PM' : 'ডে ভিজিট: সকাল ৯:০০ - রাত ৯:০০'}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Akua Morolpara, Mymensingh</span>
                </span>
              </div>
            </div>

            {/* Interactive Coupon Calculator */}
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200">
              <h3 className="font-serif text-lg font-black text-emerald-900 mb-3">
                {lang === 'en' ? 'Day Tour Food Value Calculator' : 'ফুড ক্রেডিট ক্যালকুলেটর'}
              </h3>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-emerald-800">
                  {lang === 'en' ? 'Number of Guests:' : 'অতিথি সংখ্যা:'}
                </span>
                <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-emerald-200">
                  <button
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="w-8 h-8 rounded-lg bg-emerald-100 font-black text-emerald-900 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-black text-lg px-2">{guestCount}</span>
                  <button
                    onClick={() => setGuestCount(guestCount + 1)}
                    className="w-8 h-8 rounded-lg bg-emerald-100 font-black text-emerald-900 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">{lang === 'en' ? 'Total Entry Pass' : 'মোট কুপন মূল্য'}</p>
                  <p className="font-serif text-2xl font-black text-emerald-900">৳ {(guestCount * 500).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-black">
                    {lang === 'en' ? '100% Food Credit' : '১০০% খাবারের ক্রেডিট'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accommodation Packages */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-3xl font-black text-brand-primary">
              {lang === 'en' ? 'Cottages & Suite Accommodations' : 'কটেজ ও আবাসন প্যাকেজ'}
            </h2>
            <p className="text-sm text-brand-muted mt-2">
              {lang === 'en' ? 'Overnight tranquility with pool access, complimentary breakfast, and scenic balcony.' : 'গাছগাছালির ছায়ায় নিরিবিলি আবাসন ও প্রকৃতির বিশুদ্ধ বাতাস।'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resort.pricingOrSpec?.map((pkg, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-emerald-100 hover:border-emerald-300 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 px-2 py-0.5 rounded bg-emerald-50 inline-block mb-3">
                    {lang === 'en' ? `Option 0${idx + 1}` : `প্যাকেজ 0${idx + 1}`}
                  </span>
                  
                  <h3 className="font-serif text-lg font-black text-brand-primary">
                    {lang === 'en' ? pkg.label : pkg.banglaLabel}
                  </h3>

                  <div className="my-3">
                    <span className="font-serif text-2xl font-black text-emerald-700">
                      {pkg.price}
                    </span>
                  </div>

                  <p className="text-xs text-brand-muted leading-relaxed">
                    {lang === 'en' ? pkg.details : pkg.banglaDetails}
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => openGroupInquiry('sobari-resort')}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition"
                  >
                    <span>{lang === 'en' ? 'Book This Option' : 'বুক করুন'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-brand-primary mb-6 text-center">
            {lang === 'en' ? 'Visual Splendor of Sobari Resort' : 'সবারি রিসোর্টের নয়নাভিরাম আলোকচিত্র'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resort.galleryImages.map((img, i) => (
              <div key={i} className="h-64 rounded-3xl overflow-hidden shadow-soft border-2 border-white">
                <img src={img} alt="Resort Highlight" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
