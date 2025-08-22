import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useConversationContext } from "@/contexts/ConversationContext";
import { Send, Sparkles, Clock, CheckCircle, FileText, UserPlus, User } from "lucide-react";
import MessageContent from "./MessageContent";

interface AgentsChatProps {
  onClose: () => void;
}

export default function AgentsChat({ onClose }: AgentsChatProps) {
  const {
    currentConversation,
    createNewConversation,
    addMessageToConversation,
    addMessageToConversationById,
    removeConversation,
    isInChatMode,
  } = useConversationContext();

  const [inputValue, setInputValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Derive state from conversation context
  const messages = currentConversation?.messages || [];
  const chatStarted = isInChatMode && currentConversation !== null && messages.length > 0;
  const isNewChatMode = isInChatMode && (currentConversation === null || messages.length === 0);

  // Animation entrance effect
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => inputRef.current?.focus(), 600);
  }, []);

  // Auto scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      // Use scrollTop instead of scrollIntoView to avoid viewport interference
      const container = messagesEndRef.current.parentElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [messages]);

  const handleInputFocus = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      role: "user" as const,
      timestamp: new Date(),
    };

    // Capture the conversation ID for the AI response
    let conversationId: string;

    if (!currentConversation) {
      // No conversation exists, create a new one
      conversationId = createNewConversation(userMessage);
      setResponseIndex(0); // Reset for new conversation
    } else if (currentConversation.messages.length === 0) {
      // Eager conversation exists but is empty, add first message to it
      conversationId = currentConversation.id;
      addMessageToConversation(userMessage);
      setResponseIndex(0); // Reset for new conversation
    } else {
      // Existing conversation with messages, add to it
      conversationId = currentConversation.id;
      addMessageToConversation(userMessage);
    }

    setInputValue("");
    setIsTyping(true);

    // Simulate AI response with realistic delay
    setTimeout(() => {
      const responses = [
        "I understand you need assistance with legal case management. I'm analyzing your request and can help you review cases, draft documents, or provide strategic guidance. What specific area would you like me to focus on?",
        `# Legal Workflow Assistance

I'm here to help **streamline your legal workflow**. Here's how I can assist:

## Core Services
- **Case Reviews** - Comprehensive analysis and recommendations
- **Document Analysis** - Review contracts, briefs, and legal documents
- **Scheduling Consultations** - Calendar management and client coordination
- **Strategic Planning** - Long-term case strategy development

## Quick Actions
> *Ready to get started?* Choose from these common tasks:

1. Review pending cases requiring attention
2. Draft legal documents from templates
3. Analyze case precedents and research
4. Schedule upcoming client meetings

How can I best support your current priorities?`,
        "Thank you for reaching out. I specialize in legal case management and can help you with document reviews, case analysis, client communications, and strategic legal guidance. What would you like to work on first?",
        "I'm ready to assist with your legal case management needs. Whether you need help with pending cases, document preparation, client consultations, or strategic analysis, I'm here to support you. What's your priority today?"
      ];

      const selectedResponse = responses[responseIndex % responses.length];
      setResponseIndex(prev => prev + 1);

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: selectedResponse,
        role: "assistant" as const,
        timestamp: new Date(),
      };

      // Use the captured conversation ID to ensure the message is added correctly
      addMessageToConversationById(conversationId, assistantMessage);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // 1.5-2.5 second delay
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent interference from global event listeners
    if (e.nativeEvent.isComposing) return; // Handle IME composition properly

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation(); // Prevent event bubbling to global handlers
      handleSendMessage();
    }
  };

  const recentActivities = [
    {
      id: 1,
      type: "review",
      icon: CheckCircle,
      title: "Case Review Completed",
      description: "Rosen, Claire (#BTYREV50101) ready for final approval",
      time: "16m ago",
      color: "from-[#99C0F0] to-[#C1D9F6]"
    },
    {
      id: 2,
      type: "create",
      icon: UserPlus,
      title: "New Case Created",
      description: "Martinez, Elena employment case initiated",
      time: "2h ago", 
      color: "from-[#C5BFEE] to-[#99C0F0]"
    },
    {
      id: 3,
      type: "document",
      icon: FileText,
      title: "Documents Received",
      description: "Thompson, David submitted medical records",
      time: "5h ago",
      color: "from-[#C1D9F6] to-[#C5BFEE]"
    }
  ];

  if (chatStarted) {
    // Chat Mode - Slides to bottom
    return (
      <div className="absolute inset-0 top-[12.5vh] flex flex-col border border-[#C1D9F6]/30 rounded-2xl bg-white/5 backdrop-blur-sm" style={{ transform: 'translateZ(0)' }}>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fadeInUp`}
              >
                <div
                  className={`max-w-lg px-4 py-3 rounded-2xl shadow-sm break-words ${
                    message.role === "user"
                      ? "bg-[#99C0F0] text-white"
                      : "bg-white/70 backdrop-blur-sm border border-[#C1D9F6]/30 text-[#0E315C]"
                  }`}
                >
                  <div className="flex items-start space-x-2 mb-2">
                    {message.role === "user" && (
                      <User className="w-4 h-4 text-white/80 mt-0.5 flex-shrink-0" />
                    )}
                    <MessageContent
                      content={message.content}
                      className="min-w-0 flex-1"
                    />
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-fadeInUp">
                <div className="bg-white/70 backdrop-blur-sm border border-[#C1D9F6]/30 px-4 py-3 rounded-2xl shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#0E315C]/40 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-[#0E315C]/40 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-[#0E315C]/40 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                    <span className="text-xs text-[#0E315C]/50">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input - Fixed at bottom */}
        <div className="flex-shrink-0 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-[#C1D9F6]/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-2">
              <div className="flex-1 relative">
                <Sparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#0E315C]/40" />
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={handleInputFocus}
                  placeholder="Continue the conversation..."
                  className="w-full px-5 py-4 pl-12 pr-4 bg-transparent text-[#0E315C] placeholder-[#0E315C]/50 focus:outline-none text-sm font-light rounded-xl focus:bg-transparent transition-colors"
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={cn(
                  "flex items-center gap-2 px-5 py-4 rounded-xl text-sm font-medium transition-all duration-200 border",
                  inputValue.trim()
                    ? "bg-[#99C0F0]/20 text-[#0E315C] border-[#99C0F0]/40 shadow-sm hover:bg-[#99C0F0]/30 hover:shadow-md"
                    : "bg-white/40 text-[#0E315C]/40 border-[#C1D9F6]/40 cursor-not-allowed",
                )}
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isNewChatMode) {
    // Minimal New Chat Mode - Just input at bottom
    return (
      <div className="absolute inset-0 top-[12.5vh] flex flex-col border border-[#C1D9F6]/30 rounded-2xl bg-white/5 backdrop-blur-sm" style={{ transform: 'translateZ(0)' }}>
        {/* Empty space for messages */}
        <div className="flex-1"></div>

        {/* Chat Input - Fixed at bottom */}
        <div className="flex-shrink-0 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-[#C1D9F6]/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-2">
              <div className="flex-1 relative">
                <Sparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#0E315C]/40" />
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={handleInputFocus}
                  placeholder={currentConversation?.messages.length === 0 ? "Type your message..." : "Start a new conversation..."}
                  className="w-full px-5 py-4 pl-12 pr-4 bg-transparent text-[#0E315C] placeholder-[#0E315C]/50 focus:outline-none text-sm font-light rounded-xl focus:bg-transparent transition-colors"
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={cn(
                  "flex items-center gap-2 px-5 py-4 rounded-xl text-sm font-medium transition-all duration-200 border",
                  inputValue.trim()
                    ? "bg-[#99C0F0]/20 text-[#0E315C] border-[#99C0F0]/40 shadow-sm hover:bg-[#99C0F0]/30 hover:shadow-md"
                    : "bg-white/40 text-[#0E315C]/40 border-[#C1D9F6]/40 cursor-not-allowed",
                )}
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Initial Landing Mode - Centered
  return (
    <div className="h-full flex items-center justify-center px-8">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Welcome Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ease-out ${
          isVisible 
            ? "opacity-100 transform translate-y-0" 
            : "opacity-0 transform translate-y-8"
        }`}>
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-2xl flex items-center justify-center shadow-lg shadow-[#99C0F0]/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-light text-[#0E315C] mb-3 tracking-wide">
            What's on the agenda today?
          </h1>
          <p className="text-[#0E315C]/60 text-lg font-light max-w-lg mx-auto leading-relaxed">
            Your AI assistant is ready to help with case management, document reviews, and strategic legal guidance.
          </p>
        </div>

        {/* Elegant Chat Input Bar */}
        <div className={`w-full max-w-2xl transition-all duration-1200 ease-out delay-300 ${
          isVisible 
            ? "opacity-100 transform translate-y-0" 
            : "opacity-0 transform translate-y-6"
        }`}>
          <div className="relative">
            {/* Main Chat Bar */}
            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-[#C1D9F6]/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-2">
              
              {/* Chat Input */}
              <div className="flex-1 relative">
                <Sparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#0E315C]/40" />
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={handleInputFocus}
                  placeholder="Ask about cases, documents, or legal strategies..."
                  className="w-full px-5 py-4 pl-12 pr-4 bg-transparent text-[#0E315C] placeholder-[#0E315C]/50 focus:outline-none text-sm font-light rounded-xl focus:bg-transparent transition-colors"
                />
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={cn(
                  "flex items-center gap-2 px-5 py-4 rounded-xl text-sm font-medium transition-all duration-200 border",
                  inputValue.trim()
                    ? "bg-[#99C0F0]/20 text-[#0E315C] border-[#99C0F0]/40 shadow-sm hover:bg-[#99C0F0]/30 hover:shadow-md"
                    : "bg-white/40 text-[#0E315C]/40 border-[#C1D9F6]/40 cursor-not-allowed",
                )}
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>

            {/* Quick Action Suggestions */}
            <div className={`mt-6 flex items-center justify-center gap-3 transition-all duration-1000 ease-out delay-500 ${
              isVisible 
                ? "opacity-100 transform translate-y-0" 
                : "opacity-0 transform translate-y-4"
            }`}>
              {[
                "Review pending cases",
                "Draft legal document",
                "Schedule consultation",
                "Analyze case strategy"
              ].map((suggestion, index) => (
                <button
                  key={suggestion}
                  onClick={() => setInputValue(suggestion)}
                  className={`px-4 py-2 text-xs font-light text-[#0E315C]/60 hover:text-[#0E315C] bg-white/40 hover:bg-white/60 border border-[#C1D9F6]/30 hover:border-[#99C0F0]/40 rounded-xl transition-all duration-200 hover:shadow-sm ${
                    index > 1 ? "hidden lg:block" : ""
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`mt-12 w-full transition-all duration-1200 ease-out delay-700 ${
            isVisible 
              ? "opacity-100 transform translate-y-0" 
              : "opacity-0 transform translate-y-4"
          }`}>
            <div className="text-center mb-8">
              <h2 className="text-lg font-light text-[#0E315C]/70 tracking-wide">
                Recent Activity
              </h2>
            </div>
            
            <div className="space-y-3 max-w-2xl mx-auto">
              {recentActivities.map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className={`group bg-white/25 backdrop-blur-sm border border-[#C1D9F6]/25 rounded-full shadow-sm hover:shadow-lg transition-all duration-500 px-5 py-3 hover:bg-white/35 cursor-pointer transform hover:scale-[1.015] hover:-translate-y-0.5 ${
                      index === 0 ? "animate-fadeInUp" : ""
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-3">
                      {/* Icon - Compact size for pill design */}
                      <div className={`w-8 h-8 bg-gradient-to-br ${activity.color} rounded-full flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      
                      {/* Content - Compact horizontal flow */}
                      <div className="flex-1 flex items-center justify-between min-w-0">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-[#0E315C]/90 truncate">
                            {activity.title}
                          </h3>
                          <span className="hidden sm:block w-1 h-1 bg-[#0E315C]/20 rounded-full flex-shrink-0"></span>
                          <p className="text-xs text-[#0E315C]/60 truncate flex-1">
                            {activity.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <div className="flex items-center space-x-1 text-xs text-[#0E315C]/40 font-light">
                            <Clock className="w-3 h-3" />
                            <span>{activity.time}</span>
                          </div>
                          
                          {/* Subtle interaction indicator */}
                          <div className="opacity-0 group-hover:opacity-60 transition-opacity duration-300">
                            <svg className="w-3 h-3 text-[#0E315C]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subtle footer hint removed */}
          </div>
        </div>

        {/* Floating ambient elements - More subtle */}
        <div className="absolute top-1/4 right-1/4 w-2.5 h-2.5 bg-[#99C0F0]/15 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-[#C5BFEE]/20 rounded-full blur-sm animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 right-1/6 w-2 h-2 bg-[#C1D9F6]/20 rounded-full blur-sm animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>
    </div>
  );
}
