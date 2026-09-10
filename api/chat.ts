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

    // Rich Culinary System Knowledge for Sarinda Restaurant
    const systemInstruction = `
You are "Sarinda Foodie AI" (সারিন্দা এআই সহকারী), the official intelligent culinary concierge and dining assistant for "Sarinda Restaurant & Catering" (সারিন্দা রেস্তোরাঁ ও ক্যাটারিং) in Dhaka, Bangladesh.

Restaurant Information:
- Location: Road 16, Dhanmondi 27 (Old), Dhaka, Bangladesh.
- Phone & Reservations: +880 1712-121434.
- Kitchen & Dine-in Hours: Daily 11:00 AM to 11:30 PM.
- Delivery Areas: Dhanmondi, Lalmatia, Mohammadpur, and surrounding Dhaka areas (Delivery time: 30–40 mins).
- Cuisine Speciality: Authentic Old Dhaka Dum Kacchi Biryani (sealed handi dum with pure mustard oil & ghee), Shahi Mutton Rezala, Biye Bari Chicken Roast, Shahi Borhani, Kababs, Fish & Prawn, and Zafrani Firni.
- 100% Halal Certified and daily fresh meat.

Menu & Pricing (Bangladeshi Taka ৳):
1. Special Kacchi Biryani (Without Egg): ৳340 (Full/Grand: ৳590) - Signature slow-cooked mutton dum with chinigura rice.
2. Special Kacchi Biryani (With Egg): ৳350 (Full/Grand: ৳620)
3. Basmati Mutton Dum Biryani: ৳450 - Premium long-grain aged basmati rice with prime tender mutton.
4. Beef Tehari (Old Dhaka Mustard Oil): ৳290 - Tender beef cubes cooked in cold-pressed mustard oil.
5. Shahi Morog Polao (Quarter Chicken): ৳290 - Traditional Dhaka wedding-style chicken leg quarter with fragrant polao.
6. Shahi Mutton Rezala: ৳320 - Rich yogurt, poppy-seed and cashew gravy with succulent mutton.
7. Mutton Rogan Josh: ৳340 - Aromatic Kashmiri spiced mutton gravy with pure ghee.
8. Biye Bari Chicken Roast: ৳180 - Golden caramelized fried chicken in aromatic sweet-tangy shahi gravy.
9. Chicken Chaap (Spicy Griddled): ৳190 - Flattened spicy chicken cooked on iron tawa.
10. Shahi Borhani: Small Glass ৳75, 500ml Bottle ৳155, 1 Litre Bottle ৳325.
11. Zafrani Shahi Firni: ৳70 - Creamy saffron ground rice pudding in earthen pot.
12. Royal Grand Platter (4-6 persons): ৳990 - Best value family feast.
13. Kebab Platter: ৳650 - Assortment of Jali Kebab, Reshmi Kebab, and Chicken Tikka.

Active Promotional Offers:
- Promo code 'SARINDA15': 15% discount on all first-time online orders.
- Promo code 'FAMILY20': 20% discount on family feast orders over ৳1,200.

Guidelines:
- If the user asks in Bengali (or Romanized Banglish), answer in polite, warm, and natural Bengali.
- If the user asks in English, answer in polite, professional, and friendly English.
- Keep answers concise (2 to 4 sentences), appetizing, clear, and helpful.
- When appropriate, recommend exact dishes, prices, and applicable discount codes.
- Do NOT hallucinate dishes not in the restaurant menu.
`.trim();

    // If API Key is available, attempt Gemini generation
    if (apiKey) {
      try {
        // Format chat contents
        const contents = [];
        
        // System instruction as first user/model context
        contents.push({
          role: 'user',
          parts: [{ text: systemInstruction }]
        });
        contents.push({
          role: 'model',
          parts: [{ text: lang === 'en' ? 'Understood! I am ready to serve as Sarinda Foodie AI.' : 'বুঝতে পেরেছি! আমি সারিন্দা এআই সহকারী হিসেবে অতিথিদের সাহায্য করতে প্রস্তুত।' }]
        });

        // Add recent conversation history (up to last 6 turns)
        if (Array.isArray(history)) {
          const recentHistory = history.slice(-6);
          for (const msg of recentHistory) {
            contents.push({
              role: msg.sender === 'user' ? 'user' : 'model',
              parts: [{ text: msg.text }]
            });
          }
        }

        // Add current prompt
        contents.push({
          role: 'user',
          parts: [{ text: prompt }]
        });

        // Try primary model gemini-3.6-flash, fallback to gemini-flash-latest
        const modelNames = ['gemini-3.6-flash', 'gemini-flash-latest', 'gemini-3.5-flash'];
        let geminiResponse: any = null;
        let lastError = null;

        for (const model of modelNames) {
          try {
            const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents,
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 300,
                  topP: 0.95
                }
              })
            });

            if (resp.ok) {
              geminiResponse = await resp.json();
              break;
            } else {
              const errData = await resp.json();
              lastError = errData;
              // If quota exceeded or model not found, try next model
            }
          } catch (e) {
            lastError = e;
          }
        }

        const replyText = geminiResponse?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (replyText) {
          // Detect suggested UI action
          const action = detectAction(prompt, replyText, lang);
          return res.status(200).json({
            text: replyText.trim(),
            action,
            source: 'gemini'
          });
        }
      } catch (geminiErr) {
        console.error('Gemini API Error:', geminiErr);
        // Seamless fallback below
      }
    }

    // Graceful Fallback (if API quota depleted or network offline)
    const fallbackReply = generateFallbackReply(prompt, lang);
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
  if (combined.includes('book') || combined.includes('table') || combined.includes('বুকিং') || combined.includes('টেবিল') || combined.includes('reserve')) {
    return { label: lang === 'en' ? 'Book a Table Now' : 'টেবিল বুকিং ফর্ম খুলুন', type: 'reservation' };
  }
  if (combined.includes('offer') || combined.includes('discount') || combined.includes('promo') || combined.includes('code') || combined.includes('অফার') || combined.includes('ছাড়')) {
    return { label: lang === 'en' ? 'View All Offers' : 'সকল অফার দেখুন', type: 'offers' };
  }
  if (combined.includes('address') || combined.includes('location') || combined.includes('ঠিকানা') || combined.includes('কোথায়') || combined.includes('contact')) {
    return { label: lang === 'en' ? 'Location & Map' : 'ম্যাপ ও ঠিকানা দেখুন', type: 'contact' };
  }
  return { label: lang === 'en' ? 'Open Menu to Order' : 'মেনু দেখুন ও অর্ডার করুন', type: 'menu' };
}

// Resilient Fallback Engine
function generateFallbackReply(userQuery: string, lang: string) {
  const q = userQuery.toLowerCase();

  if (q.includes('where') || q.includes('location') || q.includes('address') || q.includes('কোথায়') || q.includes('ঠিকানা')) {
    return {
      text: lang === 'en'
        ? "We are located at Road 16, Dhanmondi 27 (Old), Dhaka. Open daily from 11:00 AM to 11:30 PM. We also offer fast home delivery across Dhanmondi, Lalmatia, and Mohammadpur!"
        : "আমাদের ঠিকানা: রোড ১৬, ধানমন্ডি ২৭ (পুরাতন), ঢাকা। প্রতিদিন সকাল ১১:০০ থেকে রাত ১১:৩০ পর্যন্ত কিচেন খোলা থাকে। ধানমন্ডি ও আশেপাশের এলাকায় ৩০-৪০ মিনিটে দ্রুত ডেলিভারি পাবেন!",
      action: { label: lang === 'en' ? 'View Map & Contact' : 'ম্যাপ ও যোগাযোগ দেখুন', type: 'contact' }
    };
  }

  if (q.includes('4') || q.includes('family') || q.includes('people') || q.includes('চার জন') || q.includes('পরিবার') || q.includes('combo') || q.includes('কম্বো')) {
    return {
      text: lang === 'en'
        ? "For 4 people, our best recommendation is the 'Sarinda Royal Grand Platter' (৳990) or Special Kacchi Biryani (Full ৳590) with Shahi Chicken Roast (৳180) and chilled Borhani (৳155). Use promo code 'FAMILY20' for 20% OFF!"
        : "৪ জনের জন্য আমাদের সেরা পরামর্শ হলো 'সারিন্দা রয়্যাল গ্র্যান্ড প্ল্যাটার' (৳৯৯০) অথবা স্পেশাল কাচ্চি বিরিয়ানি ফুল (৳৫৯০) সাথে বিয়ে বাড়ির চিকেন রোস্ট (৳১৮০) ও শাহী বোরহানি বোতল (৳১৫৫)। ১২০০ টাকার অর্ডারে 'FAMILY20' ব্যবহারে পাচ্ছেন ২০% ছাড়!",
      action: { label: lang === 'en' ? 'Open Menu to Order' : 'মেনু দেখুন ও অর্ডার করুন', type: 'menu' }
    };
  }

  if (q.includes('popular') || q.includes('best') || q.includes('kacchi') || q.includes('biryani') || q.includes('কাচ্চি') || q.includes('জনপ্রিয়')) {
    return {
      text: lang === 'en'
        ? "Our #1 signature dish is the Special Kacchi Biryani (৳340 / Full ৳590) prepared with tender farm mutton and fragrant Chinigura rice. Another favorite is Basmati Mutton Dum Biryani (৳450) and Shahi Mutton Rezala (৳320)!"
        : "আমাদের এক নম্বর সেরা পদ হলো স্পেশাল কাচ্চি বিরিয়ানি (৳৩৪০ / ফুল ৳৫৯০), যা খাঁটি সরিষার তেল, গাওয়া ঘি ও রসালো খাসির মাংসে তৈরি। এছাড়া বাসমতী মাটন দম বিরিয়ানি (৳৪৫০) ও শাহী রেজালাও (৳৩২০) ভোজনরসিকদের খুব প্রিয়!",
      action: { label: lang === 'en' ? 'Explore Menu' : 'মেনু দেখুন', type: 'menu' }
    };
  }

  if (q.includes('book') || q.includes('table') || q.includes('reserve') || q.includes('বুকিং') || q.includes('টেবিল')) {
    return {
      text: lang === 'en'
        ? "We'd love to host you! We have comfortable Standard Dining, VIP Private Cabins, and a spacious Family Hall. Click below to reserve your table online instantly."
        : "সারিন্দায় আপনাকে স্বাগত! আমাদের এখানে ফ্যামিলি হল, ভিআইপি কেবিন ও আরামদায়ক ডাইনিং রয়েছে। আপনার সুবিধাজনক সময় ও টেবিল বেছে নিতে নিচের বাটনে ক্লিক করুন।",
      action: { label: lang === 'en' ? 'Book a Table Now' : 'টেবিল বুকিং ফর্ম খুলুন', type: 'reservation' }
    };
  }

  if (q.includes('offer') || q.includes('discount') || q.includes('promo') || q.includes('code') || q.includes('অফার') || q.includes('ছাড়')) {
    return {
      text: lang === 'en'
        ? "Today's Top Offers:\n• Use code 'SARINDA15' for 15% OFF on your first order.\n• Code 'FAMILY20' gives flat 20% OFF on feast orders over ৳1,200!"
        : "আজকের সেরা অফার:\n• প্রোমোকোড 'SARINDA15' দিয়ে প্রথম অর্ডারে পাবেন ১৫% ছাড়!\n• ১২০০ টাকার বেশি অর্ডারে 'FAMILY20' কোড ব্যবহারে পাবেন ২০% পর্যন্ত ছাড়!",
      action: { label: lang === 'en' ? 'View All Offers' : 'সকল অফার দেখুন', type: 'offers' }
    };
  }

  return {
    text: lang === 'en'
      ? "I can help you explore our authentic Old Dhaka delicacies like Royal Kacchi Biryani, Chicken Roast, Mutton Rezala, and Shahi Borhani, check discount codes, or book a table. What would you like to know?"
      : "কাচ্চি বিরিয়ানি, চিকেন রোস্ট, মাটন রেজালা বা বোরহানির দাম ও অর্ডার সম্পর্কে যেকোনো প্রশ্ন করতে পারেন। এছাড়া স্পেশাল ডিসকাউন্ট কোড বা টেবিল বুকিংয়ের তথ্য জানতে আমি প্রস্তুত!",
    action: { label: lang === 'en' ? 'View Full Menu' : 'সম্পূর্ণ মেনু দেখুন', type: 'menu' }
  };
}
