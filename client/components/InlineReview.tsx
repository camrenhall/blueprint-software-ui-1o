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
      priority: "high",
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
      priority: "high",
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
      priority: "medium",
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
      priority: "medium",
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Needs Review":
        return "bg-[#C5BFEE]";
      case "Awaiting Documents":
        return "bg-[#99C0F0]";
      case "Complete":
        return "bg-[#C1D9F6]";
      default:
        return "bg-[#C1D9F6]";
    }
  };

  return (
    <div className="h-full overflow-y-auto px-8 py-10 relative">
      {/* Soft Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-[#C1D9F6]/15 to-[#99C0F0]/10 blur-2xl" />
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
      
      {/* Header */}
      <div className="relative z-10 text-center mb-10">
        <div className="transition-all duration-1000 ease-out delay-300 opacity-100 transform translate-y-0">
          <h1 className="text-3xl font-light text-[#0E315C] mb-3 tracking-wide">Case Review</h1>
          <p className="text-[#0E315C]/60 text-sm leading-relaxed">Monitor active cases and prioritize actions</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-0 right-0 w-8 h-8 rounded-full flex items-center justify-center text-[#0E315C]/50 hover:text-[#0E315C] hover:bg-[#C1D9F6]/25 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Compact Stats Bar */}
      <div className="relative z-10 mb-8 transition-all duration-800 ease-out delay-500 opacity-100 transform translate-y-0">
        <div className="flex items-center justify-center space-x-6 bg-white/40 backdrop-blur-sm border border-[#C1D9F6]/30 rounded-2xl px-6 py-3">
          <div className="text-center">
            <div className="text-lg font-light text-[#0E315C]">{metrics.openCases}</div>
            <div className="text-xs text-[#0E315C]/60">Open Cases</div>
          </div>
          <div className="w-px h-8 bg-[#C1D9F6]/40"></div>
          <div className="text-center">
            <div className="text-lg font-light text-[#0E315C]">{metrics.needsReview}</div>
            <div className="text-xs text-[#0E315C]/60">Needs Review</div>
          </div>
          <div className="w-px h-8 bg-[#C1D9F6]/40"></div>
          <div className="text-center">
            <div className="text-lg font-light text-[#0E315C]">{metrics.awaitingDocs}</div>
            <div className="text-xs text-[#0E315C]/60">Awaiting Docs</div>
          </div>
          <div className="w-px h-8 bg-[#C1D9F6]/40"></div>
          <div className="text-center">
            <div className="text-lg font-light text-[#0E315C]">{metrics.validationRate}</div>
            <div className="text-xs text-[#0E315C]/60">Validation</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="relative z-10 mb-8 transition-all duration-1000 ease-out delay-700 opacity-100 transform translate-y-0">
        {/* Search Input */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search cases or clients..."
              className="w-full px-4 py-2 pl-10 bg-white/50 backdrop-blur-sm border border-[#C1D9F6]/50 rounded-2xl text-[#0E315C] placeholder-[#0E315C]/50 focus:outline-none focus:ring-2 focus:ring-[#99C0F0]/50 focus:border-[#99C0F0] transition-all text-sm"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#0E315C]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleFilter("needs-review")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 ${
              activeFilters.includes("needs-review")
                ? "bg-[#C5BFEE] text-white shadow-md"
                : "bg-white/40 text-[#0E315C]/70 hover:bg-white/60"
            }`}
          >
            Needs Review
          </button>
          <button
            onClick={() => toggleFilter("awaiting-docs")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 ${
              activeFilters.includes("awaiting-docs")
                ? "bg-[#99C0F0] text-white shadow-md"
                : "bg-white/40 text-[#0E315C]/70 hover:bg-white/60"
            }`}
          >
            Awaiting Docs
          </button>
          <button
            onClick={() => toggleFilter("high-priority")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 ${
              activeFilters.includes("high-priority")
                ? "bg-[#0E315C] text-white shadow-md"
                : "bg-white/40 text-[#0E315C]/70 hover:bg-white/60"
            }`}
          >
            High Priority
          </button>
          {activeFilters.length > 0 && (
            <button
              onClick={() => setActiveFilters([])}
              className="px-2 py-1.5 rounded-xl text-xs font-medium text-[#0E315C]/50 hover:text-[#0E315C] hover:bg-white/40 transition-all"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Cases List */}
      <div className="relative z-10 transition-all duration-1200 ease-out delay-900 opacity-100 transform translate-y-0">
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {filteredCases.map((caseItem, index) => (
            <div
              key={caseItem.caseId}
              className="bg-white/40 backdrop-blur-sm border border-[#C1D9F6]/30 rounded-2xl p-4 hover:bg-white/60 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedCase(caseItem)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Status Colored Dot */}
                  <div className={`w-3 h-3 ${getStatusColor(caseItem.status)} rounded-full shadow-md`}></div>
                  
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-xl flex items-center justify-center text-white font-medium text-sm shadow-md group-hover:scale-110 transition-transform">
                    {caseItem.avatar}
                  </div>
                  
                  {/* Case Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-sm font-medium text-[#0E315C]">{caseItem.name}</h3>
                      <span className="text-xs text-[#0E315C]/50 font-mono">{caseItem.caseId}</span>
                      {caseItem.priority === "high" && (
                        <div className="w-1.5 h-1.5 bg-[#0E315C] rounded-full"></div>
                      )}
                    </div>
                    <div className="text-xs text-[#0E315C]/60 mb-2">
                      {caseItem.progress} • {caseItem.queueTime} • {caseItem.lastActivity}
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-[#C1D9F6]/30 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          caseItem.status === "Needs Review" 
                            ? "bg-[#C5BFEE]" 
                            : caseItem.status === "Complete"
                            ? "bg-[#C1D9F6]"
                            : "bg-[#99C0F0]"
                        }`}
                        style={{ width: `${caseItem.progressPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Right Side Info */}
                <div className="flex items-center space-x-3 text-right">
                  <div className="text-xs text-[#0E315C]/60">
                    <div className="font-medium">{caseItem.progressPercent}%</div>
                    <div>{caseItem.status}</div>
                  </div>
                  <svg className="w-4 h-4 text-[#0E315C]/40 group-hover:text-[#99C0F0] group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}

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
