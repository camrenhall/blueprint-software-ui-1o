import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { filterOptions } from './utils';

interface SearchFilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  activeFilters: string[];
  onFilterToggle: (filterId: string) => void;
  onClearFilters: () => void;
  className?: string;
}

export function SearchFilterBar({
  searchValue,
  onSearchChange,
  activeFilters,
  onFilterToggle,
  onClearFilters,
  className
}: SearchFilterBarProps) {
  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className={cn("relative z-10 flex-shrink-0", className)}>
      {/* Compact Search Input with Integrated Filter Pills */}
      <div className="max-w-2xl mx-auto">
        <div className="relative bg-white/60 backdrop-blur-sm border border-[#C1D9F6]/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 focus-within:ring-2 focus-within:ring-[#99C0F0]/50 focus-within:border-[#99C0F0] focus-within:bg-white/80">
          {/* Search Input */}
          <div className="flex items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#0E315C]/40" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search cases or clients..."
                className="w-full px-5 py-4 pl-12 pr-4 bg-transparent text-[#0E315C] placeholder-[#0E315C]/50 focus:outline-none text-sm font-light"
              />
            </div>
            
            {/* Integrated Filter Pills */}
            <div className="flex items-center space-x-2 px-4 py-2">
              {filterOptions.map((option) => {
                const isActive = activeFilters.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => onFilterToggle(option.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 border flex items-center space-x-1.5 hover:scale-105",
                      isActive
                        ? option.color.active
                        : "bg-white/40 text-[#0E315C]/70 hover:bg-white/60 border-[#C1D9F6]/40 hover:border-opacity-60"
                    )}
                  >
                    <div className={cn("w-2 h-2 rounded-full", option.color.dot)} />
                    <span>{option.label}</span>
                  </button>
                );
              })}
              
              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <button
                  onClick={onClearFilters}
                  className="px-2 py-1.5 rounded-xl text-xs font-medium text-[#0E315C]/60 hover:text-[#0E315C] hover:bg-white/40 border border-[#C1D9F6]/40 hover:border-[#C1D9F6]/60 transition-all hover:scale-105 flex items-center space-x-1"
                  title="Clear all filters"
                >
                  <X className="w-3 h-3" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              )}
            </div>
          </div>
          
          {/* Active Filter Indicator */}
          {hasActiveFilters && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
              <div className="w-2 h-2 bg-[#99C0F0] rounded-full shadow-lg animate-pulse" />
            </div>
          )}
        </div>
        
        {/* Search Description - Compact */}
        <div className="text-center mt-3">
          <p className="text-[#0E315C]/60 text-xs leading-relaxed max-w-md mx-auto font-light">
            Search and filter cases to prioritize urgent reviews and document requests
          </p>
        </div>
      </div>
    </div>
  );
}
