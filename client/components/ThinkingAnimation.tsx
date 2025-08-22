import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Brain, Sparkles, Cpu } from "lucide-react";

interface ThinkingAnimationProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  message?: string;
  showText?: boolean;
}

export default function ThinkingAnimation({ 
  className, 
  size = "md", 
  message = "Thinking...",
  showText = true 
}: ThinkingAnimationProps) {
  const [currentDot, setCurrentDot] = useState(0);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDot(prev => (prev + 1) % 3);
    }, 500);

    const phaseInterval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 3);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(phaseInterval);
    };
  }, []);

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  const dotSizes = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-3 h-3"
  };

  const icons = [Brain, Sparkles, Cpu];
  const IconComponent = icons[animationPhase];

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      {/* Main Circular Animation */}
      <div className="relative flex items-center justify-center">
        {/* Outer rotating ring */}
        <div className={cn(
          "absolute border-2 border-transparent rounded-full animate-spin",
          sizeClasses[size]
        )} 
        style={{
          background: `conic-gradient(from 0deg, transparent, #99C0F0, #C1D9F6, #C5BFEE, transparent)`,
          borderRadius: '50%',
          animation: 'spin 3s linear infinite'
        }} />
        
        {/* Middle pulsing ring */}
        <div className={cn(
          "absolute border border-[#99C0F0]/30 rounded-full animate-pulse",
          size === "sm" ? "w-5 h-5" : size === "md" ? "w-7 h-7" : "w-10 h-10"
        )} />
        
        {/* Inner glass container */}
        <div className={cn(
          "relative bg-white/60 backdrop-blur-sm border border-[#C1D9F6]/40 rounded-full flex items-center justify-center shadow-lg shadow-[#99C0F0]/20",
          size === "sm" ? "w-4 h-4" : size === "md" ? "w-6 h-6" : "w-8 h-8"
        )}>
          <IconComponent className={cn(
            "text-[#0E315C]/70 animate-pulse",
            size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
          )} />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className={cn(
                "absolute bg-gradient-to-r from-[#99C0F0]/30 to-[#C5BFEE]/30 rounded-full blur-sm",
                dotSizes[size]
              )}
              style={{
                top: '50%',
                left: '50%',
                transform: `
                  translate(-50%, -50%)
                  rotate(${i * 120 + animationPhase * 30}deg)
                  translateY(-${size === "sm" ? "12" : size === "md" ? "16" : "20"}px)
                `,
                animationDelay: `${i * 0.3}s`
              }}
              className="animate-orbit"
            />
          ))}
        </div>
      </div>

      {/* Thinking dots and text */}
      {showText && (
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className={cn(
                  "rounded-full bg-[#0E315C]/40 transition-all duration-300",
                  dotSizes[size],
                  currentDot === i ? "scale-125 bg-[#99C0F0]/70" : "scale-100"
                )}
              />
            ))}
          </div>
          <span className={cn(
            "text-[#0E315C]/60 font-light",
            size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"
          )}>
            {message}
          </span>
        </div>
      )}

      <style jsx>{`
        @keyframes orbit {
          0%, 100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(var(--distance)) scale(0.8);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(var(--distance)) scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
