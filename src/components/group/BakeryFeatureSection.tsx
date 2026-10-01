import React from 'react';
import { useStore } from '../../context/StoreContext';
import { SARINDA_GROUP_DATA } from '../../data/groupData';
import { 
  Cake, 
  MapPin, 
  Phone, 
  Star, 
  Clock, 
  Sparkles, 
  Gift, 
  CheckCircle2, 
  ArrowRight,
  ShoppingBag
} from 'lucide-react';

export const BakeryFeatureSection: React.FC = () => {
  const { lang, openGroupInquiry } = useStore();

  const bakery = SARINDA_GROUP_DATA.ventures.find(v => v.id === 'sarinda-bakery')!;

  return (
    <section id="sarinda-bakery-section" className="py-20 bg-gradient-to-b from-white via-pink-50/30 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 text-pink-800 text-xs font-black uppercase tracking-wider mb-3">
              <Cake className="w-4 h-4 text-pink-600" />
              <span>{lang === 'en' ? 'Artisanal Bakery & Confectionery' : 'আর্টিস্যানাল বেকারি ও মিষ্টি'}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-brand-primary leading-tight">
              {lang === 'en' ? 'Sarinda Bakery & Sweets' : 'সারিন্দা বেকারি অ্যান্ড সুইটস'}
            </h2>

            <p className="text-base sm:text-lg text-brand-muted mt-3 font-medium">
              {lang === 'en'
                ? 'Handcrafted designer celebration cakes, warm oven-baked pastries, crunchy butter cookies, and authentic Bengali sweets with 3 strategic outlets in Mymensingh.'
                : 'প্রতিটি জন্মদিন ও আনন্দের মুহূর্তকে রাঙাতে কাস্টমাইজড ডিজাইনার কেক, ফ্রেশ ওভেন পেস্ট্রি, বাটার কুকিজ ও খাঁটি ঘিয়ে তৈরি ঐতিহ্যবাহী মিষ্টি।'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openGroupInquiry('sarinda-bakery')}
              className="bg-pink-700 hover:bg-pink-800 text-white px-6 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-md hover:scale-102 transition cursor-pointer"
            >
              <Gift className="w-4 h-4 text-pink-200" />
              <span>{lang === 'en' ? 'Custom Cake Pre-Order' : 'কাস্টম কেক প্রি-অর্ডার করুন'}</span>
            </button>

            <a
              href="tel:+8801712121434"
              className="bg-white border border-pink-200 text-pink-900 px-5 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-pink-50 transition"
            >
              <Phone className="w-4 h-4 text-pink-600" />
              <span>+880 1712-121434</span>
            </a>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Main Visual Carousel / Collage */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-elevated border-4 border-white">
              <img
                src={bakery.heroImage}
                alt="Sarinda Bakery Products"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="px-3 py-1 rounded-full bg-pink-600/90 text-white text-xs font-black backdrop-blur-md">
                  {lang === 'en' ? '★ Live Baking Everyday' : '★ প্রতিদিন তাজা বেকিং'}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-black mt-2">
                  {lang === 'en' ? 'Custom 3D Fondant & Truffle Cakes' : 'কাস্টম ডিজাইনার ফন্ড্যান্ট ও ট্রাফেল কেক'}
                </h3>
              </div>
            </div>

            {/* Thumbnail Gallery Row */}
            <div className="grid grid-cols-3 gap-3">
              {bakery.galleryImages.slice(0, 3).map((img, i) => (
                <div key={i} className="h-28 rounded-2xl overflow-hidden shadow-sm border-2 border-white">
                  <img src={img} alt="Bakery Items" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                </div>
              ))}
            </div>
          </div>

          {/* Bakery 3 Branches Information Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-white border-2 border-pink-200 shadow-soft">
              <div className="flex items-center gap-2 text-pink-700 font-black text-xs uppercase tracking-wider mb-3">
                <MapPin className="w-4 h-4 text-pink-600" />
                <span>{lang === 'en' ? '3 Convenient Branches in Mymensingh' : 'ময়মনসিংহে ৩টি প্রধান শাখা'}</span>
              </div>

              <h4 className="font-serif text-2xl font-black text-brand-primary mb-4">
                {lang === 'en' ? 'Always Near You in Town' : 'শহরের যেকোনো প্রান্ত থেকে সহজে সংগ্রহ করুন'}
              </h4>

              <div className="space-y-3">
                {bakery.branches?.map((branch, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-pink-50/60 border border-pink-100 hover:bg-pink-50 transition">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-black text-sm text-brand-primary">
                        {lang === 'en' ? branch.name : branch.banglaName}
                      </span>
                      <a href={`tel:${branch.phone}`} className="text-xs font-bold text-pink-700 flex items-center gap-1 hover:underline">
                        <Phone className="w-3 h-3" />
                        <span>Call</span>
                      </a>
                    </div>
                    <p className="text-xs text-brand-muted mt-1">
                      {lang === 'en' ? branch.address : branch.banglaAddress}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-pink-200/60 flex items-center justify-between text-xs font-bold text-pink-900">
                <span>{lang === 'en' ? 'Opening Hours:' : 'কার্যক্রম সময়:'}</span>
                <span>8:00 AM - 11:00 PM (Daily)</span>
              </div>
            </div>

            {/* Quick Cake Customization Note */}
            <div className="p-5 rounded-3xl bg-pink-600 text-white shadow-soft flex items-center justify-between gap-4">
              <div>
                <p className="font-serif font-black text-base">
                  {lang === 'en' ? 'Need a Custom Birthday Cake?' : 'কাস্টম বার্থডে কেক প্রয়োজন?'}
                </p>
                <p className="text-xs text-pink-100 mt-0.5">
                  {lang === 'en' ? 'Send us your reference photo or theme idea' : 'আপনার পছন্দের ছবি বা থিম পাঠান, আমরা তৈরি করব'}
                </p>
              </div>

              <button
                onClick={() => openGroupInquiry('sarinda-bakery')}
                className="bg-white text-pink-700 px-4 py-2.5 rounded-xl font-black text-xs shrink-0 hover:bg-pink-50 transition cursor-pointer"
              >
                {lang === 'en' ? 'Order Now' : 'অর্ডার দিন'}
              </button>
            </div>
          </div>

        </div>

        {/* Bakery Signature Creations */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-brand-primary">
              {lang === 'en' ? 'Signature Bakery & Confectionery Items' : 'বেকারির সেরা আইটেম ও মূল্যতালিকা'}
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted mt-1">
              {lang === 'en' ? 'Baked fresh using pure butter, imported chocolates and authentic recipes' : 'খাঁটি মাখন ও উন্নত উপাদানে প্রতিদিন তাজা তৈরি'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bakery.pricingOrSpec?.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-pink-100 hover:border-pink-300 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-pink-600 px-2 py-0.5 rounded bg-pink-50 inline-block mb-3">
                    {lang === 'en' ? 'Freshly Baked' : 'তাজা ওভেনে বেকড'}
                  </span>

                  <h4 className="font-serif text-lg font-black text-brand-primary">
                    {lang === 'en' ? item.label : item.banglaLabel}
                  </h4>

                  <div className="my-3">
                    <span className="font-serif text-2xl font-black text-pink-700">
                      {item.price}
                    </span>
                  </div>

                  <p className="text-xs text-brand-muted leading-relaxed">
                    {lang === 'en' ? item.details : item.banglaDetails}
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => openGroupInquiry('sarinda-bakery')}
                    className="w-full bg-pink-700 hover:bg-pink-800 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition"
                  >
                    <span>{lang === 'en' ? 'Inquire / Order' : 'অর্ডার করুন'}</span>
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
