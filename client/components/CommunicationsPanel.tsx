import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Mail, 
  X, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  Download,
  Calendar,
  User,
  FileText,
  Search,
  ChevronDown,
  ChevronRight,
  Bot,
  Reply
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface CommunicationsPanelProps {
  onClose: () => void;
}

interface EmailMessage {
  id: string;
  subject: string;
  content: string;
  sentAt: string;
  status: "sent" | "delivered" | "opened" | "replied" | "failed";
  sender: "ai" | "client";
  aiAgent?: string;
}

interface ClientConversation {
  id: string;
  clientEmail: string;
  clientName: string;
  caseNumber: string;
  lastActivity: string;
  unreadCount: number;
  priority: "high" | "medium" | "low";
  purpose: "document_request" | "follow_up" | "case_update" | "appointment_reminder";
  messages: EmailMessage[];
  responseReceived: boolean;
}

const mockConversations: ClientConversation[] = [
  {
    id: "1",
    clientEmail: "sarah.johnson@email.com",
    clientName: "Sarah Johnson",
    caseNumber: "CASE-2024-001",
    lastActivity: "2024-01-15T14:22:00Z",
    unreadCount: 0,
    priority: "high",
    purpose: "document_request",
    responseReceived: false,
    messages: [
      {
        id: "1a",
        subject: "Document Request - Medical Records Required",
        content: "Dear Ms. Johnson, I hope this email finds you well. We need your medical records from St. Mary's Hospital for your personal injury case. Please provide records from January 2024 to present. You can upload them securely through our client portal or email them directly. If you have any questions, please don't hesitate to reach out.",
        sentAt: "2024-01-15T10:30:00Z",
        status: "opened",
        sender: "ai",
        aiAgent: "DocumentCollector AI"
      },
      {
        id: "1b", 
        subject: "Follow-up: Medical Records Still Needed",
        content: "Dear Ms. Johnson, This is a follow-up regarding the medical records we requested. We understand gathering documents can take time, but we need these records to proceed with your case effectively. Please let us know if you need assistance or have any questions about the process.",
        sentAt: "2024-01-16T09:15:00Z",
        status: "delivered",
        sender: "ai",
        aiAgent: "FollowUp AI"
      }
    ]
  },
  {
    id: "2",
    clientEmail: "mike.chen@email.com", 
    clientName: "Mike Chen",
    caseNumber: "CASE-2024-002",
    lastActivity: "2024-01-14T18:30:00Z",
    unreadCount: 1,
    priority: "medium",
    purpose: "case_update",
    responseReceived: true,
    messages: [
      {
        id: "2a",
        subject: "Case Update - Deposition Scheduled",
        content: "Dear Mr. Chen, Your deposition has been scheduled for February 12th at 10:00 AM at our office. Please arrive 15 minutes early and bring a valid ID. We will prepare you beforehand with a preparation session scheduled for February 8th. Please confirm your availability.",
        sentAt: "2024-01-14T15:45:00Z",
        status: "replied",
        sender: "ai",
        aiAgent: "CaseManager AI"
      },
      {
        id: "2b",
        subject: "Re: Case Update - Deposition Scheduled",
        content: "Thank you for the update. I can confirm my availability for both the preparation session on February 8th and the deposition on February 12th. I'll make sure to arrive early and bring my ID. Looking forward to moving this case forward.",
        sentAt: "2024-01-14T18:30:00Z",
        status: "delivered",
        sender: "client"
      }
    ]
  },
  {
    id: "3",
    clientEmail: "alex.rivera@email.com",
    clientName: "Alex Rivera", 
    caseNumber: "CASE-2024-003",
    lastActivity: "2024-01-13T12:45:00Z",
    unreadCount: 0,
    priority: "high",
    purpose: "follow_up",
    responseReceived: false,
    messages: [
      {
        id: "3a",
        subject: "Insurance Documentation Required",
        content: "Dear Mr. Rivera, To proceed with your case, we need your insurance policy details and claim numbers. Please provide: 1) Your insurance policy number, 2) Claim reference numbers, 3) Insurance company contact information. You can reply to this email or upload documents through our secure portal.",
        sentAt: "2024-01-12T09:15:00Z",
        status: "opened",
        sender: "ai",
        aiAgent: "DocumentCollector AI"
      },
      {
        id: "3b",
        subject: "Follow-up - Insurance Documentation Still Needed",
        content: "Dear Mr. Rivera, Following up on our previous request for insurance documentation. We still need your insurance policy details and claim numbers to proceed with your case. This is the second request - please respond within 5 business days to avoid delays in your case processing.",
        sentAt: "2024-01-13T09:15:00Z",
        status: "delivered",
        sender: "ai",
        aiAgent: "FollowUp AI"
      },
      {
        id: "3c",
        subject: "Urgent: Final Notice - Insurance Documentation Required",
        content: "Dear Mr. Rivera, This is our final notice regarding the insurance documentation required for your case. Without this information, we cannot proceed and may need to pause case activities. Please respond immediately or contact our office directly. We're here to help if you need assistance gathering these documents.",
        sentAt: "2024-01-13T12:45:00Z",
        status: "sent",
        sender: "ai",
        aiAgent: "UrgentFollow AI"
      }
    ]
  }
];

export default function CommunicationsPanel({ onClose }: CommunicationsPanelProps) {
  const [selectedConversation, setSelectedConversation] = useState<ClientConversation | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);

  const getStatusIcon = (status: EmailMessage["status"]) => {
    switch (status) {
      case "sent":
        return <Clock className="w-3 h-3 text-[#99C0F0]" />;
      case "delivered":
        return <CheckCircle className="w-3 h-3 text-[#99C0F0]" />;
      case "opened":
        return <Eye className="w-3 h-3 text-[#C5BFEE]" />;
      case "replied":
        return <Reply className="w-3 h-3 text-[#C1D9F6]" />;
      case "failed":
        return <AlertCircle className="w-3 h-3 text-red-500" />;
      default:
        return <Clock className="w-3 h-3 text-gray-500" />;
    }
  };

  const getStatusColor = (status: EmailMessage["status"]) => {
    switch (status) {
      case "sent":
        return "bg-[#99C0F0]/20 text-[#0E315C] border-[#99C0F0]/30";
      case "delivered":
        return "bg-[#99C0F0]/20 text-[#0E315C] border-[#99C0F0]/30";
      case "opened":
        return "bg-[#C5BFEE]/20 text-[#0E315C] border-[#C5BFEE]/30";
      case "replied":
        return "bg-[#C1D9F6]/20 text-[#0E315C] border-[#C1D9F6]/30";
      case "failed":
        return "bg-red-100/50 text-red-800 border-red-200";
      default:
        return "bg-gray-100/50 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: ClientConversation["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100/80 text-red-800 border-red-200";
      case "medium":
        return "bg-[#99C0F0]/20 text-[#0E315C] border-[#99C0F0]/30";
      case "low":
        return "bg-gray-100/80 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100/80 text-gray-700 border-gray-200";
    }
  };

  const getPurposeColor = (purpose: ClientConversation["purpose"]) => {
    switch (purpose) {
      case "document_request":
        return "bg-orange-100/80 text-orange-800 border-orange-200";
      case "follow_up":
        return "bg-yellow-100/80 text-yellow-800 border-yellow-200";
      case "case_update":
        return "bg-[#C1D9F6]/20 text-[#0E315C] border-[#C1D9F6]/30";
      case "appointment_reminder":
        return "bg-[#C5BFEE]/20 text-[#0E315C] border-[#C5BFEE]/30";
      default:
        return "bg-gray-100/80 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  const filteredConversations = mockConversations.filter(conversation => {
    const matchesSearch = 
      conversation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = priorityFilter === "all" || conversation.priority === priorityFilter;
    
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="h-full flex flex-col">
      {/* Header with enhanced glassmorphism */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-xl flex items-center justify-center shadow-lg">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-light text-[#0E315C] tracking-wide">
              AI Communications Audit
            </h1>
            <p className="text-sm text-[#0E315C]/60 font-light">
              Track AI email conversations with clients
            </p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="text-[#0E315C]/60 hover:text-[#0E315C] hover:bg-white/20 rounded-full"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Enhanced Filters with better contrast */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#0E315C]/50" />
          <Input
            placeholder="Search by client, email, or case number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/40 backdrop-blur-sm border border-white/30 text-[#0E315C] placeholder:text-[#0E315C]/50 focus:bg-white/60 focus:border-[#99C0F0]/50"
          />
        </div>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-4 py-2 bg-white/40 backdrop-blur-sm border border-white/30 rounded-lg text-[#0E315C] text-sm focus:bg-white/60 focus:border-[#99C0F0]/50"
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Conversations List */}
        <div className="relative">
          {/* Enhanced glassmorphism background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-[#C1D9F6]/15 to-white/20 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#99C0F0]/10 via-transparent to-[#C5BFEE]/10 rounded-2xl" />
          
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-light text-[#0E315C]">Client Conversations</h2>
              <Badge variant="secondary" className="bg-[#99C0F0]/20 text-[#0E315C] border-[#99C0F0]/30">
                {filteredConversations.length} active
              </Badge>
            </div>
            
            <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={cn(
                    "p-4 rounded-xl cursor-pointer transition-all duration-300 border",
                    "hover:bg-white/30 hover:border-[#99C0F0]/40 hover:shadow-lg",
                    selectedConversation?.id === conversation.id
                      ? "bg-white/40 border-[#99C0F0]/50 shadow-lg"
                      : "bg-white/20 border-white/20",
                    "backdrop-blur-sm"
                  )}
                >
                  <div className="space-y-3">
                    {/* Header with client info and priority */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-lg flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[#0E315C] text-sm">
                            {conversation.clientName}
                          </h4>
                          <p className="text-xs text-[#0E315C]/60">
                            {conversation.caseNumber}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={cn("text-xs border", getPriorityColor(conversation.priority))}>
                          {conversation.priority}
                        </Badge>
                        {conversation.unreadCount > 0 && (
                          <div className="w-2 h-2 bg-[#C5BFEE] rounded-full animate-pulse" />
                        )}
                      </div>
                    </div>

                    {/* Email preview and stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-3 h-3 text-[#0E315C]/50" />
                        <span className="text-sm text-[#0E315C]/70">
                          {conversation.messages.length} emails
                        </span>
                        {conversation.responseReceived && (
                          <Badge variant="outline" className="text-xs bg-[#C1D9F6]/20 text-[#0E315C] border-[#C1D9F6]/30">
                            Client Responded
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-[#0E315C]/50">
                        {formatDate(conversation.lastActivity)}
                      </span>
                    </div>

                    {/* Purpose and latest status */}
                    <div className="flex items-center justify-between">
                      <Badge className={cn("text-xs border", getPurposeColor(conversation.purpose))}>
                        {conversation.purpose.replace('_', ' ')}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(conversation.messages[conversation.messages.length - 1].status)}
                        <span className="text-xs text-[#0E315C]/60">
                          {conversation.messages[conversation.messages.length - 1].status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full Email History */}
        <div className="relative">
          {/* Enhanced glassmorphism background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-[#C1D9F6]/15 to-white/20 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#99C0F0]/10 via-transparent to-[#C5BFEE]/10 rounded-2xl" />
          
          <div className="relative p-6">
            <h2 className="text-lg font-light text-[#0E315C] mb-4">
              {selectedConversation ? `Email History - ${selectedConversation.clientName}` : "Select a conversation to view emails"}
            </h2>
            
            {selectedConversation ? (
              <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                {/* Conversation header */}
                <div className="p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/30">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="font-medium text-[#0E315C]">Client:</label>
                      <p className="text-[#0E315C]/80">{selectedConversation.clientEmail}</p>
                    </div>
                    <div>
                      <label className="font-medium text-[#0E315C]">Case:</label>
                      <p className="text-[#0E315C]/80">{selectedConversation.caseNumber}</p>
                    </div>
                    <div>
                      <label className="font-medium text-[#0E315C]">Total Emails:</label>
                      <p className="text-[#0E315C]/80">{selectedConversation.messages.length}</p>
                    </div>
                    <div>
                      <label className="font-medium text-[#0E315C]">Last Activity:</label>
                      <p className="text-[#0E315C]/80">{formatDate(selectedConversation.lastActivity)}</p>
                    </div>
                  </div>
                </div>

                {/* Email timeline */}
                <div className="space-y-3">
                  {selectedConversation.messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={cn(
                        "relative p-4 rounded-xl border transition-all duration-200",
                        message.sender === "ai" 
                          ? "bg-white/20 border-white/30 ml-0 mr-8" 
                          : "bg-[#C1D9F6]/20 border-[#C1D9F6]/40 ml-8 mr-0",
                        "backdrop-blur-sm hover:bg-white/30"
                      )}
                    >
                      {/* Timeline connector */}
                      {index < selectedConversation.messages.length - 1 && (
                        <div className="absolute left-6 bottom-0 w-px h-3 bg-gradient-to-b from-[#99C0F0]/50 to-transparent transform translate-y-full" />
                      )}
                      
                      <div className="space-y-3">
                        {/* Message header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={cn(
                              "w-6 h-6 rounded-lg flex items-center justify-center",
                              message.sender === "ai" 
                                ? "bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE]" 
                                : "bg-gradient-to-br from-[#C1D9F6] to-[#C5BFEE]"
                            )}>
                              {message.sender === "ai" ? (
                                <Bot className="w-3 h-3 text-white" />
                              ) : (
                                <User className="w-3 h-3 text-white" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-[#0E315C]">
                                  {message.sender === "ai" ? message.aiAgent : selectedConversation.clientName}
                                </span>
                                <Badge className={cn("text-xs border", getStatusColor(message.status))}>
                                  {message.status}
                                </Badge>
                              </div>
                              <p className="text-xs text-[#0E315C]/60">
                                {new Date(message.sentAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedMessage(expandedMessage === message.id ? null : message.id)}
                            className="p-1 hover:bg-white/20 rounded-full"
                          >
                            {expandedMessage === message.id ? (
                              <ChevronDown className="w-4 h-4 text-[#0E315C]/60" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-[#0E315C]/60" />
                            )}
                          </Button>
                        </div>

                        {/* Subject */}
                        <p className="font-medium text-sm text-[#0E315C]">
                          {message.subject}
                        </p>

                        {/* Content preview or full content */}
                        <div className={cn(
                          "text-sm text-[#0E315C]/80 leading-relaxed",
                          expandedMessage === message.id ? "" : "line-clamp-2"
                        )}>
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="bg-white/20 border-white/30 text-[#0E315C] hover:bg-white/40"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Thread
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="bg-white/20 border-white/30 text-[#0E315C] hover:bg-white/40"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Follow-up
                    </Button>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "border",
                      selectedConversation.responseReceived 
                        ? "bg-[#C1D9F6]/20 text-[#0E315C] border-[#C1D9F6]/30" 
                        : "bg-orange-100/80 text-orange-800 border-orange-200"
                    )}
                  >
                    {selectedConversation.responseReceived ? "Client Responded" : "Awaiting Response"}
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Mail className="w-12 h-12 text-[#99C0F0]/50 mb-4" />
                <p className="text-[#0E315C]/60 mb-2">
                  Select a client conversation to view the complete email history
                </p>
                <p className="text-sm text-[#0E315C]/40">
                  Click on any conversation from the list to see all AI-generated emails and client responses
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
