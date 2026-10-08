// Vercel Serverless Function: /api/webhooks/whatsapp
// Official WhatsApp Cloud API Webhook Handler for Sarinda Group
// PRD Section 14: WhatsApp Webhook

import { AiCommunicationService } from '../lib/aiService';
import conversationsHandler from '../conversations';

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

  const query = req.query || {};
  const url = req.url || '';

  // Route to Conversation Debugger & Management API if requested
  if (
    query.action === 'conversations' || 
    query.route === 'conversations' || 
    url.includes('/conversations') || 
    url.includes('action=conversations')
  ) {
    return conversationsHandler(req, res);
  }

  // 1. Meta Webhook Verification (GET request)
  if (req.method === 'GET') {
    const mode = query['hub.mode'];
    const token = query['hub.verify_token'];
    const challenge = query['hub.challenge'];

    const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'sarinda_whatsapp_token_2026';

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Meta WhatsApp Webhook verified successfully!');
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
          // might be urlencoded
        }
      }

      let userText = '';
      let senderPhone = '';
      let customerName: string | undefined;
      let platformMessageId: string | undefined;

      // Case A: Meta WhatsApp Cloud API format
      if (body?.object === 'whatsapp_business_account' || body?.entry?.[0]?.changes) {
        const change = body?.entry?.[0]?.changes?.[0]?.value;
        const message = change?.messages?.[0];
        const contact = change?.contacts?.[0];

        if (message) {
          userText = message.text?.body || message.interactive?.button_reply?.title || '';
          senderPhone = message.from || '';
          platformMessageId = message.id;
          customerName = contact?.profile?.name;
        }
      }

      // Case B: Direct simulation / tester payload
      if (!userText && (body?.prompt || body?.message)) {
        userText = body.prompt || body.message;
        senderPhone = body.from || '8801852363235';
        customerName = body.name || 'Test Customer';
      }

      // Case C: Twilio WhatsApp format
      if (!userText && (body?.Body || req.body?.Body)) {
        userText = body?.Body || req.body?.Body;
        senderPhone = (body?.From || req.body?.From || '').replace('whatsapp:', '');
      }

      if (!userText.trim()) {
        // Return 200 immediately to acknowledge Meta events like read-receipts or status deliveries
        return res.status(200).json({ status: 'ignored_empty_message' });
      }

      // Execute AI Communication Service
      const result = await AiCommunicationService.processCustomerMessage({
        platform: 'whatsapp',
        platformUserId: senderPhone,
        customerName,
        messageText: userText.trim(),
        platformMessageId
      });

      return res.status(200).json({
        success: true,
        to: senderPhone,
        input: userText,
        reply: result.reply,
        text: result.reply,
        intent: result.intent,
        requiresHuman: result.requiresHuman,
        sentToPlatform: result.sentToPlatform,
        conversationId: result.conversationId
      });

    } catch (err: any) {
      console.error('WhatsApp Webhook Processing Error:', err);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: err?.message || 'Unknown error'
      });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
