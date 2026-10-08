import { getSupabaseClient } from './client';
import { Customer, Conversation, Message, Platform, SenderType, MessageMetadata } from '../types';

// In-Memory cache & fallback store for resilient serverless execution
const inMemoryCustomers = new Map<string, Customer>();
const inMemoryConversations = new Map<string, Conversation>();
const inMemoryMessages: Message[] = [];
const inMemoryAiEvents: any[] = [];

export class ConversationService {
  /**
   * Find existing customer by platform & user ID, or create a new one.
   */
  static async findOrCreateCustomer(
    platform: Platform,
    platformUserId: string,
    customerName?: string
  ): Promise<Customer> {
    const supabase = getSupabaseClient();
    const key = `${platform}:${platformUserId}`;

    if (supabase) {
      try {
        const { data: existing, error } = await supabase
          .from('customers')
          .select('*')
          .eq('platform', platform)
          .eq('phone', platformUserId)
          .single();

        if (existing && !error) {
          if (customerName && existing.name !== customerName) {
            await supabase
              .from('customers')
              .update({ name: customerName, updated_at: new Date().toISOString() })
              .eq('id', existing.id);
            existing.name = customerName;
          }
          inMemoryCustomers.set(key, existing);
          return existing;
        }

        const now = new Date().toISOString();
        const newCustomer: Customer = {
          id: `cust_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          phone: platformUserId,
          name: customerName,
          platform,
          created_at: now,
          updated_at: now
        };

        const { data: inserted, error: insertErr } = await supabase
          .from('customers')
          .insert(newCustomer)
          .select()
          .single();

        if (inserted && !insertErr) {
          inMemoryCustomers.set(key, inserted);
          return inserted;
        }
      } catch (err) {
        console.warn('Supabase customer query fallback to memory:', err);
      }
    }

    // In-memory fallback
    let customer = inMemoryCustomers.get(key);
    const now = new Date().toISOString();

    if (!customer) {
      customer = {
        id: `cust_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        phone: platformUserId,
        name: customerName || `Guest (${platformUserId.slice(-4)})`,
        platform,
        created_at: now,
        updated_at: now
      };
      inMemoryCustomers.set(key, customer);
    } else if (customerName && customer.name !== customerName) {
      customer.name = customerName;
      customer.updated_at = now;
    }

    return customer;
  }

  /**
   * Find an active conversation or initialize a new conversation for customer.
   */
  static async findOrCreateConversation(
    customerId: string,
    platform: Platform,
    platformUserId: string
  ): Promise<Conversation> {
    const supabase = getSupabaseClient();

    if (supabase) {
      try {
        const { data: activeConv, error } = await supabase
          .from('conversations')
          .select('*')
          .eq('customer_id', customerId)
          .eq('status', 'active')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (activeConv && !error) {
          inMemoryConversations.set(activeConv.id, activeConv);
          return activeConv;
        }

        const now = new Date().toISOString();
        const newConv: Conversation = {
          id: `conv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          customer_id: customerId,
          platform,
          platform_user_id: platformUserId,
          status: 'active',
          created_at: now,
          updated_at: now
        };

        const { data: inserted, error: insertErr } = await supabase
          .from('conversations')
          .insert(newConv)
          .select()
          .single();

        if (inserted && !insertErr) {
          inMemoryConversations.set(inserted.id, inserted);
          return inserted;
        }
      } catch (err) {
        console.warn('Supabase conversation query fallback to memory:', err);
      }
    }

    // In-memory fallback
    for (const conv of inMemoryConversations.values()) {
      if (conv.customer_id === customerId && conv.status === 'active') {
        return conv;
      }
    }

    const now = new Date().toISOString();
    const conv: Conversation = {
      id: `conv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      customer_id: customerId,
      platform,
      platform_user_id: platformUserId,
      status: 'active',
      created_at: now,
      updated_at: now
    };
    inMemoryConversations.set(conv.id, conv);
    return conv;
  }

  /**
   * Save a message to conversation history.
   */
  static async saveMessage(
    conversationId: string,
    sender: SenderType,
    content: string,
    messageType: 'text' | 'image' | 'interactive' = 'text',
    platformMessageId?: string,
    metadata?: MessageMetadata
  ): Promise<Message> {
    const supabase = getSupabaseClient();
    const now = new Date().toISOString();

    const msg: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      conversation_id: conversationId,
      sender,
      message_type: messageType,
      content,
      platform_message_id: platformMessageId,
      created_at: now,
      metadata
    };

    inMemoryMessages.push(msg);

    // Update conversation timestamp
    const conv = inMemoryConversations.get(conversationId);
    if (conv) {
      conv.updated_at = now;
      if (metadata?.intent) conv.last_intent = metadata.intent;
    }

    if (supabase) {
      try {
        await supabase.from('messages').insert(msg);
        await supabase
          .from('conversations')
          .update({
            updated_at: now,
            last_intent: metadata?.intent || undefined
          })
          .eq('id', conversationId);
      } catch (err) {
        console.warn('Supabase saveMessage fallback to memory:', err);
      }
    }

    return msg;
  }

  /**
   * Retrieve recent conversation history formatted for Gemini context.
   */
  static async getConversationHistory(conversationId: string, limit: number = 8): Promise<Message[]> {
    const supabase = getSupabaseClient();

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conversationId)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (data && !error) {
          return data.reverse();
        }
      } catch (err) {
        console.warn('Supabase getConversationHistory fallback to memory:', err);
      }
    }

    const filtered = inMemoryMessages.filter(m => m.conversation_id === conversationId);
    return filtered.slice(-limit);
  }

  /**
   * Update conversation status (e.g. human handoff or resolved).
   */
  static async updateConversationStatus(
    conversationId: string,
    status: 'active' | 'handed_off' | 'closed',
    lastIntent?: string,
    requiresHuman?: boolean
  ): Promise<void> {
    const now = new Date().toISOString();
    const conv = inMemoryConversations.get(conversationId);
    if (conv) {
      conv.status = status;
      conv.updated_at = now;
      if (lastIntent) conv.last_intent = lastIntent;
      if (typeof requiresHuman === 'boolean') conv.requires_human = requiresHuman;
    }

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase
          .from('conversations')
          .update({
            status,
            updated_at: now,
            last_intent: lastIntent,
            requires_human: requiresHuman
          })
          .eq('id', conversationId);
      } catch (err) {
        console.warn('Supabase updateConversationStatus error:', err);
      }
    }
  }

  /**
   * Log an AI generation event for analytics and debugging.
   */
  static async logAiEvent(
    conversationId: string,
    platform: Platform,
    intent: string,
    responseTimeMs: number,
    model: string,
    error?: string
  ): Promise<void> {
    const event = {
      id: `evt_${Date.now()}`,
      conversation_id: conversationId,
      platform,
      intent,
      response_time_ms: responseTimeMs,
      model,
      error,
      created_at: new Date().toISOString()
    };

    inMemoryAiEvents.push(event);

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('ai_events').insert(event);
      } catch {
        // Safe ignore
      }
    }
  }

  /**
   * Get recent conversations for the Developer / Admin Debugging Dashboard.
   * PRD Section 27: Admin / Developer Debugging.
   */
  static async getRecentConversations(limit: number = 25): Promise<any[]> {
    const supabase = getSupabaseClient();

    if (supabase) {
      try {
        const { data: convs, error } = await supabase
          .from('conversations')
          .select(`
            id,
            platform,
            platform_user_id,
            status,
            last_intent,
            requires_human,
            created_at,
            updated_at,
            customers (id, name, phone),
            messages (id, sender, content, created_at, metadata)
          `)
          .order('updated_at', { ascending: false })
          .limit(limit);

        if (convs && !error) {
          return convs.map(c => {
            const msgs = (c.messages || []).sort(
              (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            );
            const lastMsg = msgs[msgs.length - 1];
            return {
              id: c.id,
              platform: c.platform,
              platformUserId: c.platform_user_id,
              customerName: (Array.isArray(c.customers) ? (c.customers[0] as any)?.name : (c.customers as any)?.name) || c.platform_user_id,
              status: c.status,
              lastIntent: c.last_intent || 'unknown',
              requiresHuman: c.requires_human || false,
              updatedAt: c.updated_at,
              messageCount: msgs.length,
              lastMessage: lastMsg?.content || '',
              lastSender: lastMsg?.sender || ''
            };
          });
        }
      } catch (err) {
        console.warn('Supabase getRecentConversations fallback to memory:', err);
      }
    }

    // In-memory format
    const convList = Array.from(inMemoryConversations.values())
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, limit);

    return convList.map(c => {
      const msgs = inMemoryMessages.filter(m => m.conversation_id === c.id);
      const lastMsg = msgs[msgs.length - 1];
      const cust = Array.from(inMemoryCustomers.values()).find(u => u.id === c.customer_id);

      return {
        id: c.id,
        platform: c.platform,
        platformUserId: c.platform_user_id,
        customerName: cust?.name || c.platform_user_id,
        status: c.status,
        lastIntent: c.last_intent || 'unknown',
        requiresHuman: c.requires_human || false,
        updatedAt: c.updated_at,
        messageCount: msgs.length,
        lastMessage: lastMsg?.content || '',
        lastSender: lastMsg?.sender || ''
      };
    });
  }

  /**
   * Get full details of a single conversation with all its messages.
   */
  static async getConversationDetails(conversationId: string): Promise<any | null> {
    const supabase = getSupabaseClient();

    if (supabase) {
      try {
        const { data: conv } = await supabase
          .from('conversations')
          .select('*, customers(*), messages(*)')
          .eq('id', conversationId)
          .single();

        if (conv) return conv;
      } catch {
        // fallback
      }
    }

    const conv = inMemoryConversations.get(conversationId);
    if (!conv) return null;

    const cust = Array.from(inMemoryCustomers.values()).find(u => u.id === conv.customer_id);
    const msgs = inMemoryMessages.filter(m => m.conversation_id === conversationId);

    return {
      ...conv,
      customer: cust,
      messages: msgs
    };
  }
}
