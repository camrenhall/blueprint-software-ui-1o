import { useState, useMemo } from "react";

// Types
export interface ProposedTask {
  id: string;
  title: string;
  description: string;
  justification: string;
  agent: string;
  category: "email" | "review";
  targetPerson?: string;
  createdAt: Date;
  emailContent?: {
    subject: string;
    content: string;
    to: string[];
    cc?: string[];
  };
}

// Sample data - in real app this would come from API
const initialTasks: ProposedTask[] = [
  {
    id: "1",
    title: "Send Email to David Thompson",
    description: "Follow up on pending contract review deadline",
    justification:
      "David Thompson's contract review was due 3 days ago and has not been submitted. This is blocking the Q4 planning process for his department. A follow-up email is necessary to ensure timely completion and maintain project schedules.",
    agent: "EmailBot",
    category: "email",
    targetPerson: "David Thompson",
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    emailContent: {
      subject: "Follow-up: Contract Review Due",
      content:
        "Dear Mr. Thompson,\n\nI hope this email finds you well. I'm writing to follow up on the contract review that was due on [Date]. As this is a critical component of our Q4 planning process, we need to move forward with the review as soon as possible.\n\nCould you please provide an update on the status of your review? If you need any additional time or have questions about specific sections, please let me know and we can discuss possible accommodations.\n\nThank you for your attention to this matter.\n\nBest regards,\nLuceron Legal Team",
      to: ["david.thompson@company.com"],
      cc: ["assistant@luceron.com"],
    },
  },
  {
    id: "2",
    title: "Review Documents for Sarah Miller",
    description: "Quarterly compliance audit materials",
    justification:
      "Sarah Miller submitted her quarterly compliance documents yesterday. These need to be reviewed for completeness and accuracy before the external audit next week. Early review will prevent any last-minute issues.",
    agent: "ReviewBot",
    category: "review",
    targetPerson: "Sarah Miller",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "3",
    title: "Send Email to Jessica Chen",
    description: "Project timeline update and next steps",
    justification:
      "The Phoenix project timeline has been updated with new milestones. Jessica Chen, as project lead, needs to be informed of the changes and coordinate with her team. This communication will ensure everyone stays aligned with the revised schedule.",
    agent: "EmailBot",
    category: "email",
    targetPerson: "Jessica Chen",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    emailContent: {
      subject: "Project Timeline Update - Phoenix Initiative",
      content:
        "Dear Jessica,\n\nI wanted to update you on some important changes to the Phoenix project timeline. After reviewing our current progress and resource allocation, we've adjusted several key milestones.\n\nKey Updates:\n• Phase 1 completion moved to [New Date]\n• Stakeholder review meeting rescheduled\n• Additional development sprint added for Q1\n\nPlease review the attached updated timeline and coordinate with your team to ensure alignment. I'd like to schedule a brief call this week to discuss any concerns and next steps.\n\nLet me know your availability for Thursday or Friday afternoon.\n\nBest regards,\nProject Management Office",
      to: ["jessica.chen@company.com"],
      cc: ["pm-team@company.com"],
    },
  },
  {
    id: "4",
    title: "Review Documents for Michael Rodriguez",
    description: "Insurance claim documentation check",
    justification:
      "Michael Rodriguez filed an insurance claim for equipment damage last month. The insurance company has requested additional documentation. This review will ensure all required documents are present and properly formatted before resubmission.",
    agent: "ReviewBot",
    category: "review",
    targetPerson: "Michael Rodriguez",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
  },
  {
    id: "5",
    title: "Send Email to Emma Davis",
    description: "Urgent invoice payment reminder",
    justification:
      "Invoice #INV-2024-0892 for $15,230 is now 45 days overdue from Emma Davis's company. This represents a significant accounts receivable concern. An urgent reminder is needed to maintain cash flow and client relationships.",
    agent: "EmailBot",
    category: "email",
    targetPerson: "Emma Davis",
    createdAt: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    emailContent: {
      subject: "Urgent: Outstanding Invoice Payment - INV-2024-0892",
      content:
        "Dear Ms. Davis,\n\nI hope this message finds you well. I'm writing regarding Invoice #INV-2024-0892 in the amount of $15,230.00, which is now 45 days past due.\n\nWe understand that payment processing can sometimes experience delays, and we want to work with you to resolve this matter promptly. Please let us know if there are any issues with the invoice or if you need to discuss payment arrangements.\n\nTo avoid any impact on future services, please remit payment within the next 5 business days. If payment has already been sent, please provide the transaction details so we can update our records.\n\nThank you for your immediate attention to this matter.\n\nSincerely,\nAccounts Receivable Department\nLuceron Legal",
      to: ["emma.davis@company.com"],
      cc: ["accounting@luceron.com"],
    },
  },
  {
    id: "6",
    title: "Review Documents for Alex Johnson",
    description: "Employee onboarding paperwork verification",
    justification:
      "Alex Johnson starts work next Monday as a new software engineer. HR has submitted his onboarding paperwork for verification. This review ensures all required forms are complete and properly signed before his start date.",
    agent: "ReviewBot",
    category: "review",
    targetPerson: "Alex Johnson",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
  },
];

export type TaskSortOption = "createdAt" | "alphabetical";

export function useTaskQueue() {
  const [tasks, setTasks] = useState<ProposedTask[]>(initialTasks);

  const taskCount = useMemo(() => tasks.length, [tasks]);

  const removeTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const filterAndSortTasks = (
    searchValue: string = "",
    activeFilters: string[] = [],
    sortBy: TaskSortOption = "createdAt",
  ) => {
    let filtered = tasks;

    // Apply search filter
    if (searchValue.trim()) {
      const search = searchValue.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search) ||
          task.agent.toLowerCase().includes(search) ||
          task.targetPerson?.toLowerCase().includes(search),
      );
    }

    // Apply category filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter((task) => {
        return activeFilters.includes(task.category);
      });
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "createdAt":
          return b.createdAt.getTime() - a.createdAt.getTime();
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
