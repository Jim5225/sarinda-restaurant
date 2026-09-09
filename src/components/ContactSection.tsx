import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { translations } from '../data/translations';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { lang, setIsReservationOpen } = useStore();
  const t = translations[lang];

  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Catering Inquiry');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;
    setSentSuccess(true);
    setTimeout(() => {
      setInquiryName('');
      setInquiryPhone('');
      setInquiryMsg('');
      setSentSuccess(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-brand-cream/50 scroll-mt-20 border-t border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-brand-accent" />
            <span>{lang === 'en' ? 'Find & Contact Us' : 'আমাদের ঠিকানা ও যোগাযোগ'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-primary">
            {lang === 'en' ? 'Visit Sarinda or Order Today' : 'সারিন্দায় স্বাগতম'}
          </h2>
          <p className="text-sm sm:text-base text-brand-muted mt-2">
            {lang === 'en'
              ? 'Conveniently located in Dhanmondi. Reach out for direct delivery, table bookings, or event catering.'
              : 'ধানমন্ডির প্রাণকেন্দ্রে আমাদের অবস্থান। হোম ডেলিভারি, টেবিল বুকিং বা ক্যাটারিং এর জন্য যোগাযোগ করুন।'}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details & Quick Action Buttons */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-7 rounded-3xl border border-brand-border shadow-soft space-y-5">
              <h3 className="font-serif font-bold text-xl text-brand-primary">
                {lang === 'en' ? 'Restaurant Information' : 'রেস্তোরাঁর তথ্য'}
              </h3>

              <div className="space-y-4 text-sm text-brand-charcoal">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-brand-cream text-brand-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-brand-muted">Address</h4>
                    <p className="font-semibold text-brand-charcoal mt-0.5">{t.address}</p>
                    <p className="text-xs text-brand-muted">Near Satmasjid Road, Dhaka - 1209</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-brand-cream text-brand-primary flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-brand-muted">Opening Hours</h4>
                    <p className="font-semibold text-brand-charcoal mt-0.5">{t.openHours}</p>
                    <p className="text-xs text-brand-leaf font-medium">Kitchen open 7 days a week</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-brand-cream text-brand-primary flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-brand-muted">Direct Hotline</h4>
                    <p className="font-semibold text-brand-charcoal mt-0.5">+880 1712-121434</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-brand-cream text-brand-primary flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-brand-muted">Email & Social</h4>
                    <p className="font-semibold text-brand-charcoal mt-0.5">facebook.com/sarindabd</p>
                  </div>
                </div>
              </div>

              {/* Direct Instant Messaging CTAs */}
              <div className="pt-4 border-t border-brand-border space-y-2">
                <a
                  href="tel:+8801712121434"
                  className="w-full py-3 px-4 rounded-2xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition"
                >
                  <Phone className="w-4 h-4 text-brand-gold" />
                  <span>{lang === 'en' ? 'Click to Call Directly (+880 1712-121434)' : 'সরাসরি কল করুন (+৮৮০ ১৭১২-১২১৪৩৪)'}</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://wa.me/8801712121434?text=Hello%20Sarinda%20Restaurant,%20I%20would%20like%20to%20place%20an%20order"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href="https://facebook.com/sarindabd"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-2xl bg-[#0084FF] hover:bg-[#0073e6] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Facebook Page</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Map Preview & Quick Event/Catering Inquiry Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Interactive Map Embed / Preview Card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-brand-border shadow-soft h-64 relative">
              <iframe
                title="Sarinda Restaurant Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14608.03694485078!2d90.3700726!3d23.7470487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b33cff1333%3A0x6b01683bc486a6b3!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-md border border-brand-border text-xs font-bold text-brand-primary flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                <span>Sarinda Restaurant • Dhanmondi 27</span>
              </div>
            </div>

            {/* Event & Catering Inquiry Form */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-brand-border shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-serif font-bold text-xl text-brand-primary">
                    {lang === 'en' ? 'Event & Catering Inquiry' : 'অনুষ্ঠান বা কেটারিং অনুসন্ধান'}
                  </h3>
                  <p className="text-xs text-brand-muted mt-0.5">
                    {lang === 'en'
                      ? 'Plan your wedding feast, birthday, corporate dinner, or family gathering with us.'
                      : 'বিয়ে, জন্মদিন বা যেকোনো পারিবারিক অনুষ্ঠানের বিশেষ খাবারের আয়োজন।'}
                  </p>
                </div>
              </div>

              {sentSuccess ? (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-brand-leaf text-xs sm:text-sm font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-leaf shrink-0" />
                  <span>
                    {lang === 'en'
                      ? 'Thank you! Our catering manager will contact you within 2 business hours.'
                      : 'ধন্যবাদ! আমাদের ক্যাটারিং ম্যানেজার দ্রুত আপনার সাথে যোগাযোগ করবেন।'}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                        {lang === 'en' ? 'Your Name' : 'আপনার নাম'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="e.g. Asif Iqbal"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-border text-xs text-brand-charcoal focus:outline-none focus:ring-1 focus:ring-brand-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                        {lang === 'en' ? 'Phone Number' : 'মোবাইল নম্বর'} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-border text-xs text-brand-charcoal focus:outline-none focus:ring-1 focus:ring-brand-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                        {lang === 'en' ? 'Occasion Type' : 'অনুষ্ঠানের ধরন'}
                      </label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-border text-xs text-brand-charcoal focus:outline-none focus:ring-1 focus:ring-brand-primary"
                      >
                        <option>Wedding Feast / Biye Bari</option>
                        <option>Birthday / Anniversary Celebration</option>
                        <option>Corporate Lunch / Dinner</option>
                        <option>Home Party Platter Delivery</option>
                        <option>General Table Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                        {lang === 'en' ? 'Expected Guests' : 'সম্ভাব্য অতিথি'}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 50-100 guests"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-border text-xs text-brand-charcoal focus:outline-none focus:ring-1 focus:ring-brand-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                      {lang === 'en' ? 'Message / Special Requests' : 'বিশেষ কোনো চাহিদা'}
                    </label>
                    <textarea
                      rows={2}
                      value={inquiryMsg}
                      onChange={(e) => setInquiryMsg(e.target.value)}
                      placeholder="Tell us about the event date, preferred menu items, etc."
                      className="w-full px-3.5 py-2 rounded-xl bg-brand-cream/40 border border-brand-border text-xs text-brand-charcoal focus:outline-none focus:ring-1 focus:ring-brand-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Submit Inquiry' : 'অনুসন্ধান পাঠান'}</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
