import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Case } from './types';
import { CaseRow } from './CaseRow';

interface CaseListProps {
  cases: Case[];
  onCaseSelect: (caseItem: Case) => void;
  className?: string;
}

export function CaseList({ cases, onCaseSelect, className }: CaseListProps) {
  if (cases.length === 0) {
    return (
      <div className={cn("relative z-10 flex-1 flex items-center justify-center", className)}>
        <div className="bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40 rounded-3xl p-12 text-center max-w-md mx-4">
          <FileText className="w-12 h-12 mx-auto mb-4 text-[#0E315C]/30" />
          <p className="text-[#0E315C]/60 font-light">No cases match your current filters</p>
          <p className="text-[#0E315C]/40 text-sm mt-2 font-light">Try adjusting your search or clearing filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative z-10 flex-1 overflow-y-auto", className)}>
      <div className="space-y-5 pr-2">
        {cases.map((caseItem, index) => (
          <CaseRow
            key={caseItem.id}
            case={caseItem}
            index={index}
            onClick={onCaseSelect}
          />
        ))}
      </div>
    </div>
  );
}
