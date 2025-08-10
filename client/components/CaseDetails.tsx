import React from "react";

interface CaseDetailsProps {
  selectedCase: any;
  onBack: () => void;
}

export default function CaseDetails({
  selectedCase,
  onBack,
}: CaseDetailsProps) {
  return (
    <div className="bg-gradient-to-b from-white/95 via-slate-50/40 to-white/95 border border-slate-200/80 rounded-3xl shadow-xl overflow-hidden backdrop-blur-md">
      <div className="p-8">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-all duration-200 hover:scale-105"
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
            <span className="font-medium">Back to Cases</span>
          </button>
          <div className="flex items-center space-x-3">
            <span
              className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold border ${selectedCase.statusBg} ${selectedCase.statusColor} ${selectedCase.statusBorder}`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 ${selectedCase.status === "Needs Review" ? "bg-purple-400" : "bg-sky-400"}`}
              ></div>
              {selectedCase.status}
            </span>
          </div>
        </div>

        {/* Case Details Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Case Info */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">
                    {selectedCase.avatar}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-800">
                    {selectedCase.name}
                  </h1>
                  <p className="text-slate-500 font-mono text-lg italic">
                    {selectedCase.caseId}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div className="bg-white/60 rounded-2xl p-6 border border-slate-200/40">
              <h3 className="font-semibold text-slate-700 mb-4">
                Case Progress
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">
                    {selectedCase.progress}
                  </span>
                  <span className="text-slate-800 font-semibold">
                    {selectedCase.progressPercent}%
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      selectedCase.status === "Needs Review"
                        ? "bg-gradient-to-r from-purple-500 to-violet-600"
                        : "bg-gradient-to-r from-sky-500 to-blue-600"
                    }`}
                    style={{ width: `${selectedCase.progressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Case Overview */}
            <div className="bg-white/60 rounded-2xl p-6 border border-slate-200/40">
              <h3 className="font-semibold text-slate-700 mb-4">
                Case Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Review Status</span>
                  <span className="font-medium text-slate-800">
                    {selectedCase.reviewInfo}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Last Activity</span>
                  <span className="font-medium text-slate-800">
                    {selectedCase.lastActivity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Time in Queue</span>
                  <span className="font-medium text-slate-800">
                    {selectedCase.queueTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Priority Level</span>
                  <span
                    className={`font-semibold capitalize ${
                      selectedCase.priority === "high"
                        ? "text-red-600"
                        : selectedCase.priority === "medium"
                          ? "text-amber-600"
                          : "text-green-600"
                    }`}
                  >
                    {selectedCase.priority}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recent Activity Timeline */}
            <div className="bg-white/60 rounded-2xl p-6 border border-slate-200/40">
              <h3 className="font-semibold text-slate-700 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-white/70 rounded-xl">
                  <div className="w-3 h-3 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">
                      Documents reviewed and approved
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {selectedCase.lastActivity}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-white/70 rounded-xl">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">
                      Case status updated
                    </p>
                    <p className="text-xs text-slate-500 mt-1">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-white/70 rounded-xl">
                  <div className="w-3 h-3 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">
                      Client notification sent
                    </p>
                    <p className="text-xs text-slate-500 mt-1">5 days ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-white/70 rounded-xl">
                  <div className="w-3 h-3 bg-amber-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">
                      Case created and assigned
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {selectedCase.queueTime} ago
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/60 rounded-2xl p-6 border border-slate-200/40">
              <h3 className="font-semibold text-slate-700 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-4 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors text-indigo-700 font-medium">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>Review Case Documents</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-4 bg-white hover:bg-slate-50 rounded-xl transition-colors text-slate-700">
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
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Contact Client</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-4 bg-white hover:bg-slate-50 rounded-xl transition-colors text-slate-700">
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span>Update Case Status</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-4 bg-white hover:bg-slate-50 rounded-xl transition-colors text-slate-700">
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
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>Generate Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
