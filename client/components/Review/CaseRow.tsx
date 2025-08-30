import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Case } from "./types";
import { getStatusColors } from "./utils";

interface CaseRowProps {
  case: Case;
  index: number;
  onClick: (caseItem: Case) => void;
  className?: string;
}

export function CaseRow({
  case: caseItem,
  index,
  onClick,
  className,
}: CaseRowProps) {
  const statusColors = getStatusColors(caseItem.status);

  return (
    <button
      onClick={() => onClick(caseItem)}
      className={cn(
        "w-full bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40",
        statusColors.border,
        "hover:bg-white/50 hover:shadow-lg",
        statusColors.hover,
        "hover:border-opacity-80 transition-all duration-500 p-4 rounded-2xl text-left group hover:scale-[1.01] transform",
        className,
      )}
    >
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="w-10 h-10 bg-gradient-to-br from-[#99C0F0]/80 to-[#C5BFEE]/60 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0 shadow-lg">
          <span className="text-white font-light text-sm">
            {caseItem.avatar}
          </span>
        </div>

        {/* Main Case Information */}
        <div className="flex-1 min-w-0 relative">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-light text-[#0E315C] truncate pr-20">
                {caseItem.name}
              </h3>
            </div>

            {/* Compact Right Side Stats */}
            <div className="absolute top-0 right-0 text-right flex-shrink-0">
              <div className="text-lg font-light text-[#0E315C]">
                {caseItem.progressPercent}%
              </div>
            </div>
          </div>

          {/* Extended Progress Bar */}
          <div className="pr-2 mb-1.5">
            <div className="w-full bg-[#C1D9F6]/20 rounded-full h-2 overflow-hidden">
              <div
                className={cn(
                  "h-2 rounded-full transition-all duration-700 ease-out shadow-sm",
                  statusColors.progress,
                )}
                style={{ width: `${caseItem.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Extended Statistics Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-[#0E315C]/50 font-light whitespace-nowrap overflow-hidden pr-4">
              <div className="flex items-center space-x-1.5 flex-shrink-0">
                <div
                  className={cn(
                    "w-2.5 h-2.5 rounded-full shadow-sm",
                    statusColors.dot,
                  )}
                />
                <span className="text-[#0E315C]/70 font-medium whitespace-nowrap">
                  {caseItem.status}
                </span>
              </div>
              <span className="flex-shrink-0">•</span>
              <span className="whitespace-nowrap flex-shrink-0">
                {caseItem.queueDays} days in queue
              </span>
              <span className="flex-shrink-0">•</span>
              <span className="whitespace-nowrap flex-shrink-0">
                {caseItem.lastActivity}
              </span>
            </div>

            {/* Arrow Icon */}
            <div className="flex-shrink-0">
              <ChevronRight className="w-5 h-5 text-[#0E315C]/40 group-hover:text-[#99C0F0] group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
