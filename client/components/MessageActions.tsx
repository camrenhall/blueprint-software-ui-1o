import { useState } from "react";
import { Copy, ThumbsUp, ThumbsDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageActionsProps {
  messageId: string;
  content: string;
  rating?: "up" | "down" | null;
  onRating: (rating: "up" | "down" | null) => void;
  className?: string;
}

export default function MessageActions({ 
  messageId, 
  content, 
  rating, 
  onRating, 
  className 
}: MessageActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      }

      // Fallback to document.execCommand method
      const textArea = document.createElement('textarea');
      textArea.value = content;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        throw new Error('Copy command failed');
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // You could show a user-friendly error message here
    }
  };

  const handleRating = (newRating: "up" | "down") => {
    // If the same rating is clicked, toggle it off
    if (rating === newRating) {
      onRating(null);
    } else {
      onRating(newRating);
    }
  };

  return (
    <div className={cn("flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200", className)}>
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="p-1.5 rounded-lg hover:bg-black/5 transition-colors duration-200 group/copy"
        title="Copy message"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-green-600" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-[#0E315C]/60 group-hover/copy:text-[#0E315C]/80" />
        )}
      </button>

      {/* Thumbs up button */}
      <button
        onClick={() => handleRating("up")}
        className="p-1.5 rounded-lg hover:bg-black/5 transition-colors duration-200 group/up"
        title="Good response"
      >
        <ThumbsUp
          className={cn(
            "w-3.5 h-3.5 transition-colors duration-200",
            rating === "up"
              ? "text-[#0E315C] fill-current"
              : "text-[#0E315C]/60 group-hover/up:text-[#0E315C]/80"
          )}
        />
      </button>

      {/* Thumbs down button */}
      <button
        onClick={() => handleRating("down")}
        className="p-1.5 rounded-lg hover:bg-black/5 transition-colors duration-200 group/down"
        title="Poor response"
      >
        <ThumbsDown
          className={cn(
            "w-3.5 h-3.5 transition-colors duration-200",
            rating === "down"
              ? "text-[#0E315C] fill-current"
              : "text-[#0E315C]/60 group-hover/down:text-[#0E315C]/80"
          )}
        />
      </button>
    </div>
  );
}
