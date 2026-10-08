import { ProcessMessageInput, ProcessMessageResult } from './types';
import { ConversationService } from './database/conversationService';
import { KnowledgeService } from './knowledge/knowledgeService';
import { GeminiService } from './gemini/geminiService';
import { ActionService } from './action/actionService';
import { WhatsAppClient } from './whatsapp/whatsappClient';

export class AiCommunicationService {
  /**
   * Main entry point for processing customer messages across all channels.
   * PRD Section 16 & 24: AI Processing Layer & Multi-Channel Architecture.
   */
  static async processCustomerMessage(input: ProcessMessageInput): Promise<ProcessMessageResult> {
    const startTime = Date.now();
    const { platform, platformUserId, customerName, messageText, platformMessageId } = input;

    // 1. Identify or register customer
    const customer = await ConversationService.findOrCreateCustomer(platform, platformUserId, customerName);

    // 2. Identify or create active conversation
    const conversation = await ConversationService.findOrCreateConversation(customer.id, platform, platformUserId);

    // 3. Save incoming message
    await ConversationService.saveMessage(
      conversation.id,
      'customer',
      messageText,
      'text',
      platformMessageId
    );

    // 4. Load recent conversation history (Context Memory)
    const history = await ConversationService.getConversationHistory(conversation.id, 8);

    // 5. Pre-check human escalation
    const preEscalation = ActionService.shouldEscalateToHuman(messageText);

    // 6. Retrieve relevant Sarinda knowledge base context
    const knowledgeContext = KnowledgeService.getRelevantContext(messageText);

    // 7. Generate structured AI response using Gemini
    const { response: aiResponse, modelUsed, responseTimeMs } = await GeminiService.generateCustomerResponse(
      messageText,
      history,
      knowledgeContext
    );

    // 8. Action Service: determine intent and human handoff
    const finalRequiresHuman = preEscalation.requiresHuman || aiResponse.requires_human;
    const finalIntent = preEscalation.requiresHuman ? 'human_handoff' : aiResponse.intent;
    const orderDraft = ActionService.extractOrderDraft(messageText);

    // 9. Apply strict guardrails
    let sanitizedReply = ActionService.sanitizeAiReply(aiResponse.reply);

    if (finalRequiresHuman && !sanitizedReply.includes('প্রতিনিধি') && !sanitizedReply.includes('হটলাইন')) {
      sanitizedReply += '\n\nআমাদের কাস্টমার রিপ্রেজেন্টেটিভের সাথে সরাসরি কথা বলতে ডায়াল করুন: +880 1852-363235।';
    }

    // 10. Update conversation status
    await ConversationService.updateConversationStatus(
      conversation.id,
      finalRequiresHuman ? 'handed_off' : 'active',
      finalIntent,
      finalRequiresHuman
    );

    // 11. Save outgoing AI message
    await ConversationService.saveMessage(
      conversation.id,
      'ai',
      sanitizedReply,
      'text',
      undefined,
      {
        intent: finalIntent,
        response_time_ms: responseTimeMs,
        model: modelUsed,
        order_draft: orderDraft
      }
    );

    // 12. Log event
    await ConversationService.logAiEvent(
      conversation.id,
      platform,
      finalIntent,
      Date.now() - startTime,
      modelUsed
    );

    // 13. Send outgoing response to customer on platform
    let sentToPlatform = false;
    if (platform === 'whatsapp') {
      const sendResult = await WhatsAppClient.sendTextMessage(platformUserId, sanitizedReply);
      sentToPlatform = sendResult.success;
    }

    return {
      conversationId: conversation.id,
      customerId: customer.id,
      reply: sanitizedReply,
      intent: finalIntent,
      requiresHuman: finalRequiresHuman,
      sentToPlatform,
      responseTimeMs: Date.now() - startTime
    };
  }
}
