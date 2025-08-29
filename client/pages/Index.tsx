import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import GlassSidePanel from "@/components/GlassSidePanel";
import InlineCreate from "@/components/InlineCreate";
import InlineReview from "@/components/InlineReview";
import Overview from "@/components/Overview";
import TaskQueue from "@/components/TaskQueue";
import UnifiedSettings from "@/components/UnifiedSettings";
import CommunicationsPanel from "@/components/CommunicationsPanel";
import { PageContainer } from "@/components/ui/page-container";
import { useTaskQueue } from "@/hooks/useTaskQueue";

function IndexContent() {
  const { taskCount } = useTaskQueue();
  const [isVisible, setIsVisible] = useState(false);
  const [activeRightContent, setActiveRightContent] = useState<string | null>(
    "overview",
  );
  const [selectedSettingsCategory, setSelectedSettingsCategory] = useState<string | null>(null);

  useEffect(() => {
    // Fade in the menu after a short delay
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  const handleBackToMenu = () => {
    setActiveRightContent("overview");
    setSelectedSettingsCategory(null);
  };

  const handleSettingsCategorySelect = (categoryId: string) => {
    setSelectedSettingsCategory(categoryId);
  };

  const handleSettingsBack = () => {
    setSelectedSettingsCategory(null);
  };
  const menuItems = [
    {
      id: "overview",
      title: "Overview",
      action: () => {
        setActiveRightContent("overview");
      },
    },
    {
      id: "create",
      title: "Create",
      action: () => {
        setActiveRightContent("create");
      },
    },
    {
      id: "review",
      title: "Case Management",
      action: () => {
        setActiveRightContent("review");
      },
    },
    {
      id: "taskqueue",
      title: "Task Queue",
      action: () => {
        setActiveRightContent("taskqueue");
      },
    },
    {
      id: "communications",
      title: "Communications",
      action: () => {
        setActiveRightContent("communications");
      },
    },
    {
      id: "settings",
      title: "Settings",
      action: () => {
        setActiveRightContent("settings");
        setSelectedSettingsCategory(null);
      },
    },
    {
      id: "logout",
      title: "Log Out",
      action: () => {
        // Navigate back to login page
        window.location.href = "/";
      },
    },
  ];

  return (
    <div className="h-screen w-full grid grid-cols-[400px_1fr] overflow-hidden">
      {/* Sidebar */}
      <div className="relative">
        <GlassSidePanel items={menuItems} isVisible={isVisible} taskQueueCount={taskCount} />
      </div>

      {/* Main Content */}
      <div className="p-8 pt-24">
        {activeRightContent && isVisible && (
          <div className="w-full h-full bg-gradient-to-br from-white/40 via-[#C1D9F6]/25 to-white/30 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl">
            <div className="w-full h-full p-8 overflow-auto">
              {activeRightContent === "overview" && (
                <Overview onClose={() => setActiveRightContent(null)} />
              )}
              {activeRightContent === "create" && (
                <InlineCreate onClose={() => setActiveRightContent(null)} />
              )}
              {activeRightContent === "review" && (
                <InlineReview onClose={() => setActiveRightContent(null)} />
              )}
              {activeRightContent === "taskqueue" && (
                <TaskQueue onClose={() => setActiveRightContent(null)} />
              )}
              {activeRightContent === "settings" && (
                <UnifiedSettings
                  selectedCategory={selectedSettingsCategory}
                  onCategorySelect={handleSettingsCategorySelect}
                  onBack={handleSettingsBack}
                />
              )}
              {activeRightContent === "communications" && (
                <CommunicationsPanel onClose={() => setActiveRightContent(null)} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Index() {
  return <IndexContent />;
}
