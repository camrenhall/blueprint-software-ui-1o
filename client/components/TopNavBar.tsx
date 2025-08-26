import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Settings,
  User,
  LogOut,
  Wifi,
  Activity,
  ChevronDown,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAIAgent } from "@/contexts/AIAgentContext";

interface TopNavBarProps {
  className?: string;
}

export default function TopNavBar({ className }: TopNavBarProps) {
  const navigate = useNavigate();
  const { isAIAgentEnabled, toggleAIAgent } = useAIAgent();
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    // Fade in animation
    setTimeout(() => setIsVisible(true), 100);

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ease-out",
        isVisible
          ? "opacity-100 transform translate-y-0"
          : "opacity-0 transform -translate-y-4",
        className,
      )}
    >
      {/* Glass morphism container */}
      <div className="relative">
        {/* Background blur layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-[#C1D9F6]/15 to-white/20 backdrop-blur-xl border-b border-white/20" />

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#99C0F0]/10 to-transparent" />

        {/* Main navigation content */}
        <div className="relative px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left section - Logo/Brand area */}
            <div className="flex items-center space-x-6">
              {/* Floating OS indicator */}
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#99C0F0]/60 to-[#C5BFEE]/40 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/30">
                    <div className="w-3 h-3 bg-white/80 rounded-full animate-pulse" />
                  </div>
                  {/* Status indicator */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400/80 rounded-full border-2 border-white/50 animate-pulse" />
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-[#0E315C]/80">
                    Luceron AI
                  </div>
                  <div className="text-xs text-[#99C0F0]/70">v2.1.3</div>
                </div>
              </div>

              {/* System status indicators */}
              <div className="hidden lg:flex items-center space-x-4 ml-8">
                <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Wifi className="w-3 h-3 text-[#99C0F0]/80" />
                  <span className="text-xs text-[#0E315C]/70 font-medium">
                    Online
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Activity className="w-3 h-3 text-green-500/80" />
                  <span className="text-xs text-[#0E315C]/70 font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Right section - System controls and profile */}
            <div className="flex items-center space-x-6">
              {/* Time and date display */}
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-[#0E315C]/80">
                  {formatTime(currentTime)}
                </div>
                <div className="text-xs text-[#99C0F0]/70">
                  {formatDate(currentTime)}
                </div>
              </div>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2 hover:bg-white/10 transition-all duration-300 rounded-full"
              >
                <Bell className="w-4 h-4 text-[#0E315C]/70" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-[#C5BFEE]/80 text-white border border-white/30 animate-pulse">
                  {notifications}
                </Badge>
                )}
              </Button>

              {/* AI Agent toggle */}
              <div className="flex items-center space-x-3 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Bot
                  className={cn(
                    "w-4 h-4 transition-colors duration-200",
                    isAIAgentEnabled ? "text-[#99C0F0]" : "text-[#0E315C]/40"
                  )}
                />
                <Switch
                  checked={isAIAgentEnabled}
                  onCheckedChange={toggleAIAgent}
                  className="data-[state=checked]:bg-[#99C0F0] data-[state=unchecked]:bg-[#0E315C]/20"
                />
                <span className="text-xs text-[#0E315C]/70 font-medium hidden lg:inline">
                  AI Agent
                </span>
              </div>

              {/* Settings */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/settings")}
                className="p-2 hover:bg-white/10 transition-all duration-300 rounded-full"
              >
                <Settings className="w-4 h-4 text-[#0E315C]/70" />
              </Button>

              {/* Profile dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 px-3 py-2 hover:bg-white/10 transition-all duration-300 rounded-full"
                  >
                    <Avatar className="w-8 h-8 border-2 border-white/30">
                      <AvatarImage src="/placeholder.svg" alt="Camren Hall" />
                      <AvatarFallback className="bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] text-white text-sm font-medium">
                        CH
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <div className="text-sm font-medium text-[#0E315C]/80">
                        Camren Hall
                      </div>
                      <div className="text-xs text-[#99C0F0]/70">
                        Administrator
                      </div>
                    </div>
                    <ChevronDown className="w-3 h-3 text-[#99C0F0]/60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-white/90 backdrop-blur-xl border border-white/20 shadow-xl"
                  align="end"
                >
                  <DropdownMenuLabel className="text-[#0E315C]/80">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#99C0F0]/20" />
                  <DropdownMenuItem className="text-[#0E315C]/70 hover:bg-[#C1D9F6]/20 focus:bg-[#C1D9F6]/20">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-[#0E315C]/70 hover:bg-[#C1D9F6]/20 focus:bg-[#C1D9F6]/20"
                    onClick={() => navigate("/settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#99C0F0]/20" />
                  <DropdownMenuItem className="text-[#0E315C]/70 hover:bg-[#C1D9F6]/20 focus:bg-[#C1D9F6]/20">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Floating ambient particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-2 left-1/4 w-1 h-1 bg-[#C5BFEE]/60 rounded-full animate-float" />
          <div
            className="absolute top-4 right-1/3 w-1.5 h-1.5 bg-[#99C0F0]/40 rounded-full animate-float-slow"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1 left-2/3 w-1 h-1 bg-[#C1D9F6]/50 rounded-full animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>
      </div>
    </div>
  );
}
