import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { SARINDA_GROUP_DATA } from '../../data/groupData';
import confetti from 'canvas-confetti';
import { 
  X, 
  Send, 
  Calendar, 
  CheckCircle, 
  Sparkles, 
  Phone, 
  MessageCircle, 
  Palmtree, 
  UtensilsCrossed, 
  Cake, 
  Flame, 
  Lamp,
  Building2
} from 'lucide-react';

export const GroupInquiryModal: React.FC = () => {
  const { 
    lang, 
    isGroupInquiryOpen, 
    setIsGroupInquiryOpen, 
    inquiryTargetConcern, 
    setInquiryTargetConcern 
  } = useStore();

  const [concern, setConcern] = useState(inquiryTargetConcern || 'sobari-resort');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('2');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (inquiryTargetConcern) {
      setConcern(inquiryTargetConcern);
    }
  }, [inquiryTargetConcern]);

  if (!isGroupInquiryOpen) return null;

  const concernOptions = [
    { id: 'sobari-resort', label: lang === 'en' ? 'Sarinda Sobari Resort (Stay / Day Tour)' : 'সারিন্দা সবারি রিসোর্ট (কটেজ / ডে ট্যুর)', icon: Palmtree },
    { id: 'sarinda-restaurant', label: lang === 'en' ? 'Sarinda Restaurant (Wedding Catering & Hall)' : 'সারিন্দা রেস্টুরেন্ট (বিয়ে ক্যাটারিং ও হল)', icon: UtensilsCrossed },
    { id: 'sarinda-bakery', label: lang === 'en' ? 'Sarinda Bakery (Custom Designer Cake)' : 'সারিন্দা বেকারি (কাস্টম ডিজাইনার কেক)', icon: Cake },
    { id: 'sorgorom-restaurant', label: lang === 'en' ? 'Sorgorom (Table / Birthday Party)' : 'সরগরম (টেবিল / জন্মদিন পার্টি)', icon: Flame },
    { id: 'sarinda-lights', label: lang === 'en' ? 'Sarinda Lights (Architectural / Chandelier)' : 'সারিন্দা লাইটস (ঝাড়বাতি ও প্রজেক্ট)', icon: Lamp },
    { id: 'corporate', label: lang === 'en' ? 'Corporate Partnership / Other' : 'করপোরেট পার্টনারশিপ / অন্যান্য', icon: Building2 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // safe fallback
    }

    setIsSubmitted(true);
  };

  const resetAndClose = () => {
    setIsGroupInquiryOpen(false);
    setIsSubmitted(false);
    setName('');
    setPhone('');
    setNotes('');
  };

  const getWhatsAppMessage = () => {
    const selectedConcernObj = concernOptions.find(c => c.id === concern);
    return encodeURIComponent(
      `Hello Sarinda Group!\n\nI want to make an inquiry for: ${selectedConcernObj?.label}\nName: ${name}\nPhone: ${phone}\nDate: ${date || 'Flexible'}\nGuests/Quantity: ${guests}\nNotes: ${notes || 'None'}\n\nPlease confirm availability and details.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-brand-border flex flex-col">
        
        {/* Modal Top Header */}
        <div className="p-6 bg-gradient-to-r from-brand-primary via-brand-dark to-brand-primary text-white rounded-t-3xl flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-gold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-black">
                {lang === 'en' ? 'Sarinda Group Booking & Inquiry' : 'সারিন্দা গ্রুপ বুকিং ও অনুসন্ধান'}
              </h3>
              <p className="text-xs text-brand-gold font-bold">
                {lang === 'en' ? 'Hotline: +880 1712-121434 • Response within 15 mins' : 'হটলাইন: ০১৭১২-১২১৪৩৪ • দ্রুততম সাড়া'}
              </p>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 flex-1">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>

              <h4 className="font-serif text-2xl font-black text-brand-primary">
                {lang === 'en' ? 'Inquiry Received Successfully!' : 'আপনার বার্তা সফলভাবে গ্রহণ করা হয়েছে!'}
              </h4>

              <p className="text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
                {lang === 'en'
                  ? `Thank you, ${name}! Our representative from Sarinda Group will reach out to you at ${phone} shortly.`
                  : `ধন্যবাদ ${name}! সারিন্দা গ্রুপের সংশ্লিষ্ট কর্মকর্তা অতিশীঘ্রই আপনার সাথে ${phone} নম্বরে যোগাযোগ করবেন।`}
              </p>

              {/* Instant WhatsApp Connect */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/${(() => {
                    const s = localStorage.getItem('sarinda_test_wa_number');
                    if (s) {
                      const c = s.replace(/[^0-9]/g, '');
                      return c.startsWith('01') ? '88' + c : c;
                    }
                    return '8801852363235';
                  })()}?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Chat on WhatsApp Now' : 'হোয়াটসঅ্যাপে চ্যাট করুন'}</span>
                </a>

                <a
                  href="tel:+8801852363235"
                  className="bg-brand-primary hover:bg-brand-dark text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-4 h-4 text-brand-gold" />
                  <span>{lang === 'en' ? 'Call Hotline Directly' : 'হটলাইনে কল করুন'}</span>
                </a>
              </div>

              <button
                onClick={resetAndClose}
                className="mt-6 text-xs text-brand-muted underline hover:text-brand-primary font-bold cursor-pointer"
              >
                {lang === 'en' ? 'Close Window' : 'উইন্ডো বন্ধ করুন'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Select Concern */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-brand-primary mb-1.5">
                  {lang === 'en' ? 'Select Sister Concern / Service:' : 'অঙ্গপ্রতিষ্ঠান বা সেবার ধরন নির্বাচন করুন:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {concernOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = concern === opt.id;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setConcern(opt.id)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-bold flex items-center gap-2.5 transition cursor-pointer ${
                          isSelected
                            ? 'border-brand-accent bg-brand-accent/10 text-brand-primary shadow-xs'
                            : 'border-brand-border bg-gray-50/70 hover:bg-gray-100 text-brand-charcoal'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-accent' : 'text-brand-muted'}`} />
                        <span className="truncate">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1">
                    {lang === 'en' ? 'Your Full Name *' : 'আপনার পূর্ণ নাম *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={lang === 'en' ? 'e.g. Tanvir Ahmed' : 'যেমন: তানভীর আহমেদ'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1">
                    {lang === 'en' ? 'Phone Number *' : 'মোবাইল নম্বর *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017xxxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  />
                </div>
              </div>

              {/* Date & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1">
                    {lang === 'en' ? 'Preferred Date' : 'প্রত্যাশিত তারিখ'}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1">
                    {lang === 'en' ? 'Guests / Quantity' : 'অতিথি / পরিমাণ'}
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  >
                    <option value="1-2">1 - 2 Guests / Persons</option>
                    <option value="3-5">3 - 5 Guests (Family)</option>
                    <option value="6-10">6 - 10 Guests (Group)</option>
                    <option value="10-25">10 - 25 Guests (Day Out / Tour)</option>
                    <option value="50+">50 - 200 Guests (Event / Hall)</option>
                    <option value="500+">500+ Guests (Grand Wedding / Catering)</option>
                    <option value="1 pc">1 pc Custom Cake / 1 Chandelier</option>
                  </select>
                </div>
              </div>

              {/* Special Requirements */}
              <div>
                <label className="block text-xs font-bold text-brand-charcoal mb-1">
                  {lang === 'en' ? 'Special Requests or Details' : 'বিশেষ চাহিদা বা বিস্তারিত তথ্য'}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={lang === 'en' ? 'Provide details (e.g. pool view cottage, cake flavor, chandelier room size...)' : 'আপনার বিস্তারিত তথ্য লিখুন (যেমন: পুল ভিউ কটেজ, চকোলেট ফ্লেভার কেক, ড্রয়িং রুমের লাইটিং...)'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-brand-accent hover:bg-brand-accentHover text-white py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-md hover:scale-101 transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Submit Inquiry / Request Booking' : 'অনুসন্ধান বা বুকিং পাঠান'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
