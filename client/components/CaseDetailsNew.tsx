import React, { useState } from "react";
import { X, ArrowLeft, FileText, Clock, Users, CheckCircle2, AlertCircle, Calendar, Mail, MessageSquare, Download, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseDetailsNewProps {
  selectedCase: any;
  onBack: () => void;
}

export default function CaseDetailsNew({
  selectedCase,
  onBack,
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
    priority: selectedCase.priority || "high",
    dateCompleted: selectedCase.dateCompleted || "Jun 28, 2025",
    tasksComplete: selectedCase.tasksComplete || "7",
  };

  const progressPercent = selectedCase.status === "Complete" ? 100 : 85;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-700 border-emerald-200";
      case "review":
        return "bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-700 border-purple-200";
      case "pending":
        return "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-700 border-amber-200";
      default:
        return "bg-gradient-to-r from-slate-500/20 to-gray-500/20 text-slate-700 border-slate-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-700 border-red-200";
      case "medium":
        return "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-700 border-amber-200";
      case "low":
        return "bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-700 border-emerald-200";
      default:
        return "bg-gradient-to-r from-slate-500/20 to-gray-500/20 text-slate-700 border-slate-200";
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

  if (selectedDocument) {
    const doc = documents.find(d => d.name === selectedDocument);
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#C1D9F6]/30 via-white/50 to-[#99C0F0]/20 backdrop-blur-sm z-50">
        <div className="h-full flex flex-col">
          {/* Document Header */}
          <div className="bg-white/90 backdrop-blur-xl border-b border-[#C1D9F6]/30 p-6">
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
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-[#C1D9F6]/30 text-center max-w-lg">
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
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#C1D9F6]/30 via-white/50 to-[#99C0F0]/20 backdrop-blur-sm z-50 animate-fadeIn">
      <div className="h-full max-h-screen flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-xl border-b border-[#C1D9F6]/30 p-4 flex-shrink-0 animate-slideInLeft">
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
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#0E315C]/50 hover:text-[#0E315C] hover:bg-[#C1D9F6]/25 transition-all duration-300 hover:scale-110"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Case Header */}
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-3xl flex items-center justify-center text-white font-light text-xl shadow-lg shadow-[#99C0F0]/20">
              {selectedCase.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="text-3xl font-light text-[#0E315C]">{selectedCase.name}</h1>
                <span className="text-[#0E315C]/60 font-light font-mono text-sm">{selectedCase.caseId}</span>
                <span className={cn(
                  "px-3 py-1 rounded-xl text-sm font-light border capitalize",
                  getStatusColor(selectedCase.status?.toLowerCase() || "")
                )}>
                  {selectedCase.status}
                </span>
              </div>
              <div className="flex items-center space-x-6 text-sm text-[#0E315C]/60 font-light">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Completed: {caseStats.dateCompleted}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Queue Time: {caseStats.timeInQueue}</span>
                </div>
                <span className={cn(
                  "px-2 py-1 rounded-lg text-xs font-medium border capitalize",
                  getPriorityColor(caseStats.priority)
                )}>
                  {caseStats.priority} Priority
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden p-8">
          <div className="grid grid-cols-12 gap-8 h-full">
            {/* Left Column - Main Content */}
            <div className="col-span-8 space-y-6 overflow-y-auto">
              {/* Case Progress */}
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-[#C1D9F6]/30 transition-all duration-300 hover:shadow-2xl animate-fadeInUp" style={{animationDelay: '200ms'}}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-light text-[#0E315C] flex items-center space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    <span>Case Progress</span>
                  </h3>
                  <span className="text-3xl font-light text-[#0E315C]">{progressPercent}%</span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-[#0E315C]/60 mb-3 font-light">
                    <span>Tasks Completed: {caseStats.tasksComplete} of {caseStats.tasksComplete}</span>
                    <span>Documents: {caseStats.approvedDocuments}/{caseStats.totalDocuments} Approved</span>
                  </div>
                  <div className="w-full h-3 bg-[#C1D9F6]/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-1000 shadow-lg"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-emerald-50/50 rounded-xl border border-emerald-200/50">
                    <div className="text-2xl font-light text-emerald-600 mb-1">{caseStats.approvedDocuments}</div>
                    <div className="text-xs text-emerald-600/70 font-light">Approved</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50/50 rounded-xl border border-purple-200/50">
                    <div className="text-2xl font-light text-purple-600 mb-1">{caseStats.reviewDocuments}</div>
                    <div className="text-xs text-purple-600/70 font-light">In Review</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50/50 rounded-xl border border-blue-200/50">
                    <div className="text-2xl font-light text-blue-600 mb-1">{caseStats.timeInQueue}</div>
                    <div className="text-xs text-blue-600/70 font-light">Total Time</div>
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-[#C1D9F6]/30 transition-all duration-300 hover:shadow-2xl animate-fadeInUp" style={{animationDelay: '400ms'}}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-light text-[#0E315C] flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-[#99C0F0]" />
                    <span>Documents</span>
                  </h3>
                  <span className="text-sm text-[#0E315C]/60 font-light">{documents.length} files total</span>
                </div>
                
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {documents.map((doc, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedDocument(doc.name)}
                      className="flex items-center justify-between p-4 bg-[#C1D9F6]/10 hover:bg-[#C1D9F6]/20 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 border border-[#C1D9F6]/20"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#99C0F0]/20 to-[#C5BFEE]/20 rounded-xl flex items-center justify-center">
                          <FileText className="w-6 h-6 text-[#0E315C]" />
                        </div>
                        <div>
                          <div className="font-medium text-[#0E315C] text-sm">{doc.name}</div>
                          <div className="text-xs text-[#0E315C]/60 font-light">{doc.description}</div>
                          <div className="flex items-center space-x-4 text-xs text-[#0E315C]/50 font-light mt-1">
                            <span>{doc.size}</span>
                            <span>{doc.pages} pages</span>
                            <span>{doc.uploadDate}</span>
                          </div>
                        </div>
                      </div>
                      <span className={cn(
                        "px-3 py-1 rounded-lg text-xs font-medium border capitalize",
                        getStatusColor(doc.status)
                      )}>
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-[#C1D9F6]/30 transition-all duration-300 hover:shadow-2xl animate-fadeInUp" style={{animationDelay: '600ms'}}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-light text-[#0E315C] flex items-center space-x-3">
                    <Clock className="w-6 h-6 text-[#C5BFEE]" />
                    <span>Recent Activity</span>
                  </h3>
                  <span className="text-sm text-[#0E315C]/60 font-light">{recentActivity.length} recent updates</span>
                </div>
                
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-[#C5BFEE]/10 rounded-xl border border-[#C5BFEE]/20"
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
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
            <div className="col-span-4 space-y-6">
              {/* Case Overview */}
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-[#C1D9F6]/30 animate-fadeInUp" style={{animationDelay: '300ms'}}>
                <h3 className="text-lg font-light text-[#0E315C] mb-4 flex items-center space-x-3">
                  <Users className="w-5 h-5 text-[#99C0F0]" />
                  <span>Case Overview</span>
                </h3>
                <div className="space-y-4">
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
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-[#C1D9F6]/30 animate-fadeInUp" style={{animationDelay: '500ms'}}>
                <h3 className="text-lg font-light text-[#0E315C] mb-4 flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-[#C5BFEE]" />
                  <span>Communications</span>
                </h3>
                <div className="space-y-4 max-h-64 overflow-y-auto">
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
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-[#C1D9F6]/30 animate-fadeInUp" style={{animationDelay: '700ms'}}>
                <h3 className="text-lg font-light text-[#0E315C] mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] hover:from-[#0E315C] hover:to-[#0E315C] text-white py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg font-light">
                    Generate Report
                  </button>
                  <button className="w-full bg-[#C1D9F6]/20 hover:bg-[#C1D9F6]/30 text-[#0E315C] py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 font-light">
                    Contact Client
                  </button>
                  <button className="w-full bg-[#C5BFEE]/20 hover:bg-[#C5BFEE]/30 text-[#0E315C] py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 font-light">
                    Archive Case
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
