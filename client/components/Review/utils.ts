import { Case, CaseStatus, StatusColors, FilterOption } from './types';

export const getStatusColors = (status: CaseStatus): StatusColors => {
  switch (status) {
    case "Needs Review":
      return {
        dot: "bg-[#C5BFEE]",
        progress: "bg-gradient-to-r from-[#C5BFEE]/80 to-[#C5BFEE]/60",
        hover: "hover:shadow-[#C5BFEE]/5",
        border: "hover:border-[#C5BFEE]/60"
      };
    case "Awaiting Documents":
      return {
        dot: "bg-[#99C0F0]",
        progress: "bg-gradient-to-r from-[#99C0F0]/80 to-[#99C0F0]/60",
        hover: "hover:shadow-[#99C0F0]/5",
        border: "hover:border-[#99C0F0]/60"
      };
    case "Complete":
      return {
        dot: "bg-[#C1D9F6]",
        progress: "bg-gradient-to-r from-[#C1D9F6]/80 to-[#C1D9F6]/60",
        hover: "hover:shadow-[#C1D9F6]/5",
        border: "hover:border-[#C1D9F6]/60"
      };
  }
};

export const filterOptions: FilterOption[] = [
  {
    id: "needs-review",
    label: "Needs Review",
    status: "Needs Review",
    color: {
      dot: "bg-[#C5BFEE]",
      progress: "bg-gradient-to-r from-[#C5BFEE]/80 to-[#C5BFEE]/60",
      hover: "hover:shadow-[#C5BFEE]/5",
      border: "hover:border-[#C5BFEE]/60",
      active: "bg-[#C5BFEE]/80 text-white shadow-lg shadow-[#C5BFEE]/20 border-[#C5BFEE]/60"
    }
  },
  {
    id: "awaiting-docs",
    label: "Awaiting Documents",
    status: "Awaiting Documents",
    color: {
      dot: "bg-[#99C0F0]",
      progress: "bg-gradient-to-r from-[#99C0F0]/80 to-[#99C0F0]/60",
      hover: "hover:shadow-[#99C0F0]/5",
      border: "hover:border-[#99C0F0]/60",
      active: "bg-[#99C0F0]/80 text-white shadow-lg shadow-[#99C0F0]/20 border-[#99C0F0]/60"
    }
  }
];

export const filterCases = (cases: Case[], query: string, activeFilters: string[]): Case[] => {
  let filtered = cases;

  // Apply search filter
  if (query.trim()) {
    const lowercaseQuery = query.toLowerCase();
    filtered = filtered.filter(caseItem =>
      caseItem.name.toLowerCase().includes(lowercaseQuery) ||
      caseItem.caseId.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Apply status filters
  if (activeFilters.length > 0) {
    filtered = filtered.filter(caseItem => {
      return activeFilters.some(filterId => {
        const filterOption = filterOptions.find(f => f.id === filterId);
        return filterOption ? caseItem.status === filterOption.status : false;
      });
    });
  }

  return filtered;
};

export const sortCases = (cases: Case[]): Case[] => {
  return [...cases].sort((a, b) => {
    // Priority 1: Needs Review first
    if (a.status !== b.status) {
      if (a.status === "Needs Review") return -1;
      if (b.status === "Needs Review") return 1;
      if (a.status === "Awaiting Documents") return -1;
      if (b.status === "Awaiting Documents") return 1;
    }
    
    // Priority 2: By queue time (longer first)
    return b.queueDays - a.queueDays;
  });
};

// Convert legacy data format to new format
export const convertLegacyCase = (legacyCase: any): Case => ({
  id: legacyCase.caseId,
  name: legacyCase.name,
  caseId: legacyCase.caseId,
  status: legacyCase.status as CaseStatus,
  progress: legacyCase.progress,
  progressPercent: legacyCase.progressPercent,
  lastActivity: legacyCase.lastActivity,
  queueDays: parseInt(legacyCase.queueTime || "0"),
  avatar: legacyCase.avatar
});
