// Vercel Serverless Function: /api/chat
// Securely proxies Gemini API calls on the backend without exposing keys to clients or GitHub.

declare const process: any;

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const prompt = (body?.prompt || body?.message || '').toString().trim();
    const lang = body?.lang || 'bn';
    const history = body?.history || [];

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Rich Culinary Advisor System Knowledge for Sarinda Restaurant
    const systemInstruction = `
You are "Sarinda Foodie AI" (সারিন্দা এআই সহকারী), the official Chief Culinary Advisor & Dining Concierge for "Sarinda Restaurant & Catering" (সারিন্দা রেস্তোরাঁ ও ক্যাটারিং) at CK Ghosh Road, Mymensingh, Bangladesh.

CRITICAL MANDATORY LANGUAGE RULE:
YOU MUST ALWAYS REPLY IN BENGALI (বাংলা ভাষা) WITHOUT EXCEPTION!
Even if the guest types in Banglish (English letters phonetically spelling Bengali, such as "biriyani r moddhe ki ki ache ?", "4 jon er jonno ki nebo", "kacchi r sathe ki khabo", "table booking kivabe korbo") or in plain English ("What are the ingredients in Biryani?"), YOUR RESPONSE MUST ALWAYS BE IN WARM, ELEGANT, MOUTH-WATERING BENGALI (বাংলা).

YOUR ROLE AS CHIEF CULINARY ADVISOR:
1. When asked what is inside a dish (e.g. "biriyani r moddhe ki ki ache ?", "কাচ্চিতে কী কী থাকে?"): Explain with mouth-watering detail the authentic ingredients: premium aged Chinigura rice, tender juicy mutton cuts, pure Gawa Ghee & mustard oil, golden dum aloo, egg, zafraan, mace, nutmeg, alu bukhara, fresh salad and mint chutney. Mention that no artificial food color or essence is used.
2. When asked what to order for a party (e.g. 4 people, 2 people, 6-10 people): Compute the exact meal plan (main biryani + chicken roast/rezala + digestive borhani + firni dessert), calculate the total price in BDT (৳), and explicitly advise them on how much they save using our discount codes ('FAMILY20' for 20% off over ৳1200, 'SARINDA15' for 15% off).
3. When asked for budget meals (e.g. 1000 Tk): Provide value combinations like the 'Sarinda Royal Grand Platter' (৳990) or 2 Kacchi + Borhani combo.
4. When asked for kids / mild food: Recommend Shahi Morog Polao (৳290), Biye Bari Chicken Roast (৳180), and Firni (৳70).
5. Always be polite, warm, and hospitable ("আসসালামু আলাইকুম!", "সারিন্দায় আপনাকে স্বাগত!").

AUTHENTIC SARINDA MENU & PRICE LIST (BDT ৳):
• Biryani & Polao:
  - Special Kacchi Biryani (Without Egg): ৳340 (Full: ৳590) [Tender farm mutton, Chinigura rice, potato, pure ghee & mustard oil dum]
  - Special Kacchi Biryani (With Egg): ৳350 (Full: ৳620)
  - Basmati Mutton Dum Biryani: ৳450 [Aged basmati rice, tender juicy mutton]
  - Beef Tehari (Old Dhaka Mustard Oil): ৳290 [Tender beef chunks in fragrant mustard oil Chinigura rice]
  - Shahi Morog Polao (Quarter Chicken): ৳290 [Traditional wedding style polao with whole chicken roast leg]
  - Plain Shahi Chinigura Polao: ৳130
• Rich Meat Gravies & Curries:
  - Shahi Mutton Rezala: ৳320 [Creamy poppy seed, yogurt, and cashew gravy - mild & aromatic]
  - Mutton Rogan Josh: ৳340 [Rich spicy Kashmiri gravy]
  - Biye Bari Chicken Roast: ৳180 [Golden fried chicken in caramelized onion-raisin sweet-tangy shahi gravy - very popular, kid-friendly]
  - Chicken Chaap: ৳190 [Slow tawa-cooked spiced flattened chicken]
• Kebabs & Platters:
  - Sarinda Royal Grand Platter (Best for 4-6 people): ৳990 [Includes Kacchi, Morog Polao, Chicken Roast, Jali Kebab, Borhani & Firni]
  - Kebab Platter: ৳650 [Jali Kebab, Chicken Tikka, Reshmi Kebab]
  - Jali Kebab (Per pc): ৳50
• Drinks & Desserts:
  - Shahi Borhani: Small Glass ৳75 | 500ml Bottle ৳155 | 1 Litre Sharing Bottle ৳325 [Digestive fresh mint & yogurt with toasted spices]
  - Zafrani Shahi Firni (Earthen Pot): ৳70
  - Falooda Royal: ৳160

6. NATURAL HUMAN WAITER ORDERING & UPSELLING (আসল খাদ্য পরিবেশক ও আতিথেয়তা):
When a guest states they want to order dishes (e.g. "2 ta biriyani", "১টা কাচ্চি", "kacchi order korbo", "amar 2 ta biriyani lagbe"):
- Act like an attentive, hospitable waiter at Sarinda Restaurant.
- Acknowledge their dish warmly (e.g. "জি অবশ্যই! আপনার জন্য ২ প্লেট সুস্বাদু স্পেশাল কাচ্চি বিরিয়ানি রেডি করছি।").
- If Biryani/Tehari/Polao is ordered without drinks, ask naturally whether they want cold digestive Shahi Borhani:
  "কাচ্চির সাথে কি শাহী বোরহানি নিবেন? কাচ্চির পর ঠান্ডা বোরহানি খেলে ভারী খাবার সহজে হজম হয় আর স্বাদটাও পুরো জমে যায়! সাথে দিয়ে দেব কি?"
- When Borhani is decided (or already included), politely confirm and invite them to select their delivery location below to see their automatic delivery fee and total bill.

RESTAURANT DETAILS:
- Address: CK Ghosh Road, Mymensingh.
- Phone & WhatsApp: +880 1712-121434.
- Open Hours: 11:00 AM - 11:30 PM everyday.
- Delivery: 25–40 mins hot delivery across CK Ghosh Road, Ganginarpar, Charpara, Notun Bazar, and all of Mymensingh city.
- Dine-in Seating: Standard Dining, VIP Private Cabins, and Family Hall.
`.trim();

    // If API Key is available, attempt Gemini generation
    if (apiKey) {
      try {
        const contents = [];
        
        contents.push({
          role: 'user',
          parts: [{ text: systemInstruction }]
        });
        contents.push({
          role: 'model',
          parts: [{ text: 'বুঝেছি! আমি সারিন্দার চিফ ফুড অ্যাডভাইজর হিসেবে প্রতিটি প্রশ্নের উত্তর সর্বদা শুদ্ধ ও রসালো বাংলা ভাষায় দেব।' }]
        });

        if (Array.isArray(history)) {
          const recentHistory = history.slice(-6);
          for (const msg of recentHistory) {
            contents.push({
              role: msg.sender === 'user' ? 'user' : 'model',
              parts: [{ text: msg.text }]
            });
          }
        }

        contents.push({
          role: 'user',
          parts: [{ text: prompt }]
        });

        const modelNames = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-flash-lite-latest'];
        let geminiResponse: any = null;

        for (const model of modelNames) {
          try {
            const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents,
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 1000,
                  topP: 0.95
                }
              })
            });

            if (resp.ok) {
              geminiResponse = await resp.json();
              break;
            } else if (resp.status === 429 || resp.status === 402 || resp.status === 403) {
              // Quota depleted on account level, failover immediately without waiting
              break;
            }
          } catch (e) {
            // Next model
          }
        }

        const replyText = geminiResponse?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (replyText) {
          const orderDecision = detectOrderIntent(prompt, history);
          const action = detectAction(prompt, replyText, lang);
          return res.status(200).json({
            text: replyText.trim(),
            action,
            orderData: orderDecision ? orderDecision.orderData : undefined,
            quickReplies: orderDecision?.quickReplies || detectQuickReplies(prompt, replyText),
            source: 'gemini'
          });
        }
      } catch (geminiErr) {
        console.error('Gemini API Error:', geminiErr);
      }
    }

    // Graceful Dynamic Advisor Engine (if API quota depleted or offline)
    const fallbackReply = generateAdvisorDecision(prompt, lang, history);
    return res.status(200).json({
      text: fallbackReply.text,
      action: fallbackReply.action,
      orderData: fallbackReply.orderData,
      quickReplies: fallbackReply.quickReplies,
      source: 'fallback'
    });

  } catch (error: any) {
    console.error('API Handler Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error?.message });
  }
}

// Action detector for quick UI buttons
function detectAction(prompt: string, reply: string, lang: string) {
  const combined = (prompt + ' ' + reply).toLowerCase();
  if (combined.includes('book') || combined.includes('table') || combined.includes('বুকিং') || combined.includes('টেবিল') || combined.includes('reserve') || combined.includes('cabin') || combined.includes('কেবিন')) {
    return { label: lang === 'en' ? 'Book a Table Now' : 'টেবিল বুকিং ফর্ম খুলুন', type: 'reservation' };
  }
  if (combined.includes('offer') || combined.includes('discount') || combined.includes('promo') || combined.includes('code') || combined.includes('অফার') || combined.includes('ছাড়') || combined.includes('কুপন')) {
    return { label: lang === 'en' ? 'View All Offers' : 'সকল অফার দেখুন', type: 'offers' };
  }
  if (combined.includes('address') || combined.includes('location') || combined.includes('ঠিকানা') || combined.includes('কোথায়') || combined.includes('contact') || combined.includes('phone') || combined.includes('নাম্বার') || combined.includes('thikana')) {
    return { label: lang === 'en' ? 'Location & Map' : 'ম্যাপ ও ঠিকানা দেখুন', type: 'contact' };
  }
  return { label: lang === 'en' ? 'Open Menu to Order' : 'মেনু দেখুন ও অর্ডার করুন', type: 'menu' };
}

// Quick reply suggestion chip generator
function detectQuickReplies(prompt: string, reply: string) {
  const combined = (prompt + ' ' + reply).toLowerCase();
  if (combined.includes('biryani') || combined.includes('biriyani') || combined.includes('kacchi') || combined.includes('কাচ্চি') || combined.includes('বিরিয়ানি') || combined.includes('খাবার')) {
    return [
      { label: '🍛 স্পেশাল খাসির কাচ্চি (৳৩৪০)', textToSend: 'স্পেশাল খাসির কাচ্চি' },
      { label: '👑 বাসমতি মাটন কাচ্চি (৳৪৫০)', textToSend: 'বাসমতি মাটন কাচ্চি' },
      { label: '🍚 সরিষার তেলের বিফ তেহারী (৳২৯০)', textToSend: 'বিফ তেহারী' },
      { label: '🍗 শাহী মোরগ পোলাও (৳২৯০)', textToSend: 'শাহী মোরগ পোলাও' }
    ];
  }
  if (combined.includes('4 jon') || combined.includes('৪ জন') || combined.includes('family') || combined.includes('ফ্যামিলি')) {
    return [
      { label: '🍛 ৪ প্লেট কাচ্চি বিরিয়ানি নেব', textToSend: '৪ প্লেট কাচ্চি' },
      { label: '🎁 স্পেশাল অফার ও কুপন কোড', textToSend: 'চলতি অফার কী আছে?' },
      { label: '📅 রেস্তোরাঁয় টেবিল বুকিং', textToSend: 'একটি টেবিল বুক করতে চাই' }
    ];
  }
  if (combined.includes('offer') || combined.includes('discount') || combined.includes('অফার') || combined.includes('ছাড়')) {
    return [
      { label: '🍛 কাচ্চি বিরিয়ানি অর্ডার', textToSend: 'স্পেশাল খাসির কাচ্চি' },
      { label: '🛒 সম্পূর্ণ মেনু দেখুন', textToSend: 'সম্পূর্ণ মেনু দেখতে চাই' }
    ];
  }
  if (combined.includes('book') || combined.includes('table') || combined.includes('বুকিং') || combined.includes('টেবিল')) {
    return [
      { label: '📅 টেবিল বুকিং ফর্ম খুলুন', textToSend: 'একটি টেবিল বুক করতে চাই' },
      { label: '🍛 স্পেশাল কাচ্চি মেনু', textToSend: 'বিরিয়ানি মেনু দেখতে চাই' }
    ];
  }
  return [
    { label: '🍛 বিরিয়ানি ও কাচ্চি মেনু', textToSend: 'বিরিয়ানি মেনু দেখতে চাই' },
    { label: '👨‍👩‍👦 ৪ জনের ফ্যামিলি কম্বো', textToSend: '৪ জনের জন্য কী খাবার নেওয়া যায়?' },
    { label: '🎁 চলতি স্পেশাল অফার', textToSend: 'চলতি অফার কী আছে?' },
    { label: '📅 টেবিল ও কেবিন বুকিং', textToSend: 'একটি টেবিল বুক করতে চাই' }
  ];
}

// Helper to accurately detect party size without confusing prices/budgets
function detectPartySize(q: string): number {
  const clean = q.replace(/1000|500|1200|1500|2000|৳|tk|taka/g, '');

  // 1 Person
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
    return 1;
  }

  // 2 People
  if (
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
    return 2;
  }

  // 3 People
  if (
    /\b(3|৩|three)\b/i.test(clean) ||
    clean.includes('tinjon') ||
    clean.includes('তিনজন') ||
    clean.includes('তিন জন') ||
    clean.includes('3 jon') ||
    clean.includes('৩ জন') ||
    clean.includes('3jon')
  ) {
    return 3;
  }

  // 4 People
  if (
    /\b(4|৪|four)\b/i.test(clean) ||
    clean.includes('charjon') ||
    clean.includes('চারজন') ||
    clean.includes('চার জন') ||
    clean.includes('4 jon') ||
    clean.includes('৪ জন') ||
    clean.includes('4jon')
  ) {
    return 4;
  }

  // 5 People
  if (
    /\b(5|৫|five)\b/i.test(clean) ||
    clean.includes('pachjon') ||
    clean.includes('পাঁচজন') ||
    clean.includes('পাঁচ জন') ||
    clean.includes('5 jon') ||
    clean.includes('৫ জন') ||
    clean.includes('5jon')
  ) {
    return 5;
  }

  // 6-10 People
  if (
    /\b(6|৬|7|৭|8|৮|9|৯|10|১০)\b/i.test(clean) ||
    clean.includes('dawat') ||
    clean.includes('দাওয়াত') ||
    clean.includes('party') ||
    clean.includes('gathering')
  ) {
    return 6;
  }

  return 0;
}

interface OrderItem {
  id: string;
  name: string;
  banglaName: string;
  price: number;
  quantity: number;
}

interface OrderData {
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

function detectOrderIntent(userQuery: string, history: any[] = []): { text: string; action: any; orderData: OrderData; quickReplies?: Array<{ label: string; textToSend: string }> } | null {
  const q = userQuery.toLowerCase().trim();

  // Check last message to see if AI previously asked about Borhani / upsell
  const lastAiMessage = Array.isArray(history) && history.length > 0
    ? (history.slice().reverse().find(m => m.sender === 'ai' || m.role === 'model')?.text || '').toLowerCase()
    : '';
  const isAfterBorhaniUpsell = lastAiMessage.includes('বোরহানি') && (lastAiMessage.includes('নিবেন') || lastAiMessage.includes('দেব') || lastAiMessage.includes('borhani') || lastAiMessage.includes('যোগ করবেন'));

  // Detect previous biryani quantity from history
  let prevQty = 2;
  const prevMatch = lastAiMessage.match(/(\d+|[১-৯])\s*প্লেট/);
  if (prevMatch) {
    const digitMap: { [k: string]: number } = { '১': 1, '২': 2, '৩': 3, '৪': 4, '৫': 5, '৬': 6 };
    prevQty = digitMap[prevMatch[1]] || parseInt(prevMatch[1], 10) || 2;
  }

  // Upsell affirmative / negative response
  const isBoth = isAfterBorhaniUpsell && (q.includes('both') || q.includes('দুটোই') || (q.includes('বোরহানি') && q.includes('কাবাব')) || (q.includes('borhani') && q.includes('kebab')));
  const isYesBorhani = isAfterBorhaniUpsell && !isBoth && (
    q.includes('ha') || q.includes('হ্যাঁ') || q.includes('yes') ||
    q.includes('dao') || q.includes('দাও') || q.includes('din') || q.includes('দিন') ||
    q.includes('borhani') || q.includes('বোরহানি')
  ) && !q.includes('na') && !q.includes('না') && !q.includes('lagbe na') && !q.includes('লাগবে না') && !q.includes('shudhu') && !q.includes('শুধু');
  const isKebab = isAfterBorhaniUpsell && !isBoth && (q.includes('kebab') || q.includes('কাবাব')) && !q.includes('na') && !q.includes('না');
  const isNoBorhani = isAfterBorhaniUpsell && (q === 'na' || q === 'না' || q === 'no' || q.includes('lagbe na') || q.includes('লাগবে না') || q.includes('shudhu') || q.includes('শুধু') || q.includes('na lagbe na'));

  const bnPrev = String(prevQty).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[+d]);

  if (isBoth) {
    return {
      text: `অসাধারণ! আপনার জন্য ${bnPrev} প্লেট স্পেশাল কাচ্চি বিরিয়ানি, সাথে ${bnPrev}টা শাহী বোরহানি ও ${bnPrev}টা জালি কাবাব যোগ করেছি।\n\nনিচে আপনার ডেলিভারি এলাকা নির্বাচন করুন, ডেলিভারি চার্জসহ মোট বিল স্বয়ংক্রিয়ভাবে চলে এসেছে এবং সরাসরি ১-ক্লিকে WhatsApp বা Messenger-এ অর্ডার পাঠাতে পারবেন 👇`,
      action: { label: 'অর্ডার চেকআউট করুন', type: 'menu' },
      orderData: {
        stage: 'ready',
        items: [
          { id: 'special-kacchi-biryani', name: 'Special Kacchi Biryani', banglaName: 'স্পেশাল কাচ্চি বিরিয়ানি (হাফ)', price: 340, quantity: prevQty },
          { id: 'shahi-borhani', name: 'Traditional Shahi Borhani', banglaName: 'শাহী বোরহানি (গ্লাস)', price: 75, quantity: prevQty },
          { id: 'jali-kebab', name: 'Special Jali Kebab', banglaName: 'স্পেশাল জালি কাবাব (পিস)', price: 50, quantity: prevQty }
        ],
        selectedArea: 'সি কে ঘোষ রোড / টাউন হল',
        deliveryFee: 30
      }
    };
  }

  if (isKebab) {
    return {
      text: `চমৎকার! আপনার জন্য ${bnPrev} প্লেট স্পেশাল কাচ্চি বিরিয়ানি ও ${bnPrev}টা মুচমুচে জালি কাবাব প্রস্তুত করেছি।\n\nনিচে আপনার ডেলিভারি এলাকা নির্বাচন করুন এবং সরাসরি ১-ক্লিকে WhatsApp বা Messenger-এ অর্ডার পাঠান 👇`,
      action: { label: 'অর্ডার চেকআউট করুন', type: 'menu' },
      orderData: {
        stage: 'ready',
        items: [
          { id: 'special-kacchi-biryani', name: 'Special Kacchi Biryani', banglaName: 'স্পেশাল কাচ্চি বিরিয়ানি (হাফ)', price: 340, quantity: prevQty },
          { id: 'jali-kebab', name: 'Special Jali Kebab', banglaName: 'স্পেশাল জালি কাবাব (পিস)', price: 50, quantity: prevQty }
        ],
        selectedArea: 'সি কে ঘোষ রোড / টাউন হল',
        deliveryFee: 30
      }
    };
  }

  if (isYesBorhani) {
    let borhaniQty = prevQty;
    const numMatch = q.match(/(\d+|[১-৯])\s*(ta|টা)?/);
    if (numMatch) {
      const digitMap: { [k: string]: number } = { '১': 1, '২': 2, '৩': 3, '৪': 4, '৫': 5 };
      borhaniQty = digitMap[numMatch[1]] || parseInt(numMatch[1], 10) || prevQty;
    }
    const bnBorhani = String(borhaniQty).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[+d]);

    return {
      text: `চমৎকার! আপনার জন্য ${bnPrev} প্লেট স্পেশাল কাচ্চি বিরিয়ানি ও ${bnBorhani}টা ঠান্ডা শাহী বোরহানি প্রস্তুত করেছি।\n\nনিচে আপনার ডেলিভারি এলাকা নির্বাচন করুন এবং সরাসরি ১-ক্লিকে WhatsApp বা Messenger-এ অর্ডার পাঠান 👇`,
      action: { label: 'অর্ডার চেকআউট করুন', type: 'menu' },
      orderData: {
        stage: 'ready',
        items: [
          { id: 'special-kacchi-biryani', name: 'Special Kacchi Biryani', banglaName: 'স্পেশাল কাচ্চি বিরিয়ানি (হাফ)', price: 340, quantity: prevQty },
          { id: 'shahi-borhani', name: 'Traditional Shahi Borhani', banglaName: 'শাহী বোরহানি (গ্লাস)', price: 75, quantity: borhaniQty }
        ],
        selectedArea: 'সি কে ঘোষ রোড / টাউন হল',
        deliveryFee: 30
      }
    };
  }

  if (isNoBorhani) {
    return {
      text: `ঠিক আছে! আপনার জন্য ${bnPrev} প্লেট স্পেশাল কাচ্চি বিরিয়ানি প্রস্তুত করেছি।\n\nনিচে আপনার ডেলিভারি এলাকা নির্বাচন করুন এবং সরাসরি ১-ক্লিকে WhatsApp বা Messenger-এ অর্ডার পাঠান 👇`,
      action: { label: 'অর্ডার চেকআউট করুন', type: 'menu' },
      orderData: {
        stage: 'ready',
        items: [
          { id: 'special-kacchi-biryani', name: 'Special Kacchi Biryani', banglaName: 'স্পেশাল কাচ্চি বিরিয়ানি (হাফ)', price: 340, quantity: prevQty }
        ],
        selectedArea: 'সি কে ঘোষ রোড / টাউন হল',
        deliveryFee: 30
      }
    };
  }

  // Skip if asking about recipe or ingredients
  if (q.includes('moddhe ki ki') || q.includes('ki ki ache') || q.includes('ingredients') || q.includes('recipe') || q.includes('banay') || q.includes('উপাদান') || q.includes('উপকরণ')) {
    return null;
  }

  // Detect Dish Intent
  const isSpecialKacchi = q.includes('special') || q.includes('স্পেশাল') || q.includes('খাসি') || (q.includes('kacchi') && !q.includes('basmati'));
  const isBasmatiKacchi = q.includes('basmati') || q.includes('বাসমতি');
  const isTehari = q.includes('tehari') || q.includes('তেহারি') || q.includes('তেহারী');
  const isPolao = q.includes('morog') || q.includes('মোরগ') || q.includes('polao') || q.includes('পোলাও');
  const isGeneralBiryani = (q.includes('biryani') || q.includes('biriyani') || q.includes('কাচ্চি') || q.includes('বিরিয়ানি') || q.includes('খাবার')) && !isSpecialKacchi && !isBasmatiKacchi && !isTehari && !isPolao;

  // Determine quantity
  let qty: number | null = null;
  const numMatch = q.match(/(\d+)\s*(ta|plate|টি|টা|পিস|প্লেট)?/);
  const bnNumMatch = q.match(/([১-৯])\s*(টা|টি|প্লেট)?/);
  if (numMatch && parseInt(numMatch[1], 10) > 0) {
    qty = parseInt(numMatch[1], 10);
  } else if (bnNumMatch) {
    const bnMap: { [k: string]: number } = { '১': 1, '২': 2, '৩': 3, '৪': 4, '৫': 5, '৬': 6, '৭': 7, '৮': 8, '৯': 9 };
    qty = bnMap[bnNumMatch[1]] || null;
  } else if (q.includes('dui') || q.includes('দুই') || q.includes('two')) {
    qty = 2;
  } else if (q.includes('tin') || q.includes('তিন') || q.includes('three')) {
    qty = 3;
  } else if (q.includes('char') || q.includes('চার') || q.includes('four')) {
    qty = 4;
  }

  // Step 1: User says general "biryani" or "কাচ্চি" without quantity or specific dish
  if (!qty && (isGeneralBiryani || q === 'biryani' || q === 'biriyani' || q === 'কাচ্চি' || q === 'kacchi' || q.includes('বিরিয়ানি মেনু'))) {
    return {
      text: `সারিন্দার প্রতিটি বিরিয়ানি ঐতিহ্যবাহী পুরান ঢাকার শাহী রেসিপিতে খাঁটি গাওয়া ঘি ও ঘানিভাঙা সরিষার তেলে মাটির হাঁড়িতে খাঁটি দমে রান্না।\n\nআপনার কেমন বিরিয়ানি পছন্দ বলুন তো? নিচের বাটন থেকে সহজে বেছে নিতে পারেন:`,
      action: { label: 'মেনু দেখুন', type: 'menu' },
      orderData: undefined as any,
      quickReplies: [
        { label: '🍛 স্পেশাল খাসির কাচ্চি (৳৩৪০)', textToSend: 'স্পেশাল খাসির কাচ্চি' },
        { label: '👑 বাসমতি মাটন কাচ্চি (৳৪৫০)', textToSend: 'বাসমতি মাটন কাচ্চি' },
        { label: '🍚 সরিষার তেলের বিফ তেহারী (৳২৯০)', textToSend: 'বিফ তেহারী' },
        { label: '🍗 শাহী মোরগ পোলাও (৳২৯০)', textToSend: 'শাহী মোরগ পোলাও' }
      ]
    };
  }

  // Step 2: User picked a specific dish, but NOT quantity yet
  if (!qty && (isSpecialKacchi || isBasmatiKacchi || isTehari || isPolao)) {
    let dishName = 'স্পেশাল খাসির কাচ্চি';
    if (isBasmatiKacchi) dishName = 'বাসমতি মাটন কাচ্চি';
    else if (isTehari) dishName = 'বিফ তেহারী';
    else if (isPolao) dishName = 'শাহী মোরগ পোলাও';

    return {
      text: `অসাধারণ পছন্দ! সারিন্দার '${dishName}' আমাদের অন্যতম জনপ্রিয় শাহী খাবার।\n\nকতজনের জন্য বা কত প্লেট দিতে পারি আপনার জন্য?`,
      action: { label: 'মেনু দেখুন', type: 'menu' },
      orderData: undefined as any,
      quickReplies: [
        { label: '১ প্লেট (১ জন)', textToSend: `১ প্লেট ${dishName}` },
        { label: '২ প্লেট (জনপ্রিয়)', textToSend: `২ প্লেট ${dishName}` },
        { label: '৩ প্লেট', textToSend: `৩ প্লেট ${dishName}` },
        { label: '৪ প্লেট (ফ্যামিলি)', textToSend: `৪ প্লেট ${dishName}` }
      ]
    };
  }

  if (!qty) {
    return null;
  }

  const bnQty = String(qty).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[+d]);
  const hasBorhani = q.includes('borhani') || q.includes('বোরহানি');

  let dishId = 'special-kacchi-biryani';
  let dishName = 'স্পেশাল কাচ্চি বিরিয়ানি (হাফ)';
  let dishEn = 'Special Kacchi Biryani';
  let dishPrice = 340;

  if (isBasmatiKacchi) {
    dishId = 'basmati-mutton-kacchi';
    dishName = 'বাসমতি মাটন কাচ্চি (দম)';
    dishEn = 'Basmati Mutton Dum Biryani';
    dishPrice = 450;
  } else if (isTehari) {
    dishId = 'beef-tehari';
    dishName = 'সরিষার তেলের বিফ তেহারী';
    dishEn = 'Beef Tehari';
    dishPrice = 290;
  } else if (isPolao) {
    dishId = 'morog-polao';
    dishName = 'ঐতিহ্যবাহী শাহী মোরগ পোলাও';
    dishEn = 'Morog Polao';
    dishPrice = 290;
  }

  if (hasBorhani) {
    return {
      text: `জি নিশ্চয়ই! আপনার জন্য ${bnQty} প্লেট ${dishName} এবং ${bnQty}টা ঠান্ডা শাহী বোরহানি প্রস্তুত করেছি।\n\nনিচে আপনার ডেলিভারি এলাকা নির্বাচন করুন এবং সরাসরি ১-ক্লিকে WhatsApp বা Messenger-এ অর্ডার পাঠান 👇`,
      action: { label: 'অর্ডার চেকআউট করুন', type: 'menu' },
      orderData: {
        stage: 'ready',
        items: [
          { id: dishId, name: dishEn, banglaName: dishName, price: dishPrice, quantity: qty },
          { id: 'shahi-borhani', name: 'Traditional Shahi Borhani', banglaName: 'শাহী বোরহানি (গ্লাস)', price: 75, quantity: qty }
        ],
        selectedArea: 'সি কে ঘোষ রোড / টাউন হল',
        deliveryFee: 30
      }
    };
  }

  // Natural Waiter Upsell Question
  return {
    text: `জি অবশ্যই! আপনার জন্য ${bnQty} প্লেট ${dishName} প্রস্তুত করছি।\n\nখাবারের সাথে কি ঠান্ডা শাহী বোরহানি বা জালি কাবাব যোগ করবেন? ভারী খাবার খাওয়ার পর ঠান্ডা বোরহানি সহজে হজমে সাহায্য করে এবং আসল শাহী তৃপ্তি এনে দেয়!`,
    action: { label: 'বোরহানি যোগ করুন', type: 'menu' },
    orderData: {
      stage: 'upsell',
      items: [
        { id: dishId, name: dishEn, banglaName: dishName, price: dishPrice, quantity: qty }
      ],
      suggestAddon: {
        id: 'shahi-borhani',
        name: 'Traditional Shahi Borhani',
        banglaName: 'শাহী বোরহানি (গ্লাস)',
        price: 75,
        defaultQty: qty
      }
    },
    quickReplies: [
      { label: `🥛 ${bnQty}টা শাহী বোরহানি দিন (+৳${qty * 75})`, textToSend: 'হ্যাঁ বোরহানি দিন' },
      { label: `🍢 ${bnQty}টা জালি কাবাব দিন (+৳${qty * 50})`, textToSend: 'হ্যাঁ জালি কাবাব দিন' },
      { label: '🥛+🍢 বোরহানি ও কাবাব দুটোই', textToSend: 'বোরহানি ও কাবাব দুটোই দিন' },
      { label: '❌ না, শুধু খাবার দিন', textToSend: 'না শুধু খাবার দিন' }
    ]
  };

  return null;
}

// Dynamic Intelligent Advisor Decision Engine (Always replies in rich Bengali as requested)
function generateAdvisorDecision(userQuery: string, lang: string, history: any[] = []): { text: string; action: any; orderData?: OrderData; quickReplies?: any[] } {
  const orderDecision = detectOrderIntent(userQuery, history);
  if (orderDecision) {
    return orderDecision;
  }

  const q = userQuery.toLowerCase();

  // 1. Budget Query: Under 1000 Tk / Budget Friendly ("1000 tk", "1000 taka", "kom taka", "budget")
  if (q.includes('1000') || q.includes('১০০০') || q.includes('500') || q.includes('৫০০') || q.includes('budget') || q.includes('বাজেট') || q.includes('kom taka') || q.includes('kom dame')) {
    return {
      text: "১,০০০ টাকা বাজেটের মধ্যে আমাদের সেরা ২টি ভ্যালু কম্বো:\n\n" +
        "• **অপশন ১ (গ্র্যান্ড প্ল্যাটার):** 'সারিন্দা রয়্যাল গ্র্যান্ড প্ল্যাটার' (৳৯৯০) — যাতে কাচ্চি, মোরগ পোলাও, রোস্ট, কাবাব ও বোরহানি একসাথে থাকে (৩-৪ জনের জন্য পারফেক্ট)!\n" +
        "• **অপশন ২ (কাচ্চি লাভার কম্বো):** ২x স্পেশাল কাচ্চি বিরিয়ানি (৳৬৮০) + ২x শাহী বোরহানি গ্লাস (৳১৫০) + ২x জালি কাবাব (৳১০০) = মোট মাত্র ৳৯৩০!",
      action: { label: lang === 'en' ? 'Order Budget Feast' : 'বাজেট ভোজ অর্ডার করুন', type: 'menu' }
    };
  }

  // 2. Party Size Routing
  const partySize = detectPartySize(q);

  if (partySize === 1) {
    return {
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
      text: "৬ থেকে ১০ জনের বড় আড্ডা বা পারিবারিক দাওয়াতের জন্য আমাদের স্পেশাল পরামর্শ:\n\n" +
        "• ২x 'সারিন্দা রয়্যাল গ্র্যান্ড প্ল্যাটার' (৳৯৯০ করে) — ৳১,৯৮০ (এতে কাচ্চি, মোরগ পোলাও, রোস্ট, কাবাব ও ফিরনি অন্তর্ভুক্ত)\n" +
        "• ১x স্পেশাল কাবাব প্ল্যাটার — ৳৬৫০\n" +
        "• ২ লিটার ঠান্ডা শাহী বোরহানি — ৳৬৫০\n\n" +
        "মোট খরচ: ৳৩,২৮০।\n" +
        "💡 ১২০০ টাকার বেশি অর্ডারে 'FAMILY20' কোড ব্যবহারে সরাসরি ২০% ছাড় (৳৬৫৬ সাশ্রয়!) পেয়ে যাবেন মাত্র ৳২,৬২৪ টাকায়!",
      action: { label: lang === 'en' ? 'Explore Family Platters' : 'গ্র্যান্ড প্ল্যাটার দেখুন', type: 'menu' }
    };
  }

  // 3. Pairings & Sides with Kacchi (e.g. "kacchi r sathe ki khabo", "biryani r sathe ki nebo", "side dish")
  if (q.includes('sathe') || q.includes('সাথে') || q.includes('side') || q.includes('pairing')) {
    return {
      text: "কাচ্চি বিরিয়ানির সাথে পুরান ঢাকার আসল শাহী তৃপ্তি পেতে আমাদের প্রধান খাদ্য উপদেষ্টার সেরা কম্বিনেশন:\n\n" +
        "• **বিয়ে বাড়ির চিকেন রোস্ট (৳১৮০):** কাচ্চির ভাতের সাথে রোস্টের মিষ্টি-ঝাল বাদাম বাটা গ্রেভির মাখামাখি মুখে অমৃতের মতো লাগে!\n" +
        "• **শাহী মাটন রেজালা (৳৩২০):** দই, পোস্তদানা ও কাজুবাদামের ক্রিমি গ্রেভি কাচ্চির স্বাদকে দ্বিগুণ করে দেয়।\n" +
        "• **ঠান্ডা শাহী বোরহানি (৳৭৫/৳১৫৫):** পুদিনা ও টক দইয়ের তৈরি ঐতিহ্যবাহী বোরহানি যা ভারী খাবার সহজে হজমে সাহায্য করে।\n" +
        "• **জাফরানী শাহী ফিরনি (৳৭০):** মাটির পাত্রে জমানো খাঁটি দুধের ফিরনি ভোজনের শেষে মিষ্টি সমাপ্তি এনে দেবে!",
      action: { label: lang === 'en' ? 'View Kacchi & Sides' : 'কাচ্চি ও সাইড ডিশ অর্ডার করুন', type: 'menu' }
    };
  }

  // 6. Biryani / Kacchi Ingredients & What's inside (e.g. "biriyani r moddhe ki ki ache ?", "kacchi te ki ache", "উপাদান কী কী")
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

  // 7. Mild / Kids / Non-Spicy ("বাচ্চাদের জন্য কম ঝাল", "bachader", "bacha", "kom jhal")
  if (q.includes('ঝাল') || q.includes('বাচ্চা') || q.includes('bacha') || q.includes('bachader') || q.includes('mild') || q.includes('kid') || q.includes('spicy') || q.includes('non-spicy') || q.includes('jhal')) {
    return {
      text: "বাচ্চা বা যারা মিষ্টি-সুস্বাদু ও কম ঝালের খাবার পছন্দ করেন তাদের জন্য সেরা খাবার:\n\n" +
        "• **শাহী মোরগ পোলাও (৳২৯০):** মিষ্টি ঘিয়ে রান্না সুগন্ধি পোলাও ও তুলতুলে চিকেন রোস্ট লেগ পিস—ঝালহীন ও অত্যন্ত মুখরোচক।\n" +
        "• **বিয়ে বাড়ির চিকেন রোস্ট (৳১৮০):** পেঁয়াজ বেরেস্তা, বাদাম বাটা ও কিশমিশের গ্রেভিতে তৈরি মিষ্টি-ঝাল স্বাদ যা বাচ্চারা দারুণ পছন্দ করে।\n" +
        "• **শাহী মাটন রেজালা (৳৩২০):** দই ও কাজুবাদামের ক্রিমি ঝোল, যাতে লাল মরিচের কোনো তীব্র ঝাল নেই।\n" +
        "• **জাফরানী শাহী ফিরনি (৳৭০):** মিষ্টি ডেজার্ট হিসেবে বাচ্চাদের অসম্ভব প্রিয়!",
      action: { label: lang === 'en' ? 'Browse Mild Dishes' : 'কম ঝালের মেনু দেখুন', type: 'menu' }
    };
  }

  // 8. Beef Tehari ("beef tehari", "tehari")
  if (q.includes('tehari') || q.includes('তেহারী') || q.includes('তেহারি')) {
    return {
      text: "আমাদের খাঁটি পুরান ঢাকার 'বিফ তেহারী' (৳২৯০):\n\n" +
        "ঘানিভাঙা খাঁটি সরিষার তেলে ছোট এলাচ, দারুচিনি ও কাঁচামরিচ দিয়ে সুগন্ধি চিনিগুঁড়া চাল ও নরম তুলতুলে গরুর মাংসের টুকরো একসাথে রান্না করা হয়। তেল-মশলার ভারসাম্য নিখুঁত হওয়ায় খাওয়ার পর কোনো ভারী ভাব থাকে না! সাথে দেওয়া হয় শসা-লেবুর ফ্রেশ সালাদ।",
      action: { label: lang === 'en' ? 'Order Beef Tehari' : 'বিফ তেহারী অর্ডার করুন', type: 'menu' }
    };
  }

  // 9. Morog Polao ("morog polao", "chicken polao", "পোলাও")
  if (q.includes('polao') || q.includes('মোরগ') || q.includes('পোলাও') || q.includes('morog')) {
    return {
      text: "আমাদের 'শাহী মোরগ পোলাও' (৳২৯০):\n\n" +
        "ঐতিহ্যবাহী পুরান ঢাকার বিয়ের বাড়ির রন্ধনশৈলীতে খাঁটি গাওয়া ঘিয়ে রান্না সুগন্ধি চিনিগুঁড়া পোলাও, তার ওপর বড় সাইজের আস্ত রোস্ট চিকেন লেগ পিস এবং ডিম। মিষ্টি বাদাম-বেরেস্তার শাহী গ্রেভি দিয়ে পরিবেশন করা হয়।",
      action: { label: lang === 'en' ? 'Order Morog Polao' : 'মোরগ পোলাও অর্ডার করুন', type: 'menu' }
    };
  }

  // 10. Table Reservation & Cabin Booking ("table", "cabin", "book", "reserve", "বুকিং", "টেবিল", "কেবিন")
  if (q.includes('book') || q.includes('table') || q.includes('reserve') || q.includes('বুকিং') || q.includes('টেবিল') || q.includes('কেবিন') || q.includes('cabin')) {
    return {
      text: "সারিন্দায় আপনাকে স্বাগত! ময়মনসিংহের সি কে ঘোষ রোডে আমাদের রেস্তোরাঁয় রয়েছে সুপরিসর ফ্যামিলি ডাইনিং হল এবং একান্ত পারিবারিক বা ব্যবসায়িক আড্ডার জন্য সাউন্ডপ্রুফ ভিআইপি প্রাইভেট কেবিন। কোনো বুকিং ফি ছাড়াই আপনি অনলাইন থেকে সরাসরি তারিখ, সময় ও সিট বেছে নিতে পারবেন!",
      quickReplies: [
        { label: '📅 টেবিল বুকিং ফর্ম খুলুন', textToSend: 'একটি টেবিল বুক করতে চাই' },
        { label: '🍛 স্পেশাল কাচ্চি মেনু', textToSend: 'বিরিয়ানি মেনু দেখতে চাই' }
      ],
      action: { label: lang === 'en' ? 'Book a Table Now' : 'টেবিল বুকিং ফর্ম খুলুন', type: 'reservation' }
    };
  }

  // 11. Delivery Info ("delivery", "home delivery", "deli", "koto somoy", "somoy")
  if (q.includes('delivery') || q.includes('ডেলিভারি') || q.includes('home') || q.includes('somoy') || q.includes('time')) {
    return {
      text: "সারিন্দার দ্রুত হোম ডেলিভারি সেবা:\n\n" +
        "ময়মনসিংহ শহরের সি কে ঘোষ রোড, গাঙ্গিনারপাড়, চরপাড়া, নতুন বাজার ও সংলগ্ন এলাকায় মাত্র ২৫ থেকে ৩৫ মিনিটের মধ্যে গরম গরম খাবার ডেলিভারি করা হয়। খাবার একদম ফ্রেশ ও স্পেশাল হট-বক্সে প্যাক করে পাঠানো হয় যাতে স্বাদ ও তাপমাত্রা একদম ঠিক থাকে!",
      quickReplies: [
        { label: '🍛 কাচ্চি বিরিয়ানি অর্ডার করব', textToSend: 'স্পেশাল খাসির কাচ্চি' },
        { label: '🛒 সম্পূর্ণ মেনু দেখুন', textToSend: 'সম্পূর্ণ মেনু দেখতে চাই' }
      ],
      action: { label: lang === 'en' ? 'Order for Delivery' : 'ডেলিভারির জন্য মেনু দেখুন', type: 'menu' }
    };
  }

  // 12. Offers & Discounts ("offer", "discount", "promo", "code", "coupon", "char", "অফার", "ছাড়")
  if (q.includes('offer') || q.includes('discount') || q.includes('promo') || q.includes('code') || q.includes('অফার') || q.includes('ছাড়') || q.includes('কুপন') || q.includes('coupon')) {
    return {
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

  // 13. Location & Contact ("thikana", "kothay", "location", "address", "phone", "number", "ঠিকানা", "কোথায়")
  if (q.includes('address') || q.includes('location') || q.includes('thikana') || q.includes('kothay') || q.includes('ঠিকানা') || q.includes('কোথায়') || q.includes('phone') || q.includes('number') || q.includes('যোগাযোগ')) {
    return {
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

  // 14. Signature Kacchi Pairings & General Kacchi
  if (q.includes('kacchi') || q.includes('কাচ্চি') || q.includes('biryani') || q.includes('বিরিয়ানি') || q.includes('জনপ্রিয়') || q.includes('popular') || q.includes('best')) {
    return {
      text: "আমাদের ১ নম্বর সিগনেচার মাস্টারপিস হলো 'স্পেশাল কাচ্চি বিরিয়ানি' (৳৩৪০ / ফুল ৳৫৯০), যা খাঁটি সরিষার তেল ও গাওয়া ঘিয়ে মাটির হাঁড়িতে খাঁটি দমে রান্না। এর সাথে একটি বিয়ে বাড়ির চিকেন রোস্ট (৳১৮০) ও ঠান্ডা শাহী বোরহানি (৳৭৫/৳১৫৫) নিলে পাবেন আসল শাহী তৃপ্তি!",
      quickReplies: [
        { label: '🍛 স্পেশাল খাসির কাচ্চি (৳৩৪০)', textToSend: 'স্পেশাল খাসির কাচ্চি' },
        { label: '👑 বাসমতি মাটন কাচ্চি (৳৪৫০)', textToSend: 'বাসমতি মাটন কাচ্চি' }
      ],
      action: { label: lang === 'en' ? 'Order Signature Kacchi' : 'কাচ্চি বিরিয়ানি অর্ডার করুন', type: 'menu' }
    };
  }

  // Default Fallback
  return {
    text: "আমি আপনার সারিন্দা চিফ ফুড অ্যাডভাইজর! আপনি কতজনের জন্য খাবার খুঁজছেন (যেমন: '৪ জনের খাবার' বা 'biriyani r moddhe ki ki ache?'), আপনার বাজেট কত, বা কেমন খাবার পছন্দ—বলুন, আমি মেনু দেখে নিখুঁত কম্বিনেশন ও ১-ক্লিকে WhatsApp অর্ডার প্রস্তুত করে দেব!",
    quickReplies: [
      { label: '🍛 বিরিয়ানি ও কাচ্চি মেনু', textToSend: 'বিরিয়ানি মেনু দেখতে চাই' },
      { label: '👨‍👩‍👦 ৪ জনের ফ্যামিলি কম্বো', textToSend: '৪ জনের জন্য কী খাবার নেওয়া যায়?' },
      { label: '🎁 চলতি স্পেশাল অফার', textToSend: 'চলতি অফার কী আছে?' },
      { label: '📅 টেবিল ও কেবিন বুকিং', textToSend: 'একটি টেবিল বুক করতে চাই' }
    ],
    action: { label: lang === 'en' ? 'View Full Menu' : 'সম্পূর্ণ মেনু দেখুন', type: 'menu' }
  };
}

