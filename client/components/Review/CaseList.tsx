import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Case } from "./types";
import { CaseRow } from "./CaseRow";
import { CaseRowCompact } from "./CaseRowCompact";

interface CaseListProps {
  cases: Case[];
  onCaseSelect: (caseItem: Case) => void;
  isCompact?: boolean;
  className?: string;
}

export function CaseList({
  cases,
  onCaseSelect,
  isCompact = false,
  className,
}: CaseListProps) {
  if (cases.length === 0) {
    return (
      <div
        className={cn(
          "relative z-10 flex-1 flex items-center justify-center",
          className,
        )}
      >
        <div className="bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40 rounded-3xl p-12 text-center max-w-md mx-4">
          <FileText className="w-12 h-12 mx-auto mb-4 text-[#0E315C]/30" />
          <p className="text-[#0E315C]/60 font-light">
            No cases match your current filters
          </p>
          <p className="text-[#0E315C]/40 text-sm mt-2 font-light">
            Try adjusting your search or clearing filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative z-10 h-full", className)}>
      <div
        className={cn(
          "h-full transition-all duration-300 border border-[#C1D9F6]/50 rounded-3xl mx-2 overflow-hidden",
        )}
      >
        <div
          className={cn(
            "h-full overflow-y-auto px-6 py-6",
            isCompact ? "space-y-2" : "space-y-5",
          )}
        >
          {cases.map((caseItem, index) =>
            isCompact ? (
              <CaseRowCompact
                key={caseItem.id}
                case={caseItem}
                index={index}
                onClick={onCaseSelect}
              />
            ) : (
              <CaseRow
                key={caseItem.id}
                case={caseItem}
                index={index}
                onClick={onCaseSelect}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
