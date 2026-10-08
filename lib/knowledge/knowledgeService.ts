import { SARINDA_GROUP_KNOWLEDGE } from './sarindaKnowledge';

export class KnowledgeService {
  /**
   * Retrieves relevant structured Sarinda knowledge formatted for AI prompt injection.
   * Filters by query intent to keep context concise and authoritative.
   */
  static getRelevantContext(query: string = ''): string {
    const q = query.toLowerCase();
    const sections: string[] = [];

    // Always include core corporate contact & authority info
    sections.push(`
[SARINDA GROUP CORPORATE IDENTITY]
- Name: ${SARINDA_GROUP_KNOWLEDGE.company.banglaName} (${SARINDA_GROUP_KNOWLEDGE.company.name})
- Headquarters: ${SARINDA_GROUP_KNOWLEDGE.company.banglaHqAddress}
- Master Hotline / WhatsApp: ${SARINDA_GROUP_KNOWLEDGE.company.hotline}
- Overview: ${SARINDA_GROUP_KNOWLEDGE.company.banglaAbout}
    `.trim());

    const isRestaurant = q.includes('biryani') || q.includes('kacchi') || q.includes('কাচ্চি') ||
      q.includes('খাবার') || q.includes('মেনু') || q.includes('menu') || q.includes('রেস্তোরাঁ') ||
      q.includes('restaurant') || q.includes('order') || q.includes('অর্ডার') || q.includes('tehari') ||
      q.includes('borhani') || q.includes('বোরহানি') || q.includes('রোস্ট') || q.includes('দাম') ||
      q.includes('price') || q.includes('table') || q.includes('টেবিল') || q.includes('ডেলিভারি') ||
      q.includes('delivery');

    const isBakery = q.includes('cake') || q.includes('কেক') || q.includes('মিষ্টি') ||
      q.includes('sweet') || q.includes('bakery') || q.includes('বেকারি') || q.includes('bread') ||
      q.includes('পাউরুটি') || q.includes('pastry') || q.includes('পেস্ট্রি');

    const isResort = q.includes('resort') || q.includes('রিসোর্ট') || q.includes('cottage') ||
      q.includes('কটেজ') || q.includes('pool') || q.includes('সুইমিং') || q.includes('picnic') ||
      q.includes('পিকনিক') || q.includes('sobari') || q.includes('সভারী');

    const isLights = q.includes('light') || q.includes('লাইট') || q.includes('বাতি') ||
      q.includes('ঝাড়বাতি') || q.includes('interior') || q.includes('ইন্টেরিয়র') ||
      q.includes('chandelier') || q.includes('led');

    const isSorgorom = q.includes('sorgorom') || q.includes('সরগরম') || q.includes('swargam') ||
      q.includes('ভর্তা') || q.includes('bhorta') || q.includes('দেশি');

    // If query is broad or specifically restaurant
    if (isRestaurant || (!isBakery && !isResort && !isLights && !isSorgorom)) {
      const rest = SARINDA_GROUP_KNOWLEDGE.restaurant;
      const menuText = rest.menu.map(m => `• ${m.banglaName} (${m.name}): ৳${m.price} — ${m.description}`).join('\n');
      const offersText = rest.offers.map(o => `• কোড '${o.code}': ${o.title} (${o.discount}) — ${o.details}`).join('\n');

      sections.push(`
[SARINDA RESTAURANT & CATERING - OFFICIAL FACTS]
- Address: ${rest.banglaAddress}
- Hours: ${rest.hours}
- Phone: ${rest.hotline}
- Delivery Coverage: ${rest.deliveryAreas}
- Highlights:
${rest.highlights.map(h => `  * ${h}`).join('\n')}
- Menu & Exact Prices (BDT ৳):
${menuText}
- Active Promo Codes:
${offersText}
      `.trim());
    }

    if (isBakery || (!isRestaurant && !isResort && !isLights && !isSorgorom)) {
      const b = SARINDA_GROUP_KNOWLEDGE.bakery;
      const prodText = b.products.map(p => `• ${p.banglaName} (${p.name}): ${p.price}`).join('\n');
      sections.push(`
[SARINDA BAKERY & CONFECTIONERY]
- Address: ${b.banglaAddress}
- Hours: ${b.hours}
- Products:
${prodText}
      `.trim());
    }

    if (isResort || (!isRestaurant && !isBakery && !isLights && !isSorgorom)) {
      const r = SARINDA_GROUP_KNOWLEDGE.resort;
      sections.push(`
[SARINDA SOBARI RESORT]
- Address: ${r.banglaAddress}
- Hours: ${r.hours}
- Features: ${r.banglaDescription}
- Booking Hotline: ${r.hotline}
      `.trim());
    }

    if (isLights || (!isRestaurant && !isBakery && !isResort && !isSorgorom)) {
      const l = SARINDA_GROUP_KNOWLEDGE.lights;
      sections.push(`
[SARINDA LIGHTS & INTERIOR]
- Address: ${l.banglaAddress}
- Hours: ${l.hours}
- Products: ${l.banglaDescription}
      `.trim());
    }

    if (isSorgorom) {
      const s = SARINDA_GROUP_KNOWLEDGE.sorgorom;
      sections.push(`
[SORGOROM RESTAURANT & CAFE]
- Address: ${s.banglaAddress}
- Hours: ${s.hours}
- Speciality: ${s.banglaDescription}
      `.trim());
    }

    return sections.join('\n\n');
  }
}
