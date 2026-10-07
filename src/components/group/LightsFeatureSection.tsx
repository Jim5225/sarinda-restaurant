import React from 'react';
import { useStore } from '../../context/StoreContext';
import { SARINDA_GROUP_DATA } from '../../data/groupData';
import { 
  Lamp, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Wrench, 
  Lightbulb, 
  ArrowRight,
  Sun
} from 'lucide-react';

export const LightsFeatureSection: React.FC = () => {
  const { lang, openGroupInquiry } = useStore();

  const lights = SARINDA_GROUP_DATA.ventures.find(v => v.id === 'sarinda-lights')!;

  return (
    <section id="sarinda-lights-section" className="py-20 bg-gradient-to-b from-slate-950 via-[#0a1118] to-slate-950 text-white overflow-hidden relative">
      {/* Golden Chandelier Ambient Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider mb-3 border border-amber-500/30">
              <Lamp className="w-4 h-4 text-amber-400" />
              <span>{lang === 'en' ? 'Chandeliers • BLDC Fans • Smart Lighting' : 'ঝাড়বাতি • বিএলডিসি ফ্যান • স্মার্ট লাইটিং'}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {lang === 'en' ? 'Sarinda Lights, Fans & Electricals' : 'সারিন্দা লাইটস, ফ্যান ও ইলেকট্রিক্যালস'}
            </h2>

            <p className="text-base sm:text-lg text-gray-300 mt-3 font-medium">
              {lang === 'en'
                ? 'Powering the ethereal night glow of Sobari Resort — imported K9 crystal chandeliers, silent BLDC ceiling fans, and modern architectural lighting.'
                : 'সবারি রিসোর্টের রাতের মুগ্ধকর আলোকসজ্জার রূপকার — রাজকীয় ক্রিস্টাল ঝাড়বাতি, শব্দহীন বিএলডিসি ফ্যান ও আর্কিটেকচারাল লাইটিং।'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openGroupInquiry('sarinda-lights')}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 px-6 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg hover:scale-102 transition cursor-pointer"
            >
              <Lightbulb className="w-4 h-4" />
              <span>{lang === 'en' ? 'Request Consultation' : 'ক্যাটালগ ও কোটেশন'}</span>
            </button>

            <a
              href="tel:+8801852363235"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 transition"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>+880 1712-121434</span>
            </a>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Main Visual Image Collage */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-elevated border-2 border-amber-500/30">
              <img
                src={lights.heroImage}
                alt="Sarinda Lights Luxury Showroom"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="px-3 py-1 rounded-full bg-amber-500/90 text-stone-950 text-xs font-black backdrop-blur-md">
                  {lang === 'en' ? '★ Powers Sobari Resort Illumination' : '★ সবারি রিসোর্টের আলোকসজ্জা'}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-black mt-2">
                  {lang === 'en' ? 'Royal K9 Leaded Crystal Chandeliers' : 'রাজকীয় কে৯ ক্রিস্টাল ঝাড়বাতি ও পেনড্যান্ট'}
                </h3>
              </div>
            </div>

            {/* Thumbnail Gallery Row */}
            <div className="grid grid-cols-3 gap-3">
              {lights.galleryImages.slice(0, 3).map((img, i) => (
                <div key={i} className="h-28 rounded-2xl overflow-hidden shadow-sm border border-white/15">
                  <img src={img} alt="Lighting Specimen" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                </div>
              ))}
            </div>
          </div>

          {/* Showroom & Engineering Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 shadow-soft">
              <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4" />
                <span>{lang === 'en' ? 'C.K. Ghosh Road Showroom, Mymensingh' : 'সি.কে. ঘোষ রোড শোরুম, ময়মনসিংহ'}</span>
              </div>

              <h4 className="font-serif text-2xl font-black text-white">
                {lang === 'en' ? 'Transforming Spaces into Works of Art' : 'বাসাবাড়ি ও ব্যবসা প্রতিষ্ঠানকে আলোকিত করার বিশ্বস্ত সঙ্গী'}
              </h4>

              <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
                {lang === 'en'
                  ? 'We deliver customized lighting blueprints, on-site installation, and genuine warranty on all imported luxury lighting fixtures, drivers, and LED profiles.'
                  : 'বাড়ি, ডুপ্লেক্স, কমিউনিটি সেন্টার কিংবা বাণিজ্যিক ভবনের জন্য সাইট ভিজিট, লাইটিং প্ল্যানিং, টেকনিক্যাল ফিটিংস এবং অফিশিয়াল ওয়ারেন্টি সমৃদ্ধ সেবা।'}
              </p>

              {/* Highlights Checklist */}
              <div className="mt-4 space-y-2 pt-3 border-t border-white/15 text-xs text-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{lang === 'en' ? 'Authentic K9 Precision Crystal Chandeliers' : '১০০% পিওর কে৯ ক্রিস্টাল রাজকীয় ঝাড়বাতি'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{lang === 'en' ? 'Super-Silent BLDC Energy-Saving Smart Fans' : '৬৫% বিদ্যুৎসাশ্রয়ী সাউন্ডলেস বিএলডিসি স্মার্ট ফ্যান'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{lang === 'en' ? 'Resort IP67 Waterproof Garden & Pool Uplights' : 'সবারি রিসোর্ট আইপি৬৭ ওয়াটারপ্রুফ আউটডোর লাইট'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{lang === 'en' ? 'Full Architectural Layout & Engineering Fitting' : 'সাইট ভিজিট, লাইটিং প্ল্যান ও ফুল ইনস্টলেশন'}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-gray-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'en' ? '2-5 Years Fixture Warranty' : '২-৫ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি'}</span>
                </span>
                <span className="text-amber-400 font-bold">10 AM - 9 PM</span>
              </div>
            </div>

            {/* Quick Quotation Promo Box */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-600/30 to-yellow-600/30 border border-amber-500/40 backdrop-blur-md flex items-center justify-between gap-4">
              <div>
                <p className="font-serif font-black text-sm text-white">
                  {lang === 'en' ? 'Building a Home or Renovation?' : 'নতুন বাড়ি বা ইন্টেরিয়র করছেন?'}
                </p>
                <p className="text-[11px] text-gray-300 mt-0.5">
                  {lang === 'en' ? 'Get free lighting design advice and tailored quote' : 'বিনামূল্যে লাইটিং ডিজাইন ও বাজেট কোটেশন গ্রহণ করুন'}
                </p>
              </div>

              <button
                onClick={() => openGroupInquiry('sarinda-lights')}
                className="bg-amber-400 hover:bg-amber-300 text-stone-950 px-3.5 py-2 rounded-xl font-black text-xs shrink-0 transition cursor-pointer"
              >
                {lang === 'en' ? 'Free Quote' : 'কোটেশন নিন'}
              </button>
            </div>
          </div>

        </div>

        {/* Lighting Specimen Pricing and Catalog */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
              {lang === 'en' ? 'Curated Lighting Collections' : 'এক্সক্লুসিভ লাইটিং কালেকশন সমূহ'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              {lang === 'en' ? 'Imported fixtures engineered for energy efficiency and timeless beauty' : 'বিদ্যুৎসাশ্রয়ী ও নান্দনিক আধুনিক লাইটিংয়ের বিশ্বস্ত কালেকশন'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lights.pricingOrSpec?.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 hover:border-amber-400/50 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 px-2 py-0.5 rounded bg-amber-500/20 inline-block mb-3">
                    {lang === 'en' ? 'Premium Fixture' : 'প্রিমিয়াম কালেকশন'}
                  </span>

                  <h4 className="font-serif text-lg font-black text-white">
                    {lang === 'en' ? item.label : item.banglaLabel}
                  </h4>

                  <div className="my-3">
                    <span className="font-serif text-xl sm:text-2xl font-black text-amber-400">
                      {item.price}
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {lang === 'en' ? item.details : item.banglaDetails}
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => openGroupInquiry('sarinda-lights')}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition"
                  >
                    <Lamp className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Request Spec & Price' : 'মূল্য ও ক্যাটালগ জানুন'}</span>
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
