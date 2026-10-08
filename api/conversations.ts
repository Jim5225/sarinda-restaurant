// Vercel Serverless Function: /api/conversations
// Developer & Admin Debugging API
// PRD Section 27: Admin / Developer Debugging

import { ConversationService } from './lib/database/conversationService';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const { id } = req.query || {};

      if (id) {
        const details = await ConversationService.getConversationDetails(id);
        if (!details) {
          return res.status(404).json({ error: 'Conversation not found' });
        }
        return res.status(200).json({ success: true, conversation: details });
      }

      const list = await ConversationService.getRecentConversations(30);
      return res.status(200).json({
        success: true,
        count: list.length,
        conversations: list
      });
    } catch (err: any) {
      console.error('Error fetching conversations:', err);
      return res.status(500).json({ error: 'Internal Server Error', message: err?.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { conversationId, status, requiresHuman } = body || {};

      if (!conversationId) {
        return res.status(400).json({ error: 'conversationId is required' });
      }

      await ConversationService.updateConversationStatus(
        conversationId,
        status || 'active',
        undefined,
        requiresHuman
      );

      return res.status(200).json({ success: true, message: 'Status updated' });
    } catch (err: any) {
      return res.status(500).json({ error: 'Internal Server Error', message: err?.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
