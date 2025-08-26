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
        "hover:bg-white/60 hover:shadow-xl",
        statusColors.hover,
        "hover:border-opacity-90 transition-all duration-700 ease-out p-4 lg:p-3.5 md:p-3 rounded-2xl lg:rounded-xl md:rounded-lg text-left group hover:scale-[1.02] md:hover:scale-[1.01] transform",
        "min-h-[150px] lg:min-h-[130px] md:min-h-[120px] flex flex-col relative overflow-hidden",
        "hover:-translate-y-1 active:scale-[0.99] active:duration-150",
        className,
      )}
      style={{
        boxShadow: "0 4px 20px rgba(193, 217, 246, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header with Avatar, Name and Status */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="w-10 h-10 lg:w-9 lg:h-9 md:w-8 md:h-8 bg-gradient-to-br from-[#99C0F0]/90 to-[#C5BFEE]/70 rounded-xl lg:rounded-lg md:rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 flex-shrink-0 shadow-lg group-hover:shadow-xl">
            <span className="text-white font-semibold text-sm lg:text-xs md:text-xs group-hover:scale-110 transition-transform duration-300">
              {caseItem.avatar}
            </span>
          </div>
          <h3 className="text-lg lg:text-base md:text-sm font-semibold text-[#0E315C] leading-tight group-hover:text-[#0E315C]/90 transition-colors duration-300 truncate min-w-0" title={caseItem.name}>
            {caseItem.name}
          </h3>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <div
            className={cn(
              "w-2.5 h-2.5 rounded-full shadow-md",
              statusColors.dot,
            )}
          />
        </div>
      </div>

      {/* Case Information */}
      <div className="flex-1">

        {/* Progress Section */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#0E315C]/70 font-semibold uppercase tracking-wide truncate">
              {caseItem.progress}
            </span>
            <span className="text-sm font-bold text-[#0E315C] bg-[#C1D9F6]/15 px-1.5 py-0.5 rounded-md flex-shrink-0">
              {caseItem.progressPercent}%
            </span>
          </div>
          <div className="w-full bg-[#C1D9F6]/25 rounded-full h-2 overflow-hidden shadow-inner">
            <div
              className={cn(
                "h-2 rounded-full transition-all duration-1000 ease-out shadow-sm relative overflow-hidden",
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
      <div className="space-y-2 pt-3 border-t border-[#C1D9F6]/30">
        <div className="flex items-center space-x-2 text-xs text-[#0E315C]/70 bg-[#C1D9F6]/10 px-2.5 py-1.5 rounded-lg">
          <Clock className="w-3 h-3 text-[#99C0F0] flex-shrink-0" />
          <span className="font-medium truncate">{caseItem.lastActivity}</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-[#0E315C]/70 bg-[#C1D9F6]/10 px-2.5 py-1.5 rounded-lg">
          <Calendar className="w-3 h-3 text-[#C5BFEE] flex-shrink-0" />
          <span className="font-medium truncate">{caseItem.queueDays} days in queue</span>
        </div>
      </div>

    </button>
  );
}
