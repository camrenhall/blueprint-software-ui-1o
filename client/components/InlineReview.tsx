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

      {/* Elegant Metrics Overview */}
      <div className="relative z-10 mb-14 transition-all duration-800 ease-out delay-500 opacity-100 transform translate-y-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group bg-white/50 backdrop-blur-md border border-[#C1D9F6]/30 rounded-3xl p-6 text-center hover:bg-white/70 hover:shadow-xl hover:shadow-[#C1D9F6]/10 hover:scale-105 transition-all duration-500">
            <div className="w-12 h-12 bg-gradient-to-br from-[#C1D9F6]/30 to-[#99C0F0]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-[#0E315C]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="text-3xl font-extralight text-[#0E315C] mb-2">{metrics.openCases}</div>
            <div className="text-xs font-medium text-[#0E315C]/50 uppercase tracking-widest">Open Cases</div>
          </div>

          <div className="group bg-white/50 backdrop-blur-md border border-[#C5BFEE]/30 rounded-3xl p-6 text-center hover:bg-white/70 hover:shadow-xl hover:shadow-[#C5BFEE]/10 hover:scale-105 transition-all duration-500">
            <div className="w-12 h-12 bg-gradient-to-br from-[#C5BFEE]/40 to-[#C1D9F6]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-[#0E315C]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div className="text-3xl font-extralight text-[#0E315C] mb-2">{metrics.needsReview}</div>
            <div className="text-xs font-medium text-[#0E315C]/50 uppercase tracking-widest">Needs Review</div>
          </div>

          <div className="group bg-white/50 backdrop-blur-md border border-[#99C0F0]/30 rounded-3xl p-6 text-center hover:bg-white/70 hover:shadow-xl hover:shadow-[#99C0F0]/10 hover:scale-105 transition-all duration-500">
            <div className="w-12 h-12 bg-gradient-to-br from-[#99C0F0]/40 to-[#C5BFEE]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-[#0E315C]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-3xl font-extralight text-[#0E315C] mb-2">{metrics.awaitingDocs}</div>
            <div className="text-xs font-medium text-[#0E315C]/50 uppercase tracking-widest">Awaiting Docs</div>
          </div>

          <div className="group bg-white/50 backdrop-blur-md border border-[#C1D9F6]/30 rounded-3xl p-6 text-center hover:bg-white/70 hover:shadow-xl hover:shadow-[#C1D9F6]/10 hover:scale-105 transition-all duration-500">
            <div className="w-12 h-12 bg-gradient-to-br from-[#C1D9F6]/30 to-[#C5BFEE]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-[#0E315C]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl font-extralight text-[#0E315C] mb-2">{metrics.validationRate}</div>
            <div className="text-xs font-medium text-[#0E315C]/50 uppercase tracking-widest">Validation</div>
          </div>
        </div>
      </div>

      {/* Refined Search and Filters */}
      <div className="relative z-10 mb-10 transition-all duration-1000 ease-out delay-700 opacity-100 transform translate-y-0">
        {/* Elegant Search Input */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search cases or clients..."
              className="w-full px-6 py-4 pl-14 bg-white/60 backdrop-blur-md border border-[#C1D9F6]/40 rounded-3xl text-[#0E315C] placeholder-[#0E315C]/40 focus:outline-none focus:ring-2 focus:ring-[#99C0F0]/30 focus:border-[#99C0F0]/60 focus:bg-white/80 transition-all duration-300 shadow-lg shadow-[#C1D9F6]/5"
            />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-[#99C0F0]/20 to-[#C5BFEE]/20 rounded-xl flex items-center justify-center">
              <svg className="w-4 h-4 text-[#0E315C]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchValue && (
              <button
                onClick={() => setSearchValue("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#0E315C]/10 hover:bg-[#0E315C]/20 rounded-full flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-3 h-3 text-[#0E315C]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Sophisticated Filter Pills */}
        <div className="flex items-center justify-center space-x-4 flex-wrap gap-3">
          <button
            onClick={() => toggleFilter("needs-review")}
            className={`group px-6 py-3 rounded-2xl text-sm font-light transition-all duration-500 hover:scale-105 ${
              activeFilters.includes("needs-review")
                ? "bg-gradient-to-r from-[#C5BFEE] to-[#C1D9F6] text-white shadow-xl shadow-[#C5BFEE]/20"
                : "bg-white/50 backdrop-blur-sm text-[#0E315C]/70 hover:bg-white/70 hover:shadow-lg border border-[#C5BFEE]/30"
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full transition-all ${activeFilters.includes("needs-review") ? "bg-white/80" : "bg-[#C5BFEE]/60"}`} />
              <span>Needs Review</span>
            </div>
          </button>

          <button
            onClick={() => toggleFilter("awaiting-docs")}
            className={`group px-6 py-3 rounded-2xl text-sm font-light transition-all duration-500 hover:scale-105 ${
              activeFilters.includes("awaiting-docs")
                ? "bg-gradient-to-r from-[#99C0F0] to-[#C1D9F6] text-white shadow-xl shadow-[#99C0F0]/20"
                : "bg-white/50 backdrop-blur-sm text-[#0E315C]/70 hover:bg-white/70 hover:shadow-lg border border-[#99C0F0]/30"
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full transition-all ${activeFilters.includes("awaiting-docs") ? "bg-white/80" : "bg-[#99C0F0]/60"}`} />
              <span>Awaiting Docs</span>
            </div>
          </button>

          <button
            onClick={() => toggleFilter("high-priority")}
            className={`group px-6 py-3 rounded-2xl text-sm font-light transition-all duration-500 hover:scale-105 ${
              activeFilters.includes("high-priority")
                ? "bg-gradient-to-r from-[#0E315C] to-[#99C0F0] text-white shadow-xl shadow-[#0E315C]/20"
                : "bg-white/50 backdrop-blur-sm text-[#0E315C]/70 hover:bg-white/70 hover:shadow-lg border border-[#0E315C]/30"
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full transition-all ${activeFilters.includes("high-priority") ? "bg-white/80" : "bg-[#0E315C]/60"}`} />
              <span>High Priority</span>
            </div>
          </button>

          {activeFilters.length > 0 && (
            <button
              onClick={() => setActiveFilters([])}
              className="px-4 py-3 rounded-2xl text-sm font-light text-[#0E315C]/50 hover:text-[#0E315C] hover:bg-white/50 transition-all duration-300 border border-[#0E315C]/20 hover:border-[#0E315C]/40"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Sophisticated Cases List */}
      <div className="relative z-10 transition-all duration-1200 ease-out delay-900 opacity-100 transform translate-y-0">
        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredCases.map((caseItem, index) => {
            const statusInfo = getStatusIndicator(caseItem.status);
            return (
              <div
                key={caseItem.caseId}
                className="group bg-white/60 backdrop-blur-md border border-[#C1D9F6]/20 rounded-3xl p-8 hover:bg-white/80 hover:shadow-2xl hover:shadow-[#99C0F0]/5 hover:scale-[1.02] hover:border-[#99C0F0]/40 transition-all duration-500 cursor-pointer relative overflow-hidden"
                onClick={() => setSelectedCase(caseItem)}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards"
                }}
              >
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C1D9F6]/5 to-[#99C0F0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    {/* Enhanced Avatar */}
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#99C0F0] via-[#C5BFEE] to-[#C1D9F6] rounded-2xl flex items-center justify-center text-white font-light text-lg shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        {caseItem.avatar}
                      </div>
                      {caseItem.priority === "high" && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#0E315C] rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>

                    {/* Refined Case Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <h3 className="text-xl font-light text-[#0E315C] group-hover:text-[#0E315C] transition-colors">{caseItem.name}</h3>
                        <span className="text-sm text-[#0E315C]/50 font-mono bg-[#C1D9F6]/20 px-2 py-1 rounded-lg">{caseItem.caseId}</span>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-[#0E315C]/60 font-light">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-[#99C0F0]/60 rounded-full" />
                          <span>{caseItem.progress}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-[#C5BFEE]/60 rounded-full" />
                          <span>{caseItem.queueTime} in queue</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-[#C1D9F6]/60 rounded-full" />
                          <span>Updated {caseItem.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Status and Actions */}
                  <div className="flex items-center space-x-6">
                    {/* Elegant Status Badge */}
                    <div className={`px-4 py-2 rounded-2xl text-sm font-light backdrop-blur-sm ${statusInfo.textColor} ${statusInfo.bgColor} border border-current/30 shadow-lg`}>
                      {caseItem.status}
                    </div>

                    {/* Enhanced Progress Ring */}
                    <div className="relative w-12 h-12 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                        <circle
                          cx="24"
                          cy="24"
                          r="18"
                          fill="none"
                          stroke="#C1D9F6"
                          strokeWidth="2"
                          opacity="0.3"
                        />
                        <circle
                          cx="24"
                          cy="24"
                          r="18"
                          fill="none"
                          stroke="url(#progressGradient)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 18}`}
                          strokeDashoffset={`${2 * Math.PI * 18 * (1 - caseItem.progressPercent / 100)}`}
                          className="transition-all duration-700"
                        />
                        <defs>
                          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#99C0F0" />
                            <stop offset="100%" stopColor="#C5BFEE" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-light text-[#0E315C]">
                        {caseItem.progressPercent}%
                      </div>
                    </div>

                    {/* Refined Arrow */}
                    <div className="w-10 h-10 bg-white/40 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-[#99C0F0]/20 transition-all duration-300">
                      <svg className="w-5 h-5 text-[#0E315C]/50 group-hover:text-[#99C0F0] group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
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
