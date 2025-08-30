import { useState, useMemo } from "react";

// Types
export interface ProposedTask {
  id: string;
  title: string;
  description: string;
  agent: string;
  priority: "high" | "medium" | "low";
  category: "email" | "reminder" | "analysis" | "action" | "follow-up";
  estimatedTime: string;
  targetPerson?: string;
  createdAt: Date;
}

// Sample data - in real app this would come from API
const initialTasks: ProposedTask[] = [
  {
    id: "1",
    title: "Send Reminder Email to David Thompson",
    description: "Follow up on pending contract review that was due 3 days ago. Include deadline extension options.",
    agent: "EmailBot",
    priority: "high",
    category: "email",
    estimatedTime: "2 min",
    targetPerson: "David Thompson",
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "2", 
    title: "Schedule Meeting with Marketing Team",
    description: "Coordinate availability for Q4 campaign planning session. Include Sarah, Mike, and Lisa.",
    agent: "SchedulerBot",
    priority: "medium",
    category: "action",
    estimatedTime: "5 min",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "3",
    title: "Analyze Customer Feedback Report",
    description: "Review and summarize the latest quarterly customer satisfaction survey results.",
    agent: "AnalyticsBot",
    priority: "medium", 
    category: "analysis",
    estimatedTime: "15 min",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
  },
  {
    id: "4",
    title: "Update Project Status Dashboard",
    description: "Refresh all project timelines and milestone statuses for the executive team.",
    agent: "ReportBot",
    priority: "low",
    category: "action",
    estimatedTime: "8 min",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
  },
  {
    id: "5",
    title: "Follow up on Invoice #INV-2024-0892",
    description: "Contact billing department about overdue payment from Acme Corp. Amount: $15,230.",
    agent: "FinanceBot",
    priority: "high",
    category: "follow-up",
    estimatedTime: "3 min",
    targetPerson: "Acme Corp Finance Dept",
    createdAt: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
  },
  {
    id: "6",
    title: "Send Weekly Performance Summary",
    description: "Compile and distribute team performance metrics to department heads.",
    agent: "ReportBot",
    priority: "low",
    category: "email",
    estimatedTime: "4 min",
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
    removeTasks,
    filterAndSortTasks,
  };
}
