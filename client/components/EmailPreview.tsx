import { Building, User, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface EmailPreviewProps {
  subject: string;
  content: string;
  to: string[];
  cc?: string[];
  senderName?: string;
  senderType?: "firm" | "client";
  sentAt?: string;
  className?: string;
}

export function EmailPreview({
  subject,
  content,
  to,
  cc,
  senderName = "Luceron AI",
  senderType = "firm",
  sentAt,
  className,
}: EmailPreviewProps) {
  const formatTime = (dateStr?: string) => {
    if (!dateStr) return "Draft";
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    if (diffHours > 0)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffMinutes > 0)
      return `${diffMinutes} min${diffMinutes > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  return (
    <div
      className={cn(
        "bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-sm",
        className,
      )}
    >
      <div className="p-4">
        {/* Message header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center shadow-md",
                senderType === "firm"
                  ? "bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE]"
                  : "bg-gradient-to-br from-[#C1D9F6] to-white",
              )}
            >
              {senderType === "firm" ? (
                <Building className="w-4 h-4 text-white" />
              ) : (
                <User className="w-4 h-4 text-[#0E315C]" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-[#0E315C]">
                  {senderName}
                </span>
                <span className="text-xs text-[#0E315C]/70 font-medium">
                  {formatTime(sentAt)}
                </span>
              </div>

              {/* Subject */}
              <p className="font-semibold text-sm text-[#0E315C] mt-1">
                {subject}
              </p>
            </div>
          </div>
          <Mail className="w-5 h-5 text-[#99C0F0]" />
        </div>

        {/* Recipients */}
        <div className="space-y-1 text-xs mb-4">
          <div className="flex items-start space-x-2">
            <span className="text-[#0E315C]/60 font-medium min-w-[20px]">
              To:
            </span>
            <span className="text-[#0E315C]/80">{to.join(", ")}</span>
          </div>
          {cc && cc.length > 0 && (
            <div className="flex items-start space-x-2">
              <span className="text-[#0E315C]/60 font-medium min-w-[20px]">
                CC:
              </span>
              <span className="text-[#0E315C]/80">{cc.join(", ")}</span>
            </div>
          )}
        </div>

        <Separator className="bg-[#0E315C]/10 mb-4" />

        {/* Email content */}
        <div className="text-sm leading-relaxed text-[#0E315C]/90 whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </div>
  );
}
