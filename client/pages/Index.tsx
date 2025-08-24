import { useState, useEffect } from "react";
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
      icon: null, // Will be set by GlassSidePanel based on id
      action: () => {
        setActiveRightContent("agents");
      },
    },
    {
      id: "create",
      title: "Create",
      icon: null, // Will be set by GlassSidePanel based on id
      action: () => {
        setActiveRightContent("create");
      },
    },
    {
      id: "review",
      title: "Review",
      icon: null, // Will be set by GlassSidePanel based on id
      action: () => {
        setActiveRightContent("review");
      },
    },
    {
      id: "logout",
      title: "Log Out",
      icon: null, // Will be set by GlassSidePanel based on id
      action: () => {
        // Navigate back to login page
        window.location.href = "/";
      },
    },
  ];

  return (
    <div className="h-screen w-full relative overflow-hidden pt-16">
      {/* Conditional Menu - GlassSidePanel or ConversationHistory */}
      {isInChatMode ? (
        <ConversationHistory
          className="h-full"
          onBackToMenu={handleBackToMenu}
        />
      ) : (
        <GlassSidePanel
          items={menuItems}
          className={`transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-8"
          }`}
        />
      )}

      {/* Main content area */}
      <div
        className={`relative z-10 h-screen transition-all duration-1000 ease-out ${
          isVisible
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-8"
        }`}
      >

        {/* Right Side Content Area - Adjusted for fixed glass panel */}
        <div
          className={`absolute left-80 right-6 top-6 bottom-6 transition-all duration-1000 ease-out ${
            activeRightContent
              ? "opacity-100 transform translate-x-0"
              : "opacity-0 transform translate-x-8 pointer-events-none"
          }`}
        >
          {/* Glass morphism content background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-[#C1D9F6]/5 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl" />

          <div className="h-full relative p-8">
            {/* Content Container */}
            <div
              className={`w-full h-full transition-all duration-1200 ease-out delay-200 ${
                activeRightContent === "agents"
                  ? "opacity-100"
                  : activeRightContent
                    ? "opacity-100 flex items-center justify-center transform translate-y-0 scale-100"
                    : "opacity-0 transform translate-y-6 scale-95"
              }`}
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
            {activeRightContent && (
              <>
                <div
                  className={`absolute top-8 right-8 w-2 h-2 bg-[#99C0F0]/40 rounded-full transition-all duration-2000 ease-out delay-500 ${
                    activeRightContent
                      ? "opacity-60 animate-float"
                      : "opacity-0"
                  }`}
                />
                <div
                  className={`absolute bottom-12 left-8 w-1.5 h-1.5 bg-[#C5BFEE]/50 rounded-full transition-all duration-2000 ease-out delay-700 ${
                    activeRightContent
                      ? "opacity-50 animate-float-slow"
                      : "opacity-0"
                  }`}
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
