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
        "flex-1 min-h-0 flex flex-col",
        className,
      )}
    >
      {/* Column Header */}
      <div className="mb-6 flex-shrink-0">
        <div className="bg-white/20 backdrop-blur-sm border border-[#C1D9F6]/30 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={cn(
                  "w-4 h-4 rounded-full shadow-sm",
                  statusColors.dot,
                )}
              />
              <h2 className="text-lg font-medium text-[#0E315C]">
                {title}
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-[#0E315C] bg-[#C1D9F6]/20 px-3 py-1 rounded-full border border-[#C1D9F6]/30">
                {cases.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cases Container */}
      <div className="flex-1 min-h-0 overflow-y-auto document-scroll">
        <div className="space-y-4 pb-4">
          {cases.length === 0 ? (
            <div className="bg-white/15 backdrop-blur-sm border border-[#C1D9F6]/20 rounded-2xl p-8 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-[#C1D9F6]/20 rounded-xl flex items-center justify-center">
                <div
                  className={cn(
                    "w-6 h-6 rounded-full",
                    statusColors.dot,
                    "opacity-50",
                  )}
                />
              </div>
              <p className="text-[#0E315C]/50 text-sm font-light">
                No cases in this status
              </p>
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
  );
}
