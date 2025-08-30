import { useState } from "react";
import {
  Check,
  X,
  ArrowLeft,
  User,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProposedTask } from "@/hooks/useTaskQueue";
import { EmailPreview } from "./EmailPreview";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: string) => void;
  taskTitle: string;
}

function FeedbackModal({
  isOpen,
  onClose,
  onSubmit,
  taskTitle,
}: FeedbackModalProps) {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API call
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
            Your feedback helps our AI learn and improve future task
            suggestions.
          </p>
        </div>

        <div className="bg-[#C1D9F6]/10 p-4 rounded-2xl mb-6">
          <h4 className="font-medium text-[#0E315C] mb-1 text-sm">
            {taskTitle}
          </h4>
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

export default function TaskDetailsInline({
  task,
  onBack,
  onApprove,
  onDeny,
}: TaskDetailsInlineProps) {
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

  return (
    <div className="animate-fadeIn h-full">
      <div className="h-full max-h-full flex flex-col overflow-hidden">
        {/* Compact Header */}
        <div className="p-4 flex-shrink-0 mb-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onBack}
              className="flex items-center space-x-3 text-[#0E315C]/70 hover:text-[#0E315C] transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-light text-sm">Back to Queue</span>
            </button>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleApprove}
                className="flex items-center space-x-2 bg-[#99C0F0] hover:bg-[#0E315C] text-white px-3 py-2 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Check className="w-4 h-4" />
                <span className="text-sm font-light">Approve</span>
              </button>
              <button
                onClick={handleDeny}
                className="flex items-center space-x-2 bg-slate-100/40 hover:bg-slate-200/50 text-[#0E315C] px-3 py-2 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <X className="w-4 h-4" />
                <span className="text-sm font-light">Deny</span>
              </button>
            </div>
          </div>

          {/* Compact Task Header */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-2xl flex items-center justify-center text-white font-light text-sm shadow-lg shadow-[#99C0F0]/20">
              {task.category === "email" ? "📧" : "📄"}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-1">
                <h1 className="text-xl font-light text-[#0E315C]">
                  {task.title}
                </h1>
              </div>
              <div className="flex items-center space-x-4 text-xs text-[#0E315C]/60 font-light">
                <div className="flex items-center space-x-1">
                  <span className="capitalize">
                    {task.category === "email" ? "Email" : "Review"}
                  </span>
                </div>
                {task.targetPerson && (
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>Target: {task.targetPerson}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Scrollable with proper height containment */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="px-6 pt-3 pb-2">
            <div className="space-y-4">
              {/* Row 1: Task Progress - Full Width */}
              <div className="bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40 hover:bg-white/50 hover:shadow-lg hover:scale-[1.01] transform rounded-2xl p-4 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-[#99C0F0]" />
                    <h3 className="text-lg font-light text-[#0E315C]">
                      Task Overview
                    </h3>
                    <span className="text-sm text-[#0E315C]/60 font-light">
                      {task.description}
                    </span>
                  </div>
                  <span className="text-lg font-light text-[#0E315C]">
                    {task.category}
                  </span>
                </div>

                {/* Most Recent Activity - Inline */}
                <div className="border-t border-[#C1D9F6]/20 pt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#0E315C]/50 font-light">
                      Proposed by:
                    </span>
                    <span className="text-[#0E315C]/50 font-light text-xs">
                      {timeAgo(task.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-[#0E315C] font-light">
                    AI Agent: {task.agent}
                  </p>
                </div>
              </div>

              {/* Row 2: Email Content (if email task) */}
              {task.category === "email" && task.emailContent && (
                <div className="bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40 hover:bg-white/50 hover:shadow-lg hover:scale-[1.01] transform rounded-2xl p-5 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-light text-[#0E315C] flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-[#99C0F0]" />
                      <span>Proposed Email Content</span>
                    </h3>
                  </div>

                  <EmailPreview
                    subject={task.emailContent.subject}
                    content={task.emailContent.content}
                    to={task.emailContent.to}
                    cc={task.emailContent.cc}
                    senderName="Luceron AI"
                    senderType="firm"
                  />
                </div>
              )}

              {/* Row 3: AI Justification and Decision Panel - Two Columns */}
              <div className="grid grid-cols-2 gap-6">
                {/* AI Justification Section */}
                <div className="bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40 hover:bg-white/50 hover:shadow-lg hover:scale-[1.01] transform rounded-2xl p-5 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-light text-[#0E315C] flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-[#99C0F0]" />
                      <span>AI Justification</span>
                    </h3>
                  </div>

                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-sm">
                      <p className="text-sm text-[#0E315C] leading-relaxed">
                        {task.justification}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decision Panel */}
                <div className="bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40 hover:bg-white/50 hover:shadow-lg hover:scale-[1.01] transform rounded-2xl p-5 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-light text-[#0E315C] flex items-center space-x-3">
                      <Check className="w-5 h-5 text-[#C5BFEE]" />
                      <span>Decision</span>
                    </h3>
                  </div>

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

                    <div className="mt-4 p-3 bg-[#C1D9F6]/10 rounded-2xl">
                      <p className="text-xs text-[#0E315C]/60 text-center">
                        Your decision will help train our AI to make better task
                        suggestions in the future.
                      </p>
                    </div>
                  </div>
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
