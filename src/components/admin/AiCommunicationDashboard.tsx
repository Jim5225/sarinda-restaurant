import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Sparkles, 
  RefreshCw, 
  ShieldCheck, 
  Send, 
  User, 
  Bot, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Search,
  Check,
  ChevronRight,
  Database
} from 'lucide-react';

interface ConversationItem {
  id: string;
  platform: 'whatsapp' | 'messenger';
  platformUserId: string;
  customerName: string;
  status: 'active' | 'handed_off' | 'closed';
  lastIntent: string;
  requiresHuman: boolean;
  updatedAt: string;
  messageCount: number;
  lastMessage: string;
  lastSender: string;
}

interface MessageDetail {
  id: string;
  sender: 'customer' | 'ai' | 'human_agent' | 'system';
  content: string;
  created_at: string;
  metadata?: {
    intent?: string;
    response_time_ms?: number;
    model?: string;
    order_draft?: any;
  };
}

export const AiCommunicationDashboard: React.FC = () => {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [selectedConvDetails, setSelectedConvDetails] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Live Simulator State
  const [simMessage, setSimMessage] = useState('২টা কাচ্চি বিরিয়ানি ও বোরহানি অর্ডার করব');
  const [simPhone, setSimPhone] = useState('8801852363235');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simResult, setSimResult] = useState<any | null>(null);

  const fetchConversations = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/conversations');
      if (res.ok) {
        const data = await res.json();
        if (data.conversations) {
          setConversations(data.conversations);
        }
      }
    } catch (err) {
      console.warn('Failed to load conversations from API:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
    const interval = setInterval(fetchConversations, 12000);
    return () => clearInterval(interval);
  }, []);

  const loadConversationDetails = async (id: string) => {
    setSelectedConvId(id);
    try {
      const res = await fetch(`/api/conversations?id=${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.conversation) {
          setSelectedConvDetails(data.conversation);
        }
      }
    } catch (err) {
      console.warn('Failed to load conversation details:', err);
    }
  };

  const handleToggleHandoff = async (convId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'handed_off' ? 'active' : 'handed_off';
    try {
      await fetch('/api/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: convId,
          status: nextStatus,
          requiresHuman: nextStatus === 'handed_off'
        })
      });
      fetchConversations();
      if (selectedConvId === convId) {
        loadConversationDetails(convId);
      }
    } catch (err) {
      console.error('Failed to toggle handoff status:', err);
    }
  };

  const handleTestSimulator = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!simMessage.trim() || isSimulating) return;

    setIsSimulating(true);
    setSimResult(null);

    try {
      const res = await fetch('/api/webhooks/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: simMessage.trim(),
          from: simPhone.trim(),
          name: 'Developer Simulator'
        })
      });

      const data = await res.json();
      setSimResult(data);
      fetchConversations();
    } catch (err: any) {
      setSimResult({ error: err?.message || 'Simulator failed' });
    } finally {
      setIsSimulating(false);
    }
  };

  const filteredConversations = conversations.filter(c => 
    c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.platformUserId.includes(searchQuery) ||
    c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastIntent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Overview & Credentials Card */}
      <div className="bg-gradient-to-r from-[#075E54] via-[#0c3c35] to-[#082e28] text-white rounded-3xl p-6 shadow-xl border border-emerald-500/30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#25D366] animate-ping" />
              <span className="text-[11px] font-black uppercase tracking-wider bg-[#25D366]/20 text-[#25D366] px-2.5 py-0.5 rounded-full border border-[#25D366]/30">
                Meta Cloud API v22.0 Connected
              </span>
              <span className="text-[11px] font-bold bg-white/10 px-2.5 py-0.5 rounded-full text-emerald-200">
                Google Gemini API Engine
              </span>
            </div>
            
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-brand-gold tracking-tight">
              Sarinda AI Customer Communication Automation
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
              সরাসরি WhatsApp Business Cloud API ও Google Gemini API-এর মাধ্যমে সার্বক্ষণিক গ্রাহক সেবা, মেনু ও দামের সঠিক তথ্য এবং অর্ডার ড্রাফট ব্যবস্থাপনা।
            </p>
          </div>

          {/* Quick Stats Counter */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-black/25 backdrop-blur-sm rounded-2xl p-3 border border-white/10 text-center">
              <p className="text-[10px] text-emerald-200 uppercase font-bold">মোট কথোপকথন</p>
              <p className="text-xl font-black text-white mt-0.5">{conversations.length}</p>
            </div>
            <div className="bg-black/25 backdrop-blur-sm rounded-2xl p-3 border border-white/10 text-center">
              <p className="text-[10px] text-amber-200 uppercase font-bold">প্রতিনিধি প্রয়োজন</p>
              <p className="text-xl font-black text-amber-300 mt-0.5">
                {conversations.filter(c => c.requiresHuman || c.status === 'handed_off').length}
              </p>
            </div>
            <div className="bg-black/25 backdrop-blur-sm rounded-2xl p-3 border border-white/10 text-center col-span-2 sm:col-span-1">
              <p className="text-[10px] text-emerald-200 uppercase font-bold">গড় রেসপন্স টাইম</p>
              <p className="text-xl font-black text-[#25D366] mt-0.5">&lt; 1.0s</p>
            </div>
          </div>

        </div>

        {/* Integration Details Bar */}
        <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
          <div className="bg-white/5 rounded-xl px-3 py-2 flex items-center justify-between">
            <span className="text-emerald-200">Webhook Endpoint:</span>
            <code className="text-white font-mono font-bold">/api/webhooks/whatsapp</code>
          </div>
          <div className="bg-white/5 rounded-xl px-3 py-2 flex items-center justify-between">
            <span className="text-emerald-200">Verify Token:</span>
            <code className="text-emerald-300 font-mono font-bold">sarinda_whatsapp_token_2026</code>
          </div>
          <div className="bg-white/5 rounded-xl px-3 py-2 flex items-center justify-between">
            <span className="text-emerald-200">টেস্ট WhatsApp নম্বর:</span>
            <code className="text-brand-gold font-mono font-bold">+880 1852-363235</code>
          </div>
        </div>
      </div>

      {/* Main Grid: Live Conversations List & Webhook Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Conversations List (PRD Section 27) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 shadow-sm border border-slate-200 flex flex-col h-[700px]">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-serif font-black text-lg text-slate-800 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span>গ্রাহক কথোপকথনের তালিকা (Live Feed)</span>
              </h3>
              <p className="text-xs text-slate-500">
                WhatsApp ও Messenger থেকে আসা সর্বশেষ বার্তা ও এআই রেসপন্স
              </p>
            </div>

            <button
              onClick={fetchConversations}
              disabled={isLoading}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
              title="রিফ্রেশ করুন"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Search Box */}
          <div className="mt-3 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="নাম, ফোন নম্বর, বা বার্তার বিষয় দিয়ে খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#25D366]"
            />
          </div>

          {/* Conversations Scrollable Stream */}
          <div className="flex-1 overflow-y-auto mt-3 space-y-2.5 pr-1">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-xs">
                {isLoading ? 'কথোপকথন লোড হচ্ছে...' : 'কোনো বার্তা পাওয়া যায়নি। নিচের সিমুলেটর দিয়ে টেস্ট করুন!'}
              </div>
            ) : (
              filteredConversations.map((c) => {
                const isSelected = selectedConvId === c.id;
                const isHandoff = c.requiresHuman || c.status === 'handed_off';
                return (
                  <div
                    key={c.id}
                    onClick={() => loadConversationDetails(c.id)}
                    className={`p-3.5 rounded-2xl border transition cursor-pointer ${
                      isSelected
                        ? 'border-[#25D366] bg-emerald-50/50 shadow-xs'
                        : isHandoff
                        ? 'border-amber-300 bg-amber-50/40 hover:bg-amber-50/70'
                        : 'border-slate-100 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                        <span className="font-black text-xs text-slate-800">
                          {c.customerName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          ({c.platformUserId})
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {isHandoff && (
                          <span className="bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-1">
                            <AlertTriangle className="w-2.5 h-2.5" />
                            প্রতিনিধি প্রয়োজন
                          </span>
                        )}
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                          {c.lastIntent}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      <strong className="text-slate-800">{c.lastSender === 'customer' ? 'Customer: ' : 'AI: '}</strong>
                      {c.lastMessage}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100/80 text-[10px] text-slate-400">
                      <span>{new Date(c.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                        বিস্তারিত দেখুন <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* Right Column: Active Transcript or Webhook Simulator */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Detailed Transcript View if Selected */}
          {selectedConvDetails ? (
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 flex flex-col h-[350px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-xs text-slate-800">
                    {selectedConvDetails.customers?.name || selectedConvDetails.platform_user_id}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono">
                    ID: {selectedConvDetails.id}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleHandoff(selectedConvDetails.id, selectedConvDetails.status)}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition cursor-pointer ${
                      selectedConvDetails.status === 'handed_off'
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                    }`}
                  >
                    {selectedConvDetails.status === 'handed_off' ? 'হস্তান্তর সম্পন্ন (Resolve)' : 'মানুষের কাছে স্থানান্তর'}
                  </button>
                  <button
                    onClick={() => setSelectedConvDetails(null)}
                    className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Messages Timeline */}
              <div className="flex-1 overflow-y-auto space-y-2.5 p-2 my-2 bg-slate-50 rounded-2xl">
                {(selectedConvDetails.messages || []).map((m: MessageDetail) => {
                  const isCust = m.sender === 'customer';
                  return (
                    <div
                      key={m.id}
                      className={`flex ${isCust ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-2.5 text-xs shadow-2xs ${
                          isCust
                            ? 'bg-white text-slate-800 border border-slate-200'
                            : 'bg-[#075E54] text-white'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1 text-[10px] opacity-75">
                          <span>{isCust ? '👤 গ্রাহক' : '🤖 Sarinda AI'}</span>
                          <span>•</span>
                          <span>{new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          {m.metadata?.response_time_ms && (
                            <span className="text-emerald-300 font-mono font-bold">
                              ({m.metadata.response_time_ms}ms)
                            </span>
                          )}
                        </div>
                        <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* Live Webhook Simulator (PRD Section 31 & 32) */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-[#25D366] text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif font-black text-sm text-slate-800">
                  লাইভ Meta Webhook সিমুলেটর (Live Test)
                </h4>
                <p className="text-[11px] text-slate-500">
                  ব্রাউজারে বসেই সরাসরি Meta Webhook payload পাঠিয়ে Gemini AI রেসপন্স টেস্ট করুন
                </p>
              </div>
            </div>

            <form onSubmit={handleTestSimulator} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  টেস্ট গ্রাহক নম্বর:
                </label>
                <input
                  type="text"
                  value={simPhone}
                  onChange={(e) => setSimPhone(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-[#25D366]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  টেস্ট বার্তা (বাংলা বা ইংরেজি):
                </label>
                <textarea
                  value={simMessage}
                  onChange={(e) => setSimMessage(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#25D366]"
                />
              </div>

              {/* Quick Sample Prompts */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  '২ প্লেট কাচ্চি বিরিয়ানি ও বোরহানি দিন',
                  'আজকের স্পেশাল মেনুর দাম কত?',
                  'মানুষের সাথে কথা বলতে চাই',
                  'সভারী রিসোর্ট বুকিং করব'
                ].map((sample, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setSimMessage(sample)}
                    className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                  >
                    {sample}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={isSimulating}
                className="w-full py-2.5 rounded-xl bg-[#075E54] hover:bg-[#128C7E] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer disabled:opacity-50"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Gemini AI প্রসেস করছে...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Webhook মেসেজ পাঠান &amp; AI রেসপন্স দেখুন</span>
                  </>
                )}
              </button>
            </form>

            {/* Simulator Output Result */}
            {simResult && (
              <div className="mt-4 p-3.5 bg-slate-900 text-emerald-400 rounded-2xl text-[11px] font-mono overflow-x-auto space-y-1.5 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1 text-slate-400 text-[10px]">
                  <span>Status: {simResult.success ? '200 OK' : 'Failed'}</span>
                  <span>Intent: {simResult.intent || 'N/A'}</span>
                </div>
                <div className="text-white whitespace-pre-wrap leading-relaxed">
                  {simResult.reply || simResult.error}
                </div>
                {simResult.requiresHuman && (
                  <p className="text-amber-400 font-bold">⚠️ Human Handoff Triggered</p>
                )}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
