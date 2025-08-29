import React, { useState } from "react";
import { X, ArrowLeft, FileText, Clock, Users, CheckCircle2, AlertCircle, Calendar, Mail, MessageSquare, Download, ExternalLink } from "lucide-react";
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

  // Enhanced mock data for documents with more realistic details
  const documents = [
    {
      name: "Employment_Contract_2024.pdf",
      type: "Contract",
      size: "2.4 MB",
      uploadDate: "Jun 28, 2025",
      status: "approved",
      description: "Primary employment agreement and terms",
      pages: 12,
    },
    {
      name: "W2_Tax_Form_2024.pdf", 
      type: "Tax Document",
      size: "1.1 MB",
      uploadDate: "Jun 27, 2025",
      status: "approved",
      description: "Annual wage and tax statement",
      pages: 4,
    },
    {
      name: "Medical_Records_Summary.pdf",
      type: "Medical",
      size: "8.7 MB",
      uploadDate: "Jun 25, 2025",
      status: "review",
      description: "Comprehensive medical history and reports",
      pages: 24,
    },
    {
      name: "Insurance_Policy_Details.pdf",
      type: "Insurance",
      size: "1.8 MB", 
      uploadDate: "Jun 24, 2025",
      status: "approved",
      description: "Health and disability insurance coverage",
      pages: 8,
    },
    {
      name: "Performance_Review_2024.pdf",
      type: "HR Document",
      size: "0.9 MB",
      uploadDate: "Jun 23, 2025", 
      status: "approved",
      description: "Annual performance evaluation",
      pages: 6,
    },
  ];

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
      type: "email",
      subject: "Case Resolution - Next Steps",
      preview: "Thank you for your patience throughout this process. Your case has been successfully...",
      time: "4 hours ago",
      status: "sent",
      recipient: "amanda.johnson@email.com",
    },
    {
      type: "phone",
      subject: "Document Review Call",
      preview: "45-minute consultation regarding final document requirements and timeline...",
      time: "2 days ago",
      status: "completed",
      recipient: "(555) 123-4567",
    },
    {
      type: "sms",
      subject: "Document Upload Confirmation",
      preview: "We've received your medical records. Review in progress, expect update within 24hrs.",
      time: "3 days ago",
      status: "delivered",
      recipient: "(555) 123-4567",
    },
  ];

  const caseStats = {
    timeInQueue: selectedCase.daysInQueue ? `${selectedCase.daysInQueue} Days` : "16 Days",
    avgResponseTime: "2.3 hours",
    totalDocuments: documents.length,
    approvedDocuments: documents.filter((doc) => doc.status === "approved").length,
    reviewDocuments: documents.filter((doc) => doc.status === "review").length,
    caseType: selectedCase.caseType || "Employment",
    dateCompleted: selectedCase.dateCompleted || "Jun 28, 2025",
    tasksComplete: selectedCase.tasksComplete || "7",
  };

  const progressPercent = selectedCase.status === "Complete" ? 100 : 85;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "complete":
        return "bg-emerald-500/20 text-emerald-700 border-emerald-500/30";
      case "review":
      case "needs review":
        return "bg-[#C5BFEE]/30 text-[#0E315C] border-[#C5BFEE]/40";
      case "pending":
      case "awaiting documents":
        return "bg-[#99C0F0]/30 text-[#0E315C] border-[#99C0F0]/40";
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

  const getCommunicationIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="w-4 h-4" />;
      case "phone":
        return <MessageSquare className="w-4 h-4" />;
      case "sms":
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  // Define content sections styling based on inline mode
  const sectionClasses = cn(
    "rounded-3xl p-5 transition-all duration-300",
    inline 
      ? "bg-white/30 backdrop-blur-md shadow-lg border border-[#C1D9F6]/40 hover:bg-white/40 hover:shadow-xl" 
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
        "p-4 flex-shrink-0 animate-slideInLeft",
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
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#0E315C]/50 hover:text-[#0E315C] hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <X className="w-4 h-4" />
          </button>
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
        <div className="p-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Main Content */}
            <div className="col-span-8 space-y-5">
              {/* Case Progress */}
              <div className={sectionClasses}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-light text-[#0E315C] flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span>Case Progress</span>
                  </h3>
                  <span className="text-2xl font-light text-[#0E315C]">{progressPercent}%</span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-[#0E315C]/60 mb-3 font-light">
                    <span>Tasks: {caseStats.tasksComplete} Complete</span>
                    <span>Documents: {caseStats.approvedDocuments}/{caseStats.totalDocuments} Approved</span>
                  </div>
                  <div className="w-full h-2 bg-[#C1D9F6]/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-1000 shadow-lg"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="text-center p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                    <div className="text-lg font-light text-emerald-700 mb-1">{caseStats.approvedDocuments}</div>
                    <div className="text-xs text-emerald-700/70 font-light">Approved</div>
                  </div>
                  <div className="text-center p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                    <div className="text-lg font-light text-purple-700 mb-1">{caseStats.reviewDocuments}</div>
                    <div className="text-xs text-purple-700/70 font-light">In Review</div>
                  </div>
                  <div className="text-center p-3 bg-[#99C0F0]/20 rounded-xl border border-[#99C0F0]/30">
                    <div className="text-lg font-light text-[#0E315C] mb-1">{caseStats.timeInQueue}</div>
                    <div className="text-xs text-[#0E315C]/70 font-light">Total Time</div>
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div className={sectionClasses}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-light text-[#0E315C] flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-[#99C0F0]" />
                    <span>Documents</span>
                  </h3>
                  <span className="text-sm text-[#0E315C]/60 font-light">{documents.length} files</span>
                </div>
                
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {documents.map((doc, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedDocument(doc.name)}
                      className="flex items-center justify-between p-3 bg-[#C1D9F6]/10 hover:bg-[#C1D9F6]/20 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 border border-[#C1D9F6]/20"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#99C0F0]/20 to-[#C5BFEE]/20 rounded-xl flex items-center justify-center">
                          <FileText className="w-5 h-5 text-[#0E315C]" />
                        </div>
                        <div>
                          <div className="font-medium text-[#0E315C] text-sm">{doc.name}</div>
                          <div className="text-xs text-[#0E315C]/60 font-light">{doc.description}</div>
                          <div className="flex items-center space-x-3 text-xs text-[#0E315C]/50 font-light mt-1">
                            <span>{doc.size}</span>
                            <span>{doc.pages} pages</span>
                            <span>{doc.uploadDate}</span>
                          </div>
                        </div>
                      </div>
                      <span className={cn(
                        "px-2 py-1 rounded-lg text-xs font-medium border capitalize",
                        getStatusColor(doc.status)
                      )}>
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className={sectionClasses}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-light text-[#0E315C] flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-[#C5BFEE]" />
                    <span>Recent Activity</span>
                  </h3>
                  <span className="text-sm text-[#0E315C]/60 font-light">{recentActivity.length} updates</span>
                </div>
                
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-[#C5BFEE]/10 rounded-xl border border-[#C5BFEE]/20"
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0",
                        activity.importance === "high" 
                          ? "bg-gradient-to-br from-red-500/20 to-pink-500/20 text-red-600"
                          : "bg-gradient-to-br from-[#99C0F0]/20 to-[#C5BFEE]/20 text-[#0E315C]"
                      )}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#0E315C] mb-1">{activity.message}</p>
                        <p className="text-xs text-[#0E315C]/60 font-light">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="col-span-4 space-y-5">
              {/* Case Overview */}
              <div className={sectionClasses}>
                <h3 className="text-lg font-light text-[#0E315C] mb-4 flex items-center space-x-3">
                  <Users className="w-5 h-5 text-[#99C0F0]" />
                  <span>Case Overview</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#0E315C]/60 font-light">Case Type</span>
                    <span className="text-sm font-medium text-[#0E315C]">{caseStats.caseType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#0E315C]/60 font-light">Avg Response</span>
                    <span className="text-sm font-medium text-emerald-600">{caseStats.avgResponseTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#0E315C]/60 font-light">Total Documents</span>
                    <span className="text-sm font-medium text-[#0E315C]">{caseStats.totalDocuments}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#0E315C]/60 font-light">Completion Rate</span>
                    <span className="text-sm font-medium text-emerald-600">{progressPercent}%</span>
                  </div>
                </div>
              </div>

              {/* Communications */}
              <div className={sectionClasses}>
                <h3 className="text-lg font-light text-[#0E315C] mb-4 flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-[#C5BFEE]" />
                  <span>Communications</span>
                </h3>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {communications.map((comm, index) => (
                    <div
                      key={index}
                      className="p-3 bg-[#C1D9F6]/10 rounded-xl border border-[#C1D9F6]/20 hover:bg-[#C1D9F6]/20 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getCommunicationIcon(comm.type)}
                          <span className="text-xs font-medium text-[#0E315C] uppercase">{comm.type}</span>
                        </div>
                        <span className="text-xs text-[#0E315C]/50 font-light">{comm.time}</span>
                      </div>
                      <p className="text-sm font-medium text-[#0E315C] mb-1 truncate">{comm.subject}</p>
                      <p className="text-xs text-[#0E315C]/60 font-light line-clamp-2">{comm.preview}</p>
                      <p className="text-xs text-[#0E315C]/50 font-light mt-1">{comm.recipient}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className={sectionClasses}>
                <h3 className="text-lg font-light text-[#0E315C] mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] hover:from-[#0E315C] hover:to-[#0E315C] text-white py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg font-light text-sm">
                    Generate Report
                  </button>
                  <button className="w-full bg-[#C1D9F6]/20 hover:bg-[#C1D9F6]/30 text-[#0E315C] py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 font-light text-sm">
                    Contact Client
                  </button>
                  <button className="w-full bg-[#C5BFEE]/20 hover:bg-[#C5BFEE]/30 text-[#0E315C] py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 font-light text-sm">
                    Archive Case
                  </button>
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
