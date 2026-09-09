import React from 'react';
import { useStore } from '../context/StoreContext';
import { translations } from '../data/translations';
import { UtensilsCrossed, Phone, Mail, MapPin, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, setActiveTab, setIsReservationOpen } = useStore();
  const t = translations[lang];

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-12 border-t border-brand-light/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-primary flex items-center justify-center text-brand-gold border border-brand-leaf/40">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-white tracking-tight">
                  Sarinda <span className="text-brand-accent">✦</span>
                </span>
                <p className="text-[10px] tracking-widest uppercase font-semibold text-brand-gold">
                  Restaurant & Catering
                </p>
              </div>
            </div>

            <p className="text-xs text-brand-cream/70 max-w-sm leading-relaxed">
              {lang === 'en'
                ? 'Dhaka’s beloved dining destination for authentic Royal Kacchi Biryani, Mughlai delicacies, and traditional Bangladeshi feasting.'
                : 'খাঁটি কাচ্চি বিরিয়ানি, শাহী রেজালা ও বিয়ে বাড়ির রোস্টের আসল স্বাদে ঢাকার অন্যতম সেরা পারিবারিক রেস্তোরাঁ।'}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-brand-gold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Halal Certified • Fresh Daily Meat</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-brand-gold">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-brand-cream/80">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('menu');
                    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-brand-gold transition cursor-pointer"
                >
                  {t.navMenu}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('offers');
                    document.getElementById('offers')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-brand-gold transition cursor-pointer"
                >
                  {t.navOffers}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsReservationOpen(true)}
                  className="hover:text-brand-gold transition cursor-pointer"
                >
                  {t.bookTable}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('gallery');
                    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-brand-gold transition cursor-pointer"
                >
                  {t.navGallery}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('about');
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-brand-gold transition cursor-pointer"
                >
                  {t.navAbout}
                </button>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-brand-gold">
              Opening Hours
            </h4>
            <ul className="space-y-1.5 text-xs text-brand-cream/80">
              <li className="font-semibold text-white">Sunday - Thursday:</li>
              <li className="text-brand-cream/70">11:00 AM – 11:30 PM</li>
              <li className="font-semibold text-white pt-1">Friday & Saturday:</li>
              <li className="text-brand-cream/70">11:00 AM – Midnight</li>
              <li className="text-[11px] text-brand-leaf font-bold pt-1">
                Takeaway & Delivery Always Open
              </li>
            </ul>
          </div>

          {/* Contact & Payments */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-brand-gold">
              Visit or Call
            </h4>
            <div className="space-y-2 text-xs text-brand-cream/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
                <span>Road 16, Dhanmondi 27, Dhaka</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                <a href="tel:+8801712121434" className="hover:text-brand-gold transition">+880 1712-121434</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                <a href="https://facebook.com/sarindabd" target="_blank" rel="noreferrer" className="hover:text-brand-gold transition">facebook.com/sarindabd</a>
              </p>
            </div>

            <div className="pt-2">
              <p className="text-[10px] uppercase font-bold text-white/50 mb-1.5 tracking-wider">
                We Accept
              </p>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-white">
                <span className="bg-white/10 px-2 py-0.5 rounded border border-white/10">Cash on Delivery</span>
                <span className="bg-pink-900/60 text-pink-200 px-2 py-0.5 rounded border border-pink-700/40">bKash</span>
                <span className="bg-orange-900/60 text-orange-200 px-2 py-0.5 rounded border border-orange-700/40">Nagad</span>
                <span className="bg-blue-900/60 text-blue-200 px-2 py-0.5 rounded border border-blue-700/40">Cards</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright & Admin Portal Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-cream/60">
          <p>© 2026 Sarinda Restaurant. All Rights Reserved. Crafted with <Heart className="w-3 h-3 text-red-400 inline mx-0.5 fill-red-400" /> for Bangladeshi Food Lovers.</p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('admin')}
              className="text-brand-gold hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Staff / Admin Portal
            </button>
            <span>•</span>
            <span className="text-white/40">Privacy Policy</span>
            <span>•</span>
            <span className="text-white/40">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
