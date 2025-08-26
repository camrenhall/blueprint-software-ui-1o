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
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface CommunicationsPanelProps {
  onClose: () => void;
}

interface AIEmailCommunication {
  id: string;
  clientEmail: string;
  clientName: string;
  caseNumber: string;
  subject: string;
  contentPreview: string;
  fullContent: string;
  sentAt: string;
  status: "sent" | "delivered" | "opened" | "replied" | "failed";
  purpose: "document_request" | "follow_up" | "case_update" | "appointment_reminder";
  attachments?: string[];
  aiAgent: string;
  responseReceived?: boolean;
  lastActivity?: string;
}

const mockEmailCommunications: AIEmailCommunication[] = [
  {
    id: "1",
    clientEmail: "sarah.johnson@email.com",
    clientName: "Sarah Johnson",
    caseNumber: "CASE-2024-001",
    subject: "Document Request - Medical Records Required",
    contentPreview: "Dear Ms. Johnson, I hope this email finds you well. We need your medical records from...",
    fullContent: "Dear Ms. Johnson, I hope this email finds you well. We need your medical records from St. Mary's Hospital for your personal injury case. Please provide records from January 2024 to present. You can upload them securely through our client portal or email them directly. If you have any questions, please don't hesitate to reach out.",
    sentAt: "2024-01-15T10:30:00Z",
    status: "opened",
    purpose: "document_request",
    aiAgent: "DocumentCollector AI",
    responseReceived: false,
    lastActivity: "2024-01-15T14:22:00Z"
  },
  {
    id: "2",
    clientEmail: "mike.chen@email.com", 
    clientName: "Mike Chen",
    caseNumber: "CASE-2024-002",
    subject: "Case Update - Deposition Scheduled",
    contentPreview: "Dear Mr. Chen, Your deposition has been scheduled for February 12th at 10:00 AM...",
    fullContent: "Dear Mr. Chen, Your deposition has been scheduled for February 12th at 10:00 AM at our office. Please arrive 15 minutes early and bring a valid ID. We will prepare you beforehand with a preparation session scheduled for February 8th. Please confirm your availability.",
    sentAt: "2024-01-14T15:45:00Z",
    status: "replied",
    purpose: "case_update",
    aiAgent: "CaseManager AI",
    responseReceived: true,
    lastActivity: "2024-01-14T18:30:00Z"
  },
  {
    id: "3",
    clientEmail: "alex.rivera@email.com",
    clientName: "Alex Rivera", 
    caseNumber: "CASE-2024-003",
    subject: "Follow-up - Insurance Documentation",
    contentPreview: "Dear Mr. Rivera, Following up on our previous request for insurance documentation...",
    fullContent: "Dear Mr. Rivera, Following up on our previous request for insurance documentation. We still need your insurance policy details and claim numbers to proceed with your case. This is the second request - please respond within 5 business days to avoid delays in your case processing.",
    sentAt: "2024-01-13T09:15:00Z",
    status: "delivered",
    purpose: "follow_up",
    aiAgent: "FollowUp AI",
    responseReceived: false,
    lastActivity: "2024-01-13T09:15:00Z"
  },
  {
    id: "4",
    clientEmail: "emma.davis@email.com",
    clientName: "Emma Davis",
    caseNumber: "CASE-2024-004", 
    subject: "Appointment Reminder - Consultation Tomorrow",
    contentPreview: "Dear Ms. Davis, This is a reminder of your consultation appointment tomorrow...",
    fullContent: "Dear Ms. Davis, This is a reminder of your consultation appointment tomorrow, January 16th at 2:00 PM. Please bring all relevant documents we discussed. If you need to reschedule, please call us at least 24 hours in advance. We look forward to meeting with you.",
    sentAt: "2024-01-14T17:00:00Z",
    status: "opened",
    purpose: "appointment_reminder", 
    aiAgent: "Scheduler AI",
    responseReceived: false,
    lastActivity: "2024-01-14T20:15:00Z"
  }
];

export default function CommunicationsPanel({ onClose }: CommunicationsPanelProps) {
  const [selectedEmail, setSelectedEmail] = useState<AIEmailCommunication | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const getStatusIcon = (status: AIEmailCommunication["status"]) => {
    switch (status) {
      case "sent":
        return <Mail className="w-4 h-4 text-blue-600" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "opened":
        return <Eye className="w-4 h-4 text-purple-600" />;
      case "replied":
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: AIEmailCommunication["status"]) => {
    switch (status) {
      case "sent":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "opened":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "replied":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPurposeColor = (purpose: AIEmailCommunication["purpose"]) => {
    switch (purpose) {
      case "document_request":
        return "bg-orange-100 text-orange-800";
      case "follow_up":
        return "bg-yellow-100 text-yellow-800";
      case "case_update":
        return "bg-blue-100 text-blue-800";
      case "appointment_reminder":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  const filteredEmails = mockEmailCommunications.filter(email => {
    const matchesSearch = 
      email.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || email.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-xl flex items-center justify-center shadow-lg">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-light text-[#0E315C] tracking-wide">
              AI Communications Audit
            </h1>
            <p className="text-sm text-[#99C0F0]/70 font-light">
              Track AI email communications with clients
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

      {/* Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#0E315C]/50" />
          <Input
            placeholder="Search by client, email, case number, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-[#0E315C] placeholder:text-[#0E315C]/50"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-[#0E315C] text-sm"
        >
          <option value="all">All Status</option>
          <option value="sent">Sent</option>
          <option value="delivered">Delivered</option>
          <option value="opened">Opened</option>
          <option value="replied">Replied</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email List */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-light text-[#0E315C] flex items-center justify-between">
              AI Email Communications
              <Badge variant="secondary" className="bg-[#99C0F0]/20 text-[#0E315C]">
                {filteredEmails.length} emails
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                className={cn(
                  "p-4 rounded-lg border cursor-pointer transition-all duration-200",
                  "hover:bg-white/10 hover:border-[#99C0F0]/30",
                  selectedEmail?.id === email.id
                    ? "bg-white/15 border-[#99C0F0]/40"
                    : "bg-white/5 border-white/10"
                )}
              >
                <div className="space-y-3">
                  {/* Header with status and timing */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(email.status)}
                      <Badge className={cn("text-xs", getStatusColor(email.status))}>
                        {email.status}
                      </Badge>
                      {email.responseReceived && (
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                          Response Received
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-[#99C0F0]/60">
                      {formatDate(email.sentAt)}
                    </span>
                  </div>

                  {/* Client info */}
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-[#0E315C] text-sm">
                          {email.clientName}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {email.caseNumber}
                        </Badge>
                      </div>
                      <p className="text-xs text-[#0E315C]/60">
                        {email.clientEmail}
                      </p>
                    </div>
                  </div>

                  {/* Subject and preview */}
                  <div>
                    <p className="font-medium text-sm text-[#0E315C] mb-1">
                      {email.subject}
                    </p>
                    <p className="text-sm text-[#0E315C]/70 line-clamp-2">
                      {email.contentPreview}
                    </p>
                  </div>

                  {/* Purpose and AI agent */}
                  <div className="flex items-center justify-between">
                    <Badge className={cn("text-xs", getPurposeColor(email.purpose))}>
                      {email.purpose.replace('_', ' ')}
                    </Badge>
                    <span className="text-xs text-[#99C0F0]/60">
                      {email.aiAgent}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Email Detail */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-light text-[#0E315C]">
              {selectedEmail ? "Email Details" : "Select an email to view details"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedEmail ? (
              <div className="space-y-6">
                {/* Email header */}
                <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="font-medium text-[#0E315C]">To:</label>
                      <p className="text-[#0E315C]/80">{selectedEmail.clientName}</p>
                      <p className="text-[#0E315C]/60">{selectedEmail.clientEmail}</p>
                    </div>
                    <div>
                      <label className="font-medium text-[#0E315C]">Case:</label>
                      <p className="text-[#0E315C]/80">{selectedEmail.caseNumber}</p>
                    </div>
                    <div>
                      <label className="font-medium text-[#0E315C]">Sent:</label>
                      <p className="text-[#0E315C]/80">
                        {new Date(selectedEmail.sentAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="font-medium text-[#0E315C]">AI Agent:</label>
                      <p className="text-[#0E315C]/80">{selectedEmail.aiAgent}</p>
                    </div>
                  </div>
                  
                  <Separator className="my-4 bg-white/20" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(selectedEmail.status)}
                      <Badge className={cn("text-xs", getStatusColor(selectedEmail.status))}>
                        {selectedEmail.status}
                      </Badge>
                      <Badge className={cn("text-xs", getPurposeColor(selectedEmail.purpose))}>
                        {selectedEmail.purpose.replace('_', ' ')}
                      </Badge>
                    </div>
                    {selectedEmail.lastActivity && (
                      <span className="text-xs text-[#99C0F0]/60">
                        Last activity: {formatDate(selectedEmail.lastActivity)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="font-medium text-[#0E315C] block mb-2">Subject:</label>
                  <p className="text-[#0E315C]/80 p-3 bg-white/5 rounded-lg border border-white/10">
                    {selectedEmail.subject}
                  </p>
                </div>

                {/* Full content */}
                <div>
                  <label className="font-medium text-[#0E315C] block mb-2">Message Content:</label>
                  <div className="text-[#0E315C]/80 p-4 bg-white/5 rounded-lg border border-white/10 leading-relaxed">
                    {selectedEmail.fullContent}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/20 text-[#0E315C] hover:bg-white/10"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View Full Thread
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/20 text-[#0E315C] hover:bg-white/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/20 text-[#0E315C] hover:bg-white/10"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Follow-up
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Mail className="w-12 h-12 text-[#99C0F0]/50 mx-auto mb-4" />
                <p className="text-[#0E315C]/60">
                  Select an email from the list to view detailed information about the AI communication.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
