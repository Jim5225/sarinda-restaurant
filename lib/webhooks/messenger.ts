// Vercel Serverless Function: /api/webhooks/messenger
// Facebook Page Messenger Webhook Handler for Sarinda Group
// PRD Section 15 & 23: Messenger Integration — Phase 2

import { AiCommunicationService } from '../aiService';

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

    const VERIFY_TOKEN = process.env.MESSENGER_VERIFY_TOKEN || process.env.WHATSAPP_VERIFY_TOKEN || 'sarinda_messenger_token_2026';

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Meta Messenger Webhook verified successfully!');
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
        try { body = JSON.parse(body); } catch {}
      }

      if (body?.object === 'page') {
        const entry = body.entry?.[0];
        const messaging = entry?.messaging?.[0];

        if (messaging && messaging.message?.text) {
          const senderPsid = messaging.sender?.id;
          const userText = messaging.message.text;

          // Shared AI Service & Knowledge Base
          const result = await AiCommunicationService.processCustomerMessage({
            platform: 'messenger',
            platformUserId: senderPsid,
            messageText: userText,
            platformMessageId: messaging.message.mid
          });

          // Send response via Meta Send API if page access token is configured
          const pageAccessToken = process.env.MESSENGER_PAGE_ACCESS_TOKEN;
          if (pageAccessToken && senderPsid) {
            try {
              await fetch(`https://graph.facebook.com/v22.0/me/messages?access_token=${pageAccessToken}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  recipient: { id: senderPsid },
                  message: { text: result.reply }
                })
              });
            } catch (sendErr) {
              console.warn('Failed to dispatch Messenger reply:', sendErr);
            }
          }

          return res.status(200).json({ success: true, result });
        }

        return res.status(200).json({ status: 'EVENT_RECEIVED' });
      }

      return res.status(200).json({ status: 'ignored_non_page_event' });
    } catch (err: any) {
      console.error('Messenger Webhook Error:', err);
      return res.status(500).json({ error: 'Internal Server Error', message: err?.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
