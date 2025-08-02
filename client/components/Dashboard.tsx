import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface DashboardProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  className?: string;
}

type NavigationTab = 'overview' | 'analytics' | 'reports';

export default function Dashboard({ isOpen, title, onClose, className }: DashboardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure smooth entrance
      setTimeout(() => setIsVisible(true), 50);
      setActiveTab('overview'); // Reset to overview when opening
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-1">Total Users</h3>
                    <div className="text-3xl font-light text-blue-600">12,847</div>
                  </div>
                  <span className="text-3xl">👥</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">+2.4% from last week</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-6 rounded-xl border border-green-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-1">Active Sessions</h3>
                    <div className="text-3xl font-light text-emerald-600">1,429</div>
                  </div>
                  <span className="text-3xl">⚡</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Currently online</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-6 rounded-xl border border-purple-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-1">Revenue</h3>
                    <div className="text-3xl font-light text-purple-600">$24.8K</div>
                  </div>
                  <span className="text-3xl">💰</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">+15.3% this month</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-6 rounded-xl border border-amber-200/50">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Recent Activity</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {[
                  { action: 'New user registration', time: '2 minutes ago', type: 'success' },
                  { action: 'System optimization completed', time: '15 minutes ago', type: 'info' },
                  { action: 'Data sync in progress', time: '32 minutes ago', type: 'warning' },
                  { action: 'Performance metrics updated', time: '1 hour ago', type: 'success' },
                  { action: 'Database backup completed', time: '2 hours ago', type: 'success' },
                  { action: 'New feature deployed', time: '3 hours ago', type: 'info' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 px-4 bg-white/60 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        item.type === 'success' && "bg-green-400",
                        item.type === 'info' && "bg-blue-400",
                        item.type === 'warning' && "bg-amber-400"
                      )} />
                      <span className="text-gray-700">{item.action}</span>
                    </div>
                    <span className="text-sm text-gray-500">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Chart */}
              <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-6 rounded-xl border border-gray-200/50">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Performance Trends</h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-t from-blue-100 to-blue-50 rounded-lg flex items-end justify-center p-4 space-x-2">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-blue-400 rounded-t opacity-80"
                        style={{
                          height: `${30 + Math.random() * 50}%`,
                          width: '6%'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* User Demographics */}
              <div className="bg-gradient-to-br from-rose-50 to-pink-100 p-6 rounded-xl border border-rose-200/50">
                <h3 className="text-lg font-medium text-gray-700 mb-4">User Demographics</h3>
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
                { label: 'Page Views', value: '125.4K', change: '+12%', icon: '👁️' },
                { label: 'Bounce Rate', value: '23.7%', change: '-3%', icon: '🔄' },
                { label: 'Session Duration', value: '4m 32s', change: '+8%', icon: '⏱️' },
                { label: 'Conversion Rate', value: '3.4%', change: '+1.2%', icon: '🎯' }
              ].map((metric, index) => (
                <div key={index} className="bg-white/80 p-4 rounded-xl border border-gray-200/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 text-sm">{metric.label}</span>
                    <span className="text-lg">{metric.icon}</span>
                  </div>
                  <div className="text-2xl font-light text-gray-800">{metric.value}</div>
                  <div className="text-sm text-green-600">{metric.change}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-6">
            {/* Report Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-100 p-6 rounded-xl border border-indigo-200/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-700">Monthly Report</h3>
                  <span className="text-2xl">📊</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">Comprehensive analysis of this month's performance</p>
                <button className="bg-white/80 hover:bg-white transition-colors px-4 py-2 rounded-lg text-sm font-medium text-gray-700">
                  Generate Report
                </button>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-6 rounded-xl border border-emerald-200/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-700">User Analytics</h3>
                  <span className="text-2xl">📈</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">Detailed breakdown of user behavior and engagement</p>
                <button className="bg-white/80 hover:bg-white transition-colors px-4 py-2 rounded-lg text-sm font-medium text-gray-700">
                  View Analytics
                </button>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-100 p-6 rounded-xl border border-violet-200/50">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Recent Reports</h3>
              <div className="space-y-3">
                {[
                  { name: 'Q4 Performance Summary', date: 'Dec 31, 2023', status: 'completed' },
                  { name: 'User Engagement Analysis', date: 'Dec 28, 2023', status: 'completed' },
                  { name: 'Revenue Breakdown Report', date: 'Dec 25, 2023', status: 'processing' },
                  { name: 'Security Audit Report', date: 'Dec 20, 2023', status: 'completed' }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between py-3 px-4 bg-white/60 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-700">{report.name}</div>
                      <div className="text-sm text-gray-500">{report.date}</div>
                    </div>
                    <div className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      report.status === 'completed' && "bg-green-100 text-green-700",
                      report.status === 'processing' && "bg-yellow-100 text-yellow-700"
                    )}>
                      {report.status}
                    </div>
                  </div>
                ))}
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
        className
      )}
    >
      {/* Backdrop */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      
      {/* Dashboard Panel */}
      <div 
        className={cn(
          "relative w-full max-w-4xl h-[85vh] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl transition-all duration-500 ease-out",
          isVisible 
            ? "transform translate-x-0 opacity-100 scale-100" 
            : "transform translate-x-full opacity-0 scale-95"
        )}
      >
        {/* Navigation Bar */}
        <div className="bg-gradient-to-r from-gray-50/80 to-white/60 backdrop-blur-sm border-b border-gray-200/40">
          <div className="flex items-center justify-between px-8 py-5">
            <div className="flex items-center space-x-8">
              <h2 className="text-2xl font-light text-gray-800 tracking-wide">
                {title}
              </h2>

              {/* Navigation Tabs */}
              <nav className="hidden md:flex items-center bg-white/60 rounded-full p-1 shadow-sm border border-gray-200/50">
                {[
                  { id: 'overview', label: 'Overview', icon: '📊' },
                  { id: 'analytics', label: 'Analytics', icon: '📈' },
                  { id: 'reports', label: 'Reports', icon: '📋' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as NavigationTab)}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                      activeTab === tab.id
                        ? "bg-white text-gray-800 shadow-sm border border-gray-200/50"
                        : "text-gray-600 hover:text-gray-800 hover:bg-white/40"
                    )}
                  >
                    <span className="text-xs">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notification Icon */}
              <button className="relative p-2 rounded-full hover:bg-gray-100/50 transition-colors duration-200">
                <span className="text-gray-500 text-lg">🔔</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full border-2 border-white"></div>
              </button>

              {/* Settings Icon */}
              <button className="p-2 rounded-full hover:bg-gray-100/50 transition-colors duration-200">
                <span className="text-gray-500 text-lg">⚙️</span>
              </button>

              {/* User Profile */}
              <div className="flex items-center space-x-3 bg-white/60 rounded-full pl-1 pr-4 py-1 border border-gray-200/50">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-sm">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-700">Alex Chen</div>
                  <div className="text-xs text-gray-500">Premium Tier</div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-200/60 hover:bg-gray-300/60 transition-colors duration-200 flex items-center justify-center text-gray-600 hover:text-gray-800 shadow-sm"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full p-8 overflow-y-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
