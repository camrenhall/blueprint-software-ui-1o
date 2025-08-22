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
    exitChatMode 
  } = useConversationContext();
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Items include "Back", "New Chat", and all conversations
  const items = [
    { 
      id: "back", 
      type: "back" as const, 
      title: "Back", 
      subtitle: "Return to main menu",
      action: () => {
        setIsTransitioning(true);
        setTimeout(() => {
          exitChatMode();
          onBackToMenu();
        }, 300);
      }
    },
    { 
      id: "new-chat", 
      type: "new-chat" as const, 
      title: "New Chat", 
      subtitle: "Start fresh conversation",
      action: () => {
        // This will be handled by the chat component
        // when user starts typing a new message
      }
    },
    ...conversations.map(conv => ({
      id: conv.id,
      type: "conversation" as const,
      title: conv.summary,
      subtitle: formatRelativeTime(conv.updatedAt),
      action: () => switchToConversation(conv.id),
      isActive: conv.id === currentConversationId,
    }))
  ];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere with input fields, textareas, or contentEditable elements
      const activeElement = document.activeElement as HTMLElement | null;
      if (activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.isContentEditable
      )) {
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % items.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        items[selectedIndex]?.action();
      } else if (e.key === "Escape") {
        e.preventDefault();
        items[0]?.action(); // Back action
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, items]);

  const getItemPosition = (index: number) => {
    const spacing = 100;
    const y = (index - selectedIndex) * spacing;
    return { x: 0, y };
  };

  const getItemScale = (index: number) => {
    const distance = Math.abs(index - selectedIndex);
    if (distance === 0) return 1;
    if (distance === 1) return 0.9;
    if (distance === 2) return 0.8;
    return 0.7;
  };

  const getItemOpacity = (index: number) => {
    const distance = Math.abs(index - selectedIndex);
    let baseOpacity;
    if (distance === 0) baseOpacity = 1;
    else if (distance === 1) baseOpacity = 0.6;
    else if (distance === 2) baseOpacity = 0.3;
    else baseOpacity = 0.15;

    // Edge fade-out calculation
    const { y } = getItemPosition(index);
    const screenHeight = window.innerHeight;
    const fadeZone = 100;
    const screenCenter = screenHeight / 2;
    const itemScreenY = screenCenter + y;

    let edgeFadeMultiplier = 1;

    if (itemScreenY < fadeZone) {
      edgeFadeMultiplier = Math.max(0, itemScreenY / fadeZone);
    } else if (itemScreenY > screenHeight - fadeZone) {
      edgeFadeMultiplier = Math.max(0, (screenHeight - itemScreenY) / fadeZone);
    }

    return baseOpacity * edgeFadeMultiplier;
  };

  return (
    <div className={cn("relative flex items-center justify-start h-full", className)}>
      <div
        className={cn(
          "relative flex flex-col items-start justify-center h-full max-h-screen py-20 transition-all duration-300 ease-out",
          isTransitioning && "transform translate-x-[-100px] opacity-0"
        )}
      >
        {items.map((item, index) => {
          const { x, y } = getItemPosition(index);
          const scale = getItemScale(index);
          const opacity = getItemOpacity(index);
          const isSelected = index === selectedIndex;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={item.id}
              className={cn(
                "absolute transition-all duration-500 ease-out cursor-pointer",
                "transform-gpu will-change-transform text-left group"
              )}
              style={{
                transform: `translate(${x}px, ${y}px) scale(${scale})`,
                opacity: isHovered ? Math.min(opacity + 0.3, 1) : opacity,
              }}
              onMouseEnter={() => {
                setHoveredIndex(index);
                if (Math.abs(index - selectedIndex) === 1) {
                  setSelectedIndex(index);
                }
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={item.action}
            >
              <div className="flex items-center space-x-3">
                {/* Icon */}
                <div
                  className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300",
                    item.type === "back"
                      ? "bg-slate-100 text-slate-500"
                      : item.type === "new-chat"
                      ? "bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] text-white shadow-lg"
                      : item.isActive
                      ? "bg-gradient-to-br from-[#99C0F0] to-[#C1D9F6] text-white shadow-lg"
                      : "bg-white/70 text-[#0E315C]/60 border border-[#C1D9F6]/30",
                    isSelected && "shadow-lg transform scale-110"
                  )}
                >
                  {item.type === "back" ? (
                    <ArrowLeft className="w-4 h-4" />
                  ) : item.type === "new-chat" ? (
                    <Plus className="w-4 h-4" />
                  ) : (
                    <MessageCircle className="w-4 h-4" />
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <h3
                    className={cn(
                      "font-light tracking-wide transition-all duration-300 whitespace-nowrap",
                      isSelected
                        ? "text-slate-800 drop-shadow-md"
                        : "text-slate-600 hover:text-slate-700",
                      item.type === "back" || item.type === "new-chat"
                        ? "text-2xl md:text-3xl"
                        : "text-xl md:text-2xl"
                    )}
                  >
                    {item.title}
                  </h3>
                  
                  {/* Subtitle for context */}
                  <p
                    className={cn(
                      "text-xs font-light transition-all duration-300 mt-1",
                      isSelected
                        ? "text-slate-500"
                        : "text-slate-400",
                      item.type === "conversation" && "flex items-center space-x-2"
                    )}
                  >
                    {item.type === "conversation" && (
                      <>
                        <Clock className="w-3 h-3" />
                        <span>{item.subtitle}</span>
                      </>
                    )}
                    {item.type !== "conversation" && item.subtitle}
                  </p>
                </div>
              </div>

              {/* Glow effect for selected item */}
              {isSelected && item.type !== "back" && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-purple-300/20 blur-xl -z-10 scale-125" />
              )}

              {/* Active conversation indicator */}
              {item.isActive && item.type === "conversation" && (
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#99C0F0] to-[#C5BFEE] rounded-full shadow-lg" />
              )}
            </div>
          );
        })}
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
