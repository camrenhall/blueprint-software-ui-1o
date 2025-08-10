import React, { useState } from "react";

interface CaseDetailsProps {
  selectedCase: any;
  onBack: () => void;
}

export default function CaseDetails({
  selectedCase,
  onBack,
}: CaseDetailsProps) {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  // Mock data for documents and communications
  const documents = [
    { name: "Employment Contract.pdf", type: "PDF", size: "2.4 MB", uploadDate: "Jun 28, 2025", status: "approved" },
    { name: "W2_Form_2024.pdf", type: "PDF", size: "1.1 MB", uploadDate: "Jun 27, 2025", status: "approved" },
    { name: "Medical_Records.pdf", type: "PDF", size: "8.7 MB", uploadDate: "Jun 25, 2025", status: "pending" },
    { name: "Insurance_Policy.pdf", type: "PDF", size: "1.8 MB", uploadDate: "Jun 24, 2025", status: "approved" },
  ];

  const recentActivity = [
    { type: "upload", message: "Client uploaded Medical_Records.pdf", time: "2 hours ago", icon: "📄" },
    { type: "email", message: "Email sent: Document review completed", time: "4 hours ago", icon: "📧" },
    { type: "approval", message: "Insurance_Policy.pdf approved", time: "1 day ago", icon: "✅" },
  ];

  const correspondence = [
    {
      type: "email",
      subject: "Document Review Completed",
      preview: "Your submitted documents have been reviewed...",
      time: "4 hours ago",
      status: "sent"
    },
    {
      type: "text",
      subject: "SMS Notification", 
      preview: "Documents received, under review.",
      time: "2 days ago",
      status: "delivered"
    },
  ];

  const caseStats = {
    timeInQueue: selectedCase.queueTime || "11 Days",
    avgResponseTime: "2.3 hours",
    remainingTasks: selectedCase.status === "Complete" ? 0 : 1,
    totalDocuments: documents.length,
    approvedDocuments: documents.filter(doc => doc.status === "approved").length
  };

  const handleDocumentClick = (docName: string) => {
    setSelectedDocument(docName);
    alert(`Opening document: ${docName}\n\nThis would open a document viewer in a real application.`);
  };

  const handleViewAllDocuments = () => {
    alert("Opening detailed documents view...\n\nThis would navigate to a full documents page.");
  };

  const handleViewAllActivity = () => {
    alert("Opening detailed activity view...\n\nThis would navigate to a full activity timeline page.");
  };

  const handleViewAllCommunications = () => {
    alert("Opening detailed communications view...\n\nThis would navigate to a full communications page.");
  };

  if (selectedDocument) {
    return (
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden backdrop-blur-md h-full">
        <div className="p-6 border-b border-slate-200">
          <button
            onClick={() => setSelectedDocument(null)}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Case</span>
          </button>
        </div>
        <div className="p-8 text-center">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">{selectedDocument}</h2>
          <p className="text-slate-600 mb-6">Document viewer would be implemented here</p>
          <div className="space-y-3">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all">
              Download Document
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden backdrop-blur-md">
      <div className="p-4 border-b border-slate-200/60">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-all duration-200 hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium text-sm">Back to Cases</span>
          </button>
        </div>

        {/* Compact Case Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xs">{selectedCase.avatar}</span>
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-lg font-bold text-slate-800">{selectedCase.name}</h1>
              <span className="text-slate-500 font-mono text-xs">{selectedCase.caseId}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Compact Layout with Perfect Grid */}
      <div className="p-4 overflow-y-auto" style={{ height: 'calc(100vh - 140px)' }}>
        <div className="grid grid-cols-12 gap-4">
          
          {/* Left Column - Main Content */}
          <div className="col-span-8 space-y-4">
            
            {/* Case Progress - Fixed Height */}
            <div className="bg-gradient-to-r from-slate-50/80 to-blue-50/40 rounded-xl p-4 border border-slate-200/40 h-32 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800">Case Progress</h3>
                <span className="text-lg font-bold text-slate-800">{selectedCase.progressPercent}%</span>
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between text-xs text-slate-600 mb-2">
                  <span>Documents: {caseStats.approvedDocuments}/{caseStats.totalDocuments} Fulfilled</span>
                  <span>{selectedCase.progress}</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      selectedCase.status === "Needs Review"
                        ? "bg-gradient-to-r from-purple-500 to-violet-600"
                        : selectedCase.status === "Complete"
                        ? "bg-gradient-to-r from-emerald-500 to-green-600"
                        : "bg-gradient-to-r from-sky-500 to-blue-600"
                    }`}
                    style={{ width: `${selectedCase.progressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Documents Section - Fixed Height */}
            <div
              onClick={handleViewAllDocuments}
              className="bg-white rounded-xl p-4 border border-slate-200/40 shadow-sm hover:shadow-md transition-all cursor-pointer group h-48"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-800">Submitted Documents</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500">{documents.length} files</span>
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="space-y-2 overflow-y-auto" style={{ height: '152px' }}>
                {documents.slice(0, 3).map((doc, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">📄</span>
                      <span className="text-slate-700 truncate font-medium">{doc.name}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      doc.status === "approved" 
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {doc.status === "approved" ? "✅" : "⏳"}
                    </span>
                  </div>
                ))}
                {documents.length > 3 && (
                  <div className="text-xs text-slate-500 text-center pt-1">
                    +{documents.length - 3} more documents
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity - Fixed Height */}
            <div
              onClick={handleViewAllActivity}
              className="bg-white rounded-xl p-4 border border-slate-200/40 shadow-sm hover:shadow-md transition-all cursor-pointer group h-48"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-800">Recent Activity</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500">{recentActivity.length} updates</span>
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="space-y-2 overflow-y-auto" style={{ height: '152px' }}>
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="text-sm">{activity.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-800 truncate">{activity.message}</p>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Fixed Height Sidebar */}
          <div className="col-span-4 space-y-4">
            
            {/* Case Stats - Fixed Height to match Case Progress */}
            <div className="bg-gradient-to-r from-indigo-50/80 to-purple-50/40 rounded-xl p-4 border border-slate-200/40 h-32 flex flex-col justify-between">
              <h3 className="text-sm font-semibold text-slate-800">Case Overview</h3>
              <div className="space-y-2 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">Time in Queue</span>
                  <span className="text-sm font-semibold text-slate-800">{caseStats.timeInQueue}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">Avg Response</span>
                  <span className="text-sm font-semibold text-emerald-600">{caseStats.avgResponseTime}</span>
                </div>
              </div>
            </div>

            {/* Communications - Fixed Height */}
            <div 
              onClick={handleViewAllCommunications}
              className="bg-white rounded-xl p-4 border border-slate-200/40 shadow-sm hover:shadow-md transition-all cursor-pointer group h-40"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-800">Communications</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500">{correspondence.length} msgs</span>
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="space-y-2 overflow-y-auto" style={{ height: '120px' }}>
                {correspondence.map((comm, index) => (
                  <div key={index} className="border-l-2 border-indigo-200 pl-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm">{comm.type === "email" ? "📧" : "💬"}</span>
                        <span className="text-xs font-medium text-slate-800">{comm.type.toUpperCase()}</span>
                      </div>
                      <span className={`px-1 py-0.5 rounded text-xs font-medium ${
                        comm.status === "sent" ? "bg-blue-100 text-blue-700" :
                        comm.status === "delivered" ? "bg-green-100 text-green-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {comm.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 truncate mt-1">{comm.subject}</p>
                    <p className="text-xs text-slate-400">{comm.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions - Fixed Height */}
            <div className="bg-white rounded-xl p-4 border border-slate-200/40 shadow-sm h-40">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-2 p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all text-indigo-700 text-xs font-medium">
                  <span>📧</span>
                  <span>Send Email</span>
                </button>
                <button className="w-full flex items-center space-x-2 p-2 bg-green-50 hover:bg-green-100 rounded-lg transition-all text-green-700 text-xs font-medium">
                  <span>💬</span>
                  <span>Send SMS</span>
                </button>
                <button className="w-full flex items-center space-x-2 p-2 bg-amber-50 hover:bg-amber-100 rounded-lg transition-all text-amber-700 text-xs font-medium">
                  <span>🔄</span>
                  <span>Update Status</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
