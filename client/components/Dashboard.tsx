import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import CaseDetails from "./CaseDetails";
import CaseScrollerWithSidebar from "./CaseScrollerWithSidebar";
import CaseScrollerReports from "./CaseScrollerReports";
import RecentActivityTable from "./RecentActivityTable";

interface DashboardProps {
  isOpen: boolean;
  title: string;
  page?: string;
  onClose: () => void;
  className?: string;
}

// Futuristic Case Scroller Component with Sidebar and Collapsible Search
const FuturisticCaseScroller = ({
  cases,
  onCaseSelect,
  searchValue,
  onSearchChange,
}: {
  cases: any[];
  onCaseSelect: (caseItem: any) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Calculate visual effects based on position from top (simplified for performance)
  const getCaseEffects = (index: number) => {
    // Default opacity decreases from top to bottom
    let opacity;

    if (index === 0) {
      opacity = 1; // Top item always full opacity
    } else if (index === 1) {
      opacity = 0.85; // Second item very visible
    } else if (index === 2) {
      opacity = 0.7; // Third item mostly visible
    } else if (index === 3) {
      opacity = 0.55; // Fourth item moderately visible
    } else if (index === 4) {
      opacity = 0.4; // Fifth item less visible
    } else {
      opacity = 0.25; // Rest fade more
    }

    // Adjust based on scroll position to create focus effect
    const container = scrollContainerRef.current;
    if (container) {
      const itemHeight = 120; // Approximate height of each case
      const focusedIndex = Math.round(scrollPosition / itemHeight);
      const distanceFromFocus = Math.abs(index - focusedIndex);

      if (distanceFromFocus === 0) {
        opacity = 1;
      } else if (distanceFromFocus === 1) {
        opacity = Math.max(opacity, 0.75);
      } else if (distanceFromFocus === 2) {
        opacity = Math.max(opacity, 0.55);
      }
    }

    return { opacity };
  };

  // Handle scroll events (simplified)
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    setScrollPosition(scrollContainerRef.current.scrollTop);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      className="bg-gradient-to-b from-white/95 via-slate-50/40 to-white/95 border border-slate-200/80 rounded-3xl shadow-xl backdrop-blur-md flex overflow-hidden"
      style={{ height: "calc(100vh - 300px)" }}
    >
      {/* Fixed Search Header */}
      <div className="flex-shrink-0 bg-white/90 border-b border-slate-200/60 p-3 backdrop-blur-sm rounded-t-3xl">
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search cases or clients..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-slate-200/60 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all placeholder-slate-400 text-slate-700 shadow-sm"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="text-sm text-slate-500 ml-4">
            {cases.length} case{cases.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Gradient overlays for depth effect */}
      <div className="absolute top-16 left-0 right-0 h-12 bg-gradient-to-b from-white via-white/60 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none z-10" />

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="absolute top-16 left-0 right-0 bottom-0 overflow-y-auto px-4 rounded-b-3xl"
        style={{
          scrollBehavior: "smooth",
        }}
      >
        <div className="space-y-4 pt-3">
          {cases.map((caseItem, index) => {
            const { opacity } = getCaseEffects(index);
            const isTopFocused = index <= 2; // Top 3 items get enhanced styling

            return (
              <div
                key={caseItem.caseId + index}
                data-case-index={index}
                className="group cursor-pointer transition-opacity duration-300 ease-out"
                style={{ opacity }}
                onClick={() => onCaseSelect(caseItem)}
              >
                <div
                  className={cn(
                    "bg-gradient-to-r rounded-xl p-4 border backdrop-blur-sm transition-all duration-300 relative",
                    isTopFocused
                      ? "from-white/95 via-white/98 to-white/95 border-indigo-200/60 shadow-xl shadow-indigo-500/5"
                      : "from-white/70 via-white/80 to-white/70 border-slate-200/40 shadow-md",
                  )}
                >
                  {/* Case Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3 flex-1">
                      <div
                        className={cn(
                          "rounded-lg flex items-center justify-center shadow-md transition-all duration-300",
                          index === 0
                            ? "w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600"
                            : "w-9 h-9 bg-gradient-to-br from-indigo-400 to-blue-500",
                        )}
                      >
                        <span className="text-white font-semibold text-xs">
                          {caseItem.avatar}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 min-w-0">
                        <h3
                          className={cn(
                            "font-semibold transition-all duration-300 truncate",
                            index === 0
                              ? "text-slate-800 text-base"
                              : "text-slate-700 text-sm",
                          )}
                        >
                          {caseItem.name}
                        </h3>
                        <span className="text-slate-500 text-xs font-mono italic flex-shrink-0">
                          {caseItem.caseId}
                        </span>
                      </div>
                    </div>

                    {/* Hover indicator */}
                    <div
                      className={cn(
                        "transition-all duration-300 flex-shrink-0",
                        index === 0
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-70",
                      )}
                    >
                      <svg
                        className="w-4 h-4 text-indigo-400"
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

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-300",
                          caseItem.status === "Needs Review"
                            ? "bg-gradient-to-r from-purple-500 to-violet-600"
                            : "bg-gradient-to-r from-sky-500 to-blue-600",
                        )}
                        style={{ width: `${caseItem.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Statistics Grid */}
                  <div className="grid grid-cols-5 gap-3 items-center">
                    {/* Status */}
                    <div className="flex items-center space-x-1.5">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${caseItem.status === "Needs Review" ? "bg-purple-500" : "bg-sky-500"}`}
                      />
                      <span
                        className={`text-xs font-semibold whitespace-nowrap ${caseItem.status === "Needs Review" ? "text-purple-700" : "text-sky-700"}`}
                      >
                        {caseItem.status}
                      </span>
                    </div>

                    {/* Review Info */}
                    <div className="flex items-center space-x-1.5 text-xs whitespace-nowrap">
                      <svg
                        className="w-3 h-3 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        <span className="text-slate-800 font-semibold">
                          {caseItem.reviewInfo.split(" ")[0]}
                        </span>
                        <span className="text-slate-500 ml-1">
                          {caseItem.reviewInfo.split(" ").slice(1).join(" ")}
                        </span>
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="flex items-center space-x-1.5 text-xs whitespace-nowrap">
                      <svg
                        className="w-3 h-3 text-slate-400"
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
                      <span>
                        <span className="text-slate-800 font-semibold">
                          {caseItem.progress.split("/")[0].trim()}
                        </span>
                        <span className="text-slate-500 mx-0.5">/</span>
                        <span className="text-slate-800 font-semibold">
                          {caseItem.progress.split("/")[1].split(" ")[0].trim()}
                        </span>
                        <span className="text-slate-500 ml-1">
                          {caseItem.progress.split(" ").slice(-2).join(" ")}
                        </span>
                      </span>
                    </div>

                    {/* Last Activity */}
                    <div className="flex items-center space-x-1.5 text-xs whitespace-nowrap">
                      <svg
                        className="w-3 h-3 text-slate-400"
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
                      <span>
                        <span className="text-slate-800 font-semibold">
                          {caseItem.lastActivity.split(" ")[0]}
                        </span>
                        <span className="text-slate-500 ml-1">
                          {caseItem.lastActivity.split(" ").slice(1).join(" ")}
                        </span>
                      </span>
                    </div>

                    {/* Queue Time */}
                    <div className="flex items-center space-x-1.5 text-xs whitespace-nowrap">
                      <svg
                        className="w-3 h-3 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                      <span>
                        <span className="text-slate-800 font-semibold">
                          {caseItem.queueTime.split(" ")[0]}
                        </span>
                        <span className="text-slate-500 ml-1">
                          {caseItem.queueTime.split(" ").slice(1).join(" ")}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 z-20">
        <div className="flex flex-col items-center space-y-1.5">
          <div className="w-0.5 h-12 bg-slate-200 rounded-full relative overflow-hidden">
            <div
              className="w-full bg-indigo-400 rounded-full transition-all duration-300"
              style={{
                height: `${Math.min(100, (scrollPosition / Math.max(1, (cases.length - 1) * 120)) * 100)}%`,
              }}
            />
          </div>
          <span className="text-xs font-medium">
            {Math.min(cases.length, Math.round(scrollPosition / 120) + 1)}/
            {cases.length}
          </span>
        </div>
      </div>
    </div>
  );
};

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
  const [stepTransitioning, setStepTransitioning] = useState(false);

  // Create page state
  const [createStep, setCreateStep] = useState(1);
  const [createMethod, setCreateMethod] = useState<
    "ai" | "manual" | "questionnaire" | null
  >(null);
  const [aiDescription, setAiDescription] = useState("");
  const [caseInfo, setCaseInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    matterId: "",
    state: "",
    language: "en",
  });
  const [selectedDocuments, setSelectedDocuments] = useState<
    Array<{ name: string; optional: boolean }>
  >([]);
  const [documentSearch, setDocumentSearch] = useState("");
  const [selectedDocumentSearch, setSelectedDocumentSearch] = useState("");
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showTemplatesInline, setShowTemplatesInline] = useState(false);
  const [showSaveTemplateModal, setShowSaveTemplateModal] = useState(false);
  const [showClearConfirmModal, setShowClearConfirmModal] = useState(false);
  const [showTemplateConflictModal, setShowTemplateConflictModal] = useState(false);
  const [pendingTemplate, setPendingTemplate] = useState<any>(null);
  const [templateName, setTemplateName] = useState('');
  const [savedTemplates] = useState([
    {
      name: "Personal Injury Standard",
      documents: [
        "Medical Records",
        "Insurance Documents",
        "Employment Records",
        "W2 Tax Form",
      ],
    },
    {
      name: "Employment Law Package",
      documents: [
        "Employment Records",
        "Payroll Records",
        "Employment Verification Letter",
        "Wage and Hour Records",
      ],
    },
    {
      name: "Corporate Compliance",
      documents: [
        "Financial Statements",
        "Tax Returns (2023)",
        "Corporate Documents",
        "Compliance Records",
      ],
    },
    {
      name: "Family Law Basic",
      documents: [
        "Birth Certificate",
        "Marriage Certificate",
        "Financial Statements",
        "Tax Returns (2023)",
      ],
    },
  ]);

  // Review page state
  const [reviewSearch, setReviewSearch] = useState("");
  const [selectedCase, setSelectedCase] = useState<any>(null);

  // Reports page state
  const [reportsSearch, setReportsSearch] = useState("");
  const [selectedCompletedCase, setSelectedCompletedCase] = useState<any>(null);

  // Create page document search visibility
  const [isDocLibrarySearchVisible, setIsDocLibrarySearchVisible] = useState(false);
  const [isSelectedDocsSearchVisible, setIsSelectedDocsSearchVisible] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [showCaseActions, setShowCaseActions] = useState<number | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("status-time");

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

  // Enhanced step transition with smooth animations
  const handleStepTransition = (newStep: number) => {
    if (newStep === createStep) return;

    setStepTransitioning(true);
    setTimeout(() => {
      setCreateStep(newStep);
      setTimeout(() => {
        setStepTransitioning(false);
      }, 100);
    }, 300);
  };

  // Phone number formatting function
  const formatPhoneNumber = (value: string) => {
    const phone = value.replace(/\D/g, "");
    const match = phone.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return !match[2]
        ? match[1]
        : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ""}`;
    }
    return value;
  };

  // Create page functions
  const handleAddDocument = (docName: string) => {
    if (!selectedDocuments.find((doc) => doc.name === docName)) {
      setSelectedDocuments([
        ...selectedDocuments,
        { name: docName, optional: false },
      ]);
    }
  };

  const handleRemoveDocument = (docName: string) => {
    setSelectedDocuments(
      selectedDocuments.filter((doc) => doc.name !== docName),
    );
  };

  const handleToggleOptional = (docName: string) => {
    setSelectedDocuments(
      selectedDocuments.map((doc) =>
        doc.name === docName ? { ...doc, optional: !doc.optional } : doc,
      ),
    );
  };

  const handleAISubmit = async () => {
    // Simulate AI processing based on description
    const aiSuggestions = [
      "Employment Verification Letter",
      "Wage and Hour Records",
      "Workers Compensation Claims",
      "Performance Reviews",
      "Employment Contract",
      "Payroll Records",
    ];

    // Add AI suggestions to document list
    const newDocs = aiSuggestions.map((name) => ({ name, optional: false }));
    setSelectedDocuments([...selectedDocuments, ...newDocs]);
  };

  const handleLoadTemplate = (template: (typeof savedTemplates)[0]) => {
    if (selectedDocuments.length > 0) {
      setPendingTemplate(template);
      setShowTemplateConflictModal(true);
      setShowTemplatesInline(false);
    } else {
      const templateDocs = template.documents.map((name) => ({
        name,
        optional: false,
      }));
      setSelectedDocuments(templateDocs);
      setShowTemplatesInline(false);
    }
  };

  const handleTemplateConflictResolve = (action: 'replace' | 'add' | 'cancel') => {
    if (action === 'cancel' || !pendingTemplate) {
      setShowTemplateConflictModal(false);
      setPendingTemplate(null);
      return;
    }

    const templateDocs = pendingTemplate.documents.map((name: string) => ({
      name,
      optional: false,
    }));

    if (action === 'replace') {
      setSelectedDocuments(templateDocs);
    } else if (action === 'add') {
      setSelectedDocuments([
        ...selectedDocuments,
        ...templateDocs.filter(
          (doc) =>
            !selectedDocuments.find((existing) => existing.name === doc.name),
        ),
      ]);
    }

    setShowTemplateConflictModal(false);
    setPendingTemplate(null);
  };

  const handleSaveTemplate = () => {
    if (selectedDocuments.length === 0) {
      alert('Please select some documents before saving a template.');
      return;
    }
    setShowSaveTemplateModal(true);
  };

  const handleConfirmSaveTemplate = () => {
    if (!templateName.trim()) {
      alert('Please enter a template name.');
      return;
    }
    // Here you would save to backend/localStorage
    console.log('Saving template:', {
      name: templateName,
      documents: selectedDocuments.map(d => d.name)
    });
    setShowSaveTemplateModal(false);
    setTemplateName('');
    alert(`Template "${templateName}" saved successfully!`);
  };

  const handleClearAllDocuments = () => {
    if (selectedDocuments.length === 0) return;
    setShowClearConfirmModal(true);
  };

  const handleConfirmClearAll = () => {
    setSelectedDocuments([]);
    setShowClearConfirmModal(false);
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
        language: "en",
      });
      setSelectedDocuments([]);
      setDocumentSearch("");
      setSelectedDocumentSearch("");
    }
  }, [activeTab]);

  const availableDocuments = [
    "W2 Tax Form",
    "1098 Tax Return",
    "Bank Statements",
    "Employment Records",
    "Medical Records",
    "Insurance Documents",
    "Property Deeds",
    "Driver's License",
    "Social Security Card",
    "Birth Certificate",
    "Marriage Certificate",
    "Financial Statements",
    "Credit Reports",
    "Tax Returns (2023)",
    "Payroll Records",
    "Employment Verification Letter",
    "Wage and Hour Records",
    "Workers Compensation Claims",
    "Performance Reviews",
    "Contracts and Agreements",
    "Court Documents",
  ];

  const filteredAvailableDocuments = availableDocuments.filter(
    (doc) =>
      doc.toLowerCase().includes(documentSearch.toLowerCase()) &&
      !selectedDocuments.find((selectedDoc) => selectedDoc.name === doc),
  );

  const filteredSelectedDocuments = selectedDocuments.filter((doc) =>
    doc.name.toLowerCase().includes(selectedDocumentSearch.toLowerCase()),
  );

  // All cases data
  const allCases = [
    {
      name: "Rosen, Claire",
      caseId: "#BTYREV50101",
      status: "Needs Review",
      statusColor: "text-purple-700",
      statusBg: "bg-gradient-to-r from-purple-50 to-violet-50",
      statusBorder: "border-purple-200",
      reviewInfo: "1 Review Required",
      progress: "5/5 Tasks Complete",
      progressPercent: 100,
      lastActivity: "16 Minutes Ago",
      queueTime: "11 Days in Queue",
      priority: "high",
      avatar: "RC",
    },
    {
      name: "Martinez, Elena",
      caseId: "#QWXPLO82394",
      status: "Needs Review",
      statusColor: "text-purple-700",
      statusBg: "bg-gradient-to-r from-purple-50 to-violet-50",
      statusBorder: "border-purple-200",
      reviewInfo: "1 Review Required",
      progress: "3/3 Tasks Complete",
      progressPercent: 100,
      lastActivity: "2 Days Ago",
      queueTime: "7 Days in Queue",
      priority: "medium",
      avatar: "ME",
    },
    {
      name: "Thompson, David",
      caseId: "#MNZFGH45672",
      status: "Awaiting Documents",
      statusColor: "text-sky-700",
      statusBg: "bg-gradient-to-r from-sky-50 to-blue-50",
      statusBorder: "border-sky-200",
      reviewInfo: "1 Outstanding",
      progress: "4/5 Tasks Complete",
      progressPercent: 80,
      lastActivity: "5 Hours Ago",
      queueTime: "13 Days in Queue",
      priority: "high",
      avatar: "TD",
    },
    {
      name: "Anderson, Sarah",
      caseId: "#PLKJHG91238",
      status: "Awaiting Documents",
      statusColor: "text-sky-700",
      statusBg: "bg-gradient-to-r from-sky-50 to-blue-50",
      statusBorder: "border-sky-200",
      reviewInfo: "1 Outstanding",
      progress: "3/7 Tasks Complete",
      progressPercent: 43,
      lastActivity: "Yesterday",
      queueTime: "4 Days in Queue",
      priority: "medium",
      avatar: "AS",
    },
    {
      name: "Chen, Michael",
      caseId: "#RTYV8N67845",
      status: "Awaiting Documents",
      statusColor: "text-sky-700",
      statusBg: "bg-gradient-to-r from-sky-50 to-blue-50",
      statusBorder: "border-sky-200",
      reviewInfo: "1 Outstanding",
      progress: "2/9 Tasks Complete",
      progressPercent: 22,
      lastActivity: "2 Days Ago",
      queueTime: "5 Days in Queue",
      priority: "low",
      avatar: "CM",
    },
    {
      name: "Williams, Jessica",
      caseId: "#ASDFGK23756",
      status: "Awaiting Documents",
      statusColor: "text-sky-700",
      statusBg: "bg-gradient-to-r from-sky-50 to-blue-50",
      statusBorder: "border-sky-200",
      reviewInfo: "1 Outstanding",
      progress: "0/4 Tasks Complete",
      progressPercent: 0,
      lastActivity: "3 Days Ago",
      queueTime: "7 Days in Queue",
      priority: "low",
      avatar: "WJ",
    },
    {
      name: "Johnson, Mark",
      caseId: "#LKJHGF98765",
      status: "Needs Review",
      statusColor: "text-purple-700",
      statusBg: "bg-gradient-to-r from-purple-50 to-violet-50",
      statusBorder: "border-purple-200",
      reviewInfo: "2 Reviews Required",
      progress: "6/6 Tasks Complete",
      progressPercent: 100,
      lastActivity: "4 Hours Ago",
      queueTime: "2 Days in Queue",
      priority: "high",
      avatar: "JM",
    },
    {
      name: "Davis, Lisa",
      caseId: "#MNBVCX54321",
      status: "Awaiting Documents",
      statusColor: "text-sky-700",
      statusBg: "bg-gradient-to-r from-sky-50 to-blue-50",
      statusBorder: "border-sky-200",
      reviewInfo: "3 Outstanding",
      progress: "1/8 Tasks Complete",
      progressPercent: 12,
      lastActivity: "1 Day Ago",
      queueTime: "9 Days in Queue",
      priority: "medium",
      avatar: "DL",
    },
  ];

  // Completed cases data for Reports page
  const completedCases = [
    {
      name: "Johnson, Amanda",
      caseId: "#KYMDCV23922",
      status: "Complete",
      statusColor: "text-emerald-700",
      statusBg: "bg-gradient-to-r from-emerald-50 to-green-50",
      statusBorder: "border-emerald-200",
      tasksComplete: "7",
      dateCompleted: "Jun 28, 2025",
      daysInQueue: "16",
      caseType: "Employment",
      priority: "high",
      avatar: "JA",
    },
    {
      name: "Williams, Robert",
      caseId: "#PLKMNB87456",
      status: "Complete",
      statusColor: "text-emerald-700",
      statusBg: "bg-gradient-to-r from-emerald-50 to-green-50",
      statusBorder: "border-emerald-200",
      tasksComplete: "12",
      dateCompleted: "Jun 25, 2025",
      daysInQueue: "23",
      caseType: "Personal Injury",
      priority: "high",
      avatar: "WR",
    },
    {
      name: "Garcia, Maria",
      caseId: "#QWERTY34567",
      status: "Complete",
      statusColor: "text-emerald-700",
      statusBg: "bg-gradient-to-r from-emerald-50 to-green-50",
      statusBorder: "border-emerald-200",
      tasksComplete: "9",
      dateCompleted: "Jun 22, 2025",
      daysInQueue: "18",
      caseType: "Family Law",
      priority: "medium",
      avatar: "GM",
    },
    {
      name: "Brown, Christopher",
      caseId: "#ZXCVBN78901",
      status: "Complete",
      statusColor: "text-emerald-700",
      statusBg: "bg-gradient-to-r from-emerald-50 to-green-50",
      statusBorder: "border-emerald-200",
      tasksComplete: "15",
      dateCompleted: "Jun 20, 2025",
      daysInQueue: "31",
      caseType: "Corporate",
      priority: "high",
      avatar: "BC",
    },
    {
      name: "Miller, Jennifer",
      caseId: "#ASDFGH12345",
      status: "Complete",
      statusColor: "text-emerald-700",
      statusBg: "bg-gradient-to-r from-emerald-50 to-green-50",
      statusBorder: "border-emerald-200",
      tasksComplete: "6",
      dateCompleted: "Jun 18, 2025",
      daysInQueue: "14",
      caseType: "Contract",
      priority: "medium",
      avatar: "MJ",
    },
    {
      name: "Davis, Michael",
      caseId: "#HJKLNM56789",
      status: "Complete",
      statusColor: "text-emerald-700",
      statusBg: "bg-gradient-to-r from-emerald-50 to-green-50",
      statusBorder: "border-emerald-200",
      tasksComplete: "8",
      dateCompleted: "Jun 15, 2025",
      daysInQueue: "19",
      caseType: "Real Estate",
      priority: "low",
      avatar: "DM",
    },
    {
      name: "Wilson, Sarah",
      caseId: "#POIUYT98765",
      status: "Complete",
      statusColor: "text-emerald-700",
      statusBg: "bg-gradient-to-r from-emerald-50 to-green-50",
      statusBorder: "border-emerald-200",
      tasksComplete: "11",
      dateCompleted: "Jun 12, 2025",
      daysInQueue: "25",
      caseType: "Employment",
      priority: "medium",
      avatar: "WS",
    },
    {
      name: "Taylor, James",
      caseId: "#MNBVCX54321",
      status: "Complete",
      statusColor: "text-emerald-700",
      statusBg: "bg-gradient-to-r from-emerald-50 to-green-50",
      statusBorder: "border-emerald-200",
      tasksComplete: "13",
      dateCompleted: "Jun 10, 2025",
      daysInQueue: "27",
      caseType: "Personal Injury",
      priority: "high",
      avatar: "TJ",
    },
  ];

  // Enhanced case filtering and sorting
  const getFilteredAndSortedCases = () => {
    let filtered = allCases.filter((caseItem) => {
      const matchesSearch =
        caseItem.name.toLowerCase().includes(reviewSearch.toLowerCase()) ||
        caseItem.caseId.toLowerCase().includes(reviewSearch.toLowerCase()) ||
        caseItem.status.toLowerCase().includes(reviewSearch.toLowerCase());

      if (activeFilters.length === 0) return matchesSearch;

      const matchesFilters = activeFilters.some((filter) => {
        switch (filter) {
          case "high-priority":
            return caseItem.priority === "high";
          case "medium-priority":
            return caseItem.priority === "medium";
          case "low-priority":
            return caseItem.priority === "low";
          case "needs-review":
            return caseItem.status === "Needs Review";
          case "awaiting-docs":
            return caseItem.status === "Awaiting Documents";
          case "overdue":
            return parseInt(caseItem.queueTime.split(" ")[0]) > 10;
          default:
            return true;
        }
      });

      return matchesSearch && matchesFilters;
    });

    // Apply sorting - "Needs Review" first, then "Awaiting Documents", then by time within categories
    filtered.sort((a, b) => {
      // Primary sort: Status priority
      if (a.status !== b.status) {
        if (a.status === "Needs Review") return -1;
        if (b.status === "Needs Review") return 1;
        if (a.status === "Awaiting Documents") return -1;
        if (b.status === "Awaiting Documents") return 1;
      }

      // Secondary sort: Within same status, sort by time (most recent first)
      const timeA = parseTimeToMinutes(a.lastActivity);
      const timeB = parseTimeToMinutes(b.lastActivity);
      return timeA - timeB; // Lower minutes = more recent
    });

    return filtered;
  };

  const parseTimeToMinutes = (timeStr: string): number => {
    const parts = timeStr.toLowerCase();
    if (parts.includes("minute")) return parseInt(parts);
    if (parts.includes("hour")) return parseInt(parts) * 60;
    if (parts.includes("day")) return parseInt(parts) * 1440;
    if (parts.includes("yesterday")) return 1440;
    return 999999; // Default for unknown formats
  };

  const filteredCases = getFilteredAndSortedCases();

  // Filter completed cases for Reports page
  const getFilteredCompletedCases = () => {
    return completedCases.filter((caseItem) => {
      return (
        caseItem.name.toLowerCase().includes(reportsSearch.toLowerCase()) ||
        caseItem.caseId.toLowerCase().includes(reportsSearch.toLowerCase()) ||
        caseItem.caseType.toLowerCase().includes(reportsSearch.toLowerCase())
      );
    });
  };

  const filteredCompletedCases = getFilteredCompletedCases();

  // Recent Activity data for Overview page (backend would provide this)
  const recentActivity = [
    {
      name: "Fulsom, Jackson",
      caseId: "#KYMDCV23922",
      status: "Complete",
      statusColor: "text-emerald-700",
      tasksInfo: "6 / 6 Tasks Submitted",
      dateInfo: "Jun 30, 2025 Date Completed",
      daysInQueue: "11 Days in Queue",
      avatar: "FJ",
    },
    {
      name: "Rosen, Claire",
      caseId: "#BTYREV50101",
      status: "Needs Review",
      statusColor: "text-purple-700",
      tasksInfo: "5 / 5 Tasks Complete",
      dateInfo: "Jun 29, 2025 Date Updated",
      daysInQueue: "13 Days in Queue",
      avatar: "RC",
    },
    {
      name: "Morrison, Kate",
      caseId: "#XREMVB32482",
      status: "Awaiting Documents",
      statusColor: "text-sky-700",
      tasksInfo: "4 / 5 Tasks Complete",
      dateInfo: "Jun 29, 2025 Date Updated",
      daysInQueue: "10 Days in Queue",
      avatar: "MK",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Floating Status Indicators */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-8 bg-white/40 backdrop-blur-xl border border-white/20 rounded-full px-8 py-4 shadow-xl">
                {/* Completed Cases */}
                <div className="flex items-center space-x-3 group">
                  <div className="relative">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors duration-200">
                      127
                    </div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Complete
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-slate-300/50 to-transparent"></div>

                {/* Needs Review */}
                <div className="flex items-center space-x-3 group">
                  <div className="relative">
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-purple-400 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800 group-hover:text-purple-600 transition-colors duration-200">
                      7
                    </div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Review
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-slate-300/50 to-transparent"></div>

                {/* Awaiting Documents */}
                <div className="flex items-center space-x-3 group">
                  <div className="relative">
                    <div className="w-3 h-3 bg-sky-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-sky-400 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800 group-hover:text-sky-600 transition-colors duration-200">
                      34
                    </div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Awaiting
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity - Full Width */}
            <div className="max-w-4xl mx-auto">
              <RecentActivityTable
                activities={recentActivity}
                onCaseSelect={setSelectedCase}
              />
            </div>
          </div>
        );

      case "review":
        if (selectedCase) {
          return (
            <CaseDetails
              selectedCase={selectedCase}
              onBack={() => setSelectedCase(null)}
            />
          );
        }
        return (
          <div className="space-y-2">
            {/* Compact Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="group relative bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 border border-blue-200/30 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-600 tracking-wide uppercase mb-1">
                      Open Cases
                    </h3>
                    <div className="text-2xl font-bold text-slate-800">34</div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-purple-50/80 via-white to-violet-50/60 border border-purple-200/30 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-600 tracking-wide uppercase mb-1">
                      Needs Review
                    </h3>
                    <div className="text-2xl font-bold text-slate-800">2</div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-sky-50/80 via-white to-blue-50/60 border border-sky-200/30 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-600 tracking-wide uppercase mb-1">
                      Idle Clients
                    </h3>
                    <div className="text-2xl font-bold text-slate-800">5</div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-indigo-50/80 via-white to-slate-50/60 border border-indigo-200/30 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-600 tracking-wide uppercase mb-1">
                      Validation Rate
                    </h3>
                    <div className="text-2xl font-bold text-slate-800">
                      93.8%
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-slate-600 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
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
                  </div>
                </div>
              </div>
            </div>

            {/* Cases List with Sidebar and Collapsible Search */}
            <CaseScrollerWithSidebar
              cases={filteredCases}
              onCaseSelect={setSelectedCase}
              searchValue={reviewSearch}
              onSearchChange={setReviewSearch}
              activeFilters={activeFilters}
              onFiltersChange={setActiveFilters}
            />
          </div>
        );

      case "reports":
        if (selectedCompletedCase) {
          return (
            <CaseDetails
              selectedCase={selectedCompletedCase}
              onBack={() => setSelectedCompletedCase(null)}
            />
          );
        }
        return (
          <div className="space-y-2">
            {/* Compact Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="group relative bg-gradient-to-br from-emerald-50/80 via-white to-green-50/60 border border-emerald-200/30 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-600 tracking-wide uppercase mb-1">
                      Completed Cases
                    </h3>
                    <div className="text-2xl font-bold text-slate-800">127</div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
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
                  </div>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-blue-50/80 via-white to-sky-50/60 border border-blue-200/30 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-600 tracking-wide uppercase mb-1">
                      Avg Completion
                    </h3>
                    <div className="text-2xl font-bold text-slate-800">
                      18.2 Days
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-sky-600 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-purple-50/80 via-white to-violet-50/60 border border-purple-200/30 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-600 tracking-wide uppercase mb-1">
                      This Month
                    </h3>
                    <div className="text-2xl font-bold text-slate-800">23</div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-indigo-50/80 via-white to-slate-50/60 border border-indigo-200/30 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-600 tracking-wide uppercase mb-1">
                      Success Rate
                    </h3>
                    <div className="text-2xl font-bold text-slate-800">
                      96.7%
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-slate-600 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Completed Cases List */}
            <CaseScrollerReports
              cases={filteredCompletedCases}
              onCaseSelect={setSelectedCompletedCase}
              searchValue={reportsSearch}
              onSearchChange={setReportsSearch}
            />
          </div>
        );

      case "create":
        return (
          <div className="relative min-h-full">
            {/* Step Indicator - Horizontal for Step 1, Vertical for Steps 2+ */}
            {createStep === 1 ? (
              /* Horizontal Step Indicator for Step 1 */
              <div className="flex items-center justify-center mb-12">
                <div className="flex items-center space-x-6">
                  {[
                    { number: 1, label: "Method" },
                    { number: 2, label: "Documents" },
                    { number: 3, label: "Case Info" },
                    { number: 4, label: "Review" },
                  ].map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500 border-2 ${
                            step.number < createStep
                              ? "bg-emerald-500 border-emerald-500 text-white"
                              : step.number === createStep
                                ? "bg-indigo-600 border-indigo-600 text-white"
                                : "bg-white border-slate-300 text-slate-400"
                          }`}
                        >
                          {step.number < createStep ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            step.number
                          )}
                        </div>
                        <span
                          className={`text-xs font-medium mt-2 transition-all duration-500 ${
                            step.number <= createStep ? "text-slate-700" : "text-slate-400"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                      {index < 3 && (
                        <div
                          className={`w-16 h-px mx-4 transition-all duration-500 ${
                            step.number < createStep ? "bg-emerald-500" : "bg-slate-300"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Vertical Step Indicator for Steps 2+ */
              <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-20 transition-all duration-700 ease-out">
                <div className="bg-white/90 backdrop-blur-xl border border-slate-200/40 rounded-r-2xl pl-6 pr-4 py-4 shadow-lg">
                  <div className="flex flex-col space-y-4">
                    {[
                      { number: 1, label: "Method" },
                      { number: 2, label: "Documents" },
                      { number: 3, label: "Case Info" },
                      { number: 4, label: "Review" },
                    ].map((step, index) => (
                      <div key={step.number} className="flex flex-col">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 border-2 ${
                              step.number < createStep
                                ? "bg-emerald-500 border-emerald-500 text-white"
                                : step.number === createStep
                                  ? "bg-indigo-600 border-indigo-600 text-white"
                                  : "bg-white border-slate-300 text-slate-400"
                            }`}
                          >
                            {step.number < createStep ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              step.number
                            )}
                          </div>
                          <span
                            className={`text-xs font-medium transition-all duration-500 whitespace-nowrap ${
                              step.number <= createStep ? "text-slate-700" : "text-slate-400"
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                        {index < 3 && (
                          <div
                            className={`w-px h-6 my-2 ml-4 transition-all duration-500 ${
                              step.number < createStep ? "bg-emerald-500" : "bg-slate-300"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Top Navigation Bar for Steps 2+ */}
            {createStep > 1 && (
              <div className="mb-6">
                <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-xl border border-slate-200/40 rounded-2xl shadow-lg">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleStepTransition(createStep - 1)}
                      className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100/60 rounded-xl transition-all font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span>Back</span>
                    </button>

                    <div className="border-l border-slate-300 pl-4">
                      <h2 className="text-lg font-semibold text-slate-800">
                        {createStep === 2 && "Select Documents"}
                        {createStep === 3 && "Case Information"}
                        {createStep === 4 && "Review & Create"}
                      </h2>
                      <p className="text-sm text-slate-600">
                        {createStep === 2 && "Choose documents from your library to request from the client"}
                        {createStep === 3 && "Enter the basic information for this case"}
                        {createStep === 4 && "Review all details before creating the case"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (createStep === 1 && createMethod === "ai") {
                        handleAISubmit();
                        handleStepTransition(2);
                      } else if (createStep === 1 && createMethod === "questionnaire") {
                        handleStepTransition(3);
                      } else {
                        handleStepTransition(createStep + 1);
                      }
                    }}
                    disabled={
                      (createStep === 2 && selectedDocuments.length === 0) ||
                      (createStep === 3 && (!caseInfo.firstName || !caseInfo.lastName || !caseInfo.email))
                    }
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-xl transition-all font-medium flex items-center space-x-2 shadow-lg disabled:shadow-none"
                  >
                    <span>
                      {createStep === 1 && createMethod === "ai" ? "Generate AI Suggestions" : "Continue"}
                    </span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step Content */}
            <div className={`min-h-[500px] relative transition-all duration-700 ease-out ${
              createStep > 1 ? 'ml-44' : ''
            }`}>
              {/* Step 1: Choose Creation Method */}
              {createStep === 1 && (
                <div
                  className={`max-w-5xl mx-auto transition-all duration-700 ease-out ${stepTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
                >
                  <div className="text-center mb-12">
                    <h1 className="text-4xl font-light text-slate-800 mb-6">
                      Create New Case
                    </h1>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                      Choose your preferred method for creating a new case and
                      requesting documents from your client
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <button
                      onClick={() => {
                        setCreateMethod("ai");
                        handleStepTransition(2);
                      }}
                      className="bg-white/80 backdrop-blur-xl border border-slate-200/60 hover:border-indigo-300 hover:shadow-lg transition-all duration-500 p-8 rounded-2xl text-center group"
                    >
                      <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-700 transition-colors">
                        <svg
                          className="w-7 h-7 text-white"
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
                      <h3 className="text-xl font-medium text-slate-800 mb-3">
                        AI Assist
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        Describe your case and let AI suggest the most relevant
                        documents to request
                      </p>
                    </button>

                    <button
                      onClick={() => {
                        setCreateMethod("manual");
                        handleStepTransition(2);
                      }}
                      className="bg-white/80 backdrop-blur-xl border border-slate-200/60 hover:border-indigo-300 hover:shadow-lg transition-all duration-500 p-8 rounded-2xl text-center group"
                    >
                      <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-700 transition-colors">
                        <svg
                          className="w-7 h-7 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-medium text-slate-800 mb-3">
                        Manual Select
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        Manually choose documents from your organized document
                        library
                      </p>
                    </button>

                    <button
                      onClick={() => {
                        setCreateMethod("questionnaire");
                        handleStepTransition(2);
                      }}
                      className="bg-white/80 backdrop-blur-xl border border-slate-200/60 hover:border-indigo-300 hover:shadow-lg transition-all duration-500 p-8 rounded-2xl text-center group"
                    >
                      <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-700 transition-colors">
                        <svg
                          className="w-7 h-7 text-white"
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
                      </div>
                      <h3 className="text-xl font-medium text-slate-800 mb-3">
                        Questionnaire
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        Send a structured questionnaire tailored to your case
                        type
                      </p>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Method-Specific Interface */}
              {createStep === 2 && (
                <div
                  className={`max-w-6xl mx-auto transition-all duration-700 ease-out ${stepTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
                >
                  {createMethod === "ai" && (
                    <div>
                      <div className="text-center mb-10">
                        <h1 className="text-3xl font-light text-slate-800 mb-4">
                          Describe Your Case
                        </h1>
                        <p className="text-slate-600 text-lg">
                          Our AI will analyze your description and suggest
                          relevant documents
                        </p>
                      </div>

                      <div className="bg-white/60 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-lg p-8 mb-8">
                        <div className="max-w-3xl mx-auto">
                          <label className="block text-sm font-medium text-slate-700 mb-3">
                            Case Description
                          </label>
                          <textarea
                            value={aiDescription}
                            onChange={(e) => setAiDescription(e.target.value)}
                            className="w-full p-4 bg-white border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all h-32 resize-none text-slate-700 placeholder-slate-400"
                            placeholder="Describe the case details, client situation, legal issues, and any specific requirements..."
                          />

                        </div>
                      </div>
                    </div>
                  )}

                  {createMethod === "manual" && (
                    <div className="relative">
                      {/* Fixed Height Document Management Interface */}
                      <div className="grid grid-cols-12 gap-6" style={{ height: 'calc(100vh - 400px)' }}>
                        {/* Available Documents - Constrained Height */}
                        <div className="col-span-7 flex flex-col">
                          <div className="bg-white/95 border border-slate-200/40 rounded-3xl shadow-sm backdrop-blur-sm flex flex-col h-full">
                            {/* Header with Search Icon */}
                            <div className="px-6 py-4 border-b border-slate-100/60 flex-shrink-0">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-1">Document Library</h3>
                                    <p className="text-sm text-slate-500">{availableDocuments.length - selectedDocuments.length} available documents</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => {
                                      if (isDocLibrarySearchVisible && documentSearch) {
                                        setDocumentSearch('');
                                      } else {
                                        setIsDocLibrarySearchVisible(!isDocLibrarySearchVisible);
                                      }
                                    }}
                                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 bg-white/80 text-slate-600 hover:bg-slate-50 border border-slate-200/60"
                                  >
                                    {isDocLibrarySearchVisible && documentSearch ? (
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    ) : (
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                      </svg>
                                    )}
                                  </button>
                                  <button
                                    onClick={() => setShowTemplatesInline(!showTemplatesInline)}
                                    className={`text-slate-600 hover:text-slate-800 flex items-center space-x-2 text-sm font-medium border border-slate-200 hover:border-slate-300 rounded-xl px-3 py-2 transition-all ${showTemplatesInline ? 'bg-slate-100 border-slate-300' : ''}`}
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    <span>Templates</span>
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Collapsible Search Bar */}
                            <div className={`overflow-hidden transition-all duration-300 ease-out border-b border-slate-100/40 ${isDocLibrarySearchVisible ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>
                              <div className="px-6 py-4">
                                <input
                                  type="text"
                                  value={documentSearch}
                                  onChange={(e) => setDocumentSearch(e.target.value)}
                                  className="w-full p-3 bg-slate-50/50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all placeholder-slate-400 text-slate-700"
                                  placeholder="Search document library..."
                                />
                              </div>
                            </div>

                            {/* Templates or Document List */}
                            <div className="relative px-6 pb-4 pt-2 overflow-y-auto document-scroll" style={{
                              height: 'calc(100vh - 480px)',
                              maskImage: 'linear-gradient(to bottom, transparent 0px, black 12px, black calc(100% - 12px), transparent 100%)',
                              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, black 12px, black calc(100% - 12px), transparent 100%)'
                            }}>
                              {showTemplatesInline ? (
                                /* Template Selection */
                                <div className="space-y-3">
                                  <div className="text-sm text-slate-600 mb-4 font-medium">Select a template to load:</div>
                                  {savedTemplates.map((template, index) => (
                                    <div key={index} className="border border-slate-200/60 rounded-xl p-4 hover:border-slate-300/80 hover:bg-slate-50/50 transition-all duration-200">
                                      <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                          <h4 className="font-medium text-slate-800 text-sm mb-1">{template.name}</h4>
                                          <p className="text-slate-500 text-xs mb-2">{template.documents.length} documents</p>
                                          <div className="flex flex-wrap gap-1">
                                            {template.documents.slice(0, 3).map((doc, docIndex) => (
                                              <span key={docIndex} className="bg-slate-100 text-slate-600 px-2 py-1 rounded-lg text-xs">{doc}</span>
                                            ))}
                                            {template.documents.length > 3 && (
                                              <span className="text-slate-400 text-xs">+{template.documents.length - 3} more</span>
                                            )}
                                          </div>
                                        </div>
                                        <button
                                          onClick={() => handleLoadTemplate(template)}
                                          className="ml-3 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition-all"
                                        >
                                          Load
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                  <button
                                    onClick={() => setShowTemplatesInline(false)}
                                    className="w-full text-center text-slate-500 hover:text-slate-700 text-sm py-2 border border-dashed border-slate-300 rounded-xl hover:border-slate-400 transition-all"
                                  >
                                    ← Back to Document Library
                                  </button>
                                </div>
                              ) : (
                                /* Regular Document List */
                                <div className="space-y-1">
                                {filteredAvailableDocuments.map((doc, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleAddDocument(doc)}
                                    className="w-full flex items-center justify-between p-3 hover:bg-slate-50/80 rounded-xl transition-all duration-200 group border-0 bg-transparent text-left"
                                  >
                                    <span className="text-slate-700 font-normal flex-1">{doc}</span>
                                    <svg
                                      className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-200"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                  </button>
                                ))}
                                {filteredAvailableDocuments.length === 0 && (
                                  <div className="text-center py-12 text-slate-500">
                                    <svg className="w-10 h-10 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="font-light text-sm">{documentSearch ? "No documents match your search" : "All documents have been selected"}</p>
                                  </div>
                                )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Selected Documents - Constrained Height */}
                        <div className="col-span-5 flex flex-col">
                          <div className="bg-white/95 border border-slate-200/40 rounded-3xl shadow-sm backdrop-blur-sm flex flex-col h-full">
                            {/* Header with Search Icon */}
                            <div className="px-6 py-4 border-b border-slate-100/60 flex-shrink-0">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="text-lg font-semibold text-slate-800 mb-1">Selected Documents</h3>
                                  <p className="text-sm text-slate-500">{selectedDocuments.length} document{selectedDocuments.length !== 1 ? 's' : ''} selected</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => {
                                      if (isSelectedDocsSearchVisible && selectedDocumentSearch) {
                                        setSelectedDocumentSearch('');
                                      } else {
                                        setIsSelectedDocsSearchVisible(!isSelectedDocsSearchVisible);
                                      }
                                    }}
                                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 bg-white/80 text-slate-600 hover:bg-slate-50 border border-slate-200/60"
                                  >
                                    {isSelectedDocsSearchVisible && selectedDocumentSearch ? (
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    ) : (
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                      </svg>
                                    )}
                                  </button>
                                  <button
                                    onClick={handleSaveTemplate}
                                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 bg-white/80 text-slate-600 hover:bg-slate-50 border border-slate-200/60"
                                    title="Save as template"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={handleClearAllDocuments}
                                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 bg-white/80 text-slate-600 hover:bg-slate-50 border border-slate-200/60"
                                    title="Clear all selected documents"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Collapsible Search Bar */}
                            <div className={`overflow-hidden transition-all duration-300 ease-out border-b border-slate-100/40 ${isSelectedDocsSearchVisible ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>
                              <div className="px-6 py-4">
                                <input
                                  type="text"
                                  value={selectedDocumentSearch}
                                  onChange={(e) => setSelectedDocumentSearch(e.target.value)}
                                  className="w-full p-3 bg-slate-50/50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all placeholder-slate-400 text-slate-700"
                                  placeholder="Search selected..."
                                />
                              </div>
                            </div>

                            {/* Scrollable Selected Documents - FIXED HEIGHT WITH INTERNAL SCROLL */}
                            <div className="relative px-6 pb-6 pt-2 overflow-y-auto document-scroll" style={{
                              height: 'calc(100vh - 520px)',
                              maskImage: 'linear-gradient(to bottom, transparent 0px, black 12px, black calc(100% - 12px), transparent 100%)',
                              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, black 12px, black calc(100% - 12px), transparent 100%)'
                            }}>
                              <div className="space-y-2">
                                {filteredSelectedDocuments.map((doc, index) => (
                                  <div key={index} className="border border-slate-200/60 rounded-xl p-3 bg-slate-50/30 hover:bg-slate-50/60 transition-all">
                                    <div className="flex items-center justify-between">
                                      <span className="text-slate-700 font-normal text-sm flex-1 pr-3 truncate">{doc.name}</span>
                                      <div className="flex items-center space-x-2 flex-shrink-0">
                                        <button
                                          onClick={() => handleToggleOptional(doc.name)}
                                          className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-white/60"
                                          title={doc.optional ? "Make required" : "Make optional"}
                                        >
                                          {doc.optional ? (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                          ) : (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                          )}
                                        </button>
                                        <button
                                          onClick={() => handleRemoveDocument(doc.name)}
                                          className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-white/60"
                                          title="Remove document"
                                        >
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                {filteredSelectedDocuments.length === 0 && (
                                  <div className="text-center py-12 text-slate-500">
                                    <svg className="w-10 h-10 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="font-light text-sm">{selectedDocumentSearch ? "No documents match search" : "Select documents to get started"}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {createMethod === "questionnaire" && (
                    <div>
                      <div className="text-center mb-10">
                        <h1 className="text-3xl font-light text-slate-800 mb-4">
                          Select Questionnaire
                        </h1>
                        <p className="text-slate-600 text-lg">
                          Choose a questionnaire template to send to your client
                        </p>
                      </div>

                      <div className="bg-white/60 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-lg p-8">
                        <div className="space-y-4 mb-8">
                          {[
                            {
                              name: "Employment Law Intake",
                              description:
                                "Comprehensive intake for employment-related cases",
                            },
                            {
                              name: "Personal Injury Assessment",
                              description:
                                "Detailed assessment for personal injury claims",
                            },
                            {
                              name: "Family Law Questionnaire",
                              description:
                                "Family law matters including divorce and custody",
                            },
                            {
                              name: "Corporate Compliance Check",
                              description:
                                "Corporate compliance and regulatory matters",
                            },
                          ].map((questionnaire, index) => (
                            <button
                              key={index}
                              className="w-full text-left p-6 bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200 rounded-lg"
                            >
                              <h4 className="font-medium text-slate-800 mb-2">
                                {questionnaire.name}
                              </h4>
                              <p className="text-slate-600 text-sm">
                                {questionnaire.description}
                              </p>
                            </button>
                          ))}
                        </div>

                      </div>

                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Document Management (For all flows that reach step 3) */}
              {createStep === 3 && (
                <div
                  className={`max-w-6xl mx-auto transition-all duration-700 ease-out ${stepTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
                >
                  <div className="text-center mb-10">
                    <h1 className="text-3xl font-light text-slate-800 mb-4">
                      {createMethod === "ai" ? "Review AI Suggestions" : "Select Documents"}
                    </h1>
                    <p className="text-slate-600 text-lg">
                      {createMethod === "ai" ? "Review AI recommendations and customize your document list" : "Choose documents from your library to request from the client"}
                    </p>
                  </div>

                  {/* Professional Document Management Interface */}
                  <div className="grid grid-cols-12 gap-6" style={{ height: 'calc(100vh - 350px)' }}>
                    {/* Available Documents - Elegant Design */}
                    <div className="col-span-7">
                      <div className="bg-white/95 border border-slate-200/40 rounded-3xl shadow-sm flex flex-col h-full">
                        <div className="px-8 py-6 border-b border-slate-100/60">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-xl font-light text-slate-700 mb-1">
                                Document Library
                              </h3>
                              <p className="text-sm text-slate-500">
                                Add more documents to your AI suggestions
                              </p>
                            </div>
                            <button
                              onClick={() => setShowTemplateModal(true)}
                              className="text-slate-600 hover:text-slate-800 flex items-center space-x-2 text-sm font-medium border border-slate-200 hover:border-slate-300 rounded-xl px-4 py-2 transition-all"
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
                                  strokeWidth={1.5}
                                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                              </svg>
                              <span>Templates</span>
                            </button>
                          </div>
                        </div>

                        <div className="p-8 flex flex-col flex-1">
                          <div className="mb-6">
                            <input
                              type="text"
                              value={documentSearch}
                              onChange={(e) =>
                                setDocumentSearch(e.target.value)
                              }
                              className="w-full p-4 bg-slate-50/50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all placeholder-slate-400 text-slate-700"
                              placeholder="Search document library..."
                            />
                          </div>

                          <div className="relative space-y-1 overflow-y-auto document-scroll" style={{
                            height: 'calc(100vh - 480px)',
                            maskImage: 'linear-gradient(to bottom, transparent 0px, black 12px, black calc(100% - 12px), transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, black 12px, black calc(100% - 12px), transparent 100%)'
                          }}>
                            {filteredAvailableDocuments.map((doc, index) => (
                              <button
                                key={index}
                                onClick={() => handleAddDocument(doc)}
                                className="w-full flex items-center justify-between p-4 hover:bg-slate-50/80 rounded-2xl transition-all duration-200 group border-0 bg-transparent text-left"
                              >
                                <span className="text-slate-700 font-normal flex-1">
                                  {doc}
                                </span>
                                <svg
                                  className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-200"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                  />
                                </svg>
                              </button>
                            ))}
                            {filteredAvailableDocuments.length === 0 && (
                              <div className="text-center py-16 text-slate-500">
                                <svg
                                  className="w-12 h-12 mx-auto mb-4 opacity-30"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                                <p className="font-light">
                                  {documentSearch
                                    ? "No documents match your search"
                                    : "All documents have been selected"}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Selected Documents - Professional Design */}
                    <div className="col-span-5">
                      <div className="bg-white/95 border border-slate-200/40 rounded-3xl shadow-sm flex flex-col h-full">
                        <div className="px-8 py-6 border-b border-slate-100/60">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-xl font-light text-slate-700 mb-1">
                                {createMethod === "ai" ? "AI Suggestions" : "Selected Documents"}
                              </h3>
                              <p className="text-sm text-slate-500">
                                {selectedDocuments.length} document
                                {selectedDocuments.length !== 1 ? "s" : ""}{" "}
                                {createMethod === "ai" ? "recommended" : "selected"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-8 flex flex-col flex-1">
                          <div className="mb-6">
                            <input
                              type="text"
                              value={selectedDocumentSearch}
                              onChange={(e) =>
                                setSelectedDocumentSearch(e.target.value)
                              }
                              className="w-full p-4 bg-slate-50/50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all placeholder-slate-400 text-slate-700"
                              placeholder="Search suggestions..."
                            />
                          </div>

                          <div className="relative space-y-2 overflow-y-auto document-scroll" style={{
                            height: 'calc(100vh - 520px)',
                            maskImage: 'linear-gradient(to bottom, transparent 0px, black 12px, black calc(100% - 12px), transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, black 12px, black calc(100% - 12px), transparent 100%)'
                          }}>
                            {filteredSelectedDocuments.map((doc, index) => (
                              <div
                                key={index}
                                className="border border-slate-200/60 rounded-2xl p-3 bg-slate-50/30 hover:bg-slate-50/60 transition-all"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-slate-700 font-normal text-sm flex-1 pr-3 truncate">
                                    {doc.name}
                                  </span>
                                  <div className="flex items-center space-x-2 flex-shrink-0">
                                    <button
                                      onClick={() =>
                                        handleToggleOptional(doc.name)
                                      }
                                      className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-white/60"
                                      title={doc.optional ? "Make required" : "Make optional"}
                                    >
                                      {doc.optional ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01" />
                                        </svg>
                                      ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                      )}
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleRemoveDocument(doc.name)
                                      }
                                      className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-white/60"
                                      title="Remove document"
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
                                          strokeWidth={1.5}
                                          d="M6 18L18 6M6 6l12 12"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                            {filteredSelectedDocuments.length === 0 && (
                              <div className="text-center py-16 text-slate-500">
                                <svg
                                  className="w-12 h-12 mx-auto mb-4 opacity-30"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                                <p className="font-light">
                                  {selectedDocumentSearch
                                    ? "No documents match search"
                                    : "AI will suggest documents based on your case description"}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* Step 4: Case Information */}
              {createStep === 4 && (
                <div
                  className={`max-w-4xl mx-auto transition-all duration-700 ease-out ${stepTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-light text-slate-700 mb-3">
                      Case Information
                    </h2>
                    <p className="text-slate-600">
                      Enter the basic information for this case
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-slate-50/80 to-blue-50/80 p-8 rounded-2xl border border-slate-200/40 backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={caseInfo.firstName}
                          onChange={(e) =>
                            setCaseInfo({
                              ...caseInfo,
                              firstName: e.target.value,
                            })
                          }
                          className="w-full p-4 bg-white/80 rounded-xl border border-slate-200/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                          placeholder="Enter first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={caseInfo.lastName}
                          onChange={(e) =>
                            setCaseInfo({
                              ...caseInfo,
                              lastName: e.target.value,
                            })
                          }
                          className="w-full p-4 bg-white/80 rounded-xl border border-slate-200/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                          placeholder="Enter last name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={caseInfo.phone}
                          onChange={(e) => {
                            const formatted = formatPhoneNumber(e.target.value);
                            setCaseInfo({ ...caseInfo, phone: formatted });
                          }}
                          className="w-full p-4 bg-white/80 rounded-xl border border-slate-200/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                          placeholder="(555) 123-4567"
                          maxLength={14}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={caseInfo.email}
                          onChange={(e) =>
                            setCaseInfo({ ...caseInfo, email: e.target.value })
                          }
                          className="w-full p-4 bg-white/80 rounded-xl border border-slate-200/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                          placeholder="client@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Matter ID
                        </label>
                        <input
                          type="text"
                          value={caseInfo.matterId}
                          onChange={(e) =>
                            setCaseInfo({
                              ...caseInfo,
                              matterId: e.target.value,
                            })
                          }
                          className="w-full p-4 bg-white/80 rounded-xl border border-slate-200/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                          placeholder="MTR-2024-001"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          State
                        </label>
                        <select
                          value={caseInfo.state}
                          onChange={(e) =>
                            setCaseInfo({ ...caseInfo, state: e.target.value })
                          }
                          className="w-full p-4 bg-white/80 rounded-xl border border-slate-200/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                        >
                          <option value="">Select state</option>
                          <option value="KS">Kansas</option>
                          <option value="MO">Missouri</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => handleStepTransition(3)}
                        className="text-slate-600 hover:text-slate-700 flex items-center space-x-2 transition-colors"
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
                        <span>Back</span>
                      </button>

                      <button
                        onClick={() => handleStepTransition(5)}
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
                <div
                  className={`max-w-4xl mx-auto transition-all duration-700 ease-out ${stepTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-light text-slate-700 mb-3">
                      Review Your Case
                    </h2>
                    <p className="text-slate-600">
                      Please review all details before creating the case
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Case Summary */}
                    <div className="bg-gradient-to-br from-blue-50/80 to-indigo-100/80 p-6 rounded-xl border border-blue-200/40">
                      <h4 className="text-lg font-medium text-slate-700 mb-4">
                        Case Summary
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-slate-600">
                            Creation Method:
                          </span>{" "}
                          {createMethod === "ai"
                            ? "AI Assist"
                            : createMethod === "manual"
                              ? "Manual Select"
                              : "Questionnaire"}
                        </div>
                        <div>
                          <span className="font-medium text-slate-600">
                            Total Documents:
                          </span>{" "}
                          {selectedDocuments.length}
                        </div>
                        <div>
                          <span className="font-medium text-slate-600">
                            Required Documents:
                          </span>{" "}
                          {
                            selectedDocuments.filter((doc) => !doc.optional)
                              .length
                          }
                        </div>
                        <div>
                          <span className="font-medium text-slate-600">
                            Optional Documents:
                          </span>{" "}
                          {
                            selectedDocuments.filter((doc) => doc.optional)
                              .length
                          }
                        </div>
                      </div>
                    </div>

                    {/* Client Information */}
                    <div className="bg-gradient-to-br from-purple-50/80 to-violet-100/80 p-6 rounded-xl border border-purple-200/40">
                      <h4 className="text-lg font-medium text-slate-700 mb-4">
                        Client Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-slate-600">
                            Name:
                          </span>{" "}
                          {caseInfo.firstName} {caseInfo.lastName}
                        </div>
                        <div>
                          <span className="font-medium text-slate-600">
                            Email:
                          </span>{" "}
                          {caseInfo.email || "Not provided"}
                        </div>
                        <div>
                          <span className="font-medium text-slate-600">
                            Phone:
                          </span>{" "}
                          {caseInfo.phone || "Not provided"}
                        </div>
                        <div>
                          <span className="font-medium text-slate-600">
                            Matter ID:
                          </span>{" "}
                          {caseInfo.matterId || "Not provided"}
                        </div>
                        <div>
                          <span className="font-medium text-slate-600">
                            State:
                          </span>{" "}
                          {caseInfo.state || "Not selected"}
                        </div>
                        <div>
                          <span className="font-medium text-slate-600">
                            Language:
                          </span>{" "}
                          {caseInfo.language === "en"
                            ? "English"
                            : caseInfo.language}
                        </div>
                      </div>
                    </div>

                    {/* Document List */}
                    <div className="bg-gradient-to-br from-indigo-50/80 to-blue-100/80 p-6 rounded-xl border border-indigo-200/40">
                      <h4 className="text-lg font-medium text-slate-700 mb-4">
                        Requested Documents
                      </h4>
                      <div className="space-y-2">
                        {selectedDocuments.map((doc, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-white/70 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-slate-700">{doc.name}</span>
                              {doc.optional && (
                                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                                  Optional
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Description (if AI was used) */}
                    {createMethod === "ai" && aiDescription && (
                      <div className="bg-gradient-to-br from-purple-50/80 to-violet-100/80 p-6 rounded-xl border border-purple-200/40">
                        <h4 className="text-lg font-medium text-slate-700 mb-4">
                          AI Case Description
                        </h4>
                        <p className="text-slate-600 bg-white/70 p-4 rounded-lg">
                          {aiDescription}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-6">
                      <button
                        onClick={() => handleStepTransition(4)}
                        className="text-slate-600 hover:text-slate-700 flex items-center space-x-2 transition-colors"
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
                        �����••• •••• ���••�� 4242
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
        "fixed inset-0 z-50 flex items-center justify-end pr-8 md:pr-12 lg:pr-16 transition-all duration-500",
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

      {/* Dashboard Panel - Right-Justified with Reduced Width */}
      <div
        className={cn(
          "relative w-[80%] max-w-6xl h-[90vh] bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl transition-all duration-500 ease-out flex flex-col",
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
        <div className="flex-1 overflow-hidden bg-white rounded-b-3xl">
          <div className="h-full px-12 pt-8 pb-3 overflow-y-auto">
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

      {/* Beautiful Save Template Modal */}
      {showSaveTemplateModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white/95 backdrop-blur-xl border border-slate-200/40 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Save Template</h3>
                <p className="text-slate-600 text-sm">Give your template a name to save {selectedDocuments.length} documents</p>
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="Enter template name..."
                  className="w-full p-4 bg-slate-50/50 border border-slate-200/60 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-200 focus:border-green-300 transition-all placeholder-slate-400 text-slate-700"
                  onKeyPress={(e) => e.key === 'Enter' && handleConfirmSaveTemplate()}
                  autoFocus
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowSaveTemplateModal(false);
                    setTemplateName('');
                  }}
                  className="flex-1 py-3 px-4 text-slate-600 hover:text-slate-800 hover:bg-slate-100/60 rounded-xl transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmSaveTemplate}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl transition-all font-medium shadow-lg"
                >
                  Save Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Beautiful Clear Confirmation Modal */}
      {showClearConfirmModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white/95 backdrop-blur-xl border border-slate-200/40 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Clear All Documents</h3>
                <p className="text-slate-600 text-sm">Are you sure you want to remove all {selectedDocuments.length} selected documents? This action cannot be undone.</p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowClearConfirmModal(false)}
                  className="flex-1 py-3 px-4 text-slate-600 hover:text-slate-800 hover:bg-slate-100/60 rounded-xl transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmClearAll}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl transition-all font-medium shadow-lg"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Beautiful Template Conflict Modal */}
      {showTemplateConflictModal && pendingTemplate && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white/95 backdrop-blur-xl border border-slate-200/40 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Load Template</h3>
                <p className="text-slate-600 text-sm">You have {selectedDocuments.length} documents already selected. How would you like to load the "{pendingTemplate.name}" template?</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleTemplateConflictResolve('replace')}
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl transition-all font-medium shadow-lg text-left flex items-center space-x-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <div>
                    <div className="font-semibold">Replace</div>
                    <div className="text-indigo-100 text-xs">Remove current documents and load template</div>
                  </div>
                </button>

                <button
                  onClick={() => handleTemplateConflictResolve('add')}
                  className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl transition-all font-medium shadow-lg text-left flex items-center space-x-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <div>
                    <div className="font-semibold">Add To</div>
                    <div className="text-emerald-100 text-xs">Keep current documents and add template</div>
                  </div>
                </button>

                <button
                  onClick={() => handleTemplateConflictResolve('cancel')}
                  className="w-full py-3 px-4 text-slate-600 hover:text-slate-800 hover:bg-slate-100/60 rounded-xl transition-all font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
