import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DashboardProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  className?: string;
}

type NavigationTab = "overview" | "analytics" | "reports";

export default function Dashboard({
  isOpen,
  title,
  onClose,
  className,
}: DashboardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<NavigationTab>("overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure smooth entrance
      setTimeout(() => setIsVisible(true), 50);
      setActiveTab("overview"); // Reset to overview when opening
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

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

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-1">
                      Total Users
                    </h3>
                    <div className="text-3xl font-light text-blue-600">
                      12,847
                    </div>
                  </div>
                  <svg
                    className="w-8 h-8 text-gray-400"
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
                <p className="text-sm text-gray-600 mt-2">
                  +2.4% from last week
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-6 rounded-xl border border-green-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-1">
                      Active Sessions
                    </h3>
                    <div className="text-3xl font-light text-emerald-600">
                      1,429
                    </div>
                  </div>
                  <svg
                    className="w-8 h-8 text-gray-400"
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
                <p className="text-sm text-gray-600 mt-2">Currently online</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-6 rounded-xl border border-purple-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-1">
                      Revenue
                    </h3>
                    <div className="text-3xl font-light text-purple-600">
                      $24.8K
                    </div>
                  </div>
                  <svg
                    className="w-8 h-8 text-gray-400"
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
                <p className="text-sm text-gray-600 mt-2">+15.3% this month</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-6 rounded-xl border border-amber-200/50">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {[
                  {
                    action: "New user registration",
                    time: "2 minutes ago",
                    type: "success",
                  },
                  {
                    action: "System optimization completed",
                    time: "15 minutes ago",
                    type: "info",
                  },
                  {
                    action: "Data sync in progress",
                    time: "32 minutes ago",
                    type: "warning",
                  },
                  {
                    action: "Performance metrics updated",
                    time: "1 hour ago",
                    type: "success",
                  },
                  {
                    action: "Database backup completed",
                    time: "2 hours ago",
                    type: "success",
                  },
                  {
                    action: "New feature deployed",
                    time: "3 hours ago",
                    type: "info",
                  },
                  {
                    action: "Security scan completed",
                    time: "4 hours ago",
                    type: "success",
                  },
                  {
                    action: "Cache optimization running",
                    time: "5 hours ago",
                    type: "warning",
                  },
                  {
                    action: "User feedback received",
                    time: "6 hours ago",
                    type: "info",
                  },
                  {
                    action: "API response time improved",
                    time: "7 hours ago",
                    type: "success",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 px-4 bg-white/60 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          item.type === "success" && "bg-green-400",
                          item.type === "info" && "bg-blue-400",
                          item.type === "warning" && "bg-amber-400",
                        )}
                      />
                      <span className="text-gray-700">{item.action}</span>
                    </div>
                    <span className="text-sm text-gray-500">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Overview Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-rose-50 to-pink-100 p-6 rounded-xl border border-rose-200/50">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  System Health
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">CPU Usage</span>
                    <span className="text-green-600 font-medium">23%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Memory Usage</span>
                    <span className="text-blue-600 font-medium">67%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Disk Usage</span>
                    <span className="text-amber-600 font-medium">45%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-cyan-50 to-blue-100 p-6 rounded-xl border border-cyan-200/50">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-colors">
                    Generate Monthly Report
                  </button>
                  <button className="w-full text-left p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-colors">
                    Export User Data
                  </button>
                  <button className="w-full text-left p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-colors">
                    Schedule Maintenance
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Chart */}
              <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-6 rounded-xl border border-gray-200/50">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Performance Trends
                </h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-t from-blue-100 to-blue-50 rounded-lg flex items-end justify-center p-4 space-x-2">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-blue-400 rounded-t opacity-80"
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
              <div className="bg-gradient-to-br from-rose-50 to-pink-100 p-6 rounded-xl border border-rose-200/50">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  User Demographics
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Desktop Users</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-16 h-2 bg-blue-400 rounded-full"></div>
                      </div>
                      <span className="text-sm text-gray-500">78%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Mobile Users</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-12 h-2 bg-green-400 rounded-full"></div>
                      </div>
                      <span className="text-sm text-gray-500">22%</span>
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
                  className="bg-white/80 p-4 rounded-xl border border-gray-200/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 text-sm">
                      {metric.label}
                    </span>
                    {metric.icon === "eye" && (
                      <svg
                        className="w-5 h-5 text-gray-400"
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
                        className="w-5 h-5 text-gray-400"
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
                        className="w-5 h-5 text-gray-400"
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
                        className="w-5 h-5 text-gray-400"
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
                  <div className="text-2xl font-light text-gray-800">
                    {metric.value}
                  </div>
                  <div className="text-sm text-green-600">{metric.change}</div>
                </div>
              ))}
            </div>

            {/* Additional Analytics Content */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-100 p-6 rounded-xl border border-indigo-200/50">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
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
                      color: "bg-green-400",
                    },
                    {
                      source: "Social Media",
                      percentage: 15,
                      color: "bg-purple-400",
                    },
                    {
                      source: "Referrals",
                      percentage: 8,
                      color: "bg-orange-400",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-700">{item.source}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div
                            className={`h-2 ${item.color} rounded-full`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-6 rounded-xl border border-emerald-200/50">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
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
                      className="flex justify-between items-center p-3 bg-white/60 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-gray-700">
                          {item.country}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.users} users
                        </div>
                      </div>
                      <div className="text-lg font-medium text-emerald-600">
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
                  <h3 className="text-lg font-medium text-gray-700">
                    Monthly Report
                  </h3>
                  <svg
                    className="w-6 h-6 text-gray-400"
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
                <p className="text-gray-600 text-sm mb-4">
                  Comprehensive analysis of this month's performance
                </p>
                <button className="bg-white/80 hover:bg-white transition-colors px-4 py-2 rounded-lg text-sm font-medium text-gray-700">
                  Generate Report
                </button>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-6 rounded-xl border border-emerald-200/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-700">
                    User Analytics
                  </h3>
                  <svg
                    className="w-6 h-6 text-gray-400"
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
                <p className="text-gray-600 text-sm mb-4">
                  Detailed breakdown of user behavior and engagement
                </p>
                <button className="bg-white/80 hover:bg-white transition-colors px-4 py-2 rounded-lg text-sm font-medium text-gray-700">
                  View Analytics
                </button>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-100 p-6 rounded-xl border border-violet-200/50">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
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
                      <div className="font-medium text-gray-700">
                        {report.name}
                      </div>
                      <div className="text-sm text-gray-500">{report.date}</div>
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
                <h3 className="text-lg font-medium text-gray-700 mb-4">
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
                      <div className="font-medium text-gray-700">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.frequency}
                      </div>
                      <div className="text-xs text-gray-400">
                        Next: {item.nextRun}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-100 p-6 rounded-xl border border-teal-200/50">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
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
                      className="w-full text-left p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-colors text-gray-700"
                    >
                      {template}
                    </button>
                  ))}
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
        <div className="bg-white border-b border-gray-100 rounded-t-2xl">
          <div className="flex items-center justify-between px-8 py-6">
            <div className="flex items-center space-x-12">
              <h2 className="text-2xl font-light text-gray-800 tracking-wide">
                {title}
              </h2>

              {/* Navigation Tabs */}
              <nav className="hidden md:flex items-center space-x-8">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "analytics", label: "Analytics" },
                  { id: "reports", label: "Reports" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id as NavigationTab)}
                    className={cn(
                      "text-sm font-medium transition-all duration-200 pb-1 border-b-2",
                      activeTab === tab.id
                        ? "text-gray-800 border-blue-400"
                        : "text-gray-500 hover:text-gray-700 border-transparent",
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
                  className="relative hover:bg-gray-100/50 p-2 transition-colors duration-200"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <svg
                    className="w-5 h-5 text-gray-500"
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
                  <div className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full"></div>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute top-12 right-0 w-80 bg-white rounded-xl shadow-xl border border-gray-200/50 z-50 transition-all duration-200">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-medium text-gray-800">
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
                          className="p-3 hover:bg-gray-50 border-b border-gray-50 last:border-0"
                        >
                          <div className="text-sm text-gray-700">
                            {notification.text}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-100">
                      <button className="text-sm text-blue-600 hover:text-blue-700">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Settings Icon */}
              <div className="relative" data-dropdown>
                <button
                  className="hover:bg-gray-100/50 p-2 transition-colors duration-200"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <svg
                    className="w-5 h-5 text-gray-500"
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
                  <div className="absolute top-12 right-0 w-64 bg-white rounded-xl shadow-xl border border-gray-200/50 z-50 transition-all duration-200">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-medium text-gray-800">Settings</h3>
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
                          className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center space-x-3"
                        >
                          {item.icon === "user" && (
                            <svg
                              className="w-4 h-4 text-gray-500"
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
                              className="w-4 h-4 text-gray-500"
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
                              className="w-4 h-4 text-gray-500"
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
                              className="w-4 h-4 text-gray-500"
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
                              className="w-4 h-4 text-gray-500"
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
                              className="w-4 h-4 text-gray-500"
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
                          <span className="text-sm text-gray-700">
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
                <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-medium text-gray-700">
                      Alex Chen
                    </div>
                    <div className="text-xs text-gray-500">Premium Tier</div>
                  </div>
                  <button
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200"
                    onClick={() => setShowProfile(!showProfile)}
                  >
                    <span className="text-white text-sm font-medium">AC</span>
                  </button>
                </div>

                {/* Profile Dropdown */}
                {showProfile && (
                  <div className="absolute top-12 right-0 w-72 bg-white rounded-xl shadow-xl border border-gray-200/50 z-50 transition-all duration-200">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                          <span className="text-white font-medium">AC</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">
                            Alex Chen
                          </div>
                          <div className="text-sm text-gray-500">
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
                          className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center space-x-3"
                        >
                          {item.icon === "user" && (
                            <svg
                              className="w-4 h-4 text-gray-500"
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
                              className="w-4 h-4 text-gray-500"
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
                              className="w-4 h-4 text-gray-500"
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
                              className="w-4 h-4 text-gray-500"
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
                              className="w-4 h-4 text-gray-500"
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
                              className="w-4 h-4 text-gray-500"
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
                          <span className="text-sm text-gray-700">
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
                className="hover:bg-gray-100/50 p-2 transition-colors duration-200 text-gray-500 hover:text-gray-700"
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
