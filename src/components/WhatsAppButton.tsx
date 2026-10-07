import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  MessageCircle, 
  X, 
  Send, 
  Volume2, 
  VolumeX, 
  Settings, 
  ExternalLink, 
  Check, 
  CheckCheck, 
  Sparkles,
  Phone,
  Clock,
  MapPin,
  ShoppingBag,
  Mic,
  ChevronDown
} from 'lucide-react';

interface WAMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  time: string;
  isOrder?: boolean;
}

export const WhatsAppButton: React.FC = () => {
  const { lang, cart, cartCount, cartTotal, cartDeliveryFee, deliveryArea } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [customNumberInput, setCustomNumberInput] = useState('');
  
  // Test WhatsApp number (defaulting to 01852363235, user customizable)
  const [testWaNumber, setTestWaNumber] = useState<string>(() => {
    const saved = localStorage.getItem('sarinda_test_wa_number');
    if (!saved || saved === '01771232632') return '01852363235';
    return saved;
  });

  const getCleanPhone = (num: string) => {
    let clean = num.replace(/[^0-9]/g, '');
    if (clean.startsWith('01')) clean = '88' + clean;
    return clean || '8801852363235';
  };

  const getFormattedPhone = (num: string) => {
    const clean = getCleanPhone(num);
    if (clean.startsWith('880')) {
      const rest = clean.substring(3);
      return `+880 ${rest.slice(0, 4)}-${rest.slice(4)}`;
    }
    return `+${clean}`;
  };

  const getTimeString = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Audio Chime using Web Audio API
  const playWhatsAppTone = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(850, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1250, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {
      // AudioContext may be blocked before interaction
    }
  };

  const initialMessages: WAMessage[] = [
    {
      id: 'wa-msg-1',
      sender: 'agent',
      text: `আসসালামু আলাইকুম! সারিন্দা রেস্তোরাঁ ও ক্যাটারিং (সি কে ঘোষ রোড, ময়মনসিংহ)-এর অফিসিয়াল হোয়াটসঅ্যাপ লাইভ এজেন্টে স্বাগতম! 🍽️✨\n\nআমি সারিন্দার স্মার্ট এআই এজেন্ট। আমি অতি দ্রুত আপনার পছন্দের কাচ্চি বিরিয়ানি অর্ডার নেওয়া, মেনুর দাম জানানো এবং টেবিল বুকিং করতে সাহায্য করব।\n\nআজ আপনার জন্য কী খাবার দিতে পারি?`,
      time: getTimeString()
    }
  ];

  const [messages, setMessages] = useState<WAMessage[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isTyping]);

  const handleSaveCustomNumber = () => {
    if (customNumberInput.trim()) {
      const clean = customNumberInput.trim();
      setTestWaNumber(clean);
      localStorage.setItem('sarinda_test_wa_number', clean);
      setShowSettings(false);
    }
  };

  const handleResetDefaultNumber = () => {
    setTestWaNumber('01852363235');
    localStorage.setItem('sarinda_test_wa_number', '01852363235');
    setCustomNumberInput('01852363235');
    setShowSettings(false);
  };

  // Build direct WhatsApp Web URL for external redirection
  const buildExternalWhatsAppUrl = (customText?: string) => {
    const destination = getCleanPhone(testWaNumber);
    let message = '';

    if (customText) {
      message = customText;
    } else if (cart.length > 0) {
      const itemsList = cart
        .map((item) => {
          const name = lang === 'en' ? item.menuItem.name : item.menuItem.banglaName;
          const basePrice = item.selectedPortion ? item.selectedPortion.price : item.menuItem.price;
          const addonSum = item.selectedAddons.reduce((s, a) => s + a.price, 0);
          const lineTotal = (basePrice + addonSum) * item.quantity;
          return `• ${item.quantity}x ${name} — ৳${lineTotal}`;
        })
        .join('\n');

      message =
        `*আসসালামু আলাইকুম সারিন্দা রেস্তোরাঁ!* 🍽️\n` +
        `আমি সরাসরি ওয়েবসাইট থেকে নিচের খাবারগুলো অর্ডার করতে চাই:\n\n` +
        `*খাবারের তালিকা:*\n${itemsList}\n\n` +
        `-------------------------\n` +
        `• মোট আইটেম: ${cartCount}টি\n` +
        `• ডেলিভারি এলাকা: ${deliveryArea || 'সি কে ঘোষ রোড / টাউন হল, ময়মনসিংহ'}\n` +
        `• ডেলিভারি ফি: ৳${cartDeliveryFee}\n` +
        `• *সর্বমোট বিল:* ৳${cartTotal}\n` +
        `-------------------------\n\n` +
        `দয়া করে আমার অর্ডারটি কনফার্ম করুন ও ডেলিভারির সময় জানিয়ে দিন। ধন্যবাদ!`;
    } else {
      // Export current conversation if any
      const lastUserMsg = messages.filter(m => m.sender === 'user').pop();
      if (lastUserMsg) {
        message = `আসসালামু আলাইকুম সারিন্দা রেস্তোরাঁ! 🍽️\nআমার জিজ্ঞাসা/অর্ডার: ${lastUserMsg.text}`;
      } else {
        message =
          `আসসালামু আলাইকুম সারিন্দা রেস্তোরাঁ! 🍽️\n` +
          `আমি আপনাদের সুস্বাদু কাচ্চি বিরিয়ানি ও অন্যান্য খাবার অর্ডার করতে চাই। আজকের স্পেশাল মেনু ও হোম ডেলিভারি সম্পর্কে জানতে পারি কি?`;
      }
    }

    return `https://wa.me/${destination}?text=${encodeURIComponent(message)}`;
  };

  const handleLaunchExternalWhatsApp = (customText?: string) => {
    const url = buildExternalWhatsAppUrl(customText);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Send message to Gemini-backed /api/whatsapp
  const handleSend = async (overrideText?: string) => {
    const textToSend = (overrideText || inputText).trim();
    if (!textToSend || isTyping) return;

    const userMsg: WAMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: getTimeString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          from: getCleanPhone(testWaNumber),
          history: messages.map((m) => ({
            sender: m.sender === 'user' ? 'user' : 'model',
            text: m.text
          }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        const replyText = data.reply || data.text;
        if (replyText) {
          const isOrder = replyText.includes('প্রস্তুত করছি') || replyText.includes('৳') || replyText.includes('ডেলিভারি');
          const agentMsg: WAMessage = {
            id: `agt-${Date.now()}`,
            sender: 'agent',
            text: replyText,
            time: getTimeString(),
            isOrder
          };
          setMessages((prev) => [...prev, agentMsg]);
          setIsTyping(false);
          playWhatsAppTone();
          return;
        }
      }
    } catch (err) {
      console.warn('API error, using fast fallback:', err);
    }

    // Secondary fallback to /api/chat if /api/whatsapp had network issues
    try {
      const chatRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          lang: 'bn',
          history: messages.map((m) => ({ sender: m.sender, text: m.text }))
        })
      });
      if (chatRes.ok) {
        const chatData = await chatRes.json();
        if (chatData?.text) {
          const agentMsg: WAMessage = {
            id: `agt-${Date.now()}`,
            sender: 'agent',
            text: chatData.text,
            time: getTimeString(),
            isOrder: true
          };
          setMessages((prev) => [...prev, agentMsg]);
          setIsTyping(false);
          playWhatsAppTone();
          return;
        }
      }
    } catch (e) {
      // Continue to local fast generator
    }

    // Instant Local Bengali Engine (< 50ms)
    setTimeout(() => {
      const q = textToSend.toLowerCase();
      let fallbackText = `আসসালামু আলাইকুম! সারিন্দা রেস্তোরাঁ ও ক্যাটারিং (সি কে ঘোষ রোড, ময়মনসিংহ)-এ আপনাকে স্বাগতম। 🍽️\n\n`;

      if (q.includes('biriyani') || q.includes('biryani') || q.includes('kacchi') || q.includes('কাচ্চি') || q.includes('বিরিয়ানি')) {
        fallbackText += `জি অবশ্যই! আমাদের স্পেশাল কাচ্চি বিরিয়ানি (হাফ ৳৩৪০ / ফুল ৳৫৯০) গরম গরম প্রস্তুত রয়েছে।\n\n` +
          `💡 কাচ্চির সাথে কি ঠান্ডা শাহী বোরহানি (৳৭৫/৳১৫৫) নিবেন? কাচ্চির পর বোরহানি খেলে ভারী খাবার সহজে হজম হয় আর স্বাদটাও দ্বিগুণ হয়ে যায়!\n\n` +
          `আপনার ডেলিভারির সম্পূর্ণ ঠিকানা ও ফোন নাম্বারটি এখানে লিখলে আমরা ৩০-৪০ মিনিটের মধ্যে খাবার পৌঁছে দেব।`;
      } else if (q.includes('menu') || q.includes('দাম') || q.includes('price')) {
        fallbackText += `সারিন্দার আজকের স্পেশাল মেনু:\n` +
          `• স্পেশাল কাচ্চি বিরিয়ানি: ৳৩৪০ (হাফ) | ৳৫৯০ (ফুল)\n` +
          `• বাসমতী মাটন দম বিরিয়ানি: ৳৪৫০\n` +
          `• সরিষার তেলের বিফ তেহারী: ৳২৯০\n` +
          `• শাহী মোরগ পোলাও: ৳২৯০\n` +
          `• বিয়ে বাড়ির চিকেন রোস্ট: ৳১৮০\n` +
          `• ঠান্ডা শাহী বোরহানি: ৳৭৫ (গ্লাস) | ৳১৫৫ (৫০০মি.লি.)\n\n` +
          `ময়মনসিংহের যেকোনো এলাকায় গরম ডেলিভারি পেতে পছন্দের খাবার লিখে জানান!`;
      } else {
        fallbackText += `আমি সারিন্দার লাইভ এজেন্ট। আপনি কি খাবার অর্ডার করতে চান, নাকি আজকের মেনু ও টেবিল বুকিং নিয়ে জানতে চান?\n\n` +
          `হটলাইন: +880 1852-363235\nঠিকানা: সি কে ঘোষ রোড, ময়মনসিংহ।`;
      }

      const agentMsg: WAMessage = {
        id: `agt-${Date.now()}`,
        sender: 'agent',
        text: fallbackText,
        time: getTimeString(),
        isOrder: true
      };
      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
      playWhatsAppTone();
    }, 250);
  };

  const quickChips = [
    { label: '🍛 ২টা কাচ্চি বিরিয়ানি অর্ডার', prompt: 'আসসালামু আলাইকুম! আমি ২ প্লেট স্পেশাল কাচ্চি বিরিয়ানি ও শাহী বোরহানি অর্ডার করতে চাই।' },
    { label: '📜 আজকের স্পেশাল মেনু ও দাম', prompt: 'আপনাদের আজকের স্পেশাল মেনু ও সব খাবারের দাম জানতে চাই।' },
    { label: '🥤 ঠান্ডা শাহী বোরহানি আছে?', prompt: 'কাচ্চির সাথে শাহী বোরহানি ও সাইড ডিশ কী কী পাওয়া যাবে?' },
    { label: '🪑 টেবিল বা কেবিন বুকিং', prompt: 'আমি আজ পরিবারের জন্য একটি টেবিল বা ফ্যামিলি কেবিন বুকিং করতে চাই।' },
    { label: '🛵 ডেলিভারি সময় ও চার্জ', prompt: 'ময়মনসিংহ শহরে হোম ডেলিভারির সময় এবং চার্জ কত?' }
  ];

  return (
    <>
      {/* Floating WhatsApp Launcher Button */}
      <div className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 flex items-center gap-3">
        {/* Animated Tooltip Pill (Desktop) */}
        <div
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
            } else {
              setShowMenu(!showMenu);
            }
          }}
          className="hidden md:flex items-center gap-2.5 bg-[#075E54] text-white py-2 px-3.5 rounded-2xl shadow-elevated border border-[#25D366]/40 cursor-pointer hover:bg-[#128C7E] transition backdrop-blur-md group"
          title="ক্লিক করে সরাসরি হোয়াটসঅ্যাপ বা লাইভ এআই এজেন্টের সাথে কথা বলুন"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-ping" />
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-white group-hover:underline flex items-center gap-1.5">
              <span>{lang === 'en' ? 'Live WhatsApp & AI Agent' : 'হোয়াটসঅ্যাপ ও লাইভ এআই এজেন্ট'}</span>
              <span className="text-[10px] bg-[#25D366] text-black font-extrabold px-1.5 py-0.2 rounded-full">01852363235</span>
            </span>
            <span className="text-[10px] text-emerald-200">
              টেস্ট নম্বর: {getFormattedPhone(testWaNumber)}
            </span>
          </div>
        </div>

        {/* WhatsApp Main Pulsing Button */}
        <div className="relative">
          <button
            onClick={() => {
              if (isOpen) {
                setIsOpen(false);
              } else {
                setShowMenu(!showMenu);
              }
            }}
            className="relative group p-3.5 sm:p-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-float hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border-2 border-white shadow-[#25D366]/40"
            aria-label="WhatsApp Live Agent"
            title="সারিন্দা হোয়াটসঅ্যাপ এআই এজেন্টের সাথে লাইভ চ্যাট বা মেসেজ করুন"
          >
            {/* WhatsApp Vector Icon */}
            <svg
              className="w-7 h-7 fill-current drop-shadow-xs"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.031 2C6.496 2 2 6.496 2 12.031c0 1.77.462 3.498 1.34 5.021L2 22l5.086-1.332A9.98 9.98 0 0 0 12.03 22c5.536 0 10.03-4.496 10.03-10.031C22.062 6.496 17.568 2 12.031 2zm0 18.337a8.27 8.27 0 0 1-4.228-1.157l-.303-.18-3.14.823.838-3.059-.197-.314A8.272 8.272 0 0 1 3.766 12.03c0-4.557 3.708-8.265 8.265-8.265 4.557 0 8.265 3.708 8.265 8.265 0 4.557-3.708 8.265-8.265 8.265zm4.536-6.19c-.248-.125-1.47-.726-1.698-.809-.228-.083-.394-.125-.56.125-.166.249-.644.809-.789.975-.145.166-.29.187-.539.062-.249-.125-1.05-.387-2-1.234-.739-.66-1.238-1.474-1.383-1.723-.145-.249-.015-.383.109-.507.112-.112.249-.29.373-.435.125-.145.166-.249.249-.415.083-.166.041-.311-.021-.435-.062-.125-.56-1.349-.768-1.847-.202-.486-.407-.42-.56-.428l-.477-.008c-.166 0-.436.062-.664.311-.228.249-.871.851-.871 2.075s.892 2.407 1.017 2.573c.125.166 1.754 2.679 4.249 3.757.594.257 1.058.41 1.42.525.597.19 1.14.163 1.569.099.479-.071 1.47-.602 1.678-1.183.208-.581.208-1.079.145-1.183-.062-.104-.228-.166-.477-.291z" />
            </svg>

            {/* Cart Count Badge if items exist */}
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-accent text-white font-extrabold text-[11px] min-w-5 h-5 px-1 rounded-full flex items-center justify-center border-2 border-white animate-bounce shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* Pulsing ring indicator */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping -z-10" />
        </div>
      </div>

      {/* QUICK CHOICE FLYOUT MENU */}
      {showMenu && !isOpen && (
        <div className="fixed bottom-36 sm:bottom-24 left-4 sm:left-6 z-50 w-72 sm:w-80 bg-white rounded-3xl shadow-2xl border border-brand-border p-4 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2.5 border-b border-brand-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-xs text-brand-charcoal">সারিন্দা WhatsApp হাব</p>
                <p className="text-[10px] text-brand-muted">টেস্ট নম্বর: {getFormattedPhone(testWaNumber)}</p>
              </div>
            </div>
            <button
              onClick={() => setShowMenu(false)}
              className="p-1 rounded-lg text-brand-muted hover:text-brand-charcoal hover:bg-brand-cream transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {/* Option 1: Direct Real WhatsApp to 01852363235 */}
            <button
              onClick={() => {
                setShowMenu(false);
                handleLaunchExternalWhatsApp();
              }}
              className="w-full text-left p-3 rounded-2xl bg-[#E7F8E8] hover:bg-[#25D366] hover:text-white transition group border border-[#25D366]/30 cursor-pointer shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#075E54] group-hover:text-white flex items-center gap-1.5">
                  <span>📱 সরাসরি WhatsApp খুলুন</span>
                </span>
                <span className="text-[10px] bg-[#25D366] text-white group-hover:bg-white group-hover:text-black font-extrabold px-1.5 py-0.5 rounded-full">
                  ১-ক্লিক
                </span>
              </div>
              <p className="text-[10.5px] text-neutral-600 group-hover:text-white/90 mt-1 leading-snug">
                সরাসরি আপনার WhatsApp অ্যাপে <strong>{getFormattedPhone(testWaNumber)}</strong> নম্বরে চ্যাট ও অর্ডার পাঠান।
              </p>
            </button>

            {/* Option 2: Live AI Agent Right on Website */}
            <button
              onClick={() => {
                setShowMenu(false);
                setIsOpen(true);
              }}
              className="w-full text-left p-3 rounded-2xl bg-[#075E54] hover:bg-[#128C7E] text-white transition group cursor-pointer shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-spin [animation-duration:3s]" />
                  <span>🤖 সারিন্দা AI লাইভ এজেন্ট</span>
                </span>
                <span className="text-[10px] bg-emerald-400 text-black font-extrabold px-1.5 py-0.5 rounded-full">
                  VERY FAST
                </span>
              </div>
              <p className="text-[10.5px] text-emerald-100 mt-1 leading-snug">
                ওয়েবসাইটে বসেই Gemini এআই-এর সাথে লাইভ চ্যাট করে কাচ্চি অর্ডার বা মেনুর তথ্য জানুন।
              </p>
            </button>
          </div>

          <div className="mt-2.5 pt-2 border-t border-brand-border flex items-center justify-between text-[10px] text-brand-muted">
            <span>নম্বর পরিবর্তন করতে চান?</span>
            <button
              onClick={() => {
                setShowMenu(false);
                setShowSettings(true);
                setIsOpen(true);
              }}
              className="text-[#075E54] hover:underline font-bold cursor-pointer"
            >
              সেটিংস ⚙️
            </button>
          </div>
        </div>
      )}

      {/* FULL INTERACTIVE WHATSAPP LIVE AGENT MODAL */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:left-6 z-50 flex flex-col w-full sm:w-[420px] h-[100dvh] sm:h-[620px] max-h-[100dvh] sm:max-h-[85vh] bg-[#EFEAE2] sm:rounded-3xl shadow-2xl border border-neutral-300 overflow-hidden animate-in slide-in-from-bottom-5 duration-300 font-sans">
          
          {/* WhatsApp Header (#075E54 to #128C7E) */}
          <div className="bg-[#075E54] text-white p-3.5 sm:p-4 flex flex-col gap-2 shadow-md shrink-0">
            <div className="flex items-center justify-between">
              
              {/* Profile Avatar & Info */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-[#25D366] flex items-center justify-center text-white font-black overflow-hidden shadow-inner">
                    <span className="text-sm">🍛</span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-[#075E54] rounded-full" />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm leading-tight text-white">
                      সারিন্দা রেস্তোরাঁ ও ক্যাটারিং
                    </h3>
                    {/* WhatsApp Verified Badge */}
                    <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#25D366] text-white text-[9px] font-bold" title="Verified WhatsApp Account">
                      ✓
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                    <span>অনলাইন • Sarinda AI লাইভ এজেন্ট</span>
                  </div>
                </div>
              </div>

              {/* Header Action Icons */}
              <div className="flex items-center gap-1">
                {/* Audio chime toggle */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
                  title={soundEnabled ? 'সাউন্ড বন্ধ করুন' : 'সাউন্ড চালু করুন'}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-white/50" />}
                </button>

                {/* Tester number settings */}
                <button
                  onClick={() => {
                    setCustomNumberInput(testWaNumber);
                    setShowSettings(!showSettings);
                  }}
                  className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
                  title="টেস্ট WhatsApp নম্বর পরিবর্তন করুন"
                >
                  <Settings className="w-4 h-4" />
                </button>

                {/* Open in real WhatsApp button */}
                <button
                  onClick={() => handleLaunchExternalWhatsApp()}
                  className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
                  title="আসল WhatsApp অ্যাপে খুলুন"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer ml-1"
                  title="চ্যাট বন্ধ করুন"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Test WhatsApp Number Bar */}
            <div className="flex items-center justify-between bg-black/20 backdrop-blur-sm rounded-xl px-2.5 py-1.5 text-[11px] border border-white/10">
              <div className="flex items-center gap-1.5 text-emerald-100">
                <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                <span>টেস্ট নম্বর:</span>
                <span className="font-mono font-bold text-white bg-white/15 px-1.5 py-0.5 rounded">
                  {getFormattedPhone(testWaNumber)}
                </span>
              </div>
              <button
                onClick={() => handleLaunchExternalWhatsApp()}
                className="text-[#25D366] hover:text-white font-bold text-[10px] flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>আসল WhatsApp খুলুন</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Tester Number Settings Popover */}
          {showSettings && (
            <div className="bg-white p-3.5 border-b border-brand-border shadow-md animate-in slide-in-from-top-2 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-brand-charcoal">টেস্ট WhatsApp নম্বর কনফিগারেশন:</span>
                <button onClick={() => setShowSettings(false)} className="text-brand-muted hover:text-brand-charcoal">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[11px] text-brand-muted mb-2.5 leading-relaxed">
                এখানে আপনার নিজের WhatsApp নম্বর বা যেকোনো নম্বর দিন। এর ফলে মেসেজ বা অর্ডার টেস্ট করার সময় সরাসরি আপনার নির্দিষ্ট নম্বরে যাবে।
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customNumberInput}
                  onChange={(e) => setCustomNumberInput(e.target.value)}
                  placeholder="যেমন: 01852363235 বা 017..."
                  className="flex-1 px-3 py-1.5 text-xs border border-brand-border rounded-lg focus:outline-none focus:border-[#25D366]"
                />
                <button
                  onClick={handleSaveCustomNumber}
                  className="px-3 py-1.5 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#20ba59] transition cursor-pointer"
                >
                  সংরক্ষণ
                </button>
                <button
                  onClick={handleResetDefaultNumber}
                  className="px-2 py-1.5 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-neutral-200 transition text-[10px] cursor-pointer"
                  title="ডিফল্ট নম্বরে রিসেট করুন"
                >
                  রিসেট
                </button>
              </div>
            </div>
          )}

          {/* WhatsApp Chat Area */}
          <div 
            className="flex-1 overflow-y-auto p-3.5 space-y-3 relative"
            style={{
              backgroundColor: '#ECE5DD',
              backgroundImage: 'radial-gradient(#d4cbbe 0.75px, transparent 0.75px)',
              backgroundSize: '16px 16px'
            }}
          >
            {/* End-to-end encryption simulation badge */}
            <div className="flex justify-center my-1">
              <div className="bg-[#FFEECD] text-[#54656F] text-[10.5px] px-3 py-1.5 rounded-lg shadow-2xs border border-[#F2DEB0] max-w-[90%] text-center flex items-center justify-center gap-1.5">
                <span>🔒</span>
                <span>এন্ড-টু-এন্ড এনক্রিপ্টেশন সিমুলেশন • সারিন্দা জেমিনি এআই লাইভ এজেন্ট সার্বক্ষণিক সক্রিয়</span>
              </div>
            </div>

            {/* Date Badge */}
            <div className="flex justify-center my-1">
              <span className="bg-white/80 backdrop-blur-xs text-[#54656F] text-[10px] font-semibold px-2.5 py-0.5 rounded-md shadow-2xs">
                আজ
              </span>
            </div>

            {/* Messages Stream */}
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in duration-200`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3 shadow-xs text-xs relative ${
                      isUser
                        ? 'bg-[#DCF8C6] text-neutral-900 rounded-tr-none border border-[#c3ebb2]'
                        : 'bg-white text-neutral-900 rounded-tl-none border border-neutral-200/60'
                    }`}
                  >
                    {/* Sender Label for Agent */}
                    {!isUser && (
                      <div className="flex items-center gap-1.5 mb-1 pb-1 border-b border-neutral-100">
                        <span className="font-bold text-[11px] text-[#075E54]">
                          সারিন্দা Foodie AI
                        </span>
                        <span className="text-[9px] bg-[#E7F8E8] text-[#075E54] px-1.5 py-0.2 rounded font-semibold">
                          লাইভ এজেন্ট
                        </span>
                      </div>
                    )}

                    {/* Message Body with clean paragraphs */}
                    <div className="whitespace-pre-wrap leading-relaxed text-neutral-800">
                      {m.text}
                    </div>

                    {/* Optional Order / WhatsApp Redirection button inside Agent message */}
                    {!isUser && (
                      <div className="mt-2.5 pt-2 border-t border-neutral-100 flex flex-wrap gap-2">
                        <button
                          onClick={() => handleLaunchExternalWhatsApp(m.text)}
                          className="w-full py-1.5 px-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-[11px] rounded-xl flex items-center justify-center gap-1.5 shadow-2xs transition cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M12.031 2C6.496 2 2 6.496 2 12.031c0 1.77.462 3.498 1.34 5.021L2 22l5.086-1.332A9.98 9.98 0 0 0 12.03 22c5.536 0 10.03-4.496 10.03-10.031C22.062 6.496 17.568 2 12.031 2zm0 18.337a8.27 8.27 0 0 1-4.228-1.157l-.303-.18-3.14.823.838-3.059-.197-.314A8.272 8.272 0 0 1 3.766 12.03c0-4.557 3.708-8.265 8.265-8.265 4.557 0 8.265 3.708 8.265 8.265 0 4.557-3.708 8.265-8.265 8.265zm4.536-6.19c-.248-.125-1.47-.726-1.698-.809-.228-.083-.394-.125-.56.125-.166.249-.644.809-.789.975-.145.166-.29.187-.539.062-.249-.125-1.05-.387-2-1.234-.739-.66-1.238-1.474-1.383-1.723-.145-.249-.015-.383.109-.507.112-.112.249-.29.373-.435.125-.145.166-.249.249-.415.083-.166.041-.311-.021-.435-.062-.125-.56-1.349-.768-1.847-.202-.486-.407-.42-.56-.428l-.477-.008c-.166 0-.436.062-.664.311-.228.249-.871.851-.871 2.075s.892 2.407 1.017 2.573c.125.166 1.754 2.679 4.249 3.757.594.257 1.058.41 1.42.525.597.19 1.14.163 1.569.099.479-.071 1.47-.602 1.678-1.183.208-.581.208-1.079.145-1.183-.062-.104-.228-.166-.477-.291z"/>
                          </svg>
                          <span>আসল WhatsApp-এ নিশ্চিত করুন ({getFormattedPhone(testWaNumber)})</span>
                        </button>
                      </div>
                    )}

                    {/* Timestamp & Double Blue Ticks */}
                    <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-neutral-500">
                      <span>{m.time}</span>
                      {isUser && (
                        <CheckCheck className="w-3.5 h-3.5 text-[#34B7F1]" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-in fade-in duration-150">
                <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-xs text-xs border border-neutral-200/60 flex items-center gap-2">
                  <span className="text-[11px] text-[#075E54] font-semibold">
                    সারিন্দা এআই লিখছে...
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Interactive Suggestion Chips */}
          <div className="bg-[#F0F2F5] px-3 py-2 border-t border-neutral-200/80 shrink-0">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip.prompt)}
                  disabled={isTyping}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white hover:bg-[#25D366] hover:text-white text-neutral-700 text-[11px] font-semibold border border-neutral-300 shadow-2xs transition cursor-pointer disabled:opacity-50"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* WhatsApp Style Input Bar */}
          <div className="bg-[#F0F2F5] p-2.5 sm:p-3 border-t border-neutral-200 flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleSend('আমাকে আজকের স্পেশাল কাচ্চি বিরিয়ানি ও বোরহানি সাজেস্ট করুন।')}
              className="p-2 text-neutral-500 hover:text-[#075E54] hover:bg-neutral-200 rounded-full transition cursor-pointer"
              title="এআই স্বয়ংক্রিয় প্রম্পট"
            >
              <Sparkles className="w-4 h-4 text-brand-gold" />
            </button>

            {/* Main Text Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex-1 flex items-center bg-white rounded-full px-3.5 py-1.5 border border-neutral-300 focus-within:border-[#25D366] shadow-inner"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="মেসেজ লিখুন (যেমন: ২টা কাচ্চি বিরিয়ানি নেব)..."
                className="w-full text-xs text-neutral-800 placeholder-neutral-400 bg-transparent focus:outline-none"
                disabled={isTyping}
              />
            </form>

            {/* Send Button */}
            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim() || isTyping}
              className={`p-2.5 rounded-full text-white transition flex items-center justify-center cursor-pointer shadow-md ${
                inputText.trim() && !isTyping
                  ? 'bg-[#25D366] hover:bg-[#20ba59] active:scale-95'
                  : 'bg-neutral-300 cursor-not-allowed text-neutral-500'
              }`}
              title="পাঠান"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};

export default WhatsAppButton;
