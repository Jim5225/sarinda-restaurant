declare const process: any;

export class WhatsAppClient {
  private static getCredentials() {
    const DEFAULT_TOKEN = 'EAAPhQEh7pfABSmpAbsBqZBhs5Gmq4syyVZCeeRRrNRfa2I1ZAo0HMgzcZABLgPAadOidF503xTKsmzkqZAqBfZC2dZANrK6nraDiejR8JVDcMxl5GQroLtfRb7PBgHgUkj8hrRZAlY1x8TggzZC14hC608TbZCC15D0JF0FTjOxRzARXZC3lXZBPYZCT4d98UpoWxWAZBaZAZCDVQiMYCZBUkNzFeATOcD6IjZBcnTCrZCASVL7s7hvIQgOIKjwbZC1sbOO7onvJ9WfpSdMxLycgtWSefGrMgfsy';
    const token = process.env.WHATSAPP_TOKEN || process.env.WHATSAPP_ACCESS_TOKEN || DEFAULT_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_ID || process.env.WHATSAPP_PHONE_NUMBER_ID || '1472306229289510';

    return { token, phoneId };
  }

  /**
   * Send a text message to a WhatsApp user via Meta Cloud API.
   * PRD Section 13: WhatsApp Integration.
   */
  static async sendTextMessage(toPhone: string, text: string): Promise<{ success: boolean; data?: any; error?: string }> {
    const { token, phoneId } = this.getCredentials();

    if (!token || !phoneId) {
      console.warn('WhatsApp credentials not configured; skipped dispatching Graph API message.');
      return { success: false, error: 'Missing WHATSAPP_TOKEN or WHATSAPP_PHONE_ID' };
    }

    // Clean phone number (e.g. 01852363235 -> 8801852363235)
    let cleanPhone = toPhone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('01')) cleanPhone = '88' + cleanPhone;

    try {
      const response = await fetch(`https://graph.facebook.com/v22.0/${phoneId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: cleanPhone,
          type: 'text',
          text: { body: text }
        })
      });

      const data = await response.json();

      if (response.ok && data?.messages?.[0]?.id) {
        return { success: true, data };
      } else {
        console.warn('Meta WhatsApp API responded with warning/error:', data);
        return { success: false, data, error: data?.error?.message || 'Meta API error' };
      }
    } catch (err: any) {
      console.error('Failed to send WhatsApp message via Meta Cloud API:', err);
      return { success: false, error: err?.message || 'Network error' };
    }
  }

  /**
   * Mark an incoming WhatsApp message as read.
   */
  static async markMessageAsRead(messageId: string): Promise<boolean> {
    const { token, phoneId } = this.getCredentials();
    if (!token || !phoneId || !messageId) return false;

    try {
      const response = await fetch(`https://graph.facebook.com/v22.0/${phoneId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: messageId
        })
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}
