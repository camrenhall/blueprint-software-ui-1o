import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { X, ArrowLeft, FileText, Clock, Users, CheckCircle2, AlertCircle, Calendar, Mail, MessageSquare, Download, ExternalLink, ChevronDown, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseDetailsNewProps {
  selectedCase: any;
  onBack: () => void;
  inline?: boolean;
}

export default function CaseDetailsNew({
  selectedCase,
  onBack,
  inline = false,
}: CaseDetailsNewProps) {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [showDocumentDownloadDropdown, setShowDocumentDownloadDropdown] = useState(false);
  const [showPageDownloadDropdown, setShowPageDownloadDropdown] = useState(false);
  const [showCommunicationFilter, setShowCommunicationFilter] = useState(false);
  const [communicationFilter, setCommunicationFilter] = useState("Most Recent");

  // Handler functions with useCallback to prevent re-renders
  const handleDownloadAll = useCallback((includeRejected: boolean = false) => {
    try {
      console.log(`Downloading ${includeRejected ? 'all' : 'approved only'} documents`);
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setShowDocumentDownloadDropdown(prev => false);
      setShowPageDownloadDropdown(prev => false);
    }
  }, []);

  const handleFilterCommunications = useCallback((filter: string) => {
    try {
      setCommunicationFilter(prev => filter);
    } catch (error) {
      console.error('Filter error:', error);
    } finally {
      setShowCommunicationFilter(prev => false);
    }
  }, []);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setShowDocumentDownloadDropdown(false);
        setShowPageDownloadDropdown(false);
        setShowCommunicationFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Enhanced mock data for documents with more realistic details
  const documents = [
    {
      name: "2024 Employment Contract",
      type: "Contract",
      size: "2.4 MB",
      uploadDate: "Jun 28, 2025",
      status: "approved",
      description: "Primary employment agreement and terms",
      pages: 12,
    },
    {
      name: "2024 W2",
      type: "Tax Document",
      size: "1.1 MB",
      uploadDate: "Jun 27, 2025",
      status: "approved",
      description: "Annual wage and tax statement",
      pages: 4,
    },
    {
      name: "Medical Records Summary",
      type: "Medical",
      size: "8.7 MB",
      uploadDate: "Jun 25, 2025",
      status: "review",
      description: "Comprehensive medical history and reports",
      pages: 24,
    },
    {
      name: "2024 Insurance Policy",
      type: "Insurance",
      size: "1.8 MB",
      uploadDate: "Jun 24, 2025",
      status: "rejected",
      description: "Health and disability insurance coverage",
      pages: 8,
    },
    {
      name: "2024 Performance Review",
      type: "HR Document",
      size: "0.9 MB",
      uploadDate: "Jun 23, 2025",
      status: "approved",
      description: "Annual performance evaluation",
      pages: 6,
    },
  ];

  const hasRejectedDocuments = documents.some(doc => doc.status === "rejected");

  const recentActivity = [
    {
      type: "document_approval",
      message: "Performance Review approved by legal team",
      time: "2 hours ago",
      importance: "high",
    },
    {
      type: "email",
      message: "Confirmation email sent to client regarding document review completion",
      time: "4 hours ago", 
      importance: "medium",
    },
    {
      type: "document_upload",
      message: "Client uploaded Medical Records Summary for review",
      time: "1 day ago",
      importance: "high",
    },
    {
      type: "status_change",
      message: "Case status updated to Complete",
      time: "1 day ago",
      importance: "high",
    },
    {
      type: "communication",
      message: "Phone consultation completed - 45 minutes",
      time: "2 days ago",
      importance: "medium",
    },
  ];

  const communications = [
    {
      subject: "Case Resolution - Next Steps",
      preview: "Thank you for your patience throughout this process. Your case has been successfully...",
      time: "4 hours ago",
      status: "outgoing",
    },
    {
      subject: "Document Review Follow-up",
      preview: "Please let us know if you have any questions about the document requirements we discussed...",
      time: "1 day ago",
      status: "queued",
    },
    {
      subject: "Additional Information Request",
      preview: "I wanted to provide some additional context regarding my employment situation that may be...",
      time: "2 days ago",
      status: "incoming",
    },
    {
      subject: "Document Upload Confirmation",
      preview: "We've received your medical records. Review in progress, expect update within 24hrs.",
      time: "3 days ago",
      status: "outgoing",
    },
  ];

  // Filter and sort communications based on current filter - memoized to prevent re-renders
  const filteredCommunications = useMemo(() => {
    let filtered = [...communications];

    switch (communicationFilter) {
      case "Queued First":
        return filtered.sort((a, b) => {
          if (a.status === "queued" && b.status !== "queued") return -1;
          if (a.status !== "queued" && b.status === "queued") return 1;
          return 0;
        });
      case "Outbound Only":
        return filtered.filter(comm => comm.status === "outgoing");
      case "Inbound Only":
        return filtered.filter(comm => comm.status === "incoming");
      case "Most Recent":
      default:
        // Sort by most recent (assuming time format allows this simple sort)
        return filtered.sort((a, b) => {
          // Simple time comparison - in real app, you'd convert to dates
          const aTime = a.time.includes("hour") ? 1 : a.time.includes("day") ? parseInt(a.time) : 100;
          const bTime = b.time.includes("hour") ? 1 : b.time.includes("day") ? parseInt(b.time) : 100;
          return aTime - bTime;
        });
    }
  }, [communicationFilter]);

  const caseStats = {
    timeInQueue: selectedCase.daysInQueue ? `${selectedCase.daysInQueue} Days` : "16 Days",
    avgResponseTime: "2.3 hours",
    totalDocuments: documents.length,
    approvedDocuments: documents.filter((doc) => doc.status === "approved").length,
    reviewDocuments: documents.filter((doc) => doc.status === "review").length,
    rejectedDocuments: documents.filter((doc) => doc.status === "rejected").length,
    caseType: selectedCase.caseType || "Employment",
    dateCompleted: selectedCase.dateCompleted || "Jun 28, 2025",
    tasksComplete: selectedCase.tasksComplete || "7",
  };

  const progressPercent = selectedCase.status === "Complete" ? 100 : 85;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "complete":
        return "bg-[#99C0F0]/30 text-[#0E315C] border-[#99C0F0]/40";
      case "rejected":
        return "bg-[#C5BFEE]/30 text-[#0E315C] border-[#C5BFEE]/40";
      case "review":
      case "needs review":
        return "bg-[#C5BFEE]/30 text-[#0E315C] border-[#C5BFEE]/40";
      case "pending":
      case "awaiting documents":
        return "bg-amber-500/20 text-amber-700 border-amber-500/30";
      default:
        return "bg-white/20 text-[#0E315C]/70 border-white/30";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "document_upload":
      case "document_approval":
        return <FileText className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
      case "communication":
      case "phone":
        return <MessageSquare className="w-4 h-4" />;
      case "status_change":
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getCommunicationStatusColor = (status: string) => {
    switch (status) {
      case "incoming":
        return "bg-[#C5BFEE]/30 text-[#0E315C] border-[#C5BFEE]/40";
      case "outgoing":
        return "bg-[#99C0F0]/30 text-[#0E315C] border-[#99C0F0]/40";
      case "queued":
        return "bg-[#C5BFEE]/30 text-[#0E315C] border-[#C5BFEE]/40";
      default:
        return "bg-white/20 text-[#0E315C]/70 border-white/30";
    }
  };


  // Define content sections styling based on inline mode - consistent glassmorphism design
  const sectionClasses = cn(
    "rounded-2xl p-5 transition-all duration-300",
    inline
      ? "bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40 hover:bg-white/50 hover:shadow-lg hover:scale-[1.01] transform"
      : "bg-white/20 backdrop-blur-xl shadow-xl border border-white/20 hover:shadow-2xl"
  );

  if (selectedDocument) {
    const doc = documents.find(d => d.name === selectedDocument);
    
    const DocumentViewer = () => (
      <>
        {/* Document Header */}
        <div className={cn(
          "p-4 flex-shrink-0",
          inline ? "mb-4" : "bg-white/10 backdrop-blur-xl border-b border-white/20 rounded-t-3xl"
        )}>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedDocument(null)}
              className="flex items-center space-x-3 text-[#0E315C]/70 hover:text-[#0E315C] transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-light">Back to Case Details</span>
            </button>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 bg-[#99C0F0]/20 hover:bg-[#99C0F0]/30 text-[#0E315C] px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105">
                <Download className="w-4 h-4" />
                <span className="font-light text-sm">Download</span>
              </button>
              <button className="flex items-center space-x-2 bg-[#C5BFEE]/20 hover:bg-[#C5BFEE]/30 text-[#0E315C] px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105">
                <ExternalLink className="w-4 h-4" />
                <span className="font-light text-sm">Open External</span>
              </button>
            </div>
          </div>
        </div>

        {/* Document Content */}
        <div className="flex-1 overflow-y-auto min-h-0 p-8 flex items-center justify-center">
          <div className={cn(
            "rounded-3xl p-12 text-center max-w-lg",
            inline 
              ? "bg-white/40 backdrop-blur-md shadow-lg border border-[#C1D9F6]/40" 
              : "bg-white/20 backdrop-blur-xl shadow-2xl border border-white/20"
          )}>
            <div className="w-20 h-20 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-light text-[#0E315C] mb-4">{doc?.name}</h2>
            <p className="text-[#0E315C]/70 mb-6 font-light">{doc?.description}</p>
            <div className="space-y-3 text-sm text-[#0E315C]/60 font-light">
              <div className="flex justify-between">
                <span>File Size:</span>
                <span>{doc?.size}</span>
              </div>
              <div className="flex justify-between">
                <span>Pages:</span>
                <span>{doc?.pages}</span>
              </div>
              <div className="flex justify-between">
                <span>Uploaded:</span>
                <span>{doc?.uploadDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className={cn(
                  "px-2 py-1 rounded-lg text-xs font-medium border capitalize",
                  getStatusColor(doc?.status || "")
                )}>
                  {doc?.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );

    if (inline) {
      return (
        <div className="animate-fadeIn h-full p-6">
          <div className="h-full max-h-full flex flex-col overflow-hidden">
            <DocumentViewer />
          </div>
        </div>
      );
    } else {
      return (
        <div className="fixed top-20 right-6 bottom-6 left-96 z-50 p-6">
          <div className="w-full h-full relative rounded-3xl shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-[#C1D9F6]/15 to-white/20 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#99C0F0]/10 via-transparent to-[#C5BFEE]/10 rounded-3xl" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-white/5 to-transparent" />
            <div className="h-full max-h-full flex flex-col overflow-hidden rounded-3xl">
              <DocumentViewer />
            </div>
          </div>
        </div>
      );
    }
  }

  const CaseDetailsContent = () => (
    <>
      {/* Compact Header */}
      <div className={cn(
        "p-4 flex-shrink-0",
        inline ? "mb-4" : "bg-white/10 backdrop-blur-xl border-b border-white/20 rounded-t-3xl"
      )}>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="flex items-center space-x-3 text-[#0E315C]/70 hover:text-[#0E315C] transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-light text-sm">Back to Review</span>
          </button>
          <div className="flex items-center space-x-3">
            <div className="relative dropdown-container">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                  hasRejectedDocuments ? setShowPageDownloadDropdown(prev => !prev) : handleDownloadAll(false);
                }}
                className="flex items-center space-x-2 bg-slate-100/40 hover:bg-slate-200/50 text-[#0E315C] px-3 py-2 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-light">Download All</span>
                {hasRejectedDocuments && <ChevronDown className="w-3 h-3" />}
              </button>
              {showPageDownloadDropdown && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 py-2 z-50">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      handleDownloadAll(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-[#0E315C] hover:bg-[#99C0F0]/20 transition-colors"
                  >
                    Download Approved Only
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      handleDownloadAll(true);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-[#0E315C] hover:bg-[#99C0F0]/20 transition-colors"
                  >
                    Download All Documents
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={onBack}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#0E315C]/50 hover:text-[#0E315C] hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Compact Case Header */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-2xl flex items-center justify-center text-white font-light text-sm shadow-lg shadow-[#99C0F0]/20">
            {selectedCase.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-1">
              <h1 className="text-xl font-light text-[#0E315C]">{selectedCase.name}</h1>
              <span className="text-[#0E315C]/60 font-light font-mono text-xs">{selectedCase.caseId}</span>
              <span className={cn(
                "px-2 py-1 rounded-lg text-xs font-light border capitalize",
                getStatusColor(selectedCase.status?.toLowerCase() || "")
              )}>
                {selectedCase.status}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-xs text-[#0E315C]/60 font-light">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>Completed: {caseStats.dateCompleted}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>Queue: {caseStats.timeInQueue}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable with proper height containment */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="px-6 pt-3 pb-2">
          <div className="space-y-4">
            {/* Row 1: Case Progress - Full Width */}
            <div className={cn(
              "rounded-2xl p-4 transition-all duration-300",
              inline
                ? "bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40 hover:bg-white/50 hover:shadow-lg hover:scale-[1.01] transform"
                : "bg-white/20 backdrop-blur-xl shadow-xl border border-white/20 hover:shadow-2xl"
            )}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#99C0F0]" />
                  <h3 className="text-lg font-light text-[#0E315C]">Case Progress</h3>
                  <span className="text-sm text-[#0E315C]/60 font-light">Documents: {caseStats.approvedDocuments}/{caseStats.totalDocuments} Approved</span>
                </div>
                <span className="text-2xl font-light text-[#0E315C]">{progressPercent}%</span>
              </div>

              <div className="w-full h-2 bg-[#C1D9F6]/20 backdrop-blur-sm rounded-full overflow-hidden mb-3 border border-[#C1D9F6]/30">
                <div
                  className="h-full bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] rounded-full transition-all duration-1000 shadow-lg backdrop-blur-sm relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                </div>
              </div>

              {/* Most Recent Activity - Inline */}
              <div className="border-t border-[#C1D9F6]/20 pt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[#0E315C]/50 font-light">Most Recent Activity:</span>
                  <span className="text-[#0E315C]/50 font-light text-xs">{recentActivity[0]?.time}</span>
                </div>
                <p className="text-sm text-[#0E315C] font-light">{recentActivity[0]?.message}</p>
              </div>
            </div>

            {/* Row 2: Documents and Communications - Equal Width */}
            <div className="grid grid-cols-2 gap-6">
              {/* Documents Section */}
              <div className={sectionClasses}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-light text-[#0E315C] flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-[#99C0F0]" />
                    <span>Documents</span>
                  </h3>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-[#0E315C]/60 font-light">{documents.length} files</span>
                    <div className="relative dropdown-container">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                          hasRejectedDocuments ? setShowDocumentDownloadDropdown(prev => !prev) : handleDownloadAll(false);
                        }}
                        className="flex items-center space-x-2 bg-slate-100/40 hover:bg-slate-200/50 text-[#0E315C] p-2 rounded-xl transition-all duration-300 hover:scale-105"
                      >
                        <Download className="w-4 h-4" />
                        {hasRejectedDocuments && <ChevronDown className="w-3 h-3" />}
                      </button>
                      {showDocumentDownloadDropdown && (
                        <div className="absolute top-full right-0 mt-2 w-56 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 py-2 z-50">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              e.nativeEvent.stopImmediatePropagation();
                              handleDownloadAll(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-[#0E315C] hover:bg-[#99C0F0]/20 transition-colors"
                          >
                            Download Approved Only
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              e.nativeEvent.stopImmediatePropagation();
                              handleDownloadAll(true);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-[#0E315C] hover:bg-[#99C0F0]/20 transition-colors"
                          >
                            Download All Documents
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {documents.map((doc, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedDocument(doc.name)}
                      className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.01] border border-white/20 hover:border-white/30 shadow-sm hover:shadow-lg min-w-0"
                    >
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#99C0F0]/20 to-[#C5BFEE]/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm border border-white/20 flex-shrink-0">
                          <FileText className="w-5 h-5 text-[#0E315C]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-[#0E315C] text-sm truncate">{doc.name}</div>
                          <div className="text-xs text-[#0E315C]/60 font-light mt-1">{doc.uploadDate}</div>
                        </div>
                      </div>
                      <span className={cn(
                        "px-2 py-1 rounded-lg text-xs font-medium border capitalize flex-shrink-0",
                        getStatusColor(doc.status)
                      )}>
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Communications */}
              <div className={sectionClasses}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-light text-[#0E315C] flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-[#C5BFEE]" />
                    <span>Communications</span>
                  </h3>
                  <div className="relative dropdown-container">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.nativeEvent.stopImmediatePropagation();
                        setShowCommunicationFilter(prev => !prev);
                      }}
                      className="flex items-center space-x-2 bg-slate-100/40 hover:bg-slate-200/50 text-[#0E315C] p-2 rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      <Filter className="w-4 h-4" />
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    {showCommunicationFilter && (
                      <div className="absolute top-full right-0 mt-2 w-40 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 py-2 z-50">
                        {["Most Recent", "Queued First", "Outbound Only", "Inbound Only"].map((filter) => (
                          <button
                            key={filter}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              e.nativeEvent.stopImmediatePropagation();
                              handleFilterCommunications(filter);
                            }}
                            className={cn(
                              "w-full text-left px-4 py-2 text-sm transition-colors",
                              communicationFilter === filter
                                ? "bg-[#C5BFEE]/30 text-[#0E315C] font-medium"
                                : "text-[#0E315C] hover:bg-[#C5BFEE]/20"
                            )}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {filteredCommunications.map((comm, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 cursor-pointer hover:scale-[1.01] transform shadow-sm hover:shadow-lg min-w-0"
                    >
                      <div className="flex items-start space-x-3 min-w-0 flex-1 mr-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#99C0F0]/20 to-[#C5BFEE]/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm border border-white/20 flex-shrink-0">
                          <Mail className="w-5 h-5 text-[#0E315C]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-[#0E315C] mb-1 truncate">{comm.subject}</p>
                          <div className="text-xs text-[#0E315C]/50 font-light mb-1">{comm.time}</div>
                          <p className="text-xs text-[#0E315C]/60 font-light line-clamp-2">{comm.preview}</p>
                        </div>
                      </div>
                      <span className={cn(
                        "px-2 py-1 rounded-lg text-xs font-medium border capitalize flex-shrink-0",
                        getCommunicationStatusColor(comm.status)
                      )}>
                        {comm.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );

  if (inline) {
    return (
      <div className="animate-fadeIn h-full p-6">
        <div className="h-full max-h-full flex flex-col overflow-hidden">
          <CaseDetailsContent />
        </div>
      </div>
    );
  } else {
    return (
      <div className="animate-fadeIn fixed top-20 right-6 bottom-6 left-96 z-50 p-6">
        <div className="w-full h-full relative rounded-3xl shadow-2xl">
          {/* Glass morphism background layers - matching site design */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-[#C1D9F6]/15 to-white/20 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#99C0F0]/10 via-transparent to-[#C5BFEE]/10 rounded-3xl" />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-white/5 to-transparent" />
          <div className="relative h-full max-h-full flex flex-col overflow-hidden rounded-3xl">
            <CaseDetailsContent />
          </div>
        </div>
      </div>
    );
  }
}
