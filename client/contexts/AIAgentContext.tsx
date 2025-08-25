import { createContext, useContext, useState, ReactNode } from "react";

interface AIAgentContextType {
  isAIAgentEnabled: boolean;
  toggleAIAgent: () => void;
  setAIAgentEnabled: (enabled: boolean) => void;
}

const AIAgentContext = createContext<AIAgentContextType | undefined>(undefined);

export function useAIAgent() {
  const context = useContext(AIAgentContext);
  if (context === undefined) {
    throw new Error("useAIAgent must be used within an AIAgentProvider");
  }
  return context;
}

interface AIAgentProviderProps {
  children: ReactNode;
}

export function AIAgentProvider({ children }: AIAgentProviderProps) {
  // Default to enabled for backward compatibility
  const [isAIAgentEnabled, setIsAIAgentEnabled] = useState(true);

  const toggleAIAgent = () => {
    setIsAIAgentEnabled((prev) => !prev);
  };

  const setAIAgentEnabled = (enabled: boolean) => {
    setIsAIAgentEnabled(enabled);
  };

  const value: AIAgentContextType = {
    isAIAgentEnabled,
    toggleAIAgent,
    setAIAgentEnabled,
  };

  return (
    <AIAgentContext.Provider value={value}>
      {children}
    </AIAgentContext.Provider>
  );
}
