import { useState } from "react";
import { cn } from "@/lib/utils";
import { MessageSquare, Send, Phone, Video, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CommunicationsPanelProps {
  onClose: () => void;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: "message" | "call" | "video" | "email";
  unread?: boolean;
}

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "Sarah Johnson",
    content: "Can we schedule a review meeting for next week?",
    timestamp: "2 hours ago",
    type: "message",
    unread: true,
  },
  {
    id: "2",
    sender: "Mike Chen",
    content: "The latest case analysis is ready for your review.",
    timestamp: "4 hours ago",
    type: "email",
  },
  {
    id: "3",
    sender: "Team Meeting",
    content: "Weekly standup call completed",
    timestamp: "1 day ago",
    type: "call",
  },
  {
    id: "4",
    sender: "Alex Rivera",
    content: "Quick video sync about the project timeline",
    timestamp: "2 days ago",
    type: "video",
  },
];

export default function CommunicationsPanel({ onClose }: CommunicationsPanelProps) {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const getTypeIcon = (type: Message["type"]) => {
    switch (type) {
      case "message":
        return MessageSquare;
      case "call":
        return Phone;
      case "video":
        return Video;
      case "email":
        return Mail;
      default:
        return MessageSquare;
    }
  };

  const getTypeColor = (type: Message["type"]) => {
    switch (type) {
      case "message":
        return "bg-blue-100 text-blue-800";
      case "call":
        return "bg-green-100 text-green-800";
      case "video":
        return "bg-purple-100 text-purple-800";
      case "email":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-xl flex items-center justify-center shadow-lg">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-light text-[#0E315C] tracking-wide">
              Communications
            </h1>
            <p className="text-sm text-[#99C0F0]/70 font-light">
              Manage your messages and calls
            </p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="text-[#0E315C]/60 hover:text-[#0E315C] hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-light text-[#0E315C]">
              Recent Communications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockMessages.map((message) => {
              const IconComponent = getTypeIcon(message.type);
              return (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={cn(
                    "p-4 rounded-lg border cursor-pointer transition-all duration-200",
                    "hover:bg-white/10 hover:border-[#99C0F0]/30",
                    selectedMessage?.id === message.id
                      ? "bg-white/15 border-[#99C0F0]/40"
                      : "bg-white/5 border-white/10",
                    message.unread && "border-l-4 border-l-[#99C0F0]"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="w-4 h-4 text-[#0E315C]/60" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-[#0E315C] text-sm">
                            {message.sender}
                          </h4>
                          <Badge 
                            variant="secondary" 
                            className={cn("text-xs", getTypeColor(message.type))}
                          >
                            {message.type}
                          </Badge>
                          {message.unread && (
                            <div className="w-2 h-2 bg-[#99C0F0] rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-[#0E315C]/70 mt-1 line-clamp-2">
                          {message.content}
                        </p>
                        <p className="text-xs text-[#99C0F0]/60 mt-2">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Message Detail / Compose */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-light text-[#0E315C]">
              {selectedMessage ? "Message Details" : "Compose New Message"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedMessage ? (
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {selectedMessage.sender.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#0E315C]">
                        {selectedMessage.sender}
                      </h4>
                      <p className="text-xs text-[#99C0F0]/60">
                        {selectedMessage.timestamp}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#0E315C]/80 leading-relaxed">
                    {selectedMessage.content}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Textarea
                    placeholder="Type your reply..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="bg-white/10 border-white/20 text-[#0E315C] placeholder:text-[#0E315C]/50"
                  />
                  <Button 
                    className="w-full bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] text-white hover:from-[#85B3ED] hover:to-[#B8B0EA]"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Reply
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Input
                  placeholder="To: Enter recipient"
                  className="bg-white/10 border-white/20 text-[#0E315C] placeholder:text-[#0E315C]/50"
                />
                <Input
                  placeholder="Subject"
                  className="bg-white/10 border-white/20 text-[#0E315C] placeholder:text-[#0E315C]/50"
                />
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="bg-white/10 border-white/20 text-[#0E315C] placeholder:text-[#0E315C]/50 min-h-32"
                />
                <Button 
                  className="w-full bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] text-white hover:from-[#85B3ED] hover:to-[#B8B0EA]"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
