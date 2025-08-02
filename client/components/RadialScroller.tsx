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
    const spacing = 80; // Vertical spacing between items
    const y = (index - selectedIndex) * spacing;
    return { x: 0, y };
  };

  const getItemScale = (index: number) => {
    const distance = Math.abs(index - selectedIndex);
    if (distance === 0) return 1;
    if (distance === 1) return 0.9;
    if (distance === 2) return 0.8;
    return 0.7;
  };

  const getItemOpacity = (index: number) => {
    const distance = Math.abs(index - selectedIndex);
    if (distance === 0) return 1;
    if (distance === 1) return 0.6;
    if (distance === 2) return 0.3;
    return 0.15;
  };

  return (
    <div className={cn("relative flex items-center justify-start h-full", className)}>
      {/* Vertical container */}
      <div className="relative flex flex-col items-start justify-center h-full py-20">
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
                "transform-gpu will-change-transform text-left"
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
              <h3 className={cn(
                "text-3xl md:text-4xl font-light tracking-wide transition-all duration-300 whitespace-nowrap",
                isSelected
                  ? "text-white drop-shadow-lg"
                  : "text-white/60 hover:text-white/80"
              )}>
                {item.title}
              </h3>

              {/* Subtle glow effect for selected item */}
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-xl -z-10 scale-110" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
