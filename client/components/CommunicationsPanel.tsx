import { useState, useEffect, useMemo } from "react";
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
  ChevronDown,
  ChevronRight,
  Building,
  Reply,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CommunicationsSearchFilterBar,
  CommunicationsSortOption,
} from "@/components/CommunicationsSearchFilterBar";

interface CommunicationsPanelProps {
  onClose: () => void;
  initialClientId?: string;
}

interface EmailMessage {
  id: string;
  subject: string;
  content: string;
  sentAt: string;
  status: "sent" | "delivered" | "opened" | "replied";
  sender: "firm" | "client";
  to: string[];
  cc?: string[];
}

interface ClientConversation {
  id: string;
  clientEmail: string;
  clientName: string;
  caseNumber: string;
  lastActivity: string;
  unreadCount: number;
  priority: "high" | "medium" | "low";
  purpose:
    | "document_request"
    | "follow_up"
    | "case_update"
    | "appointment_reminder";
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
        content:
          "Dear Ms. Johnson, I hope this email finds you well. We need your medical records from St. Mary's Hospital for your personal injury case. Please provide records from January 2024 to present. You can upload them securely through our client portal or email them directly. If you have any questions, please don't hesitate to reach out.",
        sentAt: "2024-01-15T10:30:00Z",
        status: "opened",
        sender: "firm",
        to: ["sarah.johnson@email.com"],
        cc: ["paralegal@luceron.com"],
      },
      {
        id: "1b",
        subject: "Follow-up: Medical Records Still Needed",
        content:
          "Dear Ms. Johnson, This is a follow-up regarding the medical records we requested. We understand gathering documents can take time, but we need these records to proceed with your case effectively. Please let us know if you need assistance or have any questions about the process.",
        sentAt: "2024-01-16T09:15:00Z",
        status: "delivered",
        sender: "firm",
        to: ["sarah.johnson@email.com"],
      },
    ],
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
        content:
          "Dear Mr. Chen, Your deposition has been scheduled for February 12th at 10:00 AM at our office. Please arrive 15 minutes early and bring a valid ID. We will prepare you beforehand with a preparation session scheduled for February 8th. Please confirm your availability.",
        sentAt: "2024-01-14T15:45:00Z",
        status: "replied",
        sender: "firm",
        to: ["mike.chen@email.com"],
        cc: ["assistant@luceron.com"],
      },
      {
        id: "2b",
        subject: "Re: Case Update - Deposition Scheduled",
        content:
          "Thank you for the update. I can confirm my availability for both the preparation session on February 8th and the deposition on February 12th. I'll make sure to arrive early and bring my ID. Looking forward to moving this case forward.",
        sentAt: "2024-01-14T18:30:00Z",
        status: "delivered",
        sender: "client",
        to: ["attorney@luceron.com"],
        cc: ["assistant@luceron.com"],
      },
    ],
  },
  {
    id: "3",
    clientEmail: "claire.rosen@email.com",
    clientName: "Claire Rosen",
    caseNumber: "CASE-2024-003",
    lastActivity: "2024-01-16T10:30:00Z",
    unreadCount: 2,
    priority: "high",
    purpose: "document_request",
    responseReceived: false,
    messages: [
      {
        id: "3a",
        subject: "Tax Documents Uploaded Successfully",
        content:
          "Dear Ms. Rosen, We have successfully received your tax documents. Our team is now reviewing the submitted materials. We will contact you within 2-3 business days if we need any additional information.",
        sentAt: "2024-01-16T10:30:00Z",
        status: "opened",
        sender: "firm",
        to: ["claire.rosen@email.com"],
      },
    ],
  },
  {
    id: "4",
    clientEmail: "kate.morrison@email.com",
    clientName: "Kate Morrison",
    caseNumber: "CASE-2024-004",
    lastActivity: "2024-01-15T20:45:00Z",
    unreadCount: 1,
    priority: "medium",
    purpose: "document_request",
    responseReceived: false,
    messages: [
      {
        id: "4a",
        subject: "Document Review Required",
        content:
          "Dear Ms. Morrison, Your case requires immediate document review. Please review the attached contract amendments and provide your feedback by the end of this week. This is critical for moving forward with your case.",
        sentAt: "2024-01-15T20:45:00Z",
        status: "delivered",
        sender: "firm",
        to: ["kate.morrison@email.com"],
      },
    ],
  },
  {
    id: "5",
    clientEmail: "jackson.fulsom@email.com",
    clientName: "Jackson Fulsom",
    caseNumber: "CASE-2024-005",
    lastActivity: "2024-01-14T16:00:00Z",
    unreadCount: 0,
    priority: "low",
    purpose: "case_update",
    responseReceived: true,
    messages: [
      {
        id: "5a",
        subject: "Case Closure Confirmation",
        content:
          "Dear Mr. Fulsom, Congratulations! Your case has been successfully resolved. All documentation has been finalized and filed with the court. We will be sending you the final settlement documents within the next week. Thank you for choosing our firm.",
        sentAt: "2024-01-14T16:00:00Z",
        status: "replied",
        sender: "firm",
        to: ["jackson.fulsom@email.com"],
      },
      {
        id: "5b",
        subject: "Re: Case Closure Confirmation",
        content:
          "Thank you so much for all your hard work on this case. I really appreciate the professional service and excellent results. I will definitely recommend your firm to anyone who needs legal assistance.",
        sentAt: "2024-01-14T17:30:00Z",
        status: "delivered",
        sender: "client",
        to: ["legal@luceron.com"],
      },
    ],
  },
  {
    id: "6",
    clientEmail: "david.williams@email.com",
    clientName: "David Williams",
    caseNumber: "CASE-2024-006",
    lastActivity: "2024-01-17T11:45:00Z",
    unreadCount: 3,
    priority: "high",
    purpose: "appointment_reminder",
    responseReceived: false,
    messages: [
      {
        id: "6a",
        subject: "Appointment Confirmation - January 20th",
        content:
          "Dear Mr. Williams, This is to confirm your appointment scheduled for January 20th, 2024 at 2:00 PM at our office. Please bring all relevant documents including the insurance policy, police report, and any correspondence with the insurance company. If you need to reschedule, please call us at least 24 hours in advance.",
        sentAt: "2024-01-17T09:00:00Z",
        status: "opened",
        sender: "firm",
        to: ["david.williams@email.com"],
        cc: ["reception@luceron.com"],
      },
      {
        id: "6b",
        subject: "Reminder: Appointment Tomorrow at 2:00 PM",
        content:
          "Dear Mr. Williams, This is a friendly reminder about your appointment tomorrow (January 20th) at 2:00 PM. Our office is located at 123 Legal Plaza, Suite 400. Parking is available in the building garage with validation. Please arrive 10 minutes early to complete any necessary paperwork.",
        sentAt: "2024-01-19T16:30:00Z",
        status: "delivered",
        sender: "firm",
        to: ["david.williams@email.com"],
      },
      {
        id: "6c",
        subject: "Urgent: Please Confirm Your Appointment",
        content:
          "Dear Mr. Williams, We haven't received confirmation for your appointment today at 2:00 PM. Please call our office immediately at (555) 123-4567 to confirm your attendance or reschedule if needed. We have reserved this time specifically for your case discussion.",
        sentAt: "2024-01-20T11:45:00Z",
        status: "sent",
        sender: "firm",
        to: ["david.williams@email.com"],
      },
    ],
  },
  {
    id: "7",
    clientEmail: "emma.martinez@email.com",
    clientName: "Emma Martinez",
    caseNumber: "CASE-2024-007",
    lastActivity: "2024-01-18T14:20:00Z",
    unreadCount: 0,
    priority: "medium",
    purpose: "follow_up",
    responseReceived: true,
    messages: [
      {
        id: "7a",
        subject: "Settlement Offer Received",
        content:
          "Dear Ms. Martinez, We have received a settlement offer from the opposing party in the amount of $45,000. While this is a substantial offer, we believe we can negotiate for a higher amount based on the strength of your case. Please review the attached settlement proposal and let us know your thoughts by Friday.",
        sentAt: "2024-01-17T10:15:00Z",
        status: "replied",
        sender: "firm",
        to: ["emma.martinez@email.com"],
        cc: ["paralegal@luceron.com"],
      },
      {
        id: "7b",
        subject: "Re: Settlement Offer Received",
        content:
          "Thank you for the update on the settlement offer. After discussing with my family, we would like to proceed with negotiating for a higher amount as you suggested. I trust your judgment on this matter. Please keep me informed of any developments. What would be a realistic target amount to aim for?",
        sentAt: "2024-01-17T20:45:00Z",
        status: "delivered",
        sender: "client",
        to: ["attorney@luceron.com"],
        cc: ["paralegal@luceron.com"],
      },
      {
        id: "7c",
        subject: "Counter-Offer Strategy Discussion",
        content:
          "Dear Ms. Martinez, Thank you for your response. Based on our case analysis and comparable settlements, we recommend countering with $75,000. This gives us room to negotiate while reflecting the true value of your damages. We'll prepare the counter-offer this week and keep you updated on their response.",
        sentAt: "2024-01-18T14:20:00Z",
        status: "opened",
        sender: "firm",
        to: ["emma.martinez@email.com"],
      },
    ],
  },
  {
    id: "8",
    clientEmail: "robert.taylor@email.com",
    clientName: "Robert Taylor",
    caseNumber: "CASE-2024-008",
    lastActivity: "2024-01-19T09:30:00Z",
    unreadCount: 1,
    priority: "low",
    purpose: "case_update",
    responseReceived: false,
    messages: [
      {
        id: "8a",
        subject: "Discovery Phase Update",
        content:
          "Dear Mr. Taylor, I wanted to update you on the progress of your case. We have successfully completed the discovery phase and gathered all necessary evidence. The opposing counsel has 30 days to respond to our requests. During this waiting period, we'll be preparing our strategy for the next phase. No action is required from you at this time.",
        sentAt: "2024-01-19T09:30:00Z",
        status: "delivered",
        sender: "firm",
        to: ["robert.taylor@email.com"],
      },
    ],
  },
  {
    id: "9",
    clientEmail: "lisa.anderson@email.com",
    clientName: "Lisa Anderson",
    caseNumber: "CASE-2024-009",
    lastActivity: "2024-01-20T16:15:00Z",
    unreadCount: 2,
    priority: "high",
    purpose: "document_request",
    responseReceived: true,
    messages: [
      {
        id: "9a",
        subject: "Employment Records Request",
        content:
          "Dear Ms. Anderson, To strengthen your wrongful termination case, we need your complete employment file from TechCorp, including performance reviews, salary history, and any disciplinary actions. Please contact HR and request these documents. If they refuse, please let us know immediately as we may need to issue a formal subpoena.",
        sentAt: "2024-01-18T11:00:00Z",
        status: "replied",
        sender: "firm",
        to: ["lisa.anderson@email.com"],
        cc: ["paralegal@luceron.com"],
      },
      {
        id: "9b",
        subject: "Re: Employment Records Request",
        content:
          "I contacted HR this morning and they said they need a written request. They also mentioned they might charge a fee for copying. Should I proceed with the written request? Also, do you have a template I should use to ensure I ask for everything we need?",
        sentAt: "2024-01-18T15:30:00Z",
        status: "delivered",
        sender: "client",
        to: ["attorney@luceron.com"],
      },
      {
        id: "9c",
        subject: "Employment Records Request Template",
        content:
          "Dear Ms. Anderson, Please find the attached formal request letter template. Yes, please proceed with the written request - any reasonable copying fees are expected. The template ensures we get all relevant documents. Please send the letter via certified mail and keep the receipt. This creates a paper trail if they try to delay or refuse our request.",
        sentAt: "2024-01-20T16:15:00Z",
        status: "sent",
        sender: "firm",
        to: ["lisa.anderson@email.com"],
      },
    ],
  },
  {
    id: "10",
    clientEmail: "james.cooper@email.com",
    clientName: "James Cooper",
    caseNumber: "CASE-2024-010",
    lastActivity: "2024-01-21T10:00:00Z",
    unreadCount: 0,
    priority: "medium",
    purpose: "appointment_reminder",
    responseReceived: true,
    messages: [
      {
        id: "10a",
        subject: "Initial Consultation Follow-up",
        content:
          "Dear Mr. Cooper, Thank you for taking the time to meet with us yesterday. As discussed, we'll be representing you in your contract dispute case. I'm attaching our retainer agreement for your review. Please sign and return it along with the initial retainer fee. Once we receive these, we can immediately begin working on your case.",
        sentAt: "2024-01-20T14:30:00Z",
        status: "replied",
        sender: "firm",
        to: ["james.cooper@email.com"],
        cc: ["billing@luceron.com"],
      },
      {
        id: "10b",
        subject: "Re: Initial Consultation Follow-up",
        content:
          "Thank you for the prompt follow-up. I've reviewed the retainer agreement and everything looks good. I'll have the signed document and payment sent over today via courier. I'm confident we can resolve this matter efficiently. When do you anticipate we'll hear back from the other party?",
        sentAt: "2024-01-21T10:00:00Z",
        status: "delivered",
        sender: "client",
        to: ["attorney@luceron.com"],
        cc: ["billing@luceron.com"],
      },
    ],
  },
  {
    id: "11",
    clientEmail: "maria.rodriguez@email.com",
    clientName: "Maria Rodriguez",
    caseNumber: "CASE-2024-011",
    lastActivity: "2024-01-22T13:45:00Z",
    unreadCount: 1,
    priority: "high",
    purpose: "follow_up",
    responseReceived: false,
    messages: [
      {
        id: "11a",
        subject: "Court Date Scheduled - February 28th",
        content:
          "Dear Ms. Rodriguez, Your court hearing has been scheduled for February 28th, 2024 at 9:00 AM in Courtroom 4B at the County Courthouse. This is for the preliminary hearing in your custody case. Please plan to arrive at our office by 8:00 AM for final preparation. Dress professionally and bring a valid photo ID.",
        sentAt: "2024-01-21T16:20:00Z",
        status: "opened",
        sender: "firm",
        to: ["maria.rodriguez@email.com"],
        cc: ["familylaw@luceron.com"],
      },
      {
        id: "11b",
        subject: "Preparation Meeting Required",
        content:
          "Dear Ms. Rodriguez, We need to schedule a preparation meeting before your court date. This meeting is crucial for reviewing your testimony and discussing courtroom procedures. Please call our office this week to schedule this important session. We recommend scheduling it for the week before your hearing date.",
        sentAt: "2024-01-22T13:45:00Z",
        status: "delivered",
        sender: "firm",
        to: ["maria.rodriguez@email.com"],
      },
    ],
  },
  {
    id: "12",
    clientEmail: "thomas.white@email.com",
    clientName: "Thomas White",
    caseNumber: "CASE-2024-012",
    lastActivity: "2024-01-23T08:15:00Z",
    unreadCount: 0,
    priority: "low",
    purpose: "case_update",
    responseReceived: true,
    messages: [
      {
        id: "12a",
        subject: "Insurance Settlement Processed",
        content:
          "Dear Mr. White, Excellent news! The insurance company has processed your settlement and the check has been issued. After deducting our agreed-upon legal fees and case expenses, your net settlement amount is $28,750. The check should arrive within 5-7 business days. Congratulations on this successful resolution!",
        sentAt: "2024-01-22T11:30:00Z",
        status: "replied",
        sender: "firm",
        to: ["thomas.white@email.com"],
        cc: ["accounting@luceron.com"],
      },
      {
        id: "12b",
        subject: "Re: Insurance Settlement Processed",
        content:
          "This is fantastic news! Thank you so much for your excellent work throughout this entire process. You made what seemed like an impossible situation manageable and got us a great result. I'll be sure to recommend your services to anyone who needs legal help. Thank you again!",
        sentAt: "2024-01-23T08:15:00Z",
        status: "delivered",
        sender: "client",
        to: ["attorney@luceron.com"],
        cc: ["reception@luceron.com"],
      },
    ],
  },
];

export default function CommunicationsPanel({
  onClose,
  initialClientId,
}: CommunicationsPanelProps) {
  const [conversations, setConversations] =
    useState<ClientConversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] =
    useState<ClientConversation | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] =
    useState<CommunicationsSortOption>("lastActivity");
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger cascading animation after component mounts
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Handle initial client filtering
  useEffect(() => {
    if (initialClientId && conversations.length > 0) {
      // For demo purposes, we'll match client names from the Overview component
      // In a real app, this would match actual client IDs
      const clientNameMap: Record<string, string> = {
        'client_1': 'Claire Rosen',
        'client_2': 'Mike Chen',
        'client_3': 'Kate Morrison',
        'client_4': 'Jackson Fulsom'
      };

      const clientName = clientNameMap[initialClientId];
      if (clientName) {
        const matchingConversation = conversations.find(c =>
          c.clientName.includes(clientName.split(' ')[0]) ||
          c.clientName.includes(clientName.split(' ')[1])
        );
        if (matchingConversation) {
          setSelectedConversation(matchingConversation);
          // Auto-expand the most recent message
          if (matchingConversation.messages.length > 0) {
            setExpandedMessage(
              matchingConversation.messages[matchingConversation.messages.length - 1].id
            );
          }
          setSearchValue(clientName.split(' ')[0]); // Set search to highlight the client
        }
      }
    }
  }, [initialClientId, conversations]);

  // Mark conversation as read
  const markConversationAsRead = (conversationId: string) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv,
      ),
    );
  };

  // Auto-expand the most recent message when conversation changes
  const handleConversationSelect = (conversation: ClientConversation) => {
    // Mark as read if it has unread messages
    if (conversation.unreadCount > 0) {
      markConversationAsRead(conversation.id);
      // Update the local conversation object to reflect the change
      conversation = { ...conversation, unreadCount: 0 };
    }

    setSelectedConversation(conversation);
    // Set the most recent message (last in array) as expanded by default
    if (conversation.messages.length > 0) {
      setExpandedMessage(
        conversation.messages[conversation.messages.length - 1].id,
      );
    }
  };

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
      default:
        return "bg-gray-100/50 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Filter toggle function
  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId],
    );
  };

  // Clear filters function
  const clearFilters = () => {
    setActiveFilters([]);
  };

  // Filter and sort conversations
  const filteredAndSortedConversations = useMemo(() => {
    let filtered = conversations;

    // Apply search filter
    if (searchValue.trim()) {
      const search = searchValue.toLowerCase();
      filtered = filtered.filter(
        (conversation) =>
          conversation.clientName.toLowerCase().includes(search) ||
          conversation.clientEmail.toLowerCase().includes(search) ||
          conversation.caseNumber.toLowerCase().includes(search) ||
          conversation.messages.some(
            (msg) =>
              msg.subject.toLowerCase().includes(search) ||
              msg.content.toLowerCase().includes(search),
          ),
      );
    }

    // Apply status filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter((conversation) => {
        return activeFilters.some((filter) => {
          switch (filter) {
            case "unread":
              return conversation.unreadCount > 0;
            case "responded":
              return conversation.responseReceived;
            case "pending":
              return !conversation.responseReceived;
            default:
              return false;
          }
        });
      });
    }

    // Apply sorting - unread conversations always at top
    const sorted = [...filtered].sort((a, b) => {
      // First priority: unread status (unread conversations first)
      const aHasUnread = a.unreadCount > 0;
      const bHasUnread = b.unreadCount > 0;

      if (aHasUnread && !bHasUnread) return -1;
      if (!aHasUnread && bHasUnread) return 1;

      // Second priority: apply selected sort criteria within each group
      switch (sortBy) {
        case "lastActivity":
          return (
            new Date(b.lastActivity).getTime() -
            new Date(a.lastActivity).getTime()
          );
        case "clientName":
          return a.clientName.localeCompare(b.clientName);
        case "emailCount":
          return b.messages.length - a.messages.length;
        default:
          return 0;
      }
    });

    return sorted;
  }, [conversations, searchValue, activeFilters, sortBy]);

  return (
    <div className="h-full flex flex-col">
      {/* Header with enhanced glassmorphism */}
      <div className={cn(
        "text-center mb-6 transition-all duration-1000 ease-out delay-300",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      )}>
        <div className="text-center">
          <h1 className="text-2xl font-light text-[#0E315C] tracking-wide">
            Communications
          </h1>
          <p className="text-sm text-[#0E315C]/60 font-light">
            Track email conversations with clients
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-0 right-0 text-[#0E315C]/60 hover:text-[#0E315C] hover:bg-white/20 rounded-full"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Unified Search Bar */}
      <CommunicationsSearchFilterBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        activeFilters={activeFilters}
        onFilterToggle={toggleFilter}
        onClearFilters={clearFilters}
        sortBy={sortBy}
        onSortChange={setSortBy}
        className={cn(
          "mb-6 transition-all duration-800 ease-out delay-500",
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3"
        )}
      />

      <div className={cn(
        "flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 transition-all duration-1000 ease-out delay-700",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      )}>
        {/* Client Conversations List - Floating Glass Tiles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-light text-[#0E315C]">Conversations</h2>
          </div>

          <div className="space-y-3 max-h-[calc(100vh-350px)] overflow-y-auto pr-2">
            {filteredAndSortedConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Mail className="w-12 h-12 text-[#99C0F0]/50 mb-4" />
                <p className="text-[#0E315C]/60 mb-2">No conversations found</p>
                <p className="text-sm text-[#0E315C]/40">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              filteredAndSortedConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => handleConversationSelect(conversation)}
                  className={cn(
                    "relative p-3 rounded-xl cursor-pointer transition-all duration-300 border",
                    "hover:shadow-xl hover:scale-[1.02] transform",
                    // Selected state
                    selectedConversation?.id === conversation.id
                      ? "bg-white/70 border-[#99C0F0]/60 shadow-xl scale-[1.02]"
                      : // Unread vs read states (Gmail-like)
                        conversation.unreadCount > 0
                        ? "bg-white/70 border-[#99C0F0]/50 shadow-lg hover:bg-white/80 hover:border-[#99C0F0]/60"
                        : "bg-white/30 border-white/30 shadow-md hover:bg-white/40 hover:border-white/40 opacity-75",
                    "backdrop-blur-md",
                  )}
                >
                  {/* Glass effect layers - stronger for unread */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl",
                      conversation.unreadCount > 0
                        ? "opacity-100"
                        : "opacity-50",
                    )}
                  />
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-tl from-[#99C0F0]/10 to-transparent rounded-xl",
                      conversation.unreadCount > 0
                        ? "opacity-100"
                        : "opacity-30",
                    )}
                  />

                  <div className="relative space-y-1">
                    {/* Row 1: Name */}
                    <div className="flex items-center justify-between">
                      <h4
                        className={cn(
                          "text-sm leading-tight",
                          conversation.unreadCount > 0
                            ? "font-bold text-[#0E315C]"
                            : "font-medium text-[#0E315C]/60",
                        )}
                      >
                        {conversation.clientName}
                      </h4>
                    </div>

                    {/* Row 2: Email */}
                    <p
                      className={cn(
                        "text-xs leading-tight",
                        conversation.unreadCount > 0
                          ? "text-[#0E315C]/80 font-medium"
                          : "text-[#0E315C]/50",
                      )}
                    >
                      {conversation.clientEmail}
                    </p>

                    {/* Row 3: Total emails and last activity */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1">
                        <Mail
                          className={cn(
                            "w-3 h-3",
                            conversation.unreadCount > 0
                              ? "text-[#0E315C]/70"
                              : "text-[#0E315C]/40",
                          )}
                        />
                        <span
                          className={cn(
                            conversation.unreadCount > 0
                              ? "text-[#0E315C] font-semibold"
                              : "text-[#0E315C]/50 font-medium",
                          )}
                        >
                          {conversation.messages.length} emails
                        </span>
                        {conversation.unreadCount > 0 && (
                          <span className="text-[#99C0F0] font-bold">
                            ({conversation.unreadCount} new)
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <span
                          className={cn(
                            conversation.unreadCount > 0
                              ? "text-[#0E315C]/80 font-medium"
                              : "text-[#0E315C]/50",
                          )}
                        >
                          {formatDate(conversation.lastActivity)}
                        </span>
                        <div
                          className={cn(
                            conversation.unreadCount > 0
                              ? "opacity-100"
                              : "opacity-50",
                          )}
                        >
                          {getStatusIcon(
                            conversation.messages[
                              conversation.messages.length - 1
                            ].status,
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Full Email History - 2 columns */}
        <div className="col-span-2 relative">
          {/* Enhanced glassmorphism background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-[#C1D9F6]/25 to-white/30 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#99C0F0]/15 via-transparent to-[#C5BFEE]/15 rounded-2xl" />

          <div className="relative p-6">
            {selectedConversation ? (
              <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                {/* Email timeline */}
                <div className="space-y-4">
                  {(() => {
                    // Get the current state version of the selected conversation
                    const currentConversation =
                      conversations.find(
                        (c) => c.id === selectedConversation.id,
                      ) || selectedConversation;
                    return currentConversation.messages.map(
                      (message, index) => {
                        const isExpanded = expandedMessage === message.id;
                        return (
                          <div key={message.id} className="w-full">
                            <div
                              className={cn(
                                "relative w-full rounded-2xl border transition-all duration-200 shadow-lg cursor-pointer",
                                message.sender === "firm"
                                  ? "bg-gradient-to-br from-[#99C0F0]/30 to-[#C5BFEE]/20 border-[#99C0F0]/50 backdrop-blur-md"
                                  : "bg-white/60 border-white/60 backdrop-blur-md",
                                "hover:shadow-xl transform hover:scale-[1.01]",
                              )}
                              onClick={() =>
                                setExpandedMessage(
                                  expandedMessage === message.id
                                    ? null
                                    : message.id,
                                )
                              }
                            >
                              {/* Timeline connector */}
                              {index <
                                currentConversation.messages.length - 1 && (
                                <div
                                  className={cn(
                                    "absolute bottom-0 w-px h-4 bg-gradient-to-b from-[#99C0F0]/50 to-transparent transform translate-y-full",
                                    message.sender === "firm"
                                      ? "right-6"
                                      : "left-6",
                                  )}
                                />
                              )}

                              <div
                                className={cn(
                                  "transition-all duration-200",
                                  isExpanded ? "p-4" : "p-3",
                                )}
                              >
                                {/* Message header - Always visible */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div
                                      className={cn(
                                        "w-7 h-7 rounded-xl flex items-center justify-center shadow-md",
                                        message.sender === "firm"
                                          ? "bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE]"
                                          : "bg-gradient-to-br from-[#C1D9F6] to-white",
                                      )}
                                    >
                                      {message.sender === "firm" ? (
                                        <Building className="w-4 h-4 text-white" />
                                      ) : (
                                        <User className="w-4 h-4 text-[#0E315C]" />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-2">
                                        <span className="text-sm font-semibold text-[#0E315C]">
                                          {message.sender === "firm"
                                            ? "Luceron Legal"
                                            : currentConversation.clientName}
                                        </span>
                                        <span className="text-xs text-[#0E315C]/70 font-medium">
                                          {formatTime(message.sentAt)}
                                        </span>
                                      </div>

                                      {/* Subject - Always visible */}
                                      <p className="font-semibold text-sm text-[#0E315C] mt-1">
                                        {message.subject}
                                      </p>

                                      {/* Preview when collapsed */}
                                      {!isExpanded && (
                                        <p className="text-xs text-[#0E315C]/70 mt-1 line-clamp-1">
                                          {message.content.substring(0, 80)}...
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex-shrink-0">
                                    {isExpanded ? (
                                      <ChevronDown className="w-4 h-4 text-[#0E315C]/70" />
                                    ) : (
                                      <ChevronRight className="w-4 h-4 text-[#0E315C]/70" />
                                    )}
                                  </div>
                                </div>

                                {/* Expanded content */}
                                {isExpanded && (
                                  <div className="mt-4 space-y-3">
                                    {/* Recipients */}
                                    <div className="space-y-1 text-xs">
                                      <div className="flex items-start space-x-2">
                                        <span className="text-[#0E315C]/60 font-medium min-w-[20px]">
                                          To:
                                        </span>
                                        <span className="text-[#0E315C]/80">
                                          {message.to.join(", ")}
                                        </span>
                                      </div>
                                      {message.cc && message.cc.length > 0 && (
                                        <div className="flex items-start space-x-2">
                                          <span className="text-[#0E315C]/60 font-medium min-w-[20px]">
                                            CC:
                                          </span>
                                          <span className="text-[#0E315C]/80">
                                            {message.cc.join(", ")}
                                          </span>
                                        </div>
                                      )}
                                    </div>

                                    <Separator className="bg-[#0E315C]/10" />

                                    {/* Full content */}
                                    <div className="text-sm leading-relaxed text-[#0E315C]/90">
                                      {message.content}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      },
                    );
                  })()}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Mail className="w-12 h-12 text-[#99C0F0]/50 mb-4" />
                <p className="text-[#0E315C]/60 mb-2">
                  Select a client conversation to view the complete email
                  history
                </p>
                <p className="text-sm text-[#0E315C]/40">
                  Click on any conversation from the list to see emails and
                  client responses
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
