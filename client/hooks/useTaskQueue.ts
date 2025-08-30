import { useState, useMemo } from "react";

// Types
export interface ProposedTask {
  id: string;
  title: string;
  description: string;
  agent: string;
  priority: "high" | "medium" | "low";
  category: "email" | "review";
  estimatedTime: string;
  targetPerson?: string;
  createdAt: Date;
}


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
