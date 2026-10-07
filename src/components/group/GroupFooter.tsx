import React from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  UtensilsCrossed, 
  Palmtree, 
  Cake, 
  Flame, 
  Lamp, 
  Heart, 
  Sparkles,
  ShieldCheck,
  Globe
} from 'lucide-react';

export const GroupFooter: React.FC = () => {
  const { lang, setCurrentView, setActiveTab, openGroupInquiry } = useStore();

  return (
    <footer className="bg-brand-dark text-white border-t border-brand-dark/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-primary to-[#091b14] flex items-center justify-center text-brand-gold shadow-md border border-brand-gold/30">
                <Building2 className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <span className="font-serif text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                  SARINDA <span className="text-brand-gold text-lg">✦</span> GROUP
                </span>
                <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-brand-leaf">
                  MYMENSINGH • ESTABLISHED 2008
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm">
              {lang === 'en'
                ? 'The premier multi-industry hospitality, dining, resort, confectionery, and architectural lighting conglomerate in Mymensingh, Bangladesh.'
                : 'ময়মনসিংহের শীর্ষস্থানীয় শিল্পগোষ্ঠী — বিশ্বমানের রেস্তোরাঁ, ভাইরাল সবারি রিসোর্ট, প্রিমিয়াম বেকারি, সিজলিং ক্যাফে ও রাজকীয় লাইটিং সলিউশন।'}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://facebook.com/sarindabd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-primary text-gray-200 hover:text-white flex items-center justify-center transition"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-primary text-gray-200 hover:text-white flex items-center justify-center transition"
                title="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Sister Concerns Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-black text-brand-gold uppercase tracking-wider">
              {lang === 'en' ? 'Our Sister Concerns' : 'অঙ্গপ্রতিষ্ঠান সমূহ'}
            </h4>
            <ul className="space-y-2 text-xs text-gray-300 font-medium">
              <li>
                <button
                  onClick={() => setCurrentView('restaurant')}
                  className="hover:text-brand-gold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <UtensilsCrossed className="w-3.5 h-3.5 text-amber-500" />
                  <span>Sarinda Restaurant</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('resort')}
                  className="hover:text-brand-gold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Palmtree className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sarinda Sobari Resort</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('bakery')}
                  className="hover:text-brand-gold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Cake className="w-3.5 h-3.5 text-pink-400" />
                  <span>Sarinda Bakery & Pastry</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('sorgorom')}
                  className="hover:text-brand-gold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span>Sorgorom Restaurant & Cafe</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('lights')}
                  className="hover:text-brand-gold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Lamp className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Sarinda Lights & Décor</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Key Outlets & Branches */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-black text-brand-gold uppercase tracking-wider">
              {lang === 'en' ? 'Key Locations' : 'শাখা ও লোকেশন'}
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-leaf shrink-0 mt-0.5" />
                <span>11 C.K. Ghosh Road (HQ, Restaurant & Bakery)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Akua Morolpara (Sobari Resort & Pool)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <span>Charpara Mor (Sorgorom & Bakery Outlet)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                <span>Notun Bazar Main Road (Bakery Branch)</span>
              </li>
            </ul>
          </div>

          {/* Hotline & Corporate Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-black text-brand-gold uppercase tracking-wider">
              {lang === 'en' ? 'Direct Hotline' : 'যোগাযোগ ও বুকিং'}
            </h4>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-gold" />
                <a href="tel:+8801852363235" className="hover:text-brand-gold font-bold">
                  +880 1712-121434 (General)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <a href="tel:+8801979121434" className="hover:text-brand-gold font-bold">
                  +880 1979-121434 (Resort)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                <a href="tel:+8801834535135" className="hover:text-brand-gold font-bold">
                  +880 1834-535135 (Sorgorom)
                </a>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Mail className="w-3.5 h-3.5 text-brand-leaf" />
                <span>contact@sarindagroup.com</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openGroupInquiry()}
                className="w-full bg-brand-accent hover:bg-brand-accentHover text-white py-2 rounded-xl text-xs font-black transition cursor-pointer shadow-sm"
              >
                {lang === 'en' ? 'Book Resort / Plan Event' : 'রিসোর্ট ও ইভেন্ট বুকিং'}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            <p>© {new Date().getFullYear()} Sarinda Group. All Rights Reserved. Mymensingh, Bangladesh.</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('admin')}
              className="text-gray-400 hover:text-brand-gold flex items-center gap-1 transition text-xs font-semibold cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Management</span>
            </button>
            <span>•</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Sarinda Group
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
