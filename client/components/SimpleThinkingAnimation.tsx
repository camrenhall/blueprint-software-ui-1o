import { cn } from "@/lib/utils";

interface SimpleThinkingAnimationProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function SimpleThinkingAnimation({ 
  className, 
  size = "md"
}: SimpleThinkingAnimationProps) {

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <div className={cn("relative flex items-center justify-center", sizeClasses[size], className)}>
      {/* Simple spinning circle with gradient */}
      <div 
        className={cn(
          "absolute rounded-full border-2 border-transparent animate-spin",
          sizeClasses[size]
        )}
        style={{
          background: `conic-gradient(from 0deg, #99C0F0, #C1D9F6, #C5BFEE, #99C0F0)`,
          borderRadius: '50%',
        }}
      />
      
      {/* Inner circle to create ring effect */}
      <div 
        className={cn(
          "absolute bg-white rounded-full",
          size === "sm" ? "w-4 h-4" : size === "md" ? "w-6 h-6" : "w-9 h-9"
        )}
      />
      
      {/* Three colored dots that rotate around */}
      <div className="absolute inset-0">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "absolute rounded-full",
              size === "sm" ? "w-1.5 h-1.5" : size === "md" ? "w-2 h-2" : "w-3 h-3"
            )}
            style={{
              backgroundColor: i === 0 ? '#99C0F0' : i === 1 ? '#C1D9F6' : '#C5BFEE',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${i * 120}deg) translateY(-${size === "sm" ? "10" : size === "md" ? "14" : "18"}px)`,
              animation: `spin 1.5s linear infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}
