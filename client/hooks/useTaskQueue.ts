import { useState, useMemo } from "react";

// Types
export interface ProposedTask {
  id: string;
  title: string;
  description: string;
  justification: string;
  agent: string;
  priority: "high" | "medium" | "low";
  category: "email" | "review";
  estimatedTime: string;
  targetPerson?: string;
  createdAt: Date;
}

// Sample data - in real app this would come from API
const initialTasks: ProposedTask[] = [
  {
    id: "1",
    title: "Send Email to David Thompson",
    description: "Follow up on pending contract review deadline",
    justification: "David Thompson's contract review was due 3 days ago and has not been submitted. This is blocking the Q4 planning process for his department. A follow-up email is necessary to ensure timely completion and maintain project schedules.",
    agent: "EmailBot",
    priority: "high",
    category: "email",
    estimatedTime: "2 min",
    targetPerson: "David Thompson",
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "2",
    title: "Review Documents for Sarah Miller",
    description: "Quarterly compliance audit materials",
    justification: "Sarah Miller submitted her quarterly compliance documents yesterday. These need to be reviewed for completeness and accuracy before the external audit next week. Early review will prevent any last-minute issues.",
    agent: "ReviewBot",
    priority: "medium",
    category: "review",
    estimatedTime: "5 min",
    targetPerson: "Sarah Miller",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "3",
    title: "Send Email to Jessica Chen",
    description: "Project timeline update and next steps",
    justification: "The Phoenix project timeline has been updated with new milestones. Jessica Chen, as project lead, needs to be informed of the changes and coordinate with her team. This communication will ensure everyone stays aligned with the revised schedule.",
    agent: "EmailBot",
    priority: "medium",
    category: "email",
    estimatedTime: "15 min",
    targetPerson: "Jessica Chen",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
  },
  {
    id: "4",
    title: "Review Documents for Michael Rodriguez",
    description: "Insurance claim documentation check",
    justification: "Michael Rodriguez filed an insurance claim for equipment damage last month. The insurance company has requested additional documentation. This review will ensure all required documents are present and properly formatted before resubmission.",
    agent: "ReviewBot",
    priority: "low",
    category: "review",
    estimatedTime: "8 min",
    targetPerson: "Michael Rodriguez",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
  },
  {
    id: "5",
    title: "Send Email to Emma Davis",
    description: "Urgent invoice payment reminder",
    justification: "Invoice #INV-2024-0892 for $15,230 is now 45 days overdue from Emma Davis's company. This represents a significant accounts receivable concern. An urgent reminder is needed to maintain cash flow and client relationships.",
    agent: "EmailBot",
    priority: "high",
    category: "email",
    estimatedTime: "3 min",
    targetPerson: "Emma Davis",
    createdAt: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
  },
  {
    id: "6",
    title: "Review Documents for Alex Johnson",
    description: "Employee onboarding paperwork verification",
    justification: "Alex Johnson starts work next Monday as a new software engineer. HR has submitted his onboarding paperwork for verification. This review ensures all required forms are complete and properly signed before his start date.",
    agent: "ReviewBot",
    priority: "low",
    category: "review",
    estimatedTime: "4 min",
    targetPerson: "Alex Johnson",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
  },
];

export type TaskSortOption = "priority" | "createdAt" | "estimatedTime" | "alphabetical";

export function useTaskQueue() {
  const [tasks, setTasks] = useState<ProposedTask[]>(initialTasks);

  const taskCount = useMemo(() => tasks.length, [tasks]);

  const removeTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };


  const filterAndSortTasks = (
    searchValue: string = "",
    activeFilters: string[] = [],
    sortBy: TaskSortOption = "createdAt"
  ) => {
    let filtered = tasks;

    // Apply search filter
    if (searchValue.trim()) {
      const search = searchValue.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search) ||
        task.agent.toLowerCase().includes(search) ||
        task.targetPerson?.toLowerCase().includes(search)
      );
    }

    // Apply category filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter(task => {
        return activeFilters.includes(task.category);
      });
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "createdAt":
          return b.createdAt.getTime() - a.createdAt.getTime();
        case "estimatedTime":
          const getMinutes = (timeStr: string) => {
            const match = timeStr.match(/(\d+)/);
            return match ? parseInt(match[1]) : 0;
          };
          return getMinutes(a.estimatedTime) - getMinutes(b.estimatedTime);
        case "alphabetical":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return sorted;
  };

  return {
    tasks,
    taskCount,
    removeTask,
    filterAndSortTasks,
  };
}
