import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SubMenuItem {
  id: string;
  title: string;
  action: () => void;
}

interface MenuItem {
  id: string;
  title: string;
  subItems?: SubMenuItem[];
  action?: () => void;
}

interface RadialScrollerProps {
  items: MenuItem[];
  className?: string;
}

export default function RadialScroller({
  items,
  className,
}: RadialScrollerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentLevel, setCurrentLevel] = useState<"main" | "sub">("main");
  const [currentSubItems, setCurrentSubItems] = useState<SubMenuItem[]>([]);
  const [parentTitle, setParentTitle] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentItems = currentLevel === "main" ? items : currentSubItems;

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + currentItems.length) % currentItems.length,
        );
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % currentItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleItemAction();
      } else if (e.key === "Escape" && currentLevel === "sub") {
        e.preventDefault();
        goBackToMain();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, currentLevel, currentSubItems, items]);

  const handleItemAction = () => {
    if (currentLevel === "main") {
      const selectedItem = items[selectedIndex];
      if (selectedItem?.subItems) {
        setIsTransitioning(true);
        // Add "Back" item to sub items
        const subItemsWithBack = [
          { id: "back", title: "Back", action: goBackToMain },
          ...selectedItem.subItems,
        ];

        setTimeout(() => {
          setCurrentSubItems(subItemsWithBack);
          setParentTitle(selectedItem.title);
          setCurrentLevel("sub");
          setSelectedIndex(0);
          setIsTransitioning(false);
        }, 300);
      } else if (selectedItem?.action) {
        // Execute direct action for items without subitems
        selectedItem.action();
      }
    } else {
      const selectedSubItem = currentSubItems[selectedIndex];
      if (selectedSubItem?.id !== "back") {
        // Open dashboard for sub-menu items (except back)
        selectedSubItem?.action();
      } else {
        // Handle back action
        selectedSubItem?.action();
      }
    }
  };

  const goBackToMain = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentLevel("main");
      setCurrentSubItems([]);
      setParentTitle("");
      setSelectedIndex(0);
      setIsTransitioning(false);
    }, 300);
  };

  const getItemPosition = (index: number) => {
    const spacing = 100; // Increased vertical spacing between items
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

  const currentItems = currentLevel === "main" ? items : currentSubItems;

  return (
    <div
      className={cn(
        "relative flex items-center justify-start h-full",
        className,
      )}
    >
      {/* Vertical container */}
      <div
        className={cn(
          "relative flex flex-col items-start justify-center h-full py-20 transition-all duration-300 ease-out",
          isTransitioning &&
            currentLevel === "main" &&
            "transform translate-x-[-100px] opacity-0",
          isTransitioning &&
            currentLevel === "sub" &&
            "transform translate-x-[100px] opacity-0",
        )}
      >
        {currentItems.map((item, index) => {
          const { x, y } = getItemPosition(index);
          const scale = getItemScale(index);
          const opacity = getItemOpacity(index);
          const isSelected = index === selectedIndex;
          const isHovered = hoveredIndex === index;
          const isBackItem = item.id === "back";

          return (
            <div
              key={item.id}
              className={cn(
                "absolute transition-all duration-500 ease-out cursor-pointer",
                "transform-gpu will-change-transform text-left",
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
              onClick={handleItemAction}
            >
              <h3
                className={cn(
                  "font-light tracking-wide transition-all duration-300 whitespace-nowrap",
                  isSelected
                    ? "text-slate-800 drop-shadow-md"
                    : "text-slate-600 hover:text-slate-700",
                  currentLevel === "main"
                    ? "text-4xl md:text-5xl"
                    : "text-3xl md:text-4xl",
                  isBackItem && "text-slate-500",
                )}
              >
                {item.title}
              </h3>

              {/* Subtle glow effect for selected item */}
              {isSelected && !isBackItem && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-purple-300/20 blur-xl -z-10 scale-110" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
