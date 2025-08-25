import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, Users, FileText, Search, LogOut, Sparkles, ArrowRight, ClipboardList, Settings } from "lucide-react";

interface MenuItem {
  id: string;
  title: string;
  icon?: LucideIcon;
  action: () => void;
  description?: string;
}

interface GlassSidePanelProps {
  items: MenuItem[];
  className?: string;
  isVisible?: boolean;
  taskQueueCount?: number;
}

export default function GlassSidePanel({ items, className, isVisible: externalIsVisible, taskQueueCount = 0 }: GlassSidePanelProps) {
  const [internalIsVisible, setInternalIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Use external isVisible if provided, otherwise use internal state
  const isVisible = externalIsVisible !== undefined ? externalIsVisible : internalIsVisible;

  useEffect(() => {
    // Staggered fade-in animation when using internal state
    if (externalIsVisible === undefined) {
      setTimeout(() => setInternalIsVisible(true), 300);
    }
  }, [externalIsVisible]);

  // Map menu items to icons for better visual hierarchy
  const getMenuIcon = (id: string): LucideIcon => {
    switch (id) {
      case "agents":
        return Users;
      case "create":
        return FileText;
      case "review":
        return Search;
      case "taskqueue":
        return ClipboardList;
      case "settings":
        return Settings;
      case "logout":
        return LogOut;
      default:
        return Sparkles;
    }
  };

  // Enhanced menu items with icons and descriptions
  const enhancedItems = items.map((item) => ({
    ...item,
    icon: item.icon || getMenuIcon(item.id),
    description: item.description || getDefaultDescription(item.id),
  }));

  return (
    <div className={cn("relative h-full", className)}>
      {/* Main glass panel container */}
      <div
        className={cn(
          "fixed left-6 top-20 bottom-6 w-80 transition-all duration-1000 ease-out z-40",
          isVisible
            ? "opacity-100 transform translate-x-0"
            : "opacity-0 transform -translate-x-8"
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
          {/* Header section */}
          <div
            className={cn(
              "mb-10 transition-all duration-1200 ease-out",
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-4"
            )}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-light text-[#0E315C] tracking-wide">
                  Luceron AI
                </h2>
                <p className="text-xs text-[#99C0F0]/70 font-light">
                  Control Center
                </p>
              </div>
            </div>
            
            {/* Elegant separator */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#99C0F0]/30 to-transparent" />
          </div>

          {/* Minimal Design Menu Items */}
          <div className="flex-1 space-y-1">
            {enhancedItems.map((item, index) => {
              const isHovered = hoveredItem === item.id;
              const isLogout = item.id === "logout";

              return (
                <div
                  key={item.id}
                  className={cn(
                    "transition-all duration-700 ease-out",
                    isVisible
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform translate-y-6"
                  )}
                  style={{
                    transitionDelay: `${400 + index * 100}ms`,
                  }}
                >
                  <button
                    onClick={item.action}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={cn(
                      "w-full group relative py-4 px-2 transition-all duration-300 text-left",
                      "hover:bg-white/5 rounded-lg",
                      "border-l-2 border-transparent",
                      isHovered && !isLogout && "border-l-[#99C0F0]/60",
                      isHovered && isLogout && "border-l-[#99C0F0]/40"
                    )}
                  >
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* Minimal icon */}
                        <item.icon
                          className={cn(
                            "w-4 h-4 transition-all duration-300",
                            isLogout
                              ? "text-[#0E315C]/40 group-hover:text-[#0E315C]/60"
                              : "text-[#0E315C]/50 group-hover:text-[#0E315C]/80"
                          )}
                        />

                        {/* Typography focus */}
                        <div className="relative">
                          <h3
                            className={cn(
                              "font-light text-lg tracking-wide transition-colors duration-300",
                              isLogout
                                ? "text-[#0E315C]/60 group-hover:text-[#0E315C]/80"
                                : "text-[#0E315C]/70 group-hover:text-[#0E315C]"
                            )}
                          >
                            {item.title}
                          </h3>
                          <p
                            className={cn(
                              "text-xs font-light opacity-0 group-hover:opacity-100 transition-all duration-300 mt-1",
                              isLogout
                                ? "text-[#99C0F0]/60"
                                : "text-[#99C0F0]/70"
                            )}
                          >
                            {item.description}
                          </p>

                          {/* Task Queue notification bubble - positioned relative to text */}
                          {item.id === "taskqueue" && taskQueueCount > 0 && (
                            <div className="absolute -top-2 -right-6 min-w-5 h-5 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] text-white text-xs font-medium rounded-full flex items-center justify-center px-1 shadow-xl shadow-[#99C0F0]/30 border border-white/20 backdrop-blur-sm animate-fadeIn animate-gentlePulse">
                              <span className="relative z-10">{taskQueueCount}</span>
                              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Subtle arrow on hover */}
                      <ArrowRight
                        className={cn(
                          "w-3 h-3 transition-all duration-300",
                          isHovered
                            ? isLogout
                              ? "text-[#99C0F0]/60 opacity-100 translate-x-0"
                              : "text-[#99C0F0]/80 opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-2"
                        )}
                      />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Footer section */}
          <div
            className={cn(
              "mt-8 pt-6 border-t border-[#99C0F0]/20 transition-all duration-1200 ease-out",
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-4"
            )}
            style={{ transitionDelay: "800ms" }}
          >
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
            className="absolute bottom-48 left-8 w-1.5 h-1.5 bg-[#C5BFEE]/30 rounded-full animate-float-slow"
            style={{ animationDelay: "4.5s" }}
          />
        </div>

        {/* Subtle edge glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#99C0F0]/5 via-transparent to-[#C5BFEE]/5 blur-xl pointer-events-none" />
      </div>
    </div>
  );
}

// Helper function to provide default descriptions
function getDefaultDescription(id: string): string {
  switch (id) {
    case "agents":
      return "Chat with AI assistants";
    case "create":
      return "Build new projects";
    case "review":
      return "Analyze and audit";
    case "taskqueue":
      return "Manage your tasks";
    case "settings":
      return "Configure preferences";
    case "logout":
      return "Sign out securely";
    default:
      return "Access functionality";
  }
}
