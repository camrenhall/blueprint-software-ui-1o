import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface AgentsChatProps {
  onClose: () => void;
}

export default function AgentsChat({ onClose }: AgentsChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Animation entrance effect
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  // Auto scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm here to help you with your legal case management. How can I assist you today?",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className={`h-full flex items-center justify-center px-8 transition-all duration-1000 ease-out ${
        isVisible 
          ? "opacity-100 transform translate-y-0 scale-100" 
          : "opacity-0 transform translate-y-8 scale-95"
      }`}
    >
      {/* Main Chat Container */}
      <div className="w-full max-w-2xl mx-auto h-[85vh] flex flex-col">
        
        {/* Welcome Section */}
        <div className={`text-center mb-8 transition-all duration-1200 ease-out delay-300 ${
          isVisible 
            ? "opacity-100 transform translate-y-0" 
            : "opacity-0 transform translate-y-4"
        }`}>
          <h1 className="text-3xl font-light text-slate-800 mb-3">
            What's on the agenda today?
          </h1>
          <p className="text-slate-600 text-lg font-light">
            Your AI assistant is ready to help with case management, document reviews, and more.
          </p>
        </div>

        {/* Chat Interface */}
        <div className={`flex-1 bg-white/95 backdrop-blur-md border border-slate-200/50 rounded-3xl shadow-2xl shadow-blue-500/10 flex flex-col overflow-hidden transition-all duration-1000 ease-out delay-500 ${
          isVisible 
            ? "opacity-100 transform translate-y-0 scale-100" 
            : "opacity-0 transform translate-y-8 scale-95"
        }`}>
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/50 border-b border-slate-200/50 px-6 py-4 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">AI Legal Assistant</h3>
                  <p className="text-xs text-slate-500">Online • Ready to help</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-slate-500 font-light">
                  Start a conversation to get assistance with your legal tasks
                </p>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-sm px-4 py-3 rounded-2xl shadow-sm ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                      : "bg-gradient-to-r from-slate-50 to-slate-100 text-slate-800 border border-slate-200/50"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.role === "user" ? "text-blue-100" : "text-slate-400"
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200/50 px-4 py-3 rounded-2xl shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-200/50 bg-slate-50/50 p-4 rounded-b-3xl">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full px-5 py-4 pr-12 bg-white border border-slate-200/50 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder-slate-400 text-slate-800 shadow-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                  inputValue.trim()
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-105"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center justify-center space-x-2 mt-4">
              {["Review case updates", "Schedule consultation", "Document assistance"].map((action) => (
                <button
                  key={action}
                  onClick={() => setInputValue(action)}
                  className="text-xs px-3 py-1.5 bg-white border border-slate-200/50 rounded-full text-slate-600 hover:text-slate-800 hover:border-slate-300 transition-all shadow-sm hover:shadow-md"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Floating ambient elements */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-blue-400/30 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-indigo-300/40 rounded-full blur-sm animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 right-1/6 w-2.5 h-2.5 bg-blue-300/50 rounded-full blur-sm animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>
    </div>
  );
}
