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

  // Debug logging
  useEffect(() => {
    console.log('Index.tsx - activeRightContent:', activeRightContent);
    console.log('Index.tsx - isVisible:', isVisible);
  }, [activeRightContent, isVisible]);

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
    <div className="h-screen w-full relative overflow-hidden">
      {/* Fixed positioned panels - outside of transformed containers */}
      <GlassSidePanel items={menuItems} isVisible={isVisible} taskQueueCount={taskCount} />

      {/* Main content area */}
      <div className="relative z-10 h-[calc(100vh-4rem)] ml-96 pt-8 pr-8 pb-8">
        {activeRightContent && isVisible && (
          <div className="w-full h-full bg-white/50 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8">
            {activeRightContent === "overview" && (
              <div className="text-4xl text-black">
                OVERVIEW PAGE - activeRightContent: {activeRightContent}
                <Overview onClose={() => setActiveRightContent(null)} />
              </div>
            )}
            {activeRightContent === "create" && (
              <div className="text-4xl text-black">
                CREATE PAGE - activeRightContent: {activeRightContent}
                <InlineCreate onClose={() => setActiveRightContent(null)} />
              </div>
            )}
            {activeRightContent === "review" && (
              <div className="text-4xl text-black">
                REVIEW PAGE - activeRightContent: {activeRightContent}
                <InlineReview onClose={() => setActiveRightContent(null)} />
              </div>
            )}
            {activeRightContent === "taskqueue" && (
              <div className="text-4xl text-black">
                TASK QUEUE PAGE - activeRightContent: {activeRightContent}
                <TaskQueue onClose={() => setActiveRightContent(null)} />
              </div>
            )}
            {activeRightContent === "settings" && (
              <div className="text-4xl text-black">
                SETTINGS PAGE - activeRightContent: {activeRightContent}
                <UnifiedSettings
                  selectedCategory={selectedSettingsCategory}
                  onCategorySelect={handleSettingsCategorySelect}
                  onBack={handleSettingsBack}
                />
              </div>
            )}
            {activeRightContent === "communications" && (
              <div className="text-4xl text-black">
                COMMUNICATIONS PAGE - activeRightContent: {activeRightContent}
                <CommunicationsPanel onClose={() => setActiveRightContent(null)} />
              </div>
            )}
          </div>
        )}

        {/* Subtle ambient elements */}
        {activeRightContent && isVisible && (
          <>
            <div className="absolute top-24 right-12 w-2 h-2 bg-[#99C0F0]/40 rounded-full opacity-60 animate-float" />
            <div
              className="absolute bottom-18 left-[400px] w-1.5 h-1.5 bg-[#C5BFEE]/50 rounded-full opacity-50 animate-float-slow"
              style={{ animationDelay: "1s" }}
            />
          </>
        )}
      </div>

      {/* Subtle corner accents - adjusted for new layout */}
      <div className="absolute top-16 right-6 w-24 h-24 bg-gradient-to-bl from-[#99C0F0]/10 to-transparent rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-32 h-32 bg-gradient-to-tl from-[#C5BFEE]/10 to-transparent rounded-tl-full pointer-events-none" />
    </div>
  );
}

export default function Index() {
  return <IndexContent />;
}
