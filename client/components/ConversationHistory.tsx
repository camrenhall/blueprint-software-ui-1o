import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useConversationContext } from "@/contexts/ConversationContext";
import { ArrowLeft, MessageCircle, Plus, Clock } from "lucide-react";

interface ConversationHistoryProps {
  className?: string;
  onBackToMenu: () => void;
}

export default function ConversationHistory({
  className,
  onBackToMenu,
}: ConversationHistoryProps) {
  const {
    conversations,
    currentConversationId,
    switchToConversation,
    exitChatMode,
    startNewConversation
  } = useConversationContext();

  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleBackToMenu = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      exitChatMode();
      onBackToMenu();
    }, 300);
  };

  return (
    <div className={cn("relative flex items-start justify-start h-full pt-16", className)}>
      <div
        className={cn(
          "w-full transition-all duration-500 ease-out",
          // Match the divider positioning: left-80 lg:left-96 xl:left-[30rem]
          "max-w-[280px] lg:max-w-[344px] xl:max-w-[440px]",
          "pr-4 lg:pr-6 xl:pr-8",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          isTransitioning && "opacity-0 translate-x-[-50px]"
        )}
      >
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            onClick={handleBackToMenu}
            className="group flex items-center space-x-2 text-slate-500 hover:text-slate-700 transition-all duration-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-light">Back to menu</span>
          </button>

          <h2 className="text-2xl font-light text-slate-700 mb-2">Conversations</h2>
          <p className="text-sm text-slate-500 font-light">Recent chat history</p>
        </div>

        {/* New Chat Button */}
        <div className={cn(
          "mb-6 transition-all duration-700 ease-out delay-100",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}>
          <button
            onClick={startNewConversation}
            className="w-full flex items-center space-x-3 p-3 rounded-xl border border-[#C1D9F6]/40 bg-gradient-to-r from-[#99C0F0]/10 to-[#C5BFEE]/10 hover:from-[#99C0F0]/20 hover:to-[#C5BFEE]/20 transition-all duration-300 group hover:shadow-lg hover:shadow-[#99C0F0]/10"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-medium text-slate-700">New Chat</h3>
              <p className="text-xs text-slate-500 font-light">Start a fresh conversation</p>
            </div>
          </button>
        </div>

        {/* Conversations List */}
        {conversations.length > 0 ? (
          <div className="space-y-2">
            {conversations.map((conversation, index) => {
              const isActive = conversation.id === currentConversationId;

              return (
                <div
                  key={conversation.id}
                  className={cn(
                    "transition-all duration-700 ease-out",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  )}
                  style={{
                    transitionDelay: `${200 + index * 100}ms`
                  }}
                >
                  <button
                    onClick={() => switchToConversation(conversation.id)}
                    className={cn(
                      "w-full flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 text-left group",
                      isActive
                        ? "bg-gradient-to-r from-[#99C0F0]/20 to-[#C1D9F6]/20 border border-[#99C0F0]/30 shadow-sm"
                        : "hover:bg-white/50 border border-transparent hover:border-[#C1D9F6]/20 hover:shadow-sm"
                    )}
                  >
                    {/* Conversation Icon */}
                    <div
                      className={cn(
                        "w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all",
                        isActive
                          ? "bg-gradient-to-br from-[#99C0F0] to-[#C1D9F6] text-white shadow-sm"
                          : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                      )}
                    >
                      <MessageCircle className="w-3 h-3" />
                    </div>

                    {/* Conversation Content */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className={cn(
                          "text-sm font-light leading-snug mb-1 transition-colors break-words overflow-hidden",
                          isActive
                            ? "text-slate-800"
                            : "text-slate-600 group-hover:text-slate-700"
                        )}
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          maxHeight: '2.5em', // Fallback for non-webkit browsers
                          lineHeight: '1.25em'
                        }}
                      >
                        {conversation.summary}
                      </h3>

                      <div className="flex items-center space-x-1 text-xs text-slate-400">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span className="font-light">
                          {formatRelativeTime(conversation.updatedAt)}
                        </span>
                      </div>
                    </div>

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] flex-shrink-0 mt-2" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className={cn(
              "text-center py-8 transition-all duration-700 ease-out delay-300",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-sm text-slate-500 font-light">No conversations yet</p>
            <p className="text-xs text-slate-400 font-light mt-1">Start a new chat to begin</p>
          </div>
        )}
      </div>
    </div>
  );
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  return date.toLocaleDateString();
}
