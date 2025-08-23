import { Clock, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Case } from "./types";
import { getStatusColors } from "./utils";

interface KanbanCardProps {
  case: Case;
  index: number;
  onClick: (caseItem: Case) => void;
  className?: string;
}

export function KanbanCard({
  case: caseItem,
  index,
  onClick,
  className,
}: KanbanCardProps) {
  const statusColors = getStatusColors(caseItem.status);

  return (
    <button
      onClick={() => onClick(caseItem)}
      className={cn(
        "w-full bg-white/35 backdrop-blur-md border border-[#C1D9F6]/40",
        statusColors.border,
        "hover:bg-white/60 hover:shadow-xl hover:shadow-[#99C0F0]/10",
        statusColors.hover,
        "hover:border-opacity-90 transition-all duration-700 ease-out p-6 rounded-3xl text-left group hover:scale-[1.03] transform",
        "animate-fadeInUp min-h-[220px] flex flex-col relative overflow-hidden",
        "hover:-translate-y-1 active:scale-[0.99] active:duration-150",
        className,
      )}
      style={{
        animationDelay: `${index * 120}ms`,
        boxShadow: "0 4px 20px rgba(193, 217, 246, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header with Avatar and Status */}
      <div className="flex items-start justify-between mb-5">
        <div className="w-14 h-14 bg-gradient-to-br from-[#99C0F0]/90 to-[#C5BFEE]/70 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 flex-shrink-0 shadow-lg group-hover:shadow-xl">
          <span className="text-white font-semibold text-base group-hover:scale-110 transition-transform duration-300">
            {caseItem.avatar}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={cn(
              "w-3.5 h-3.5 rounded-full shadow-md animate-gentlePulse",
              statusColors.dot,
            )}
          />
        </div>
      </div>

      {/* Case Information */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-[#0E315C] mb-2 leading-tight group-hover:text-[#0E315C]/90 transition-colors duration-300">
          {caseItem.name}
        </h3>
        <p className="text-[#0E315C]/60 text-sm font-medium mb-5 bg-[#C1D9F6]/10 px-3 py-1.5 rounded-lg border border-[#C1D9F6]/20">
          {caseItem.caseId}
        </p>

        {/* Progress Section */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#0E315C]/70 font-semibold uppercase tracking-wide">
              {caseItem.progress}
            </span>
            <span className="text-lg font-bold text-[#0E315C] bg-[#C1D9F6]/15 px-2 py-1 rounded-lg">
              {caseItem.progressPercent}%
            </span>
          </div>
          <div className="w-full bg-[#C1D9F6]/25 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className={cn(
                "h-3 rounded-full transition-all duration-1000 ease-out shadow-sm relative overflow-hidden",
                statusColors.progress,
                "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent",
                "before:transform before:-skew-x-12 before:translate-x-[-100%] group-hover:before:translate-x-[100%] before:transition-transform before:duration-700",
              )}
              style={{ width: `${caseItem.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer with Stats */}
      <div className="space-y-3 pt-4 border-t border-[#C1D9F6]/30">
        <div className="flex items-center space-x-3 text-xs text-[#0E315C]/70 bg-[#C1D9F6]/10 px-3 py-2 rounded-lg">
          <Clock className="w-4 h-4 text-[#99C0F0]" />
          <span className="font-medium">{caseItem.lastActivity}</span>
        </div>
        <div className="flex items-center space-x-3 text-xs text-[#0E315C]/70 bg-[#C1D9F6]/10 px-3 py-2 rounded-lg">
          <Calendar className="w-4 h-4 text-[#C5BFEE]" />
          <span className="font-medium">{caseItem.queueDays} days in queue</span>
        </div>
      </div>

      {/* Enhanced Hover Effects */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

        {/* Pulse indicator */}
        <div className="absolute top-4 right-4 w-3 h-3 bg-[#99C0F0] rounded-full animate-gentlePulse shadow-lg" />

        {/* Corner glow */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#99C0F0]/20 to-transparent rounded-3xl" />
      </div>
    </button>
  );
}
