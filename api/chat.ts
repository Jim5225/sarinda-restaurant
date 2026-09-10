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
You are "Sarinda Foodie AI" (সারিন্দা এআই সহকারী), the official Chief Culinary Advisor & Dining Concierge for "Sarinda Restaurant & Catering" (সারিন্দা রেস্তোরাঁ ও ক্যাটারিং) in Dhanmondi, Dhaka, Bangladesh.

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
  - Shahi Morog Polao (Quarter Chicken): ৳290 [Traditional Dhaka wedding style polao with whole chicken roast leg]
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

RESTAURANT DETAILS:
- Address: Road 16, Dhanmondi 27 (Old), Dhaka.
- Phone & WhatsApp: +880 1712-121434.
- Open Hours: 11:00 AM - 11:30 PM everyday.
- Delivery: 30–40 mins hot delivery across Dhanmondi, Lalmatia, Mohammadpur, and surrounding Dhaka.
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

        const modelNames = ['gemini-3.6-flash', 'gemini-flash-latest', 'gemini-3.5-flash'];
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
                  maxOutputTokens: 400,
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
          const action = detectAction(prompt, replyText, lang);
          return res.status(200).json({
            text: replyText.trim(),
            action,
            source: 'gemini'
          });
        }
      } catch (geminiErr) {
        console.error('Gemini API Error:', geminiErr);
      }
    }

    // Graceful Dynamic Advisor Engine (if API quota depleted or offline)
    const fallbackReply = generateAdvisorDecision(prompt, lang);
    return res.status(200).json({
      text: fallbackReply.text,
      action: fallbackReply.action,
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

// Dynamic Intelligent Advisor Decision Engine (Always replies in rich Bengali as requested)
function generateAdvisorDecision(userQuery: string, lang: string) {
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
      text: "সারিন্দায় আপনাকে স্বাগত! আমাদের ধানমন্ডি শাখায় রয়েছে সুপরিসর ফ্যামিলি ডাইনিং হল এবং একান্ত পারিবারিক বা ব্যবসায়িক আড্ডার জন্য সাউন্ডপ্রুফ ভিআইপি প্রাইভেট কেবিন। কোনো বুকিং ফি ছাড়াই আপনি অনলাইন থেকে সরাসরি তারিখ, সময় ও সিট বেছে নিতে পারবেন!",
      action: { label: lang === 'en' ? 'Book a Table Now' : 'টেবিল বুকিং ফর্ম খুলুন', type: 'reservation' }
    };
  }

  // 11. Delivery Info ("delivery", "home delivery", "deli", "koto somoy", "somoy")
  if (q.includes('delivery') || q.includes('ডেলিভারি') || q.includes('home') || q.includes('somoy') || q.includes('time')) {
    return {
      text: "সারিন্দার দ্রুত হোম ডেলিভারি সেবা:\n\n" +
        "ধানমন্ডি, লালমাটিয়া, মোহাম্মদপুর ও সংলগ্ন এলাকায় মাত্র ৩০ থেকে ৪০ মিনিটের মধ্যে গরম গরম খাবার ডেলিভারি করা হয়। খাবার একদম ফ্রেশ ও স্পেশাল হট-বক্সে প্যাক করে পাঠানো হয় যাতে স্বাদ ও তাপমাত্রা একদম ঠিক থাকে!",
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
      action: { label: lang === 'en' ? 'View All Offers' : 'সকল অফার দেখুন', type: 'offers' }
    };
  }

  // 13. Location & Contact ("thikana", "kothay", "location", "address", "phone", "number", "ঠিকানা", "কোথায়")
  if (q.includes('address') || q.includes('location') || q.includes('thikana') || q.includes('kothay') || q.includes('ঠিকানা') || q.includes('কোথায়') || q.includes('phone') || q.includes('number') || q.includes('যোগাযোগ')) {
    return {
      text: "সারিন্দা রেস্তোরাঁর অবস্থান ও যোগাযোগের তথ্য:\n\n" +
        "• ঠিকানা: রোড ১৬, ধানমন্ডি ২৭ (পুরাতন), ঢাকা - ১২০৯।\n" +
        "• ফোন ও হোয়াটসঅ্যাপ: +৮৮০ ১৭১২-১২১৪৩৪\n" +
        "• সময়সূচি: প্রতিদিন সকাল ১১:০০ থেকে রাত ১১:৩০ পর্যন্ত উন্মুক্ত।",
      action: { label: lang === 'en' ? 'Location & Map' : 'ম্যাপ ও ঠিকানা দেখুন', type: 'contact' }
    };
  }

  // 14. Signature Kacchi Pairings & General Kacchi
  if (q.includes('kacchi') || q.includes('কাচ্চি') || q.includes('biryani') || q.includes('বিরিয়ানি') || q.includes('জনপ্রিয়') || q.includes('popular') || q.includes('best')) {
    return {
      text: "আমাদের ১ নম্বর সিগনেচার মাস্টারপিস হলো 'স্পেশাল কাচ্চি বিরিয়ানি' (৳৩৪০ / ফুল ৳৫৯০), যা খাঁটি সরিষার তেল ও গাওয়া ঘিয়ে মাটির হাঁড়িতে খাঁটি দমে রান্না। এর সাথে একটি বিয়ে বাড়ির চিকেন রোস্ট (৳১৮০) ও ঠান্ডা শাহী বোরহানি (৳৭৫/৳১৫৫) নিলে পাবেন আসল শাহী তৃপ্তি!",
      action: { label: lang === 'en' ? 'Order Signature Kacchi' : 'কাচ্চি বিরিয়ানি অর্ডার করুন', type: 'menu' }
    };
  }

  // Default Fallback
  return {
    text: "আমি আপনার সারিন্দা চিফ ফুড অ্যাডভাইজর! আপনি কতজনের জন্য খাবার খুঁজছেন (যেমন: '৪ জনের খাবার' বা 'biriyani r moddhe ki ki ache?'), আপনার বাজেট কত, বা কেমন খাবার পছন্দ—বলুন, আমি মেনু দেখে নিখুঁত কম্বিনেশন ও ডিসকাউন্ট হিসেব করে দেব!",
    action: { label: lang === 'en' ? 'View Full Menu' : 'সম্পূর্ণ মেনু দেখুন', type: 'menu' }
  };
}

