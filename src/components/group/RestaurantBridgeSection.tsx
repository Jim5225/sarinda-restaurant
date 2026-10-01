import React from 'react';
import { useStore } from '../../context/StoreContext';
import { SARINDA_GROUP_DATA } from '../../data/groupData';
import { 
  UtensilsCrossed, 
  Crown, 
  Truck, 
  ShoppingBag, 
  Calendar, 
  Star, 
  ShieldCheck, 
  ArrowRight,
  Flame,
  Phone
} from 'lucide-react';

export const RestaurantBridgeSection: React.FC = () => {
  const { lang, setCurrentView, setIsReservationOpen, menu } = useStore();

  const signatureItems = menu.filter(item => item.isSignature || item.isPopular).slice(0, 4);

  return (
    <section id="sarinda-restaurant-section" className="py-20 bg-brand-primary text-white relative overflow-hidden">
      {/* Decorative Shahi Background Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-xs font-black uppercase tracking-wider mb-3">
              <Crown className="w-4 h-4 text-brand-gold" />
              <span>{lang === 'en' ? 'Flagship Culinary Heritage Since 2008' : '২০০৮ থেকে ঐতিহ্যের মূল রেস্তোরাঁ'}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {lang === 'en' ? 'Sarinda Restaurant & Catering' : 'সারিন্দা রেস্টুরেন্ট অ্যান্ড ক্যাটারিং'}
            </h2>

            <p className="text-base sm:text-lg text-brand-cream/80 mt-3 font-medium">
              {lang === 'en'
                ? 'Mymensingh’s most iconic slow-cooked Dam Kacchi Biryani, succulent Mutton Rezala, tender Tandoori Kebabs, and full-scale wedding catering.'
                : 'খাঁটি খাসির মাংসের দম কাচ্চি বিরিয়ানি, শাহী মোরগ পোলাও, খাসির রেজালা ও ৫০০০+ অতিথির রাজকীয় ক্যাটারিং সেবা।'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Launch Full Online Food Ordering App */}
            <button
              onClick={() => {
                setCurrentView('restaurant');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-brand-accent hover:bg-brand-accentHover text-white px-7 py-4 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2.5 shadow-float hover:scale-103 transition cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{lang === 'en' ? 'Open Food Menu & Order Online' : 'অনলাইন মেন্যু ও অর্ডার করুন'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Book Table at Restaurant */}
            <button
              onClick={() => setIsReservationOpen(true)}
              className="bg-white/15 hover:bg-white/25 text-white border border-white/20 px-5 py-4 rounded-2xl font-bold text-sm flex items-center gap-2 transition cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-brand-gold" />
              <span>{lang === 'en' ? 'Reserve Dining Cabin' : 'কেবিন রিজার্ভ করুন'}</span>
            </button>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-black text-white">
                {lang === 'en' ? 'Copper Deg Slow-Cooking' : 'তামার ডেকে খাঁটি দম রান্না'}
              </h4>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                {lang === 'en'
                  ? 'Simmered with pure ghee, whole secret garam masalas, and fragrant premium aromatic rice.'
                  : 'খাঁটি গাওয়া ঘি, বিশেষ শাহী মসলা ও বাসমতি চালের মেলবন্ধনে তৈরি সেরা কাচ্চি।'}
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-black text-white">
                {lang === 'en' ? 'Grand Catering & Banquets' : 'বিয়ে ও করপোরেট ক্যাটারিং'}
              </h4>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                {lang === 'en'
                  ? 'Serving up to 5,000 guests for weddings, anniversaries, and corporate banquets across Greater Mymensingh.'
                  : 'ময়মনসিংহ ও পার্শ্ববর্তী এলাকায় ৫০০ থেকে ৫০০০ অতিথির সম্পূর্ণ অনুষ্ঠান ক্যাটারিং।'}
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-black text-white">
                {lang === 'en' ? '35-Minute Fast City Delivery' : '৩৫ মিনিটে হোম ডেলিভারি'}
              </h4>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                {lang === 'en'
                  ? 'Delivered fresh and steaming hot with thermal packaging anywhere in Mymensingh city.'
                  : 'থার্মাল সিলযুক্ত প্যাকেজিংয়ে গরম গরম খাবার দ্রুততম সময়ে আপনার ঠিকানায় পৌঁছায়।'}
              </p>
            </div>
          </div>

        </div>

        {/* Signature Dishes Showcase from live data */}
        <div className="bg-black/30 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/15">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-black text-white">
                {lang === 'en' ? 'Our Signature Specialties' : 'রেস্তোরাঁর বিশেষ সিগনেচার ডিশসমূহ'}
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                {lang === 'en' ? 'Popular favorites handcrafted fresh every day' : 'প্রতিদিন টাটকা তৈরি ময়মনসিংহের সর্বাধিক প্রশংসিত খাবার'}
              </p>
            </div>

            <button
              onClick={() => {
                setCurrentView('restaurant');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-black text-brand-gold hover:text-white transition flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>{lang === 'en' ? 'View Complete Menu (40+ Dishes)' : 'সম্পূর্ণ মেন্যু দেখুন (৪০+ আইটেম)'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {signatureItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setCurrentView('restaurant');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white/10 rounded-2xl overflow-hidden hover:bg-white/15 transition cursor-pointer border border-white/10 group"
              >
                <div className="h-36 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-brand-accent text-white text-[10px] font-black">
                    ৳ {item.price}
                  </span>
                </div>
                <div className="p-3.5">
                  <h5 className="font-serif font-black text-sm text-white group-hover:text-brand-gold transition truncate">
                    {lang === 'en' ? item.name : item.banglaName}
                  </h5>
                  <p className="text-[11px] text-gray-300 line-clamp-1 mt-0.5">
                    {lang === 'en' ? item.description : item.banglaDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
