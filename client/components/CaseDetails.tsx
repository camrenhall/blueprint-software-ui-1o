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
    {
      name: "Employment Contract.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "Jun 28, 2025",
      status: "approved",
    },
    {
      name: "W2_Form_2024.pdf",
      type: "PDF",
      size: "1.1 MB",
      uploadDate: "Jun 27, 2025",
      status: "approved",
    },
    {
      name: "Medical_Records.pdf",
      type: "PDF",
      size: "8.7 MB",
      uploadDate: "Jun 25, 2025",
      status: "pending",
    },
    {
      name: "Insurance_Policy.pdf",
      type: "PDF",
      size: "1.8 MB",
      uploadDate: "Jun 24, 2025",
      status: "approved",
    },
  ];

  const recentActivity = [
    {
      type: "upload",
      message: "Client uploaded Medical_Records.pdf",
      time: "2 hours ago",
    },
    {
      type: "email",
      message: "Email sent: Document review completed",
      time: "4 hours ago",
    },
    {
      type: "approval",
      message: "Insurance_Policy.pdf approved",
      time: "1 day ago",
    },
  ];

  const correspondence = [
    {
      type: "email",
      subject: "Document Review Completed",
      preview: "Your submitted documents have been reviewed...",
      time: "4 hours ago",
      status: "sent",
    },
    {
      type: "text",
      subject: "SMS Notification",
      preview: "Documents received, under review.",
      time: "2 days ago",
      status: "delivered",
    },
  ];

  const caseStats = {
    timeInQueue: selectedCase.queueTime || "11 Days",
    avgResponseTime: "2.3 hours",
    remainingTasks: selectedCase.status === "Complete" ? 0 : 1,
    totalDocuments: documents.length,
    approvedDocuments: documents.filter((doc) => doc.status === "approved")
      .length,
  };

  // Fix for progress display - provide defaults if missing
  const progressPercent =
    selectedCase.progressPercent ??
    (selectedCase.status === "Complete" ? 100 : 0);
  const progressText =
    selectedCase.progress ||
    `${caseStats.approvedDocuments}/${caseStats.totalDocuments} Tasks Complete`;

  const handleDocumentClick = (docName: string) => {
    setSelectedDocument(docName);
    alert(
      `Opening document: ${docName}\n\nThis would open a document viewer in a real application.`,
    );
  };

  const handleViewAllDocuments = () => {
    alert(
      "Opening detailed documents view...\n\nThis would navigate to a full documents page.",
    );
  };

  const handleViewAllActivity = () => {
    alert(
      "Opening detailed activity view...\n\nThis would navigate to a full activity timeline page.",
    );
  };

  const handleViewAllCommunications = () => {
    alert(
      "Opening detailed communications view...\n\nThis would navigate to a full communications page.",
    );
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "upload":
        return (
          <svg
            className="w-4 h-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
      case "email":
        return (
          <svg
            className="w-4 h-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        );
      case "approval":
        return (
          <svg
            className="w-4 h-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-4 h-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  if (selectedDocument) {
    return (
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden backdrop-blur-md h-full">
        <div className="p-6 border-b border-slate-200">
          <button
            onClick={() => setSelectedDocument(null)}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back to Case</span>
          </button>
        </div>
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            {selectedDocument}
          </h2>
          <p className="text-slate-600 mb-6">
            Document viewer would be implemented here
          </p>
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
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden backdrop-blur-md transform transition-all duration-300 ease-out">
      <div className="p-4 border-b border-slate-200/60">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-all duration-200 hover:scale-105"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium text-sm">Back to Cases</span>
          </button>
        </div>

        {/* Compact Case Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xs">
              {selectedCase.avatar}
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-lg font-bold text-slate-800">
                {selectedCase.name}
              </h1>
              <span className="text-slate-500 font-mono text-xs">
                {selectedCase.caseId}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Compact Layout with Perfect Grid */}
      <div
        className="p-4 overflow-y-auto"
        style={{ height: "auto", flexGrow: 0 }}
      >
        <div className="grid grid-cols-12 gap-4">
          {/* Left Column - Main Content */}
          <div className="col-span-8 space-y-4">
            {/* Case Progress - Fixed Height */}
            <div className="bg-gradient-to-r from-slate-50/80 to-blue-50/40 rounded-xl p-4 border border-slate-200/40 h-32 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800">
                  Case Progress
                </h3>
                <span className="text-lg font-bold text-slate-800">
                  {progressPercent}%
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between text-xs text-slate-600 mb-2">
                  <span>
                    Documents: {caseStats.approvedDocuments}/
                    {caseStats.totalDocuments} Fulfilled
                  </span>
                  <span>{progressText}</span>
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
                    style={{ width: `${progressPercent}%` }}
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
                <h3 className="text-sm font-semibold text-slate-800">
                  Submitted Documents
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500">
                    {documents.length} files
                  </span>
                  <svg
                    className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
              <div
                className="space-y-2 overflow-y-auto"
                style={{ height: "152px" }}
              >
                {documents.slice(0, 3).map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-slate-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <span className="text-slate-700 truncate font-medium">
                        {doc.name}
                      </span>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        doc.status === "approved"
                          ? "bg-emerald-500 shadow-lg shadow-emerald-500/50"
                          : "bg-purple-500 shadow-lg shadow-purple-500/50"
                      }`}
                    ></div>
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
                <h3 className="text-sm font-semibold text-slate-800">
                  Recent Activity
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500">
                    {recentActivity.length} updates
                  </span>
                  <svg
                    className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
              <div
                className="space-y-2 overflow-y-auto overflow-hidden"
                style={{ height: "124px" }}
              >
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-2 bg-slate-50/50 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-800 truncate">
                        {activity.message}
                      </p>
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
              <h3 className="text-sm font-semibold text-slate-800">
                Case Overview
              </h3>
              <div className="space-y-2 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">Time in Queue</span>
                  <span className="text-sm font-semibold text-slate-800">
                    {caseStats.timeInQueue}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">Avg Response</span>
                  <span className="text-sm font-semibold text-emerald-600">
                    {caseStats.avgResponseTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Communications - Fixed Height */}
            <div
              onClick={handleViewAllCommunications}
              className="bg-white rounded-xl p-4 border border-slate-200/40 shadow-sm hover:shadow-md transition-all cursor-pointer group h-48"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-800">
                  Communications
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500">
                    {correspondence.length} msgs
                  </span>
                  <svg
                    className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
              <div
                className="space-y-2 overflow-y-auto"
                style={{ height: "152px" }}
              >
                {correspondence.map((comm, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-indigo-200 pl-2"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-slate-100 rounded flex items-center justify-center">
                          {comm.type === "email" ? (
                            <svg
                              className="w-3 h-3 text-slate-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-3 h-3 text-slate-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-xs font-medium text-slate-800">
                          {comm.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 truncate mt-1">
                      {comm.subject}
                    </p>
                    <p className="text-xs text-slate-400">{comm.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions - Fixed Height */}
            <div className="bg-white rounded-xl p-4 border border-slate-200/40 shadow-sm h-48">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">
                Quick Actions
              </h3>
              <div className="flex items-center justify-center h-32 text-slate-400 text-xs">
                Feature placeholder
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
