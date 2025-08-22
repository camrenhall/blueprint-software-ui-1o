import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Send, Sparkles, Clock, CheckCircle, FileText, UserPlus } from "lucide-react";

interface AgentsChatProps {
  onClose: () => void;
}

export default function AgentsChat({ onClose }: AgentsChatProps) {
  const [inputValue, setInputValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Animation entrance effect
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => inputRef.current?.focus(), 600);
  }, []);

  const handleInputFocus = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Here we'll implement the conversation functionality in the next step
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
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
                  onKeyPress={handleKeyPress}
                  onFocus={handleInputFocus}
                  placeholder="Ask about cases, documents, or legal strategies..."
                  className="w-full px-5 py-4 pl-12 pr-4 bg-transparent text-[#0E315C] placeholder-[#0E315C]/50 focus:outline-none text-sm font-light rounded-xl focus:bg-white/50 transition-colors"
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

          {/* Perfect Balance: Recent Activity */}
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
            
            <div className="space-y-4 max-w-3xl mx-auto">
              {recentActivities.map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className={`group bg-white/25 backdrop-blur-sm border border-[#C1D9F6]/25 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 p-4 hover:bg-white/35 cursor-pointer transform hover:scale-[1.015] hover:-translate-y-0.5 ${
                      index === 0 ? "animate-fadeInUp" : ""
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-4">
                      {/* Icon - Perfect size and styling */}
                      <div className={`w-10 h-10 bg-gradient-to-br ${activity.color} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      
                      {/* Content - Balanced horizontal flow */}
                      <div className="flex-1 flex items-center justify-between min-w-0">
                        <div className="flex flex-col space-y-1 flex-1 min-w-0">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-sm font-medium text-[#0E315C]/90 truncate">
                              {activity.title}
                            </h3>
                            <span className="hidden sm:block w-1 h-1 bg-[#0E315C]/20 rounded-full flex-shrink-0"></span>
                            <div className="flex items-center space-x-1.5 text-xs text-[#0E315C]/40 font-light flex-shrink-0">
                              <Clock className="w-3 h-3" />
                              <span>{activity.time}</span>
                            </div>
                          </div>
                          <p className="text-xs text-[#0E315C]/60 truncate">
                            {activity.description}
                          </p>
                        </div>
                        
                        {/* Subtle interaction indicator */}
                        <div className="opacity-0 group-hover:opacity-60 transition-opacity duration-300 flex-shrink-0 ml-3">
                          <svg className="w-4 h-4 text-[#0E315C]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subtle footer hint */}
            <div className="mt-6 text-center">
              <p className="text-xs text-[#0E315C]/25 font-light italic">
                Click any activity to view details
              </p>
            </div>
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
