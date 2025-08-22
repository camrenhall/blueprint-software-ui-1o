import { useState, useEffect } from "react";
import RadialScroller from "@/components/RadialScroller";
import Dashboard from "@/components/Dashboard";
import InlineCreate from "@/components/InlineCreate";
import InlineReview from "@/components/InlineReview";
import AgentsChat from "@/components/AgentsChat";

export default function Index() {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [dashboardTitle, setDashboardTitle] = useState("");
  const [dashboardPage, setDashboardPage] = useState("overview");
  const [isVisible, setIsVisible] = useState(false);
  const [activeRightContent, setActiveRightContent] = useState<string | null>(
    "agents",
  );

  useEffect(() => {
    // Fade in the menu after a short delay
    setTimeout(() => setIsVisible(true), 200);
  }, []);
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
      id: "reports",
      title: "Reports",
      action: () => {
        setDashboardPage("reports");
        setDashboardTitle("");
        setDashboardOpen(true);
      },
    },
    {
      id: "settings",
      title: "Settings",
      subItems: [
        {
          id: "settings-profile",
          title: "User Profile",
          action: () => {
            setDashboardPage("settings-profile");
            setDashboardTitle("");
            setDashboardOpen(true);
          },
        },
        {
          id: "settings-preferences",
          title: "Preferences",
          action: () => {
            setDashboardPage("settings-preferences");
            setDashboardTitle("");
            setDashboardOpen(true);
          },
        },
        {
          id: "settings-security",
          title: "Security",
          action: () => {
            setDashboardPage("settings-security");
            setDashboardTitle("");
            setDashboardOpen(true);
          },
        },
        {
          id: "settings-billing",
          title: "Billing",
          action: () => {
            setDashboardPage("settings-billing");
            setDashboardTitle("");
            setDashboardOpen(true);
          },
        },
      ],
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
      {/* Main content */}
      <div
        className={`relative z-10 h-screen flex items-center pl-20 md:pl-32 lg:pl-40 transition-all duration-1000 ease-out ${
          isVisible
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-8"
        }`}
      >
        {/* Radial Scroller anchored to left but more centered */}
        <RadialScroller items={menuItems} className="h-full" />

        {/* Elegant Vertical Divider - Close to Menu */}
        <div className="absolute left-80 lg:left-96 xl:left-[30rem] top-0 h-full flex items-center z-20">
          <div className="relative h-[75vh]">
            {/* Main divider line - more visible */}
            <div className="w-0.5 h-full bg-gradient-to-b from-transparent via-[#99C0F0]/80 to-transparent shadow-sm"></div>

            {/* Floating accent dots */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#C5BFEE]/70 rounded-full animate-pulse shadow-lg"></div>
            <div
              className="absolute top-[20%] left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#99C0F0]/60 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-[45%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#C1D9F6]/80 rounded-full animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute top-[70%] left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#C5BFEE]/60 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#99C0F0]/70 rounded-full animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 w-0.5 bg-gradient-to-b from-transparent via-[#C1D9F6]/30 to-transparent blur-[1px]"></div>
          </div>
        </div>

        {/* Expanded Right Side Content Area */}
        <div
          className={`absolute left-80 lg:left-96 xl:left-[30rem] right-0 top-0 bottom-0 transition-all duration-1000 ease-out ${
            activeRightContent
              ? "opacity-100 transform translate-x-0"
              : "opacity-0 transform translate-x-8 pointer-events-none"
          }`}
        >
          <div className="h-full flex items-center justify-center relative px-8">
            {/* Content Container */}
            <div
              className={`w-full h-full flex items-center justify-center transition-all duration-1200 ease-out delay-200 ${
                activeRightContent
                  ? "opacity-100 transform translate-y-0 scale-100"
                  : "opacity-0 transform translate-y-6 scale-95"
              }`}
            >
              {activeRightContent === "agents" && (
                <div className="w-full h-full relative">
                  <AgentsChat onClose={() => setActiveRightContent(null)} />
                </div>
              )}
              {activeRightContent === "create" && (
                <div className="w-full max-w-4xl mx-auto">
                  <InlineCreate onClose={() => setActiveRightContent(null)} />
                </div>
              )}
              {activeRightContent === "review" && (
                <div className="w-full max-w-4xl mx-auto">
                  <InlineReview onClose={() => setActiveRightContent(null)} />
                </div>
              )}
            </div>

            {/* Enhanced ambient elements */}
            {activeRightContent && (
              <>
                <div
                  className={`absolute top-1/4 right-1/4 w-4 h-4 bg-[#99C0F0]/50 rounded-full blur-sm transition-all duration-2000 ease-out delay-500 ${
                    activeRightContent
                      ? "opacity-70 animate-pulse"
                      : "opacity-0"
                  }`}
                />
                <div
                  className={`absolute bottom-1/3 left-1/5 w-3 h-3 bg-[#C5BFEE]/60 rounded-full blur-sm transition-all duration-2000 ease-out delay-700 ${
                    activeRightContent
                      ? "opacity-60 animate-pulse"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: "1s" }}
                />
                <div
                  className={`absolute top-1/2 right-1/6 w-2.5 h-2.5 bg-[#C1D9F6]/70 rounded-full blur-sm transition-all duration-2000 ease-out delay-900 ${
                    activeRightContent
                      ? "opacity-50 animate-pulse"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: "2s" }}
                />
                <div
                  className={`absolute top-1/6 left-1/3 w-3 h-3 bg-[#99C0F0]/40 rounded-full blur-sm transition-all duration-2000 ease-out delay-1100 ${
                    activeRightContent
                      ? "opacity-40 animate-pulse"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: "0.5s" }}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Subtle corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-transparent rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-200/20 to-transparent rounded-tl-full" />

      {/* Dashboard Component */}
      <Dashboard
        isOpen={dashboardOpen}
        title={dashboardTitle}
        page={dashboardPage}
        onClose={() => setDashboardOpen(false)}
      />
    </div>
  );
}
