import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import GlassSidePanel from "@/components/GlassSidePanel";
import ConversationHistory from "@/components/ConversationHistory";
import InlineCreate from "@/components/InlineCreate";
import InlineReview from "@/components/InlineReview";
import AgentsChat from "@/components/AgentsChat";
import {
  ConversationProvider,
  useConversationContext,
} from "@/contexts/ConversationContext";

function IndexContent() {
  const { isInChatMode } = useConversationContext();
  const [isVisible, setIsVisible] = useState(false);
  const [activeRightContent, setActiveRightContent] = useState<string | null>(
    "agents",
  );

  useEffect(() => {
    // Fade in the menu after a short delay
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  const handleBackToMenu = () => {
    setActiveRightContent("agents");
  };
  const menuItems = [
    {
      id: "agents",
      title: "Agents",
      action: () => {
        setActiveRightContent("agents");
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
      title: "Review",
      action: () => {
        setActiveRightContent("review");
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
    <div className="h-screen w-full relative overflow-hidden pt-16">
      {/* Fixed positioned panels - outside of transformed containers */}
      {isInChatMode ? (
        <ConversationHistory
          className="h-full"
          onBackToMenu={handleBackToMenu}
          isVisible={isVisible}
        />
      ) : (
        <GlassSidePanel items={menuItems} isVisible={isVisible} />
      )}

      {/* Main content area */}
      <div className="relative z-10 h-screen">
        {/* Right Side Content Area - Adjusted for fixed glass panel */}
        <div
          className={cn(
            "absolute left-80 right-6 top-6 bottom-6 transition-all duration-1000 ease-out",
            activeRightContent && isVisible
              ? "opacity-100"
              : "opacity-0 pointer-events-none",
          )}
        >
          {/* Glass morphism content background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-[#C1D9F6]/5 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl" />

          <div className="h-full relative p-8">
            {/* Content Container */}
            <div
              className={cn(
                "w-full h-full transition-opacity duration-800 ease-out delay-200",
                activeRightContent && isVisible ? "opacity-100" : "opacity-0",
              )}
            >
              {activeRightContent === "agents" && (
                <div className="w-full h-full relative">
                  <AgentsChat onClose={() => setActiveRightContent(null)} />
                </div>
              )}
              {activeRightContent === "create" && (
                <div className="w-full h-full mx-auto">
                  <InlineCreate onClose={() => setActiveRightContent(null)} />
                </div>
              )}
              {activeRightContent === "review" && (
                <div className="w-full h-full mx-auto">
                  <InlineReview onClose={() => setActiveRightContent(null)} />
                </div>
              )}
            </div>

            {/* Subtle ambient elements */}
            {activeRightContent && isVisible && (
              <>
                <div className="absolute top-8 right-8 w-2 h-2 bg-[#99C0F0]/40 rounded-full opacity-60 animate-float" />
                <div
                  className="absolute bottom-12 left-8 w-1.5 h-1.5 bg-[#C5BFEE]/50 rounded-full opacity-50 animate-float-slow"
                  style={{ animationDelay: "1s" }}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Subtle corner accents - adjusted for new layout */}
      <div className="absolute top-16 right-6 w-24 h-24 bg-gradient-to-bl from-[#99C0F0]/10 to-transparent rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-32 h-32 bg-gradient-to-tl from-[#C5BFEE]/10 to-transparent rounded-tl-full pointer-events-none" />
    </div>
  );
}

export default function Index() {
  return (
    <ConversationProvider>
      <IndexContent />
    </ConversationProvider>
  );
}
