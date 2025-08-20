import { useState, useEffect } from "react";
import RadialScroller from "@/components/RadialScroller";
import Dashboard from "@/components/Dashboard";
import InlineCreate from "@/components/InlineCreate";

export default function Index() {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [dashboardTitle, setDashboardTitle] = useState("");
  const [dashboardPage, setDashboardPage] = useState("overview");
  const [isVisible, setIsVisible] = useState(false);
  const [activeRightContent, setActiveRightContent] = useState<string | null>(null);

  useEffect(() => {
    // Fade in the menu after a short delay
    setTimeout(() => setIsVisible(true), 200);
  }, []);
  const menuItems = [
    {
      id: "overview",
      title: "Overview",
      action: () => {
        setDashboardPage("overview");
        setDashboardTitle("");
        setDashboardOpen(true);
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
        setDashboardPage("review");
        setDashboardTitle("");
        setDashboardOpen(true);
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
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Main content */}
      <div
        className={`relative z-10 min-h-screen flex items-center pl-20 md:pl-32 lg:pl-40 transition-all duration-1000 ease-out ${
          isVisible
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-8"
        }`}
      >
        {/* Radial Scroller anchored to left but more centered */}
        <RadialScroller items={menuItems} className="h-full" />

        {/* Elegant Vertical Divider */}
        <div className="absolute left-[40%] top-0 h-full flex items-center z-20">
          <div className="relative h-[75vh]">
            {/* Main divider line - more visible */}
            <div className="w-0.5 h-full bg-gradient-to-b from-transparent via-[#99C0F0]/80 to-transparent shadow-sm"></div>

            {/* Floating accent dots */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#C5BFEE]/70 rounded-full animate-pulse shadow-lg"></div>
            <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#99C0F0]/60 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
            <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#C1D9F6]/80 rounded-full animate-pulse" style={{ animationDelay: "2s" }}></div>
            <div className="absolute top-[70%] left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#C5BFEE]/60 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#99C0F0]/70 rounded-full animate-pulse" style={{ animationDelay: "1.5s" }}></div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 w-0.5 bg-gradient-to-b from-transparent via-[#C1D9F6]/30 to-transparent blur-[1px]"></div>
          </div>
        </div>

        {/* Right Side Content Area */}
        {activeRightContent && (
          <div
            className={`absolute right-0 top-0 h-full transition-all duration-500 ease-out ${
              activeRightContent ? "w-[55%] opacity-100" : "w-0 opacity-0"
            }`}
          >
            <div className="h-full bg-white/40 backdrop-blur-xl border-l border-[#C1D9F6]/30 shadow-xl">
              {activeRightContent === "create" && (
                <InlineCreate onClose={() => setActiveRightContent(null)} />
              )}
            </div>
          </div>
        )}
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
