import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FeedbackRequest, FeedbackResponse } from "@shared/api";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FeedbackDialog({ open, onOpenChange }: FeedbackDialogProps) {
  const [sentiment, setSentiment] = useState<'happy' | 'unhappy' | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!sentiment) {
      toast({
        title: "Please select your sentiment",
        description: "Choose whether you're happy or unhappy with the experience.",
        variant: "destructive",
      });
      return;
    }

    if (!comment.trim()) {
      toast({
        title: "Please add a comment",
        description: "Your feedback helps us improve the platform.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const feedbackData: FeedbackRequest = {
        sentiment,
        comment: comment.trim(),
        page: window.location.pathname,
      };

      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      const result: FeedbackResponse = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Feedback sent!",
          description: "Thank you for helping us improve our platform.",
        });
        
        // Reset form and close dialog
        setSentiment(null);
        setComment("");
        onOpenChange(false);
      } else {
        throw new Error(result.message || 'Failed to send feedback');
      }
    } catch (error) {
      toast({
        title: "Failed to send feedback",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSentiment(null);
    setComment("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Feedback</DialogTitle>
          <DialogDescription>
            Help us improve our platform by sharing your experience.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-3 text-[#0E315C]">How was your experience?</h4>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSentiment('happy')}
                className={`flex-1 transition-all ${
                  sentiment === 'happy'
                    ? 'bg-[#C1D9F6] border-[#99C0F0] text-[#0E315C] hover:bg-[#C1D9F6]/90'
                    : 'hover:bg-[#C1D9F6]/20 hover:border-[#99C0F0]'
                }`}
              >
                😊 Happy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSentiment('unhappy')}
                className={`flex-1 transition-all ${
                  sentiment === 'unhappy'
                    ? 'bg-[#C5BFEE] border-[#C5BFEE] text-[#0E315C] hover:bg-[#C5BFEE]/90'
                    : 'hover:bg-[#C5BFEE]/20 hover:border-[#C5BFEE]'
                }`}
              >
                😞 Unhappy
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2 text-[#0E315C]">Tell us more</h4>
            <Textarea
              placeholder="What can we do better? Your feedback is valuable to us..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px] border-[#99C0F0]/30 focus:border-[#99C0F0] focus:ring-[#99C0F0]/20"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="border-[#99C0F0]/50 text-[#0E315C] hover:bg-[#C1D9F6]/20 hover:border-[#99C0F0]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-[#0E315C] hover:bg-[#0E315C]/90 text-white"
            >
              {isSubmitting ? "Sending..." : "Send Feedback"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
