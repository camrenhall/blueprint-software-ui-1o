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
        className="fixed bottom-6 left-6 z-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        size="icon"
        title="Send Feedback"
      >
        <MessageCircle className="h-5 w-5" />
      </Button>
      
      <FeedbackDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
      />
    </>
  );
}
