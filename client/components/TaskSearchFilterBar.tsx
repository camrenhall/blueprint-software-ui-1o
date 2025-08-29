import {
  Search,
  Filter,
  SortAsc,
  X,
  ChevronDown,
  Check,
  CheckSquare,
  Square,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export type TaskSortOption = "priority" | "createdAt" | "estimatedTime" | "alphabetical";

interface TaskSearchFilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  activeFilters: string[];
  onFilterToggle: (filterId: string) => void;
  onClearFilters: () => void;
  sortBy: TaskSortOption;
  onSortChange: (sortBy: TaskSortOption) => void;
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onAcceptSelected: () => void;
  className?: string;
}

const filterOptions = [
  {
    id: "email",
    label: "Email Tasks",
    color: {
      dot: "bg-[#99C0F0]",
    },
  },
  {
    id: "reminder",
    label: "Reminder Tasks",
    color: {
      dot: "bg-[#C5BFEE]",
    },
  },
  {
    id: "analysis",
    label: "Analysis Tasks",
    color: {
      dot: "bg-[#99C0F0]",
    },
  },
  {
    id: "action",
    label: "Action Tasks",
    color: {
      dot: "bg-[#C5BFEE]",
    },
  },
  {
    id: "follow-up",
    label: "Follow-up Tasks",
    color: {
      dot: "bg-[#99C0F0]",
    },
  },
];

const sortOptions: { id: TaskSortOption; label: string; description: string }[] = [
  { id: "createdAt", label: "Recently Proposed", description: "Newest proposals first" },
  { id: "estimatedTime", label: "Time Required", description: "Quickest tasks first" },
  { id: "alphabetical", label: "Alphabetical", description: "Sort by task title A-Z" },
  { id: "priority", label: "Priority", description: "High priority tasks first" },
];

export function TaskSearchFilterBar({
  searchValue,
  onSearchChange,
  activeFilters,
  onFilterToggle,
  onClearFilters,
  sortBy,
  onSortChange,
  selectedCount,
  totalCount,
  onSelectAll,
  onAcceptSelected,
  className,
}: TaskSearchFilterBarProps) {
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const hasActiveFilters = activeFilters.length > 0;
  const hasActiveSearch = searchValue.trim().length > 0;
  const hasAnyActive = hasActiveFilters || hasActiveSearch;
  const allSelected = selectedCount === totalCount && totalCount > 0;
  const someSelected = selectedCount > 0 && selectedCount < totalCount;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setFilterDropdownOpen(false);
      }
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setSortDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Ensure only one dropdown is open at a time
  const handleFilterDropdownToggle = () => {
    if (sortDropdownOpen) setSortDropdownOpen(false);
    setFilterDropdownOpen(!filterDropdownOpen);
  };

  const handleSortDropdownToggle = () => {
    if (filterDropdownOpen) setFilterDropdownOpen(false);
    setSortDropdownOpen(!sortDropdownOpen);
  };

  const clearAllFilters = () => {
    onClearFilters();
    onSearchChange("");
    setFilterDropdownOpen(false);
  };

  return (
    <div className={cn("relative z-20 flex-shrink-0", className)}>
      <div className="max-w-4xl mx-auto">
        {/* Main Control Bar */}
        <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-[#C1D9F6]/40 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-1.5">
          {/* Search Input - Takes up most of the space */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#0E315C]/40" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tasks or agents..."
              className="w-full px-4 py-2 pl-10 pr-3 bg-transparent text-[#0E315C] placeholder-[#0E315C]/50 focus:outline-none text-sm font-light rounded-lg focus:bg-white/50 transition-colors"
            />
          </div>

          {/* Select All Section */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/40 border border-[#C1D9F6]/40">
            <button
              onClick={onSelectAll}
              className="flex items-center gap-3 text-[#0E315C] hover:text-[#99C0F0] transition-colors duration-300 font-light"
            >
              <div className={cn(
                "w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300",
                allSelected 
                  ? "bg-[#99C0F0] border-[#99C0F0] text-white" 
                  : someSelected
                  ? "bg-[#99C0F0]/20 border-[#99C0F0] text-[#99C0F0]"
                  : "border-[#C1D9F6]/60 hover:border-[#99C0F0]/80 bg-white/60 backdrop-blur-sm"
              )}>
                {allSelected ? (
                  <Check className="w-3 h-3" />
                ) : someSelected ? (
                  <div className="w-2 h-2 bg-current rounded-sm" />
                ) : null}
              </div>
              <span className="text-sm">
                {selectedCount === 0 
                  ? "Select All" 
                  : allSelected 
                  ? "Deselect All" 
                  : `${selectedCount} Selected`}
              </span>
            </button>
          </div>

          {/* Filter Dropdown */}
          <div className="relative" ref={filterDropdownRef}>
            <button
              onClick={handleFilterDropdownToggle}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border",
                hasActiveFilters
                  ? "bg-[#99C0F0]/20 text-[#0E315C] border-[#99C0F0]/40 shadow-sm"
                  : "bg-white/40 text-[#0E315C]/70 hover:bg-white/60 border-[#C1D9F6]/40 hover:border-[#99C0F0]/40",
                filterDropdownOpen &&
                  "bg-white/80 border-[#99C0F0]/60 shadow-md",
              )}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filter</span>
              {hasActiveFilters && (
                <div className="w-1.5 h-1.5 bg-[#99C0F0] rounded-full" />
              )}
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform",
                  filterDropdownOpen && "rotate-180",
                )}
              />
            </button>

            {/* Filter Dropdown Content */}
            {filterDropdownOpen && (
              <div className="absolute top-full mt-2 right-0 w-72 bg-white/95 backdrop-blur-md border border-[#C1D9F6]/40 rounded-xl shadow-lg py-2 z-30">
                <div className="px-3 py-2 text-xs font-medium text-[#0E315C]/60 border-b border-[#C1D9F6]/30">
                  Filter by Category
                </div>

                {filterOptions.map((option) => {
                  const isActive = activeFilters.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      onClick={() => onFilterToggle(option.id)}
                      className="w-full px-3 py-2.5 text-left hover:bg-[#C1D9F6]/20 transition-colors flex items-center gap-3"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <div
                          className={cn(
                            "w-2.5 h-2.5 rounded-full",
                            option.color.dot,
                          )}
                        />
                        <span className="text-sm text-[#0E315C]">
                          {option.label}
                        </span>
                      </div>
                      {isActive && (
                        <div className="w-1.5 h-1.5 bg-[#99C0F0] rounded-full" />
                      )}
                    </button>
                  );
                })}

                {hasActiveFilters && (
                  <>
                    <div className="border-t border-[#C1D9F6]/30 my-2" />
                    <button
                      onClick={() => {
                        onClearFilters();
                        setFilterDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-red-50 transition-colors flex items-center gap-2 text-red-600"
                    >
                      <X className="w-4 h-4" />
                      <span className="text-sm">Clear filters</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative" ref={sortDropdownRef}>
            <button
              onClick={handleSortDropdownToggle}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border",
                sortBy !== "createdAt"
                  ? "bg-[#C5BFEE]/20 text-[#0E315C] border-[#C5BFEE]/40 shadow-sm"
                  : "bg-white/40 text-[#0E315C]/70 hover:bg-white/60 border-[#C1D9F6]/40 hover:border-[#C5BFEE]/40",
                sortDropdownOpen && "bg-white/80 border-[#C5BFEE]/60 shadow-md",
              )}
            >
              <SortAsc className="w-3.5 h-3.5" />
              <span>Sort</span>
              {sortBy !== "createdAt" && (
                <div className="w-1.5 h-1.5 bg-[#C5BFEE] rounded-full" />
              )}
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform",
                  sortDropdownOpen && "rotate-180",
                )}
              />
            </button>

            {/* Sort Dropdown Content */}
            {sortDropdownOpen && (
              <div className="absolute top-full mt-2 right-0 w-80 bg-white/95 backdrop-blur-md border border-[#C1D9F6]/40 rounded-xl shadow-lg py-2 z-30">
                <div className="px-3 py-2 text-xs font-medium text-[#0E315C]/60 border-b border-[#C1D9F6]/30">
                  Sort Tasks By
                </div>

                {sortOptions.map((option) => {
                  const isActive = sortBy === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        onSortChange(option.id);
                        setSortDropdownOpen(false);
                      }}
                      className="w-full px-3 py-3 text-left hover:bg-[#C1D9F6]/20 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-[#0E315C]">
                            {option.label}
                          </div>
                          <div className="text-xs text-[#0E315C]/60 mt-0.5">
                            {option.description}
                          </div>
                        </div>
                        {isActive && (
                          <div className="w-1.5 h-1.5 bg-[#C5BFEE] rounded-full" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Accept Selected Button - Only show when tasks are selected */}
          {selectedCount > 0 && (
            <button
              onClick={onAcceptSelected}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-[#99C0F0] hover:bg-[#0E315C] text-white border border-[#99C0F0] hover:border-[#0E315C] transition-all duration-200 shadow-lg shadow-[#99C0F0]/20 hover:shadow-xl hover:scale-105"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Accept {selectedCount}</span>
            </button>
          )}

          {/* Clear All Button - Only show when there are active filters or search */}
          {hasAnyActive && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 hover:border-red-300 transition-all duration-200"
              title="Clear all filters and search"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear All</span>
            </button>
          )}
        </div>

        {/* Active Filters Summary */}
        {(hasActiveFilters || hasActiveSearch || selectedCount > 0) && (
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[#0E315C]/60">
            <span>Active:</span>
            {hasActiveSearch && (
              <span className="px-2 py-1 bg-[#99C0F0]/20 rounded-md">
                Search: "{searchValue}"
              </span>
            )}
            {selectedCount > 0 && (
              <span className="px-2 py-1 bg-[#99C0F0]/20 rounded-md">
                Selected: {selectedCount} task{selectedCount !== 1 ? 's' : ''}
              </span>
            )}
            {activeFilters.map((filterId) => {
              const option = filterOptions.find((f) => f.id === filterId);
              return option ? (
                <span
                  key={filterId}
                  className="px-2 py-1 bg-[#99C0F0]/20 rounded-md flex items-center gap-1"
                >
                  <div
                    className={cn("w-1.5 h-1.5 rounded-full", option.color.dot)}
                  />
                  {option.label}
                </span>
              ) : null;
            })}
            {sortBy !== "createdAt" && (
              <span className="px-2 py-1 bg-[#C5BFEE]/20 rounded-md">
                Sort: {sortOptions.find((s) => s.id === sortBy)?.label}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
