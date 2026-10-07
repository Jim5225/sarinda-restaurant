// Vercel Serverless Function: /api/whatsapp
// WhatsApp AI Live Agent Webhook for Sarinda Restaurant
// Supports Meta WhatsApp Cloud API, Twilio WhatsApp, direct testing payload, and Gemini API.

declare const process: any;

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. Meta Webhook Verification (GET request)
  if (req.method === 'GET') {
    const query = req.query || {};
    const mode = query['hub.mode'];
    const token = query['hub.verify_token'];
    const challenge = query['hub.challenge'];

    const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'sarinda_whatsapp_token_2026';

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WhatsApp Webhook Verified Successfully!');
      return res.status(200).send(challenge);
    } else {
      return res.status(403).json({ error: 'Verification token mismatch' });
    }
  }

  // 2. Incoming Messages Event (POST request)
  if (req.method === 'POST') {
    try {
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch {
          // might be urlencoded (Twilio)
        }
      }

      let userText = '';
      let senderPhone = '';
      let phoneNumberId = process.env.WHATSAPP_PHONE_ID || '1472306229289510';
      let isTwilio = false;
      let history: any[] = body?.history || [];

      // Case A: Meta WhatsApp Cloud API format
      if (body?.object === 'whatsapp_business_account' || body?.entry?.[0]?.changes) {
        const change = body?.entry?.[0]?.changes?.[0]?.value;
        const message = change?.messages?.[0];
        if (message) {
          userText = message.text?.body || message.interactive?.button_reply?.title || '';
          senderPhone = message.from || '';
          phoneNumberId = change.metadata?.phone_number_id || phoneNumberId;
        }
      }

      // Case B: Twilio format
      if (!userText && (body?.Body || req.body?.Body)) {
        userText = body?.Body || req.body?.Body;
        senderPhone = (body?.From || req.body?.From || '').replace('whatsapp:', '');
        isTwilio = true;
      }

      // Case C: Direct Simulation / Tester payload { prompt: "...", message: "...", from: "...", history: [...] }
      if (!userText && (body?.prompt || body?.message)) {
        userText = body.prompt || body.message;
        senderPhone = body.from || '8801852363235';
      }

      if (!userText.trim()) {
        // Return 200 to acknowledge Meta webhook (even for status updates or read receipts)
        return res.status(200).json({ status: 'ignored_empty_message' });
      }

      // Generate Authentic Warm Bengali AI Reply using Gemini & Multi-model Fallback
      const replyText = await generateWhatsAppAiReply(userText.trim(), history);

      // If Meta WhatsApp Cloud API: Send message back to user via Graph API
      const DEFAULT_TOKEN = 'EAAPhQEh7pfABSmpAbsBqZBhs5Gmq4syyVZCeeRRrNRfa2I1ZAo0HMgzcZABLgPAadOidF503xTKsmzkqZAqBfZC2dZANrK6nraDiejR8JVDcMxl5GQroLtfRb7PBgHgUkj8hrRZAlY1x8TggzZC14hC608TbZCC15D0JF0FTjOxRzARXZC3lXZBPYZCT4d98UpoWxWAZBaZAZCDVQiMYCZBUkNzFeATOcD6IjZBcnTCrZCASVL7s7hvIQgOIKjwbZC1sbOO7onvJ9WfpSdMxLycgtWSefGrMgfsy';
      const whatsappToken = process.env.WHATSAPP_TOKEN || DEFAULT_TOKEN;

      if (whatsappToken && phoneNumberId && senderPhone && !isTwilio) {
        try {
          const metaRes = await fetch(`https://graph.facebook.com/v22.0/${phoneNumberId}/messages`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${whatsappToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              messaging_product: 'whatsapp',
              recipient_type: 'individual',
              to: senderPhone,
              type: 'text',
              text: { body: replyText }
            })
          });
          const metaData = await metaRes.json();
          console.log('WhatsApp reply sent via Meta Graph API:', metaData);
        } catch (sendErr) {
          console.error('Error sending message via Meta WhatsApp API:', sendErr);
        }
      }

      // If Twilio format, respond with TwiML XML
      if (isTwilio) {
        res.setHeader('Content-Type', 'text/xml');
        return res.status(200).send(
          `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${replyText}</Message></Response>`
        );
      }

      // Return JSON response (for web clients, tester modals, and webhooks)
      return res.status(200).json({
        success: true,
        to: senderPhone,
        input: userText,
        reply: replyText,
        text: replyText
      });

    } catch (err: any) {
      console.error('WhatsApp Webhook Error:', err);
      return res.status(500).json({ error: 'Internal Server Error', message: err?.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}

// Sarinda Authentic Bengali AI Engine for WhatsApp with Gemini & Multi-model Fallback
async function generateWhatsAppAiReply(userQuery: string, history: any[] = []): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  const systemInstruction = `
You are "Sarinda Foodie AI" (সারিন্দা রেস্তোরাঁ ও ক্যাটারিংয়ের অফিসিয়াল হোয়াটসঅ্যাপ লাইভ এজেন্ট), representing "Sarinda Restaurant & Catering" located at CK Ghosh Road, Mymensingh, Bangladesh (হটলাইন: +880 1852-363235).

CRITICAL MANDATORY RULES:
1. ALWAYS REPLY IN NATURAL, SWEET, HOSPITABLE BENGALI (বাংলা ভাষা)!
2. You are chatting with a guest directly on WhatsApp. Keep your replies warm, appetizing, fast, concise, and structured with clean bullet points and friendly emojis.
3. If they ask about Biryani or ordering food (e.g. "2 ta biriyani", "কাচ্চি অর্ডার করব", "biryani lagbe"):
   - Warmly accept the order (e.g. "আসসালামু আলাইকুম! জি অবশ্যই, আপনার জন্য স্পেশাল কাচ্চি বিরিয়ানি রেডি করছি।")
   - Proactively recommend our cold digestive Shahi Borhani:
     "কাচ্চির পর ঠান্ডা শাহী বোরহানি খেলে ভারী খাবার সহজে হজম হয় আর আসল শাহী তৃপ্তি মেলে! সাথে বোরহানি দিয়ে দেব কি?"
   - Ask for their delivery address in Mymensingh (বাসা/রোড/এলাকা).
4. MENU & PRICING:
   - Special Kacchi Biryani: Half ৳340 | Full ৳590
   - Basmati Mutton Dum Biryani: ৳450
   - Beef Tehari (Mustard Oil Chinigura): ৳290
   - Shahi Morog Polao (Quarter Roast): ৳290
   - Biye Bari Chicken Roast: ৳180
   - Shahi Mutton Rezala: ৳320
   - Sarinda Royal Grand Platter: ৳990 (3-4 people)
   - Shahi Borhani: Glass ৳75 | 500ml ৳155 | 1L Sharing Bottle ৳325
   - Zafrani Shahi Firni: ৳70
5. RESTAURANT DETAILS:
   - Location: CK Ghosh Road, Mymensingh.
   - Hotline: +880 1852-363235.
   - Fast Hot Delivery (25-40 mins) across CK Ghosh Road, Ganginarpar, Charpara, Notun Bazar, Town Hall, and all of Mymensingh.
   - Dining Options: Standard Hall, VIP Soundproof Private Cabins, and Family Dining.
6. If taking an order, politely ask for:
   1. পছন্দের খাবার ও পরিমাণ
   2. ময়মনসিংহের ডেলিভারি ঠিকানা
   3. মোবাইল নম্বর
`.trim();

  if (apiKey) {
    try {
      const contents: any[] = [];
      contents.push({
        role: 'user',
        parts: [{ text: systemInstruction }]
      });
      contents.push({
        role: 'model',
        parts: [{ text: 'বুঝেছি! আমি সারিন্দার অফিসিয়াল হোয়াটসঅ্যাপ লাইভ এজেন্ট হিসেবে অতিথিদের সাথে সদা বিনম্র ও মধুর বাংলায় অতি দ্রুত কথা বলব এবং অর্ডার নেব।' }]
      });

      // Pass previous turns if available
      if (Array.isArray(history) && history.length > 0) {
        const recent = history.slice(-6);
        for (const msg of recent) {
          contents.push({
            role: (msg.sender === 'user' || msg.role === 'user') ? 'user' : 'model',
            parts: [{ text: msg.text || msg.body || '' }]
          });
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: userQuery }]
      });

      // Multi-model fallback for guaranteed speed and uptime
      const modelNames = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-flash-lite-latest'];

      for (const model of modelNames) {
        try {
          const resp = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents,
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 600,
                  topP: 0.95
                }
              })
            }
          );

          if (resp.ok) {
            const data = await resp.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text && text.trim()) {
              return text.trim();
            }
          } else if (resp.status === 429 || resp.status === 402 || resp.status === 403) {
            // Quota limit hit, break immediately to dynamic fallback
            break;
          }
        } catch {
          // Continue to next model
        }
      }
    } catch (e) {
      console.warn('Gemini call failed for WhatsApp, falling back to dynamic engine:', e);
    }
  }

  // Blazing Fast Intelligent Local Fallback in Natural Bengali (< 50ms)
  const q = userQuery.toLowerCase();

  if (q.includes('biriyani') || q.includes('biryani') || q.includes('kacchi') || q.includes('কাচ্চি') || q.includes('বিরিয়ানি') || q.includes('খাবার')) {
    // Detect quantity
    let qtyText = '২ প্লেট';
    if (q.includes('1') || q.includes('১') || q.includes('এক')) qtyText = '১ প্লেট';
    if (q.includes('3') || q.includes('৩') || q.includes('তিন')) qtyText = '৩ প্লেট';
    if (q.includes('4') || q.includes('৪') || q.includes('চার')) qtyText = '৪ প্লেট';

    return `আসসালামু আলাইকুম! সারিন্দা রেস্তোরাঁয় আপনাকে স্বাগতম! 🍽️\n\n` +
      `জি অবশ্যই! আপনার জন্য ${qtyText} স্পেশাল কাচ্চি বিরিয়ানি (হাফ ৳৩৪০ / ফুল ৳৫৯০) গরম গরম প্রস্তুত করছি।\n\n` +
      `💡 কাচ্চির সাথে কি ঠান্ডা শাহী বোরহানি (৳৭৫/৳১৫৫) যোগ করবেন? কাচ্চির পর বোরহানি খেলে ভারী খাবার সহজে হজম হয় আর আসল পুরান ঢাকার স্বাদ জমে যায়!\n\n` +
      `অনুগ্রহ করে আপনার ডেলিভারি ঠিকানা (সি কে ঘোষ রোড/গাঙ্গিনারপাড়/চরপাড়া/নতুন বাজার ইত্যাদি) ও ফোন নম্বরটি এখানে লিখে পাঠান। আমরা ৩০-৪০ মিনিটের মধ্যে খাবার পৌঁছে দেব।`;
  }

  if (q.includes('borhani') || q.includes('বোরহানি')) {
    return `জি অবশ্যই! আমাদের স্পেশাল ঠান্ডা শাহী বোরহানি খাঁটি টক দই, পুদিনা ও শাহী মশলায় তৈরি।\n\n` +
      `• ছোট গ্লাস: ৳৭৫\n` +
      `• ৫০০ মি.লি. বোতল: ৳১৫৫\n` +
      `• ১ লিটার ফ্যামিলি শেয়ারিং বোতল: ৳৩২৫\n\n` +
      `আপনার জন্য কয়টি বা কত লিটার দিয়ে দেব বলুন?`;
  }

  if (q.includes('menu') || q.includes('মেনু') || q.includes('dam') || q.includes('দাম') || q.includes('price') || q.includes('তালিকা')) {
    return `আসসালামু আলাইকুম! সারিন্দা রেস্তোরাঁ ও ক্যাটারিংয়ের আজকের স্পেশাল মেনু ও মূল্যতালিকা: 📜\n\n` +
      `• স্পেশাল কাচ্চি বিরিয়ানি: ৳৩৪০ (হাফ) | ৳৫৯০ (ফুল)\n` +
      `• বাসমতী মাটন দম বিরিয়ানি: ৳৪৫০\n` +
      `• সরিষার তেলের বিফ তেহারী: ৳২৯০\n` +
      `• শাহী মোরগ পোলাও (আস্ত রোস্ট): ৳২৯০\n` +
      `• বিয়ে বাড়ির চিকেন রোস্ট: ৳১৮০\n` +
      `• শাহী মাটন রেজালা: ৳৩২০\n` +
      `• সারিন্দা রয়্যাল গ্র্যান্ড প্ল্যাটার: ৳৯৯০\n` +
      `• ঠান্ডা শাহী বোরহানি: ৳৭৫ (গ্লাস) | ৳১৫৫ (৫০০মি.লি.) | ৳৩২৫ (১লি.)\n` +
      `• জাফরানী শাহী ফিরনি: ৳৭০\n\n` +
      `💡 ময়মনসিংহের সি কে ঘোষ রোড, গাঙ্গিনারপাড়, চরপাড়া সহ পুরো শহরে ২৫-৪০ মিনিটে ডেলিভারি পেতে পছন্দের খাবার ও ঠিকানা লিখে পাঠান!`;
  }

  if (q.includes('table') || q.includes('টেবিল') || q.includes('booking') || q.includes('বুকিং') || q.includes('cabin') || q.includes('কেবিন')) {
    return `আসসালামু আলাইকুম! সারিন্দা রেস্তোরাঁয় ফ্যামিলি ডাইনিং বা ভিআইপি সাউন্ডপ্রুফ কেবিন বুকিংয়ের জন্য:\n\n` +
      `১. কতজনের জন্য টেবিল বা কেবিন প্রয়োজন?\n` +
      `২. কোন তারিখ ও কয়টার সময় আসবেন?\n` +
      `৩. আপনার নাম ও যোগাযোগ নম্বর।\n\n` +
      `তথ্যগুলো লিখে পাঠিয়ে দিন, আমরা এখনই কনফার্ম করে রাখব। সরাসরি কল করতে পারেন: +880 1852-363235`;
  }

  if (q.includes('address') || q.includes('ঠিকানা') || q.includes('location') || q.includes('কোথায়') || q.includes('phone') || q.includes('নম্বর')) {
    return `সারিন্দা রেস্তোরাঁ ও ক্যাটারিং (ময়মনসিংহ):\n\n` +
      `📍 ঠিকানা: সি কে ঘোষ রোড, ময়মনসিংহ-২২০০ (টাউন হল ও গাঙ্গিনারপাড়ের সন্নিকটে)\n` +
      `📱 হটলাইন / হোয়াটসঅ্যাপ: +880 1852-363235\n` +
      `⏰ খোলা থাকে: প্রতিদিন সকাল ১১:০০টা থেকে রাত ১১:৩০টা পর্যন্ত।`;
  }

  return `আসসালামু আলাইকুম! সারিন্দা রেস্তোরাঁ ও ক্যাটারিং (সি কে ঘোষ রোড, ময়মনসিংহ)-এর লাইভ এজেন্টে স্বাগতম। 🍽️\n\n` +
    `আমি সারিন্দার স্মার্ট এআই এজেন্ট। আমি অতি দ্রুত আপনার খাবার অর্ডার নিতে, মেনুর দাম জানাতে এবং টেবিল বুকিং কনফার্ম করতে পারি।\n\n` +
    `আপনি কি কাচ্চি বিরিয়ানি অর্ডার করতে চান, নাকি আজকের স্পেশাল মেনু দেখতে চান?\n\n` +
    `📞 সরাসরি যোগাযোগ: +880 1852-363235`;
}
