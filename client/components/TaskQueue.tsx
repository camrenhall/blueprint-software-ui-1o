import { useState, useEffect, useMemo } from "react";
import { Check, X, User, MessageSquare, CheckCircle2, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { TaskSearchFilterBar, TaskSortOption } from "./TaskSearchFilterBar";
import { useTaskQueue, ProposedTask } from "@/hooks/useTaskQueue";
import TaskDetailsInline from "./TaskDetailsInline";

interface FeedbackModalProps {
  task: ProposedTask | null;
  onClose: () => void;
  onSubmit: (taskId: string, feedback: string) => void;
}

// Feedback Modal Component
function FeedbackModal({ task, onClose, onSubmit }: FeedbackModalProps) {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!task) return null;

  const handleSubmit = async () => {
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API call
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
          <h4 className="font-medium text-[#0E315C] mb-1 text-sm">
            {task.title}
          </h4>
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

// Individual task card component
interface TaskCardProps {
  task: ProposedTask;
  index: number;
  onAccept: (taskId: string) => void;
  onDecline: (taskId: string) => void;
  onTaskClick: (task: ProposedTask) => void;
}

function TaskCard({
  task,
  index,
  onAccept,
  onDecline,
  onTaskClick,
}: TaskCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger card click if action buttons are clicked
    if ((e.target as HTMLElement).closest("button[data-action]")) {
      return;
    }
    onTaskClick(task);
  };

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        "bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40",
        "hover:bg-white/50 hover:shadow-lg hover:shadow-[#99C0F0]/5 hover:border-[#99C0F0]/60",
        "hover:border-opacity-80 transition-all duration-500 p-4 rounded-2xl text-left group hover:scale-[1.01] transform cursor-pointer",
      )}
    >
      <div className="flex items-start space-x-4">
        {/* Category Icon */}
        <div className="w-10 h-10 bg-gradient-to-br from-[#99C0F0]/80 to-[#C5BFEE]/60 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0 shadow-lg">
          <span className="text-white font-light text-sm">
            {task.category === "email" ? "📧" : "📄"}
          </span>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            {/* Left side - Task info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium text-[#0E315C] mb-1">
                {task.title}
              </h3>
              {task.description && (
                <p className="text-[#0E315C]/60 text-sm font-light mb-2 leading-relaxed">
                  {task.description}
                </p>
              )}
              {task.targetPerson && (
                <div className="flex items-center gap-2 text-[#0E315C]/60 text-sm">
                  <User className="w-4 h-4 text-[#99C0F0]" />
                  <span>{task.targetPerson}</span>
                </div>
              )}
            </div>

            {/* Right side - Action buttons */}
            <div className="flex gap-2 flex-shrink-0">
              <button
                data-action="accept"
                onClick={(e) => {
                  e.stopPropagation();
                  onAccept(task.id);
                }}
                className="w-8 h-8 bg-[#99C0F0] hover:bg-[#0E315C] text-white rounded-lg transition-all duration-300 shadow-lg shadow-[#99C0F0]/20 hover:shadow-xl hover:scale-105 flex items-center justify-center"
                title="Accept task"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                data-action="decline"
                onClick={(e) => {
                  e.stopPropagation();
                  onDecline(task.id);
                }}
                className="w-8 h-8 bg-white/60 backdrop-blur-sm border border-[#C1D9F6]/40 text-[#0E315C] rounded-lg hover:bg-white/80 hover:border-red-300 hover:text-red-600 transition-all duration-300 flex items-center justify-center"
                title="Decline task"
              >
                <X className="w-4 h-4" />
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
  initialTaskId?: string | null;
}

export default function TaskQueue({ onClose, initialTaskId }: TaskQueueProps) {
  const { tasks, removeTask, filterAndSortTasks } = useTaskQueue();
  const [selectedTask, setSelectedTask] = useState<ProposedTask | null>(null);
  const [feedbackModalTask, setFeedbackModalTask] =
    useState<ProposedTask | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<TaskSortOption>("createdAt");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger cascading animation after component mounts
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Auto-select task when initialTaskId is provided
  useEffect(() => {
    if (initialTaskId && tasks.length > 0) {
      const taskToSelect = tasks.find((task) => task.id === initialTaskId);
      if (taskToSelect) {
        setSelectedTask(taskToSelect);
      }
    }
  }, [initialTaskId, tasks]);

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    return filterAndSortTasks(searchValue, activeFilters, sortBy);
  }, [filterAndSortTasks, searchValue, activeFilters, sortBy]);

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId],
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  const handleAcceptTask = (taskId: string) => {
    removeTask(taskId);
    // In real app, would make API call to accept task
  };

  const handleDeclineTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setFeedbackModalTask(task);
    }
  };

  const handleFeedbackSubmit = (taskId: string, feedback: string) => {
    removeTask(taskId);
    setFeedbackModalTask(null);
    // In real app, would make API call to decline task with feedback
    console.log(`Task ${taskId} declined with feedback:`, feedback);
  };

  const handleTaskClick = (task: ProposedTask) => {
    setSelectedTask(task);
  };

  const handleBackToList = () => {
    setSelectedTask(null);
  };

  const handleApproveTask = (taskId: string) => {
    removeTask(taskId);
    setSelectedTask(null);
    // In real app, would make API call to approve task
  };

  const handleDenyTask = (taskId: string, feedback?: string) => {
    removeTask(taskId);
    setSelectedTask(null);
    // In real app, would make API call to deny task with feedback
    console.log(
      `Task ${taskId} denied${feedback ? ` with feedback: ${feedback}` : " without feedback"}`,
    );
  };

  return (
    <div
      className="absolute inset-0 flex flex-col px-8 py-8 lg:px-6 lg:py-6 md:px-4 md:py-4"
      style={{ transform: "translateZ(0)" }}
    >
      {/* Header - Hide when task details are shown */}
      {!selectedTask && (
        <div className="text-center mb-8 flex-shrink-0">
          <div
            className={cn(
              "transition-all duration-1000 ease-out delay-300",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4",
            )}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-xl flex items-center justify-center shadow-lg">
                <ClipboardList className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-light text-[#0E315C] tracking-wide">
                  Task Queue
                </h1>
                <p className="text-sm text-[#0E315C]/60 font-light">
                  Review and manage proposed actions from your AI agents
                </p>
              </div>
              <div className="px-3 py-1 bg-[#C5BFEE]/20 text-[#0E315C] text-xs font-medium rounded-full border border-[#C5BFEE]/30">
                {filteredAndSortedTasks.length}{" "}
                {filteredAndSortedTasks.length === 1 ? "Task" : "Tasks"}
              </div>
            </div>
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
      )}

      {/* Search, Filter, Sort Bar - Hide when task details are shown */}
      {!selectedTask && (
        <TaskSearchFilterBar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          activeFilters={activeFilters}
          onFilterToggle={toggleFilter}
          onClearFilters={clearFilters}
          sortBy={sortBy}
          onSortChange={setSortBy}
          className={cn(
            "mb-6 transition-all duration-800 ease-out delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          )}
        />
      )}

      {/* Main Content Area - Either Task List or Task Details */}
      <div className="flex-1 min-h-0">
        {selectedTask ? (
          /* Task Details View - Inline */
          <div
            className={cn(
              "h-full transition-all duration-500 ease-out animate-fadeIn",
            )}
          >
            <TaskDetailsInline
              task={selectedTask}
              onBack={handleBackToList}
              onApprove={handleApproveTask}
              onDeny={handleDenyTask}
            />
          </div>
        ) : (
          /* Task List Content */
          <div className={cn("h-full transition-all duration-500 ease-out")}>
            {filteredAndSortedTasks.length === 0 ? (
              <div className="flex-1 flex items-center justify-center h-full">
                <div className="bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40 rounded-3xl p-12 text-center max-w-md mx-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#99C0F0]/20 to-[#C5BFEE]/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12 text-[#99C0F0]" />
                  </div>
                  {tasks.length === 0 ? (
                    <>
                      <h3 className="text-xl font-light text-[#0E315C] mb-2">
                        All caught up!
                      </h3>
                      <p className="text-[#0E315C]/60 text-sm font-light">
                        No pending tasks from your agents at the moment.
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-light text-[#0E315C] mb-2">
                        No tasks found
                      </h3>
                      <p className="text-[#0E315C]/60 text-sm font-light">
                        Try adjusting your search or clearing filters.
                      </p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div
                className={cn(
                  "h-full border border-[#C1D9F6]/50 rounded-2xl mx-2 overflow-hidden transition-all duration-1000 ease-out delay-700",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4",
                )}
              >
                <div className="h-full overflow-y-auto document-scroll px-4 py-4 space-y-3">
                  {filteredAndSortedTasks.map((task, index) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      index={index}
                      onAccept={handleAcceptTask}
                      onDecline={handleDeclineTask}
                      onTaskClick={handleTaskClick}
                    />
                  ))}
                </div>
              </div>
            )}
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
