import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, Users, FileText, Search, LogOut, Sparkles } from "lucide-react";

interface MenuItem {
  id: string;
  title: string;
  icon: LucideIcon;
  action: () => void;
  description?: string;
}

interface GlassSidePanelProps {
  items: MenuItem[];
  className?: string;
}

export default function GlassSidePanel({ items, className }: GlassSidePanelProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    // Staggered fade-in animation
    setTimeout(() => setIsVisible(true), 300);
  }, []);

  // Map menu items to icons for better visual hierarchy
  const getMenuIcon = (id: string): LucideIcon => {
    switch (id) {
      case "agents":
        return Users;
      case "create":
        return FileText;
      case "review":
        return Search;
      case "logout":
        return LogOut;
      default:
        return Sparkles;
    }
  };

  // Enhanced menu items with icons and descriptions
  const enhancedItems = items.map((item) => ({
    ...item,
    icon: getMenuIcon(item.id),
    description: item.description || getDefaultDescription(item.id),
  }));

  return (
    <div className={cn("relative h-full", className)}>
      {/* Main glass panel container */}
      <div
        className={cn(
          "fixed left-6 top-20 bottom-6 w-72 transition-all duration-1000 ease-out z-20",
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
                  Fusion OS
                </h2>
                <p className="text-xs text-[#99C0F0]/70 font-light">
                  Control Center
                </p>
              </div>
            </div>
            
            {/* Elegant separator */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#99C0F0]/30 to-transparent" />
          </div>

          {/* Menu items */}
          <div className="flex-1 space-y-3">
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
                    transitionDelay: `${400 + index * 150}ms`,
                  }}
                >
                  <button
                    onClick={item.action}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={cn(
                      "w-full group relative p-4 rounded-xl transition-all duration-300 text-left",
                      "hover:transform hover:scale-[1.02] hover:shadow-lg",
                      isLogout
                        ? "hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-400/10 hover:border-red-300/20"
                        : "hover:bg-gradient-to-r hover:from-[#99C0F0]/15 hover:to-[#C1D9F6]/15 hover:border-[#99C0F0]/30",
                      "border border-transparent"
                    )}
                  >
                    {/* Background glow effect on hover */}
                    {isHovered && (
                      <div
                        className={cn(
                          "absolute inset-0 rounded-xl blur-xl transition-opacity duration-300",
                          isLogout
                            ? "bg-gradient-to-r from-red-400/20 to-red-300/20"
                            : "bg-gradient-to-r from-[#99C0F0]/20 to-[#C1D9F6]/20"
                        )}
                      />
                    )}

                    <div className="relative flex items-center space-x-4">
                      {/* Icon container */}
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                          isLogout
                            ? "bg-gradient-to-br from-red-400/20 to-red-500/20 group-hover:from-red-400/30 group-hover:to-red-500/30 group-hover:shadow-lg group-hover:shadow-red-400/20"
                            : "bg-gradient-to-br from-[#99C0F0]/20 to-[#C1D9F6]/20 group-hover:from-[#99C0F0]/30 group-hover:to-[#C1D9F6]/30 group-hover:shadow-lg group-hover:shadow-[#99C0F0]/20"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "w-5 h-5 transition-all duration-300",
                            isLogout
                              ? "text-red-500/80 group-hover:text-red-500"
                              : "text-[#0E315C]/70 group-hover:text-[#0E315C]"
                          )}
                        />
                      </div>

                      {/* Text content */}
                      <div className="flex-1">
                        <h3
                          className={cn(
                            "font-medium text-base transition-colors duration-300",
                            isLogout
                              ? "text-red-600/80 group-hover:text-red-600"
                              : "text-[#0E315C]/80 group-hover:text-[#0E315C]"
                          )}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={cn(
                            "text-sm font-light mt-1 transition-colors duration-300",
                            isLogout
                              ? "text-red-500/60 group-hover:text-red-500/80"
                              : "text-[#99C0F0]/70 group-hover:text-[#99C0F0]/90"
                          )}
                        >
                          {item.description}
                        </p>
                      </div>

                      {/* Hover arrow indicator */}
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full transition-all duration-300",
                          isHovered
                            ? isLogout
                              ? "bg-red-400/80 scale-100"
                              : "bg-[#99C0F0]/80 scale-100"
                            : "bg-transparent scale-0"
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
            <div className="text-center">
              <p className="text-xs text-[#99C0F0]/60 font-light">
                Welcome back, Camren
              </p>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-400/60 rounded-full animate-pulse" />
                <span className="text-xs text-[#0E315C]/60 font-light">
                  System Online
                </span>
              </div>
            </div>
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
    case "logout":
      return "Sign out securely";
    default:
      return "Access functionality";
  }
}
