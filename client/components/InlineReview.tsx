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
      statusColor: "text-emerald-700",
      progress: "6/6 Tasks Complete",
      progressPercent: 100,
      lastActivity: "2 Hours Ago",
      queueTime: "11 Days",
      priority: "high",
      avatar: "FJ",
    },
    {
      name: "Rosen, Claire", 
      caseId: "#BTYREV50101",
      status: "Needs Review",
      statusColor: "text-purple-700",
      progress: "5/5 Tasks Complete",
      progressPercent: 100,
      lastActivity: "16 Minutes Ago",
      queueTime: "13 Days",
      priority: "high",
      avatar: "RC",
    },
    {
      name: "Morrison, Kate",
      caseId: "#XREMVB32482", 
      status: "Awaiting Documents",
      statusColor: "text-sky-700",
      progress: "4/5 Tasks Complete",
      progressPercent: 80,
      lastActivity: "3 Hours Ago",
      queueTime: "10 Days",
      priority: "medium",
      avatar: "MK",
    },
    {
      name: "Chen, David",
      caseId: "#CHEN40101",
      status: "Needs Review",
      statusColor: "text-purple-700", 
      progress: "3/3 Tasks Complete",
      progressPercent: 100,
      lastActivity: "1 Day Ago",
      queueTime: "7 Days",
      priority: "medium",
      avatar: "CD",
    },
    {
      name: "Williams, Sarah",
      caseId: "#WILL50203",
      status: "Awaiting Documents",
      statusColor: "text-sky-700",
      progress: "2/4 Tasks Complete", 
      progressPercent: 50,
      lastActivity: "4 Hours Ago",
      queueTime: "15 Days",
      priority: "high",
      avatar: "SW",
    },
  ];

  // Metrics calculation
  const metrics = {
    openCases: allCases.filter(c => c.status !== "Complete").length,
    needsReview: allCases.filter(c => c.status === "Needs Review").length,
    awaitingDocs: allCases.filter(c => c.status === "Awaiting Documents").length,
    validationRate: "93.8%"
  };

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
            case "high-priority":
              return caseItem.priority === "high";
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
      
      // Priority 2: Within same status, high priority first
      if (a.priority !== b.priority) {
        if (a.priority === "high") return -1;
        if (b.priority === "high") return 1;
      }

      // Priority 3: By queue time (longer first)
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

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "Needs Review":
        return {
          color: "bg-[#C5BFEE]",
          textColor: "text-[#0E315C]",
          bgColor: "bg-[#C5BFEE]/10"
        };
      case "Awaiting Documents":
        return {
          color: "bg-[#99C0F0]", 
          textColor: "text-[#0E315C]",
          bgColor: "bg-[#99C0F0]/10"
        };
      case "Complete":
        return {
          color: "bg-[#C1D9F6]",
          textColor: "text-[#0E315C]", 
          bgColor: "bg-[#C1D9F6]/10"
        };
      default:
        return {
          color: "bg-[#C1D9F6]",
          textColor: "text-[#0E315C]",
          bgColor: "bg-[#C1D9F6]/10"
        };
    }
  };

  return (
    <div className="h-full overflow-y-auto px-8 py-10 relative">
      {/* Enhanced Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-[#C1D9F6]/20 to-[#99C0F0]/15 blur-2xl" />
      <div className="absolute inset-0 bg-white/25 backdrop-blur-sm" />

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-16 w-2 h-2 bg-[#99C0F0]/30 rounded-full animate-pulse" />
      <div className="absolute bottom-24 left-12 w-1.5 h-1.5 bg-[#C5BFEE]/40 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Elegant Header */}
      <div className="relative z-10 text-center mb-12">
        <div className="transition-all duration-1000 ease-out delay-300 opacity-100 transform translate-y-0">
          <h1 className="text-4xl font-extralight text-[#0E315C] mb-4 tracking-wide">Case Review</h1>
          <p className="text-[#0E315C]/60 text-base leading-relaxed font-light max-w-sm mx-auto">Monitor active cases and prioritize actions with intelligent insights</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-0 right-0 w-10 h-10 rounded-2xl flex items-center justify-center text-[#0E315C]/40 hover:text-[#0E315C] hover:bg-white/40 transition-all duration-300 hover:scale-110 backdrop-blur-sm group"
          >
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Refined Search and Filters */}
      <div className="relative z-10 mb-10 transition-all duration-1000 ease-out delay-500 opacity-100 transform translate-y-0">
        {/* Elegant Search */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search cases or clients..."
              className="w-full px-5 py-3 pl-12 bg-white/60 backdrop-blur-md border border-[#C1D9F6]/40 rounded-3xl text-[#0E315C] placeholder-[#0E315C]/40 focus:outline-none focus:ring-2 focus:ring-[#99C0F0]/30 focus:border-[#99C0F0]/60 focus:bg-white/80 transition-all duration-300 shadow-lg shadow-[#C1D9F6]/5 text-sm"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-[#99C0F0]/20 to-[#C5BFEE]/20 rounded-xl flex items-center justify-center">
              <svg className="w-3 h-3 text-[#0E315C]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchValue && (
              <button
                onClick={() => setSearchValue("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-[#0E315C]/10 hover:bg-[#0E315C]/20 rounded-full flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-3 h-3 text-[#0E315C]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Sophisticated Filter Pills */}
        <div className="flex items-center justify-center space-x-3">
          <button
            onClick={() => toggleFilter("needs-review")}
            className={`group px-5 py-2.5 rounded-2xl text-sm font-light transition-all duration-500 hover:scale-105 ${
              activeFilters.includes("needs-review")
                ? "bg-gradient-to-r from-[#C5BFEE] to-[#C1D9F6] text-white shadow-lg shadow-[#C5BFEE]/20"
                : "bg-white/50 backdrop-blur-sm text-[#0E315C]/70 hover:bg-white/70 hover:shadow-md border border-[#C5BFEE]/30"
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-1.5 h-1.5 rounded-full transition-all ${activeFilters.includes("needs-review") ? "bg-white/80" : "bg-[#C5BFEE]/60"}`} />
              <span>Needs Review</span>
            </div>
          </button>

          <button
            onClick={() => toggleFilter("awaiting-docs")}
            className={`group px-5 py-2.5 rounded-2xl text-sm font-light transition-all duration-500 hover:scale-105 ${
              activeFilters.includes("awaiting-docs")
                ? "bg-gradient-to-r from-[#99C0F0] to-[#C1D9F6] text-white shadow-lg shadow-[#99C0F0]/20"
                : "bg-white/50 backdrop-blur-sm text-[#0E315C]/70 hover:bg-white/70 hover:shadow-md border border-[#99C0F0]/30"
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-1.5 h-1.5 rounded-full transition-all ${activeFilters.includes("awaiting-docs") ? "bg-white/80" : "bg-[#99C0F0]/60"}`} />
              <span>Awaiting Docs</span>
            </div>
          </button>

          <button
            onClick={() => toggleFilter("high-priority")}
            className={`group px-5 py-2.5 rounded-2xl text-sm font-light transition-all duration-500 hover:scale-105 ${
              activeFilters.includes("high-priority")
                ? "bg-gradient-to-r from-[#0E315C] to-[#99C0F0] text-white shadow-lg shadow-[#0E315C]/20"
                : "bg-white/50 backdrop-blur-sm text-[#0E315C]/70 hover:bg-white/70 hover:shadow-md border border-[#0E315C]/30"
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-1.5 h-1.5 rounded-full transition-all ${activeFilters.includes("high-priority") ? "bg-white/80" : "bg-[#0E315C]/60"}`} />
              <span>High Priority</span>
            </div>
          </button>

          {activeFilters.length > 0 && (
            <button
              onClick={() => setActiveFilters([])}
              className="px-4 py-2.5 rounded-2xl text-sm font-light text-[#0E315C]/50 hover:text-[#0E315C] hover:bg-white/50 transition-all duration-300 border border-[#0E315C]/20 hover:border-[#0E315C]/40"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Compact Cases List */}
      <div className="relative z-10 transition-all duration-1200 ease-out delay-900 opacity-100 transform translate-y-0">
        <div className="space-y-3 max-h-72 overflow-y-auto">
          {filteredCases.map((caseItem, index) => {
            const statusInfo = getStatusIndicator(caseItem.status);
            return (
              <div
                key={caseItem.caseId}
                className="bg-white/40 backdrop-blur-sm border border-[#C1D9F6]/30 rounded-2xl p-4 hover:bg-white/60 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedCase(caseItem)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Compact Avatar */}
                    <div className="w-10 h-10 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-xl flex items-center justify-center text-white font-medium text-sm shadow-md group-hover:scale-110 transition-transform">
                      {caseItem.avatar}
                    </div>
                    
                    {/* Case Info */}
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-sm font-medium text-[#0E315C]">{caseItem.name}</h3>
                        <span className="text-xs text-[#0E315C]/50 font-mono">{caseItem.caseId}</span>
                        {caseItem.priority === "high" && (
                          <div className="w-1.5 h-1.5 bg-[#0E315C] rounded-full"></div>
                        )}
                      </div>
                      <div className="text-xs text-[#0E315C]/60">
                        {caseItem.progress} • {caseItem.queueTime} • {caseItem.lastActivity}
                      </div>
                    </div>
                  </div>

                  {/* Status and Progress */}
                  <div className="flex items-center space-x-3">
                    {/* Status Badge */}
                    <div className={`px-2 py-1 rounded-lg text-xs font-medium ${statusInfo.textColor} ${statusInfo.bgColor} border border-current/20`}>
                      {caseItem.status}
                    </div>

                    {/* Compact Progress Ring */}
                    <div className="relative w-6 h-6">
                      <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 24 24">
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="none"
                          stroke="#C1D9F6"
                          strokeWidth="1.5"
                          opacity="0.3"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="none"
                          stroke="#99C0F0"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 8}`}
                          strokeDashoffset={`${2 * Math.PI * 8 * (1 - caseItem.progressPercent / 100)}`}
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-[#0E315C]">
                        {caseItem.progressPercent}%
                      </div>
                    </div>

                    {/* Arrow */}
                    <svg className="w-4 h-4 text-[#0E315C]/40 group-hover:text-[#99C0F0] group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredCases.length === 0 && (
            <div className="text-center py-8 text-[#0E315C]/60">
              <svg className="w-8 h-8 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-sm">No cases match your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Simple Selected Case Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setSelectedCase(null)}>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 max-w-sm mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-xl flex items-center justify-center text-white font-medium mx-auto mb-4">
                {selectedCase.avatar}
              </div>
              <h3 className="text-lg font-light text-[#0E315C] mb-1">{selectedCase.name}</h3>
              <p className="text-[#0E315C]/60 text-sm mb-4">{selectedCase.caseId}</p>
              <button
                onClick={() => setSelectedCase(null)}
                className="bg-[#99C0F0] hover:bg-[#0E315C] text-white px-4 py-2 rounded-xl transition-all text-sm"
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
