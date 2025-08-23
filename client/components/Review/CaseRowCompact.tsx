import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Case } from "./types";
import { getStatusColors } from "./utils";

interface CaseRowCompactProps {
  case: Case;
  index: number;
  onClick: (caseItem: Case) => void;
  className?: string;
}

export function CaseRowCompact({
  case: caseItem,
  index,
  onClick,
  className,
}: CaseRowCompactProps) {
  const statusColors = getStatusColors(caseItem.status);

  return (
    <button
      onClick={() => onClick(caseItem)}
      className={cn(
        "w-full bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40",
        statusColors.border,
        "hover:bg-white/50 hover:shadow-md",
        statusColors.hover,
        "hover:border-opacity-80 transition-all duration-300 px-4 py-3 rounded-xl text-left group hover:scale-[1.02] transform",
        className,
      )}
    >
      <div className="flex items-center space-x-3">
        {/* Compact Avatar */}
        <div className="w-8 h-8 bg-gradient-to-br from-[#99C0F0]/80 to-[#C5BFEE]/60 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200 flex-shrink-0 shadow-sm">
          <span className="text-white font-medium text-xs">
            {caseItem.avatar}
          </span>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center flex-shrink-0">
          <div
            className={cn(
              "w-2.5 h-2.5 rounded-full shadow-sm",
              statusColors.dot,
            )}
          />
        </div>

        {/* Main Information - Flexible Layout */}
        <div className="flex-1 min-w-0 flex items-center justify-between">
          {/* Left Side - Name and Case ID */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-medium text-[#0E315C] truncate max-w-[200px]">
                {caseItem.name}
              </h3>
              <span className="text-xs text-[#0E315C]/50 font-light flex-shrink-0">
                {caseItem.caseId}
              </span>
            </div>
          </div>

          {/* Center - Last Activity (Hidden on small screens) */}
          <div className="hidden md:flex items-center px-4 flex-shrink-0">
            <span className="text-xs text-[#0E315C]/60 font-light whitespace-nowrap">
              {caseItem.lastActivity}
            </span>
          </div>

          {/* Right Side - Progress and Arrow */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Progress Percentage */}
            <div className="flex items-center space-x-2">
              <div className="text-sm font-medium text-[#0E315C]">
                {caseItem.progressPercent}%
              </div>
              {/* Mini Progress Bar */}
              <div className="w-12 h-1.5 bg-[#C1D9F6]/30 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500 ease-out",
                    statusColors.progress,
                  )}
                  style={{ width: `${caseItem.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Arrow */}
            <ChevronRight className="w-4 h-4 text-[#0E315C]/40 group-hover:text-[#99C0F0] group-hover:translate-x-0.5 transition-all duration-200" />
          </div>
        </div>
      </div>
    </button>
  );
}
