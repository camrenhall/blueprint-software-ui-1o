import {
  Search,
  Filter,
  SortAsc,
  X,
  ChevronDown,
  LayoutGrid,
  List,
  Kanban,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { filterOptions, SortOption } from "./utils";

export type ViewMode = "detailed" | "compact" | "kanban";

interface SearchFilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  activeFilters: string[];
  onFilterToggle: (filterId: string) => void;
  onClearFilters: () => void;
  sortBy: SortOption;
  onSortChange: (sortBy: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  className?: string;
}

const sortOptions: { id: SortOption; label: string; description: string }[] = [
  { id: "priority", label: "Priority", description: "Most urgent cases first" },
  {
    id: "queueTime",
    label: "Queue Time",
    description: "Longest waiting cases first",
  },
  {
    id: "lastActivity",
    label: "Last Activity",
    description: "Recently updated cases first",
  },
  {
    id: "alphabetical",
    label: "Alphabetical",
    description: "Sort by client name A-Z",
  },
];

export function SearchFilterBar({
  searchValue,
  onSearchChange,
  activeFilters,
  onFilterToggle,
  onClearFilters,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  className,
}: SearchFilterBarProps) {
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [viewDropdownOpen, setViewDropdownOpen] = useState(false);

  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const viewDropdownRef = useRef<HTMLDivElement>(null);

  const hasActiveFilters = activeFilters.length > 0;
  const hasActiveSearch = searchValue.trim().length > 0;
  const hasAnyActive = hasActiveFilters || hasActiveSearch;

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
      if (
        viewDropdownRef.current &&
        !viewDropdownRef.current.contains(event.target as Node)
      ) {
        setViewDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Ensure only one dropdown is open at a time
  const handleFilterDropdownToggle = () => {
    if (sortDropdownOpen) setSortDropdownOpen(false);
    if (viewDropdownOpen) setViewDropdownOpen(false);
    setFilterDropdownOpen(!filterDropdownOpen);
  };

  const handleSortDropdownToggle = () => {
    if (filterDropdownOpen) setFilterDropdownOpen(false);
    if (viewDropdownOpen) setViewDropdownOpen(false);
    setSortDropdownOpen(!sortDropdownOpen);
  };

  const handleViewDropdownToggle = () => {
    if (filterDropdownOpen) setFilterDropdownOpen(false);
    if (sortDropdownOpen) setSortDropdownOpen(false);
    setViewDropdownOpen(!viewDropdownOpen);
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
        <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-[#C1D9F6]/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-2">
          {/* Search Input - Takes up most of the space */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#0E315C]/40" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search cases or clients..."
              className="w-full px-5 py-3 pl-12 pr-4 bg-transparent text-[#0E315C] placeholder-[#0E315C]/50 focus:outline-none text-sm font-light rounded-xl focus:bg-white/50 transition-colors"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative" ref={filterDropdownRef}>
            <button
              onClick={handleFilterDropdownToggle}
              className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border",
                hasActiveFilters
                  ? "bg-[#99C0F0]/20 text-[#0E315C] border-[#99C0F0]/40 shadow-sm"
                  : "bg-white/40 text-[#0E315C]/70 hover:bg-white/60 border-[#C1D9F6]/40 hover:border-[#99C0F0]/40",
                filterDropdownOpen &&
                  "bg-white/80 border-[#99C0F0]/60 shadow-md",
              )}
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
              {hasActiveFilters && (
                <div className="flex items-center -space-x-1">
                  {activeFilters.slice(0, 3).map((filterId, index) => {
                    const option = filterOptions.find((f) => f.id === filterId);
                    return option ? (
                      <div
                        key={filterId}
                        className={cn(
                          "w-2 h-2 rounded-full",
                          option.color.dot,
                        )}
                        style={{ zIndex: 10 - index }}
                      />
                    ) : null;
                  })}
                  {activeFilters.length > 3 && (
                    <div className="w-2 h-2 rounded-full bg-[#0E315C] flex items-center justify-center">
                      <span className="text-[6px] text-white font-bold">+</span>
                    </div>
                  )}
                </div>
              )}
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform",
                  filterDropdownOpen && "rotate-180",
                )}
              />
            </button>

            {/* Filter Dropdown Content */}
            {filterDropdownOpen && (
              <div className="absolute top-full mt-2 right-0 w-72 bg-white/95 backdrop-blur-md border border-[#C1D9F6]/40 rounded-xl shadow-lg py-2 z-30">
                <div className="px-3 py-2 text-xs font-medium text-[#0E315C]/60 border-b border-[#C1D9F6]/30">
                  Filter by Status
                </div>

                {filterOptions.map((option) => {
                  const isActive = activeFilters.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        onFilterToggle(option.id);
                        setFilterDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2.5 text-left hover:bg-[#C1D9F6]/20 transition-colors flex items-center gap-3"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <div
                          className={cn(
                            "w-3 h-3 rounded-full",
                            option.color.dot,
                          )}
                        />
                        <span className="text-sm text-[#0E315C]">
                          {option.label}
                        </span>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 bg-[#99C0F0] rounded-full" />
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
                "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border",
                sortBy !== "priority"
                  ? "bg-[#C5BFEE]/20 text-[#0E315C] border-[#C5BFEE]/40 shadow-sm"
                  : "bg-white/40 text-[#0E315C]/70 hover:bg-white/60 border-[#C1D9F6]/40 hover:border-[#C5BFEE]/40",
                sortDropdownOpen && "bg-white/80 border-[#C5BFEE]/60 shadow-md",
              )}
            >
              <SortAsc className="w-4 h-4" />
              <span>Sort</span>
              {sortBy !== "priority" && (
                <div className="w-2 h-2 bg-[#C5BFEE] rounded-full" />
              )}
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform",
                  sortDropdownOpen && "rotate-180",
                )}
              />
            </button>

            {/* Sort Dropdown Content */}
            {sortDropdownOpen && (
              <div className="absolute top-full mt-2 right-0 w-80 bg-white/95 backdrop-blur-md border border-[#C1D9F6]/40 rounded-xl shadow-lg py-2 z-30">
                <div className="px-3 py-2 text-xs font-medium text-[#0E315C]/60 border-b border-[#C1D9F6]/30">
                  Sort Cases By
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
                          <div className="w-2 h-2 bg-[#C5BFEE] rounded-full" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* View Mode Dropdown */}
          <div className="relative" ref={viewDropdownRef}>
            <button
              onClick={handleViewDropdownToggle}
              className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border",
                viewMode !== "detailed"
                  ? "bg-[#C5BFEE]/20 text-[#0E315C] border-[#C5BFEE]/40 shadow-sm"
                  : "bg-white/40 text-[#0E315C]/70 hover:bg-white/60 border-[#C1D9F6]/40 hover:border-[#C5BFEE]/40",
                viewDropdownOpen && "bg-white/80 border-[#C5BFEE]/60 shadow-md",
              )}
            >
              {viewMode === "detailed" && <LayoutGrid className="w-4 h-4" />}
              {viewMode === "compact" && <List className="w-4 h-4" />}
              {viewMode === "kanban" && <Kanban className="w-4 h-4" />}
              <span className="hidden lg:inline capitalize">{viewMode}</span>
              {viewMode !== "detailed" && (
                <div className="w-2 h-2 bg-[#C5BFEE] rounded-full" />
              )}
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform",
                  viewDropdownOpen && "rotate-180",
                )}
              />
            </button>

            {/* View Dropdown Content */}
            {viewDropdownOpen && (
              <div className="absolute top-full mt-2 right-0 w-48 bg-white/95 backdrop-blur-md border border-[#C1D9F6]/40 rounded-xl shadow-lg py-2 z-30">
                <div className="px-3 py-2 text-xs font-medium text-[#0E315C]/60 border-b border-[#C1D9F6]/30">
                  View Mode
                </div>

                {[
                  { id: "detailed" as ViewMode, label: "Detailed", icon: LayoutGrid, desc: "Full case information" },
                  { id: "compact" as ViewMode, label: "Compact", icon: List, desc: "Condensed list view" },
                  { id: "kanban" as ViewMode, label: "Kanban", icon: Kanban, desc: "Board with columns" },
                ].map((option) => {
                  const isActive = viewMode === option.id;
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        onViewModeChange(option.id);
                        setViewDropdownOpen(false);
                      }}
                      className="w-full px-3 py-3 text-left hover:bg-[#C1D9F6]/20 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-[#0E315C]/70" />
                          <div>
                            <div className="text-sm font-medium text-[#0E315C]">
                              {option.label}
                            </div>
                            <div className="text-xs text-[#0E315C]/60 mt-0.5">
                              {option.desc}
                            </div>
                          </div>
                        </div>
                        {isActive && (
                          <div className="w-2 h-2 bg-[#C5BFEE] rounded-full" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
