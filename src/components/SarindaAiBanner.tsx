import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Bot, Sparkles, Send, ArrowRight, Flame, Users, Calendar, Tag } from 'lucide-react';

export const SarindaAiBanner: React.FC = () => {
  const { lang, openAiWithPrompt, setIsAiChatOpen } = useStore();
  const [queryInput, setQueryInput] = useState('');

  // Dynamic cycling text phrases
  const phrases = lang === 'en' ? [
    "What is the best Biryani platter for 4 people?",
    "Show me today's 15% discount promo code",
    "Which mutton dishes are mild and non-spicy?",
    "Book a table for 6 in the VIP private cabin",
    "How much is the Shahi Borhani and Zafrani Firni?"
  ] : [
    "৪ জনের জন্য সেরা কাচ্চি ও রোস্টের কম্বো কী?",
    "আজকের ১৫% ডিসকাউন্টের কুপন কোড দেখান",
    "ঝাল ছাড়া বাচ্চাদের খাওয়ার উপযোগী পদ কী কী?",
    "৬ জনের জন্য ভিআইপি কেবিনে টেবিল বুক করতে চাই",
    "শাহী বোরহানি ও জাফরানী ফিরনির দাম কত?"
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
        if (displayedText.length === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentPhraseIndex, lang]);

  const handleAskSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const promptToSend = queryInput.trim() || displayedText;
    if (promptToSend) {
      openAiWithPrompt(promptToSend);
      setQueryInput('');
    }
  };

  const handleChipClick = (text: string) => {
    openAiWithPrompt(text);
  };

  return (
    <section className="py-12 bg-gradient-to-r from-brand-dark via-brand-primary to-brand-dark text-white relative overflow-hidden shadow-xl border-y border-brand-leaf/30">
      
      {/* Background Ambient Glow & Particles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-leaf/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Left Content Area */}
            <div className="max-w-2xl space-y-4">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-xs font-black uppercase tracking-wider shadow-sm">
                <Sparkles className="w-4 h-4 animate-spin [animation-duration:4s]" />
                <span>{lang === 'en' ? 'Sarinda AI Signature Innovation' : 'সারিন্দা এআই সিগনেচার ফিচার'}</span>
              </div>

              {/* Big Dynamic Headline as requested by user */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                {lang === 'en' ? (
                  <>
                    Find Food Instantly by Asking <span className="text-brand-gold">Sarinda AI</span>
                  </>
                ) : (
                  <>
                    খাবার ঝটপট খুঁজে নিন <span className="text-brand-gold">Sarinda AI</span> কে জিজ্ঞেস করে
                  </>
                )}
              </h2>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-brand-cream leading-relaxed font-bold">
                {lang === 'en'
                  ? 'Ask anything about our authentic recipes, spice levels, family meal recommendations, live pricing, and table bookings.'
                  : 'আমাদের আসল কাচ্চির স্বাদ, মশলার তীব্রতা, ফ্যামিলি কম্বো নির্বাচন, লাইভ দাম বা টেবিল বুকিং নিয়ে যেকোনো প্রশ্ন করুন।'}
              </p>

              {/* Dynamic Typewriter Question Bar */}
              <div className="pt-2">
                <form
                  onSubmit={handleAskSubmit}
                  className="relative flex items-center bg-white rounded-2xl p-2 shadow-2xl border-2 border-brand-gold/50 focus-within:border-brand-gold transition duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-primary text-brand-gold flex items-center justify-center shrink-0 ml-1">
                    <Bot className="w-6 h-6 animate-pulse" />
                  </div>

                  <input
                    type="text"
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    placeholder={displayedText || (lang === 'en' ? 'Ask Sarinda AI anything...' : 'সারিন্দা এআই-কে জিজ্ঞেস করুন...')}
                    className="flex-1 px-4 py-2.5 text-sm sm:text-base text-brand-charcoal placeholder:text-brand-muted/70 focus:outline-none font-bold"
                  />

                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition transform active:scale-95 cursor-pointer shrink-0"
                  >
                    <span>{lang === 'en' ? 'Ask AI' : 'জিজ্ঞেস করুন'}</span>
                    <Send className="w-4 h-4 font-bold" />
                  </button>
                </form>
              </div>

              {/* Quick AI Suggestion Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs sm:text-sm font-extrabold text-brand-cream mr-1">
                  {lang === 'en' ? 'Try Asking:' : 'ক্লিক করে ট্রাই করুন:'}
                </span>

                {[
                  {
                    icon: Users,
                    text: lang === 'en' ? '4 Person Family Feast' : '৪ জনের ফ্যামিলি খানা'
                  },
                  {
                    icon: Flame,
                    text: lang === 'en' ? 'Top Bestseller Kacchi' : 'বেস্টসেলার কাচ্চি'
                  },
                  {
                    icon: Tag,
                    text: lang === 'en' ? 'Today\'s 15% Off Code' : '১৫% ডিসকাউন্ট কোড'
                  },
                  {
                    icon: Calendar,
                    text: lang === 'en' ? 'Reserve a VIP Table' : 'ভিআইপি টেবিল বুকিং'
                  }
                ].map((chip, idx) => {
                  const ChipIcon = chip.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleChipClick(chip.text)}
                      className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-brand-gold hover:text-brand-dark border border-white/20 text-xs sm:text-sm font-bold text-brand-cream transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <ChipIcon className="w-4 h-4 text-brand-gold" />
                      <span>{chip.text}</span>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Right Card / Interactive AI Feature Preview */}
            <div className="lg:w-96 shrink-0">
              <div 
                onClick={() => setIsAiChatOpen(true)}
                className="bg-brand-dark/90 p-5 rounded-3xl border border-brand-leaf/40 shadow-2xl space-y-4 hover:border-brand-gold transition duration-300 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary border border-brand-gold/40 flex items-center justify-center text-brand-gold shadow-md group-hover:scale-110 transition duration-300">
                      <Bot className="w-7 h-7 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-white flex items-center gap-1.5">
                        Sarinda Concierge
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      </h4>
                      <p className="text-[11px] text-brand-gold font-medium">
                        Smart AI • Instant Answer
                      </p>
                    </div>
                  </div>

                  <span className="text-xs bg-white/10 text-brand-cream px-2.5 py-1 rounded-full group-hover:bg-brand-gold group-hover:text-brand-dark font-bold transition">
                    Open →
                  </span>
                </div>

                {/* Simulated Conversation Snippet */}
                <div className="space-y-2.5 pt-2 text-xs">
                  <div className="bg-white/10 p-2.5 rounded-2xl text-brand-cream/90 rounded-bl-none">
                    <span className="font-bold text-brand-gold block text-[10px] uppercase">You asked:</span>
                    "৪ জনের জন্য সেরা খাবার কী হবে?"
                  </div>

                  <div className="bg-brand-primary p-3 rounded-2xl text-white rounded-br-none border border-brand-leaf/40">
                    <span className="font-bold text-brand-gold block text-[10px] uppercase flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Sarinda AI:
                    </span>
                    "৪ জনের জন্য সারিন্দা রয়্যাল গ্র্যান্ড প্ল্যাটার (৳৯৯০) বা মাটন দম বিরিয়ানি সাথে চিকেন রোস্ট ও বোরহানি সেরা! কোড 'FAMILY20' দিয়ে ২০% ছাড় নিন।"
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-brand-cream/80 border-t border-white/10">
                  <span className="font-semibold">{lang === 'en' ? 'Click to start chatting' : 'চ্যাট শুরু করতে ক্লিক করুন'}</span>
                  <ArrowRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1 transition" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
