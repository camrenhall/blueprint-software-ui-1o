import { useState } from "react";

interface InlineReviewProps {
  onClose?: () => void;
}

export default function InlineReview({ onClose }: InlineReviewProps) {
  const [searchValue, setSearchValue] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedCase, setSelectedCase] = useState<any>(null);

  // Mock case data (in real app, this would come from props or API)
  const allCases = [
    {
      name: "Fulsom, Jackson",
      caseId: "#FULJ30925",
      status: "Complete",
      progress: "6/6 Tasks Complete",
      progressPercent: 100,
      lastActivity: "2 Hours Ago",
      queueTime: "11 Days",
      avatar: "FJ",
    },
    {
      name: "Rosen, Claire",
      caseId: "#BTYREV50101",
      status: "Needs Review",
      progress: "5/5 Tasks Complete",
      progressPercent: 100,
      lastActivity: "16 Minutes Ago",
      queueTime: "13 Days",
      avatar: "RC",
    },
    {
      name: "Morrison, Kate",
      caseId: "#XREMVB32482",
      status: "Awaiting Documents",
      progress: "4/5 Tasks Complete",
      progressPercent: 80,
      lastActivity: "3 Hours Ago",
      queueTime: "10 Days",
      avatar: "MK",
    },
    {
      name: "Chen, David",
      caseId: "#CHEN40101",
      status: "Needs Review",
      progress: "3/3 Tasks Complete",
      progressPercent: 100,
      lastActivity: "1 Day Ago",
      queueTime: "7 Days",
      avatar: "CD",
    },
    {
      name: "Williams, Sarah",
      caseId: "#WILL50203",
      status: "Awaiting Documents",
      progress: "2/4 Tasks Complete",
      progressPercent: 50,
      lastActivity: "4 Hours Ago",
      queueTime: "15 Days",
      avatar: "SW",
    },
  ];

  // Filtering logic
  const getFilteredCases = () => {
    let filtered = allCases;

    // Apply search filter
    if (searchValue) {
      filtered = filtered.filter(caseItem =>
        caseItem.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        caseItem.caseId.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Apply status filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter(caseItem => {
        return activeFilters.some(filter => {
          switch (filter) {
            case "needs-review":
              return caseItem.status === "Needs Review";
            case "awaiting-docs":
              return caseItem.status === "Awaiting Documents";
            default:
              return true;
          }
        });
      });
    }

    // Smart sorting - prioritize by status and urgency
    filtered.sort((a, b) => {
      // Priority 1: Needs Review first
      if (a.status !== b.status) {
        if (a.status === "Needs Review") return -1;
        if (b.status === "Needs Review") return 1;
        if (a.status === "Awaiting Documents") return -1;
        if (b.status === "Awaiting Documents") return 1;
      }
      
      // Priority 2: By queue time (longer first)
      return parseInt(b.queueTime) - parseInt(a.queueTime);
    });

    return filtered;
  };

  const filteredCases = getFilteredCases();

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const getStatusColor = (status: string) => {
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
      default:
        return {
          dot: "bg-[#C1D9F6]",
          progress: "bg-gradient-to-r from-[#C1D9F6]/80 to-[#C1D9F6]/60",
          hover: "hover:shadow-[#C1D9F6]/5",
          border: "hover:border-[#C1D9F6]/60"
        };
    }
  };

  return (
    <div className="h-full overflow-y-auto px-8 py-10 relative">
      {/* Enhanced Background Gradient - Exact Create Match */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-[#C1D9F6]/15 to-[#99C0F0]/10 blur-2xl" />
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
      
      {/* Header - Exact Create Match */}
      <div className="relative z-10 text-center mb-12">
        <div className="transition-all duration-1000 ease-out delay-300 opacity-100 transform translate-y-0">
          <h1 className="text-4xl font-light text-[#0E315C] mb-4 tracking-wide">Case Review</h1>
          <p className="text-[#0E315C]/70 text-base leading-relaxed">Monitor active cases and prioritize critical actions</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-0 right-0 w-10 h-10 rounded-full flex items-center justify-center text-[#0E315C]/50 hover:text-[#0E315C] hover:bg-[#C1D9F6]/25 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Elegant Search - Mimicking Create's Input Style */}
      <div className="relative z-10 mb-8 transition-all duration-800 ease-out delay-500 opacity-100 transform translate-y-0">
        <div className="text-center mb-6">
          <p className="text-[#0E315C]/60 text-sm leading-relaxed max-w-md mx-auto font-light">
            Search and filter your active cases to prioritize urgent reviews and document requests
          </p>
        </div>
        
        <div className="max-w-lg mx-auto relative">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search cases or clients..."
            className="w-full px-5 py-4 pl-12 bg-white/60 backdrop-blur-sm border border-[#C1D9F6]/40 rounded-2xl text-[#0E315C] placeholder-[#0E315C]/50 focus:outline-none focus:ring-2 focus:ring-[#99C0F0]/50 focus:border-[#99C0F0] focus:bg-white/80 transition-all text-sm font-light shadow-sm"
          />
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#0E315C]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filter Pills - Elegant Centered Design */}
        <div className="flex items-center justify-center space-x-3 mt-4">
          <button
            onClick={() => toggleFilter("needs-review")}
            className={`px-4 py-2 rounded-2xl text-xs font-light transition-all duration-300 backdrop-blur-sm border hover:scale-105 ${
              activeFilters.includes("needs-review")
                ? "bg-[#C5BFEE]/80 text-white shadow-lg shadow-[#C5BFEE]/20 border-[#C5BFEE]/60"
                : "bg-white/40 text-[#0E315C]/70 hover:bg-white/60 border-[#C1D9F6]/40 hover:border-[#C5BFEE]/40"
            }`}
          >
            Needs Review
          </button>
          <button
            onClick={() => toggleFilter("awaiting-docs")}
            className={`px-4 py-2 rounded-2xl text-xs font-light transition-all duration-300 backdrop-blur-sm border hover:scale-105 ${
              activeFilters.includes("awaiting-docs")
                ? "bg-[#99C0F0]/80 text-white shadow-lg shadow-[#99C0F0]/20 border-[#99C0F0]/60"
                : "bg-white/40 text-[#0E315C]/70 hover:bg-white/60 border-[#C1D9F6]/40 hover:border-[#99C0F0]/40"
            }`}
          >
            Awaiting Documents
          </button>
          {activeFilters.length > 0 && (
            <button
              onClick={() => setActiveFilters([])}
              className="px-3 py-2 rounded-2xl text-xs font-light text-[#0E315C]/60 hover:text-[#0E315C] hover:bg-white/40 border border-[#C1D9F6]/40 hover:border-[#C1D9F6]/60 transition-all hover:scale-105 backdrop-blur-sm"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Cases List - Exact Create Button Style */}
      <div className="relative z-10 space-y-5 transition-all duration-1000 ease-out delay-700 opacity-100 transform translate-y-0">
        {filteredCases.map((caseItem, index) => {
          const statusColors = getStatusColor(caseItem.status);

          return (
            <button
              key={caseItem.caseId}
              onClick={() => setSelectedCase(caseItem)}
              className={`w-full bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40 ${statusColors.border} hover:bg-white/50 hover:shadow-lg ${statusColors.hover} hover:border-opacity-80 transition-all duration-500 p-6 rounded-3xl text-left group`}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards"
              }}
            >
              <div className="flex items-start space-x-5">
                {/* Avatar - Exact Create Icon Style */}
                <div className="w-12 h-12 bg-gradient-to-br from-[#99C0F0]/80 to-[#C5BFEE]/60 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0 shadow-lg">
                  <span className="text-white font-light text-sm">{caseItem.avatar}</span>
                </div>

                {/* Main Case Information */}
                <div className="flex-1 min-w-0 relative">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-light text-[#0E315C] mb-1 truncate pr-24">{caseItem.name}</h3>
                      <p className="text-[#0E315C]/60 text-sm font-light mb-3 pr-24">{caseItem.caseId}</p>
                    </div>

                    {/* Compact Right Side Stats */}
                    <div className="absolute top-0 right-0 text-right flex-shrink-0">
                      <div className="text-xl font-light text-[#0E315C] mb-1">{caseItem.progressPercent}%</div>
                      <div className="text-sm text-[#0E315C]/60 font-light whitespace-nowrap">{caseItem.progress}</div>
                    </div>
                  </div>

                  {/* Extended Progress Bar - reaches across entire row */}
                  <div className="pr-2 mb-2">
                    <div className="w-full bg-[#C1D9F6]/20 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-700 ease-out ${statusColors.progress} shadow-sm`}
                        style={{ width: `${caseItem.progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Extended Statistics Row - reaches almost to arrow */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-[#0E315C]/50 font-light whitespace-nowrap overflow-hidden pr-6">
                      <div className="flex items-center space-x-1.5 flex-shrink-0">
                        <div className={`w-2.5 h-2.5 ${statusColors.dot} rounded-full shadow-sm`}></div>
                        <span className="text-[#0E315C]/70 font-medium whitespace-nowrap">{caseItem.status}</span>
                      </div>
                      <span className="flex-shrink-0">•</span>
                      <span className="whitespace-nowrap flex-shrink-0">{caseItem.queueTime} in queue</span>
                      <span className="flex-shrink-0">•</span>
                      <span className="whitespace-nowrap flex-shrink-0">{caseItem.lastActivity}</span>
                    </div>

                    {/* Arrow Icon */}
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-[#0E315C]/40 group-hover:text-[#99C0F0] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}

        {filteredCases.length === 0 && (
          <div className="bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40 rounded-3xl p-12 text-center">
            <svg className="w-12 h-12 mx-auto mb-4 text-[#0E315C]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-[#0E315C]/60 font-light">No cases match your filters</p>
          </div>
        )}
      </div>

      {/* Enhanced Selected Case Modal - Create Style */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setSelectedCase(null)}>
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 max-w-md mx-4 shadow-2xl border border-[#C1D9F6]/30" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-2xl flex items-center justify-center text-white font-light text-lg mx-auto mb-6 shadow-lg">
                {selectedCase.avatar}
              </div>
              <h3 className="text-xl font-light text-[#0E315C] mb-2">{selectedCase.name}</h3>
              <p className="text-[#0E315C]/60 text-sm font-light mb-6">{selectedCase.caseId}</p>
              <button
                onClick={() => setSelectedCase(null)}
                className="bg-[#99C0F0] hover:bg-[#0E315C] text-white px-6 py-3 rounded-2xl transition-all text-sm font-light shadow-lg shadow-[#99C0F0]/20 hover:shadow-xl hover:scale-105"
              >
                Open Case Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
