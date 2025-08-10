import { useState } from "react";
import { cn } from "@/lib/utils";

interface RecentActivityTableProps {
  activities: any[];
  onCaseSelect: (caseItem: any) => void;
}

export default function RecentActivityTable({
  activities,
  onCaseSelect,
}: RecentActivityTableProps) {
  const [hoveredCaseIndex, setHoveredCaseIndex] = useState<number | null>(null);

  return (
    <div className="bg-white/90 border border-slate-200/40 rounded-2xl shadow-sm backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200/40 bg-white/60">
        <h3 className="text-lg font-semibold text-slate-800">
          Recent Activity
        </h3>
        <p className="text-sm text-slate-600 mt-1">Latest 3 case updates</p>
      </div>

      {/* Activities List */}
      <div className="divide-y divide-slate-200/30">
        {activities.slice(0, 3).map((activity, index) => {
          const isTopFocused = index === 0; // Only top item gets enhanced styling

          return (
            <div
              key={activity.caseId + index}
              className="group cursor-pointer transition-all duration-200 ease-out hover:bg-slate-50/60"
              onClick={() => onCaseSelect(activity)}
              onMouseEnter={() => setHoveredCaseIndex(index)}
              onMouseLeave={() => setHoveredCaseIndex(null)}
            >
              <div className="px-6 py-4">
                {/* Case Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3 flex-1">
                    <div
                      className={cn(
                        "rounded-lg flex items-center justify-center shadow-sm transition-all duration-200",
                        isTopFocused
                          ? "w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600"
                          : "w-9 h-9 bg-gradient-to-br from-slate-500 to-slate-600",
                      )}
                    >
                      <span className="text-white font-semibold text-xs">
                        {activity.avatar}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 min-w-0">
                      <h3
                        className={cn(
                          "font-semibold transition-all duration-200 truncate",
                          isTopFocused
                            ? "text-slate-800 text-base"
                            : "text-slate-700 text-sm",
                        )}
                      >
                        {activity.name}
                      </h3>
                      <span className="text-slate-500 text-xs font-mono italic flex-shrink-0">
                        {activity.caseId}
                      </span>
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div
                    className={cn(
                      "transition-all duration-200 flex-shrink-0",
                      isTopFocused
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-70",
                    )}
                  >
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
                        "h-full rounded-full transition-all duration-200",
                        activity.status === "Complete"
                          ? "bg-gradient-to-r from-emerald-500 to-green-600"
                          : activity.status === "Needs Review"
                            ? "bg-gradient-to-r from-purple-500 to-violet-600"
                            : "bg-gradient-to-r from-sky-500 to-blue-600",
                      )}
                      style={{
                        width:
                          activity.status === "Complete"
                            ? "100%"
                            : activity.status === "Needs Review"
                              ? "100%"
                              : "80%",
                      }}
                    />
                  </div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  {/* Status */}
                  <div className="flex items-center space-x-1.5">
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        activity.status === "Complete" && "bg-emerald-500",
                        activity.status === "Needs Review" && "bg-purple-500",
                        activity.status === "Awaiting Documents" &&
                          "bg-sky-500",
                      )}
                    />
                    <span
                      className={cn(
                        "text-xs font-semibold whitespace-nowrap",
                        activity.statusColor,
                      )}
                    >
                      {activity.status}
                    </span>
                  </div>

                  {/* Tasks/Date Info */}
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
                        {activity.tasksInfo.split(" ")[0]}
                      </span>
                      <span className="text-slate-500 ml-1">
                        {activity.tasksInfo.split(" ").slice(1, 3).join(" ")}
                      </span>
                    </span>
                  </div>

                  {/* Days in Queue */}
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
                        {activity.daysInQueue.split(" ")[0]}
                      </span>
                      <span className="text-slate-500 ml-1">Days</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
