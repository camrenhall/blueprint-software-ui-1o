import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Case } from './types';
import { getStatusColors } from './utils';

interface CaseRowProps {
  case: Case;
  index: number;
  onClick: (caseItem: Case) => void;
  className?: string;
}

export function CaseRow({ case: caseItem, index, onClick, className }: CaseRowProps) {
  const statusColors = getStatusColors(caseItem.status);

  return (
    <button
      onClick={() => onClick(caseItem)}
      className={cn(
        "w-full bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40",
        statusColors.border,
        "hover:bg-white/50 hover:shadow-lg",
        statusColors.hover,
        "hover:border-opacity-80 transition-all duration-500 p-6 rounded-3xl text-left group",
        className
      )}
      style={{
        animationDelay: `${index * 100}ms`,
        animation: "fadeInUp 0.6s ease-out forwards"
      }}
    >
      <div className="flex items-start space-x-5">
        {/* Avatar */}
        <div className="w-12 h-12 bg-gradient-to-br from-[#99C0F0]/80 to-[#C5BFEE]/60 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0 shadow-lg">
          <span className="text-white font-light text-sm">{caseItem.avatar}</span>
        </div>

        {/* Main Case Information */}
        <div className="flex-1 min-w-0 relative">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-light text-[#0E315C] mb-1 truncate pr-24">{caseItem.name}</h3>
              <p className="text-[#0E315C]/60 text-sm font-light mb-3 pr-24">{caseItem.caseId}</p>
            </div>

            {/* Compact Right Side Stats */}
            <div className="absolute top-0 right-0 text-right flex-shrink-0">
              <div className="text-xl font-light text-[#0E315C] mb-1">{caseItem.progressPercent}%</div>
              <div className="text-sm text-[#0E315C]/60 font-light whitespace-nowrap">{caseItem.progress}</div>
            </div>
          </div>

          {/* Extended Progress Bar */}
          <div className="pr-2 mb-2">
            <div className="w-full bg-[#C1D9F6]/20 rounded-full h-2 overflow-hidden">
              <div
                className={cn(
                  "h-2 rounded-full transition-all duration-700 ease-out shadow-sm",
                  statusColors.progress
                )}
                style={{ width: `${caseItem.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Extended Statistics Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-[#0E315C]/50 font-light whitespace-nowrap overflow-hidden pr-6">
              <div className="flex items-center space-x-1.5 flex-shrink-0">
                <div className={cn("w-2.5 h-2.5 rounded-full shadow-sm", statusColors.dot)} />
                <span className="text-[#0E315C]/70 font-medium whitespace-nowrap">{caseItem.status}</span>
              </div>
              <span className="flex-shrink-0">•</span>
              <span className="whitespace-nowrap flex-shrink-0">{caseItem.queueDays} days in queue</span>
              <span className="flex-shrink-0">•</span>
              <span className="whitespace-nowrap flex-shrink-0">{caseItem.lastActivity}</span>
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
