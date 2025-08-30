import { useState, useEffect } from "react";
import { Clock, CheckCircle, FileText, UserPlus, Mail, FolderOpen } from "lucide-react";

type ActivityType = 'document_uploaded' | 'email_received' | 'document_review_needed' | 'case_closed';

interface RecentActivity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  time: string;
  clientId: string;
  clientName: string;
  caseId: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface OverviewProps {
  onClose: () => void;
  onNavigateToReview?: (caseId?: string) => void;
  onNavigateToCommunications?: (clientId?: string) => void;
}

export default function Overview({ onClose, onNavigateToReview, onNavigateToCommunications }: OverviewProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const recentActivities: RecentActivity[] = [
    {
      id: "1",
      type: "document_uploaded",
      title: "Document Uploaded",
      description: "Claire Rosen uploaded tax documents",
      time: "2 hours ago",
      clientId: "client_1",
      clientName: "Claire Rosen",
      caseId: "#BTYREV50101",
      icon: FolderOpen,
      color: "from-[#99C0F0] to-[#C5BFEE]",
    },
    {
      id: "2",
      type: "email_received",
      title: "Email Received",
      description: "David Chen sent follow-up questions",
      time: "4 hours ago",
      clientId: "client_2",
      clientName: "David Chen",
      caseId: "#CHEN40101",
      icon: Mail,
      color: "from-[#C5BFEE] to-[#99C0F0]",
    },
    {
      id: "3",
      type: "document_review_needed",
      title: "Document Review Needed",
      description: "Kate Morrison case requires document review",
      time: "Yesterday",
      clientId: "client_3",
      clientName: "Kate Morrison",
      caseId: "#XREMVB32482",
      icon: FileText,
      color: "from-[#99C0F0] to-[#C1D9F6]",
    },
    {
      id: "4",
      type: "case_closed",
      title: "Case Closed",
      description: "Jackson Fulsom case successfully completed",
      time: "2 days ago",
      clientId: "client_4",
      clientName: "Jackson Fulsom",
      caseId: "#FULJ30925",
      icon: CheckCircle,
      color: "from-[#C5BFEE] to-[#C1D9F6]",
    },
  ];

  return (
    <div className="h-full flex items-center justify-center px-8">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
        {/* Welcome Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-2xl flex items-center justify-center shadow-lg shadow-[#99C0F0]/20">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-light text-[#0E315C] mb-3 tracking-wide">
            What's on the agenda today?
          </h1>
          <p className="text-[#0E315C]/60 text-lg font-light max-w-lg mx-auto leading-relaxed">
            Review your recent activity and manage your legal workflow.
          </p>
        </div>

        {/* Recent Activity */}
        <div
          className={`w-full transition-all duration-1200 ease-out delay-300 ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-4"
          }`}
        >
          <div className="text-center mb-8">
            <h2 className="text-lg font-light text-[#0E315C]/70 tracking-wide">
              Recent Activity
            </h2>
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            {recentActivities.map((activity, index) => {
              const IconComponent = activity.icon;
              const handleActivityClick = () => {
                switch (activity.type) {
                  case 'document_uploaded':
                  case 'document_review_needed':
                  case 'case_closed':
                    // Navigate to Case Details page
                    onNavigateToReview?.(activity.caseId);
                    break;
                  case 'email_received':
                    // Navigate to Communications page
                    onNavigateToCommunications?.(activity.clientId);
                    break;
                }
              };

              return (
                <div
                  key={activity.id}
                  onClick={handleActivityClick}
                  className={`group bg-white/25 backdrop-blur-sm border border-[#C1D9F6]/25 rounded-full shadow-sm hover:shadow-lg transition-all duration-500 px-5 py-3 hover:bg-white/35 cursor-pointer transform hover:scale-[1.015] hover:-translate-y-0.5 ${
                    index === 0 ? "animate-fadeInUp" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    {/* Icon */}
                    <div
                      className={`w-8 h-8 bg-gradient-to-br ${activity.color} rounded-full flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}
                    >
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-[#0E315C]/90 truncate">
                          {activity.title}
                        </h3>
                        <span className="hidden sm:block w-1 h-1 bg-[#0E315C]/20 rounded-full flex-shrink-0"></span>
                        <p className="text-xs text-[#0E315C]/60 truncate flex-1">
                          {activity.description}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <div className="flex items-center space-x-1 text-xs text-[#0E315C]/40 font-light">
                          <Clock className="w-3 h-3" />
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
