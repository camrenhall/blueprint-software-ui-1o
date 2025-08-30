import { useState } from "react";
import { Check, X, ArrowLeft, User, Clock, AlertCircle, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProposedTask } from "@/hooks/useTaskQueue";

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

interface TaskDetailsInlineProps {
  task: ProposedTask;
  onBack: () => void;
  onApprove: (taskId: string) => void;
  onDeny: (taskId: string, feedback?: string) => void;
}

export default function TaskDetailsInline({ task, onBack, onApprove, onDeny }: TaskDetailsInlineProps) {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleApprove = () => {
    onApprove(task.id);
  };

  const handleDeny = () => {
    setShowFeedbackModal(true);
  };

  const handleFeedbackSubmit = (feedback: string) => {
    onDeny(task.id, feedback);
    setShowFeedbackModal(false);
  };

  const handleSkipFeedback = () => {
    onDeny(task.id);
    setShowFeedbackModal(false);
  };

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
    <div className="animate-fadeIn h-full">
      <div className="h-full max-h-full flex flex-col overflow-hidden">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-6 flex-shrink-0">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/60 hover:bg-white/80 border border-[#C1D9F6]/40 hover:border-[#99C0F0]/50 transition-all duration-300 hover:shadow-lg shadow-sm"
            title="Back to task list"
          >
            <ArrowLeft className="w-5 h-5 text-[#0E315C]/70" />
          </button>
          <div>
            <h1 className="text-2xl font-light text-[#0E315C] tracking-wide">Task Details</h1>
            <p className="text-[#0E315C]/60 text-sm">Review and decide on this proposed task</p>
          </div>
        </div>

        {/* Main content - scrollable */}
        <div className="flex-1 overflow-y-auto document-scroll pr-2">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Task Information Card */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/40 backdrop-blur-md border border-[#C1D9F6]/40 rounded-3xl p-6 shadow-lg">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#99C0F0]/80 to-[#C5BFEE]/60 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg">
                      {task.category === "email" ? "📧" : "📄"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-medium text-[#0E315C] mb-2">{task.title}</h2>
                    <p className="text-[#0E315C]/70 leading-relaxed">{task.description}</p>
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
                <div className="text-sm text-[#0E315C]/60">
                  Proposed by <span className="font-medium text-[#0E315C]">{task.agent}</span> • {timeAgo(task.createdAt)}
                </div>
              </div>

              {/* Justification Card */}
              <div className="bg-white/40 backdrop-blur-md border border-[#C1D9F6]/40 rounded-3xl p-6 shadow-lg">
                <h3 className="text-lg font-medium text-[#0E315C] mb-4">AI Justification</h3>
                <p className="text-[#0E315C]/70 leading-relaxed">{task.justification}</p>
              </div>
            </div>

            {/* Decision Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white/40 backdrop-blur-md border border-[#C1D9F6]/40 rounded-3xl p-6 shadow-lg sticky top-0">
                <h3 className="text-lg font-medium text-[#0E315C] mb-6 text-center">Make a Decision</h3>
                
                <div className="space-y-4">
                  <button
                    onClick={handleApprove}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-[#99C0F0] hover:bg-[#0E315C] text-white rounded-2xl transition-all duration-300 font-medium shadow-lg shadow-[#99C0F0]/20 hover:shadow-xl hover:scale-105"
                  >
                    <Check className="w-5 h-5" />
                    Approve Task
                  </button>
                  
                  <button
                    onClick={handleDeny}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm border border-[#C1D9F6]/40 text-[#0E315C] rounded-2xl hover:bg-white/80 hover:border-red-300 hover:text-red-600 transition-all duration-300 font-medium"
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
