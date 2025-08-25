import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SettingsOverview from "./components/SettingsOverview";
import SettingsCategory from "./components/SettingsCategory";
import CloudBackground from "./components/CloudBackground";
import TopNavBar from "./components/TopNavBar";
import { FeedbackButton } from "./components/FeedbackButton";

// Extend HTMLElement to include our custom property
declare global {
  interface HTMLElement {
    _reactRootContainer?: ReturnType<typeof createRoot>;
  }
}

const queryClient = new QueryClient();

// Component to conditionally render TopNavBar based on route
const ConditionalTopNavBar = () => {
  const location = useLocation();

  // Hide TopNavBar on login page
  if (location.pathname === "/") {
    return null;
  }

  return <TopNavBar />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CloudBackground />
      <BrowserRouter>
        <ConditionalTopNavBar />
        <Toaster />
        <Sonner />
        <FeedbackButton />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/menu" element={<Index />} />
          <Route path="/settings" element={<SettingsOverview />} />
          <Route path="/settings/:category" element={<SettingsCategory />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Prevent double root creation in development
const container = document.getElementById("root")!;
let root: ReturnType<typeof createRoot>;

if (!container._reactRootContainer) {
  root = createRoot(container);
  container._reactRootContainer = root;
} else {
  root = container._reactRootContainer;
}

root.render(<App />);
