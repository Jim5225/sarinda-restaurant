// Domain Types for Sarinda AI Customer Communication System

export type Platform = 'whatsapp' | 'messenger';
export type SenderType = 'customer' | 'ai' | 'human_agent' | 'system';
export type ConversationStatus = 'active' | 'handed_off' | 'closed';

export interface Customer {
  id: string;
  phone: string;
  name?: string;
  platform: Platform;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  customer_id: string;
  platform: Platform;
  platform_user_id: string;
  status: ConversationStatus;
  last_intent?: string;
  requires_human?: boolean;
  created_at: string;
  updated_at: string;
}

export interface MessageMetadata {
  intent?: string;
  confidence?: number;
  tokens_used?: number;
  response_time_ms?: number;
  model?: string;
  order_draft?: any;
  error?: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender: SenderType;
  message_type: 'text' | 'image' | 'interactive';
  content: string;
  platform_message_id?: string;
  created_at: string;
  metadata?: MessageMetadata;
}

export type IntentType =
  | 'general_information'
  | 'restaurant_information'
  | 'menu_information'
  | 'product_information'
  | 'pricing'
  | 'opening_hours'
  | 'location'
  | 'offer'
  | 'order_request'
  | 'booking_request'
  | 'complaint'
  | 'human_handoff'
  | 'unknown';

export interface OrderDraftItem {
  name: string;
  quantity: number;
  unitPrice?: number;
}

export interface OrderDraft {
  items: OrderDraftItem[];
  deliveryAddress?: string;
  phone?: string;
  status: 'draft' | 'pending';
}

export interface StructuredAiResponse {
  reply: string;
  intent: IntentType;
  requires_human: boolean;
  action: string | null;
  orderDraft?: OrderDraft | null;
}

export interface ProcessMessageInput {
  platform: Platform;
  platformUserId: string; // phone number (e.g. 8801852363235) or PSID
  customerName?: string;
  messageText: string;
  platformMessageId?: string;
}

export interface ProcessMessageResult {
  conversationId: string;
  customerId: string;
  reply: string;
  intent: IntentType;
  requiresHuman: boolean;
  sentToPlatform: boolean;
  responseTimeMs: number;
  error?: string;
}
