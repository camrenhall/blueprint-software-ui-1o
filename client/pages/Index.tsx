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
    <div className="h-screen w-full grid grid-cols-[400px_1fr] overflow-hidden">
      {/* Sidebar */}
      <div className="relative">
        <GlassSidePanel items={menuItems} isVisible={isVisible} taskQueueCount={taskCount} />
      </div>

      {/* Main Content */}
      <div className="p-8 pt-24">
        <div className="w-full h-full bg-red-200 rounded-2xl p-8">
          <h1 className="text-4xl text-black mb-4">
            Current Page: {activeRightContent || "none"}
          </h1>
          <p className="text-2xl text-black">
            isVisible: {isVisible ? "true" : "false"}
          </p>

          {activeRightContent === "overview" && (
            <div>
              <h2 className="text-2xl text-blue-600 mb-4">OVERVIEW PAGE</h2>
              <Overview onClose={() => setActiveRightContent(null)} />
            </div>
          )}
          {activeRightContent === "create" && (
            <div>
              <h2 className="text-2xl text-blue-600 mb-4">CREATE PAGE</h2>
              <InlineCreate onClose={() => setActiveRightContent(null)} />
            </div>
          )}
          {activeRightContent === "review" && (
            <div>
              <h2 className="text-2xl text-blue-600 mb-4">REVIEW PAGE</h2>
              <InlineReview onClose={() => setActiveRightContent(null)} />
            </div>
          )}
          {activeRightContent === "taskqueue" && (
            <div>
              <h2 className="text-2xl text-blue-600 mb-4">TASK QUEUE PAGE</h2>
              <TaskQueue onClose={() => setActiveRightContent(null)} />
            </div>
          )}
          {activeRightContent === "settings" && (
            <div>
              <h2 className="text-2xl text-blue-600 mb-4">SETTINGS PAGE</h2>
              <UnifiedSettings
                selectedCategory={selectedSettingsCategory}
                onCategorySelect={handleSettingsCategorySelect}
                onBack={handleSettingsBack}
              />
            </div>
          )}
          {activeRightContent === "communications" && (
            <div>
              <h2 className="text-2xl text-blue-600 mb-4">COMMUNICATIONS PAGE</h2>
              <CommunicationsPanel onClose={() => setActiveRightContent(null)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  return <IndexContent />;
}
