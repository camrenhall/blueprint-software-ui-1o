import { useState, useMemo, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Case } from "./types";
import { filterCases, sortCases, convertLegacyCase, SortOption } from "./utils";
import { SearchFilterBar, ViewMode } from "./SearchFilterBar";
import { CaseList } from "./CaseList";
import { KanbanView } from "./KanbanView";
import CaseDetailsNew from "../CaseDetailsNew";

interface ReviewProps {
  onClose?: () => void;
  initialCaseId?: string;
  onNavigateToCommunications?: (clientId?: string) => void;
}

export { KanbanView } from "./KanbanView";
export { KanbanCard } from "./KanbanCard";
export { KanbanColumn } from "./KanbanColumn";

export default function Review({ onClose, initialCaseId, onNavigateToCommunications }: ReviewProps) {
  const [searchValue, setSearchValue] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("priority");
  const [viewMode, setViewMode] = useState<ViewMode>("detailed");
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger cascading animation after component mounts
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Mock case data (in real app, this would come from props or API)
  const allCases: Case[] = useMemo(
    () => [
      convertLegacyCase({
        name: "Rosen, Claire",
        caseId: "#BTYREV50101",
        status: "Needs Review",
        progress: "5/5 Tasks Complete",
        progressPercent: 100,
        lastActivity: "16 Minutes Ago",
        queueTime: "13 Days",
        avatar: "RC",
      }),
      convertLegacyCase({
        name: "Chen, Mike",
        caseId: "#CHEN40101",
        status: "Needs Review",
        progress: "3/3 Tasks Complete",
        progressPercent: 100,
        lastActivity: "1 Day Ago",
        queueTime: "7 Days",
        avatar: "MC",
      }),
      convertLegacyCase({
        name: "Morrison, Kate",
        caseId: "#XREMVB32482",
        status: "Awaiting Documents",
        progress: "4/5 Tasks Complete",
        progressPercent: 80,
        lastActivity: "3 Hours Ago",
        queueTime: "10 Days",
        avatar: "MK",
      }),
      convertLegacyCase({
        name: "Williams, Sarah",
        caseId: "#WILL50203",
        status: "Awaiting Documents",
        progress: "2/4 Tasks Complete",
        progressPercent: 50,
        lastActivity: "4 Hours Ago",
        queueTime: "15 Days",
        avatar: "SW",
      }),
      convertLegacyCase({
        name: "Johnson, Michael",
        caseId: "#JOHN40512",
        status: "Awaiting Documents",
        progress: "1/3 Tasks Complete",
        progressPercent: 33,
        lastActivity: "2 Days Ago",
        queueTime: "8 Days",
        avatar: "MJ",
      }),
      convertLegacyCase({
        name: "Fulsom, Jackson",
        caseId: "#FULJ30925",
        status: "Complete",
        progress: "6/6 Tasks Complete",
        progressPercent: 100,
        lastActivity: "2 Hours Ago",
        queueTime: "11 Days",
        avatar: "FJ",
      }),
      convertLegacyCase({
        name: "Rodriguez, Maria",
        caseId: "#RODM31847",
        status: "Complete",
        progress: "4/4 Tasks Complete",
        progressPercent: 100,
        lastActivity: "1 Day Ago",
        queueTime: "14 Days",
        avatar: "MR",
      }),
      convertLegacyCase({
        name: "Taylor, James",
        caseId: "#TAYL50293",
        status: "Complete",
        progress: "7/7 Tasks Complete",
        progressPercent: 100,
        lastActivity: "3 Days Ago",
        queueTime: "21 Days",
        avatar: "JT",
      }),
      convertLegacyCase({
        name: "Anderson, Lisa",
        caseId: "#ANDL41056",
        status: "Complete",
        progress: "5/5 Tasks Complete",
        progressPercent: 100,
        lastActivity: "5 Days Ago",
        queueTime: "19 Days",
        avatar: "LA",
      }),
      convertLegacyCase({
        name: "Brown, Robert",
        caseId: "#BROR30847",
        status: "Complete",
        progress: "3/3 Tasks Complete",
        progressPercent: 100,
        lastActivity: "1 Week Ago",
        queueTime: "16 Days",
        avatar: "BR",
      }),
    ],
    [],
  );

  // Handle initial case selection
  useEffect(() => {
    if (initialCaseId && allCases.length > 0) {
      const caseToSelect = allCases.find((c) => c.caseId === initialCaseId);
      if (caseToSelect) {
        setSelectedCase(caseToSelect);
      }
    }
  }, [initialCaseId, allCases]);

  // Filter and sort cases
  const processedCases = useMemo(() => {
    const filtered = filterCases(allCases, searchValue, activeFilters);
    return sortCases(filtered, sortBy);
  }, [allCases, searchValue, activeFilters, sortBy]);

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId],
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    if (mode !== viewMode) {
      setIsTransitioning(true);
      setTimeout(() => {
        setViewMode(mode);
        setTimeout(() => setIsTransitioning(false), 100);
      }, 150);
    }
  };

  const handleCaseSelect = (caseItem: Case) => {
    setSelectedCase(caseItem);
  };

  const closeModal = () => {
    setSelectedCase(null);
  };

  return (
    <div
      className="absolute inset-0 flex flex-col px-8 py-8 lg:px-6 lg:py-6 md:px-4 md:py-4"
      style={{ transform: "translateZ(0)" }}
    >
      {/* Header - Hide when case details are shown */}
      {!selectedCase && (
        <div className={cn(
          "text-center mb-8 flex-shrink-0 transition-all duration-1000 ease-out delay-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <div className="text-center">
            <h1 className="text-2xl font-light text-[#0E315C] tracking-wide">
              Case Management
            </h1>
            <p className="text-sm text-[#0E315C]/60 font-light">
              Comprehensive case tracking and management across all status types
            </p>
          </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-0 right-0 w-10 h-10 rounded-full flex items-center justify-center text-[#0E315C]/50 hover:text-[#0E315C] hover:bg-[#C1D9F6]/25 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        </div>
      )}

      {/* Enhanced Search, Filter and Sort Bar - Hide when case details are shown */}
      {!selectedCase && (
        <SearchFilterBar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          activeFilters={activeFilters}
          onFilterToggle={toggleFilter}
          onClearFilters={clearFilters}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          className={cn(
            "mb-6 transition-all duration-800 ease-out delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
        />
      )}

      {/* Main Content Area - Either Cases or Case Details */}
      <div className="flex-1 min-h-0">
        {selectedCase ? (
          /* Case Details View - Inline */
          <div className={cn(
            "h-full transition-all duration-500 ease-out animate-fadeIn"
          )}>
            <CaseDetailsNew
              selectedCase={selectedCase}
              onBack={closeModal}
              inline={true}
              onNavigateToCommunications={onNavigateToCommunications}
            />
          </div>
        ) : (
          /* Cases Content */
          <div className={cn(
            "h-full transition-all duration-500 ease-out",
            isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"
          )}>
            {viewMode === "kanban" ? (
              <KanbanView
                cases={processedCases}
                onCaseSelect={handleCaseSelect}
                className={cn(
                  "h-full transition-all duration-1000 ease-out delay-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              />
            ) : (
              <CaseList
                cases={processedCases}
                onCaseSelect={handleCaseSelect}
                isCompact={viewMode === "compact"}
                className={cn(
                  "h-full transition-all duration-1000 ease-out delay-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
