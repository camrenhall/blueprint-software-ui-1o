import { createContext, useContext, useState, ReactNode } from "react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  isThinking?: boolean;
  isStreaming?: boolean;
  thinkingSteps?: string[];
  currentStepIndex?: number;
  isStreamingText?: boolean;
  fullContent?: string;
  rating?: "up" | "down" | null;
  typewriterProgress?: number;
}

interface Conversation {
  id: string;
  title: string;
  summary: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface ConversationContextType {
  // State
  conversations: Conversation[];
  currentConversationId: string | null;
  currentConversation: Conversation | null;
  isInChatMode: boolean;

  // Actions
  createNewConversation: (firstMessage: Message) => string;
  createEagerConversation: () => string;
  removeConversation: (conversationId: string) => void;
  switchToConversation: (conversationId: string) => void;
  addMessageToConversation: (message: Message) => void;
  addMessageToConversationById: (conversationId: string, message: Message) => void;
  addThinkingMessage: (conversationId: string, thinkingSteps: string[]) => string;
  updateThinkingMessage: (conversationId: string, messageId: string, step: string) => void;
  finalizeThinkingMessage: (conversationId: string, messageId: string) => void;
  addStreamingResponseMessage: (conversationId: string, fullContent: string) => string;
  completeStreamingMessage: (conversationId: string, messageId: string) => void;
  updateMessageRating: (conversationId: string, messageId: string, rating: "up" | "down" | null) => void;
  updateTypewriterProgress: (conversationId: string, messageId: string, progress: number) => void;
  generateConversationSummary: (messages: Message[]) => string;
  startNewConversation: () => void;
  exitChatMode: () => void;
  enterChatMode: () => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export function useConversationContext() {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error('useConversationContext must be used within a ConversationProvider');
  }
  return context;
}

interface ConversationProviderProps {
  children: ReactNode;
}

export function ConversationProvider({ children }: ConversationProviderProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isInChatMode, setIsInChatMode] = useState(false);

  const currentConversation = conversations.find(conv => conv.id === currentConversationId) || null;

  const generateConversationSummary = (messages: Message[]): string => {
    if (messages.length === 0) return "New conversation";

    const firstUserMessage = messages.find(msg => msg.role === "user");
    if (!firstUserMessage) return "New conversation";

    // Generate a concise summary from the first user message
    const content = firstUserMessage.content.trim();

    // If the message is short enough, use it as is
    if (content.length <= 40) {
      return content;
    }

    // Extract key phrases and create a summary
    const keywords = content
      .toLowerCase()
      .split(/\s+/)
      .filter(word =>
        word.length > 3 &&
        !['with', 'that', 'this', 'what', 'when', 'where', 'how', 'why', 'the', 'and', 'but', 'or', 'so', 'can', 'you', 'help', 'need'].includes(word)
      )
      .slice(0, 3);

    if (keywords.length > 0) {
      const summary = keywords.join(' ');
      return summary.length > 35 ? summary.substring(0, 32) + '...' : summary;
    }

    // Fallback to truncated first message
    return content.substring(0, 35) + (content.length > 35 ? '...' : '');
  };

  const createNewConversation = (firstMessage: Message): string => {
    const now = new Date();
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: `Conversation ${conversations.length + 1}`,
      summary: generateConversationSummary([firstMessage]),
      messages: [firstMessage],
      createdAt: now,
      updatedAt: now,
    };

    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
    setIsInChatMode(true);

    return newConversation.id;
  };

  const createEagerConversation = (): string => {
    const now = new Date();
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: `Conversation ${conversations.length + 1}`,
      summary: "New Conversation",
      messages: [],
      createdAt: now,
      updatedAt: now,
    };

    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
    setIsInChatMode(true);

    return newConversation.id;
  };

  const removeConversation = (conversationId: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    // If we're removing the current conversation, clear the current ID
    if (currentConversationId === conversationId) {
      setCurrentConversationId(null);
    }
  };

  const switchToConversation = (conversationId: string) => {
    setCurrentConversationId(conversationId);
    setIsInChatMode(true);
  };

  const addMessageToConversation = (message: Message) => {
    if (!currentConversationId) return;
    addMessageToConversationById(currentConversationId, message);
  };

  const addMessageToConversationById = (conversationId: string, message: Message) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const updatedMessages = [...conv.messages, message];
        return {
          ...conv,
          messages: updatedMessages,
          summary: generateConversationSummary(updatedMessages),
          updatedAt: new Date(),
        };
      }
      return conv;
    }));
  };

  const addThinkingMessage = (conversationId: string, thinkingSteps: string[]): string => {
    const messageId = Date.now().toString() + "_thinking";
    const thinkingMessage: Message = {
      id: messageId,
      content: "",
      role: "assistant",
      timestamp: new Date(),
      isThinking: true,
      isStreaming: true,
      thinkingSteps: [...thinkingSteps]
    };

    addMessageToConversationById(conversationId, thinkingMessage);
    return messageId;
  };

  const updateThinkingMessage = (conversationId: string, messageId: string, step: string) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const updatedMessages = conv.messages.map(msg => {
          if (msg.id === messageId && msg.isThinking) {
            const newSteps = [...(msg.thinkingSteps || []), step];
            return {
              ...msg,
              thinkingSteps: newSteps,
              currentStepIndex: newSteps.length - 1
            };
          }
          return msg;
        });
        return {
          ...conv,
          messages: updatedMessages,
          updatedAt: new Date(),
        };
      }
      return conv;
    }));
  };

  const finalizeThinkingMessage = (conversationId: string, messageId: string) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const updatedMessages = conv.messages.map(msg => {
          if (msg.id === messageId && msg.isThinking) {
            return {
              ...msg,
              isThinking: false,
              isStreaming: false,
              content: "Thinking process completed"
            };
          }
          return msg;
        });
        return {
          ...conv,
          messages: updatedMessages,
          updatedAt: new Date(),
        };
      }
      return conv;
    }));
  };

  const addStreamingResponseMessage = (conversationId: string, fullContent: string): string => {
    const messageId = Date.now().toString() + "_response";
    const responseMessage: Message = {
      id: messageId,
      content: "", // Start with empty content
      role: "assistant",
      timestamp: new Date(),
      isStreamingText: true,
      fullContent: fullContent
    };

    addMessageToConversationById(conversationId, responseMessage);
    return messageId;
  };

  const completeStreamingMessage = (conversationId: string, messageId: string) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const updatedMessages = conv.messages.map(msg => {
          if (msg.id === messageId && msg.isStreamingText) {
            return {
              ...msg,
              content: msg.fullContent || "",
              isStreamingText: false,
              fullContent: undefined
            };
          }
          return msg;
        });
        return {
          ...conv,
          messages: updatedMessages,
          summary: generateConversationSummary(updatedMessages),
          updatedAt: new Date(),
        };
      }
      return conv;
    }));
  };

  const updateMessageRating = (conversationId: string, messageId: string, rating: "up" | "down" | null) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const updatedMessages = conv.messages.map(msg => {
          if (msg.id === messageId) {
            return {
              ...msg,
              rating: rating
            };
          }
          return msg;
        });
        return {
          ...conv,
          messages: updatedMessages,
          updatedAt: new Date(),
        };
      }
      return conv;
    }));
  };

  const updateTypewriterProgress = (conversationId: string, messageId: string, progress: number) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const updatedMessages = conv.messages.map(msg => {
          if (msg.id === messageId) {
            return {
              ...msg,
              typewriterProgress: progress
            };
          }
          return msg;
        });
        return {
          ...conv,
          messages: updatedMessages,
        };
      }
      return conv;
    }));
  };

  const exitChatMode = () => {
    // Clean up empty conversations before exiting
    if (currentConversationId) {
      const currentConv = conversations.find(conv => conv.id === currentConversationId);
      if (currentConv && currentConv.messages.length === 0) {
        removeConversation(currentConversationId);
      }
    }

    setIsInChatMode(false);
    setCurrentConversationId(null);
  };

  const startNewConversation = () => {
    createEagerConversation();
  };

  const enterChatMode = () => {
    setIsInChatMode(true);
  };

  const value: ConversationContextType = {
    conversations,
    currentConversationId,
    currentConversation,
    isInChatMode,
    createNewConversation,
    createEagerConversation,
    removeConversation,
    switchToConversation,
    addMessageToConversation,
    addMessageToConversationById,
    addThinkingMessage,
    updateThinkingMessage,
    finalizeThinkingMessage,
    addStreamingResponseMessage,
    completeStreamingMessage,
    updateMessageRating,
    generateConversationSummary,
    startNewConversation,
    exitChatMode,
    enterChatMode,
  };

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
}
