import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { translations } from '../data/translations';
import {
  ArrowRight,
  CalendarDays,
  Star,
  Flame,
  Sparkles,
  Clock,
  CheckCircle2,
  Bot,
  Send,
  ShoppingBag,
  RotateCcw,
  UtensilsCrossed,
  Tag
} from 'lucide-react';
import { MenuItem } from '../types';

interface HeroChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  recommendedItem?: MenuItem;
  action?: {
    label: string;
    type: 'menu' | 'reservation' | 'offers';
  };
}

export const Hero: React.FC = () => {
  const {
    lang,
    setActiveTab,
    setIsReservationOpen,
    setDetailItem,
    menu,
    offers,
    addToCart,
    setIsCartOpen
  } = useStore();
  const t = translations[lang];

  // Signature dish
  const signatureDish = menu.find(item => item.id === 'special-kacchi-biryani') || menu.find(item => item.id === 'kacchi-biryani') || menu[0];
  const borhaniItem = menu.find(item => item.id === 'shahi-borhani') || menu.find(item => item.category === 'Drinks');

  // Tab view on the right: 'ai' (default) or 'photo'
  const [rightView, setRightView] = useState<'ai' | 'photo'>('ai');

  // Hero Live AI Chat State
  const initialHeroMessages: HeroChatMessage[] = [
    {
      id: 'h-1',
      sender: 'ai',
      text: lang === 'en'
        ? "Hello! I am your Sarinda AI Agent. Tell me what you're craving or how many people you are ordering for, and I'll find your perfect meal instantly!"
        : "আসসালামু আলাইকুম! আমি সারিন্দা এআই এজেন্ট। আপনি কতজনের জন্য বা কী ধরণের খাবার খুঁজছেন বলুন, আমি ঝটপট আপনার পছন্দের খাবার অর্ডার করে দেব!",
      recommendedItem: signatureDish
    }
  ];

  const [chatMessages, setChatMessages] = useState<HeroChatMessage[]>(initialHeroMessages);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = lang === 'en' ? [
    'Special Kacchi Biryani',
    'Combo for 4 People',
    'Today\'s 15% Off Code',
    'Shahi Borhani'
  ] : [
    'স্পেশাল কাচ্চি বিরিয়ানি',
    '৪ জনের ফ্যামিলি কম্বো',
    'আজকের ১৫% ছাড় অফার',
    'শাহী বোরহানি ও ফিরনি'
  ];

  const handleHeroAiQuery = (queryText: string) => {
    const q = queryText.toLowerCase();

    const userMsg: HeroChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: queryText
    };

    setChatMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let reply: HeroChatMessage;

      // 1. Kacchi / Biryani
      if (q.includes('kacchi') || q.includes('কাচ্চি') || q.includes('biryani') || q.includes('বিরিয়ানি') || q.includes('special')) {
        reply = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: lang === 'en'
            ? `Here is our top recommendation: '${signatureDish.name}'. Slow-cooked with tender mutton in pure mustard oil and fragrant Chinigura rice!`
            : `আমাদের সবচেয়ে প্রিয় পদ: '${signatureDish.banglaName}'। খাঁটি সরিষার তেল ও সুগন্ধি চালের সাথে তুলতুলে খাসির মাংসের দম কাচ্চি!`,
          recommendedItem: signatureDish
        };
      }
      // 2. 4 people / family
      else if (q.includes('4') || q.includes('family') || q.includes('৪') || q.includes('কম্বো') || q.includes('combo')) {
        const platter = menu.find(m => m.id === 'kebab-platter') || signatureDish;
        reply = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: lang === 'en'
            ? "For a family of 4, our 'Special Kacchi (Full)' or 'Kebab Platter' paired with Shahi Chicken Roast and chilled Borhani is the ultimate feast!"
            : "৪ জনের পরিবারের জন্য আমাদের স্পেশাল কাচ্চি (ফুল), কাবাব প্লেটার সাথে বিয়ে বাড়ির চিকেন রোস্ট ও শাহী বোরহানি পারফেক্ট কম্বো!",
          recommendedItem: platter
        };
      }
      // 3. Offers / Discount
      else if (q.includes('offer') || q.includes('ছাড়') || q.includes('অফার') || q.includes('code') || q.includes('discount')) {
        const topOffer = offers[0];
        reply = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: lang === 'en'
            ? `Use code '${topOffer?.code}' at checkout to get ${topOffer?.discountPercent}% discount on minimum orders of ৳${topOffer?.minOrder}!`
            : `চেকআউটে কুপন কোড '${topOffer?.code}' ব্যবহার করলে পাচ্ছেন ${topOffer?.discountPercent}% বিশেষ ছাড় (নূন্যতম ৳${topOffer?.minOrder} অর্ডারে)!`,
          action: { label: lang === 'en' ? 'Explore Offers' : 'অফার দেখুন', type: 'offers' }
        };
      }
      // 4. Borhani / Firni / Drinks
      else if (q.includes('borhani') || q.includes('বোরহানি') || q.includes('firni') || q.includes('ফিরনি') || q.includes('drink')) {
        reply = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: lang === 'en'
            ? "Traditional Shahi Borhani (Small ৳75, Medium ৳155, 1 Litre Bottle ৳325) is made with fresh yogurt, mint, and toasted digestive spices."
            : "ঐতিহ্যবাহী শাহী বোরহানি (ছোট গ্লাস ৳৭৫, ৫০০ মি.লি. ৳১৫৫, ১ লিটার বোতল ৳৩২৫)। আসল পুরান ঢাকার হজমি মসলায় তৈরি!",
          recommendedItem: borhaniItem
        };
      }
      // 5. Table booking
      else if (q.includes('table') || q.includes('বুকিং') || q.includes('টেবিল') || q.includes('book')) {
        reply = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: lang === 'en'
            ? "We would be delighted to host you! We have Family Halls, Standard Dining, and VIP Private Cabins available."
            : "সারিন্দায় আপনাকে স্বাগত! আমাদের এখানে ফ্যামিলি হল, ভিআইপি কেবিন ও আরামদায়ক ডাইনিং এ টেবিল বুকিং করতে পারেন।",
          action: { label: lang === 'en' ? 'Book a Table Now' : 'টেবিল বুক করুন', type: 'reservation' }
        };
      }
      // Fallback
      else {
        reply = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: lang === 'en'
            ? `We have over 40+ authentic dishes including Kacchi Biryani, Mutton Rezala, Chicken Roast, Fish, and Kebabs. What would you like to try?`
            : `আমাদের মেনুতে কাচ্চি বিরিয়ানি, মাটন কালিয়া, চিকেন রোস্ট, তাজা মাছ ও শিক কাবাব সহ ৪০টির বেশি পদ রয়েছে। কোনটি অর্ডার করতে চান?`,
          action: { label: lang === 'en' ? 'Browse Full Menu' : 'সম্পূর্ণ মেনু দেখুন', type: 'menu' }
        };
      }

      setChatMessages(prev => [...prev, reply]);
      setIsTyping(false);
    }, 450);
  };

  const handleQuickAddRecommended = (item: MenuItem) => {
    if (item.portions && item.portions.length > 0) {
      setDetailItem(item);
    } else {
      addToCart(item, 1);
      setIsCartOpen(true);
    }
  };

  const handleActionClick = (action: NonNullable<HeroChatMessage['action']>) => {
    if (action.type === 'reservation') {
      setIsReservationOpen(true);
    } else {
      setActiveTab(action.type);
      const el = document.getElementById(action.type);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderClick = () => {
    setActiveTab('menu');
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-16 bg-gradient-to-b from-brand-cream via-brand-cream/60 to-white">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-leaf/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-brand-accent/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/25 text-brand-primary text-xs sm:text-sm font-extrabold shadow-xs">
              <Sparkles className="w-4 h-4 text-brand-accent" />
              <span>{t.heroTag}</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-brand-primary leading-[1.14]">
              {t.heroTitle}
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-brand-charcoal font-semibold max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t.heroSub}
            </p>

            {/* Highlights List */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1 text-xs sm:text-sm font-bold text-brand-charcoal">
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-brand-border shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-brand-leaf font-bold" />
                {lang === 'en' ? 'Slow Dum Cooked' : 'আসল দম রান্না'}
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-brand-border shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-brand-leaf font-bold" />
                {lang === 'en' ? 'Pure Mustard Oil & Ghee' : 'খাঁটি ঘি ও সরিষার তেল'}
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-brand-border shadow-xs">
                <Clock className="w-4 h-4 text-brand-leaf font-bold" />
                {lang === 'en' ? '30-40 Min Delivery' : '৩০-৪০ মিনিটে ডেলিভারি'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={handleOrderClick}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-black text-white bg-brand-primary hover:bg-brand-dark transition-all duration-200 shadow-elevated hover:shadow-float flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>{t.orderNow}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition duration-200" />
              </button>

              <button
                onClick={() => setIsReservationOpen(true)}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl text-base font-black text-brand-primary bg-white hover:bg-brand-cream border-2 border-brand-primary/30 hover:border-brand-primary transition-all duration-200 shadow-soft flex items-center justify-center gap-2 cursor-pointer"
              >
                <CalendarDays className="w-5 h-5 text-brand-leaf" />
                <span>{t.bookTable}</span>
              </button>
            </div>

            {/* Social Proof Snippet */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-brand-muted">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                <div className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-brand-primary text-white text-xs font-black ring-2 ring-white">
                  +1k
                </div>
              </div>
              <div>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-brand-charcoal font-bold">
                  {lang === 'en' ? 'Rated 4.9 by 1,200+ food lovers' : '১২০০+ ভোজনরসিকের প্রিয় রেস্তোরাঁ'}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero AI Agent Interactive Terminal (Same Big Dimensions as Photo Card) */}
          <div className="lg:col-span-6 relative">
            
            {/* View Mode Toggle Pill on Top */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-1.5 bg-brand-cream/80 p-1.5 rounded-2xl border border-brand-border text-xs sm:text-sm">
                <button
                  onClick={() => setRightView('ai')}
                  className={`px-3.5 py-1.5 rounded-xl font-black transition flex items-center gap-1.5 cursor-pointer ${
                    rightView === 'ai'
                      ? 'bg-brand-primary text-white shadow-sm'
                      : 'text-brand-charcoal hover:text-brand-primary'
                  }`}
                >
                  <Bot className="w-4 h-4 text-brand-gold animate-pulse" />
                  <span>{lang === 'en' ? 'Sarinda AI Agent' : 'সারিন্দা এআই চ্যাট'}</span>
                </button>

                <button
                  onClick={() => setRightView('photo')}
                  className={`px-3.5 py-1.5 rounded-xl font-black transition flex items-center gap-1.5 cursor-pointer ${
                    rightView === 'photo'
                      ? 'bg-brand-primary text-white shadow-sm'
                      : 'text-brand-charcoal hover:text-brand-primary'
                  }`}
                >
                  <UtensilsCrossed className="w-4 h-4 text-brand-accent" />
                  <span>{lang === 'en' ? 'Kacchi Photo View' : 'কাচ্চি ছবি ভিউ'}</span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-100/70 px-3 py-1.5 rounded-full border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                <span>{lang === 'en' ? 'Instant Order Concierge' : 'লাইভ ফুড কনসিয়ার্জ'}</span>
              </div>
            </div>

            {/* TAB 1: SARINDA AI INTERACTIVE LIVE CHAT TERMINAL */}
            {rightView === 'ai' ? (
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border-2 border-brand-gold/40 flex flex-col h-[520px] animate-in zoom-in-95 duration-200">
                
                {/* Header with Title requested by User */}
                <div className="p-4 bg-gradient-to-r from-brand-dark via-brand-primary to-brand-dark text-white flex items-center justify-between shrink-0 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-white/10 border border-brand-gold/40 flex items-center justify-center text-brand-gold shadow">
                      <Bot className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black text-brand-gold tracking-tight">
                          Sarinda AI
                        </span>
                        <span className="text-white/40">•</span>
                        <span className="text-xs font-black text-emerald-400 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          Online
                        </span>
                      </div>
                      {/* Exact Title requested by User */}
                      <h3 className="font-serif text-sm sm:text-base font-black text-brand-cream leading-tight">
                        {lang === 'en'
                          ? 'Order your favorite food by asking the agent'
                          : 'পছন্দের খাবার অর্ডার করুন এজেন্টকে জিজ্ঞাসা করে'}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => setChatMessages(initialHeroMessages)}
                    className="p-2 rounded-xl hover:bg-white/10 text-brand-cream/80 hover:text-white transition cursor-pointer"
                    title="Reset Conversation"
                  >
                    <RotateCcw className="w-4 h-4 font-bold" />
                  </button>
                </div>

                {/* Messages Feed Area */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-brand-cream/20">
                  {chatMessages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-brand-primary text-white rounded-br-none shadow-xs font-bold'
                            : 'bg-white text-brand-charcoal border border-brand-border shadow-xs rounded-bl-none font-semibold'
                        }`}
                      >
                        {msg.text}
                      </div>

                      {/* Interactive Dish Recommendation Card inside chat */}
                      {msg.recommendedItem && (
                        <div className="mt-2 w-full max-w-[92%] p-3 rounded-2xl bg-white border border-brand-border/80 shadow-soft flex items-center justify-between gap-3 animate-in slide-in-from-bottom-2">
                          <img
                            src={msg.recommendedItem.image}
                            alt={msg.recommendedItem.name}
                            className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-xs"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[11px] font-black uppercase text-brand-leaf block">
                              {msg.recommendedItem.category}
                            </span>
                            <h4 className="font-serif font-black text-sm text-brand-charcoal truncate">
                              {lang === 'en' ? msg.recommendedItem.name : msg.recommendedItem.banglaName}
                            </h4>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-sm font-black text-brand-primary">
                                ৳{msg.recommendedItem.price}
                              </span>
                              {msg.recommendedItem.portionNote && (
                                <span className="text-xs text-brand-muted font-bold">
                                  ({msg.recommendedItem.portionNote})
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleQuickAddRecommended(msg.recommendedItem!)}
                            className="px-3.5 py-2 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-black text-xs flex items-center gap-1 shrink-0 shadow-sm cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>{lang === 'en' ? 'Add' : 'অর্ডার'}</span>
                          </button>
                        </div>
                      )}

                      {/* Action Button inside chat if any */}
                      {msg.action && (
                        <button
                          onClick={() => handleActionClick(msg.action!)}
                          className="mt-1.5 px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-black shadow-xs hover:bg-brand-dark transition cursor-pointer flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                          <span>{msg.action.label}</span>
                        </button>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-center gap-1.5 bg-white p-2.5 rounded-2xl border border-brand-border w-16">
                      <span className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-brand-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 bg-brand-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  )}
                </div>

                {/* Quick Prompts Carousel */}
                <div className="px-3 py-2.5 bg-brand-cream/50 border-t border-brand-border/60 overflow-x-auto flex gap-2 no-scrollbar shrink-0">
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleHeroAiQuery(prompt)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-brand-border text-xs font-bold text-brand-charcoal hover:bg-brand-primary hover:text-white transition whitespace-nowrap shrink-0 cursor-pointer shadow-2xs"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Chat Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (inputVal.trim()) handleHeroAiQuery(inputVal.trim());
                  }}
                  className="p-3 bg-white border-t border-brand-border flex items-center gap-2 shrink-0"
                >
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder={lang === 'en' ? 'Type food name or ask: 4 person combo...' : 'পছন্দের খাবারের নাম বা ৪ জনের কম্বো লিখুন...'}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-border text-sm font-semibold text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-primary placeholder:text-brand-muted/70"
                  />
                  <button
                    type="submit"
                    disabled={!inputVal.trim()}
                    className="p-2.5 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white disabled:opacity-40 transition cursor-pointer shadow-sm"
                    title="Send"
                  >
                    <Send className="w-5 h-5 font-bold" />
                  </button>
                </form>

              </div>
            ) : (
              /* TAB 2: ORIGINAL PHOTO VIEW CARD */
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border-4 border-white h-[510px] flex flex-col justify-end animate-in zoom-in-95 duration-200">
                <img
                  src={signatureDish.image}
                  alt={signatureDish.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 text-white relative z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-brand-accent px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase">
                      {lang === 'en' ? 'Signature Dish' : 'সিগনেচার পদ'}
                    </span>
                    <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {lang === 'en' ? 'Heritage Dum' : 'ঐতিহ্যবাহী দম'}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                    {lang === 'en' ? signatureDish.name : signatureDish.banglaName}
                  </h3>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-brand-gold">৳{signatureDish.price}</span>
                      {signatureDish.originalPrice && (
                        <span className="text-sm line-through text-white/70">৳{signatureDish.originalPrice}</span>
                      )}
                    </div>
                    <button
                      onClick={() => setDetailItem(signatureDish)}
                      className="px-4 py-2 rounded-xl bg-white text-brand-primary text-xs font-bold hover:bg-brand-gold hover:text-white transition cursor-pointer"
                    >
                      {lang === 'en' ? 'Quick View & Order' : 'বিস্তারিত ও অর্ডার'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Floating Live Badge at Top Right */}
            <div className="absolute -top-3 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-elevated border border-brand-border flex items-center gap-2.5 z-20 pointer-events-none">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Flame className="w-4 h-4 fill-amber-500" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-brand-muted leading-tight">
                  {lang === 'en' ? 'This Month' : 'এই মাসে'}
                </p>
                <p className="text-xs font-extrabold text-brand-charcoal leading-tight">
                  {lang === 'en' ? '5,000+ Biryani Served' : '৫০০০+ কাচ্চি অর্ডার'}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
