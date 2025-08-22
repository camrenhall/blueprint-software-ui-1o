import { cn } from "@/lib/utils";

interface SimpleThinkingAnimationProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function SimpleThinkingAnimation({
  className,
  size = "md",
}: SimpleThinkingAnimationProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        sizeClasses[size],
        className,
      )}
    >
      {/* Simple spinner with gradient border and glass center */}
      <div
        className={cn(
          "rounded-full border-2 border-transparent animate-spin",
          sizeClasses[size],
        )}
        style={{
          background: `conic-gradient(from 0deg, #99C0F0, #C1D9F6, #C5BFEE, #99C0F0)`,
          borderRadius: "50%",
        }}
      />

      {/* Glass-like center with subtle gradient */}
      <div
        className={cn(
          "absolute rounded-full backdrop-blur-sm border border-white/20 shadow-inner",
          size === "sm" ? "w-4 h-4" : size === "md" ? "w-6 h-6" : "w-9 h-9",
        )}
        style={{
          background: `radial-gradient(circle at 30% 30%, rgba(153, 192, 240, 0.1), rgba(193, 217, 246, 0.05), rgba(197, 191, 238, 0.08))`,
        }}
      />
    </div>
  );
}
