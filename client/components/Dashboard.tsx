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
                  { action: 'Security scan completed', time: '4 hours ago', type: 'success' },
                  { action: 'Cache optimization running', time: '5 hours ago', type: 'warning' },
                  { action: 'User feedback received', time: '6 hours ago', type: 'info' },
                  { action: 'API response time improved', time: '7 hours ago', type: 'success' },
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

            {/* Additional Overview Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-rose-50 to-pink-100 p-6 rounded-xl border border-rose-200/50">
                <h3 className="text-lg font-medium text-gray-700 mb-4">System Health</h3>
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
                <h3 className="text-lg font-medium text-gray-700 mb-4">Quick Actions</h3>
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

            {/* Additional Analytics Content */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-100 p-6 rounded-xl border border-indigo-200/50">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Traffic Sources</h3>
                <div className="space-y-4">
                  {[
                    { source: 'Direct Traffic', percentage: 45, color: 'bg-blue-400' },
                    { source: 'Search Engines', percentage: 32, color: 'bg-green-400' },
                    { source: 'Social Media', percentage: 15, color: 'bg-purple-400' },
                    { source: 'Referrals', percentage: 8, color: 'bg-orange-400' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">{item.source}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div className={`h-2 ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-6 rounded-xl border border-emerald-200/50">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Geographic Distribution</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { country: 'United States', users: '4,247', percentage: 34 },
                    { country: 'United Kingdom', users: '2,156', percentage: 17 },
                    { country: 'Canada', users: '1,834', percentage: 15 },
                    { country: 'Germany', users: '1,542', percentage: 12 },
                    { country: 'France', users: '1,098', percentage: 9 },
                    { country: 'Others', users: '1,970', percentage: 13 }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-700">{item.country}</div>
                        <div className="text-sm text-gray-500">{item.users} users</div>
                      </div>
                      <div className="text-lg font-medium text-emerald-600">{item.percentage}%</div>
                    </div>
                  ))}
                </div>
              </div>
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
                  { name: 'Security Audit Report', date: 'Dec 20, 2023', status: 'completed' },
                  { name: 'Monthly Traffic Analysis', date: 'Dec 15, 2023', status: 'completed' },
                  { name: 'Customer Satisfaction Survey', date: 'Dec 10, 2023', status: 'completed' },
                  { name: 'Performance Optimization Report', date: 'Dec 5, 2023', status: 'completed' }
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

            {/* Additional Reports Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-orange-50 to-red-100 p-6 rounded-xl border border-orange-200/50">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Scheduled Reports</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Weekly Performance Report', frequency: 'Every Monday', nextRun: 'Jan 8, 2024' },
                    { name: 'Monthly Analytics Summary', frequency: 'First of month', nextRun: 'Feb 1, 2024' },
                    { name: 'Quarterly Business Review', frequency: 'Every quarter', nextRun: 'Apr 1, 2024' }
                  ].map((item, index) => (
                    <div key={index} className="p-3 bg-white/60 rounded-lg">
                      <div className="font-medium text-gray-700">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.frequency}</div>
                      <div className="text-xs text-gray-400">Next: {item.nextRun}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-100 p-6 rounded-xl border border-teal-200/50">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Report Templates</h3>
                <div className="space-y-2">
                  {[
                    'Executive Dashboard',
                    'Technical Performance',
                    'User Behavior Analysis',
                    'Financial Summary',
                    'Security Assessment',
                    'Custom Report Builder'
                  ].map((template, index) => (
                    <button key={index} className="w-full text-left p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-colors text-gray-700">
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
          "relative w-full max-w-4xl h-[85vh] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl transition-all duration-500 ease-out flex flex-col",
          isVisible
            ? "transform translate-x-0 opacity-100 scale-100"
            : "transform translate-x-full opacity-0 scale-95"
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
                  { id: 'overview', label: 'Overview' },
                  { id: 'analytics', label: 'Analytics' },
                  { id: 'reports', label: 'Reports' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as NavigationTab)}
                    className={cn(
                      "text-sm font-medium transition-all duration-200 pb-1 border-b-2",
                      activeTab === tab.id
                        ? "text-gray-800 border-blue-400"
                        : "text-gray-500 hover:text-gray-700 border-transparent"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-6">
              {/* Notification Icon */}
              <button className="relative hover:bg-gray-100/50 p-2 transition-colors duration-200">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full"></div>
              </button>

              {/* Settings Icon */}
              <button className="hover:bg-gray-100/50 p-2 transition-colors duration-200">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              {/* User Profile */}
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium text-gray-700">Alex Chen</div>
                  <div className="text-xs text-gray-500">Premium Tier</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-sm">
                  <span className="text-white text-sm font-medium">AC</span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="hover:bg-gray-100/50 p-2 transition-colors duration-200 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden bg-white rounded-b-2xl">
          <div className="h-full p-8 overflow-y-auto">
            <div className="transition-all duration-300 ease-in-out">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
