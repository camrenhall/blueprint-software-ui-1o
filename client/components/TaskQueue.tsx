import { useState, useEffect, useMemo } from "react";
import { Check, X, CheckCircle2, Clock, User, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { TaskSearchFilterBar, TaskSortOption } from "./TaskSearchFilterBar";

// Types
interface ProposedTask {
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

interface FeedbackModalProps {
  task: ProposedTask | null;
  onClose: () => void;
  onSubmit: (taskId: string, feedback: string) => void;
}

// Sample data - in real app this would come from API
const sampleTasks: ProposedTask[] = [
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

// Feedback Modal Component
function FeedbackModal({ task, onClose, onSubmit }: FeedbackModalProps) {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!task) return null;

  const handleSubmit = async () => {
    if (!feedback.trim()) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
    onSubmit(task.id, feedback);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 max-w-lg mx-4 shadow-2xl border border-[#C1D9F6]/30 animate-fadeInUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#99C0F0]/90 to-[#C5BFEE]/70 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-[#0E315C] mb-2">
            Why decline this task?
          </h3>
          <p className="text-[#0E315C]/60 text-sm font-light">
            Your feedback helps our agents learn and improve.
          </p>
        </div>

        <div className="bg-[#C1D9F6]/10 p-4 rounded-2xl mb-6">
          <h4 className="font-medium text-[#0E315C] mb-1 text-sm">{task.title}</h4>
          <p className="text-[#0E315C]/70 text-xs">{task.description}</p>
        </div>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Please explain why you're declining this task..."
          className="w-full p-4 bg-white/60 backdrop-blur-sm border border-[#C1D9F6]/40 rounded-xl text-[#0E315C] placeholder:text-[#0E315C]/50 focus:outline-none focus:ring-2 focus:ring-[#99C0F0]/30 focus:border-[#99C0F0]/60 transition-all duration-300 resize-none"
          rows={4}
          autoFocus
        />

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-white/60 backdrop-blur-sm border border-[#C1D9F6]/40 text-[#0E315C] rounded-xl hover:bg-white/80 transition-all duration-300 font-medium"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!feedback.trim() || isSubmitting}
            className="flex-1 px-6 py-3 bg-[#99C0F0] hover:bg-[#0E315C] text-white rounded-xl transition-all duration-300 font-medium shadow-lg shadow-[#99C0F0]/20 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Priority badge component
function PriorityBadge({ priority }: { priority: ProposedTask["priority"] }) {
  const colors = {
    high: "bg-red-100/80 text-red-700 border-red-200",
    medium: "bg-yellow-100/80 text-yellow-700 border-yellow-200",
    low: "bg-green-100/80 text-green-700 border-green-200",
  };

  return (
    <span className={cn(
      "px-2 py-0.5 rounded-lg text-xs font-medium capitalize backdrop-blur-sm border",
      colors[priority]
    )}>
      {priority}
    </span>
  );
}


// Individual task card component
interface TaskCardProps {
  task: ProposedTask;
  index: number;
  isSelected: boolean;
  onToggleSelect: (taskId: string) => void;
  onAccept: (taskId: string) => void;
  onDecline: (taskId: string) => void;
  isExpanded: boolean;
  onToggleExpand: (taskId: string) => void;
}

function TaskCard({
  task,
  index,
  isSelected,
  onToggleSelect,
  onAccept,
  onDecline,
  isExpanded,
  onToggleExpand
}: TaskCardProps) {
  const timeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffHours > 0) return `${diffHours}h ago`;
    return `${diffMinutes}m ago`;
  };

  const getPriorityColors = (priority: ProposedTask["priority"]) => {
    switch (priority) {
      case "high":
        return {
          dot: "bg-red-400 shadow-red-400/40",
          border: "border-red-300/50"
        };
      case "medium":
        return {
          dot: "bg-yellow-400 shadow-yellow-400/40",
          border: "border-yellow-300/50"
        };
      case "low":
        return {
          dot: "bg-green-400 shadow-green-400/40",
          border: "border-green-300/50"
        };
    }
  };

  const priorityColors = getPriorityColors(task.priority);

  return (
    <div
      className={cn(
        "bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40",
        priorityColors.border,
        "hover:bg-white/50 hover:shadow-lg hover:border-opacity-80",
        "transition-all duration-500 p-6 rounded-3xl text-left group hover:scale-[1.02] transform",
        "animate-fadeInUp",
        isSelected && "ring-2 ring-[#99C0F0]/60 bg-white/50"
      )}
      style={{
        animationDelay: `${index * 100}ms`,
        boxShadow: "0 4px 20px rgba(193, 217, 246, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div className="flex items-start space-x-5">
        {/* Selection Checkbox */}
        <button
          onClick={() => onToggleSelect(task.id)}
          className={cn(
            "w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 mt-1",
            isSelected
              ? "bg-[#99C0F0] border-[#99C0F0] text-white"
              : "border-[#C1D9F6]/60 hover:border-[#99C0F0]/80 bg-white/60 backdrop-blur-sm"
          )}
        >
          {isSelected && <Check className="w-3 h-3" />}
        </button>

        {/* Category Icon (Avatar-like) */}
        <div className="w-12 h-12 bg-gradient-to-br from-[#99C0F0]/80 to-[#C5BFEE]/60 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0 shadow-lg">
          <span className="text-white font-light text-lg">
            {task.category === "email" ? "📧" : task.category === "reminder" ? "⏰" : task.category === "analysis" ? "📊" : task.category === "action" ? "⚡" : "🔄"}
          </span>
        </div>

        {/* Main Task Information */}
        <div className="flex-1 min-w-0 relative">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg font-light text-[#0E315C] truncate pr-24">
                  {task.title}
                </h3>
                <PriorityBadge priority={task.priority} />
              </div>
              {task.targetPerson && (
                <div className="flex items-center gap-1 mb-3">
                  <User className="w-3 h-3 text-[#99C0F0]" />
                  <span className="text-sm text-[#0E315C]/60 font-light">{task.targetPerson}</span>
                </div>
              )}
              {task.description && (
                <p className={cn(
                  "text-[#0E315C]/60 text-sm font-light mb-3 pr-24 leading-relaxed",
                  !isExpanded && task.description.length > 100 && "line-clamp-2"
                )}>
                  {task.description}
                </p>
              )}
              {task.description.length > 100 && (
                <button
                  onClick={() => onToggleExpand(task.id)}
                  className="text-[#99C0F0] hover:text-[#0E315C] text-xs font-medium mb-3 flex items-center gap-1 transition-colors duration-300"
                >
                  {isExpanded ? (
                    <>Show less <ChevronUp className="w-3 h-3" /></>
                  ) : (
                    <>Show more <ChevronDown className="w-3 h-3" /></>
                  )}
                </button>
              )}
            </div>

            {/* Right Side - Priority Status */}
            <div className="absolute top-0 right-0 text-right flex-shrink-0">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={cn(
                    "w-2.5 h-2.5 rounded-full shadow-sm animate-gentlePulse",
                    priorityColors.dot
                  )}
                />
                <span className="text-sm text-[#0E315C]/70 font-medium capitalize">
                  {task.priority}
                </span>
              </div>
              <div className="text-xs text-[#0E315C]/60 font-light">
                Est. {task.estimatedTime}
              </div>
            </div>
          </div>

          {/* Task Metadata Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-[#0E315C]/50 font-light whitespace-nowrap overflow-hidden pr-6">
              <span className="text-[#0E315C]/70 font-medium flex-shrink-0">
                {task.agent}
              </span>
              <span className="flex-shrink-0">•</span>
              <span className="whitespace-nowrap flex-shrink-0">
                Proposed {timeAgo(task.createdAt)}
              </span>
              <span className="flex-shrink-0">•</span>
              <span className="whitespace-nowrap flex-shrink-0 capitalize">
                {task.category}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => onAccept(task.id)}
                className="bg-[#99C0F0] hover:bg-[#0E315C] text-white px-4 py-2 rounded-xl transition-all duration-300 font-medium text-sm shadow-lg shadow-[#99C0F0]/20 hover:shadow-xl hover:scale-105 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Accept
              </button>
              <button
                onClick={() => onDecline(task.id)}
                className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-[#C1D9F6]/40 text-[#0E315C] rounded-xl hover:bg-white/80 hover:border-red-300 hover:text-red-600 transition-all duration-300 font-medium text-sm flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main TaskQueue component
interface TaskQueueProps {
  onClose: () => void;
}

export default function TaskQueue({ onClose }: TaskQueueProps) {
  const [tasks, setTasks] = useState(sampleTasks);
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [feedbackModalTask, setFeedbackModalTask] = useState<ProposedTask | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<TaskSortOption>("priority");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
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

    // Apply category and priority filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter(task => {
        return activeFilters.some(filter => {
          if (filter === `${task.priority}-priority`) return true;
          if (filter === task.category) return true;
          return false;
        });
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
  }, [tasks, searchValue, activeFilters, sortBy]);

  const handleToggleSelect = (taskId: string) => {
    const newSelected = new Set(selectedTasks);
    if (newSelected.has(taskId)) {
      newSelected.delete(taskId);
    } else {
      newSelected.add(taskId);
    }
    setSelectedTasks(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedTasks.size === filteredAndSortedTasks.length) {
      setSelectedTasks(new Set());
    } else {
      setSelectedTasks(new Set(filteredAndSortedTasks.map(t => t.id)));
    }
  };

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  const handleAcceptTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    setSelectedTasks(prev => {
      const newSet = new Set(prev);
      newSet.delete(taskId);
      return newSet;
    });
    // In real app, would make API call to accept task
  };

  const handleDeclineTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setFeedbackModalTask(task);
    }
  };

  const handleFeedbackSubmit = (taskId: string, feedback: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    setSelectedTasks(prev => {
      const newSet = new Set(prev);
      newSet.delete(taskId);
      return newSet;
    });
    setFeedbackModalTask(null);
    // In real app, would make API call to decline task with feedback
    console.log(`Task ${taskId} declined with feedback:`, feedback);
  };

  const handleAcceptSelected = () => {
    setTasks(tasks.filter(t => !selectedTasks.has(t.id)));
    setSelectedTasks(new Set());
    // In real app, would make API call to accept selected tasks
  };

  const handleToggleExpand = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  return (
    <div className="h-[85vh] max-h-[85vh] min-h-[85vh] px-8 lg:px-6 md:px-4 py-8 lg:py-6 md:py-4 relative flex flex-col rounded-[2rem] lg:rounded-[1.5rem] md:rounded-[1.25rem]">
      {/* Enhanced Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-[#C1D9F6]/15 to-[#99C0F0]/10 blur-2xl rounded-[2rem] lg:rounded-[1.5rem] md:rounded-[1.25rem]" />
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-[2rem] lg:rounded-[1.5rem] md:rounded-[1.25rem]" />
      {/* Header */}
      <div className="relative z-10 text-center mb-8 flex-shrink-0">
        <div className="transition-all duration-1000 ease-out delay-300 opacity-100 transform translate-y-0">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl lg:text-3xl md:text-2xl font-light text-[#0E315C] tracking-wide">
              Task Queue
            </h1>
            <div className="px-3 py-1 bg-[#C5BFEE]/20 text-[#0E315C] text-xs font-medium rounded-full border border-[#C5BFEE]/30 animate-fadeIn">
              Agent Proposals
            </div>
          </div>
          <p className="text-[#0E315C]/70 text-base leading-relaxed">
            Review and manage proposed actions from your AI agents
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-0 right-0 w-10 h-10 rounded-full flex items-center justify-center text-[#0E315C]/50 hover:text-[#0E315C] hover:bg-[#C1D9F6]/25 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Control panel */}
      <div className="relative z-10 mb-6">
        {tasks.length > 0 && (
          <div className={cn(
            "bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40 rounded-3xl p-5 animate-fadeInUp",
            "shadow-lg"
          )} style={{ animationDelay: "300ms" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSelectAll}
                  className="flex items-center gap-3 text-[#0E315C] hover:text-[#99C0F0] transition-colors duration-300 font-light"
                >
                  <div className={cn(
                    "w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300",
                    selectedTasks.size === tasks.length
                      ? "bg-[#99C0F0] border-[#99C0F0] text-white"
                      : selectedTasks.size > 0
                      ? "bg-[#99C0F0]/20 border-[#99C0F0] text-[#99C0F0]"
                      : "border-[#C1D9F6]/60 hover:border-[#99C0F0]/80 bg-white/60 backdrop-blur-sm"
                  )}>
                    {selectedTasks.size === tasks.length ? (
                      <Check className="w-3 h-3" />
                    ) : selectedTasks.size > 0 ? (
                      <div className="w-2 h-2 bg-current rounded-sm" />
                    ) : null}
                  </div>
                  <span className="text-lg">
                    {selectedTasks.size === 0
                      ? "Select All"
                      : selectedTasks.size === tasks.length
                      ? "Deselect All"
                      : `${selectedTasks.size} Selected`}
                  </span>
                </button>
              </div>

              {selectedTasks.size > 0 && (
                <button
                  onClick={handleAcceptSelected}
                  className="bg-[#99C0F0] hover:bg-[#0E315C] text-white px-6 py-3 rounded-2xl transition-all duration-300 font-light text-base shadow-lg shadow-[#99C0F0]/20 hover:shadow-xl hover:scale-105 flex items-center gap-2 animate-slideInLeft"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Accept {selectedTasks.size} Task{selectedTasks.size !== 1 ? 's' : ''}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Task list */}
      <div className="relative z-10 h-full">
        {tasks.length === 0 ? (
          <div className="relative z-10 flex-1 flex items-center justify-center h-full">
            <div className="bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40 rounded-3xl p-12 text-center max-w-md mx-4">
              <div className="w-24 h-24 bg-gradient-to-br from-[#99C0F0]/20 to-[#C5BFEE]/20 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-gentlePulse">
                <CheckCircle2 className="w-12 h-12 text-[#99C0F0]" />
              </div>
              <h3 className="text-xl font-light text-[#0E315C] mb-2">All caught up!</h3>
              <p className="text-[#0E315C]/60 text-sm font-light">No pending tasks from your agents at the moment.</p>
            </div>
          </div>
        ) : (
          <div className="h-full transition-all duration-300 border border-[#C1D9F6]/50 rounded-3xl mx-2 overflow-hidden">
            <div className="h-full overflow-y-auto px-6 py-6 space-y-5">
              {tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  isSelected={selectedTasks.has(task.id)}
                  onToggleSelect={handleToggleSelect}
                  onAccept={handleAcceptTask}
                  onDecline={handleDeclineTask}
                  isExpanded={expandedTasks.has(task.id)}
                  onToggleExpand={handleToggleExpand}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        task={feedbackModalTask}
        onClose={() => setFeedbackModalTask(null)}
        onSubmit={handleFeedbackSubmit}
      />

    </div>
  );
}
