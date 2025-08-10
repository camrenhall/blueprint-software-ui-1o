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
    { name: "Paystubs_Q2_2025.pdf", type: "PDF", size: "3.2 MB", uploadDate: "Jun 26, 2025", status: "approved" },
    { name: "Medical_Records.pdf", type: "PDF", size: "8.7 MB", uploadDate: "Jun 25, 2025", status: "pending" },
    { name: "Insurance_Policy.pdf", type: "PDF", size: "1.8 MB", uploadDate: "Jun 24, 2025", status: "approved" },
    { name: "Driver_License.jpg", type: "Image", size: "456 KB", uploadDate: "Jun 24, 2025", status: "approved" },
  ];

  const recentActivity = [
    { type: "upload", message: "Client uploaded Medical_Records.pdf", time: "2 hours ago", icon: "📄" },
    { type: "email", message: "Email sent: Document review completed", time: "4 hours ago", icon: "📧" },
    { type: "approval", message: "Insurance_Policy.pdf approved", time: "1 day ago", icon: "✅" },
    { type: "text", message: "SMS: Documents received, under review", time: "2 days ago", icon: "💬" },
    { type: "upload", message: "Client uploaded Driver_License.jpg", time: "3 days ago", icon: "📄" },
    { type: "email", message: "Email sent: Welcome to case management", time: "5 days ago", icon: "📧" },
  ];

  const correspondence = [
    {
      type: "email",
      subject: "Document Review Completed",
      preview: "Your submitted documents have been reviewed and approved...",
      time: "4 hours ago",
      status: "sent"
    },
    {
      type: "text",
      subject: "SMS Notification",
      preview: "Hi Jackson, we've received your documents and they're under review.",
      time: "2 days ago",
      status: "delivered"
    },
    {
      type: "email", 
      subject: "Welcome to Case Management",
      preview: "Welcome to our case management system. Here's what to expect...",
      time: "5 days ago",
      status: "opened"
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
    // This would typically open a document viewer
    alert(`Opening document: ${docName}\n\nThis would open a document viewer in a real application.`);
  };

  const handleBulkDownload = () => {
    alert(`Downloading ${documents.length} documents...\n\nThis would trigger a bulk download in a real application.`);
  };

  if (selectedDocument) {
    // Document viewer would be implemented here
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
      <div className="p-6 border-b border-slate-200/60">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-all duration-200 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Cases</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBulkDownload}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-all font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-2-7h-4a2 2 0 00-2 2v1M5 9V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v2M7 21h10a2 2 0 002-2v-4a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2z" />
              </svg>
              <span>Download All</span>
            </button>
            <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold border ${selectedCase.statusBg} ${selectedCase.statusColor} ${selectedCase.statusBorder}`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${selectedCase.status === "Needs Review" ? "bg-purple-400" : selectedCase.status === "Complete" ? "bg-emerald-400" : "bg-sky-400"}`}></div>
              {selectedCase.status}
            </span>
          </div>
        </div>

        {/* Case Header */}
        <div className="flex items-center space-x-4 mt-6">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">{selectedCase.avatar}</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{selectedCase.name}</h1>
            <p className="text-slate-500 font-mono text-lg">{selectedCase.caseId}</p>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="p-6 overflow-y-auto" style={{ height: 'calc(100vh - 200px)' }}>
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Column - Main Content */}
          <div className="col-span-8 space-y-6">
            
            {/* Case Progress */}
            <div className="bg-gradient-to-r from-slate-50/80 to-blue-50/40 rounded-2xl p-6 border border-slate-200/40">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Case Progress</h3>
                <span className="text-2xl font-bold text-slate-800">{selectedCase.progressPercent}%</span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-slate-600 mb-2">
                  <span>Documents: {caseStats.approvedDocuments}/{caseStats.totalDocuments} Fulfilled</span>
                  <span>{selectedCase.progress}</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
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

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Documents Requested:</span>
                  <span className="font-medium text-slate-800">{caseStats.totalDocuments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Documents Fulfilled:</span>
                  <span className="font-medium text-slate-800">{caseStats.approvedDocuments}</span>
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/40 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Submitted Documents</h3>
              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    onClick={() => handleDocumentClick(doc.name)}
                    className="flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-100/50 rounded-xl cursor-pointer transition-all group border border-slate-200/30"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {doc.type === "PDF" ? "📄" : "🖼️"}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 group-hover:text-indigo-600 transition-colors">{doc.name}</p>
                        <p className="text-sm text-slate-500">{doc.size} • Uploaded {doc.uploadDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        doc.status === "approved" 
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {doc.status === "approved" ? "✅ Approved" : "⏳ Pending"}
                      </span>
                      <svg className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/40 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-3 bg-slate-50/50 rounded-xl">
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">{activity.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="col-span-4 space-y-6">
            
            {/* Case Stats */}
            <div className="bg-gradient-to-r from-indigo-50/80 to-purple-50/40 rounded-2xl p-6 border border-slate-200/40">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Case Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Time in Queue</span>
                  <span className="font-semibold text-slate-800">{caseStats.timeInQueue}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Avg Response Time</span>
                  <span className="font-semibold text-emerald-600">{caseStats.avgResponseTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Remaining Tasks</span>
                  <span className={`font-semibold ${caseStats.remainingTasks === 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {caseStats.remainingTasks}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Priority Level</span>
                  <span className={`font-semibold capitalize ${
                    selectedCase.priority === "high" ? "text-red-600" :
                    selectedCase.priority === "medium" ? "text-amber-600" : "text-green-600"
                  }`}>
                    {selectedCase.priority}
                  </span>
                </div>
              </div>
            </div>

            {/* Email & Text Correspondence */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/40 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Communications</h3>
              <div className="space-y-3">
                {correspondence.map((comm, index) => (
                  <div key={index} className="p-3 bg-slate-50/50 rounded-xl hover:bg-slate-100/50 transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{comm.type === "email" ? "📧" : "💬"}</span>
                        <span className="text-sm font-medium text-slate-800">{comm.type.toUpperCase()}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        comm.status === "sent" ? "bg-blue-100 text-blue-700" :
                        comm.status === "delivered" ? "bg-green-100 text-green-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {comm.status}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-800 mb-1">{comm.subject}</p>
                    <p className="text-xs text-slate-500 mb-2">{comm.preview}</p>
                    <p className="text-xs text-slate-400">{comm.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/40 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all text-indigo-700 font-medium">
                  <span>📧</span>
                  <span>Send Email</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-all text-green-700 font-medium">
                  <span>💬</span>
                  <span>Send SMS</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-amber-50 hover:bg-amber-100 rounded-xl transition-all text-amber-700 font-medium">
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
