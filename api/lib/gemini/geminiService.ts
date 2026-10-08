import { StructuredAiResponse, IntentType, Message } from '../types';

declare const process: any;

export class GeminiService {
  /**
   * Generates a structured response using Gemini API with contextual Sarinda knowledge.
   */
  static async generateCustomerResponse(
    userMessage: string,
    conversationHistory: Message[] = [],
    knowledgeContext: string
  ): Promise<{ response: StructuredAiResponse; modelUsed: string; responseTimeMs: number }> {
    const startTime = Date.now();
    const apiKey = process.env.GEMINI_API_KEY;

    const systemInstruction = `
You are Sarinda Group's official AI Customer Assistant (সারিন্দা গ্রুপের অফিসিয়াল এআই সহকারী), representing Sarinda Group and all its businesses in Mymensingh, Bangladesh (Hotline: +880 1852-363235).

CORE MANDATORY RULES:
1. COMMUNICATE NATURALLY:
   - Understand Bangla, English, and Banglish (phonetic Bangla in English letters like "biriyani ase?").
   - Reply in the customer's preferred language. Default to warm, polite, hospitable Bengali (বাংলা ভাষা).
2. SOURCE OF TRUTH:
   - Use Sarinda's provided knowledge base below as the ONLY source of truth.
   - NEVER invent prices, products, opening hours, availability, discounts, or policies.
   - If information is not in the knowledge base, politely state that you do not have that specific detail and offer to connect them with a human manager at +880 1852-363235.
3. CONVERSATIONAL & DELIGHTFUL:
   - Keep answers clear, appetizing, structured with clean bullet points and friendly emojis (🍛, 🍽️, 📜, 🥂).
   - When Biryani/Kacchi is asked or ordered, proactively recommend cold digestive Shahi Borhani (৳৭৫/৳১৫৫) and mention fast hot delivery (25-40 mins) across Mymensingh.
4. ORDER & BOOKING GUARDRAILS:
   - NEVER claim that an order has been finalized or delivered without staff confirmation.
   - When a customer wants to place an order, acknowledge it as a draft and politely collect:
     1. পছন্দের খাবার ও পরিমাণ
     2. ডেলিভারি ঠিকানা (বাসা/রোড/এলাকা, ময়মনসিংহ)
     3. মোবাইল নম্বর
5. HUMAN ESCALATION:
   - If the customer asks for a human ("agent", "manush", "কথা বলতে চাই") or is dissatisfied/complaining, set requires_human=true.

OFFICIAL VERIFIED KNOWLEDGE BASE:
${knowledgeContext}

RESPONSE FORMAT:
You MUST respond with a valid JSON object matching this exact structure:
{
  "reply": "The natural message to send to the customer on WhatsApp",
  "intent": "One of: general_information, restaurant_information, menu_information, product_information, pricing, opening_hours, location, offer, order_request, booking_request, complaint, human_handoff, unknown",
  "requires_human": false,
  "action": null
}
`.trim();

    if (apiKey) {
      const modelNames = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-flash-lite-latest'];

      const contents: any[] = [];
      contents.push({
        role: 'user',
        parts: [{ text: systemInstruction }]
      });
      contents.push({
        role: 'model',
        parts: [{ text: '{"reply": "আসসালামু আলাইকুম! সারিন্দা গ্রুপে আপনাকে স্বাগতম। আমি কীভাবে সাহায্য করতে পারি?", "intent": "general_information", "requires_human": false, "action": null}' }]
      });

      // Append recent conversation history
      const recentHistory = conversationHistory.slice(-6);
      for (const m of recentHistory) {
        contents.push({
          role: m.sender === 'customer' ? 'user' : 'model',
          parts: [{ text: m.content }]
        });
      }

      // Append current user message
      contents.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });

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
                  temperature: 0.6,
                  maxOutputTokens: 800,
                  responseMimeType: 'application/json'
                }
              })
            }
          );

          if (resp.ok) {
            const data = await resp.json();
            const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (rawText) {
              try {
                const parsed = JSON.parse(rawText.trim());
                if (parsed.reply) {
                  return {
                    response: {
                      reply: parsed.reply,
                      intent: (parsed.intent as IntentType) || 'general_information',
                      requires_human: Boolean(parsed.requires_human),
                      action: parsed.action || null
                    },
                    modelUsed: model,
                    responseTimeMs: Date.now() - startTime
                  };
                }
              } catch {
                // If JSON parse failed, use clean string
                return {
                  response: {
                    reply: rawText.replace(/```json|```/g, '').trim(),
                    intent: 'general_information',
                    requires_human: false,
                    action: null
                  },
                  modelUsed: model,
                  responseTimeMs: Date.now() - startTime
                };
              }
            }
          } else if (resp.status === 429 || resp.status === 402 || resp.status === 403) {
            // Quota limit hit, failover immediately
            break;
          }
        } catch {
          // Continue to next fallback model
        }
      }
    }

    // High-speed authoritative fallback engine
    const fallbackResponse = this.generateFallbackResponse(userMessage);
    return {
      response: fallbackResponse,
      modelUsed: 'sarinda-local-engine',
      responseTimeMs: Date.now() - startTime
    };
  }

  /**
   * Deterministic, zero-hallucination fallback engine in Bangla for offline/quota resiliency.
   */
  private static generateFallbackResponse(userQuery: string): StructuredAiResponse {
    const q = userQuery.toLowerCase().trim();

    if (q.includes('human') || q.includes('manush') || q.includes('agent') || q.includes('কথা বলতে চাই') || q.includes('প্রতিনিধি')) {
      return {
        reply: `আসসালামু আলাইকুম! অবশ্যই, আপনাকে আমাদের সারিন্দা কাস্টমার সাপোর্ট প্রতিনিধির সাথে যুক্ত করছি। অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন অথবা সরাসরি কল করতে পারেন: +880 1852-363235।`,
        intent: 'human_handoff',
        requires_human: true,
        action: 'escalate'
      };
    }

    if (q.includes('biryani') || q.includes('kacchi') || q.includes('কাচ্চি') || q.includes('বিরিয়ানি') || q.includes('অর্ডার')) {
      return {
        reply: `আসসালামু আলাইকুম! সারিন্দা রেস্তোরাঁয় আপনাকে স্বাগতম! 🍽️\n\nআমাদের স্পেশাল কাচ্চি বিরিয়ানি (হাফ ৳৩৪০ / ফুল ৳৫৯০) গরম গরম প্রস্তুত রয়েছে।\n\n💡 কাচ্চির সাথে কি ঠান্ডা শাহী বোরহানি (৳৭৫/৳১৫৫) যোগ করবেন? কাচ্চির পর বোরহানি খেলে ভারী খাবার সহজে হজম হয় আর পুরান ঢাকার আসল স্বাদ জমে যায়!\n\nআপনার পছন্দের খাবার, পরিমাণ এবং ময়মনসিংহের ডেলিভারি ঠিকানা (সি কে ঘোষ রোড/গাঙ্গিনারপাড়/চরপাড়া/নতুন বাজার ইত্যাদি) লিখে পাঠালে আমরা দ্রুত পৌঁছে দেব।`,
        intent: 'order_request',
        requires_human: false,
        action: 'draft_order'
      };
    }

    if (q.includes('menu') || q.includes('মেনু') || q.includes('দাম') || q.includes('price')) {
      return {
        reply: `সারিন্দা রেস্তোরাঁর আজকের স্পেশাল মেনু ও মূল্যতালিকা: 📜\n\n` +
          `• স্পেশাল কাচ্চি বিরিয়ানি: ৳৩৪০ (হাফ) | ৳৫৯০ (ফুল)\n` +
          `• বাসমতী মাটন দম বিরিয়ানি: ৳৪৫০\n` +
          `• সরিষার তেলের বিফ তেহারী: ৳২৯০\n` +
          `• শাহী মোরগ পোলাও: ৳২৯০\n` +
          `• বিয়ে বাড়ির চিকেন রোস্ট: ৳১৮০\n` +
          `• শাহী মাটন রেজালা: ৳৩২০\n` +
          `• সারিন্দা রয়্যাল গ্র্যান্ড প্ল্যাটার: ৳৯৯০\n` +
          `• ঠান্ডা শাহী বোরহানি: ৳৭৫ (গ্লাস) | ৳১৫৫ (৫০০মি.লি.) | ৳৩২৫ (১লি.)\n` +
          `• জাফরানী শাহী ফিরনি: ৳৭০\n\n` +
          `ময়মনসিংহে ২৫-৪০ মিনিটে গরম হোম ডেলিভারি পেতে পছন্দের খাবার লিখে জানান!`,
        intent: 'menu_information',
        requires_human: false,
        action: null
      };
    }

    if (q.includes('resort') || q.includes('রিসোর্ট') || q.includes('কটেজ') || q.includes('sobari')) {
      return {
        reply: `সারিন্দা সভারী রিসোর্ট ময়মনসিংহের বাইপাস রোডে অবস্থিত একটি শান্ত ও নয়নাভিরাম ইকো-রিসোর্ট। এখানে রয়েছে প্রিমিয়াম কাঠের কটেজ, আধুনিক সুইমিং পুল, খেলার মাঠ এবং ফ্যামিলি ডে-আউট পিকনিকের সুযোগ। বুকিং তথ্যের জন্য কল করুন: +880 1852-363235।`,
        intent: 'product_information',
        requires_human: false,
        action: null
      };
    }

    if (q.includes('bakery') || q.includes('কেক') || q.includes('cake') || q.includes('মিষ্টি')) {
      return {
        reply: `সারিন্দা বেকারি অ্যান্ড কনফেকশনারিতে রয়েছে প্রতিদিন ওভেনে বেক করা ফ্রেশ পাউরুটি, প্রিমিয়াম জন্মদিনের কেক (প্রতি পাউন্ড ৳৭০০+), ব্ল্যাক ফরেস্ট পেস্ট্রি (৳৮০), এবং ঐতিহ্যবাহী মিষ্টির আকর্ষণীয় গিফট বক্স। শাখা: সি কে ঘোষ রোড ও গাঙ্গিনারপাড়, ময়মনসিংহ।`,
        intent: 'product_information',
        requires_human: false,
        action: null
      };
    }

    if (q.includes('address') || q.includes('ঠিকানা') || q.includes('location') || q.includes('কোথায়') || q.includes('hours') || q.includes('সময়')) {
      return {
        reply: `সারিন্দা রেস্তোরাঁ ও ক্যাটারিং:\n` +
          `📍 ঠিকানা: সি কে ঘোষ রোড, ময়মনসিংহ-২২০০ (টাউন হল ও গাঙ্গিনারপাড়ের নিকটে)\n` +
          `⏰ খোলার সময়: প্রতিদিন সকাল ১১:০০টা থেকে রাত ১১:৩০টা পর্যন্ত।\n` +
          `📱 হটলাইন: +880 1852-363235।`,
        intent: 'location',
        requires_human: false,
        action: null
      };
    }

    return {
      reply: `আসসালামু আলাইকুম! সারিন্দা গ্রুপে আপনাকে স্বাগতম। 🍽️✨\n\n` +
        `আমি সারিন্দার স্মার্ট এআই কাস্টমার অ্যাসিস্ট্যান্ট। আমি আপনাকে সারিন্দা রেস্তোরাঁর কাচ্চি বিরিয়ানি অর্ডার, মেনুর দাম, বেকারি, সভারী রিসোর্ট বা টেবিল বুকিং করতে সাহায্য করতে পারি।\n\n` +
        `আজ আপনাকে কীভাবে সহায়তা করতে পারি? (হটলাইন: +880 1852-363235)`,
      intent: 'general_information',
      requires_human: false,
      action: null
    };
  }
}
