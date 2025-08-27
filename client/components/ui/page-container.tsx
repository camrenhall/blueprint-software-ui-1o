import * as React from "react";
import { cn } from "@/lib/utils";

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Page layout variant
   * - "sidebar-offset": For pages with fixed sidebar (like Index page content areas)
   * - "inset": For pages with padding offset (like Settings)
   * - "fullscreen": For full-screen layouts
   */
  variant?: "sidebar-offset" | "inset" | "fullscreen";
  
  /**
   * Glass morphism intensity
   * - "light": backdrop-blur-sm, lighter gradients
   * - "heavy": backdrop-blur-xl, stronger gradients with layers
   */
  glassIntensity?: "light" | "heavy";
  
  /**
   * Border radius
   */
  radius?: "md" | "lg";
  
  /**
   * Whether to include layered glass effects (for heavy intensity)
   */
  layered?: boolean;
  
  /**
   * Custom class name for the container
   */
  className?: string;
}

const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  ({ 
    variant = "fullscreen", 
    glassIntensity = "light", 
    radius = "md", 
    layered = true,
    className, 
    children,
    ...props 
  }, ref) => {
    
    // Container positioning based on variant
    const containerClasses = {
      "sidebar-offset": "absolute left-96 right-6 top-6 bottom-6",
      "inset": "absolute inset-6", 
      "fullscreen": "absolute inset-0"
    };
    
    // Radius classes
    const radiusClasses = {
      md: "rounded-2xl",
      lg: "rounded-3xl"
    };
    
    // Glass background classes based on intensity
    const glassClasses = {
      light: `bg-gradient-to-br from-white/10 via-[#C1D9F6]/5 to-white/5 backdrop-blur-sm border border-white/10 shadow-xl`,
      heavy: `bg-gradient-to-br from-white/25 via-[#C1D9F6]/15 to-white/20 backdrop-blur-xl border border-white/20 shadow-2xl`
    };
    
    // Heavy glass overlay layers
    const heavyOverlayClasses = `bg-gradient-to-br from-[#99C0F0]/10 via-transparent to-[#C5BFEE]/10`;
    const heavyInnerGlowClasses = `bg-gradient-to-br from-transparent via-white/5 to-transparent`;
    
    return (
      <div 
        ref={ref} 
        className={cn(
          containerClasses[variant],
          "transition-all duration-1000 ease-out",
          className
        )} 
        {...props}
      >
        {/* Primary glass layer */}
        <div 
          className={cn(
            "absolute inset-0",
            radiusClasses[radius],
            glassClasses[glassIntensity]
          )}
        />
        
        {/* Secondary overlay - only for heavy glass when layered */}
        {layered && glassIntensity === "heavy" && (
          <div 
            className={cn(
              "absolute inset-0",
              radiusClasses[radius],
              heavyOverlayClasses
            )}
          />
        )}
        
        {/* Inner glow - only for heavy glass when layered */}
        {layered && glassIntensity === "heavy" && (
          <div 
            className={cn(
              "absolute inset-0",
              radiusClasses[radius],
              heavyInnerGlowClasses
            )}
          />
        )}
        
        {/* Content with proper positioning context */}
        <div className="relative h-full w-full">
          {children}
        </div>
      </div>
    );
  }
);

PageContainer.displayName = "PageContainer";

export { PageContainer };
