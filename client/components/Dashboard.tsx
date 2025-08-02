import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface DashboardProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  className?: string;
}

export default function Dashboard({ isOpen, title, onClose, className }: DashboardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure smooth entrance
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

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
        <div className="flex items-center justify-between px-8 py-4 border-b border-gray-200/30">
          <div className="flex items-center space-x-6">
            <h2 className="text-2xl font-light text-gray-800 tracking-wide">
              {title}
            </h2>
            <nav className="hidden md:flex items-center space-x-4">
              <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 px-3 py-1 rounded-full hover:bg-gray-100/50">
                Overview
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 px-3 py-1 rounded-full hover:bg-gray-100/50">
                Analytics
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 px-3 py-1 rounded-full hover:bg-gray-100/50">
                Reports
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 px-3 py-1 rounded-full hover:bg-gray-100/50">
                Settings
              </button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <span className="text-sm text-gray-700 hidden sm:block">Alex Chen</span>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-200/50 hover:bg-gray-300/50 transition-colors duration-200 flex items-center justify-center text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
              {/* Metric Cards */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-5 rounded-xl border border-blue-200/50">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Activity Overview</h3>
                  <div className="text-3xl font-light text-blue-600 mb-1">2,847</div>
                  <p className="text-sm text-gray-600">Total interactions this week</p>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-5 rounded-xl border border-green-200/50">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Performance</h3>
                  <div className="text-3xl font-light text-emerald-600 mb-1">94.2%</div>
                  <p className="text-sm text-gray-600">System efficiency rating</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-5 rounded-xl border border-purple-200/50">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Growth</h3>
                  <div className="text-3xl font-light text-purple-600 mb-1">+12.5%</div>
                  <p className="text-sm text-gray-600">Increase from last month</p>
                </div>
              </div>

              {/* Chart Area */}
              <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-5 rounded-xl border border-gray-200/50">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Analytics Visualization</h3>
                <div className="h-48 flex items-center justify-center">
                  {/* Placeholder Chart */}
                  <div className="w-full h-full bg-gradient-to-t from-blue-100 to-blue-50 rounded-lg flex items-end justify-center p-4 space-x-2">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-blue-400 rounded-t opacity-80"
                        style={{
                          height: `${20 + Math.random() * 60}%`,
                          width: '6%',
                          animationDelay: `${i * 100}ms`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-gradient-to-br from-amber-50 to-orange-100 p-5 rounded-xl border border-amber-200/50">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Recent Activity</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {[
                    { action: 'New user registration', time: '2 minutes ago', type: 'success' },
                    { action: 'System optimization completed', time: '15 minutes ago', type: 'info' },
                    { action: 'Data sync in progress', time: '32 minutes ago', type: 'warning' },
                    { action: 'Performance metrics updated', time: '1 hour ago', type: 'success' },
                    { action: 'Database backup completed', time: '2 hours ago', type: 'success' },
                    { action: 'New feature deployed', time: '3 hours ago', type: 'info' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 px-3 bg-white/60 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          item.type === 'success' && "bg-green-400",
                          item.type === 'info' && "bg-blue-400",
                          item.type === 'warning' && "bg-amber-400"
                        )} />
                        <span className="text-gray-700 text-sm">{item.action}</span>
                      </div>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
