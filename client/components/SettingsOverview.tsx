import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Search,
  Bot,
  Link,
  Users,
  CreditCard,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

interface SettingsCategory {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: {
    from: string;
    to: string;
    hover: string;
  };
  route: string;
}

const settingsCategories: SettingsCategory[] = [
  {
    id: "general",
    title: "General",
    description: "Account preferences, notifications, and basic settings",
    icon: User,
    color: {
      from: "from-[#99C0F0]/80",
      to: "to-[#C1D9F6]/60",
      hover: "hover:border-[#99C0F0]/60 hover:shadow-[#99C0F0]/5"
    },
    route: "/settings/general"
  },
  {
    id: "security",
    title: "Security & Privacy",
    description: "Authentication, data protection, and audit settings",
    icon: Shield,
    color: {
      from: "from-[#C5BFEE]/80",
      to: "to-[#99C0F0]/60",
      hover: "hover:border-[#C5BFEE]/60 hover:shadow-[#C5BFEE]/5"
    },
    route: "/settings/security"
  },
  {
    id: "discovery",
    title: "Discovery",
    description: "Search algorithms, document analysis, and classification",
    icon: Search,
    color: {
      from: "from-[#C1D9F6]/80",
      to: "to-[#C5BFEE]/60",
      hover: "hover:border-[#C1D9F6]/60 hover:shadow-[#C1D9F6]/5"
    },
    route: "/settings/discovery"
  },
  {
    id: "automation",
    title: "AI & Automation",
    description: "AI assistant behavior and automated processing settings",
    icon: Bot,
    color: {
      from: "from-[#99C0F0]/80",
      to: "to-[#C5BFEE]/60",
      hover: "hover:border-[#99C0F0]/60 hover:shadow-[#99C0F0]/5"
    },
    route: "/settings/automation"
  },
  {
    id: "integration",
    title: "Integration",
    description: "External systems, exports, and third-party connections",
    icon: Link,
    color: {
      from: "from-[#C5BFEE]/80",
      to: "to-[#C1D9F6]/60",
      hover: "hover:border-[#C5BFEE]/60 hover:shadow-[#C5BFEE]/5"
    },
    route: "/settings/integration"
  },
  {
    id: "team",
    title: "Team & Collaboration",
    description: "User roles, permissions, and collaboration settings",
    icon: Users,
    color: {
      from: "from-[#C1D9F6]/80",
      to: "to-[#99C0F0]/60",
      hover: "hover:border-[#C1D9F6]/60 hover:shadow-[#C1D9F6]/5"
    },
    route: "/settings/team"
  },
  {
    id: "billing",
    title: "Usage & Billing",
    description: "Subscription management, usage monitoring, and billing",
    icon: CreditCard,
    color: {
      from: "from-[#99C0F0]/80",
      to: "to-[#C1D9F6]/60",
      hover: "hover:border-[#99C0F0]/60 hover:shadow-[#99C0F0]/5"
    },
    route: "/settings/billing"
  }
];

export default function SettingsOverview() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  useEffect(() => {
    // Staggered animation entrance
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  const handleCategorySelect = (category: SettingsCategory) => {
    navigate(category.route);
  };

  return (
    <div className="h-screen w-full relative overflow-hidden pt-16">
      <div className="h-full p-8">
        <div className={cn(
          "w-full h-full flex flex-col transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          {/* Header */}
          <div className="flex items-center mb-8">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-[#99C0F0]/20 to-[#C5BFEE]/20 backdrop-blur-sm border border-white/20 shadow-lg">
              <SettingsIcon className="w-6 h-6 text-[#0E315C]/80" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-light text-[#0E315C]/90 tracking-wide">Settings</h1>
              <p className="text-[#0E315C]/60 font-light">Configure your Luceron AI experience</p>
            </div>
          </div>

          {/* Settings Categories Grid */}
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-6">
              {settingsCategories.map((category, index) => {
                const isHovered = hoveredCategory === category.id;
                const IconComponent = category.icon;
                
                return (
                  <div
                    key={category.id}
                    className={cn(
                      "transition-all duration-700 ease-out",
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    )}
                    style={{
                      transitionDelay: `${400 + index * 100}ms`,
                    }}
                  >
                    <button
                      onClick={() => handleCategorySelect(category)}
                      onMouseEnter={() => setHoveredCategory(category.id)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      className={cn(
                        "w-full h-full bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40 hover:bg-white/50 hover:shadow-xl transition-all duration-500 p-5 rounded-2xl text-left group hover:scale-[1.02] transform",
                        category.color.hover
                      )}
                    >
                      <div className="flex flex-col space-y-6 h-full">
                        {/* Icon */}
                        <div className={cn(
                          "w-16 h-16 bg-gradient-to-br rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 flex-shrink-0 shadow-lg",
                          category.color.from,
                          category.color.to
                        )}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-light text-[#0E315C] group-hover:text-[#0E315C]/90 transition-colors">
                              {category.title}
                            </h3>
                            <ChevronRight className={cn(
                              "w-5 h-5 text-[#0E315C]/40 transition-all duration-300",
                              isHovered ? "text-[#0E315C]/70 translate-x-1" : ""
                            )} />
                          </div>
                          <p className="text-[#0E315C]/60 text-sm leading-relaxed font-light">
                            {category.description}
                          </p>
                        </div>

                        {/* Hover indicator */}
                        <div className={cn(
                          "h-1 bg-gradient-to-r rounded-full transition-all duration-300",
                          category.color.from,
                          category.color.to,
                          isHovered ? "opacity-60 scale-x-100" : "opacity-0 scale-x-0"
                        )} />
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions Footer */}
            <div className={cn(
              "mt-8 pt-8 border-t border-white/10 transition-all duration-1000 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "1200ms" }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div>
                  <h3 className="text-lg font-light text-[#0E315C]/80">Quick Actions</h3>
                  <p className="text-sm text-[#0E315C]/60 font-light">Common settings shortcuts</p>
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/settings/security")}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 hover:border-[#C5BFEE]/40 rounded-xl px-4 py-2 transition-all duration-300"
                  >
                    <Shield className="w-4 h-4 mr-2 text-[#0E315C]/70" />
                    <span className="font-light text-[#0E315C]/80">Security</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/settings/general")}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 hover:border-[#99C0F0]/40 rounded-xl px-4 py-2 transition-all duration-300"
                  >
                    <User className="w-4 h-4 mr-2 text-[#0E315C]/70" />
                    <span className="font-light text-[#0E315C]/80">Profile</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating ambient particles - matching site design */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          <div className="absolute top-12 right-12 w-2 h-2 bg-[#99C0F0]/40 rounded-full opacity-60 animate-float" />
          <div
            className="absolute bottom-24 left-12 w-1.5 h-1.5 bg-[#C5BFEE]/50 rounded-full opacity-50 animate-float-slow"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 right-1/4 w-1 h-1 bg-[#C1D9F6]/50 rounded-full opacity-40 animate-drift"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-[#99C0F0]/30 rounded-full opacity-30 animate-float"
            style={{ animationDelay: "3s" }}
          />
        </div>

        {/* Subtle edge glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#99C0F0]/5 via-transparent to-[#C5BFEE]/5 blur-xl pointer-events-none" />
      </div>
    </div>
  );
}
