import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { translations } from '../data/translations';
import { Bot, X, Send, Sparkles, ShoppingBag, Calendar, MapPin, Tag } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  action?: {
    label: string;
    type: 'menu' | 'reservation' | 'offers' | 'contact';
  };
}

export const AiAssistant: React.FC = () => {
  const {
    lang,
    isAiChatOpen,
    setIsAiChatOpen,
    setActiveTab,
    setIsReservationOpen,
    menu,
    offers
  } = useStore();
  const t = translations[lang];

  const initialMessages: ChatMessage[] = [
    {
      id: 'msg-1',
      sender: 'ai',
      text: lang === 'en'
        ? "Hello! I am your Sarinda Foodie Concierge. I can help you find popular dishes, recommend family combos, check offers, or book a table. How can I assist you today?"
        : "নমস্কার ও আসসালামু আলাইকুম! আমি সারিন্দা রেস্তোরাঁর ফুডি সহকারী। সেরা খাবার নির্বাচন, ফ্যামিলি কম্বো বা টেবিল বুকিং এ আপনাকে সাহায্য করতে পারি। কি জানতে চান বলুন!"
    }
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedPrompts = [
    lang === 'en' ? "Show today's popular dishes" : "জনপ্রিয় খাবারগুলো দেখান",
    lang === 'en' ? "What can I order for 4 people?" : "৪ জনের জন্য কী অর্ডার করব?",
    lang === 'en' ? "Current discount offers" : "চলতি অফার কী আছে?",
    lang === 'en' ? "Book a dining table" : "একটি টেবিল বুক করতে চাই",
    lang === 'en' ? "Where are you located?" : "আপনাদের রেস্তোরাঁ কোথায়?"
  ];

  const generateAiReply = (userQuery: string): ChatMessage => {
    const q = userQuery.toLowerCase();

    // 1. Location / Hours
    if (q.includes('where') || q.includes('location') || q.includes('address') || q.includes('কোথায়') || q.includes('ঠিকানা')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: lang === 'en'
          ? "We are located at Road 16, Dhanmondi 27 (Old), Dhaka. We are open daily from 11:00 AM to 11:30 PM. We also offer fast home delivery across Dhanmondi, Lalmatia, Mohammadpur, and surrounding areas!"
          : "আমাদের ঠিকানা: রোড ১৬, ধানমন্ডি ২৭ (পুরাতন), ঢাকা। প্রতিদিন সকাল ১১:০০ থেকে রাত ১১:৩০ পর্যন্ত কিচেন খোলা থাকে। এছাড়া ধানমন্ডি ও আশেপাশের এলাকায় দ্রুত হোম ডেলিভারি দেওয়া হয়।",
        action: { label: lang === 'en' ? 'View Map & Contact' : 'ম্যাপ ও যোগাযোগ দেখুন', type: 'contact' }
      };
    }

    // 2. 4 people / family recommendations
    if (q.includes('4') || q.includes('family') || q.includes('people') || q.includes('চার জন') || q.includes('পরিবার')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: lang === 'en'
          ? "For 4 people, our best value recommendation is the 'Sarinda Royal Grand Platter' (৳990) or Basmati Mutton Dum Biryani (৳450) paired with Shahi Chicken Roast (৳180), Jali Kabab (৳50), and Shahi Borhani (৳110). You can also use code 'FAMILY20' for 20% off on orders over ৳1200!"
          : "৪ জনের জন্য আমাদের সেরা পরামর্শ হলো 'সারিন্দা রয়্যাল গ্র্যান্ড প্ল্যাটার' (৳৯৯০) অথবা বাসমতী মাটন দম বিরিয়ানি (৳৪৫০) সাথে বিয়ে বাড়ির চিকেন রোস্ট (৳১৮০) ও ঐতিহ্যবাহী বোরহানি বোতল (৳১১০)। এছাড়া ১২০০ টাকার বেশি অর্ডারে 'FAMILY20' কোড দিয়ে ২০% ছাড় উপভোগ করতে পারেন!",
        action: { label: lang === 'en' ? 'Open Menu to Order' : 'মেনু দেখুন ও অর্ডার করুন', type: 'menu' }
      };
    }

    // 3. Popular dishes / Biryani / Kacchi
    if (q.includes('popular') || q.includes('best') || q.includes('kacchi') || q.includes('biryani') || q.includes('কাচ্চি') || q.includes('জনপ্রিয়')) {
      const kacchi = menu.find(m => m.id === 'kacchi-special');
      const rezala = menu.find(m => m.id === 'mutton-rezala');
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: lang === 'en'
          ? `Our #1 bestseller is the '${kacchi?.name}' (৳${kacchi?.price}) featuring tender mutton slow-cooked with aged chinigura rice. Another crowd favorite is the '${rezala?.name}' (৳${rezala?.price}) served with hot roomali roti!`
          : `আমাদের শীর্ষ পদ হলো '${kacchi?.banglaName}' (৳${kacchi?.price}) যা সুগন্ধি চিনিগুঁড়া চাল ও রসালো খাসির মাংসে তৈরি। এছাড়া '${rezala?.banglaName}' (৳${rezala?.price}) ও রুমালী রুটিও অত্যন্ত জনপ্রিয়!`,
        action: { label: lang === 'en' ? 'Explore Menu' : 'মেনু দেখুন', type: 'menu' }
      };
    }

    // 4. Reservation / Table booking
    if (q.includes('book') || q.includes('table') || q.includes('reserve') || q.includes('বুকিং') || q.includes('টেবিল')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: lang === 'en'
          ? "We'd love to host you! We have comfortable Standard Dining, VIP Private Cabins, and a spacious Family Hall. Click below to pick your date, time, and party size."
          : "সারিন্দায় আপনাকে স্বাগত! আমাদের এখানে ফ্যামিলি হল, ভিআইপি কেবিন ও আরামদায়ক ডাইনিং রয়েছে। আপনার সুবিধাজনক সময় ও তারিখ বেছে নিতে নিচের বাটনে ক্লিক করুন।",
        action: { label: lang === 'en' ? 'Book a Table Now' : 'টেবিল বুকিং ফর্ম খুলুন', type: 'reservation' }
      };
    }

    // 5. Offers / Discounts
    if (q.includes('offer') || q.includes('discount') || q.includes('promo') || q.includes('code') || q.includes('অফার') || q.includes('ছাড়')) {
      const topOffer = offers[0];
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: lang === 'en'
          ? `Today's top offers:\n• Use code '${topOffer?.code}' for ${topOffer?.discountPercent}% OFF on orders over ৳${topOffer?.minOrder}.\n• Code 'FAMILY20' gives flat 20% off on weekend feasts!`
          : `আজকের সেরা অফার:\n• প্রোমোকোড '${topOffer?.code}' দিয়ে পাবেন ${topOffer?.discountPercent}% ছাড় (নূন্যতম ৳${topOffer?.minOrder} অর্ডার)।\n• 'FAMILY20' ব্যবহারে উইকেন্ডে পাবেন ২০% পর্যন্ত ছাড়!`,
        action: { label: lang === 'en' ? 'View All Offers' : 'সকল অফার দেখুন', type: 'offers' }
      };
    }

    // Default Fallback
    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: lang === 'en'
        ? "I can help you explore our menu, book a table, or answer questions about our authentic dishes like Royal Kacchi Biryani, Chicken Roast, Mutton Rezala, and Borhani. What would you like to know?"
        : "কাচ্চি বিরিয়ানি, চিকেন রোস্ট, মাটন রেজালা বা বোরহানির দাম ও অর্ডার সম্পর্কে যেকোনো প্রশ্ন করতে পারেন। অথবা সরাসরি টেবিল বুকিং ও ডেলিভারির তথ্য জানতে পারেন।",
      action: { label: lang === 'en' ? 'View Full Menu' : 'সম্পূর্ণ মেনু দেখুন', type: 'menu' }
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text.trim()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateAiReply(text);
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (action: NonNullable<ChatMessage['action']>) => {
    setIsAiChatOpen(false);
    if (action.type === 'reservation') {
      setIsReservationOpen(true);
    } else {
      setActiveTab(action.type);
      const target = document.getElementById(action.type);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Floating Launcher Button with Prominent Dynamic Callout */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-3">
        {/* Dynamic Tooltip Pill */}
        {!isAiChatOpen && (
          <div
            onClick={() => setIsAiChatOpen(true)}
            className="hidden md:flex items-center gap-2 bg-brand-dark/95 text-white py-2 px-3.5 rounded-2xl shadow-elevated border border-brand-gold/40 cursor-pointer animate-bounce duration-1000 backdrop-blur-md hover:bg-brand-dark transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-gold shrink-0 animate-spin [animation-duration:3s]" />
            <span className="text-xs font-bold text-brand-gold">
              {lang === 'en' ? 'Find food instantly by asking Sarinda AI' : 'খাবার ঝটপট খুঁজে নিন Sarinda AI কে জিজ্ঞেস করে'}
            </span>
          </div>
        )}

        <button
          onClick={() => setIsAiChatOpen(!isAiChatOpen)}
          className="relative group p-4 sm:px-5 rounded-3xl bg-brand-primary hover:bg-brand-dark text-white shadow-float hover:scale-105 transition-all duration-300 flex items-center gap-2.5 cursor-pointer border-2 border-brand-gold shadow-brand-gold/20"
          aria-label="Open Sarinda AI Concierge"
        >
          <div className="w-7 h-7 flex items-center justify-center">
            <Bot className="w-7 h-7 text-brand-gold animate-pulse" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-[10px] uppercase font-black tracking-wider text-brand-gold">
              {lang === 'en' ? 'Signature AI' : 'সিগনেচার এআই'}
            </p>
            <p className="font-bold text-xs text-white">
              {lang === 'en' ? 'Sarinda Concierge' : 'সারিন্দা সহকারী'}
            </p>
          </div>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-accent rounded-full border-2 border-white animate-ping" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-accent rounded-full border-2 border-white" />
        </button>
      </div>

      {/* Chat Window Modal */}
      {isAiChatOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-3xl shadow-2xl border border-brand-border overflow-hidden flex flex-col h-[520px] max-h-[80vh] animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-brand-primary text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center text-brand-gold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm leading-tight flex items-center gap-1.5">
                  Sarinda Foodie AI <Sparkles className="w-3 h-3 text-brand-gold" />
                </h3>
                <p className="text-[10px] text-brand-cream/70 font-medium">
                  {lang === 'en' ? 'Online • Menu & Reservation Expert' : 'অনলাইন • মেনু ও বুকিং সহকারী'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAiChatOpen(false)}
              className="p-1.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-brand-cream/30">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-brand-primary text-white rounded-br-none'
                      : 'bg-white text-brand-charcoal border border-brand-border shadow-xs rounded-bl-none whitespace-pre-line'
                  }`}
                >
                  {m.text}
                </div>

                {m.action && (
                  <button
                    onClick={() => handleActionClick(m.action!)}
                    className="mt-1.5 px-3 py-1.5 rounded-xl bg-brand-primary text-white text-[11px] font-bold shadow-xs hover:bg-brand-dark transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-brand-gold" />
                    <span>{m.action.label}</span>
                  </button>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white p-3 rounded-2xl border border-brand-border w-16">
                <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* Suggested Prompts Pills */}
          <div className="p-2 bg-brand-cream/60 border-t border-brand-border/60 overflow-x-auto flex gap-1.5 no-scrollbar">
            {suggestedPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 rounded-lg bg-white border border-brand-border text-[10px] font-semibold text-brand-charcoal hover:bg-brand-primary hover:text-white transition whitespace-nowrap shrink-0 cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-brand-border flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={lang === 'en' ? 'Ask about dishes, pricing, booking...' : 'খাবারের নাম বা টেবিল বুকিং নিয়ে জানতে লিখুন...'}
              className="flex-1 px-3.5 py-2 rounded-xl bg-brand-cream/40 border border-brand-border text-xs text-brand-charcoal focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 rounded-xl bg-brand-primary text-white hover:bg-brand-dark disabled:opacity-40 transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
