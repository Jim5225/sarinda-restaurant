import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { SARINDA_GROUP_DATA } from '../../data/groupData';
import { 
  Palmtree, 
  Waves, 
  Home, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Ticket, 
  Coffee, 
  Users,
  Compass,
  ArrowRight
} from 'lucide-react';

export const ResortFeatureSection: React.FC = () => {
  const { lang, openGroupInquiry } = useStore();
  const [guestCount, setGuestCount] = useState<number>(4);

  const resort = SARINDA_GROUP_DATA.ventures.find(v => v.id === 'sobari-resort')!;

  const calculatedFoodCouponTotal = guestCount * 500;

  return (
    <section id="sobari-resort-section" className="py-20 bg-gradient-to-b from-white via-emerald-50/40 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Tag */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-3">
              <Palmtree className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'en' ? 'The Switzerland of Mymensingh' : 'ময়মনসিংহের সুইজারল্যান্ড'}</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-brand-primary leading-tight">
              {lang === 'en' ? 'Sarinda Sobari Resort' : 'সারিন্দা সবারি রিসোর্ট'}
            </h2>

            <p className="text-base sm:text-lg text-brand-muted mt-3 font-medium">
              {lang === 'en'
                ? 'Immerse in lush green landscape, wooden eco-cottages, sparkling swimming pools, and open-air lakeside dining in Akua Morolpara, Mymensingh.'
                : 'আকুয়া মোড়লপাড়ায় অবস্থিত ময়মনসিংহের সর্বাধিক জনপ্রিয় ইকো রিসোর্ট — নান্দনিক কাঠের কটেজ, স্বচ্ছ সুইমিংপুল ও উন্মুক্ত বারবিকিউ গার্ডেন।'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openGroupInquiry('sobari-resort')}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-md hover:scale-102 transition cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-emerald-200" />
              <span>{lang === 'en' ? 'Book Cottage / Event' : 'কটেজ বা ইভেন্ট বুক করুন'}</span>
            </button>

            <a
              href="tel:+8801979121434"
              className="bg-white border border-emerald-200 text-emerald-900 px-5 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-emerald-50 transition"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>+880 1979-121434</span>
            </a>
          </div>
        </div>

        {/* Feature Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Main Visual Carousel / Image Collage */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-elevated border-4 border-white">
              <img
                src={resort.heroImage}
                alt="Sarinda Sobari Resort Pool"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="px-3 py-1 rounded-full bg-emerald-600/90 text-white text-xs font-black backdrop-blur-md">
                  {lang === 'en' ? '★ Viral Social Media Destination' : '★ ভাইরাল পর্যটন কেন্দ্র'}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-black mt-2">
                  {lang === 'en' ? 'Olympic Azure Swimming Pool & Gardens' : 'ঝলমলে সুইমিংপুল ও প্রাকৃতিক বাগান'}
                </h3>
              </div>
            </div>

            {/* Thumbnail Gallery Row */}
            <div className="grid grid-cols-3 gap-3">
              {resort.galleryImages.slice(0, 3).map((img, i) => (
                <div key={i} className="h-28 rounded-2xl overflow-hidden shadow-sm border-2 border-white">
                  <img src={img} alt="Resort View" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                </div>
              ))}
            </div>
          </div>

          {/* Resort Highlights & Entry Food Coupon Policy Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 500 BDT Food Coupon Explainer Card */}
            <div className="p-6 rounded-3xl bg-white border-2 border-emerald-200 shadow-soft relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2.5 text-emerald-700 font-black text-xs uppercase tracking-wider mb-2">
                <Ticket className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'en' ? 'Visitor Entry Policy' : 'ভিজিটর প্রবেশ নীতি ও কুপন'}</span>
              </div>

              <h4 className="font-serif text-2xl font-black text-brand-primary">
                {lang === 'en' ? '৳ 500 Entry = 100% Food Coupon' : '৳ ৫০০ প্রবেশ ফি = ১০০% খাবারের কুপন!'}
              </h4>

              <p className="text-xs sm:text-sm text-brand-muted mt-2 leading-relaxed">
                {lang === 'en'
                  ? 'To preserve the tranquil ambiance, Sobari Resort provides a ৳500 entry coupon per guest which is entirely redeemable on food & drinks at the resort restaurant!'
                  : 'রিসোর্টের মনোরম ও পরিচ্ছন্ন পরিবেশ বজায় রাখতে ৫০০ টাকার প্রবেশ কুপন ব্যবস্থা রয়েছে — যা দিয়ে রিসোর্টের রেস্তোরাঁ থেকে সমমূল্যের সুস্বাদু খাবার উপভোগ করা যায়!'}
              </p>

              {/* Quick Guest Coupon Calculator */}
              <div className="mt-4 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-2">
                  <span>{lang === 'en' ? 'Guests Count:' : 'অতিথি সংখ্যা:'}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-emerald-300 font-black text-emerald-800 text-sm flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-black text-base px-2">{guestCount}</span>
                    <button
                      onClick={() => setGuestCount(guestCount + 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-emerald-300 font-black text-emerald-800 text-sm flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-emerald-200/60 text-xs">
                  <span className="text-emerald-700 font-semibold">
                    {lang === 'en' ? 'Redeemable Food Value:' : 'খাবার খাওয়ার ক্রেডিট:'}
                  </span>
                  <span className="font-serif text-base font-black text-emerald-800">
                    ৳ {calculatedFoodCouponTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Amenities Checklist */}
            <div className="p-6 rounded-3xl bg-white border border-brand-border shadow-soft space-y-3">
              <h4 className="text-sm font-black text-brand-primary uppercase tracking-wider">
                {lang === 'en' ? 'Resort Facilities & Amenities' : 'রিসোর্টের সুযোগ-সুবিধা'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-brand-charcoal font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{lang === 'en' ? 'Swimming Pool & Kids Zone' : 'সুইমিংপুল ও কিডস জোন'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{lang === 'en' ? 'Wooden Eco Duplex Cottages' : 'নান্দনিক কাঠের ডুপ্লেক্স কটেজ'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{lang === 'en' ? 'Lakeside BBQ & Dining' : 'লেকভিউ বারবিকিউ ও রেস্তোরাঁ'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{lang === 'en' ? 'Wedding & Corporate Lawn' : 'ওয়েডিং ও কনফারেন্স লন'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{lang === 'en' ? 'Photography & Shooting Spot' : 'ফটোগ্রাফি ও শুটিং স্পট'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{lang === 'en' ? 'Secure Parking & 24/7 Security' : 'নিরাপদ পার্কিং ও সার্বক্ষণিক গার্ড'}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Accommodation Packages Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-brand-primary">
              {lang === 'en' ? 'Cottages & Accommodation Rates' : 'কটেজ ও আবাসন প্যাকেজ সমূহ'}
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted mt-1">
              {lang === 'en' ? 'Experience serene overnight stays surrounded by whispering greenery.' : 'প্রকৃতির নির্মল ছোঁয়ায় পরিবার নিয়ে রাত্রিযাপনের আনন্দ।'}
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
                    {lang === 'en' ? `Package 0${idx + 1}` : `প্যাকেজ 0${idx + 1}`}
                  </span>
                  
                  <h4 className="font-serif text-lg font-black text-brand-primary">
                    {lang === 'en' ? pkg.label : pkg.banglaLabel}
                  </h4>

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
                    <span>{lang === 'en' ? 'Book This Cottage' : 'বুকিং করুন'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
