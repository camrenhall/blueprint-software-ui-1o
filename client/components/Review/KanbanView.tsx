import { useMemo, useState, useEffect } from "react";
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
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
    <div className={cn("relative z-10 h-full overflow-hidden", className)}>
      {/* Background enhancement */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#C1D9F6]/8 via-transparent to-[#99C0F0]/8 pointer-events-none" />
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(193, 217, 246, 0.1) 0%, transparent 50%),
                         radial-gradient(circle at 80% 20%, rgba(153, 192, 240, 0.1) 0%, transparent 50%),
                         radial-gradient(circle at 40% 80%, rgba(197, 191, 238, 0.1) 0%, transparent 50%)`
      }} />

      <div className="h-full mx-2">
        <div className="h-full border border-[#C1D9F6]/50 rounded-3xl overflow-hidden relative">
          <div className="h-full overflow-y-auto document-scroll">
            <div className="px-6 lg:px-4 md:px-3 py-6 pb-8">
              <div className="flex gap-8 lg:gap-6 md:gap-4 sm:gap-3 items-start">
                {columnData.map((column, index) => (
                  <KanbanColumn
                    key={column.status}
                    title={column.title}
                    status={column.status}
                    cases={column.cases}
                    onCaseSelect={onCaseSelect}
                    className=""
                  />
                ))}
              </div>
            </div>

            {/* Floating elements for visual enhancement */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-[#C1D9F6]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-[#99C0F0]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-[#C5BFEE]/10 rounded-full blur-xl pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
