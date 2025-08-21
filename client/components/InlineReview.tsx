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
    <div className="h-full overflow-y-auto px-10 py-12 relative">
      {/* Sophisticated Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-[#C1D9F6]/20 to-[#99C0F0]/15 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-radial from-[#C5BFEE]/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 right-20 w-2 h-2 bg-[#99C0F0]/40 rounded-full animate-pulse" />
      <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-[#C5BFEE]/50 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/3 right-12 w-1 h-1 bg-[#C1D9F6]/60 rounded-full animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Elegant Header */}
      <div className="relative z-10 text-center mb-12">
        <div className="transition-all duration-1000 ease-out delay-300 opacity-100 transform translate-y-0">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-[#99C0F0]/20 to-[#C5BFEE]/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-4 h-4 text-[#0E315C]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h1 className="text-5xl font-extralight text-[#0E315C] tracking-wide">Case Review</h1>
          </div>
          <p className="text-[#0E315C]/60 text-lg leading-relaxed font-light max-w-md mx-auto">Monitor active cases and prioritize actions with intelligent insights</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-0 right-0 w-12 h-12 rounded-2xl flex items-center justify-center text-[#0E315C]/40 hover:text-[#0E315C] hover:bg-white/40 transition-all duration-300 hover:scale-110 backdrop-blur-sm group"
          >
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Metrics Overview */}
      <div className="relative z-10 mb-10 transition-all duration-800 ease-out delay-500 opacity-100 transform translate-y-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/40 backdrop-blur-sm border border-[#C1D9F6]/40 rounded-2xl p-4 text-center">
            <div className="text-2xl font-light text-[#0E315C] mb-1">{metrics.openCases}</div>
            <div className="text-xs font-medium text-[#0E315C]/60 uppercase tracking-wider">Open Cases</div>
          </div>
          <div className="bg-white/40 backdrop-blur-sm border border-[#C5BFEE]/40 rounded-2xl p-4 text-center">
            <div className="text-2xl font-light text-[#0E315C] mb-1">{metrics.needsReview}</div>
            <div className="text-xs font-medium text-[#0E315C]/60 uppercase tracking-wider">Needs Review</div>
          </div>
          <div className="bg-white/40 backdrop-blur-sm border border-[#99C0F0]/40 rounded-2xl p-4 text-center">
            <div className="text-2xl font-light text-[#0E315C] mb-1">{metrics.awaitingDocs}</div>
            <div className="text-xs font-medium text-[#0E315C]/60 uppercase tracking-wider">Awaiting Docs</div>
          </div>
          <div className="bg-white/40 backdrop-blur-sm border border-[#C1D9F6]/40 rounded-2xl p-4 text-center">
            <div className="text-2xl font-light text-[#0E315C] mb-1">{metrics.validationRate}</div>
            <div className="text-xs font-medium text-[#0E315C]/60 uppercase tracking-wider">Validation</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="relative z-10 mb-8 transition-all duration-1000 ease-out delay-700 opacity-100 transform translate-y-0">
        <div className="flex items-center space-x-4 mb-6">
          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search cases or clients..."
              className="w-full px-4 py-3 pl-11 bg-white/50 backdrop-blur-sm border border-[#C1D9F6]/50 rounded-2xl text-[#0E315C] placeholder-[#0E315C]/50 focus:outline-none focus:ring-2 focus:ring-[#99C0F0]/50 focus:border-[#99C0F0] transition-all"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#0E315C]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => toggleFilter("needs-review")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeFilters.includes("needs-review")
                ? "bg-[#C5BFEE] text-white shadow-lg"
                : "bg-white/40 text-[#0E315C]/70 hover:bg-white/60"
            }`}
          >
            Needs Review
          </button>
          <button
            onClick={() => toggleFilter("awaiting-docs")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeFilters.includes("awaiting-docs")
                ? "bg-[#99C0F0] text-white shadow-lg"
                : "bg-white/40 text-[#0E315C]/70 hover:bg-white/60"
            }`}
          >
            Awaiting Docs
          </button>
          <button
            onClick={() => toggleFilter("high-priority")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeFilters.includes("high-priority")
                ? "bg-[#0E315C] text-white shadow-lg"
                : "bg-white/40 text-[#0E315C]/70 hover:bg-white/60"
            }`}
          >
            High Priority
          </button>
          {activeFilters.length > 0 && (
            <button
              onClick={() => setActiveFilters([])}
              className="px-3 py-2 rounded-xl text-sm font-medium text-[#0E315C]/60 hover:text-[#0E315C] hover:bg-white/40 transition-all"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Cases List */}
      <div className="relative z-10 transition-all duration-1200 ease-out delay-900 opacity-100 transform translate-y-0">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredCases.map((caseItem, index) => {
            const statusInfo = getStatusIndicator(caseItem.status);
            return (
              <div
                key={caseItem.caseId}
                className="bg-white/40 backdrop-blur-sm border border-[#C1D9F6]/30 rounded-2xl p-6 hover:bg-white/60 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedCase(caseItem)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-xl flex items-center justify-center text-white font-medium shadow-lg group-hover:scale-110 transition-transform">
                      {caseItem.avatar}
                    </div>
                    
                    {/* Case Info */}
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-lg font-medium text-[#0E315C]">{caseItem.name}</h3>
                        <span className="text-sm text-[#0E315C]/60 font-mono">{caseItem.caseId}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-[#0E315C]/70">
                        <span>{caseItem.progress}</span>
                        <span>•</span>
                        <span>{caseItem.queueTime} in queue</span>
                        <span>•</span>
                        <span>Updated {caseItem.lastActivity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex items-center space-x-4">
                    {/* Priority Indicator */}
                    {caseItem.priority === "high" && (
                      <div className="w-2 h-2 bg-[#0E315C] rounded-full"></div>
                    )}
                    
                    {/* Status Badge */}
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.textColor} ${statusInfo.bgColor} border border-current/20`}>
                      {caseItem.status}
                    </div>

                    {/* Progress Ring */}
                    <div className="relative w-8 h-8">
                      <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                        <circle
                          cx="16"
                          cy="16"
                          r="12"
                          fill="none"
                          stroke="#C1D9F6"
                          strokeWidth="2"
                        />
                        <circle
                          cx="16"
                          cy="16"
                          r="12"
                          fill="none"
                          stroke="#99C0F0"
                          strokeWidth="2"
                          strokeDasharray={`${2 * Math.PI * 12}`}
                          strokeDashoffset={`${2 * Math.PI * 12 * (1 - caseItem.progressPercent / 100)}`}
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-[#0E315C]">
                        {caseItem.progressPercent}%
                      </div>
                    </div>

                    {/* Arrow */}
                    <svg className="w-5 h-5 text-[#0E315C]/40 group-hover:text-[#99C0F0] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredCases.length === 0 && (
            <div className="text-center py-12 text-[#0E315C]/60">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-sm">No cases match your current filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Selected Case Modal/Detail View would go here */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setSelectedCase(null)}>
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 max-w-md mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                {selectedCase.avatar}
              </div>
              <h3 className="text-2xl font-light text-[#0E315C] mb-2">{selectedCase.name}</h3>
              <p className="text-[#0E315C]/60 mb-6">{selectedCase.caseId}</p>
              <button
                onClick={() => setSelectedCase(null)}
                className="bg-[#99C0F0] hover:bg-[#0E315C] text-white px-6 py-3 rounded-xl transition-all"
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
