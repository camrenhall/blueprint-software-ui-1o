import { useState, useEffect } from "react";
import RadialScroller from "@/components/RadialScroller";
import Dashboard from "@/components/Dashboard";

export default function Index() {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [dashboardTitle, setDashboardTitle] = useState("");
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
        setDashboardTitle("");
        setDashboardOpen(true);
      },
    },
    {
      id: "create",
      title: "Create",
      action: () => {
        setDashboardTitle("");
        setDashboardOpen(true);
      },
    },
    {
      id: "review",
      title: "Review",
      action: () => {
        setDashboardTitle("");
        setDashboardOpen(true);
      },
    },
    {
      id: "reports",
      title: "Reports",
      action: () => {
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
            setDashboardTitle("");
            setDashboardOpen(true);
          },
        },
        {
          id: "settings-preferences",
          title: "Preferences",
          action: () => {
            setDashboardTitle("");
            setDashboardOpen(true);
          },
        },
        {
          id: "settings-security",
          title: "Security",
          action: () => {
            setDashboardTitle("");
            setDashboardOpen(true);
          },
        },
        {
          id: "settings-billing",
          title: "Billing",
          action: () => {
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
        onClose={() => setDashboardOpen(false)}
      />
    </div>
  );
}
