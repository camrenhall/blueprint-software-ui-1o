import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CaseScrollerReportsProps {
  cases: any[];
  onCaseSelect: (caseItem: any) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export default function CaseScrollerReports({
  cases,
  onCaseSelect,
  searchValue,
  onSearchChange,
}: CaseScrollerReportsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [hoveredCaseIndex, setHoveredCaseIndex] = useState<number | null>(null);

  // Calculate visual effects based on position from top (simplified for performance)
  const getCaseEffects = (index: number) => {
    // Default opacity decreases from top to bottom
    let opacity;

    if (index === 0) {
      opacity = 1; // Top item always full opacity
    } else if (index === 1) {
      opacity = 0.85; // Second item very visible
    } else if (index === 2) {
      opacity = 0.7; // Third item mostly visible
    } else if (index === 3) {
      opacity = 0.55; // Fourth item moderately visible
    } else if (index === 4) {
      opacity = 0.4; // Fifth item less visible
    } else {
      opacity = 0.25; // Rest fade more
    }

    // Adjust based on scroll position to create focus effect
    const container = scrollContainerRef.current;
    if (container) {
      const itemHeight = 120; // Approximate height of each case
      const focusedIndex = Math.round(scrollPosition / itemHeight);
      const distanceFromFocus = Math.abs(index - focusedIndex);

      if (distanceFromFocus === 0) {
        opacity = 1;
      } else if (distanceFromFocus === 1) {
        opacity = Math.max(opacity, 0.75);
      } else if (distanceFromFocus === 2) {
        opacity = Math.max(opacity, 0.55);
      }
    }

    // Override opacity to 100% on hover
    if (hoveredCaseIndex === index) {
      opacity = 1;
    }

    return { opacity };
  };

  // Handle scroll events (simplified)
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    setScrollPosition(scrollContainerRef.current.scrollTop);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      className="bg-gradient-to-b from-white/95 via-slate-50/40 to-white/95 border border-slate-200/80 rounded-3xl shadow-xl backdrop-blur-md flex overflow-hidden"
      style={{ height: "calc(100vh - 320px)" }}
    >
      {/* Vertical Sidebar */}
      <div className="flex-shrink-0 w-12 bg-white/60 backdrop-blur-sm border-r border-slate-200/40 flex flex-col items-center py-3 space-y-3 rounded-l-3xl">
        {/* Search Icon */}
        <button
          onClick={() => {
            if (isSearchVisible && searchValue) {
              // Clear search if search is visible and has content
              onSearchChange("");
            } else {
              // Toggle search visibility
              setIsSearchVisible(!isSearchVisible);
            }
          }}
          className={cn(
            "w-8 h-8 rounded-xl flex items-center justify-center transition-shadow duration-200 hover:scale-105",
            isSearchVisible
              ? "bg-emerald-500 text-white shadow-md"
              : "bg-white/80 text-slate-600 hover:bg-slate-50 border border-slate-200/60",
          )}
        >
          {isSearchVisible && searchValue ? (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </button>

        {/* Placeholder for future icons */}
        <div className="w-8 h-8 rounded-xl bg-slate-100/50 flex items-center justify-center opacity-30">
          <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
        </div>
        <div className="w-8 h-8 rounded-xl bg-slate-100/50 flex items-center justify-center opacity-30">
          <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
        </div>
        <div className="w-8 h-8 rounded-xl bg-slate-100/50 flex items-center justify-center opacity-30">
          <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Collapsible Search Header */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-out bg-white/90 border-b border-slate-200/60 backdrop-blur-sm",
            isSearchVisible ? "max-h-20 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="p-3">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search completed cases or clients..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-slate-200/60 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 transition-all placeholder-slate-400 text-slate-700 shadow-sm"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-4 h-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-sm text-slate-500 ml-4">
                {cases.length} completed case{cases.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </div>

        {/* Cases Container - Flex-grow takes remaining space */}
        <div className="flex-1 relative overflow-hidden">
          {/* Gradient overlays for depth effect */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white/80 via-white/40 to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white/80 via-white/40 to-transparent pointer-events-none z-10" />

          {/* Scrollable cases list */}
          <div
            ref={scrollContainerRef}
            className="h-full overflow-y-auto px-4"
            style={{ scrollBehavior: "smooth" }}
          >
            <div className="space-y-4 pt-3">
              {cases.map((caseItem, index) => {
                const { opacity } = getCaseEffects(index);
                const isTopFocused = index <= 2; // Top 3 items get enhanced styling

                return (
                  <div
                    key={caseItem.caseId + index}
                    data-case-index={index}
                    className="group cursor-pointer transition-opacity duration-300 ease-out"
                    style={{ opacity }}
                    onClick={() => onCaseSelect(caseItem)}
                    onMouseEnter={() => setHoveredCaseIndex(index)}
                    onMouseLeave={() => setHoveredCaseIndex(null)}
                  >
                    <div
                      className={cn(
                        "bg-gradient-to-r rounded-xl p-4 border backdrop-blur-sm transition-all duration-300 relative",
                        isTopFocused
                          ? "from-white/95 via-white/98 to-white/95 border-emerald-200/60 shadow-xl shadow-emerald-500/5"
                          : "from-white/70 via-white/80 to-white/70 border-slate-200/40 shadow-md",
                      )}
                    >
                      {/* Case Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3 flex-1">
                          <div
                            className={cn(
                              "rounded-lg flex items-center justify-center shadow-md transition-all duration-300",
                              index === 0
                                ? "w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600"
                                : "w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500",
                            )}
                          >
                            <span className="text-white font-semibold text-xs">
                              {caseItem.avatar}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 min-w-0">
                            <h3
                              className={cn(
                                "font-semibold transition-all duration-300 truncate",
                                index === 0
                                  ? "text-slate-800 text-base"
                                  : "text-slate-700 text-sm",
                              )}
                            >
                              {caseItem.name}
                            </h3>
                            <span className="text-slate-500 text-xs font-mono italic flex-shrink-0">
                              {caseItem.caseId}
                            </span>
                          </div>
                        </div>

                        {/* Hover indicator */}
                        <div
                          className={cn(
                            "transition-all duration-300 flex-shrink-0",
                            index === 0
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-70",
                          )}
                        >
                          <svg
                            className="w-4 h-4 text-emerald-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Progress Bar - Always 100% for completed cases */}
                      <div className="mb-3">
                        <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-emerald-500 to-green-600"
                            style={{ width: "100%" }}
                          />
                        </div>
                      </div>

                      {/* Statistics Grid */}
                      <div className="grid grid-cols-5 gap-3 items-center">
                        {/* Status */}
                        <div className="flex items-center space-x-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-xs font-semibold whitespace-nowrap text-emerald-700">
                            Complete
                          </span>
                        </div>

                        {/* Tasks Complete */}
                        <div className="flex items-center space-x-1.5 text-xs whitespace-nowrap">
                          <svg
                            className="w-3 h-3 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>
                            <span className="text-slate-800 font-semibold">
                              {caseItem.tasksComplete}
                            </span>
                            <span className="text-slate-500 ml-1">
                              Tasks Complete
                            </span>
                          </span>
                        </div>

                        {/* Date Completed */}
                        <div className="flex items-center space-x-1.5 text-xs whitespace-nowrap">
                          <svg
                            className="w-3 h-3 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>
                            <span className="text-slate-800 font-semibold">
                              {caseItem.dateCompleted.split(",")[0]}
                            </span>
                            <span className="text-slate-500 ml-1">
                              {caseItem.dateCompleted
                                .split(",")
                                .slice(1)
                                .join(",")}
                            </span>
                          </span>
                        </div>

                        {/* Days in Queue */}
                        <div className="flex items-center space-x-1.5 text-xs whitespace-nowrap">
                          <svg
                            className="w-3 h-3 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>
                            <span className="text-slate-800 font-semibold">
                              {caseItem.daysInQueue}
                            </span>
                            <span className="text-slate-500 ml-1">
                              Days in Queue
                            </span>
                          </span>
                        </div>

                        {/* Case Type */}
                        <div className="flex items-center space-x-1.5 text-xs whitespace-nowrap">
                          <svg
                            className="w-3 h-3 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                          <span>
                            <span className="text-slate-800 font-semibold">
                              {caseItem.caseType}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 z-20">
            <div className="flex flex-col items-center space-y-1.5">
              <div className="w-0.5 h-12 bg-slate-200 rounded-full relative overflow-hidden">
                <div
                  className="w-full bg-emerald-400 rounded-full transition-all duration-300"
                  style={{
                    height: `${Math.min(100, (scrollPosition / Math.max(1, (cases.length - 1) * 120)) * 100)}%`,
                  }}
                />
              </div>
              <span className="text-xs font-medium">
                {Math.min(cases.length, Math.round(scrollPosition / 120) + 1)}/
                {cases.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
