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
    const { prompt, lang = 'bn', history = [] } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Rich Culinary Advisor System Knowledge for Sarinda Restaurant
    const systemInstruction = `
You are "Sarinda Foodie AI" (সারিন্দা এআই সহকারী), the official Chief Culinary Advisor & Dining Concierge for "Sarinda Restaurant & Catering" (সারিন্দা রেস্তোরাঁ ও ক্যাটারিং) in Dhanmondi, Dhaka, Bangladesh.

YOUR ROLE:
You act like a polite, deeply knowledgeable, warm, and wise culinary advisor. Guests will often ask customized questions in their own words, such as:
- "আমি ৪ জনের জন্য কী কী অর্ডার করব?" (What should I order for 4 people?)
- "আমার বাজেট ১০০০ টাকা, কী কী ভালো কম্বো হবে?" (My budget is 1000 Tk, what's a good combo?)
- "বাচ্চাদের জন্য কম ঝালের কী খাবার আছে?" (What mild food is good for kids?)
- "কাচ্চির সাথে কী কী সাইড ডিশ নিলে সেরা কম্বিনেশন হবে?" (What sides go best with Kacchi?)
- "৬ জনের ফ্যামিলি নিয়ে এলে কেবিনে টেবিল কীভাবে বুক করব?" (How to book a cabin for a family of 6?)

When guests ask such open-ended questions:
1. Intelligent Menu Decision-Making: Examine Sarinda's authentic menu and portions, select the most complementary dishes, and recommend a balanced feast (main biryani/polao + rich meat gravy + digestive borhani + sweet dessert).
2. Portion Accuracy: Make sure the portions match the party size so guests are fully satisfied without over-ordering.
3. Cost & Savings Calculation: Show the itemized prices, sum up the total cost in BDT (৳), and explicitly advise them on how to save money using our promo codes!
   - Promo 'SARINDA15' = 15% discount on first-time online orders.
   - Promo 'FAMILY20' = 20% discount on family feast orders over ৳1,200.
4. Tone & Language:
   - If the guest speaks in Bengali (or Romanized Bangla / Banglish), reply in polite, warm, appetizing Bengali (e.g. "আসসালামু আলাইকুম! ৪ জনের জন্য আমাদের খাঁটি পুরান ঢাকার শাহী ভোজের পারফেক্ট কম্বিনেশন...").
   - If in English, reply in courteous, mouth-watering English.
   - Keep answers clean, well-formatted, and concise (3 to 5 lines with bullet points for easy reading).

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
          parts: [{ text: lang === 'en' ? 'Understood! I am ready to advise guests as Sarinda Chief Culinary Advisor.' : 'বুঝতে পেরেছি! আমি সারিন্দার প্রধান ফুড অ্যাডভাইজর হিসেবে প্রতিটি অতিথির প্রশ্নের নিখুঁত ও বুদ্ধিদীপ্ত সমাধান দিতে প্রস্তুত।' }]
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
  if (combined.includes('address') || combined.includes('location') || combined.includes('ঠিকানা') || combined.includes('কোথায়') || combined.includes('contact') || combined.includes('phone') || combined.includes('নাম্বার')) {
    return { label: lang === 'en' ? 'Location & Map' : 'ম্যাপ ও ঠিকানা দেখুন', type: 'contact' };
  }
  return { label: lang === 'en' ? 'Open Menu to Order' : 'মেনু দেখুন ও অর্ডার করুন', type: 'menu' };
}

// Dynamic Intelligent Advisor Decision Engine (Calculates combinations, portions & pricing)
function generateAdvisorDecision(userQuery: string, lang: string) {
  const q = userQuery.toLowerCase();

  // 1. Party Size Decision: 4 People ("আমি ৪ জনের জন্য কী অর্ডার করব?")
  if (q.includes('4') || q.includes('৪') || q.includes('চার') || q.includes('four')) {
    return {
      text: lang === 'en'
        ? "For 4 people, here is our Chief Advisor's Perfect Feast Plan:\n\n• 2x Special Kacchi Biryani (Full) — ৳1,180\n• 2x Biye Bari Chicken Roast — ৳360\n• 1x Shahi Borhani (1 Litre Bottle) — ৳325\n• 4x Zafrani Shahi Firni — ৳280\n\nTotal: ৳2,145. Tip: Use promo code 'FAMILY20' at checkout to get flat 20% OFF (save ৳429!), bringing your grand feast down to just ৳1,716!"
        : "৪ জনের জন্য আমাদের প্রধান খাদ্য উপদেষ্টার সেরা শাহী ভোজ প্ল্যান:\n\n• ২x স্পেশাল কাচ্চি বিরিয়ানি (ফুল সাইজ) — ৳১,১৮০\n• ২x বিয়ে বাড়ির চিকেন রোস্ট — ৳৩৬০\n• ১x ঐতিহ্যবাহী শাহী বোরহানি (১ লিটার বোতল) — ৳৩২৫\n• ৪x জাফরানী শাহী ফিরনি — ৳২৮০\n\nমোট খরচ: ৳২,১৪৫। বিশেষ টিপস: চেকআউটে 'FAMILY20' কোড ব্যবহার করলে সরাসরি ২০% ছাড় (৳৪২৯ সাশ্রয়!) পেয়ে মাত্র ৳১,৭১৬-তে পুরো ফ্যামিলি তৃপ্তি সহকারে খেতে পারবেন!",
      action: { label: lang === 'en' ? 'Order 4-Person Feast' : '৪ জনের খাবার অর্ডার করুন', type: 'menu' }
    };
  }

  // 2. Party Size Decision: 2 People / Couple ("২ জনের জন্য কী নেব?")
  if (q.includes('2') || q.includes('২') || q.includes('দুই') || q.includes('two') || q.includes('couple') || q.includes('কাপল')) {
    return {
      text: lang === 'en'
        ? "For 2 people, the recommended pairing is:\n• 2x Special Kacchi Biryani (Half with Egg) — ৳700\n• 1x Shahi Chicken Roast — ৳180\n• 1x Shahi Borhani (500ml) — ৳155\n• 2x Firni — ৳140\n\nTotal: ৳1,175. Use code 'SARINDA15' to get 15% discount on your first online order!"
        : "২ জনের জন্য আমাদের পারফেক্ট রোমান্টিক/ফ্রেন্ডস কম্বো:\n• ২x স্পেশাল কাচ্চি বিরিয়ানি (ডিমসহ হাফ) — ৳৭০০\n• ১x বিয়ে বাড়ির চিকেন রোস্ট — ৳১৮০\n• ১x শাহী বোরহানি (৫০০ মি.লি.) — ৳১৫৫\n• ২x জাফরানী ফিরনি — ৳১৪০\n\nমোট: ৳১,১৭৫। প্রথম অর্ডারে 'SARINDA15' প্রোমোকোডে পাচ্ছেন ১৫% বিশেষ ছাড়!",
      action: { label: lang === 'en' ? 'View 2-Person Menu' : 'মেনু দেখুন ও অর্ডার করুন', type: 'menu' }
    };
  }

  // 3. Party Size Decision: 6 to 10 People / Large Gathering
  if (q.includes('6') || q.includes('৬') || q.includes('10') || q.includes('১০') || q.includes('দাওয়াত') || q.includes('party')) {
    return {
      text: lang === 'en'
        ? "For a group of 6–10 guests, we recommend ordering 2x 'Sarinda Royal Grand Platters' (৳990 each) along with an assortment of Kebab Platters (৳650) and 2 Litres of Shahi Borhani. You'll easily qualify for code 'FAMILY20' (20% flat discount)!"
        : "৬ থেকে ১০ জনের বড় আড্ডা বা পারিবারিক ভোজের জন্য আমাদের পরামর্শ: ২x 'সারিন্দা রয়্যাল গ্র্যান্ড প্ল্যাটার' (৳৯৯০ করে) সাথে ১টি কাবাব প্ল্যাটার (৳৬৫০) এবং ২ লিটার শাহী বোরহানি। এতে 'FAMILY20' ব্যবহারে সরাসরি ২০% ছাড় উপভোগ করতে পারবেন!",
      action: { label: lang === 'en' ? 'Explore Family Platters' : 'গ্র্যান্ড প্ল্যাটার দেখুন', type: 'menu' }
    };
  }

  // 4. Budget Query: Under 1000 Tk / Budget Friendly
  if (q.includes('1000') || q.includes('১০০০') || q.includes('500') || q.includes('৫০০') || q.includes('budget') || q.includes('বাজেট') || q.includes('কম টাকা')) {
    return {
      text: lang === 'en'
        ? "Best value under ৳1,000:\n• Option 1: 'Sarinda Royal Grand Platter' (৳990) — feeds up to 4 persons!\n• Option 2: 2x Special Kacchi Biryani (৳680) + 2x Shahi Borhani (৳150) + 2x Jali Kebab (৳100) = Total ৳930."
        : "৳১,০০০ বাজেটের মধ্যে সেরা কম্বিনেশন:\n• অপশন ১: 'সারিন্দা রয়্যাল গ্র্যান্ড প্ল্যাটার' (৳৯৯০) — যাতে কাচ্চি, মোরগ পোলাও, রোস্ট, কাবাব ও বোরহানি একসাথে থাকে (৪ জন পর্যন্ত খাওয়া যায়)!\n• অপশন ২: ২x স্পেশাল কাচ্চি বিরিয়ানি (৳৬৮০) + ২x বোরহানি গ্লাস (৳১৫০) + ২x জালি কাবাব (৳১০০) = মোট মাত্র ৳৯৩০!",
      action: { label: lang === 'en' ? 'Order Budget Feast' : 'বাজেট ভোজ অর্ডার করুন', type: 'menu' }
    };
  }

  // 5. Mild / Kids / Non-Spicy ("বাচ্চাদের জন্য কম ঝাল")
  if (q.includes('ঝাল') || q.includes('বাচ্চা') || q.includes('mild') || q.includes('kid') || q.includes('spicy') || q.includes('non-spicy')) {
    return {
      text: lang === 'en'
        ? "For kids or guests who prefer mild/non-spicy food, we strongly recommend:\n• Shahi Morog Polao (৳290) — cooked with sweet ghee and tender chicken.\n• Biye Bari Chicken Roast (৳180) — mildly spiced with sweet caramelized onions and raisins.\n• Plain Shahi Polao (৳130) paired with Shahi Mutton Rezala (৳320) — rich cashew-poppy gravy without harsh chillies."
        : "বাচ্চা বা যারা কম ঝাল পছন্দ করেন তাদের জন্য সেরা খাবার:\n• শাহী মোরগ পোলাও (৳২৯০) — মিষ্টি ঘিয়ে রান্না সুগন্ধি পোলাও ও তুলতুলে চিকেন রোস্ট।\n• বিয়ে বাড়ির চিকেন রোস্ট (৳১৮০) — বাদাম বাটা, কিশমিশ ও শাহী মশলায় রান্না মিষ্টি-ঝাল স্বাদ যা বাচ্চারা দারুণ পছন্দ করে।\n• শাহী মাটন রেজালা (৳৩২০) — দই ও কাজুবাদামের ঘন ঝোল, যাতে লাল মরিচের তীব্র ঝাল নেই।",
      action: { label: lang === 'en' ? 'Browse Mild Dishes' : 'কম ঝালের মেনু দেখুন', type: 'menu' }
    };
  }

  // 6. Signature Kacchi Pairings ("কাচ্চির সাথে কী নেব?")
  if (q.includes('kacchi') || q.includes('কাচ্চি') || q.includes('biryani') || q.includes('বিরিয়ানি') || q.includes('জনপ্রিয়')) {
    return {
      text: lang === 'en'
        ? "Our #1 Signature Masterpiece is the 'Special Kacchi Biryani' (৳340 / Full ৳590) cooked in authentic handi dum with pure mustard oil and ghee. For the ultimate Old Dhaka experience, pair it with a Shahi Chicken Roast (৳180) and chilled digestif Shahi Borhani (৳75/৳155)!"
        : "আমাদের ১ নম্বর সিগনেচার পদ হলো 'স্পেশাল কাচ্চি বিরিয়ানি' (৳৩৪০ / ফুল ৳৫৯০), যা খাঁটি সরিষার তেল ও গাওয়া ঘিয়ে মাটির হাঁড়িতে খাঁটি দমে রান্না। এর সাথে একটি বিয়ে বাড়ির চিকেন রোস্ট (৳১৮০) ও ঠান্ডা শাহী বোরহানি (৳৭৫/৳১৫৫) নিলে পাবেন আসল শাহী তৃপ্তি!",
      action: { label: lang === 'en' ? 'Order Signature Kacchi' : 'কাচ্চি বিরিয়ানি অর্ডার করুন', type: 'menu' }
    };
  }

  // 7. Table Reservation & Cabin Booking
  if (q.includes('book') || q.includes('table') || q.includes('reserve') || q.includes('বুকিং') || q.includes('টেবিল') || q.includes('কেবিন') || q.includes('cabin')) {
    return {
      text: lang === 'en'
        ? "We would be delighted to host you! We have comfortable Standard Family Hall seating and soundproof VIP Private Cabins for intimate gatherings. Click below to choose your date, time, and cabin online instantly."
        : "সারিন্দায় আপনাকে স্বাগত! আমাদের এখানে সুপরিসর ফ্যামিলি হল ছাড়াও রয়েছে পারিবারিক ও ব্যক্তিগত অনুষ্ঠানের জন্য ভিআইপি প্রাইভেট কেবিন। আপনার পছন্দের তারিখ, সময় ও টেবিল বেছে নিতে নিচের বাটনে ক্লিক করুন।",
      action: { label: lang === 'en' ? 'Book a Table Now' : 'টেবিল বুকিং ফর্ম খুলুন', type: 'reservation' }
    };
  }

  // 8. Offers & Discounts
  if (q.includes('offer') || q.includes('discount') || q.includes('promo') || q.includes('code') || q.includes('অফার') || q.includes('ছাড়') || q.includes('কুপন')) {
    return {
      text: lang === 'en'
        ? "Today's Active Discount Codes:\n• 'SARINDA15' — Flat 15% OFF on your first online order.\n• 'FAMILY20' — Flat 20% OFF on grand orders over ৳1,200.\nEnter the code in your cart drawer or checkout modal to save immediately!"
        : "আজকের সচল ডিসকাউন্ট কোড:\n• 'SARINDA15' — প্রথম অনলাইন অর্ডারে ফ্ল্যাট ১৫% ছাড়!\n• 'FAMILY20' — ১২০০ টাকার বেশি ফ্যামিলি অর্ডারে ফ্ল্যাট ২০% ছাড়!\nঅর্ডার করার সময় কার্ট বা চেকআউটে কোডটি বসালেই স্বয়ংক্রিয়ভাবে ডিসকাউন্ট প্রযোজ্য হবে।",
      action: { label: lang === 'en' ? 'View All Offers' : 'সকল অফার দেখুন', type: 'offers' }
    };
  }

  // Default Fallback
  return {
    text: lang === 'en'
      ? "I am your Sarinda Foodie Advisor! Tell me your party size (e.g. 'Feast for 4 people'), budget (e.g. 'Under 1000 Tk'), or dietary preference, and I will calculate the perfect feast and discount for you!"
      : "আমি আপনার সারিন্দা ফুডি অ্যাডভাইজর! আপনি কতজনের জন্য অর্ডার করবেন (যেমন: '৪ জনের জন্য কী নেব?'), আপনার বাজেট কত (যেমন: '১০০০ টাকার মধ্যে কী হবে?'), বা কেমন খাবার পছন্দ—বলুন, আমি মেনু দেখে নিখুঁত কম্বিনেশন তৈরি করে দেব!",
    action: { label: lang === 'en' ? 'View Full Menu' : 'সম্পূর্ণ মেনু দেখুন', type: 'menu' }
  };
}

