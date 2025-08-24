import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FeedbackDialog } from "./FeedbackDialog";
import { MessageCircle } from "lucide-react";

export function FeedbackButton() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setDialogOpen(true)}
        className="fixed bottom-6 left-6 z-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 bg-[#0E315C] hover:bg-[#0E315C]/90 text-white px-6 py-3 h-auto"
        title="Send Feedback"
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        Send Feedback
      </Button>

      <FeedbackDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
