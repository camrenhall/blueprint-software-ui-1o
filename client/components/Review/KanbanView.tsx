import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Case, CaseStatus } from "./types";
import { KanbanColumn } from "./KanbanColumn";

interface KanbanViewProps {
  cases: Case[];
  onCaseSelect: (caseItem: Case) => void;
  className?: string;
}

export function KanbanView({
  cases,
  onCaseSelect,
  className,
}: KanbanViewProps) {
  // Group cases by status
  const columnData = useMemo(() => {
    const columns: {
      title: string;
      status: CaseStatus;
      cases: Case[];
    }[] = [
      {
        title: "Awaiting Documents",
        status: "Awaiting Documents",
        cases: cases.filter((c) => c.status === "Awaiting Documents"),
      },
      {
        title: "Needs Review",
        status: "Needs Review", 
        cases: cases.filter((c) => c.status === "Needs Review"),
      },
      {
        title: "Complete",
        status: "Complete",
        cases: cases.filter((c) => c.status === "Complete"),
      },
    ];

    return columns;
  }, [cases]);

  return (
    <div className={cn("relative z-10 flex-1 overflow-hidden", className)}>
      <div className="h-full px-2">
        <div className="h-full flex gap-6">
          {columnData.map((column, index) => (
            <KanbanColumn
              key={column.status}
              title={column.title}
              status={column.status}
              cases={column.cases}
              onCaseSelect={onCaseSelect}
              className={cn(
                "transition-all duration-1000 ease-out opacity-100 transform translate-y-0",
              )}
              style={{
                animationDelay: `${index * 200}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
