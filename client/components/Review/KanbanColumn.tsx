import { cn } from "@/lib/utils";
import { Case, CaseStatus } from "./types";
import { KanbanCard } from "./KanbanCard";
import { getStatusColors } from "./utils";

interface KanbanColumnProps {
  title: string;
  status: CaseStatus;
  cases: Case[];
  onCaseSelect: (caseItem: Case) => void;
  className?: string;
}

export function KanbanColumn({
  title,
  status,
  cases,
  onCaseSelect,
  className,
}: KanbanColumnProps) {
  const statusColors = getStatusColors(status);

  return (
    <div
      className={cn(
        "flex flex-col min-w-[320px] lg:min-w-[280px] md:min-w-[260px] snap-start mb-4",
        className,
      )}
    >
      {/* Column Header */}
      <div className="mb-4 flex-shrink-0 animate-slideInLeft" style={{ animationDelay: `${cases.length * 50}ms` }}>
        <div className="bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40 rounded-2xl p-3 shadow-lg hover:shadow-xl hover:shadow-[#99C0F0]/5 transition-all duration-500 group hover:bg-white/40 hover:border-[#C1D9F6]/60">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center space-x-3 min-w-0 flex-1 overflow-hidden pr-2">
              <div className="relative flex-shrink-0">
                <div
                  className={cn(
                    "w-3 h-3 rounded-full shadow-lg animate-gentlePulse",
                    statusColors.dot,
                  )}
                />
                <div
                  className={cn(
                    "absolute inset-0 w-3 h-3 rounded-full opacity-30 animate-ping",
                    statusColors.dot,
                  )}
                />
              </div>
              <h2
                className="text-lg font-semibold text-[#0E315C] group-hover:text-[#0E315C]/90 transition-colors duration-300 truncate min-w-0"
                title={title}
              >
                {title}
              </h2>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className="flex items-center space-x-1">
                <span className="text-xs text-[#0E315C]/60 font-medium uppercase tracking-wide">
                  Cases
                </span>
                <span
                  className={cn(
                    "text-sm font-bold text-white px-2 py-1 rounded-full shadow-lg transition-all duration-300",
                    statusColors.progress,
                    "group-hover:scale-110 group-hover:shadow-xl"
                  )}
                >
                  {cases.length}
                </span>
              </div>
            </div>
          </div>

          {/* Progress bar showing completion ratio */}
          {cases.length > 0 && (
            <div className="mt-3 pt-2 border-t border-[#C1D9F6]/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#0E315C]/60 font-medium">
                  Progress Overview
                </span>
                <span className="text-xs text-[#0E315C]/80 font-semibold">
                  {Math.round(cases.reduce((sum, c) => sum + c.progressPercent, 0) / cases.length)}% avg
                </span>
              </div>
              <div className="w-full bg-[#C1D9F6]/20 rounded-full h-1.5 overflow-hidden">
                <div
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-1000 ease-out",
                    statusColors.progress,
                  )}
                  style={{
                    width: `${cases.reduce((sum, c) => sum + c.progressPercent, 0) / cases.length}%`
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cases Container */}
      <div className="">
        <div className="border border-[#C1D9F6]/50 rounded-3xl">
          <div className="px-6 py-6">
            <div className="space-y-5">
              {cases.length === 0 ? (
                <div className="bg-white/20 backdrop-blur-md border border-[#C1D9F6]/30 rounded-3xl p-10 text-center group hover:bg-white/25 transition-all duration-500">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#C1D9F6]/20 to-[#99C0F0]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full animate-gentlePulse",
                        statusColors.dot,
                        "opacity-40",
                      )}
                    />
                  </div>
                  <p className="text-[#0E315C]/60 text-base font-medium mb-2">
                    No cases in this status
                  </p>
                  <p className="text-[#0E315C]/40 text-sm font-light">
                    Cases will appear here when they reach this stage
                  </p>

                  {/* Dashed drop zone indicator */}
                  <div className="mt-6 border-2 border-dashed border-[#C1D9F6]/30 rounded-2xl p-6 group-hover:border-[#C1D9F6]/50 transition-colors duration-300">
                    <div className="text-xs text-[#0E315C]/30 font-medium uppercase tracking-wider">
                      Drop Zone
                    </div>
                  </div>
                </div>
              ) : (
                cases.map((caseItem, index) => (
                  <KanbanCard
                    key={caseItem.id}
                    case={caseItem}
                    index={index}
                    onClick={onCaseSelect}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
