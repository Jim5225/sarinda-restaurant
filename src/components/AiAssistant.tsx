import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { translations } from '../data/translations';
import { Bot, X, Send, Sparkles, ShoppingBag, Calendar, MapPin, Tag, CheckCircle2, ChevronRight, Plus, Minus, MessageCircle, Copy, Check, Settings } from 'lucide-react';

export interface OrderItem {
  id: string;
  name: string;
  banglaName: string;
  price: number;
  quantity: number;
}

export interface OrderData {
  stage: 'upsell' | 'ready';
  items: OrderItem[];
  suggestAddon?: {
    id: string;
    name: string;
    banglaName: string;
    price: number;
    defaultQty: number;
  };
  selectedArea?: string;
  deliveryFee?: number;
}

export const DELIVERY_ZONES = [
  { id: 'ck_ghosh', name: 'সি কে ঘোষ রোড / টাউন হল', fee: 30, time: '২০-৩০ মিনিট' },
  { id: 'ganginarpar', name: 'গাঙ্গিনারপাড় / দুর্গাবাড়ী', fee: 30, time: '২০-৩০ মিনিট' },
  { id: 'charpara', name: 'চরপাড়া / মেডিকেল কলেজ রোড', fee: 40, time: '২৫-৩৫ মিনিট' },
  { id: 'notun_bazar', name: 'নতুন বাজার / মহারাজা রোড', fee: 40, time: '২৫-৩৫ মিনিট' },
  { id: 'baghmara', name: 'বাঘমারা / পন্ডিতপাড়া', fee: 40, time: '২৫-৩৫ মিনিট' },
  { id: 'kewatkhali', name: 'কেওয়াটখালী / বাংলাদেশ কৃষি বিশ্ববিদ্যালয়', fee: 50, time: '৩০-৪০ মিনিট' },
  { id: 'akua', name: 'আকুয়া / বাইপাস মোড়', fee: 50, time: '৩০-৪০ মিনিট' },
  { id: 'khagdahar', name: 'খাগডহর / কাশর', fee: 60, time: '৩৫-৪৫ মিনিট' },
  { id: 'other', name: 'ময়মনসিংহের অন্যান্য এলাকা', fee: 50, time: '৩০-৪৫ মিনিট' },
];

export const buildWhatsAppOrderMessage = (orderData: OrderData) => {
  const subtotal = orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const fee = orderData.deliveryFee ?? 30;
  const total = subtotal + fee;
  const currentArea = orderData.selectedArea || 'সি কে ঘোষ রোড / টাউন হল';

  const itemsList = orderData.items
    .map(it => `• ${it.quantity}× ${it.banglaName} — ৳${it.price * it.quantity}`)
    .join('\n');

  return `*🍛 সারিন্দা রেস্তোরাঁ - অনলাইন ফুড অর্ডার*\n` +
    `--------------------------------\n` +
    `*অর্ডারকৃত খাবার:*\n${itemsList}\n\n` +
    `*খাবার সাবটোটাল:* ৳${subtotal}\n` +
    `*ডেলিভারি এলাকা:* 📍 ${currentArea}\n` +
    `*ডেলিভারি চার্জ:* ৳${fee}\n` +
    `--------------------------------\n` +
    `*সর্বমোট প্রদেয় বিল:* *৳${total}*\n\n` +
    `গ্রাহকের ডেলিভারি ঠিকানা:\n` +
    `(অনুগ্রহ করে আপনার সঠিক ঠিকানা ও মোবাইল নম্বরটি এখানে লিখে পাঠান)\n\n` +
    `ধন্যবাদ, সারিন্দা রেস্তোরাঁ ও ক্যাটারিং, সি কে ঘোষ রোড, ময়মনসিংহ।`;
};

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  action?: {
    label: string;
    type: 'menu' | 'reservation' | 'offers' | 'contact';
  };
  orderData?: OrderData;
  quickReplies?: Array<{
    label: string;
    textToSend: string;
  }>;
}

export const AiAssistant: React.FC = () => {
  const {
    lang,
    isAiChatOpen,
    setIsAiChatOpen,
    setActiveTab,
    setIsReservationOpen,
    setIsCheckoutOpen,
    setIsCartOpen,
    addToCart,
    setDeliveryArea,
    setDeliveryFee,
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
        ? "Hello & Welcome! I am your Sarinda Foodie Concierge. I can help you choose delicious biryani, recommend portions, or order directly via WhatsApp & Messenger. What would you like today?"
        : "নমস্কার ও আসসালামু আলাইকুম! আমি সারিন্দা রেস্তোরাঁর স্মার্ট লাইভ ফুড কনসিয়ার্জ। সেরা বিরিয়ানি পছন্দ করা, প্লেটের সংখ্যা বা সরাসরি ১-ক্লিকে WhatsApp ও Messenger-এ অর্ডার পাঠাতে সাহায্য করব। নিচের বাটন থেকে সহজে বেছে নিন:",
      quickReplies: [
        { label: '🍛 বিরিয়ানি ও কাচ্চি মেনু', textToSend: 'বিরিয়ানি মেনু দেখতে চাই' },
        { label: '👨‍👩‍👦 ৪ জনের ফ্যামিলি কম্বো', textToSend: '৪ জনের জন্য কী খাবার নেওয়া যায়?' },
        { label: '🎁 চলতি স্পেশাল অফার', textToSend: 'চলতি অফার কী আছে?' },
        { label: '📅 টেবিল ও কেবিন বুকিং', textToSend: 'একটি টেবিল বুক করতে চাই' }
      ]
    }
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [testWaNumber, setTestWaNumber] = useState<string>(() => {
    return localStorage.getItem('sarinda_test_wa_number') || '';
  });
  const [showWaSettings, setShowWaSettings] = useState(false);
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);

  const getDestinationWaNumber = () => {
    if (!testWaNumber.trim()) return '8801712121434';
    let cleaned = testWaNumber.replace(/[^0-9]/g, '');
    if (cleaned.startsWith('01')) cleaned = '88' + cleaned;
    return cleaned;
  };

  const handleSaveTestNumber = (num: string) => {
    setTestWaNumber(num);
    localStorage.setItem('sarinda_test_wa_number', num);
  };

  // Auto-send prompt when opened from banner or suggestion chip
  React.useEffect(() => {
    if (initialAiPrompt && initialAiPrompt.trim()) {
      const prompt = initialAiPrompt.trim();
      setInitialAiPrompt('');
      handleSend(prompt);
    }
  }, [initialAiPrompt]);

  const suggestedPrompts = [
    lang === 'en' ? "Order 2 Biryani" : "২টা বিরিয়ানি অর্ডার করব",
    lang === 'en' ? "Show today's popular dishes" : "জনপ্রিয় খাবারগুলো দেখান",
    lang === 'en' ? "What can I order for 4 people?" : "৪ জনের জন্য কী অর্ডার করব?",
    lang === 'en' ? "Current discount offers" : "চলতি অফার কী আছে?",
    lang === 'en' ? "Book a dining table" : "একটি টেবিল বুক করতে চাই",
    lang === 'en' ? "Where are you located?" : "আপনাদের রেস্তোরাঁ কোথায়?"
  ];

  const generateAiReply = (userQuery: string): ChatMessage => {
    const q = userQuery.toLowerCase().trim();

    // 0. Check if this is an answer to an add-on / upsell question (Borhani, Kebab, Both, No)
    const lastAiMsg = messages.slice().reverse().find(m => m.sender === 'ai')?.text?.toLowerCase() || '';
    const lastAiMsgObj = messages.slice().reverse().find(m => m.sender === 'ai');
    const isAfterUpsell = (lastAiMsgObj?.orderData?.stage === 'upsell') || (lastAiMsg.includes('বোরহানি') && (lastAiMsg.includes('নিবেন') || lastAiMsg.includes('দেব') || lastAiMsg.includes('যোগ করবেন')));

    let prevItems = lastAiMsgObj?.orderData?.items || [
      { id: 'special-kacchi-biryani', name: 'Special Kacchi Biryani', banglaName: 'স্পেশাল কাচ্চি বিরিয়ানি (হাফ)', price: 340, quantity: 2 }
    ];
    let prevQty = prevItems[0]?.quantity || 2;
    const prevMatch = lastAiMsg.match(/(\d+|[১-৯])\s*প্লেট/);
    if (prevMatch) {
      const digitMap: { [k: string]: number } = { '১': 1, '২': 2, '৩': 3, '৪': 4, '৫': 5, '৬': 6 };
      prevQty = digitMap[prevMatch[1]] || parseInt(prevMatch[1], 10) || prevQty;
    }

    if (isAfterUpsell) {
      const isBoth = q.includes('both') || q.includes('দুটোই') || (q.includes('বোরহানি') && q.includes('কাবাব')) || (q.includes('borhani') && q.includes('kebab'));
      const isBorhaniOnly = !isBoth && (q.includes('borhani') || q.includes('বোরহানি') || q.includes('ha') || q.includes('হ্যাঁ') || q.includes('yes') || q.includes('din') || q.includes('দিন')) && !q.includes('na') && !q.includes('না') && !q.includes('lagbe na') && !q.includes('shudhu') && !q.includes('শুধু');
      const isKebabOnly = !isBoth && (q.includes('kebab') || q.includes('কাবাব')) && !q.includes('na') && !q.includes('না');
      const isNoAddon = q === 'na' || q === 'না' || q === 'no' || q.includes('lagbe na') || q.includes('লাগবে না') || q.includes('shudhu') || q.includes('শুধু') || q.includes('না শুধু');

      const bnPrev = String(prevQty).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[+d]);
      const dishTitle = prevItems[0]?.banglaName || 'কাচ্চি বিরিয়ানি';

      if (isBoth) {
        const finalItems = [...prevItems];
        finalItems.push(
          { id: 'shahi-borhani', name: 'Traditional Shahi Borhani', banglaName: 'শাহী বোরহানি (গ্লাস)', price: 75, quantity: prevQty },
          { id: 'jali-kebab', name: 'Special Jali Kebab', banglaName: 'স্পেশাল জালি কাবাব (পিস)', price: 50, quantity: prevQty }
        );
        return {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `অসাধারণ! আপনার জন্য ${bnPrev} প্লেট ${dishTitle}, সাথে ${bnPrev}টা শাহী বোরহানি ও ${bnPrev}টা জালি কাবাব যোগ করেছি।\n\nনিচে আপনার ডেলিভারি এলাকা নির্বাচন করে সরাসরি ১-ক্লিকে WhatsApp বা Messenger-এ অর্ডার পাঠান 👇`,
          orderData: {
            stage: 'ready',
            items: finalItems,
            selectedArea: 'সি কে ঘোষ রোড / টাউন হল',
            deliveryFee: 30
          }
        };
      }

      if (isKebabOnly) {
        const finalItems = [...prevItems];
        finalItems.push({ id: 'jali-kebab', name: 'Special Jali Kebab', banglaName: 'স্পেশাল জালি কাবাব (পিস)', price: 50, quantity: prevQty });
        return {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `চমৎকার! আপনার জন্য ${bnPrev} প্লেট ${dishTitle} ও ${bnPrev}টা মুচমুচে জালি কাবাব প্রস্তুত করেছি।\n\nনিচে আপনার ডেলিভারি এলাকা নির্বাচন করে সরাসরি ১-ক্লিকে WhatsApp বা Messenger-এ অর্ডার পাঠান 👇`,
          orderData: {
            stage: 'ready',
            items: finalItems,
            selectedArea: 'সি কে ঘোষ রোড / টাউন হল',
            deliveryFee: 30
          }
        };
      }

      if (isBorhaniOnly) {
        const finalItems = [...prevItems];
        finalItems.push({ id: 'shahi-borhani', name: 'Traditional Shahi Borhani', banglaName: 'শাহী বোরহানি (গ্লাস)', price: 75, quantity: prevQty });
        return {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `চমৎকার! আপনার জন্য ${bnPrev} প্লেট ${dishTitle} ও ${bnPrev}টা ঠান্ডা শাহী বোরহানি প্রস্তুত করেছি।\n\nনিচে আপনার ডেলিভারি এলাকা নির্বাচন করে সরাসরি ১-ক্লিকে WhatsApp বা Messenger-এ অর্ডার পাঠান 👇`,
          orderData: {
            stage: 'ready',
            items: finalItems,
            selectedArea: 'সি কে ঘোষ রোড / টাউন হল',
            deliveryFee: 30
          }
        };
      }

      if (isNoAddon) {
        return {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `ঠিক আছে! আপনার জন্য ${bnPrev} প্লেট ${dishTitle} প্রস্তুত করেছি।\n\nনিচে আপনার ডেলিভারি এলাকা নির্বাচন করে সরাসরি ১-ক্লিকে WhatsApp বা Messenger-এ অর্ডার পাঠান 👇`,
          orderData: {
            stage: 'ready',
            items: prevItems,
            selectedArea: 'সি কে ঘোষ রোড / টাউন হল',
            deliveryFee: 30
          }
        };
      }
    }

    // Skip order flow if asking explicitly about ingredients or recipe
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
        quickReplies: [
          { label: '🍛 স্পেশাল খাসির কাচ্চি (৳৩৪০)', textToSend: 'স্পেশাল খাসির কাচ্চি' },
          { label: '👑 বাসমতি মাটন কাচ্চি (৳৪৫০)', textToSend: 'বাসমতি মাটন কাচ্চি' },
          { label: '🛒 মেনু দেখুন', textToSend: 'সম্পূর্ণ মেনু দেখতে চাই' }
        ],
        action: { label: lang === 'en' ? 'Order Special Kacchi' : 'কাচ্চি বিরিয়ানি অর্ডার করুন', type: 'menu' }
      };
    }

    // Detect Dish Types
    const isSpecialKacchi = q.includes('special') || q.includes('স্পেশাল') || q.includes('খাসি') || q.includes('mutton kacchi') || (q.includes('kacchi') && !q.includes('basmati'));
    const isBasmatiKacchi = q.includes('basmati') || q.includes('বাসমতি');
    const isTehari = q.includes('tehari') || q.includes('তেহারি') || q.includes('তেহারী');
    const isPolao = q.includes('morog') || q.includes('মোরগ') || q.includes('polao') || q.includes('পোলাও');
    const isGeneralBiryani = (q.includes('biryani') || q.includes('biriyani') || q.includes('কাচ্চি') || q.includes('বিরিয়ানি') || q.includes('খাবার') || q.includes('khabar')) && !isSpecialKacchi && !isBasmatiKacchi && !isTehari && !isPolao;

    // Detect quantity / portion
    let detectedQty: number | null = null;
    const numMatch = q.match(/(\d+)\s*(ta|plate|টি|টা|পিস|প্লেট)?/);
    const bnNumMatch = q.match(/([১-৯])\s*(টা|টি|প্লেট)?/);
    if (numMatch && parseInt(numMatch[1], 10) > 0) {
      detectedQty = parseInt(numMatch[1], 10);
    } else if (bnNumMatch) {
      const bnMap: { [k: string]: number } = { '১': 1, '২': 2, '৩': 3, '৪': 4, '৫': 5, '৬': 6, '৭': 7, '৮': 8, '৯': 9 };
      detectedQty = bnMap[bnNumMatch[1]] || null;
    } else if (q.includes('ek') || q.includes('এক') || q.includes('one')) {
      detectedQty = 1;
    } else if (q.includes('dui') || q.includes('দুই') || q.includes('two')) {
      detectedQty = 2;
    } else if (q.includes('tin') || q.includes('তিন') || q.includes('three')) {
      detectedQty = 3;
    } else if (q.includes('char') || q.includes('চার') || q.includes('four')) {
      detectedQty = 4;
    }

    // Step 1: User says general "biryani" or "কাচ্চি" without quantity or specific dish
    if (!detectedQty && (isGeneralBiryani || q.includes('বিরিয়ানি মেনু') || q === 'biryani' || q === 'biriyani' || q === 'কাচ্চি' || q === 'kacchi')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `সারিন্দার প্রতিটি বিরিয়ানি ঐতিহ্যবাহী পুরান ঢাকার শাহী রেসিপিতে খাঁটি গাওয়া ঘি ও ঘানিভাঙা সরিষার তেলে মাটির হাঁড়িতে খাঁটি দমে রান্না।\n\nআপনার কেমন বিরিয়ানি পছন্দ বলুন তো? নিচের বাটন থেকে সহজে বেছে নিতে পারেন:`,
        quickReplies: [
          { label: '🍛 স্পেশাল খাসির কাচ্চি (৳৩৪০)', textToSend: 'স্পেশাল খাসির কাচ্চি' },
          { label: '👑 বাসমতি মাটন কাচ্চি (৳৪৫০)', textToSend: 'বাসমতি মাটন কাচ্চি' },
          { label: '🍚 সরিষার তেলের বিফ তেহারী (৳২৯০)', textToSend: 'বিফ তেহারী' },
          { label: '🍗 শাহী মোরগ পোলাও (৳২৯০)', textToSend: 'শাহী মোরগ পোলাও' }
        ]
      };
    }

    // Step 2: User picked a specific dish, but NOT quantity yet
    if (!detectedQty && (isSpecialKacchi || isBasmatiKacchi || isTehari || isPolao)) {
      let dishName = 'স্পেশাল খাসির কাচ্চি';
      if (isBasmatiKacchi) dishName = 'বাসমতি মাটন কাচ্চি';
      else if (isTehari) dishName = 'বিফ তেহারী';
      else if (isPolao) dishName = 'শাহী মোরগ পোলাও';

      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `অসাধারণ পছন্দ! সারিন্দার '${dishName}' আমাদের অন্যতম জনপ্রিয় শাহী খাবার।\n\nকতজনের জন্য বা কত প্লেট দিতে পারি আপনার জন্য?`,
        quickReplies: [
          { label: '১ প্লেট (১ জন)', textToSend: `১ প্লেট ${dishName}` },
          { label: '২ প্লেট (জনপ্রিয়)', textToSend: `২ প্লেট ${dishName}` },
          { label: '৩ প্লেট', textToSend: `৩ প্লেট ${dishName}` },
          { label: '৪ প্লেট (ফ্যামিলি)', textToSend: `৪ প্লেট ${dishName}` }
        ]
      };
    }

    // Step 3: User picked a quantity / portion
    if (detectedQty) {
      let dishName = 'স্পেশাল খাসির কাচ্চি (হাফ)';
      let dishEn = 'Special Kacchi Biryani';
      let dishId = 'special-kacchi-biryani';
      let dishPrice = 340;

      if (isBasmatiKacchi || lastAiMsg.includes('বাসমতি')) {
        dishName = 'বাসমতি মাটন কাচ্চি (দম)';
        dishEn = 'Basmati Mutton Dum Biryani';
        dishId = 'basmati-mutton-kacchi';
        dishPrice = 450;
      } else if (isTehari || lastAiMsg.includes('তেহারী')) {
        dishName = 'সরিষার তেলের বিফ তেহারী';
        dishEn = 'Beef Tehari';
        dishId = 'beef-tehari';
        dishPrice = 290;
      } else if (isPolao || lastAiMsg.includes('মোরগ পোলাও')) {
        dishName = 'ঐতিহ্যবাহী শাহী মোরগ পোলাও';
        dishEn = 'Morog Polao';
        dishId = 'morog-polao';
        dishPrice = 290;
      }

      const hasBorhaniNow = q.includes('borhani') || q.includes('বোরহানি');
      const bnQty = String(detectedQty).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[+d]);

      if (hasBorhaniNow) {
        return {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `জি নিশ্চয়ই! আপনার জন্য ${bnQty} প্লেট ${dishName} এবং ${bnQty}টা ঠান্ডা শাহী বোরহানি প্রস্তুত করেছি।\n\nনিচে আপনার ডেলিভারি এলাকা নির্বাচন করে সরাসরি ১-ক্লিকে WhatsApp বা Messenger-এ অর্ডার পাঠান 👇`,
          orderData: {
            stage: 'ready',
            items: [
              { id: dishId, name: dishEn, banglaName: dishName, price: dishPrice, quantity: detectedQty },
              { id: 'shahi-borhani', name: 'Traditional Shahi Borhani', banglaName: 'শাহী বোরহানি (গ্লাস)', price: 75, quantity: detectedQty }
            ],
            selectedArea: 'সি কে ঘোষ রোড / টাউন হল',
            deliveryFee: 30
          }
        };
      }

      // Natural Waiter Upsell Question
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `জি অবশ্যই! আপনার জন্য ${bnQty} প্লেট ${dishName} প্রস্তুত করছি।\n\nখাবারের সাথে কি ঠান্ডা শাহী বোরহানি বা জালি কাবাব যোগ করবেন? ভারী খাবার খাওয়ার পর ঠান্ডা বোরহানি সহজে হজমে সাহায্য করে এবং আসল শাহী তৃপ্তি এনে দেয়!`,
        orderData: {
          stage: 'upsell',
          items: [
            { id: dishId, name: dishEn, banglaName: dishName, price: dishPrice, quantity: detectedQty }
          ],
          suggestAddon: {
            id: 'shahi-borhani',
            name: 'Traditional Shahi Borhani',
            banglaName: 'শাহী বোরহানি (গ্লাস)',
            price: 75,
            defaultQty: detectedQty
          }
        },
        quickReplies: [
          { label: `🥛 ${bnQty}টা শাহী বোরহানি দিন (+৳${detectedQty * 75})`, textToSend: 'হ্যাঁ বোরহানি দিন' },
          { label: `🍢 ${bnQty}টা জালি কাবাব দিন (+৳${detectedQty * 50})`, textToSend: 'হ্যাঁ জালি কাবাব দিন' },
          { label: '🥛+🍢 বোরহানি ও কাবাব দুটোই', textToSend: 'বোরহানি ও কাবাব দুটোই দিন' },
          { label: '❌ না, শুধু খাবার দিন', textToSend: 'না শুধু খাবার দিন' }
        ]
      };
    }

    // 1. Budget Query ("1000 tk", "1000 taka", "budget", "kom taka")
    if (q.includes('1000') || q.includes('১০০০') || q.includes('500') || q.includes('৫০০') || q.includes('budget') || q.includes('বাজেট') || q.includes('kom taka') || q.includes('kom dame')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "১,০০০ টাকা বাজেটের মধ্যে আমাদের সেরা ২টি ভ্যালু কম্বো:\n\n" +
          "• **অপশন ১ (গ্র্যান্ড প্ল্যাটার):** 'সারিন্দা রয়্যাল গ্র্যান্ড প্ল্যাটার' (৳৯৯০) — যাতে কাচ্চি, মোরগ পোলাও, রোস্ট, কাবাব ও বোরহানি একসাথে থাকে (৩-৪ জনের জন্য পারফেক্ট)!\n" +
          "• **অপশন ২ (কাচ্চি লাভার কম্বো):** ২x স্পেশাল কাচ্চি বিরিয়ানি (৳৬৮০) + ২x শাহী বোরহানি গ্লাস (৳১৫০) + ২x জালি কাবাব (৳১০০) = মোট মাত্র ৳৯৩০!",
        quickReplies: [
          { label: '🍛 ২ প্লেট কাচ্চি অর্ডার করব', textToSend: '২ প্লেট কাচ্চি' },
          { label: '🎁 স্পেশাল অফার দেখুন', textToSend: 'চলতি অফার কী আছে?' }
        ],
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
          "💡 প্রথম অনলাইন অর্ডারে প্রোমোকোড 'SARINDA15' ব্যবহার করে পেয়ে যান সরাসরি ১৫% বিশেষ ছাড়!",
        quickReplies: [
          { label: '🍛 ১ প্লেট কাচ্চি নেব', textToSend: '১ প্লেট কাচ্চি' },
          { label: '🍗 ১ প্লেট মোরগ পোলাও', textToSend: '১ প্লেট মোরগ পোলাও' }
        ],
        action: { label: lang === 'en' ? 'Order Solo Feast' : '১ জনের খাবার অর্ডার করুন', type: 'menu' }
      };
    }

    if (partySize === 2) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "২ জনের জন্য আমাদের পারফেক্ট রোমান্টিক/ফ্রেন্ডস কম্বিনেশন:\n\n" +
          "• ২x স্পেশাল কাচ্চি বিরিয়ানি (হাফ) — ৳৬৮০\n" +
          "• ১x বিয়ে বাড়ির চিকেন রোস্ট — ৳১৮০\n" +
          "• ১x শাহী বোরহানি (৫০০ মি.লি. বোতল) — ৳১৫৫\n" +
          "• ২x জাফরানী শাহী ফিরনি — ৳১৪০\n\n" +
          "মোট খরচ: ৳১,১৫৫।\n" +
          "💡 প্রথম অনলাইন অর্ডারে 'SARINDA15' প্রোমোকোড ব্যবহারে সরাসরি ১৫% ছাড় (৳১৭৩ সাশ্রয়) পেয়ে যাবেন মাত্র ৳৯৮২ টাকায়!",
        quickReplies: [
          { label: '🍛 ২ প্লেট কাচ্চি অর্ডার করব', textToSend: '২ প্লেট কাচ্চি' },
          { label: '🎁 স্পেশাল অফার দেখুন', textToSend: 'চলতি অফার কী আছে?' }
        ],
        action: { label: lang === 'en' ? 'View 2-Person Menu' : '২ জনের মেনু দেখুন ও অর্ডার করুন', type: 'menu' }
      };
    }

    if (partySize === 4 || q.includes('4 jon') || q.includes('৪ জন') || q.includes('family')) {
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
        quickReplies: [
          { label: '🍛 ৪ প্লেট কাচ্চি বিরিয়ানি নেব', textToSend: '৪ প্লেট কাচ্চি' },
          { label: '🎁 স্পেশাল অফার ও কুপন কোড', textToSend: 'চলতি অফার কী আছে?' },
          { label: '📅 রেস্তোরাঁয় টেবিল বুকিং', textToSend: 'একটি টেবিল বুক করতে চাই' }
        ],
        action: { label: lang === 'en' ? 'Order 4-Person Feast' : '৪ জনের খাবার অর্ডার করুন', type: 'menu' }
      };
    }

    // 5. Kacchi Pairings & Sides
    if (q.includes('sathe') || q.includes('সাথে') || q.includes('side') || q.includes('pairing')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "কাচ্চি বিরিয়ানির সাথে পুরান ঢাকার আসল শাহী তৃপ্তি পেতে আমাদের প্রধান খাদ্য উপদেষ্টার সেরা কম্বিনেশন:\n\n" +
          "• **বিয়ে বাড়ির চিকেন রোস্ট (৳১৮০):** কাচ্চির ভাতের সাথে রোস্টের মিষ্টি-ঝাল বাদাম বাটা গ্রেভির মাখামাখি মুখে অমৃতের মতো লাগে!\n" +
          "• **শাহী মাটন রেজালা (৳৩২০):** দই, পোস্তদানা ও কাজুবাদামের ক্রিমি গ্রেভি কাচ্চির স্বাদকে দ্বিগুণ করে দেয়।\n" +
          "• **ঠান্ডা শাহী বোরহানি (৳৭৫/৳১৫৫):** পুদিনা ও টক দইয়ের তৈরি ঐতিহ্যবাহী বোরহানি যা ভারী খাবার সহজে হজমে সাহায্য করে।\n" +
          "• **জাফরানী শাহী ফিরনি (৳৭০):** মাটির পাত্রে জমানো খাঁটি দুধের ফিরনি ভোজনের শেষে মিষ্টি সমাপ্তি এনে দেবে!",
        quickReplies: [
          { label: '🍛 কাচ্চি বিরিয়ানি অর্ডার করব', textToSend: 'স্পেশাল খাসির কাচ্চি' },
          { label: '🛒 মেনু দেখুন', textToSend: 'সম্পূর্ণ মেনু দেখতে চাই' }
        ],
        action: { label: lang === 'en' ? 'View Kacchi & Sides' : 'কাচ্চি ও সাইড ডিশ অর্ডার করুন', type: 'menu' }
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
        quickReplies: [
          { label: '🍗 শাহী মোরগ পোলাও অর্ডার করব', textToSend: 'শাহী মোরগ পোলাও' },
          { label: '🛒 মেনু দেখুন', textToSend: 'সম্পূর্ণ মেনু দেখতে চাই' }
        ],
        action: { label: lang === 'en' ? 'Browse Mild Dishes' : 'কম ঝালের মেনু দেখুন', type: 'menu' }
      };
    }

    // 10. Table / Cabin Booking
    if (q.includes('book') || q.includes('table') || q.includes('reserve') || q.includes('বুকিং') || q.includes('টেবিল') || q.includes('কেবিন') || q.includes('cabin')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "সারিন্দায় আপনাকে স্বাগত! ময়মনসিংহের সি কে ঘোষ রোডে আমাদের রেস্তোরাঁয় রয়েছে সুপরিসর ফ্যামিলি ডাইনিং হল এবং একান্ত পারিবারিক বা ব্যবসায়িক আড্ডার জন্য সাউন্ডপ্রুফ ভিআইপি প্রাইভেট কেবিন। কোনো বুকিং ফি ছাড়াই আপনি অনলাইন থেকে সরাসরি তারিখ, সময় ও সিট বেছে নিতে পারবেন!",
        action: { label: lang === 'en' ? 'Book a Table Now' : 'টেবিল বুকিং ফর্ম খুলুন', type: 'reservation' }
      };
    }

    // 11. Delivery Info
    if (q.includes('delivery') || q.includes('ডেলিভারি') || q.includes('home') || q.includes('somoy') || q.includes('time')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "সারিন্দার দ্রুত হোম ডেলিভারি সেবা:\n\n" +
          "ময়মনসিংহ শহরের সি কে ঘোষ রোড, গাঙ্গিনারপাড়, চরপাড়া, নতুন বাজার ও সংলগ্ন এলাকায় মাত্র ২৫ থেকে ৩৫ মিনিটের মধ্যে গরম গরম খাবার ডেলিভারি করা হয়। খাবার একদম ফ্রেশ ও স্পেশাল হট-বক্সে প্যাক করে পাঠানো হয় যাতে স্বাদ ও তাপমাত্রা একদম ঠিক থাকে!",
        quickReplies: [
          { label: '🍛 কাচ্চি বিরিয়ানি অর্ডার করব', textToSend: 'স্পেশাল খাসির কাচ্চি' },
          { label: '🛒 সম্পূর্ণ মেনু দেখুন', textToSend: 'সম্পূর্ণ মেনু দেখতে চাই' }
        ],
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
        quickReplies: [
          { label: '🍛 কাচ্চি বিরিয়ানি অর্ডার', textToSend: 'স্পেশাল খাসির কাচ্চি' },
          { label: '🛒 সম্পূর্ণ মেনু দেখুন', textToSend: 'সম্পূর্ণ মেনু দেখতে চাই' }
        ],
        action: { label: lang === 'en' ? 'View All Offers' : 'সকল অফার দেখুন', type: 'offers' }
      };
    }

    // 13. Location & Contact
    if (q.includes('address') || q.includes('location') || q.includes('thikana') || q.includes('kothay') || q.includes('ঠিকানা') || q.includes('কোথায়') || q.includes('phone') || q.includes('number') || q.includes('যোগাযোগ')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "সারিন্দা রেস্তোরাঁর অবস্থান ও যোগাযোগের তথ্য:\n\n" +
          "• ঠিকানা: সি কে ঘোষ রোড, ময়মনসিংহ - ২২০০।\n" +
          "• ফোন ও হোয়াটসঅ্যাপ: +৮৮০ ১৭১২-১২১৪৩৪\n" +
          "• সময়সূচি: প্রতিদিন সকাল ১১:০০ থেকে রাত ১১:৩০ পর্যন্ত উন্মুক্ত।\n" +
          "• হোম ডেলিভারি জোন: সি কে ঘোষ রোড, গাঙ্গিনারপাড়, চরপাড়া, নতুন বাজার ও সমগ্র ময়মনসিংহ।",
        quickReplies: [
          { label: '🍛 বিরিয়ানি মেনু দেখুন', textToSend: 'বিরিয়ানি মেনু দেখতে চাই' },
          { label: '📅 টেবিল বুকিং', textToSend: 'একটি টেবিল বুক করতে চাই' }
        ],
        action: { label: lang === 'en' ? 'Location & Map' : 'ম্যাপ ও ঠিকানা দেখুন', type: 'contact' }
      };
    }

    // Default Fallback
    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: "আমি সারিন্দার স্মার্ট ফুড কনসিয়ার্জ! আপনি কেমন খাবার পছন্দ করেন, কতজনের জন্য লাগবে, বা বাজেট কত বলুন—আমি সেরা খাবারের পরামর্শ ও ১-ক্লিকে WhatsApp-এ সরাসরি অর্ডার প্রস্তুত করে দেব!",
      quickReplies: [
        { label: '🍛 বিরিয়ানি ও কাচ্চি মেনু', textToSend: 'বিরিয়ানি মেনু দেখতে চাই' },
        { label: '👨‍👩‍👦 ৪ জনের ফ্যামিলি কম্বো', textToSend: '৪ জনের জন্য কী খাবার নেওয়া যায়?' },
        { label: '🎁 চলতি স্পেশাল অফার', textToSend: 'চলতি অফার কী আছে?' },
        { label: '📅 টেবিল ও কেবিন বুকিং', textToSend: 'একটি টেবিল বুক করতে চাই' }
      ],
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
            action: data.action,
            orderData: data.orderData,
            quickReplies: data.quickReplies
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

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleAreaChange = (msgId: string, areaName: string) => {
    const zone = DELIVERY_ZONES.find(z => z.name === areaName) || DELIVERY_ZONES[0];
    setMessages(prev =>
      prev.map(m => {
        if (m.id === msgId && m.orderData) {
          return {
            ...m,
            orderData: {
              ...m.orderData,
              selectedArea: zone.name,
              deliveryFee: zone.fee
            }
          };
        }
        return m;
      })
    );
    setDeliveryArea(zone.name);
    setDeliveryFee(zone.fee);
  };

  const handleBorhaniChoice = (choice: 'borhani' | 'kebab' | 'both' | 'no' | number, msgId: string, currentOrderData: OrderData) => {
    const isNo = choice === 'no';
    const isBoth = choice === 'both';
    const isKebab = choice === 'kebab';
    const isBorhani = choice === 'borhani' || typeof choice === 'number';
    const prevQty = currentOrderData.items[0]?.quantity || 2;
    const borhaniQty = typeof choice === 'number' ? choice : prevQty;

    let userReplyText = 'না, শুধু খাবার দিন';
    if (isBoth) userReplyText = 'বোরহানি ও কাবাব দুটোই দিন';
    else if (isKebab) userReplyText = 'হ্যাঁ, জালি কাবাব দিন';
    else if (isBorhani) userReplyText = `হ্যাঁ, ${borhaniQty}টা শাহী বোরহানি দিন`;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userReplyText
    };

    const finalItems = [...currentOrderData.items];
    if (isBoth) {
      finalItems.push(
        { id: 'shahi-borhani', name: 'Traditional Shahi Borhani', banglaName: 'শাহী বোরহানি (গ্লাস)', price: 75, quantity: prevQty },
        { id: 'jali-kebab', name: 'Special Jali Kebab', banglaName: 'স্পেশাল জালি কাবাব (পিস)', price: 50, quantity: prevQty }
      );
    } else if (isKebab) {
      finalItems.push({ id: 'jali-kebab', name: 'Special Jali Kebab', banglaName: 'স্পেশাল জালি কাবাব (পিস)', price: 50, quantity: prevQty });
    } else if (isBorhani && borhaniQty > 0) {
      finalItems.push({ id: 'shahi-borhani', name: 'Traditional Shahi Borhani', banglaName: 'শাহী বোরহানি (গ্লাস)', price: 75, quantity: borhaniQty });
    }

    const aiConfirmationText = isNo
      ? `ঠিক আছে! আপনার জন্য ${prevQty} প্লেট ${currentOrderData.items[0]?.banglaName || 'কাচ্চি বিরিয়ানি'} প্রস্তুত করেছি।\n\nনিচে আপনার ডেলিভারি এলাকা নির্বাচন করুন, ডেলিভারি চার্জসহ মোট বিল স্বয়ংক্রিয়ভাবে চলে এসেছে এবং সরাসরি WhatsApp বা Messenger-এ অর্ডার পাঠাতে পারেন 👇`
      : `চমৎকার! আপনার জন্য ${prevQty} প্লেট ${currentOrderData.items[0]?.banglaName || 'কাচ্চি বিরিয়ানি'} চূড়ান্ত অর্ডার প্রস্তুত করেছি।\n\nনিচে আপনার ডেলিভারি এলাকা নির্বাচন করুন, ডেলিভারি চার্জসহ মোট বিল স্বয়ংক্রিয়ভাবে চলে এসেছে এবং সরাসরি WhatsApp বা Messenger-এ অর্ডার পাঠাতে পারেন 👇`;

    const aiReplyMsg: ChatMessage = {
      id: `ai-${Date.now() + 1}`,
      sender: 'ai',
      text: aiConfirmationText,
      orderData: {
        stage: 'ready',
        items: finalItems,
        selectedArea: 'সি কে ঘোষ রোড / টাউন হল',
        deliveryFee: 30
      }
    };

    setMessages(prev => [...prev, userMsg, aiReplyMsg]);
  };

  const handleConfirmOrderCheckout = (orderData: OrderData) => {
    orderData.items.forEach(it => {
      let found = menu.find(m => m.id === it.id);
      if (!found) {
        if (it.id.includes('kacchi') || it.id.includes('biryani')) {
          found = menu.find(m => m.id === 'special-kacchi-biryani') || menu.find(m => m.id === 'kacchi-biryani');
        } else if (it.id.includes('borhani')) {
          found = menu.find(m => m.id === 'shahi-borhani');
        } else if (it.id.includes('morog') || it.id.includes('polao')) {
          found = menu.find(m => m.id === 'morog-polao');
        } else if (it.id.includes('tehari')) {
          found = menu.find(m => m.id === 'beef-tehari') || menu[0];
        }
      }
      if (found) {
        addToCart(found, it.quantity);
      }
    });

    const zoneName = orderData.selectedArea || 'সি কে ঘোষ রোড / টাউন হল';
    const zoneFee = orderData.deliveryFee ?? 30;
    setDeliveryArea(zoneName);
    setDeliveryFee(zoneFee);

    setIsAiChatOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOpenCartWithItems = (orderData: OrderData) => {
    orderData.items.forEach(it => {
      let found = menu.find(m => m.id === it.id);
      if (!found) {
        if (it.id.includes('kacchi') || it.id.includes('biryani')) {
          found = menu.find(m => m.id === 'special-kacchi-biryani') || menu.find(m => m.id === 'kacchi-biryani');
        } else if (it.id.includes('borhani')) {
          found = menu.find(m => m.id === 'shahi-borhani');
        }
      }
      if (found) {
        addToCart(found, it.quantity);
      }
    });

    setIsAiChatOpen(false);
    setIsCartOpen(true);
  };

  const handleUpdateItemQty = (msgId: string, itemIdx: number, delta: number) => {
    setMessages(prev =>
      prev.map(m => {
        if (m.id === msgId && m.orderData) {
          const nextItems = [...m.orderData.items];
          const newQty = nextItems[itemIdx].quantity + delta;
          if (newQty <= 0) {
            nextItems.splice(itemIdx, 1);
          } else {
            nextItems[itemIdx] = { ...nextItems[itemIdx], quantity: newQty };
          }
          return {
            ...m,
            orderData: {
              ...m.orderData,
              items: nextItems
            }
          };
        }
        return m;
      })
    );
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

                {/* Interactive Quick Reply Buttons */}
                {m.quickReplies && m.quickReplies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 animate-in fade-in slide-in-from-bottom-2">
                    {m.quickReplies.map((qr, qIdx) => (
                      <button
                        key={qIdx}
                        type="button"
                        onClick={() => handleSend(qr.textToSend || qr.label)}
                        className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 text-xs font-bold transition shadow-xs cursor-pointer active:scale-95 flex items-center gap-1"
                      >
                        <span>{qr.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Borhani / Kebab Upsell Option Buttons */}
                {m.orderData?.stage === 'upsell' && (
                  <div className="mt-2 flex flex-wrap gap-1.5 animate-in fade-in slide-in-from-bottom-2">
                    <button
                      type="button"
                      onClick={() => handleBorhaniChoice(m.orderData!.suggestAddon?.defaultQty || 2, m.id, m.orderData!)}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs font-bold hover:bg-amber-100 flex items-center gap-1.5 shadow-xs transition cursor-pointer active:scale-95"
                    >
                      <span>🥛 হ্যাঁ, {m.orderData!.suggestAddon?.defaultQty || 2}টা শাহী বোরহানি দিন (+৳{(m.orderData!.suggestAddon?.defaultQty || 2) * 75})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBorhaniChoice('kebab', m.id, m.orderData!)}
                      className="px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-300 text-orange-950 text-xs font-bold hover:bg-orange-100 flex items-center gap-1.5 shadow-xs transition cursor-pointer active:scale-95"
                    >
                      <span>🍢 {m.orderData!.items[0]?.quantity || 2}টা জালি কাবাব দিন (+৳{(m.orderData!.items[0]?.quantity || 2) * 50})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBorhaniChoice('both', m.id, m.orderData!)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1.5 shadow-xs transition cursor-pointer active:scale-95"
                    >
                      <span>🥛+🍢 বোরহানি ও কাবাব দুটোই</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBorhaniChoice('no', m.id, m.orderData!)}
                      className="px-3 py-1.5 rounded-xl bg-gray-100 border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-200 transition cursor-pointer active:scale-95"
                    >
                      <span>❌ না, শুধু খাবার দিন</span>
                    </button>
                  </div>
                )}

                {/* In-Chat Order & Delivery Location Box */}
                {m.orderData?.stage === 'ready' && (() => {
                  const subtotal = m.orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
                  const fee = m.orderData.deliveryFee ?? 30;
                  const currentArea = m.orderData.selectedArea || 'সি কে ঘোষ রোড / টাউন হল';

                  return (
                    <div className="mt-2.5 w-full max-w-[340px] rounded-2xl bg-linear-to-br from-brand-primary via-brand-dark to-brand-primary text-white p-3.5 shadow-xl border border-brand-gold/40 animate-in zoom-in-95">
                      {/* Header */}
                      <div className="flex items-center justify-between pb-2.5 border-b border-white/15">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-bold text-xs uppercase tracking-wider text-brand-gold">
                            {lang === 'en' ? 'Order Summary' : 'কার্ট অর্ডার সামারি'}
                          </span>
                        </div>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          {lang === 'en' ? 'Ready' : 'প্রস্তুত'}
                        </span>
                      </div>

                      {/* Items list */}
                      <div className="py-2.5 space-y-2 border-b border-white/10">
                        {m.orderData.items.map((it, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5 flex-1 min-w-0 pr-2">
                              <span className="font-bold text-brand-gold shrink-0">
                                {it.quantity}×
                              </span>
                              <span className="font-semibold text-white/95 truncate">
                                {it.banglaName}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <div className="flex items-center bg-black/40 rounded-lg overflow-hidden border border-white/10">
                                <button
                                  type="button"
                                  onClick={() => handleUpdateItemQty(m.id, idx, -1)}
                                  className="px-1.5 py-0.5 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
                                  title="কমান"
                                >
                                  <Minus className="w-2.5 h-2.5" />
                                </button>
                                <span className="px-1.5 text-[11px] font-black">{it.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateItemQty(m.id, idx, 1)}
                                  className="px-1.5 py-0.5 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
                                  title="বাড়ান"
                                >
                                  <Plus className="w-2.5 h-2.5" />
                                </button>
                              </div>
                              <span className="font-black text-brand-gold min-w-[50px] text-right">
                                ৳{it.price * it.quantity}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Location Selector */}
                      <div className="py-2.5 space-y-1.5 border-b border-white/10">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-brand-cream/90 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-brand-gold" />
                            {lang === 'en' ? 'Delivery Area (Mymensingh):' : 'ডেলিভারি এলাকা (ময়মনসিংহ):'}
                          </span>
                          <span className="text-[10px] text-brand-gold font-bold">
                            {DELIVERY_ZONES.find(z => z.name === currentArea)?.time || '২০-৩০ মিনিট'}
                          </span>
                        </div>
                        <select
                          value={currentArea}
                          onChange={(e) => handleAreaChange(m.id, e.target.value)}
                          className="w-full bg-black/50 border border-brand-gold/60 rounded-xl px-2.5 py-2 text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-brand-gold cursor-pointer"
                        >
                          {DELIVERY_ZONES.map((zone) => (
                            <option key={zone.id} value={zone.name} className="bg-brand-dark text-white">
                              📍 {zone.name} — চার্জ: ৳{zone.fee}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Dynamic Price Breakdown */}
                      <div className="py-2 space-y-1 text-xs text-brand-cream/90">
                        <div className="flex justify-between text-[11px]">
                          <span>{lang === 'en' ? 'Food Subtotal:' : 'খাবার সাবটোটাল:'}</span>
                          <span className="font-bold text-white">৳{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-brand-gold">{lang === 'en' ? 'Delivery Charge:' : 'ডেলিভারি চার্জ:'}</span>
                          <span className="font-bold text-brand-gold">৳{fee}</span>
                        </div>
                        <div className="flex justify-between items-baseline pt-1.5 border-t border-white/15 text-sm">
                          <span className="font-bold text-white">{lang === 'en' ? 'Total Payable:' : 'সর্বমোট প্রদেয় টাকা:'}</span>
                          <span className="font-black text-lg text-brand-gold drop-shadow-xs">৳{subtotal + fee}</span>
                        </div>
                      </div>

                      {/* 1-Click WhatsApp & Messenger & Checkout Buttons */}
                      <div className="pt-2 flex flex-col gap-1.5">
                        {/* 1-Click WhatsApp Order */}
                        <button
                          type="button"
                          onClick={() => {
                            const waText = buildWhatsAppOrderMessage(m.orderData!);
                            const destNumber = getDestinationWaNumber();
                            const waUrl = `https://wa.me/${destNumber}?text=${encodeURIComponent(waText)}`;
                            window.open(waUrl, '_blank');
                          }}
                          className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer border border-white/20 active:scale-98"
                        >
                          <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                          </svg>
                          <span>
                            {testWaNumber.trim()
                              ? `টেস্ট WhatsApp-এ পাঠান (${testWaNumber})`
                              : (lang === 'en' ? 'Send Order to WhatsApp (1-Click)' : 'সরাসরি WhatsApp-এ অর্ডার পাঠান (১-ক্লিক)')
                            }
                          </span>
                        </button>

                        {/* Quick Action: Copy Order Receipt & Test Number Switcher */}
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              const waText = buildWhatsAppOrderMessage(m.orderData!);
                              navigator.clipboard.writeText(waText);
                              setCopiedOrderId(m.id);
                              setTimeout(() => setCopiedOrderId(null), 2500);
                            }}
                            className="flex-1 py-1.5 px-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 text-[11px] font-semibold transition flex items-center justify-center gap-1 cursor-pointer border border-white/10"
                            title="মেসেজটি কপি করুন যেন নিজে WhatsApp-এ পেস্ট করে টেস্ট করতে পারেন"
                          >
                            {copiedOrderId === m.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">মেসেজ কপি হয়েছে!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-brand-gold" />
                                <span>রেসিপ্ট কপি করুন</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => setShowWaSettings(!showWaSettings)}
                            className="py-1.5 px-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-[11px] font-semibold transition flex items-center justify-center gap-1 cursor-pointer border border-white/10"
                            title="টেস্ট নম্বর পরিবর্তন করুন"
                          >
                            <Settings className="w-3.5 h-3.5 text-brand-gold" />
                            <span>{testWaNumber.trim() ? 'টেস্ট মোড অন' : 'টেস্ট নম্বর'}</span>
                          </button>
                        </div>

                        {/* Expandable Test Mode Number Configuration */}
                        {showWaSettings && (
                          <div className="p-2.5 rounded-xl bg-black/40 border border-brand-gold/30 flex flex-col gap-2 text-xs">
                            <div className="flex items-center justify-between text-[11px] font-bold text-brand-gold">
                              <span>🧪 টেস্ট মোড: নিজের নম্বরে পাঠিয়ে দেখুন</span>
                              <button
                                type="button"
                                onClick={() => setShowWaSettings(false)}
                                className="text-white/60 hover:text-white text-xs cursor-pointer"
                              >
                                ✕
                              </button>
                            </div>
                            <p className="text-[10px] text-white/70 leading-relaxed">
                              সারিন্দার আসল নম্বরে মেসেজ পাঠাতে না চাইলে আপনার নিজের WhatsApp নম্বর লিখুন। এতে মেসেজটি অন্য কারো কাছে না গিয়ে সরাসরি আপনার ইনবক্সে টেস্ট হবে।
                            </p>
                            <div className="flex gap-1.5">
                              <input
                                type="tel"
                                placeholder="যেমন: 017XXXXXXXX"
                                value={testWaNumber}
                                onChange={(e) => handleSaveTestNumber(e.target.value)}
                                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-2.5 py-1.5 text-white placeholder-white/40 text-xs focus:outline-none focus:border-brand-gold"
                              />
                              {testWaNumber && (
                                <button
                                  type="button"
                                  onClick={() => handleSaveTestNumber('')}
                                  className="px-2 py-1.5 rounded-lg bg-rose-500/30 hover:bg-rose-500/50 text-rose-200 text-[10px] font-bold cursor-pointer"
                                  title="রিসেট করে সারিন্দার আসল নম্বর ফিরিয়ে আনুন"
                                >
                                  রিসেট
                                </button>
                              )}
                            </div>
                            <div className="text-[10px] text-emerald-400/90 font-medium">
                              {testWaNumber.trim()
                                ? `✓ এখন অর্ডার যাবে: ${getDestinationWaNumber()}`
                                : 'ℹ️ বর্তমানে সেট করা: সারিন্দার অফিসিয়াল নম্বর (+8801712121434)'}
                            </div>
                          </div>
                        )}

                        {/* Messenger Order */}
                        <button
                          type="button"
                          onClick={() => {
                            const waText = buildWhatsAppOrderMessage(m.orderData!);
                            try {
                              navigator.clipboard.writeText(waText);
                            } catch (e) {}
                            window.open('https://m.me/sarindabd', '_blank');
                          }}
                          className="w-full py-2 px-3 rounded-xl bg-[#0084FF] hover:bg-[#0073e6] text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer border border-white/20 active:scale-98"
                        >
                          <MessageCircle className="w-4 h-4 text-white shrink-0" />
                          <span>{lang === 'en' ? 'Send Order on Messenger' : 'Messenger-এ অর্ডার পাঠান'}</span>
                        </button>

                        {/* Website Checkout */}
                        <button
                          type="button"
                          onClick={() => handleConfirmOrderCheckout(m.orderData!)}
                          className="w-full py-2 px-3 rounded-xl bg-brand-accent hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer border border-white/20 active:scale-98"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-white" />
                          <span>{lang === 'en' ? 'Checkout on Website' : 'ওয়েবসাইটে সরাসরি চেকআউট'}</span>
                        </button>

                        {/* View in Cart */}
                        <button
                          type="button"
                          onClick={() => handleOpenCartWithItems(m.orderData!)}
                          className="w-full py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>{lang === 'en' ? 'View in Cart' : 'কার্ট দেখুন'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })()}

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

            <div ref={messagesEndRef} />

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
