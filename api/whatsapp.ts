// Vercel Serverless Function: /api/whatsapp
// WhatsApp AI Live Agent Webhook for Sarinda Restaurant
// Supports Meta WhatsApp Cloud API, Twilio WhatsApp, and direct testing.

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
      let phoneNumberId = process.env.WHATSAPP_PHONE_ID || '';
      let isTwilio = false;

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

      // Case C: Direct Simulation / Tester payload { prompt: "...", from: "..." }
      if (!userText && (body?.prompt || body?.message)) {
        userText = body.prompt || body.message;
        senderPhone = body.from || '8801700000000';
      }

      if (!userText.trim()) {
        // Return 200 to acknowledge Meta webhook (even for status updates or read receipts)
        return res.status(200).json({ status: 'ignored_empty_message' });
      }

      // Generate Authentic Warm Bengali AI Reply
      const replyText = await generateWhatsAppAiReply(userText.trim());

      // If Meta WhatsApp Cloud API: Send message back to user via Graph API
      const whatsappToken = process.env.WHATSAPP_TOKEN;
      if (whatsappToken && phoneNumberId && senderPhone && !isTwilio) {
        try {
          const metaRes = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
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

      // Return JSON response (suitable for webhook acknowledgements and API clients)
      return res.status(200).json({
        success: true,
        to: senderPhone,
        input: userText,
        reply: replyText
      });

    } catch (err: any) {
      console.error('WhatsApp Webhook Error:', err);
      return res.status(500).json({ error: 'Internal Server Error', message: err?.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}

// Sarinda Authentic Bengali AI Engine for WhatsApp
async function generateWhatsAppAiReply(userQuery: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  const systemInstruction = `
You are "Sarinda Foodie AI" (সারিন্দা রেস্তোরাঁর অফিসিয়াল হোয়াটসঅ্যাপ লাইভ এজেন্ট), representing "Sarinda Restaurant & Catering" located at CK Ghosh Road, Mymensingh, Bangladesh.

CRITICAL MANDATORY RULES:
1. ALWAYS REPLY IN NATURAL, SWEET, HOSPITABLE BENGALI (বাংলা ভাষা)!
2. You are chatting with a guest directly on WhatsApp. Keep your replies friendly, appetizing, concise, and structured with clean bullet points and emojis.
3. If they ask about Biryani or ordering food (e.g. "2 ta biriyani", "কাচ্চি অর্ডার করব"):
   - Warmly accept the order (e.g. "আসসালামু আলাইকুম! জি অবশ্যই, আপনার জন্য স্পেশাল কাচ্চি বিরিয়ানি রেডি করছি।")
   - Proactively suggest our cold digestive Shahi Borhani:
     "কাচ্চির পর ঠান্ডা শাহী বোরহানি খেলে ভারী খাবার সহজে হজম হয় আর স্বাদটাও জমে যায়! সাথে দিয়ে দেব কি?"
   - Ask for their delivery address in Mymensingh.
4. MENU & PRICING:
   - Special Kacchi Biryani: ৳340 (Full: ৳590)
   - Basmati Mutton Dum Biryani: ৳450
   - Beef Tehari (Mustard Oil): ৳290
   - Shahi Morog Polao (Quarter Roast Chicken): ৳290
   - Biye Bari Chicken Roast: ৳180
   - Shahi Mutton Rezala: ৳320
   - Sarinda Royal Grand Platter: ৳990
   - Shahi Borhani: Glass ৳75 | 500ml ৳155 | 1L Sharing Bottle ৳325
   - Zafrani Shahi Firni: ৳70
5. RESTAURANT DETAILS:
   - Location: CK Ghosh Road, Mymensingh.
   - Hotline: +880 1712-121434.
   - Fast Hot Delivery (25-40 mins) across CK Ghosh Road, Ganginarpar, Charpara, Notun Bazar, and all of Mymensingh.
6. If they want to place an order, ask for:
   1. তাদের পছন্দের খাবার ও পরিমাণ
   2. ডেলিভারি ঠিকানা (বাসা/রোড/এলাকা)
   3. মোবাইল নম্বর
`.trim();

  if (apiKey) {
    try {
      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: systemInstruction }] },
              { role: 'model', parts: [{ text: 'বুঝেছি! আমি সারিন্দার অফিসিয়াল হোয়াটসঅ্যাপ লাইভ এজেন্ট হিসেবে অতিথিদের সাথে সদা বিনম্র ও মধুর বাংলায় কথা বলব।' }] },
              { role: 'user', parts: [{ text: userQuery }] }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 600
            }
          })
        }
      );

      if (resp.ok) {
        const data = await resp.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return text.trim();
        }
      }
    } catch (e) {
      console.warn('Gemini call failed for WhatsApp, falling back to dynamic engine:', e);
    }
  }

  // Fallback intelligent response in Bengali if API quota is exhausted
  const q = userQuery.toLowerCase();

  if (q.includes('biriyani') || q.includes('biryani') || q.includes('kacchi') || q.includes('কাচ্চি') || q.includes('বিরিয়ানি')) {
    return `আসসালামু আলাইকুম! সারিন্দায় আপনাকে স্বাগত! 🍽️\n\nজি অবশ্যই! আমাদের স্পেশাল কাচ্চি বিরিয়ানি (হাফ ৳৩৪০ / ফুল ৳৫৯০) গরম গরম প্রস্তুত রয়েছে।\n\nকাচ্চির সাথে কি ঠান্ডা শাহী বোরহানি (৳৭৫/৳১৫৫) নিবেন? কাচ্চির পর বোরহানি খেলে ভারী খাবার সহজে হজম হয় আর স্বাদটাও দ্বিগুণ হয়ে যায়!\n\nআপনার ডেলিভারির সম্পূর্ণ ঠিকানা ও ফোন নাম্বারটি এখানে লিখলে আমরা ৩০-৪০ মিনিটের মধ্যে খাবার পৌঁছে দেব।`;
  }

  if (q.includes('menu') || q.includes('মেনু') || q.includes('dam') || q.includes('দাম') || q.includes('price')) {
    return `আসসালামু আলাইকুম! সারিন্দা রেস্তোরাঁর আজকের স্পেশাল মেনু ও মূল্যতালিকা: 📜\n\n` +
      `• স্পেশাল কাচ্চি বিরিয়ানি: ৳৩৪০ (হাফ) | ৳৫৯০ (ফুল)\n` +
      `• বাসমতী মাটন দম বিরিয়ানি: ৳৪৫০\n` +
      `• সরিষার তেলের বিফ তেহারী: ৳২৯০\n` +
      `• শাহী মোরগ পোলাও (আস্ত রোস্ট): ৳২৯০\n` +
      `• বিয়ে বাড়ির চিকেন রোস্ট: ৳১৮০\n` +
      `• শাহী মাটন রেজালা: ৳৩২০\n` +
      `• সারিন্দা রয়্যাল গ্র্যান্ড প্ল্যাটার: ৳৯৯০\n` +
      `• ঠান্ডা শাহী বোরহানি: ৳৭৫ (গ্লাস) | ৳১৫৫ (৫০০মি.লি.)\n` +
      `• জাফরানী শাহী ফিরনি: ৳৭০\n\n` +
      `💡 ধানমন্ডি ও আশেপাশের এলাকায় ৩০-৪০ মিনিটে হোম ডেলিভারি পেতে আপনার কাঙ্ক্ষিত খাবারের নাম ও ঠিকানা লিখে পাঠান!`;
  }

  if (q.includes('table') || q.includes('টেবিল') || q.includes('booking') || q.includes('বুকিং') || q.includes('cabin') || q.includes('কেবিন')) {
    return `আসসালামু আলাইকুম! সারিন্দা রেস্তোরাঁয় টেবিল বা ফ্যামিলি কেবিন বুকিংয়ের জন্য:\n\n` +
      `১. কতজনের জন্য টেবিল প্রয়োজন?\n` +
      `২. কোন তারিখ ও কয়টার সময় আসবেন?\n` +
      `৩. আপনার নাম ও ফোন নম্বর।\n\n` +
      `তথ্যগুলো লিখে পাঠিয়ে দিন, আমরা সাথে সাথে আপনার টেবিলটি কনফার্ম করে রাখব। সরাসরি কল করতে পারেন: +880 1712-121434`;
  }

  return `আসসালামু আলাইকুম! সারিন্দা রেস্তোরাঁ ও ক্যাটারিং-এ আপনাকে স্বাগতম। 🍽️\n\n` +
    `আমি সারিন্দার লাইভ এজেন্ট। আপনি কি খাবার অর্ডার করতে চান, নাকি আজকের মেনু ও টেবিল বুকিং নিয়ে জানতে চান?\n\n` +
    `আমাদের হটলাইন: +880 1712-121434\n` +
    `ঠিকানা: রোড ১৬, ধানমন্ডি ২৭ (পুরাতন), ঢাকা।`;
}
