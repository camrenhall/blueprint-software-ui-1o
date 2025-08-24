import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useConversationContext } from "@/contexts/ConversationContext";
import { ArrowLeft, MessageCircle, Plus, Clock } from "lucide-react";

interface ConversationHistoryProps {
  className?: string;
  onBackToMenu: () => void;
  isVisible?: boolean;
}

export default function ConversationHistory({
  className,
  onBackToMenu,
  isVisible: externalIsVisible,
}: ConversationHistoryProps) {
  const {
    conversations,
    currentConversationId,
    switchToConversation,
    exitChatMode,
    startNewConversation,
  } = useConversationContext();

  const [internalIsVisible, setInternalIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Use external isVisible if provided, otherwise use internal state
  const isVisible =
    externalIsVisible !== undefined ? externalIsVisible : internalIsVisible;

  useEffect(() => {
    // Staggered fade-in animation when using internal state
    if (externalIsVisible === undefined) {
      setTimeout(() => setInternalIsVisible(true), 300);
    }
  }, [externalIsVisible]);

  const handleBackToMenu = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      exitChatMode();
      onBackToMenu();
    }, 300);
  };

  return (
    <div className={cn("relative h-full", className)}>
      {/* Fixed glass panel for conversation history */}
      <div
        className={cn(
          "fixed left-6 top-20 bottom-6 w-80 transition-all duration-1000 ease-out z-40",
          isVisible
            ? "opacity-100 transform translate-x-0"
            : "opacity-0 transform -translate-x-8",
          isTransitioning && "opacity-0 translate-x-[-50px]",
        )}
      >
        {/* Glass morphism background */}
        <div className="absolute inset-0 rounded-2xl">
          {/* Primary glass layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-[#C1D9F6]/15 to-white/20 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl" />

          {/* Secondary gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#99C0F0]/10 via-transparent to-[#C5BFEE]/10 rounded-2xl" />

          {/* Subtle inner glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-white/5 to-transparent" />
        </div>

        {/* Content container */}
        <div className="relative h-full flex flex-col p-8">
          {/* Header with Back Button */}
          <div
            className={cn(
              "mb-8 transition-all duration-1200 ease-out",
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-4",
            )}
          >
            <button
              onClick={handleBackToMenu}
              className="group flex items-center space-x-2 text-[#0E315C]/60 hover:text-[#0E315C] transition-all duration-200 mb-4"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-light">Back to menu</span>
            </button>

            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-lg flex items-center justify-center shadow-lg">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-light text-[#0E315C] tracking-wide">
                  Conversations
                </h2>
                <p className="text-xs text-[#99C0F0]/70 font-light">
                  Recent chat history
                </p>
              </div>
            </div>

            {/* Elegant separator */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#99C0F0]/30 to-transparent" />
          </div>

          {/* New Chat Button */}
          <div
            className={cn(
              "mb-6 transition-all duration-700 ease-out",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2",
            )}
            style={{ transitionDelay: "200ms" }}
          >
            <button
              onClick={startNewConversation}
              className="w-full flex items-center space-x-3 p-3 rounded-xl border border-transparent bg-gradient-to-r from-[#99C0F0]/10 to-[#C5BFEE]/10 hover:from-[#99C0F0]/20 hover:to-[#C5BFEE]/20 hover:border-[#99C0F0]/20 transition-all duration-300 group hover:shadow-lg hover:shadow-[#99C0F0]/10 hover:scale-[1.02]"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-medium text-[#0E315C]/80">
                  New Chat
                </h3>
                <p className="text-xs text-[#99C0F0]/70 font-light">
                  Start a fresh conversation
                </p>
              </div>
            </button>
          </div>

          {/* Scrollable conversations area */}
          <div className="flex-1 overflow-y-auto pr-2 document-scroll">
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
                          : "opacity-0 translate-y-2",
                      )}
                      style={{
                        transitionDelay: `${400 + index * 100}ms`,
                      }}
                    >
                      <button
                        onClick={() => switchToConversation(conversation.id)}
                        className={cn(
                          "w-full flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 text-left group hover:scale-[1.02]",
                          isActive
                            ? "bg-gradient-to-r from-[#99C0F0]/20 to-[#C1D9F6]/20 border border-[#99C0F0]/30 shadow-sm"
                            : "hover:bg-gradient-to-r hover:from-[#99C0F0]/10 hover:to-[#C1D9F6]/10 border border-transparent hover:border-[#C1D9F6]/20 hover:shadow-sm",
                        )}
                      >
                        {/* Conversation Icon */}
                        <div
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all",
                            isActive
                              ? "bg-gradient-to-br from-[#99C0F0] to-[#C1D9F6] text-white shadow-sm"
                              : "bg-[#99C0F0]/10 text-[#0E315C]/60 group-hover:bg-[#99C0F0]/20 group-hover:text-[#0E315C]/80",
                          )}
                        >
                          <MessageCircle className="w-4 h-4" />
                        </div>

                        {/* Conversation Content */}
                        <div className="flex-1 min-w-0">
                          <h3
                            className={cn(
                              "text-sm font-light leading-snug mb-1 transition-colors break-words overflow-hidden",
                              isActive
                                ? "text-[#0E315C]"
                                : "text-[#0E315C]/70 group-hover:text-[#0E315C]",
                            )}
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              maxHeight: "2.5em", // Fallback for non-webkit browsers
                              lineHeight: "1.25em",
                            }}
                          >
                            {conversation.summary}
                          </h3>

                          <div className="flex items-center space-x-1 text-xs text-[#99C0F0]/70">
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
                  "text-center py-8 transition-all duration-700 ease-out",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2",
                )}
                style={{ transitionDelay: "400ms" }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#99C0F0]/10 flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-6 h-6 text-[#99C0F0]/60" />
                </div>
                <p className="text-sm text-[#0E315C]/70 font-light">
                  No conversations yet
                </p>
                <p className="text-xs text-[#99C0F0]/60 font-light mt-1">
                  Start a new chat to begin
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Floating ambient particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          <div
            className="absolute top-8 right-8 w-1 h-1 bg-[#C5BFEE]/60 rounded-full animate-float"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute top-24 left-12 w-1.5 h-1.5 bg-[#99C0F0]/40 rounded-full animate-float-slow"
            style={{ animationDelay: "1.5s" }}
          />
          <div
            className="absolute bottom-32 right-12 w-1 h-1 bg-[#C1D9F6]/50 rounded-full animate-float"
            style={{ animationDelay: "3s" }}
          />
          <div
            className="absolute bottom-16 left-8 w-1.5 h-1.5 bg-[#C5BFEE]/30 rounded-full animate-float-slow"
            style={{ animationDelay: "4.5s" }}
          />
        </div>

        {/* Subtle edge glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#99C0F0]/5 via-transparent to-[#C5BFEE]/5 blur-xl pointer-events-none" />
      </div>
    </div>
  );
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60),
  );

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return date.toLocaleDateString();
}
