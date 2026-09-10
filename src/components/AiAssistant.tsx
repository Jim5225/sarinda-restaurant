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
    offers,
    initialAiPrompt,
    setInitialAiPrompt
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

  // Auto-send prompt when opened from banner or suggestion chip
  React.useEffect(() => {
    if (initialAiPrompt && initialAiPrompt.trim()) {
      const prompt = initialAiPrompt.trim();
      setInitialAiPrompt('');
      handleSend(prompt);
    }
  }, [initialAiPrompt]);

  const suggestedPrompts = [
    lang === 'en' ? "Show today's popular dishes" : "জনপ্রিয় খাবারগুলো দেখান",
    lang === 'en' ? "What can I order for 4 people?" : "৪ জনের জন্য কী অর্ডার করব?",
    lang === 'en' ? "Current discount offers" : "চলতি অফার কী আছে?",
    lang === 'en' ? "Book a dining table" : "একটি টেবিল বুক করতে চাই",
    lang === 'en' ? "Where are you located?" : "আপনাদের রেস্তোরাঁ কোথায়?"
  ];

  const generateAiReply = (userQuery: string): ChatMessage => {
    const q = userQuery.toLowerCase();

    // 1. Budget Query ("1000 tk", "1000 taka", "budget", "kom taka")
    if (q.includes('1000') || q.includes('১০০০') || q.includes('500') || q.includes('৫০০') || q.includes('budget') || q.includes('বাজেট') || q.includes('kom taka') || q.includes('kom dame')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "১,০০০ টাকা বাজেটের মধ্যে আমাদের সেরা ২টি ভ্যালু কম্বো:\n\n" +
          "• **অপশন ১ (গ্র্যান্ড প্ল্যাটার):** 'সারিন্দা রয়্যাল গ্র্যান্ড প্ল্যাটার' (৳৯৯০) — যাতে কাচ্চি, মোরগ পোলাও, রোস্ট, কাবাব ও বোরহানি একসাথে থাকে (৩-৪ জনের জন্য পারফেক্ট)!\n" +
          "• **অপশন ২ (কাচ্চি লাভার কম্বো):** ২x স্পেশাল কাচ্চি বিরিয়ানি (৳৬৮০) + ২x শাহী বোরহানি গ্লাস (৳১৫০) + ২x জালি কাবাব (৳১০০) = মোট মাত্র ৳৯৩০!",
        action: { label: lang === 'en' ? 'Order Budget Feast' : 'বাজেট ভোজ অর্ডার করুন', type: 'menu' }
      };
    }

    // Helper to detect party size without confusing budget numbers
    const clean = q.replace(/1000|500|1200|1500|2000|৳|tk|taka/g, '');
    let partySize = 0;
    if (
      /\b(1|১|one)\b/i.test(clean) ||
      clean.includes('ekjon') ||
      clean.includes('একজন') ||
      clean.includes('এক জন') ||
      clean.includes('single') ||
      clean.includes('solo') ||
      clean.includes('1 jon') ||
      clean.includes('১ জন') ||
      clean.includes('1jon') ||
      clean.includes('১জন') ||
      clean.includes('1 person')
    ) {
      partySize = 1;
    } else if (
      /\b(2|২|two)\b/i.test(clean) ||
      clean.includes('duijon') ||
      clean.includes('দুইজন') ||
      clean.includes('দুই জন') ||
      clean.includes('couple') ||
      clean.includes('কাপল') ||
      clean.includes('2 jon') ||
      clean.includes('২ জন') ||
      clean.includes('2jon')
    ) {
      partySize = 2;
    } else if (
      /\b(3|৩|three)\b/i.test(clean) ||
      clean.includes('tinjon') ||
      clean.includes('তিনজন') ||
      clean.includes('তিন জন') ||
      clean.includes('3 jon') ||
      clean.includes('৩ জন') ||
      clean.includes('3jon')
    ) {
      partySize = 3;
    } else if (
      /\b(4|৪|four)\b/i.test(clean) ||
      clean.includes('charjon') ||
      clean.includes('চারজন') ||
      clean.includes('চার জন') ||
      clean.includes('4 jon') ||
      clean.includes('৪ জন') ||
      clean.includes('4jon')
    ) {
      partySize = 4;
    } else if (
      /\b(5|৫|five)\b/i.test(clean) ||
      clean.includes('pachjon') ||
      clean.includes('পাঁচজন') ||
      clean.includes('পাঁচ জন') ||
      clean.includes('5 jon') ||
      clean.includes('৫ জন') ||
      clean.includes('5jon')
    ) {
      partySize = 5;
    } else if (
      /\b(6|৬|7|৭|8|৮|9|৯|10|১০)\b/i.test(clean) ||
      clean.includes('dawat') ||
      clean.includes('দাওয়াত') ||
      clean.includes('party') ||
      clean.includes('gathering')
    ) {
      partySize = 6;
    }

    if (partySize === 1) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "১ জনের জন্য আমাদের প্রধান খাদ্য উপদেষ্টার সেরা শাহী মিল প্ল্যান:\n\n" +
          "• **অপশন ১ (সিগনেচার কাচ্চি থালি):**\n" +
          "  - ১x স্পেশাল কাচ্চি বিরিয়ানি (হাফ সাইজ, ডিমসহ) — ৳৩৫০\n" +
          "  - ১x ঠান্ডা শাহী বোরহানি (ছোট গ্লাস) — ৳৭৫\n" +
          "  - ১x জাফরানী শাহী ফিরনি — ৳৭০\n" +
          "  **সর্বমোট: ৳৪৯৫** (১ জনের জন্য একদম রাজকীয় ও তৃপ্তিদায়ক মিল!)\n\n" +
          "• **অপশন ২ (মোরগ পোলাও কম্বো):**\n" +
          "  - ১x ঐতিহ্যবাহী শাহী মোরগ পোলাও (আস্ত রোস্ট চিকেন লেগ ও ডিমসহ) — ৳২৯০\n" +
          "  - ১x স্পেশাল জালি কাবাব — ৳৫০\n" +
          "  - ১x শাহী বোরহানি — ৳৭৫\n" +
          "  **সর্বমোট: মাত্র ৳৪১৫!**\n\n" +
          "• **অপশন ৩ (সরিষার তেলের বিফ তেহারী):**\n" +
          "  - ১x বিফ তেহারী (৳২৯০) + ১x শাহী বোরহানি (৳৭৫) = **মোট মাত্র ৳৩৬৫!**\n\n" +
          "💡 প্রথম অনলাইন অর্ডারে প্রোমোকোড 'SARINDA15' ব্যবহার করে পেয়ে যান সরাসরি ১৫% বিশেষ ছাড়!",
        action: { label: lang === 'en' ? 'Order Solo Feast' : '১ জনের খাবার অর্ডার করুন', type: 'menu' }
      };
    }

    if (partySize === 2) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "২ জনের জন্য আমাদের পারফেক্ট রোমান্টিক/ফ্রেন্ডস কম্বিনেশন:\n\n" +
          "• ২x স্পেশাল কাচ্চি বিরিয়ানি (ডিমসহ হাফ) — ৳৭০০\n" +
          "• ১x বিয়ে বাড়ির চিকেন রোস্ট — ৳১৮০\n" +
          "• ১x শাহী বোরহানি (৫০০ মি.লি. বোতল) — ৳১৫৫\n" +
          "• ২x জাফরানী শাহী ফিরনি — ৳১৪০\n\n" +
          "মোট খরচ: ৳১,১৭৫।\n" +
          "💡 প্রথম অনলাইন অর্ডারে 'SARINDA15' প্রোমোকোড ব্যবহারে সরাসরি ১৫% ছাড় (৳১৭৬ সাশ্রয়) পেয়ে যাবেন মাত্র ৳৯৯৯ টাকায়!",
        action: { label: lang === 'en' ? 'View 2-Person Menu' : '২ জনের মেনু দেখুন ও অর্ডার করুন', type: 'menu' }
      };
    }

    if (partySize === 3) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "৩ জনের জন্য আমাদের প্রধান খাদ্য উপদেষ্টার সেরা ভোজ প্ল্যান:\n\n" +
          "• ৩x স্পেশাল কাচ্চি বিরিয়ানি (হাফ সাইজ) — ৳১,০২০\n" +
          "• ২x বিয়ে বাড়ির চিকেন রোস্ট — ৳৩৬০\n" +
          "• ১x শাহী বোরহানি (১ লিটার শেয়ারিং বোতল) — ৳৩২৫\n" +
          "• ৩x জাফরানী শাহী ফিরনি — ৳২১০\n\n" +
          "মোট খরচ: ৳১,৯১৫।\n" +
          "💡 সাশ্রয়ী টিপস: চেকআউটে প্রোমোকোড 'FAMILY20' বসালে সরাসরি ২০% ছাড় (৳৩৮৩ সাশ্রয়!) পাবেন, অর্থাৎ মাত্র ৳১,৫৩২ টাকায় ৩ জন মিলে জমিয়ে শাহী খাবার উপভোগ করতে পারবেন!",
        action: { label: lang === 'en' ? 'Order 3-Person Feast' : '৩ জনের খাবার অর্ডার করুন', type: 'menu' }
      };
    }

    if (partySize === 4) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "৪ জনের জন্য আমাদের প্রধান খাদ্য উপদেষ্টার সেরা শাহী ভোজ প্ল্যান:\n\n" +
          "• ২x স্পেশাল কাচ্চি বিরিয়ানি (ফুল সাইজ) — ৳১,১৮০\n" +
          "• ২x বিয়ে বাড়ির চিকেন রোস্ট — ৳৩৬০\n" +
          "• ১x ঐতিহ্যবাহী শাহী বোরহানি (১ লিটার শেয়ারিং বোতল) — ৳৩২৫\n" +
          "• ৪x জাফরানী শাহী ফিরনি — ৳২৮০\n\n" +
          "মোট খরচ: ৳২,১৪৫।\n" +
          "💡 সাশ্রয়ী টিপস: চেকআউটে প্রোমোকোড 'FAMILY20' বসালে সরাসরি ২০% ছাড় (৳৪২৯ সাশ্রয়!) পাবেন, অর্থাৎ মাত্র ৳১,৭১৬ টাকায় ৪ জন মিলে তৃপ্তি সহকারে রাজকীয় ভোজ উপভোগ করতে পারবেন!",
        action: { label: lang === 'en' ? 'Order 4-Person Feast' : '৪ জনের খাবার অর্ডার করুন', type: 'menu' }
      };
    }

    if (partySize === 5) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "৫ জনের জন্য আমাদের প্রধান খাদ্য উপদেষ্টার সেরা ভোজ প্ল্যান:\n\n" +
          "• ২x স্পেশাল কাচ্চি বিরিয়ানি (ফুল সাইজ) — ৳১,১৮০\n" +
          "• ১x বাসমতী মাটন দম বিরিয়ানি — ৳৪৫০\n" +
          "• ৩x বিয়ে বাড়ির চিকেন রোস্ট — ৳৫৪০\n" +
          "• ১x শাহী বোরহানি (১ লিটার শেয়ারিং বোতল) — ৳৩২৫\n" +
          "• ৫x জাফরানী শাহী ফিরনি — ৳৩৫০\n\n" +
          "মোট খরচ: ৳২,৮৪৫।\n" +
          "💡 সাশ্রয়ী টিপস: প্রোমোকোড 'FAMILY20' দিয়ে সরাসরি ২০% ছাড় (৳৫৬৯ সাশ্রয়!) পেয়ে পুরো ৫ জনের রাজকীয় আয়োজন পাবেন মাত্র ৳২,২৭৬ টাকায়!",
        action: { label: lang === 'en' ? 'Order 5-Person Feast' : '৫ জনের খাবার অর্ডার করুন', type: 'menu' }
      };
    }

    if (partySize === 6) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "৬ থেকে ১০ জনের বড় আড্ডা বা পারিবারিক দাওয়াতের জন্য আমাদের স্পেশাল পরামর্শ:\n\n" +
          "• ২x 'সারিন্দা রয়্যাল গ্র্যান্ড প্ল্যাটার' (৳৯৯০ করে) — ৳১,৯৮০ (এতে কাচ্চি, মোরগ পোলাও, রোস্ট, কাবাব ও ফিরনি অন্তর্ভুক্ত)\n" +
          "• ১x স্পেশাল কাবাব প্ল্যাটার — ৳৬৫০\n" +
          "• ২ লিটার ঠান্ডা শাহী বোরহানি — ৳৬৫০\n\n" +
          "মোট খরচ: ৳৩,২৮০।\n" +
          "💡 ১২০০ টাকার বেশি অর্ডারে 'FAMILY20' কোড ব্যবহারে সরাসরি ২০% ছাড় (৳৬৫৬ সাশ্রয়!) পেয়ে যাবেন মাত্র ৳২,৬২৪ টাকায়!",
        action: { label: lang === 'en' ? 'Explore Family Platters' : 'গ্র্যান্ড প্ল্যাটার দেখুন', type: 'menu' }
      };
    }

    // 5. Kacchi Pairings & Sides (e.g. "kacchi r sathe ki khabo", "biryani r sathe ki nebo")
    if (q.includes('sathe') || q.includes('সাথে') || q.includes('side') || q.includes('pairing')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "কাচ্চি বিরিয়ানির সাথে পুরান ঢাকার আসল শাহী তৃপ্তি পেতে আমাদের প্রধান খাদ্য উপদেষ্টার সেরা কম্বিনেশন:\n\n" +
          "• **বিয়ে বাড়ির চিকেন রোস্ট (৳১৮০):** কাচ্চির ভাতের সাথে রোস্টের মিষ্টি-ঝাল বাদাম বাটা গ্রেভির মাখামাখি মুখে অমৃতের মতো লাগে!\n" +
          "• **শাহী মাটন রেজালা (৳৩২০):** দই, পোস্তদানা ও কাজুবাদামের ক্রিমি গ্রেভি কাচ্চির স্বাদকে দ্বিগুণ করে দেয়।\n" +
          "• **ঠান্ডা শাহী বোরহানি (৳৭৫/৳১৫৫):** পুদিনা ও টক দইয়ের তৈরি ঐতিহ্যবাহী বোরহানি যা ভারী খাবার সহজে হজমে সাহায্য করে।\n" +
          "• **জাফরানী শাহী ফিরনি (৳৭০):** মাটির পাত্রে জমানো খাঁটি দুধের ফিরনি ভোজনের শেষে মিষ্টি সমাপ্তি এনে দেবে!",
        action: { label: lang === 'en' ? 'View Kacchi & Sides' : 'কাচ্চি ও সাইড ডিশ অর্ডার করুন', type: 'menu' }
      };
    }

    // 6. Ingredients / What's inside (e.g. "biriyani r moddhe ki ki ache ?", "kacchi te ki ache")
    const isIngredientQuery =
      q.includes('ki ki ache') ||
      q.includes('ki thake') ||
      q.includes('কী কী আছে') ||
      q.includes('কী থাকে') ||
      q.includes('উপাদান') ||
      q.includes('উপকরণ') ||
      q.includes('ingredients') ||
      q.includes('inside') ||
      q.includes('recipe') ||
      ((q.includes('kacchi') || q.includes('biryani') || q.includes('biriyani') || q.includes('কাচ্চি')) &&
        (q.includes('moddhe') || q.includes('ki ache') || q.includes('ki thake') || q.includes('banay') || q.includes('ranna')));

    if (isIngredientQuery) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "সারিন্দার ঐতিহ্যবাহী 'স্পেশাল কাচ্চি বিরিয়ানি' তৈরি হয় আসল পুরান ঢাকার রাজকীয় খাস রেসিপিতে। এর মধ্যে থাকে:\n\n" +
          "• **সুগন্ধি পোলাও চাল:** প্রিমিয়াম গ্রেডের সুবাসিত চিনিগুঁড়া চাল (বাসমতী ভ্যারিয়েন্টে লং-গ্রেইন বাসমতী চাল)।\n" +
          "• **রসালো দেশি খাসির মাংস:** স্পেশাল শাহী মশলায় ম্যারিনেট করা টাটকা দেশি খাসির বড় ও তুলতুলে সাইজের মাংসের পিস।\n" +
          "• **গাওয়া ঘি ও সরিষার তেল:** খাঁটি গাওয়া ঘি ও ঘানিভাঙা খাঁটি সরিষার তেলে মাটির হাঁড়িতে খাঁটি দমে রান্না।\n" +
          "• **শাহী মশলাপাতি:** আসল জাফরান, জয়ত্রী, জয়ফল, আলুবোখারা, দারুচিনি, ছোট এলাচ ও তেজপাতা।\n" +
          "• **রসালো স্পেশাল আলু:** ঘিয়ে ভাজা সোনালী রঙের রসালো ও তুলতুলে স্পেশাল দম আলু।\n" +
          "• **ডিম ও চাটনি:** ডিমসহ ভ্যারিয়েন্টে সিদ্ধ ডিম, সাথে থাকে ফ্রেশ শসা-লেবুর শাহী সালাদ ও পুদিনা-টমেটোর চাটনি!\n\n" +
          "💡 সারিন্দায় কোনো ক্ষতিকর কৃত্রিম রঙ বা ফ্লেভার দেওয়া হয় না—প্রতিটি লোকমা শতভাগ স্বাস্থ্যসম্মত ও খাঁটি স্বাদে ভরপুর!",
        action: { label: lang === 'en' ? 'Order Special Kacchi' : 'কাচ্চি বিরিয়ানি অর্ডার করুন', type: 'menu' }
      };
    }

    // 7. Kids / Mild
    if (q.includes('ঝাল') || q.includes('বাচ্চা') || q.includes('bacha') || q.includes('bachader') || q.includes('mild') || q.includes('kid') || q.includes('spicy') || q.includes('non-spicy') || q.includes('jhal')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "বাচ্চা বা যারা মিষ্টি-সুস্বাদু ও কম ঝালের খাবার পছন্দ করেন তাদের জন্য সেরা খাবার:\n\n" +
          "• **শাহী মোরগ পোলাও (৳২৯০):** মিষ্টি ঘিয়ে রান্না সুগন্ধি পোলাও ও তুলতুলে চিকেন রোস্ট লেগ পিস—ঝালহীন ও অত্যন্ত মুখরোচক।\n" +
          "• **বিয়ে বাড়ির চিকেন রোস্ট (৳১৮০):** পেঁয়াজ বেরেস্তা, বাদাম বাটা ও কিশমিশের গ্রেভিতে তৈরি মিষ্টি-ঝাল স্বাদ যা বাচ্চারা দারুণ পছন্দ করে।\n" +
          "• **শাহী মাটন রেজালা (৳৩২০):** দই ও কাজুবাদামের ক্রিমি ঝোল, যাতে লাল মরিচের কোনো তীব্র ঝাল নেই।\n" +
          "• **জাফরানী শাহী ফিরনি (৳৭০):** মিষ্টি ডেজার্ট হিসেবে বাচ্চাদের অসম্ভব প্রিয়!",
        action: { label: lang === 'en' ? 'Browse Mild Dishes' : 'কম ঝালের মেনু দেখুন', type: 'menu' }
      };
    }

    // 8. Beef Tehari
    if (q.includes('tehari') || q.includes('তেহারী') || q.includes('তেহারি')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "আমাদের খাঁটি পুরান ঢাকার 'বিফ তেহারী' (৳২৯০):\n\n" +
          "ঘানিভাঙা খাঁটি সরিষার তেলে ছোট এলাচ, দারুচিনি ও কাঁচামরিচ দিয়ে সুগন্ধি চিনিগুঁড়া চাল ও নরম তুলতুলে গরুর মাংসের টুকরো একসাথে রান্না করা হয়। তেল-মশলার ভারসাম্য নিখুঁত হওয়ায় খাওয়ার পর কোনো ভারী ভাব থাকে না! সাথে দেওয়া হয় শসা-লেবুর ফ্রেশ সালাদ।",
        action: { label: lang === 'en' ? 'Order Beef Tehari' : 'বিফ তেহারী অর্ডার করুন', type: 'menu' }
      };
    }

    // 9. Morog Polao
    if (q.includes('polao') || q.includes('মোরগ') || q.includes('পোলাও') || q.includes('morog')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "আমাদের 'শাহী মোরগ পোলাও' (৳২৯০):\n\n" +
          "ঐতিহ্যবাহী পুরান ঢাকার বিয়ের বাড়ির রন্ধনশৈলীতে খাঁটি গাওয়া ঘিয়ে রান্না সুগন্ধি চিনিগুঁড়া পোলাও, তার ওপর বড় সাইজের আস্ত রোস্ট চিকেন লেগ পিস এবং ডিম। মিষ্টি বাদাম-বেরেস্তার শাহী গ্রেভি দিয়ে পরিবেশন করা হয়।",
        action: { label: lang === 'en' ? 'Order Morog Polao' : 'মোরগ পোলাও অর্ডার করুন', type: 'menu' }
      };
    }

    // 10. Table / Cabin
    if (q.includes('book') || q.includes('table') || q.includes('reserve') || q.includes('বুকিং') || q.includes('টেবিল') || q.includes('কেবিন') || q.includes('cabin')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "সারিন্দায় আপনাকে স্বাগত! আমাদের ধানমন্ডি শাখায় রয়েছে সুপরিসর ফ্যামিলি ডাইনিং হল এবং একান্ত পারিবারিক বা ব্যবসায়িক আড্ডার জন্য সাউন্ডপ্রুফ ভিআইপি প্রাইভেট কেবিন। কোনো বুকিং ফি ছাড়াই আপনি অনলাইন থেকে সরাসরি তারিখ, সময় ও সিট বেছে নিতে পারবেন!",
        action: { label: lang === 'en' ? 'Book a Table Now' : 'টেবিল বুকিং ফর্ম খুলুন', type: 'reservation' }
      };
    }

    // 11. Delivery Info
    if (q.includes('delivery') || q.includes('ডেলিভারি') || q.includes('home') || q.includes('somoy') || q.includes('time')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "সারিন্দার দ্রুত হোম ডেলিভারি সেবা:\n\n" +
          "ধানমন্ডি, লালমাটিয়া, মোহাম্মদপুর ও সংলগ্ন এলাকায় মাত্র ৩০ থেকে ৪০ মিনিটের মধ্যে গরম গরম খাবার ডেলিভারি করা হয়। খাবার একদম ফ্রেশ ও স্পেশাল হট-বক্সে প্যাক করে পাঠানো হয় যাতে স্বাদ ও তাপমাত্রা একদম ঠিক থাকে!",
        action: { label: lang === 'en' ? 'Order for Delivery' : 'ডেলিভারির জন্য মেনু দেখুন', type: 'menu' }
      };
    }

    // 12. Offers & Discounts
    if (q.includes('offer') || q.includes('discount') || q.includes('promo') || q.includes('code') || q.includes('অফার') || q.includes('ছাড়') || q.includes('কুপন') || q.includes('coupon')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "আজকের সচল স্পেশাল ডিসকাউন্ট কোড:\n\n" +
          "• 'SARINDA15' — প্রথম অনলাইন অর্ডারে ফ্ল্যাট ১৫% ছাড়!\n" +
          "• 'FAMILY20' — ১২০০ টাকার বেশি ফ্যামিলি অর্ডারে ফ্ল্যাট ২০% সুপার ছাড়!\n\n" +
          "অর্ডার করার সময় কার্ট (Cart) বা চেকআউটে এই কোড বসালেই স্বয়ংক্রিয়ভাবে ডিসকাউন্ট প্রযোজ্য হবে।",
        action: { label: lang === 'en' ? 'View All Offers' : 'সকল অফার দেখুন', type: 'offers' }
      };
    }

    // 13. Location & Contact
    if (q.includes('address') || q.includes('location') || q.includes('thikana') || q.includes('kothay') || q.includes('ঠিকানা') || q.includes('কোথায়') || q.includes('phone') || q.includes('number') || q.includes('যোগাযোগ')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "সারিন্দা রেস্তোরাঁর অবস্থান ও যোগাযোগের তথ্য:\n\n" +
          "• ঠিকানা: রোড ১৬, ধানমন্ডি ২৭ (পুরাতন), ঢাকা - ১২০৯।\n" +
          "• ফোন ও হোয়াটসঅ্যাপ: +৮৮০ ১৭১২-১২১৪৩৪\n" +
          "• সময়সূচি: প্রতিদিন সকাল ১১:০০ থেকে রাত ১১:৩০ পর্যন্ত উন্মুক্ত।",
        action: { label: lang === 'en' ? 'Location & Map' : 'ম্যাপ ও ঠিকানা দেখুন', type: 'contact' }
      };
    }

    // 14. Signature Kacchi
    if (q.includes('kacchi') || q.includes('কাচ্চি') || q.includes('biryani') || q.includes('বিরিয়ানি') || q.includes('জনপ্রিয়') || q.includes('popular') || q.includes('best')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "আমাদের ১ নম্বর সিগনেচার মাস্টারপিস হলো 'স্পেশাল কাচ্চি বিরিয়ানি' (৳৩৪০ / ফুল ৳৫৯০), যা খাঁটি সরিষার তেল ও গাওয়া ঘিয়ে মাটির হাঁড়িতে খাঁটি দমে রান্না। এর সাথে একটি বিয়ে বাড়ির চিকেন রোস্ট (৳১৮০) ও ঠান্ডা শাহী বোরহানি (৳৭৫/৳১৫৫) নিলে পাবেন আসল শাহী তৃপ্তি!",
        action: { label: lang === 'en' ? 'Order Signature Kacchi' : 'কাচ্চি বিরিয়ানি অর্ডার করুন', type: 'menu' }
      };
    }

    // Default Fallback
    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: "আমি আপনার সারিন্দা চিফ ফুড অ্যাডভাইজর! আপনি কতজনের জন্য খাবার খুঁজছেন (যেমন: '৪ জনের খাবার' বা 'biriyani r moddhe ki ki ache?'), আপনার বাজেট কত, বা কেমন খাবার পছন্দ—বলুন, আমি মেনু দেখে নিখুঁত কম্বিনেশন ও ডিসকাউন্ট হিসেব করে দেব!",
      action: { label: lang === 'en' ? 'View Full Menu' : 'সম্পূর্ণ মেনু দেখুন', type: 'menu' }
    };
  };

  const handleSend = async (textToSend?: string) => {
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

    // Call secure backend proxy (/api/chat)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text.trim(),
          lang,
          history: messages.map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.text) {
          const reply: ChatMessage = {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: data.text,
            action: data.action
          };
          setMessages((prev) => [...prev, reply]);
          setIsTyping(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend proxy error, using local fallback:', err);
    }

    // Graceful fallback if backend offline
    setTimeout(() => {
      const reply = generateAiReply(text);
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 450);
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
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-brand-gold">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-black text-base leading-tight flex items-center gap-1.5">
                  Sarinda Foodie AI <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                </h3>
                <p className="text-xs text-brand-cream/80 font-bold">
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
                  className={`max-w-[85%] rounded-2xl p-3.5 text-sm font-semibold leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-brand-primary text-white rounded-br-none font-bold'
                      : 'bg-white text-brand-charcoal border border-brand-border shadow-xs rounded-bl-none whitespace-pre-line'
                  }`}
                >
                  {m.text}
                </div>

                {m.action && (
                  <button
                    onClick={() => handleActionClick(m.action!)}
                    className="mt-1.5 px-3.5 py-2 rounded-xl bg-brand-primary text-white text-xs font-black shadow-xs hover:bg-brand-dark transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
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
          <div className="p-2.5 bg-brand-cream/60 border-t border-brand-border/60 overflow-x-auto flex gap-2 no-scrollbar">
            {suggestedPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="px-3 py-1.5 rounded-xl bg-white border border-brand-border text-xs font-bold text-brand-charcoal hover:bg-brand-primary hover:text-white transition whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
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
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-border text-sm font-semibold text-brand-charcoal placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-brand-primary text-white hover:bg-brand-dark disabled:opacity-40 transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
