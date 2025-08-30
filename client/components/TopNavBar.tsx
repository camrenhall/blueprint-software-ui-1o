import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
  ArrowRight,
  Mail,
  FileText,
} from "lucide-react";
import { useTaskQueue } from "@/hooks/useTaskQueue";
import { cn } from "@/lib/utils";

interface TopNavBarProps {
  className?: string;
}

export default function TopNavBar({ className }: TopNavBarProps) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { taskCount, filterAndSortTasks } = useTaskQueue();

  // Get latest 3 tasks for notifications
  const latestTasks = filterAndSortTasks("", [], "createdAt").slice(0, 3);

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
                  <div className="text-xs text-[#99C0F0]/70">Version 2.1.3</div>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative p-2 no-focus rounded-full"
                  >
                    <Bell className="w-4 h-4 text-[#0E315C]/70" />
                    {taskCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-[#C5BFEE]/80 text-white border border-white/30 animate-pulse">
                        {taskCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-80 bg-white/90 backdrop-blur-xl border border-white/20 shadow-xl"
                  align="end"
                  sideOffset={8}
                >
                  <DropdownMenuLabel className="text-[#0E315C]/80 px-4 py-3">
                    Recent Notifications
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#99C0F0]/20" />

                  {latestTasks.length === 0 ? (
                    <div className="px-4 py-6 text-center text-[#0E315C]/50 text-sm">
                      No notifications at this time
                    </div>
                  ) : (
                    latestTasks.map((task) => (
                      <DropdownMenuItem
                        key={task.id}
                        className="px-4 py-3 text-[#0E315C]/70 hover:bg-[#C1D9F6]/20 focus:bg-[#C1D9F6]/20 cursor-pointer border-l-4 border-transparent hover:border-l-[#99C0F0] transition-all"
                        onClick={() => {
                          // Navigate to task queue with specific task selected
                          navigate(`/menu?view=taskqueue&taskId=${task.id}&t=${Date.now()}`, { replace: true });
                        }}
                      >
                        <div className="flex items-start space-x-3 w-full">
                          <div className="flex-shrink-0 mt-1">
                            {task.category === "email" ? (
                              <Mail className="w-4 h-4 text-[#99C0F0]" />
                            ) : (
                              <FileText className="w-4 h-4 text-[#C5BFEE]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-[#0E315C] truncate">
                              {task.title}
                            </div>
                            <div className="text-xs text-[#0E315C]/60 mt-1 line-clamp-2">
                              {task.description}
                            </div>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))
                  )}

                  <DropdownMenuSeparator className="bg-[#99C0F0]/20" />
                  <DropdownMenuItem
                    className="px-4 py-3 text-[#0E315C]/70 hover:bg-[#C1D9F6]/20 focus:bg-[#C1D9F6]/20 cursor-pointer font-medium"
                    onClick={() => {
                      // Force navigation to task queue by using replace and adding timestamp
                      navigate(`/menu?view=taskqueue&t=${Date.now()}`, { replace: true });
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>View all tasks</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Settings */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/menu?view=settings")}
                className="p-2 no-focus rounded-full"
              >
                <Settings className="w-4 h-4 text-[#0E315C]/70" />
              </Button>

              {/* Profile dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 px-3 py-2 outline-none border-none focus:outline-none focus:border-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 active:outline-none rounded-full"
                  >
                    <Avatar className="w-8 h-8 border-2 border-white/30">
                      <AvatarFallback className="bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] text-white text-sm font-medium flex items-center justify-center">
                        <User className="w-4 h-4" />
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
                    onClick={() => navigate("/menu?view=settings")}
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
