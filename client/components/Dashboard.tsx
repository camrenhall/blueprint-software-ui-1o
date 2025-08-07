import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DashboardProps {
  isOpen: boolean;
  title: string;
  page?: string;
  onClose: () => void;
  className?: string;
}

type NavigationTab =
  | "overview"
  | "review"
  | "reports"
  | "create"
  | "settings-profile"
  | "settings-preferences"
  | "settings-security"
  | "settings-billing";

export default function Dashboard({
  isOpen,
  title,
  page = "overview",
  onClose,
  className,
}: DashboardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<NavigationTab>("overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Create page state
  const [createStep, setCreateStep] = useState(1);
  const [createMethod, setCreateMethod] = useState<"ai" | "manual" | "questionnaire" | null>(null);
  const [aiDescription, setAiDescription] = useState("");
  const [caseInfo, setCaseInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    matterId: "",
    state: "",
    language: "en"
  });
  const [selectedDocuments, setSelectedDocuments] = useState<Array<{name: string, optional: boolean}>>([]);
  const [documentSearch, setDocumentSearch] = useState("");
  const [selectedDocumentSearch, setSelectedDocumentSearch] = useState("");
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [savedTemplates] = useState([
    { name: "Personal Injury Standard", documents: ["Medical Records", "Insurance Documents", "Employment Records", "W2 Tax Form"] },
    { name: "Employment Law Package", documents: ["Employment Records", "Payroll Records", "Employment Verification Letter", "Wage and Hour Records"] },
    { name: "Corporate Compliance", documents: ["Financial Statements", "Tax Returns (2023)", "Corporate Documents", "Compliance Records"] },
    { name: "Family Law Basic", documents: ["Birth Certificate", "Marriage Certificate", "Financial Statements", "Tax Returns (2023)"] }
  ]);

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure smooth entrance
      setTimeout(() => setIsVisible(true), 50);
      setActiveTab(page as NavigationTab); // Set to the page passed from menu
    } else {
      setIsVisible(false);
    }
  }, [isOpen, page]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest("[data-dropdown]")) {
        setShowNotifications(false);
        setShowSettings(false);
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTabChange = (newTab: NavigationTab) => {
    if (newTab === activeTab) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setIsTransitioning(false);
    }, 150);
  };

  // Create page functions
  const handleAddDocument = (docName: string) => {
    if (!selectedDocuments.find(doc => doc.name === docName)) {
      setSelectedDocuments([...selectedDocuments, { name: docName, optional: false }]);
    }
  };

  const handleRemoveDocument = (docName: string) => {
    setSelectedDocuments(selectedDocuments.filter(doc => doc.name !== docName));
  };

  const handleToggleOptional = (docName: string) => {
    setSelectedDocuments(selectedDocuments.map(doc =>
      doc.name === docName ? { ...doc, optional: !doc.optional } : doc
    ));
  };

  const handleAISubmit = async () => {
    // Simulate AI processing based on description
    const aiSuggestions = [
      "Employment Verification Letter",
      "Wage and Hour Records",
      "Workers Compensation Claims",
      "Performance Reviews",
      "Employment Contract",
      "Payroll Records"
    ];

    // Add AI suggestions to document list
    const newDocs = aiSuggestions.map(name => ({ name, optional: false }));
    setSelectedDocuments([...selectedDocuments, ...newDocs]);
  };

  const handleLoadTemplate = (template: typeof savedTemplates[0]) => {
    const templateDocs = template.documents.map(name => ({ name, optional: false }));
    setSelectedDocuments([...selectedDocuments, ...templateDocs.filter(doc =>
      !selectedDocuments.find(existing => existing.name === doc.name)
    )]);
    setShowTemplateModal(false);
  };

  // Reset create form when switching tabs
  useEffect(() => {
    if (activeTab !== "create") {
      setCreateStep(1);
      setCreateMethod(null);
      setAiDescription("");
      setCaseInfo({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        matterId: "",
        state: "",
        language: "en"
      });
      setSelectedDocuments([]);
      setDocumentSearch("");
      setSelectedDocumentSearch("");
    }
  }, [activeTab]);

  const availableDocuments = [
    "W2 Tax Form", "1098 Tax Return", "Bank Statements", "Employment Records",
    "Medical Records", "Insurance Documents", "Property Deeds", "Driver's License",
    "Social Security Card", "Birth Certificate", "Marriage Certificate",
    "Financial Statements", "Credit Reports", "Tax Returns (2023)", "Payroll Records",
    "Employment Verification Letter", "Wage and Hour Records", "Workers Compensation Claims",
    "Performance Reviews", "Contracts and Agreements", "Court Documents"
  ];

  const filteredAvailableDocuments = availableDocuments.filter(doc =>
    doc.toLowerCase().includes(documentSearch.toLowerCase()) &&
    !selectedDocuments.find(selectedDoc => selectedDoc.name === doc)
  );

  const filteredSelectedDocuments = selectedDocuments.filter(doc =>
    doc.name.toLowerCase().includes(selectedDocumentSearch.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-blue-50/80 to-sky-100/80 p-6 rounded-xl border border-blue-200/40 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-slate-700 mb-1">
                      Active Cases
                    </h3>
                    <div className="text-3xl font-light text-blue-600">247</div>
                  </div>
                  <svg
                    className="w-8 h-8 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-slate-600 mt-2">+12 new this week</p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50/80 to-purple-100/80 p-6 rounded-xl border border-indigo-200/40 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-slate-700 mb-1">
                      Cases Won
                    </h3>
                    <div className="text-3xl font-light text-indigo-600">
                      189
                    </div>
                  </div>
                  <svg
                    className="w-8 h-8 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-slate-600 mt-2">76% success rate</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50/80 to-violet-100/80 p-6 rounded-xl border border-purple-200/40 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-slate-700 mb-1">
                      Billable Hours
                    </h3>
                    <div className="text-3xl font-light text-purple-600">
                      1,847
                    </div>
                  </div>
                  <svg
                    className="w-8 h-8 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-slate-600 mt-2">This month</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-slate-50/80 to-blue-50/80 p-6 rounded-xl border border-slate-200/40 backdrop-blur-sm">
              <h3 className="text-lg font-medium text-slate-700 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {[
                  {
                    action: "Case #247 filed successfully",
                    time: "2 minutes ago",
                    type: "success",
                  },
                  {
                    action: "Court hearing scheduled",
                    time: "15 minutes ago",
                    type: "info",
                  },
                  {
                    action: "Document review pending",
                    time: "32 minutes ago",
                    type: "warning",
                  },
                  {
                    action: "Case #243 won in court",
                    time: "1 hour ago",
                    type: "success",
                  },
                  {
                    action: "Client consultation completed",
                    time: "2 hours ago",
                    type: "success",
                  },
                  {
                    action: "Evidence analysis finished",
                    time: "3 hours ago",
                    type: "info",
                  },
                  {
                    action: "Settlement negotiations ongoing",
                    time: "4 hours ago",
                    type: "warning",
                  },
                  {
                    action: "Legal research completed",
                    time: "5 hours ago",
                    type: "success",
                  },
                  {
                    action: "Expert witness contacted",
                    time: "6 hours ago",
                    type: "info",
                  },
                  {
                    action: "Case brief submitted",
                    time: "7 hours ago",
                    type: "success",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 px-4 bg-white/70 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          item.type === "success" && "bg-blue-400",
                          item.type === "info" && "bg-indigo-400",
                          item.type === "warning" && "bg-purple-400",
                        )}
                      />
                      <span className="text-slate-700">{item.action}</span>
                    </div>
                    <span className="text-sm text-slate-500">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Overview Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-50/80 to-violet-50/80 p-6 rounded-xl border border-purple-200/40 backdrop-blur-sm">
                <h3 className="text-lg font-medium text-slate-700 mb-4">
                  Case Status Overview
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Pending Cases</span>
                    <span className="text-blue-600 font-medium">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">In Progress</span>
                    <span className="text-indigo-600 font-medium">67</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Awaiting Review</span>
                    <span className="text-purple-600 font-medium">45</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-sky-50/80 to-blue-100/80 p-6 rounded-xl border border-sky-200/40 backdrop-blur-sm">
                <h3 className="text-lg font-medium text-slate-700 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 bg-white/70 rounded-lg hover:bg-white/90 transition-colors text-slate-700">
                    Generate Monthly Report
                  </button>
                  <button className="w-full text-left p-3 bg-white/70 rounded-lg hover:bg-white/90 transition-colors text-slate-700">
                    Export User Data
                  </button>
                  <button className="w-full text-left p-3 bg-white/70 rounded-lg hover:bg-white/90 transition-colors text-slate-700">
                    Schedule Maintenance
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "review":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Chart */}
              <div className="bg-gradient-to-br from-blue-50/80 to-indigo-100/80 p-6 rounded-xl border border-blue-200/40 backdrop-blur-sm">
                <h3 className="text-lg font-medium text-slate-700 mb-4">
                  Performance Trends
                </h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-t from-blue-100/80 to-blue-50/80 rounded-lg flex items-end justify-center p-4 space-x-2">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-t from-blue-400 to-indigo-400 rounded-t opacity-80"
                        style={{
                          height: `${30 + Math.random() * 50}%`,
                          width: "6%",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* User Demographics */}
              <div className="bg-gradient-to-br from-purple-50/80 to-violet-100/80 p-6 rounded-xl border border-purple-200/40 backdrop-blur-sm">
                <h3 className="text-lg font-medium text-slate-700 mb-4">
                  User Demographics
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Desktop Users</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-white/40 rounded-full">
                        <div className="w-16 h-2 bg-purple-400 rounded-full"></div>
                      </div>
                      <span className="text-sm text-slate-500">78%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Mobile Users</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-white/40 rounded-full">
                        <div className="w-12 h-2 bg-blue-400 rounded-full"></div>
                      </div>
                      <span className="text-sm text-slate-500">22%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Page Views",
                  value: "125.4K",
                  change: "+12%",
                  icon: "eye",
                },
                {
                  label: "Bounce Rate",
                  value: "23.7%",
                  change: "-3%",
                  icon: "refresh",
                },
                {
                  label: "Session Duration",
                  value: "4m 32s",
                  change: "+8%",
                  icon: "clock",
                },
                {
                  label: "Conversion Rate",
                  value: "3.4%",
                  change: "+1.2%",
                  icon: "target",
                },
              ].map((metric, index) => (
                <div
                  key={index}
                  className="bg-white/70 p-4 rounded-xl border border-slate-200/40 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-600 text-sm">
                      {metric.label}
                    </span>
                    {metric.icon === "eye" && (
                      <svg
                        className="w-5 h-5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                    {metric.icon === "refresh" && (
                      <svg
                        className="w-5 h-5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    )}
                    {metric.icon === "clock" && (
                      <svg
                        className="w-5 h-5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                    {metric.icon === "target" && (
                      <svg
                        className="w-5 h-5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="text-2xl font-light text-slate-800">
                    {metric.value}
                  </div>
                  <div className="text-sm text-blue-600">{metric.change}</div>
                </div>
              ))}
            </div>

            {/* Additional Analytics Content */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-indigo-50/80 to-blue-100/80 p-6 rounded-xl border border-indigo-200/40 backdrop-blur-sm">
                <h3 className="text-lg font-medium text-slate-700 mb-4">
                  Traffic Sources
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      source: "Direct Traffic",
                      percentage: 45,
                      color: "bg-blue-400",
                    },
                    {
                      source: "Search Engines",
                      percentage: 32,
                      color: "bg-indigo-400",
                    },
                    {
                      source: "Social Media",
                      percentage: 15,
                      color: "bg-purple-400",
                    },
                    {
                      source: "Referrals",
                      percentage: 8,
                      color: "bg-violet-400",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-slate-700">{item.source}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-white/40 rounded-full">
                          <div
                            className={`h-2 ${item.color} rounded-full`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-slate-600 w-8">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-sky-50/80 to-cyan-100/80 p-6 rounded-xl border border-sky-200/40 backdrop-blur-sm">
                <h3 className="text-lg font-medium text-slate-700 mb-4">
                  Geographic Distribution
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      country: "United States",
                      users: "4,247",
                      percentage: 34,
                    },
                    {
                      country: "United Kingdom",
                      users: "2,156",
                      percentage: 17,
                    },
                    { country: "Canada", users: "1,834", percentage: 15 },
                    { country: "Germany", users: "1,542", percentage: 12 },
                    { country: "France", users: "1,098", percentage: 9 },
                    { country: "Others", users: "1,970", percentage: 13 },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-white/70 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-slate-700">
                          {item.country}
                        </div>
                        <div className="text-sm text-slate-500">
                          {item.users} users
                        </div>
                      </div>
                      <div className="text-lg font-medium text-sky-600">
                        {item.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "reports":
        return (
          <div className="space-y-6">
            {/* Report Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-100 p-6 rounded-xl border border-indigo-200/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-slate-700">
                    Monthly Report
                  </h3>
                  <svg
                    className="w-6 h-6 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Comprehensive analysis of this month's performance
                </p>
                <button className="bg-white/80 hover:bg-white transition-colors px-4 py-2 rounded-lg text-sm font-medium text-slate-700">
                  Generate Report
                </button>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-6 rounded-xl border border-emerald-200/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-slate-700">
                    User Analytics
                  </h3>
                  <svg
                    className="w-6 h-6 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Detailed breakdown of user behavior and engagement
                </p>
                <button className="bg-white/80 hover:bg-white transition-colors px-4 py-2 rounded-lg text-sm font-medium text-slate-700">
                  View Analytics
                </button>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-100 p-6 rounded-xl border border-violet-200/50">
              <h3 className="text-lg font-medium text-slate-700 mb-4">
                Recent Reports
              </h3>
              <div className="space-y-3">
                {[
                  {
                    name: "Q4 Performance Summary",
                    date: "Dec 31, 2023",
                    status: "completed",
                  },
                  {
                    name: "User Engagement Analysis",
                    date: "Dec 28, 2023",
                    status: "completed",
                  },
                  {
                    name: "Revenue Breakdown Report",
                    date: "Dec 25, 2023",
                    status: "processing",
                  },
                  {
                    name: "Security Audit Report",
                    date: "Dec 20, 2023",
                    status: "completed",
                  },
                  {
                    name: "Monthly Traffic Analysis",
                    date: "Dec 15, 2023",
                    status: "completed",
                  },
                  {
                    name: "Customer Satisfaction Survey",
                    date: "Dec 10, 2023",
                    status: "completed",
                  },
                  {
                    name: "Performance Optimization Report",
                    date: "Dec 5, 2023",
                    status: "completed",
                  },
                ].map((report, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 px-4 bg-white/60 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-slate-700">
                        {report.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        {report.date}
                      </div>
                    </div>
                    <div
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        report.status === "completed" &&
                          "bg-green-100 text-green-700",
                        report.status === "processing" &&
                          "bg-yellow-100 text-yellow-700",
                      )}
                    >
                      {report.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Reports Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-orange-50 to-red-100 p-6 rounded-xl border border-orange-200/50">
                <h3 className="text-lg font-medium text-slate-700 mb-4">
                  Scheduled Reports
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      name: "Weekly Performance Report",
                      frequency: "Every Monday",
                      nextRun: "Jan 8, 2024",
                    },
                    {
                      name: "Monthly Analytics Summary",
                      frequency: "First of month",
                      nextRun: "Feb 1, 2024",
                    },
                    {
                      name: "Quarterly Business Review",
                      frequency: "Every quarter",
                      nextRun: "Apr 1, 2024",
                    },
                  ].map((item, index) => (
                    <div key={index} className="p-3 bg-white/60 rounded-lg">
                      <div className="font-medium text-slate-700">
                        {item.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        {item.frequency}
                      </div>
                      <div className="text-xs text-slate-400">
                        Next: {item.nextRun}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-100 p-6 rounded-xl border border-teal-200/50">
                <h3 className="text-lg font-medium text-slate-700 mb-4">
                  Report Templates
                </h3>
                <div className="space-y-2">
                  {[
                    "Executive Dashboard",
                    "Technical Performance",
                    "User Behavior Analysis",
                    "Financial Summary",
                    "Security Assessment",
                    "Custom Report Builder",
                  ].map((template, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-colors text-slate-700"
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "create":
        return (
          <div className="space-y-6">
            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                        step < createStep
                          ? "bg-green-500 text-white"
                          : step === createStep
                          ? "bg-indigo-500 text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {step < createStep ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        step
                      )}
                    </div>
                    {step < 5 && (
                      <div
                        className={`w-12 h-0.5 mx-2 transition-all ${
                          step < createStep ? "bg-green-500" : "bg-slate-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="min-h-[500px]">
              {/* Step 1: Choose Creation Method */}
              {createStep === 1 && (
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-light text-slate-700 mb-3">Create New Case</h2>
                    <p className="text-slate-600">Choose how you'd like to create your case</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <button
                      onClick={() => {
                        setCreateMethod("ai");
                        setCreateStep(2);
                      }}
                      className="bg-gradient-to-br from-purple-50/90 to-violet-100/90 hover:from-purple-100/90 hover:to-violet-200/90 transition-all p-8 rounded-2xl border border-purple-200/50 text-center group"
                    >
                      <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-700 mb-3">AI Assist</h3>
                      <p className="text-slate-600 leading-relaxed">Describe the case, and AI will suggest what documents to send from your available templates</p>
                    </button>

                    <button
                      onClick={() => {
                        setCreateMethod("manual");
                        setCreateStep(2);
                      }}
                      className="bg-gradient-to-br from-sky-50/90 to-blue-100/90 hover:from-sky-100/90 hover:to-blue-200/90 transition-all p-8 rounded-2xl border border-sky-200/50 text-center group"
                    >
                      <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-700 mb-3">Manual Select</h3>
                      <p className="text-slate-600 leading-relaxed">Manually select requested documents from your document library</p>
                    </button>

                    <button
                      onClick={() => {
                        setCreateMethod("questionnaire");
                        setCreateStep(2);
                      }}
                      className="bg-gradient-to-br from-indigo-50/90 to-purple-100/90 hover:from-indigo-100/90 hover:to-purple-200/90 transition-all p-8 rounded-2xl border border-indigo-200/50 text-center group"
                    >
                      <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-700 mb-3">Questionnaire</h3>
                      <p className="text-slate-600 leading-relaxed">Select a questionnaire to send to your client</p>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Method-Specific Interface */}
              {createStep === 2 && (
                <div className="max-w-6xl mx-auto">
                  {createMethod === "ai" && (
                    <div>
                      <div className="text-center mb-10">
                        <h1 className="text-3xl font-light text-slate-800 mb-4">Describe Your Case</h1>
                        <p className="text-slate-600 text-lg">Our AI will analyze your description and suggest relevant documents</p>
                      </div>

                      <div className="bg-white/60 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-lg p-8 mb-8">
                        <div className="max-w-3xl mx-auto">
                          <label className="block text-sm font-medium text-slate-700 mb-3">Case Description</label>
                          <textarea
                            value={aiDescription}
                            onChange={(e) => setAiDescription(e.target.value)}
                            className="w-full p-4 bg-white border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all h-32 resize-none text-slate-700 placeholder-slate-400"
                            placeholder="Describe the case details, client situation, legal issues, and any specific requirements..."
                          />

                          <div className="flex justify-end mt-4">
                            <button
                              onClick={() => {
                                handleAISubmit();
                                setCreateStep(3);
                              }}
                              disabled={!aiDescription.trim()}
                              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg transition-colors font-medium"
                            >
                              Generate AI Suggestions
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <button
                          onClick={() => setCreateStep(1)}
                          className="text-slate-500 hover:text-slate-700 flex items-center space-x-2 font-medium"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          <span>Back to Method Selection</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {createMethod === "manual" && (
                    <div>
                      <div className="text-center mb-10">
                        <h1 className="text-3xl font-light text-slate-800 mb-4">Select Documents</h1>
                        <p className="text-slate-600 text-lg">Choose documents from your library to request from the client</p>
                      </div>

                      {/* Unified Document Management Interface */}
                      <div className="grid grid-cols-12 gap-8">
                        {/* Available Documents */}
                        <div className="col-span-7">
                          <div className="bg-white/60 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-lg overflow-hidden">
                            <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200/60">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-slate-800">Available Documents</h3>
                                <button
                                  onClick={() => setShowTemplateModal(true)}
                                  className="text-indigo-600 hover:text-indigo-700 flex items-center space-x-2 text-sm font-medium"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                  <span>Load Template</span>
                                </button>
                              </div>
                            </div>

                            <div className="p-6">
                              <div className="mb-4">
                                <input
                                  type="text"
                                  value={documentSearch}
                                  onChange={(e) => setDocumentSearch(e.target.value)}
                                  className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all placeholder-slate-400"
                                  placeholder="Search documents..."
                                />
                              </div>

                              <div className="h-96 overflow-y-auto space-y-2 pr-2">
                                {filteredAvailableDocuments.map((doc, index) => (
                                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
                                    <span className="text-slate-700 font-medium">{doc}</span>
                                    <button
                                      onClick={() => handleAddDocument(doc)}
                                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
                                    >
                                      Add
                                    </button>
                                  </div>
                                ))}
                                {filteredAvailableDocuments.length === 0 && (
                                  <div className="text-center py-12 text-slate-500">
                                    <svg className="w-8 h-8 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p>{documentSearch ? "No documents match your search" : "All documents have been added"}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Selected Documents */}
                        <div className="col-span-5">
                          <div className="bg-white/60 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-lg overflow-hidden">
                            <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200/60">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-slate-800">Selected Documents</h3>
                                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                                  {selectedDocuments.length}
                                </span>
                              </div>
                            </div>

                            <div className="p-6">
                              <div className="mb-4">
                                <input
                                  type="text"
                                  value={selectedDocumentSearch}
                                  onChange={(e) => setSelectedDocumentSearch(e.target.value)}
                                  className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all placeholder-slate-400"
                                  placeholder="Search selected documents..."
                                />
                              </div>

                              <div className="h-96 overflow-y-auto space-y-2 pr-2">
                                {filteredSelectedDocuments.map((doc, index) => (
                                  <div key={index} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                                    <div className="flex items-start justify-between mb-2">
                                      <span className="text-slate-700 font-medium text-sm leading-relaxed">{doc.name}</span>
                                      <button
                                        onClick={() => handleRemoveDocument(doc.name)}
                                        className="text-slate-400 hover:text-red-500 transition-colors ml-2"
                                        title="Remove document"
                                      >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                      </button>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <button
                                        onClick={() => handleToggleOptional(doc.name)}
                                        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                                          doc.optional
                                            ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                                            : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                        }`}
                                      >
                                        {doc.optional ? "Optional" : "Required"}
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                {filteredSelectedDocuments.length === 0 && (
                                  <div className="text-center py-12 text-slate-500">
                                    <svg className="w-8 h-8 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p>{selectedDocumentSearch ? "No selected documents match your search" : "No documents selected"}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-8">
                        <button
                          onClick={() => setCreateStep(1)}
                          className="text-slate-500 hover:text-slate-700 flex items-center space-x-2 font-medium"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          <span>Back to Method Selection</span>
                        </button>

                        <button
                          onClick={() => setCreateStep(3)}
                          disabled={selectedDocuments.length === 0}
                          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg transition-colors font-medium"
                        >
                          Continue with {selectedDocuments.length} Documents
                        </button>
                      </div>
                    </div>
                  )}

                  {createMethod === "questionnaire" && (
                    <div>
                      <div className="text-center mb-10">
                        <h1 className="text-3xl font-light text-slate-800 mb-4">Select Questionnaire</h1>
                        <p className="text-slate-600 text-lg">Choose a questionnaire template to send to your client</p>
                      </div>

                      <div className="bg-white/60 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-lg p-8">
                        <div className="space-y-4 mb-8">
                          {[
                            { name: "Employment Law Intake", description: "Comprehensive intake for employment-related cases" },
                            { name: "Personal Injury Assessment", description: "Detailed assessment for personal injury claims" },
                            { name: "Family Law Questionnaire", description: "Family law matters including divorce and custody" },
                            { name: "Corporate Compliance Check", description: "Corporate compliance and regulatory matters" }
                          ].map((questionnaire, index) => (
                            <button
                              key={index}
                              className="w-full text-left p-6 bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200 rounded-lg"
                            >
                              <h4 className="font-medium text-slate-800 mb-2">{questionnaire.name}</h4>
                              <p className="text-slate-600 text-sm">{questionnaire.description}</p>
                            </button>
                          ))}
                        </div>

                        <div className="flex justify-center">
                          <button
                            onClick={() => setCreateStep(4)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg transition-colors font-medium"
                          >
                            Continue with Questionnaire
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-center mt-8">
                        <button
                          onClick={() => setCreateStep(1)}
                          className="text-slate-500 hover:text-slate-700 flex items-center space-x-2 font-medium"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          <span>Back to Method Selection</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Document Management (AI Suggestions or Review) */}
              {createStep === 3 && (
                <div className="max-w-5xl mx-auto">
                  {createMethod === "ai" ? (
                    <div>
                      <div className="text-center mb-8">
                        <h2 className="text-2xl font-light text-slate-700 mb-3">AI Document Suggestions</h2>
                        <p className="text-slate-600">Review AI recommendations and customize your document list</p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Available Documents */}
                        <div className="lg:col-span-2">
                          <div className="bg-gradient-to-br from-purple-50/80 to-violet-100/80 p-6 rounded-2xl border border-purple-200/40 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="text-lg font-medium text-slate-700">Add More Documents</h3>
                              <button
                                onClick={() => setShowTemplateModal(true)}
                                className="text-purple-600 hover:text-purple-700 flex items-center space-x-2 text-sm"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span>Load Template</span>
                              </button>
                            </div>

                            <div className="mb-4">
                              <input
                                type="text"
                                value={documentSearch}
                                onChange={(e) => setDocumentSearch(e.target.value)}
                                className="w-full p-3 bg-white/80 rounded-xl border border-slate-200/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all"
                                placeholder="Search for additional documents..."
                              />
                            </div>

                            <div className="max-h-80 overflow-y-auto space-y-2">
                              {filteredAvailableDocuments.map((doc, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-white/70 rounded-lg hover:bg-white/90 transition-colors">
                                  <span className="text-slate-700">{doc}</span>
                                  <button
                                    onClick={() => handleAddDocument(doc)}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm font-medium"
                                  >
                                    Add
                                  </button>
                                </div>
                              ))}
                              {filteredAvailableDocuments.length === 0 && (
                                <div className="text-center py-8 text-slate-500">
                                  {documentSearch ? "No documents match your search" : "All documents have been added"}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* AI Suggested Documents */}
                        <div className="lg:col-span-1">
                          <div className="bg-gradient-to-br from-indigo-50/80 to-blue-100/80 p-6 rounded-2xl border border-indigo-200/40 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-medium text-slate-700">AI Suggestions</h3>
                              <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-sm font-medium">
                                {selectedDocuments.length}
                              </span>
                            </div>

                            <div className="max-h-80 overflow-y-auto space-y-2">
                              {selectedDocuments.map((doc, index) => (
                                <div key={index} className="p-3 bg-white/70 rounded-lg">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-slate-700 text-sm font-medium">{doc.name}</span>
                                    <button
                                      onClick={() => handleRemoveDocument(doc.name)}
                                      className="text-red-600 hover:text-red-700"
                                      title="Remove"
                                    >
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </button>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => handleToggleOptional(doc.name)}
                                      className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                                        doc.optional
                                          ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                          : "bg-green-100 text-green-700 hover:bg-green-200"
                                      }`}
                                    >
                                      {doc.optional ? "Optional" : "Required"}
                                    </button>
                                  </div>
                                </div>
                              ))}
                              {selectedDocuments.length === 0 && (
                                <div className="text-center py-8 text-slate-500 text-sm">
                                  No documents selected
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // For Manual/Questionnaire - this is the document management step
                    <div>
                      <div className="text-center mb-8">
                        <h2 className="text-2xl font-light text-slate-700 mb-3">Manage Documents</h2>
                        <p className="text-slate-600">Review and organize your selected documents</p>
                      </div>

                      <div className="bg-gradient-to-br from-indigo-50/80 to-blue-100/80 p-8 rounded-2xl border border-indigo-200/40 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <span className="text-lg font-medium text-slate-700">Selected Documents</span>
                            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                              {selectedDocuments.length} items
                            </span>
                          </div>
                          <button className="text-indigo-600 hover:text-indigo-700 flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span>Save as Template</span>
                          </button>
                        </div>

                        <div className="space-y-3 mb-8 max-h-80 overflow-y-auto">
                          {selectedDocuments.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-white/70 rounded-xl">
                              <div className="flex items-center space-x-3">
                                <span className="text-slate-700 font-medium">{doc.name}</span>
                                {doc.optional && (
                                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">Optional</span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleToggleOptional(doc.name)}
                                  className="text-yellow-600 hover:text-yellow-700 p-2 rounded-lg hover:bg-yellow-100/50 transition-colors"
                                  title="Toggle Optional"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleRemoveDocument(doc.name)}
                                  className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-100/50 transition-colors"
                                  title="Remove"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))}

                          {selectedDocuments.length === 0 && (
                            <div className="text-center py-12 text-slate-500">
                              <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <p>No documents selected yet</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-8">
                    <button
                      onClick={() => setCreateStep(2)}
                      className="text-slate-600 hover:text-slate-700 flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span>Back</span>
                    </button>

                    <button
                      onClick={() => setCreateStep(4)}
                      disabled={selectedDocuments.length === 0}
                      className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-colors"
                    >
                      Continue to Case Info
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Case Information */}
              {createStep === 4 && (
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-light text-slate-700 mb-3">Case Information</h2>
                    <p className="text-slate-600">Enter the basic information for this case</p>
                  </div>

                  <div className="bg-gradient-to-br from-slate-50/80 to-blue-50/80 p-8 rounded-2xl border border-slate-200/40 backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                        <input
                          type="text"
                          value={caseInfo.firstName}
                          onChange={(e) => setCaseInfo({...caseInfo, firstName: e.target.value})}
                          className="w-full p-4 bg-white/80 rounded-xl border border-slate-200/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                          placeholder="Enter first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          value={caseInfo.lastName}
                          onChange={(e) => setCaseInfo({...caseInfo, lastName: e.target.value})}
                          className="w-full p-4 bg-white/80 rounded-xl border border-slate-200/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                          placeholder="Enter last name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={caseInfo.phone}
                          onChange={(e) => setCaseInfo({...caseInfo, phone: e.target.value})}
                          className="w-full p-4 bg-white/80 rounded-xl border border-slate-200/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          value={caseInfo.email}
                          onChange={(e) => setCaseInfo({...caseInfo, email: e.target.value})}
                          className="w-full p-4 bg-white/80 rounded-xl border border-slate-200/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                          placeholder="client@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Matter ID</label>
                        <input
                          type="text"
                          value={caseInfo.matterId}
                          onChange={(e) => setCaseInfo({...caseInfo, matterId: e.target.value})}
                          className="w-full p-4 bg-white/80 rounded-xl border border-slate-200/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                          placeholder="MTR-2024-001"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
                        <select
                          value={caseInfo.state}
                          onChange={(e) => setCaseInfo({...caseInfo, state: e.target.value})}
                          className="w-full p-4 bg-white/80 rounded-xl border border-slate-200/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                        >
                          <option value="">Select state</option>
                          <option value="CA">California</option>
                          <option value="NY">New York</option>
                          <option value="TX">Texas</option>
                          <option value="FL">Florida</option>
                          <option value="IL">Illinois</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => setCreateStep(3)}
                        className="text-slate-600 hover:text-slate-700 flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Back</span>
                      </button>

                      <button
                        onClick={() => setCreateStep(5)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors"
                      >
                        Review Case
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Final Review */}
              {createStep === 5 && (
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-light text-slate-700 mb-3">Review Your Case</h2>
                    <p className="text-slate-600">Please review all details before creating the case</p>
                  </div>

                  <div className="space-y-6">
                    {/* Case Summary */}
                    <div className="bg-gradient-to-br from-blue-50/80 to-indigo-100/80 p-6 rounded-xl border border-blue-200/40">
                      <h4 className="text-lg font-medium text-slate-700 mb-4">Case Summary</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div><span className="font-medium text-slate-600">Creation Method:</span> {createMethod === "ai" ? "AI Assist" : createMethod === "manual" ? "Manual Select" : "Questionnaire"}</div>
                        <div><span className="font-medium text-slate-600">Total Documents:</span> {selectedDocuments.length}</div>
                        <div><span className="font-medium text-slate-600">Required Documents:</span> {selectedDocuments.filter(doc => !doc.optional).length}</div>
                        <div><span className="font-medium text-slate-600">Optional Documents:</span> {selectedDocuments.filter(doc => doc.optional).length}</div>
                      </div>
                    </div>

                    {/* Client Information */}
                    <div className="bg-gradient-to-br from-purple-50/80 to-violet-100/80 p-6 rounded-xl border border-purple-200/40">
                      <h4 className="text-lg font-medium text-slate-700 mb-4">Client Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div><span className="font-medium text-slate-600">Name:</span> {caseInfo.firstName} {caseInfo.lastName}</div>
                        <div><span className="font-medium text-slate-600">Email:</span> {caseInfo.email || "Not provided"}</div>
                        <div><span className="font-medium text-slate-600">Phone:</span> {caseInfo.phone || "Not provided"}</div>
                        <div><span className="font-medium text-slate-600">Matter ID:</span> {caseInfo.matterId || "Not provided"}</div>
                        <div><span className="font-medium text-slate-600">State:</span> {caseInfo.state || "Not selected"}</div>
                        <div><span className="font-medium text-slate-600">Language:</span> {caseInfo.language === "en" ? "English" : caseInfo.language}</div>
                      </div>
                    </div>

                    {/* Document List */}
                    <div className="bg-gradient-to-br from-indigo-50/80 to-blue-100/80 p-6 rounded-xl border border-indigo-200/40">
                      <h4 className="text-lg font-medium text-slate-700 mb-4">Requested Documents</h4>
                      <div className="space-y-2">
                        {selectedDocuments.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white/70 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <span className="text-slate-700">{doc.name}</span>
                              {doc.optional && (
                                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">Optional</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Description (if AI was used) */}
                    {createMethod === "ai" && aiDescription && (
                      <div className="bg-gradient-to-br from-purple-50/80 to-violet-100/80 p-6 rounded-xl border border-purple-200/40">
                        <h4 className="text-lg font-medium text-slate-700 mb-4">AI Case Description</h4>
                        <p className="text-slate-600 bg-white/70 p-4 rounded-lg">{aiDescription}</p>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-6">
                      <button
                        onClick={() => setCreateStep(4)}
                        className="text-slate-600 hover:text-slate-700 flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Back to Case Info</span>
                      </button>

                      <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl transition-all font-medium text-lg">
                        Create Case
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Template Loading Modal */}
            {showTemplateModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-2xl">
                  <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <h3 className="text-xl font-semibold text-slate-700">Load Document Template</h3>
                    <button
                      onClick={() => setShowTemplateModal(false)}
                      className="text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="space-y-3">
                      {savedTemplates.map((template, index) => (
                        <div key={index} className="border border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-slate-700 mb-1">{template.name}</h4>
                              <p className="text-sm text-slate-500">{template.documents.length} documents</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {template.documents.slice(0, 3).map((doc, docIndex) => (
                                  <span key={docIndex} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                    {doc}
                                  </span>
                                ))}
                                {template.documents.length > 3 && (
                                  <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                                    +{template.documents.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => handleLoadTemplate(template)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                            >
                              Load Template
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "settings-profile":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50/80 to-indigo-100/80 p-6 rounded-xl border border-blue-200/40 backdrop-blur-sm">
              <h3 className="text-xl font-medium text-slate-700 mb-6">
                User Profile
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 bg-white/80 rounded-lg border border-slate-200/50"
                      defaultValue="Alex Chen"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full p-3 bg-white/80 rounded-lg border border-slate-200/50"
                      defaultValue="alex.chen@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full p-3 bg-white/80 rounded-lg border border-slate-200/50"
                      defaultValue="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 bg-white/80 rounded-lg border border-slate-200/50"
                      defaultValue="Senior Attorney"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Bar Number
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 bg-white/80 rounded-lg border border-slate-200/50"
                      defaultValue="BAR123456"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Specialization
                    </label>
                    <select className="w-full p-3 bg-white/80 rounded-lg border border-slate-200/50">
                      <option>Corporate Law</option>
                      <option>Criminal Law</option>
                      <option>Civil Law</option>
                      <option>Family Law</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );

      case "settings-preferences":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50/80 to-violet-100/80 p-6 rounded-xl border border-purple-200/40 backdrop-blur-sm">
              <h3 className="text-xl font-medium text-slate-700 mb-6">
                Preferences
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-slate-700 mb-4">
                    Notification Settings
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Email notifications for new cases",
                        checked: true,
                      },
                      {
                        label: "SMS alerts for urgent matters",
                        checked: false,
                      },
                      { label: "Desktop notifications", checked: true },
                      { label: "Weekly summary reports", checked: true },
                    ].map((setting, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-3"
                      >
                        <input
                          type="checkbox"
                          defaultChecked={setting.checked}
                          className="rounded border-slate-300"
                        />
                        <span className="text-slate-700">{setting.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-700 mb-4">
                    Display Settings
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Theme
                      </label>
                      <select className="w-full max-w-xs p-3 bg-white/80 rounded-lg border border-slate-200/50">
                        <option>Light Mode</option>
                        <option>Dark Mode</option>
                        <option>Auto</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Timezone
                      </label>
                      <select className="w-full max-w-xs p-3 bg-white/80 rounded-lg border border-slate-200/50">
                        <option>Pacific Time (UTC-8)</option>
                        <option>Eastern Time (UTC-5)</option>
                        <option>Central Time (UTC-6)</option>
                        <option>Mountain Time (UTC-7)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "settings-security":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-sky-50/80 to-cyan-100/80 p-6 rounded-xl border border-sky-200/40 backdrop-blur-sm">
              <h3 className="text-xl font-medium text-slate-700 mb-6">
                Security Settings
              </h3>

              <div className="space-y-6">
                <div className="p-4 bg-white/70 rounded-lg">
                  <h4 className="font-medium text-slate-700 mb-2">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-sm text-slate-600 mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Enable 2FA
                  </button>
                </div>

                <div className="p-4 bg-white/70 rounded-lg">
                  <h4 className="font-medium text-slate-700 mb-2">
                    Password Settings
                  </h4>
                  <p className="text-sm text-slate-600 mb-4">
                    Change your account password
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Change Password
                  </button>
                </div>

                <div className="p-4 bg-white/70 rounded-lg">
                  <h4 className="font-medium text-slate-700 mb-2">
                    Active Sessions
                  </h4>
                  <p className="text-sm text-slate-600 mb-4">
                    Monitor and manage your active login sessions
                  </p>
                  <div className="space-y-2">
                    {[
                      {
                        device: "Chrome on MacBook Pro",
                        location: "San Francisco, CA",
                        time: "Current session",
                      },
                      {
                        device: "Safari on iPhone",
                        location: "San Francisco, CA",
                        time: "2 hours ago",
                      },
                    ].map((session, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-slate-50 rounded"
                      >
                        <div>
                          <p className="font-medium text-slate-700">
                            {session.device}
                          </p>
                          <p className="text-sm text-slate-500">
                            {session.location} • {session.time}
                          </p>
                        </div>
                        {index > 0 && (
                          <button className="text-red-600 hover:text-red-700 text-sm">
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "settings-billing":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-violet-50/80 to-purple-100/80 p-6 rounded-xl border border-violet-200/40 backdrop-blur-sm">
              <h3 className="text-xl font-medium text-slate-700 mb-6">
                Billing & Subscription
              </h3>

              <div className="space-y-6">
                <div className="p-4 bg-white/70 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-medium text-slate-700">
                        Current Plan
                      </h4>
                      <p className="text-2xl font-light text-purple-600 mt-1">
                        Premium Tier
                      </p>
                      <p className="text-sm text-slate-600">
                        $99/month • Billed annually
                      </p>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Upgrade Plan
                    </button>
                  </div>
                  <div className="text-sm text-slate-600">
                    <p>✓ Unlimited cases</p>
                    <p>✓ Advanced analytics</p>
                    <p>✓ Priority support</p>
                    <p>✓ Custom integrations</p>
                  </div>
                </div>

                <div className="p-4 bg-white/70 rounded-lg">
                  <h4 className="font-medium text-slate-700 mb-4">
                    Payment Method
                  </h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 p-3 bg-slate-50 rounded flex items-center space-x-3">
                      <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                        VISA
                      </div>
                      <span className="text-slate-700">
                        •••• •••• •••• 4242
                      </span>
                      <span className="text-slate-500">12/25</span>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700">
                      Edit
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-white/70 rounded-lg">
                  <h4 className="font-medium text-slate-700 mb-4">
                    Billing History
                  </h4>
                  <div className="space-y-2">
                    {[
                      { date: "Jan 1, 2024", amount: "$99.00", status: "Paid" },
                      { date: "Dec 1, 2023", amount: "$99.00", status: "Paid" },
                      { date: "Nov 1, 2023", amount: "$99.00", status: "Paid" },
                    ].map((invoice, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-slate-50 rounded"
                      >
                        <div>
                          <p className="font-medium text-slate-700">
                            {invoice.date}
                          </p>
                          <p className="text-sm text-slate-500">
                            Monthly subscription
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-slate-700">
                            {invoice.amount}
                          </p>
                          <p className="text-sm text-green-600">
                            {invoice.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-end pr-8 md:pr-16 transition-all duration-500",
        className,
      )}
    >
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500",
          isVisible ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />

      {/* Dashboard Panel */}
      <div
        className={cn(
          "relative w-full max-w-4xl h-[85vh] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl transition-all duration-500 ease-out flex flex-col",
          isVisible
            ? "transform translate-x-0 opacity-100 scale-100"
            : "transform translate-x-full opacity-0 scale-95",
        )}
      >
        {/* Navigation Bar */}
        <div className="bg-white border-b border-slate-100 rounded-t-2xl">
          <div className="flex items-center justify-between px-8 py-6">
            <div className="flex items-center">
              {/* Navigation Tabs */}
              <nav className="hidden md:flex items-center space-x-8">
                {(() => {
                  if (activeTab.startsWith("settings-")) {
                    return [
                      { id: "settings-profile", label: "Profile" },
                      { id: "settings-preferences", label: "Preferences" },
                      { id: "settings-security", label: "Security" },
                      { id: "settings-billing", label: "Billing" },
                    ];
                  } else {
                    return [
                      { id: "overview", label: "Overview" },
                      { id: "create", label: "Create" },
                      { id: "review", label: "Review" },
                      { id: "reports", label: "Reports" },
                    ];
                  }
                })().map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id as NavigationTab)}
                    className={cn(
                      "text-sm font-medium transition-all duration-200 pb-1 border-b-2",
                      activeTab === tab.id
                        ? "text-slate-800 border-indigo-400"
                        : "text-slate-500 hover:text-slate-700 border-transparent",
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-6">
              {/* Notification Icon */}
              <div className="relative" data-dropdown>
                <button
                  className="relative hover:bg-slate-100/50 p-2 transition-colors duration-200"
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowSettings(false);
                    setShowProfile(false);
                  }}
                >
                  <svg
                    className="w-5 h-5 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <div className="absolute top-1 right-1 w-2 h-2 bg-purple-400 rounded-full"></div>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute top-12 right-0 w-80 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-200/50 z-50 transition-all duration-200">
                    <div className="p-4 border-b border-slate-100">
                      <h3 className="font-medium text-slate-800">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {[
                        {
                          text: "New user registered",
                          time: "2 min ago",
                          type: "user",
                        },
                        {
                          text: "System backup completed",
                          time: "1 hour ago",
                          type: "system",
                        },
                        {
                          text: "Security scan finished",
                          time: "3 hours ago",
                          type: "security",
                        },
                        {
                          text: "Monthly report generated",
                          time: "1 day ago",
                          type: "report",
                        },
                      ].map((notification, index) => (
                        <div
                          key={index}
                          className="p-3 hover:bg-slate-50 border-b border-slate-50 last:border-0"
                        >
                          <div className="text-sm text-slate-700">
                            {notification.text}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {notification.time}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-slate-100">
                      <button className="text-sm text-indigo-600 hover:text-indigo-700">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Settings Icon */}
              <div className="relative" data-dropdown>
                <button
                  className="hover:bg-slate-100/50 p-2 transition-colors duration-200"
                  onClick={() => {
                    setShowSettings(!showSettings);
                    setShowNotifications(false);
                    setShowProfile(false);
                  }}
                >
                  <svg
                    className="w-5 h-5 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>

                {/* Settings Dropdown */}
                {showSettings && (
                  <div className="absolute top-12 right-0 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-200/50 z-50 transition-all duration-200">
                    <div className="p-4 border-b border-slate-100">
                      <h3 className="font-medium text-slate-800">Settings</h3>
                    </div>
                    <div className="p-2">
                      {[
                        { label: "Account Settings", icon: "user" },
                        { label: "Preferences", icon: "settings" },
                        { label: "Privacy & Security", icon: "shield" },
                        { label: "Notifications", icon: "bell" },
                        { label: "Theme", icon: "palette" },
                        { label: "Help & Support", icon: "help" },
                      ].map((item, index) => (
                        <button
                          key={index}
                          className="w-full text-left p-3 hover:bg-slate-50 rounded-lg flex items-center space-x-3"
                        >
                          {item.icon === "user" && (
                            <svg
                              className="w-4 h-4 text-slate-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          )}
                          {item.icon === "settings" && (
                            <svg
                              className="w-4 h-4 text-slate-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          )}
                          {item.icon === "shield" && (
                            <svg
                              className="w-4 h-4 text-slate-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                              />
                            </svg>
                          )}
                          {item.icon === "bell" && (
                            <svg
                              className="w-4 h-4 text-slate-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                              />
                            </svg>
                          )}
                          {item.icon === "palette" && (
                            <svg
                              className="w-4 h-4 text-slate-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2a2 2 0 002-2V5a2 2 0 00-2-2z"
                              />
                            </svg>
                          )}
                          {item.icon === "help" && (
                            <svg
                              className="w-4 h-4 text-slate-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          )}
                          <span className="text-sm text-slate-700">
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="relative" data-dropdown>
                <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-medium text-slate-700">
                      Alex Chen
                    </div>
                    <div className="text-xs text-slate-500">Premium Tier</div>
                  </div>
                  <button
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200"
                    onClick={() => {
                      setShowProfile(!showProfile);
                      setShowNotifications(false);
                      setShowSettings(false);
                    }}
                  >
                    <span className="text-white text-sm font-medium">AC</span>
                  </button>
                </div>

                {/* Profile Dropdown */}
                {showProfile && (
                  <div className="absolute top-12 right-0 w-72 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-200/50 z-50 transition-all duration-200">
                    <div className="p-4 border-b border-slate-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                          <span className="text-white font-medium">AC</span>
                        </div>
                        <div>
                          <div className="font-medium text-slate-800">
                            Alex Chen
                          </div>
                          <div className="text-sm text-slate-500">
                            alex.chen@email.com
                          </div>
                          <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block mt-1">
                            Premium Tier
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      {[
                        { label: "View Profile", icon: "user" },
                        { label: "Account Settings", icon: "settings" },
                        { label: "Billing & Plans", icon: "credit-card" },
                        { label: "Activity Log", icon: "chart" },
                        { label: "Switch Account", icon: "switch" },
                        { label: "Sign Out", icon: "logout" },
                      ].map((item, index) => (
                        <button
                          key={index}
                          className="w-full text-left p-3 hover:bg-slate-50 rounded-lg flex items-center space-x-3"
                        >
                          {item.icon === "user" && (
                            <svg
                              className="w-4 h-4 text-slate-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          )}
                          {item.icon === "settings" && (
                            <svg
                              className="w-4 h-4 text-slate-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          )}
                          {item.icon === "credit-card" && (
                            <svg
                              className="w-4 h-4 text-slate-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                              />
                            </svg>
                          )}
                          {item.icon === "chart" && (
                            <svg
                              className="w-4 h-4 text-slate-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                            </svg>
                          )}
                          {item.icon === "switch" && (
                            <svg
                              className="w-4 h-4 text-slate-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                              />
                            </svg>
                          )}
                          {item.icon === "logout" && (
                            <svg
                              className="w-4 h-4 text-slate-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                          )}
                          <span className="text-sm text-slate-700">
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="hover:bg-slate-100/50 p-2 transition-colors duration-200 text-slate-500 hover:text-slate-700"
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
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden bg-white rounded-b-2xl">
          <div className="h-full p-8 overflow-y-auto">
            <div
              className={cn(
                "transition-all duration-500 ease-in-out",
                isTransitioning
                  ? "opacity-0 transform translate-x-4"
                  : "opacity-100 transform translate-x-0",
              )}
            >
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
