import { useState, useEffect } from "react";
import { Check, X, CheckCircle2, Clock, User, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

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
    high: "bg-gradient-to-r from-red-400/80 to-red-500/80 text-white",
    medium: "bg-gradient-to-r from-yellow-400/80 to-yellow-500/80 text-white", 
    low: "bg-gradient-to-r from-green-400/80 to-green-500/80 text-white",
  };

  return (
    <span className={cn(
      "px-2 py-1 rounded-full text-xs font-medium capitalize backdrop-blur-sm",
      colors[priority]
    )}>
      {priority}
    </span>
  );
}

// Category icon component
function CategoryIcon({ category }: { category: ProposedTask["category"] }) {
  const iconMap = {
    email: "📧",
    reminder: "⏰", 
    analysis: "📊",
    action: "⚡",
    "follow-up": "🔄"
  };

  return (
    <span className="w-8 h-8 bg-gradient-to-br from-[#99C0F0]/20 to-[#C5BFEE]/20 rounded-lg flex items-center justify-center text-sm">
      {iconMap[category]}
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

  return (
    <div
      className={cn(
        "bg-white/35 backdrop-blur-md border border-[#C1D9F6]/40",
        "hover:bg-white/50 hover:shadow-xl hover:border-[#99C0F0]/60",
        "transition-all duration-500 ease-out p-5 rounded-2xl group",
        "animate-fadeInUp hover:-translate-y-1 hover:scale-[1.01]",
        isSelected && "ring-2 ring-[#99C0F0]/60 bg-white/50"
      )}
      style={{ 
        animationDelay: `${index * 100}ms`,
        boxShadow: "0 4px 20px rgba(193, 217, 246, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Header with selection checkbox, category, and priority */}
      <div className="flex items-start gap-4 mb-4">
        <button
          onClick={() => onToggleSelect(task.id)}
          className={cn(
            "w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 mt-0.5",
            isSelected 
              ? "bg-[#99C0F0] border-[#99C0F0] text-white" 
              : "border-[#C1D9F6]/60 hover:border-[#99C0F0]/80 bg-white/60 backdrop-blur-sm"
          )}
        >
          {isSelected && <Check className="w-3 h-3" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <CategoryIcon category={task.category} />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#0E315C] text-lg leading-tight group-hover:text-[#0E315C]/90 transition-colors duration-300">
                  {task.title}
                </h3>
                {task.targetPerson && (
                  <div className="flex items-center gap-1 mt-1">
                    <User className="w-3 h-3 text-[#99C0F0]" />
                    <span className="text-xs text-[#0E315C]/70 font-medium">{task.targetPerson}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <PriorityBadge priority={task.priority} />
            </div>
          </div>

          {/* Description - collapsible */}
          <div className="mb-4">
            <p className={cn(
              "text-[#0E315C]/70 text-sm leading-relaxed transition-all duration-300",
              !isExpanded && "line-clamp-2"
            )}>
              {task.description}
            </p>
            {task.description.length > 100 && (
              <button
                onClick={() => onToggleExpand(task.id)}
                className="text-[#99C0F0] hover:text-[#0E315C] text-xs font-medium mt-1 flex items-center gap-1 transition-colors duration-300"
              >
                {isExpanded ? (
                  <>Show less <ChevronUp className="w-3 h-3" /></>
                ) : (
                  <>Show more <ChevronDown className="w-3 h-3" /></>
                )}
              </button>
            )}
          </div>

          {/* Task metadata */}
          <div className="flex items-center gap-4 mb-4 text-xs text-[#0E315C]/60">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#C5BFEE]" />
              <span>Est. {task.estimatedTime}</span>
            </div>
            <span>•</span>
            <span>Proposed {timeAgo(task.createdAt)}</span>
            <span>•</span>
            <span className="font-medium text-[#99C0F0]">{task.agent}</span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => onAccept(task.id)}
              className="flex-1 bg-[#99C0F0] hover:bg-[#0E315C] text-white px-4 py-2.5 rounded-xl transition-all duration-300 font-medium text-sm shadow-lg shadow-[#99C0F0]/20 hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Accept Task
            </button>
            <button
              onClick={() => onDecline(task.id)}
              className="px-4 py-2.5 bg-white/60 backdrop-blur-sm border border-[#C1D9F6]/40 text-[#0E315C] rounded-xl hover:bg-white/80 hover:border-red-300 hover:text-red-600 transition-all duration-300 font-medium text-sm flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Decline
            </button>
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

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
    if (selectedTasks.size === tasks.length) {
      setSelectedTasks(new Set());
    } else {
      setSelectedTasks(new Set(tasks.map(t => t.id)));
    }
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
    <div className={cn(
      "w-full h-full flex flex-col transition-all duration-800 ease-out",
      isVisible ? "opacity-100" : "opacity-0"
    )}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-light text-[#0E315C] mb-2 animate-slideInLeft">
              Task Queue
            </h1>
            <p className="text-[#0E315C]/60 text-sm font-light animate-slideInLeft" style={{ animationDelay: "200ms" }}>
              Review and manage proposed actions from your AI agents
            </p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-[#99C0F0]/90 to-[#C5BFEE]/70 rounded-2xl flex items-center justify-center animate-float">
            <span className="text-white font-bold text-xl">
              {tasks.length}
            </span>
          </div>
        </div>

        {/* Control panel */}
        {tasks.length > 0 && (
          <div className={cn(
            "bg-white/25 backdrop-blur-md border border-[#C1D9F6]/40 rounded-2xl p-4 animate-fadeInUp",
            "shadow-lg"
          )} style={{ animationDelay: "300ms" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSelectAll}
                  className="flex items-center gap-3 text-[#0E315C] hover:text-[#99C0F0] transition-colors duration-300 font-medium"
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
                  <span>
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
                  className="bg-[#99C0F0] hover:bg-[#0E315C] text-white px-6 py-2.5 rounded-xl transition-all duration-300 font-medium text-sm shadow-lg shadow-[#99C0F0]/20 hover:shadow-xl hover:scale-105 flex items-center gap-2 animate-slideInLeft"
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
      <div className="flex-1 overflow-auto">
        {tasks.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-[#99C0F0]/20 to-[#C5BFEE]/20 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-gentlePulse">
              <CheckCircle2 className="w-12 h-12 text-[#99C0F0]" />
            </div>
            <h3 className="text-xl font-light text-[#0E315C] mb-2">All caught up!</h3>
            <p className="text-[#0E315C]/60 text-sm">No pending tasks from your agents at the moment.</p>
          </div>
        ) : (
          <div className="space-y-4">
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
        )}
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        task={feedbackModalTask}
        onClose={() => setFeedbackModalTask(null)}
        onSubmit={handleFeedbackSubmit}
      />

      {/* Ambient elements */}
      {isVisible && (
        <>
          <div className="absolute top-8 right-8 w-2 h-2 bg-[#99C0F0]/40 rounded-full opacity-60 animate-float" />
          <div
            className="absolute bottom-12 left-8 w-1.5 h-1.5 bg-[#C5BFEE]/50 rounded-full opacity-50 animate-float-slow"
            style={{ animationDelay: "1s" }}
          />
        </>
      )}
    </div>
  );
}
