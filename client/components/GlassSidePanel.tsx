import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, Users, FileText, Search, LogOut, Sparkles, RotateCcw, ArrowRight } from "lucide-react";

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
}

type DesignVariant = "enhanced" | "minimal" | "cards";

export default function GlassSidePanel({ items, className, isVisible: externalIsVisible }: GlassSidePanelProps) {
  const [internalIsVisible, setInternalIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [designVariant, setDesignVariant] = useState<DesignVariant>("enhanced");

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

  // Cycle through design variants
  const cycleDesign = () => {
    setDesignVariant(prev => {
      if (prev === "enhanced") return "minimal";
      if (prev === "minimal") return "cards";
      return "enhanced";
    });
  };

  const getDesignName = () => {
    switch (designVariant) {
      case "enhanced": return "Enhanced";
      case "minimal": return "Minimal";
      case "cards": return "Cards";
    }
  };

  return (
    <div className={cn("relative h-full", className)}>
      {/* Main glass panel container */}
      <div
        className={cn(
          "fixed left-6 top-20 bottom-6 w-72 transition-all duration-1000 ease-out z-40",
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
              "mb-8 transition-all duration-1200 ease-out",
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-4"
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
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
              
              {/* Design switcher */}
              <button
                onClick={cycleDesign}
                className="group relative p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 transition-all duration-300"
                title="Switch design style"
              >
                <RotateCcw className="w-4 h-4 text-[#0E315C]/60 group-hover:text-[#0E315C] transition-colors" />
                <div className="absolute -bottom-6 right-0 text-xs text-[#99C0F0]/60 font-light">
                  {getDesignName()}
                </div>
              </button>
            </div>
            
            {/* Elegant separator */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#99C0F0]/30 to-transparent" />
          </div>

          {/* Menu items with different design variants */}
          <div className="flex-1">
            {designVariant === "enhanced" && (
              <EnhancedDesign
                items={enhancedItems}
                isVisible={isVisible}
                hoveredItem={hoveredItem}
                setHoveredItem={setHoveredItem}
              />
            )}
            {designVariant === "minimal" && (
              <MinimalDesign
                items={enhancedItems}
                isVisible={isVisible}
                hoveredItem={hoveredItem}
                setHoveredItem={setHoveredItem}
              />
            )}
            {designVariant === "cards" && (
              <CardsDesign
                items={enhancedItems}
                isVisible={isVisible}
                hoveredItem={hoveredItem}
                setHoveredItem={setHoveredItem}
              />
            )}
          </div>

          {/* Footer section */}
          <div
            className={cn(
              "mt-6 pt-6 border-t border-[#99C0F0]/20 transition-all duration-1200 ease-out",
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

// Design Variant 1: Enhanced (refined current design)
function EnhancedDesign({ items, isVisible, hoveredItem, setHoveredItem }: {
  items: (MenuItem & { icon: LucideIcon; description: string })[];
  isVisible: boolean;
  hoveredItem: string | null;
  setHoveredItem: (id: string | null) => void;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => {
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
  );
}

// Design Variant 2: Minimalist Typography
function MinimalDesign({ items, isVisible, hoveredItem, setHoveredItem }: {
  items: (MenuItem & { icon: LucideIcon; description: string })[];
  isVisible: boolean;
  hoveredItem: string | null;
  setHoveredItem: (id: string | null) => void;
}) {
  return (
    <div className="space-y-1">
      {items.map((item, index) => {
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
                isHovered && isLogout && "border-l-red-400/60"
              )}
            >
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Minimal icon */}
                  <item.icon
                    className={cn(
                      "w-4 h-4 transition-all duration-300",
                      isLogout
                        ? "text-red-500/60 group-hover:text-red-500/80"
                        : "text-[#0E315C]/50 group-hover:text-[#0E315C]/80"
                    )}
                  />

                  {/* Typography focus */}
                  <div>
                    <h3
                      className={cn(
                        "font-light text-lg tracking-wide transition-colors duration-300",
                        isLogout
                          ? "text-red-600/70 group-hover:text-red-600"
                          : "text-[#0E315C]/70 group-hover:text-[#0E315C]"
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        "text-xs font-light opacity-0 group-hover:opacity-100 transition-all duration-300 mt-1",
                        isLogout
                          ? "text-red-500/60"
                          : "text-[#99C0F0]/70"
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Subtle arrow on hover */}
                <ArrowRight
                  className={cn(
                    "w-3 h-3 transition-all duration-300",
                    isHovered
                      ? isLogout
                        ? "text-red-400/80 opacity-100 translate-x-0"
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
  );
}

// Design Variant 3: Card-based
function CardsDesign({ items, isVisible, hoveredItem, setHoveredItem }: {
  items: (MenuItem & { icon: LucideIcon; description: string })[];
  isVisible: boolean;
  hoveredItem: string | null;
  setHoveredItem: (id: string | null) => void;
}) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => {
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
              transitionDelay: `${400 + index * 120}ms`,
            }}
          >
            <button
              onClick={item.action}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={cn(
                "w-full group relative transition-all duration-300 text-left",
                "transform hover:scale-[1.03] hover:-translate-y-1",
                "rounded-xl overflow-hidden"
              )}
            >
              {/* Card background */}
              <div
                className={cn(
                  "relative p-5 rounded-xl border transition-all duration-300",
                  isLogout
                    ? "bg-gradient-to-br from-red-500/5 to-red-400/10 border-red-300/20 group-hover:from-red-500/10 group-hover:to-red-400/15 group-hover:border-red-300/40"
                    : "bg-gradient-to-br from-white/10 to-[#C1D9F6]/10 border-white/20 group-hover:from-[#99C0F0]/15 group-hover:to-[#C1D9F6]/20 group-hover:border-[#99C0F0]/40"
                )}
              >
                {/* Card glow effect */}
                {isHovered && (
                  <div
                    className={cn(
                      "absolute inset-0 rounded-xl blur-lg transition-opacity duration-300",
                      isLogout
                        ? "bg-gradient-to-br from-red-400/20 to-red-300/10"
                        : "bg-gradient-to-br from-[#99C0F0]/20 to-[#C1D9F6]/10"
                    )}
                  />
                )}

                <div className="relative">
                  {/* Card header with icon */}
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                        isLogout
                          ? "bg-red-500/20 group-hover:bg-red-500/30"
                          : "bg-[#99C0F0]/20 group-hover:bg-[#99C0F0]/30"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "w-4 h-4 transition-all duration-300",
                          isLogout
                            ? "text-red-500/80 group-hover:text-red-500"
                            : "text-[#0E315C]/70 group-hover:text-[#0E315C]"
                        )}
                      />
                    </div>

                    {/* Card status indicator */}
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        isHovered
                          ? isLogout
                            ? "bg-red-400/80"
                            : "bg-[#99C0F0]/80"
                          : "bg-[#99C0F0]/30"
                      )}
                    />
                  </div>

                  {/* Card content */}
                  <div>
                    <h3
                      className={cn(
                        "font-medium text-base mb-2 transition-colors duration-300",
                        isLogout
                          ? "text-red-600/80 group-hover:text-red-600"
                          : "text-[#0E315C]/80 group-hover:text-[#0E315C]"
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        "text-sm font-light leading-relaxed transition-colors duration-300",
                        isLogout
                          ? "text-red-500/60 group-hover:text-red-500/80"
                          : "text-[#99C0F0]/70 group-hover:text-[#99C0F0]/90"
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          </div>
        );
      })}
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
