import { useState, useEffect } from "react";
import RadialScroller from "@/components/RadialScroller";
import Dashboard from "@/components/Dashboard";

export default function Index() {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [dashboardTitle, setDashboardTitle] = useState("");
  const [dashboardPage, setDashboardPage] = useState("overview");
  const [isVisible, setIsVisible] = useState(false);

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
        setDashboardPage("create");
        setDashboardTitle("");
        setDashboardOpen(true);
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
