import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check, X, ArrowLeft, User, Clock, AlertCircle, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTaskQueue, ProposedTask } from "@/hooks/useTaskQueue";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: string) => void;
  taskTitle: string;
}

function FeedbackModal({ isOpen, onClose, onSubmit, taskTitle }: FeedbackModalProps) {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!feedback.trim()) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
    onSubmit(feedback);
    setIsSubmitting(false);
    setFeedback("");
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn"
      onClick={handleOverlayClick}
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
            Why was this task denied?
          </h3>
          <p className="text-[#0E315C]/60 text-sm font-light">
            Your feedback helps our AI learn and improve future task suggestions.
          </p>
        </div>

        <div className="bg-[#C1D9F6]/10 p-4 rounded-2xl mb-6">
          <h4 className="font-medium text-[#0E315C] mb-1 text-sm">{taskTitle}</h4>
        </div>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Please explain why you denied this task... (optional)"
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
            Skip Feedback
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

export default function TaskDetails() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { tasks, removeTask } = useTaskQueue();
  const [task, setTask] = useState<ProposedTask | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (taskId) {
      const foundTask = tasks.find(t => t.id === taskId);
      setTask(foundTask || null);
    }
    
    // Fade in animation
    setTimeout(() => setIsVisible(true), 200);
  }, [taskId, tasks]);

  const handleApprove = () => {
    if (task) {
      removeTask(task.id);
      navigate("/menu");
      // In real app, would make API call to approve task
    }
  };

  const handleDeny = () => {
    setShowFeedbackModal(true);
  };

  const handleFeedbackSubmit = (feedback: string) => {
    if (task) {
      removeTask(task.id);
      navigate("/menu");
      // In real app, would make API call to deny task with feedback
      console.log(`Task ${task.id} denied with feedback:`, feedback);
    }
  };

  const handleSkipFeedback = () => {
    if (task) {
      removeTask(task.id);
      navigate("/menu");
      // In real app, would make API call to deny task without feedback
      console.log(`Task ${task.id} denied without feedback`);
    }
  };

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40 rounded-3xl p-12 text-center max-w-md mx-4">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-[#0E315C]/30" />
          <h2 className="text-xl font-light text-[#0E315C] mb-2">Task Not Found</h2>
          <p className="text-[#0E315C]/60 font-light mb-6">
            The task you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/menu")}
            className="px-6 py-3 bg-[#99C0F0] hover:bg-[#0E315C] text-white rounded-xl transition-all duration-300 font-medium shadow-lg shadow-[#99C0F0]/20 hover:shadow-xl"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  const timeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffHours > 0) return `${diffHours}h ago`;
    return `${diffMinutes}m ago`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-amber-600 bg-amber-50 border-amber-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-8 lg:px-6 md:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className={cn(
          "flex items-center gap-4 mb-8 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <button
            onClick={() => navigate("/menu")}
            className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/60 hover:bg-white/80 border border-[#C1D9F6]/40 hover:border-[#99C0F0]/50 transition-all duration-300 hover:shadow-lg shadow-sm"
            title="Back to menu"
          >
            <ArrowLeft className="w-5 h-5 text-[#0E315C]/70" />
          </button>
          <div>
            <h1 className="text-3xl font-light text-[#0E315C] tracking-wide">Task Details</h1>
            <p className="text-[#0E315C]/60">Review and decide on this proposed task</p>
          </div>
        </div>

        {/* Main content */}
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-3 gap-8 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          {/* Task Information Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/40 backdrop-blur-md border border-[#C1D9F6]/40 rounded-3xl p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#99C0F0]/80 to-[#C5BFEE]/60 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">
                    {task.category === "email" ? "📧" : "📄"}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-medium text-[#0E315C] mb-2">{task.title}</h2>
                  <p className="text-[#0E315C]/70 text-lg leading-relaxed">{task.description}</p>
                </div>
              </div>

              {/* Task metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {task.targetPerson && (
                  <div className="flex items-center gap-3 p-4 bg-white/60 rounded-2xl border border-[#C1D9F6]/30">
                    <User className="w-5 h-5 text-[#99C0F0]" />
                    <div>
                      <div className="text-xs text-[#0E315C]/60 font-medium">Target Person</div>
                      <div className="text-sm text-[#0E315C] font-medium">{task.targetPerson}</div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-3 p-4 bg-white/60 rounded-2xl border border-[#C1D9F6]/30">
                  <Clock className="w-5 h-5 text-[#99C0F0]" />
                  <div>
                    <div className="text-xs text-[#0E315C]/60 font-medium">Estimated Time</div>
                    <div className="text-sm text-[#0E315C] font-medium">{task.estimatedTime}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white/60 rounded-2xl border border-[#C1D9F6]/30">
                  <AlertCircle className="w-5 h-5 text-[#99C0F0]" />
                  <div>
                    <div className="text-xs text-[#0E315C]/60 font-medium">Priority</div>
                    <div className={cn(
                      "text-sm font-medium px-2 py-1 rounded-lg border inline-block capitalize",
                      getPriorityColor(task.priority)
                    )}>
                      {task.priority}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional info */}
              <div className="text-sm text-[#0E315C]/60 mb-6">
                Proposed by <span className="font-medium text-[#0E315C]">{task.agent}</span> • {timeAgo(task.createdAt)}
              </div>
            </div>

            {/* Justification Card */}
            <div className="bg-white/40 backdrop-blur-md border border-[#C1D9F6]/40 rounded-3xl p-8 shadow-lg">
              <h3 className="text-xl font-medium text-[#0E315C] mb-4">AI Justification</h3>
              <p className="text-[#0E315C]/70 leading-relaxed">{task.justification}</p>
            </div>
          </div>

          {/* Decision Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white/40 backdrop-blur-md border border-[#C1D9F6]/40 rounded-3xl p-8 shadow-lg sticky top-24">
              <h3 className="text-xl font-medium text-[#0E315C] mb-6 text-center">Make a Decision</h3>
              
              <div className="space-y-4">
                <button
                  onClick={handleApprove}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#99C0F0] hover:bg-[#0E315C] text-white rounded-2xl transition-all duration-300 font-medium shadow-lg shadow-[#99C0F0]/20 hover:shadow-xl hover:scale-105"
                >
                  <Check className="w-5 h-5" />
                  Approve Task
                </button>
                
                <button
                  onClick={handleDeny}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white/60 backdrop-blur-sm border border-[#C1D9F6]/40 text-[#0E315C] rounded-2xl hover:bg-white/80 hover:border-red-300 hover:text-red-600 transition-all duration-300 font-medium"
                >
                  <X className="w-5 h-5" />
                  Deny Task
                </button>
              </div>

              <div className="mt-6 p-4 bg-[#C1D9F6]/10 rounded-2xl">
                <p className="text-xs text-[#0E315C]/60 text-center">
                  Your decision will help train our AI to make better task suggestions in the future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => {
          setShowFeedbackModal(false);
          handleSkipFeedback();
        }}
        onSubmit={handleFeedbackSubmit}
        taskTitle={task.title}
      />
    </div>
  );
}
