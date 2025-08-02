import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MenuItem {
  id: string;
  title: string;
  subtitle?: string;
  action: () => void;
}

interface RadialScrollerProps {
  items: MenuItem[];
  className?: string;
}

export default function RadialScroller({ items, className }: RadialScrollerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + items.length) % items.length);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % items.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        items[selectedIndex]?.action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, items]);

  const getItemPosition = (index: number) => {
    const angle = (index - selectedIndex) * (Math.PI / 4); // 45 degrees apart
    const radius = 120;
    const x = Math.sin(angle) * radius;
    const y = -Math.cos(angle) * radius;
    return { x, y };
  };

  const getItemScale = (index: number) => {
    const distance = Math.abs(index - selectedIndex);
    if (distance === 0) return 1;
    if (distance === 1) return 0.8;
    if (distance === 2) return 0.6;
    return 0.4;
  };

  const getItemOpacity = (index: number) => {
    const distance = Math.abs(index - selectedIndex);
    if (distance === 0) return 1;
    if (distance === 1) return 0.7;
    if (distance === 2) return 0.4;
    return 0.2;
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Central container */}
      <div className="relative w-80 h-80 flex items-center justify-center">
        {items.map((item, index) => {
          const { x, y } = getItemPosition(index);
          const scale = getItemScale(index);
          const opacity = getItemOpacity(index);
          const isSelected = index === selectedIndex;
          const isHovered = hoveredIndex === index;
          
          return (
            <div
              key={item.id}
              className={cn(
                "absolute transition-all duration-500 ease-out cursor-pointer",
                "transform-gpu will-change-transform"
              )}
              style={{
                transform: `translate(${x}px, ${y}px) scale(${scale})`,
                opacity: isHovered ? Math.min(opacity + 0.3, 1) : opacity,
              }}
              onMouseEnter={() => {
                setHoveredIndex(index);
                if (Math.abs(index - selectedIndex) === 1) {
                  setSelectedIndex(index);
                }
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={item.action}
            >
              <div
                className={cn(
                  "relative p-6 rounded-2xl backdrop-blur-md transition-all duration-300",
                  "border border-white/20 hover:border-white/40",
                  "min-w-[140px] text-center",
                  isSelected
                    ? "bg-white/20 shadow-2xl shadow-blue-500/20"
                    : "bg-white/10 hover:bg-white/15"
                )}
              >
                {/* Glow effect for selected item */}
                {isSelected && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-sm -z-10" />
                )}
                
                <h3 className={cn(
                  "font-semibold transition-colors duration-300",
                  isSelected ? "text-white" : "text-white/80"
                )}>
                  {item.title}
                </h3>
                
                {item.subtitle && (
                  <p className={cn(
                    "text-sm mt-1 transition-colors duration-300",
                    isSelected ? "text-white/90" : "text-white/60"
                  )}>
                    {item.subtitle}
                  </p>
                )}
                
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute -inset-1 rounded-2xl border-2 border-blue-400/50 animate-pulse" />
                )}
              </div>
            </div>
          );
        })}
        
        {/* Center indicator */}
        <div className="absolute w-2 h-2 bg-white/40 rounded-full" />
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-white/60 text-sm">
          Hover to navigate • Click or press Enter to select
        </p>
        <p className="text-white/40 text-xs mt-1">
          Use arrow keys for keyboard navigation
        </p>
      </div>
    </div>
  );
}
