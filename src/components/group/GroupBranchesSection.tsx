import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink, 
  Navigation, 
  Building2, 
  Sparkles,
  UtensilsCrossed,
  Palmtree,
  Cake,
  Flame,
  Lamp
} from 'lucide-react';

export const GroupBranchesSection: React.FC = () => {
  const { lang, setCurrentView } = useStore();
  const [activeZone, setActiveZone] = useState<string>('all');

  const zones = [
    { id: 'all', label: lang === 'en' ? 'All Locations' : 'সকল লোকেশন' },
    { id: 'ck-ghosh', label: lang === 'en' ? 'C.K. Ghosh Road (HQ)' : 'সি.কে. ঘোষ রোড (প্রধান কার্যালয়)' },
    { id: 'akua', label: lang === 'en' ? 'Akua Morolpara (Resort)' : 'আকুয়া মোড়লপাড়া (রিসোর্ট)' },
    { id: 'charpara', label: lang === 'en' ? 'Charpara Hub' : 'চরপাড়া বাণিজ্যিক এলাকা' },
    { id: 'notun-bazar', label: lang === 'en' ? 'Notun Bazar' : 'নতুন বাজার' },
  ];

  const locationsList = [
    {
      id: 'loc-1',
      zone: 'ck-ghosh',
      concernId: 'sarinda-restaurant',
      name: lang === 'en' ? 'Sarinda Restaurant & Catering' : 'সারিন্দা রেস্টুরেন্ট অ্যান্ড ক্যাটারিং',
      type: lang === 'en' ? 'Culinary Flagship' : 'রেস্তোরাঁ ও ক্যাটারিং',
      address: '11 C.K. Ghosh Road, Mymensingh-2200',
      banglaAddress: '১১ সি.কে. ঘোষ রোড, ময়মনসিংহ-২২০০',
      phone: '+880 1712-121434',
      hours: '11:00 AM - 11:30 PM (Daily)',
      banglaHours: 'সকাল ১১:০০ - রাত ১১:৩০ (প্রতিদিন)',
      mapQuery: 'Sarinda Restaurant CK Ghosh Road Mymensingh',
      icon: UtensilsCrossed,
      color: 'text-amber-600 bg-amber-50'
    },
    {
      id: 'loc-2',
      zone: 'akua',
      concernId: 'sobari-resort',
      name: lang === 'en' ? 'Sarinda Sobari Resort' : 'সারিন্দা সবারি রিসোর্ট',
      type: lang === 'en' ? 'Eco Luxury Resort & Pool' : 'ইকো রিসোর্ট ও সুইমিংপুল',
      address: 'Akua Morolpara, Akua Abdul Mannan Road, Mymensingh',
      banglaAddress: 'আকুয়া মোড়লপাড়া, আকুয়া আব্দুল মান্নান রোড, ময়মনসিংহ',
      phone: '+880 1979-121434',
      hours: '24/7 (Day-out Entry: 9:00 AM - 9:00 PM)',
      banglaHours: '২৪ ঘণ্টা খোলা (ডে ট্যুর: ৯:০০ - ৯:০০)',
      mapQuery: 'Sarinda Sobari Resort Akua Mymensingh',
      icon: Palmtree,
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      id: 'loc-3',
      zone: 'ck-ghosh',
      concernId: 'sarinda-bakery',
      name: lang === 'en' ? 'Sarinda Bakery Flagship' : 'সারিন্দা বেকারি প্রধান আউটলেট',
      type: lang === 'en' ? 'Artisanal Bakery & Sweets' : 'ডিজাইনার কেক ও মিষ্টি',
      address: '11 C.K. Ghosh Road, Mymensingh',
      banglaAddress: '১১ সি.কে. ঘোষ রোড, ময়মনসিংহ',
      phone: '+880 1712-121434',
      hours: '8:00 AM - 11:00 PM (Daily)',
      banglaHours: 'সকাল ৮:০০ - রাত ১১:০০ (প্রতিদিন)',
      mapQuery: 'Sarinda Bakery CK Ghosh Road Mymensingh',
      icon: Cake,
      color: 'text-pink-600 bg-pink-50'
    },
    {
      id: 'loc-4',
      zone: 'charpara',
      concernId: 'sorgorom-restaurant',
      name: lang === 'en' ? 'Sorgorom Restaurant & Cafe' : 'সরগরম রেস্টুরেন্ট অ্যান্ড ক্যাফে',
      type: lang === 'en' ? 'Sizzlers & Cafe Hangout' : 'সিজলার্স ও ক্যাফে আড্ডা',
      address: 'Charpara Medical Gate Road, Mymensingh',
      banglaAddress: 'চরপাড়া রোড (মেডিকেল গেট সংলগ্ন), ময়মনসিংহ',
      phone: '+880 1834-535135',
      hours: '7:30 AM - 10:30 PM (Daily)',
      banglaHours: 'সকাল ৭:৩০ - রাত ১০:৩০ (প্রতিদিন)',
      mapQuery: 'Sorgorom Restaurant Charpara Mymensingh',
      icon: Flame,
      color: 'text-orange-600 bg-orange-50'
    },
    {
      id: 'loc-5',
      zone: 'ck-ghosh',
      concernId: 'sarinda-lights',
      name: lang === 'en' ? 'Sarinda Lights & Interior Décor' : 'সারিন্দা লাইটস শোরুম',
      type: lang === 'en' ? 'Chandeliers & Smart Lighting' : 'ঝাড়বাতি ও আর্কিটেকচারাল লাইট',
      address: 'C.K. Ghosh Road Commercial Area, Mymensingh',
      banglaAddress: 'সি.কে. ঘোষ রোড বাণিজ্যিক এলাকা, ময়মনসিংহ',
      phone: '+880 1712-121434',
      hours: '10:00 AM - 9:00 PM (Sat - Thu)',
      banglaHours: 'সকাল ১০:০০ - রাত ৯:০০ (শনি - বৃহঃ)',
      mapQuery: 'CK Ghosh Road Mymensingh',
      icon: Lamp,
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      id: 'loc-6',
      zone: 'charpara',
      concernId: 'sarinda-bakery',
      name: lang === 'en' ? 'Sarinda Bakery Charpara Outlet' : 'সারিন্দা বেকারি চরপাড়া শাখা',
      type: lang === 'en' ? 'Bakery & Pastry Counter' : 'বেকারি ও পেস্ট্রি কাউন্টার',
      address: 'Charpara Mor, Medical Road, Mymensingh',
      banglaAddress: 'চরপাড়া মোড়, মেডিকেল রোড, ময়মনসিংহ',
      phone: '+880 1834-535135',
      hours: '8:00 AM - 11:00 PM (Daily)',
      banglaHours: 'সকাল ৮:০০ - রাত ১১:০০ (প্রতিদিন)',
      mapQuery: 'Charpara Mor Mymensingh',
      icon: Cake,
      color: 'text-pink-600 bg-pink-50'
    },
    {
      id: 'loc-7',
      zone: 'notun-bazar',
      concernId: 'sarinda-bakery',
      name: lang === 'en' ? 'Sarinda Bakery Notun Bazar Outlet' : 'সারিন্দা বেকারি নতুন বাজার শাখা',
      type: lang === 'en' ? 'Bakery & Sweets Outlet' : 'বেকারি ও মিষ্টি শাখা',
      address: 'Notun Bazar Main Chowrasta, Mymensingh',
      banglaAddress: 'নতুন বাজার প্রধান চৌরাস্তা, ময়মনসিংহ',
      phone: '+880 1979-121434',
      hours: '8:00 AM - 11:00 PM (Daily)',
      banglaHours: 'সকাল ৮:০০ - রাত ১১:০০ (প্রতিদিন)',
      mapQuery: 'Notun Bazar Mymensingh',
      icon: Cake,
      color: 'text-pink-600 bg-pink-50'
    }
  ];

  const filteredLocations = locationsList.filter((loc) => {
    if (activeZone === 'all') return true;
    return loc.zone === activeZone;
  });

  return (
    <section id="locations" className="py-20 bg-brand-cream/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-black uppercase tracking-wider mb-3">
            <MapPin className="w-4 h-4 text-brand-gold" />
            <span>{lang === 'en' ? 'Our Outlets Across Mymensingh' : 'ময়মনসিংহে সকল শাখা ও ঠিকানা'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-brand-primary leading-tight">
            {lang === 'en' ? 'Find a Sarinda Concern Near You' : 'সারিন্দা গ্রুপের শাখা ও যোগাযোগ'}
          </h2>

          <p className="text-base sm:text-lg text-brand-muted mt-3 font-medium">
            {lang === 'en'
              ? 'Visit our restaurants, resort, bakeries, or showroom in key landmarks across Mymensingh.'
              : 'সি.কে. ঘোষ রোড, আকুয়া মোড়লপাড়া, চরপাড়া কিংবা নতুন বাজার — শহরের যেকোনো পয়েন্টে আমরা আপনার সেবায় প্রস্তুত।'}
          </p>

          {/* Zone Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {zones.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setActiveZone(zone.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  activeZone === zone.id
                    ? 'bg-brand-primary text-white shadow-md scale-103'
                    : 'bg-white text-brand-charcoal hover:bg-brand-primary/10 border border-brand-border'
                }`}
              >
                {zone.label}
              </button>
            ))}
          </div>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((loc) => {
            const Icon = loc.icon;

            return (
              <div
                key={loc.id}
                className="bg-white rounded-3xl p-6 border border-brand-border shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className={`p-3 rounded-2xl ${loc.color} shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-brand-muted px-2.5 py-1 rounded-full bg-gray-100">
                      {loc.type}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-black text-brand-primary group-hover:text-brand-accent transition">
                    {loc.name}
                  </h3>

                  <div className="space-y-2 mt-3 text-xs text-brand-muted">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-brand-leaf shrink-0 mt-0.5" />
                      <span className="text-brand-charcoal font-medium">
                        {lang === 'en' ? loc.address : loc.banglaAddress}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-brand-leaf shrink-0" />
                      <span>{lang === 'en' ? loc.hours : loc.banglaHours}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-brand-leaf shrink-0" />
                      <a href={`tel:${loc.phone}`} className="text-brand-primary font-bold hover:underline">
                        {loc.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-5 mt-4 border-t border-brand-border/60 flex items-center gap-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-brand-cream hover:bg-brand-primary/10 text-brand-primary py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition border border-brand-border"
                  >
                    <Navigation className="w-3.5 h-3.5 text-brand-accent" />
                    <span>{lang === 'en' ? 'Get Directions' : 'ম্যাপে দেখুন'}</span>
                  </a>

                  <a
                    href={`tel:${loc.phone}`}
                    className="p-2.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white transition"
                    title="Call Outlet"
                  >
                    <Phone className="w-4 h-4 text-brand-gold" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
