export type CaseStatus = "Needs Review" | "Awaiting Documents" | "Complete";

export interface Case {
  id: string;
  name: string;
  caseId: string;
  status: CaseStatus;
  progress: string;
  progressPercent: number;
  lastActivity: string;
  queueDays: number;
  avatar: string;
}

export interface FilterOption {
  id: string;
  label: string;
  status: CaseStatus;
  color: {
    dot: string;
    progress: string;
    hover: string;
    border: string;
    active: string;
  };
}

export interface StatusColors {
  dot: string;
  progress: string;
  hover: string;
  border: string;
}
