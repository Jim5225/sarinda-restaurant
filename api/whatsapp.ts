// Vercel Serverless Function: /api/whatsapp (Alias to /api/webhooks/whatsapp)
// Ensures backward compatibility for frontend widgets and configured webhook endpoints.

import webhookHandler from './webhooks/whatsapp';

export default async function handler(req: any, res: any) {
  return webhookHandler(req, res);
}
