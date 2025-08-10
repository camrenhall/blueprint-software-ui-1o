import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CaseScrollerProps {
  cases: any[];
  onCaseSelect: (caseItem: any) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export default function CaseScrollerWithSidebar({ 
  cases, 
  onCaseSelect, 
  searchValue, 
  onSearchChange 
}: CaseScrollerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

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
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="bg-gradient-to-b from-white/95 via-slate-50/40 to-white/95 border border-slate-200/80 rounded-3xl shadow-xl backdrop-blur-md flex overflow-hidden" style={{ height: 'calc(100vh - 300px)' }}>
      {/* Vertical Sidebar */}
      <div className="flex-shrink-0 w-12 bg-white/60 backdrop-blur-sm border-r border-slate-200/40 flex flex-col items-center py-3 space-y-3 rounded-l-3xl">
        {/* Search Icon */}
        <button
          onClick={() => setIsSearchVisible(!isSearchVisible)}
          className={cn(
            "w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105",
            isSearchVisible 
              ? "bg-indigo-500 text-white shadow-md" 
              : "bg-white/80 text-slate-600 hover:bg-slate-50 border border-slate-200/60"
          )}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
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
            isSearchVisible ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="p-3">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search cases or clients..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-slate-200/60 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all placeholder-slate-400 text-slate-700 shadow-sm"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-sm text-slate-500 ml-4">
                {cases.length} case{cases.length !== 1 ? 's' : ''}
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
            style={{ scrollBehavior: 'smooth' }}
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
                  >
                    <div className={cn(
                      "bg-gradient-to-r rounded-xl p-4 border backdrop-blur-sm transition-all duration-300 relative",
                      isTopFocused 
                        ? "from-white/95 via-white/98 to-white/95 border-indigo-200/60 shadow-xl shadow-indigo-500/5" 
                        : "from-white/70 via-white/80 to-white/70 border-slate-200/40 shadow-md"
                    )}>
                      {/* Case Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className={cn(
                            "rounded-lg flex items-center justify-center shadow-md transition-all duration-300",
                            index === 0 
                              ? "w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600" 
                              : "w-9 h-9 bg-gradient-to-br from-indigo-400 to-blue-500"
                          )}>
                            <span className="text-white font-semibold text-xs">{caseItem.avatar}</span>
                          </div>
                          <div className="flex items-center space-x-2 min-w-0">
                            <h3 className={cn(
                              "font-semibold transition-all duration-300 truncate",
                              index === 0 
                                ? "text-slate-800 text-base" 
                                : "text-slate-700 text-sm"
                            )}>
                              {caseItem.name}
                            </h3>
                            <span className="text-slate-500 text-xs font-mono italic flex-shrink-0">{caseItem.caseId}</span>
                          </div>
                        </div>

                        {/* Hover indicator */}
                        <div className={cn(
                          "transition-all duration-300 flex-shrink-0",
                          index === 0 ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                        )}>
                          <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-300",
                              caseItem.status === 'Needs Review'
                                ? 'bg-gradient-to-r from-purple-500 to-violet-600'
                                : 'bg-gradient-to-r from-sky-500 to-blue-600'
                            )}
                            style={{ width: `${caseItem.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Statistics Grid */}
                      <div className="grid grid-cols-5 gap-3 items-center">
                        {/* Status */}
                        <div className="flex items-center space-x-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${caseItem.status === 'Needs Review' ? 'bg-purple-500' : 'bg-sky-500'}`} />
                          <span className={`text-xs font-semibold whitespace-nowrap ${caseItem.status === 'Needs Review' ? 'text-purple-700' : 'text-sky-700'}`}>
                            {caseItem.status}
                          </span>
                        </div>

                        {/* Review Info */}
                        <div className="flex items-center space-x-1.5 text-xs whitespace-nowrap">
                          <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>
                            <span className="text-slate-800 font-semibold">{caseItem.reviewInfo.split(' ')[0]}</span>
                            <span className="text-slate-500 ml-1">{caseItem.reviewInfo.split(' ').slice(1).join(' ')}</span>
                          </span>
                        </div>

                        {/* Progress */}
                        <div className="flex items-center space-x-1.5 text-xs whitespace-nowrap">
                          <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          <span>
                            <span className="text-slate-800 font-semibold">{caseItem.progress.split('/')[0].trim()}</span>
                            <span className="text-slate-500 mx-0.5">/</span>
                            <span className="text-slate-800 font-semibold">{caseItem.progress.split('/')[1].split(' ')[0].trim()}</span>
                            <span className="text-slate-500 ml-1">{caseItem.progress.split(' ').slice(-2).join(' ')}</span>
                          </span>
                        </div>

                        {/* Last Activity */}
                        <div className="flex items-center space-x-1.5 text-xs whitespace-nowrap">
                          <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>
                            <span className="text-slate-800 font-semibold">{caseItem.lastActivity.split(' ')[0]}</span>
                            <span className="text-slate-500 ml-1">{caseItem.lastActivity.split(' ').slice(1).join(' ')}</span>
                          </span>
                        </div>

                        {/* Queue Time */}
                        <div className="flex items-center space-x-1.5 text-xs whitespace-nowrap">
                          <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                          <span>
                            <span className="text-slate-800 font-semibold">{caseItem.queueTime.split(' ')[0]}</span>
                            <span className="text-slate-500 ml-1">{caseItem.queueTime.split(' ').slice(1).join(' ')}</span>
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
                  className="w-full bg-indigo-400 rounded-full transition-all duration-300"
                  style={{ 
                    height: `${Math.min(100, (scrollPosition / Math.max(1, (cases.length - 1) * 120)) * 100)}%`
                  }}
                />
              </div>
              <span className="text-xs font-medium">{Math.min(cases.length, Math.round(scrollPosition / 120) + 1)}/{cases.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
