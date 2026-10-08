// Vercel Serverless Function: /api/whatsapp
// Unified API Gateway: Routes Meta WhatsApp Webhooks, Messenger, and Conversation Debugger
// PRD Section 14 & 27

import webhookHandler from './webhooks/whatsapp';
import conversationsHandler from './conversations';

export default async function handler(req: any, res: any) {
  const query = req.query || {};
  const url = req.url || '';

  // Route to Conversation Debugger & Management API
  if (
    query.action === 'conversations' || 
    query.route === 'conversations' || 
    url.includes('/conversations') || 
    url.includes('action=conversations')
  ) {
    return conversationsHandler(req, res);
  }

  // Default: Route to Meta WhatsApp Cloud API Webhook Handler
  return webhookHandler(req, res);
}
