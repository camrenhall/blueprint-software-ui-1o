import * as React from "react";
import { cn } from "@/lib/utils";

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Variant determines the intensity and styling approach
   * - "light": backdrop-blur-sm, lighter gradients (page backgrounds)
   * - "heavy": backdrop-blur-xl, stronger gradients with 3-layer approach
   * - "enhanced": backdrop-blur-xl, even stronger contrast (like Communications Panel)
   */
  variant?: "light" | "heavy" | "enhanced";
  
  /**
   * Inset positioning
   * - "none": absolute inset-0 (full bleed)
   * - "sm": absolute inset-6 (small padding offset)
   */
  inset?: "none" | "sm";
  
  /**
   * Border radius
   * - "md": rounded-2xl
   * - "lg": rounded-3xl
   */
  radius?: "md" | "lg";
  
  /**
   * Whether to include the layered effect (secondary gradient + inner glow)
   * Only applies to "heavy" and "enhanced" variants
   */
  layered?: boolean;
  
  /**
   * Custom class name for the container
   */
  className?: string;
}

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ 
    variant = "light", 
    inset = "none", 
    radius = "md", 
    layered = true, 
    className, 
    children,
    ...props 
  }, ref) => {
    
    // Base positioning classes
    const positionClasses = {
      none: "absolute inset-0",
      sm: "absolute inset-6"
    };
    
    // Radius classes
    const radiusClasses = {
      md: "rounded-2xl",
      lg: "rounded-3xl"
    };
    
    // Variant-specific primary layer classes
    const variantClasses = {
      light: `bg-gradient-to-br from-white/10 via-[#C1D9F6]/5 to-white/5 backdrop-blur-sm border border-white/10 shadow-xl`,
      heavy: `bg-gradient-to-br from-white/25 via-[#C1D9F6]/15 to-white/20 backdrop-blur-xl border border-white/20 shadow-2xl`,
      enhanced: `bg-gradient-to-br from-white/40 via-[#C1D9F6]/25 to-white/30 backdrop-blur-xl border border-white/30 shadow-2xl`
    };
    
    // Secondary overlay classes for layered variants
    const overlayClasses = {
      heavy: `bg-gradient-to-br from-[#99C0F0]/10 via-transparent to-[#C5BFEE]/10`,
      enhanced: `bg-gradient-to-br from-[#99C0F0]/15 via-transparent to-[#C5BFEE]/15`
    };
    
    // Inner glow class (same for both heavy and enhanced)
    const innerGlowClass = `bg-gradient-to-br from-transparent via-white/5 to-transparent`;
    
    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {/* Primary glass layer */}
        <div 
          className={cn(
            positionClasses[inset],
            radiusClasses[radius],
            variantClasses[variant]
          )}
        />
        
        {/* Secondary overlay - only for heavy/enhanced variants when layered is true */}
        {layered && (variant === "heavy" || variant === "enhanced") && (
          <div 
            className={cn(
              positionClasses[inset],
              radiusClasses[radius],
              overlayClasses[variant]
            )}
          />
        )}
        
        {/* Inner glow - only for heavy/enhanced variants when layered is true */}
        {layered && (variant === "heavy" || variant === "enhanced") && (
          <div 
            className={cn(
              positionClasses[inset],
              radiusClasses[radius],
              innerGlowClass
            )}
          />
        )}
        
        {/* Content */}
        {children}
      </div>
    );
  }
);

GlassPanel.displayName = "GlassPanel";

export { GlassPanel };
