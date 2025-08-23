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
        "w-full bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40",
        statusColors.border,
        "hover:bg-white/50 hover:shadow-lg",
        statusColors.hover,
        "hover:border-opacity-80 transition-all duration-500 p-5 rounded-2xl text-left group hover:scale-[1.02] transform",
        "animate-fadeInUp min-h-[200px] flex flex-col",
        className,
      )}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Header with Avatar and Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-[#99C0F0]/80 to-[#C5BFEE]/60 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0 shadow-lg">
          <span className="text-white font-medium text-sm">
            {caseItem.avatar}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={cn(
              "w-3 h-3 rounded-full shadow-sm",
              statusColors.dot,
            )}
          />
        </div>
      </div>

      {/* Case Information */}
      <div className="flex-1">
        <h3 className="text-lg font-medium text-[#0E315C] mb-2 line-clamp-2 leading-tight">
          {caseItem.name}
        </h3>
        <p className="text-[#0E315C]/60 text-sm font-light mb-4">
          {caseItem.caseId}
        </p>

        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#0E315C]/70 font-medium">
              {caseItem.progress}
            </span>
            <span className="text-sm font-semibold text-[#0E315C]">
              {caseItem.progressPercent}%
            </span>
          </div>
          <div className="w-full bg-[#C1D9F6]/20 rounded-full h-2.5 overflow-hidden">
            <div
              className={cn(
                "h-2.5 rounded-full transition-all duration-700 ease-out shadow-sm",
                statusColors.progress,
              )}
              style={{ width: `${caseItem.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer with Stats */}
      <div className="space-y-3 pt-2 border-t border-[#C1D9F6]/20">
        <div className="flex items-center space-x-2 text-xs text-[#0E315C]/60">
          <Clock className="w-3.5 h-3.5" />
          <span>{caseItem.lastActivity}</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-[#0E315C]/60">
          <Calendar className="w-3.5 h-3.5" />
          <span>{caseItem.queueDays} days in queue</span>
        </div>
      </div>

      {/* Hover Indicator */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute top-3 right-3 w-2 h-2 bg-[#99C0F0] rounded-full animate-gentlePulse" />
      </div>
    </button>
  );
}
