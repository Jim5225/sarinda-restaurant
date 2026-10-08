import { IntentType, OrderDraft } from '../types';

export class ActionService {
  /**
   * Determine if the customer request requires human handoff.
   * PRD Section 18: Human Handoff.
   */
  static shouldEscalateToHuman(query: string, rawIntent?: string): { requiresHuman: boolean; reason?: string } {
    const q = query.toLowerCase().trim();

    // Explicit request for a human representative
    const humanKeywords = [
      'human', 'agent', 'manush', 'representative', 'operator', 'manager',
      'মানুষের সাথে কথা', 'প্রতিনিধি', 'ম্যানেজার', 'অপারেটর', 'লাইভ মানুষ',
      'কথা বলতে চাই কারো সাথে', 'call me', 'ফোন দিন'
    ];
    for (const kw of humanKeywords) {
      if (q.includes(kw)) {
        return { requiresHuman: true, reason: 'Customer requested human agent' };
      }
    }

    // Complaints or unresolved disputes
    const complaintKeywords = [
      'complaint', 'bad food', 'spoiled', 'dirty', 'fraud', 'cheat',
      'অভিযোগ', 'বাজে খাবার', 'নষ্ট', 'পচা', 'ঠকিয়েছে', 'পুলিশ', 'রিফান্ড চাই', 'টাকা ফেরত'
    ];
    for (const kw of complaintKeywords) {
      if (q.includes(kw)) {
        return { requiresHuman: true, reason: 'Customer expressed serious complaint or refund issue' };
      }
    }

    // Intent-based escalation
    if (rawIntent === 'human_handoff' || rawIntent === 'complaint') {
      return { requiresHuman: true, reason: `AI intent classified as ${rawIntent}` };
    }

    return { requiresHuman: false };
  }

  /**
   * Extract draft food items or booking details if customer wants to order.
   * PRD Section 19: Order System.
   */
  static extractOrderDraft(query: string): OrderDraft | null {
    const q = query.toLowerCase();

    const isOrderQuery = q.includes('order') || q.includes('অর্ডার') || q.includes('চাই') ||
      q.includes('নেব') || q.includes('দিন') || q.includes('plate') || q.includes('প্লেট') ||
      q.includes('biryani') || q.includes('kacchi') || q.includes('কাচ্চি') || q.includes('তেহারী');

    if (!isOrderQuery) return null;

    const items: Array<{ name: string; quantity: number; unitPrice?: number }> = [];

    // Parse Biryani quantity
    let kacchiQty = 0;
    const numMatch = q.match(/(\d+|[১-৯])\s*(টা|টি|প্লেট|plate)?\s*(কাচ্চি|বিরিয়ানি|kacchi|biryani)?/);
    if (numMatch) {
      const bnMap: { [k: string]: number } = { '১': 1, '২': 2, '৩': 3, '৪': 4, '৫': 5 };
      kacchiQty = bnMap[numMatch[1]] || parseInt(numMatch[1], 10) || 0;
    }

    if (q.includes('কাচ্চি') || q.includes('kacchi')) {
      items.push({
        name: 'Special Kacchi Biryani (Half)',
        quantity: kacchiQty > 0 ? kacchiQty : 1,
        unitPrice: 340
      });
    }

    if (q.includes('বোরহানি') || q.includes('borhani')) {
      items.push({
        name: 'Shahi Borhani (Glass)',
        quantity: kacchiQty > 0 ? kacchiQty : 1,
        unitPrice: 75
      });
    }

    if (q.includes('রোস্ট') || q.includes('roast')) {
      items.push({
        name: 'Biye Bari Chicken Roast',
        quantity: 1,
        unitPrice: 180
      });
    }

    if (items.length > 0) {
      return {
        items,
        status: 'draft'
      };
    }

    return null;
  }

  /**
   * Post-process and ensure strict guardrails on AI reply.
   * PRD Section 29: AI Guardrails.
   */
  static sanitizeAiReply(reply: string): string {
    let clean = reply.trim();

    // Guardrail against claiming order is finalized without staff confirmation
    if (clean.includes('আপনার অর্ডার কনফার্ম হয়েছে') && !clean.includes('ড্রাফট') && !clean.includes('প্রস্তুত')) {
      clean = clean.replace(
        'আপনার অর্ডার কনফার্ম হয়েছে',
        'আপনার অর্ডারের তথ্য সংগ্রহ করা হয়েছে (ড্রাফট হিসেবে সংরক্ষিত)'
      );
    }

    return clean;
  }
}
