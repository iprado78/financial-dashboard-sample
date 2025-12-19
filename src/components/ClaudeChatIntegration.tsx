import { ClaudeService } from "@/services/claude/claudeService";
import {
  useClearTableFilters,
  useSetTableFilters,
} from "@/stores/TableFilterStore";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import ChatWidget, { Message } from "./ChatWidget";

let claudeService: ClaudeService | null = null;

export default function ClaudeChatIntegration() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [needsApiKey, setNeedsApiKey] = useState(true);
  const navigate = useNavigate();
  const setTableFilters = useSetTableFilters();
  const clearTableFilters = useClearTableFilters();

  // Check for existing API key on mount
  useEffect(() => {
    const storedKey =
      localStorage.getItem("anthropic_api_key") ||
      import.meta.env.VITE_ANTHROPIC_API_KEY;
    if (storedKey) {
      setApiKey(storedKey);
      setNeedsApiKey(false);
      // Show welcome message
      setMessages([
        {
          id: "1",
          role: "assistant",
          content:
            "Hi! I'm your AI assistant. I can help you filter tables, navigate pages, and analyze data. Try asking me something like 'Show me trades over $1000' or 'Navigate to charts page'.",
          timestamp: new Date(),
        },
      ]);
    } else {
      // Show API key prompt
      setMessages([
        {
          id: "1",
          role: "assistant",
          content:
            "Welcome! To get started, I'll need your Anthropic API key.\n\nPlease paste your API key (it starts with 'sk-ant-'). You can get one from: https://console.anthropic.com/\n\nYour key will be stored securely in your browser's localStorage.",
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  // Initialize Claude service with API key
  const initializeClaudeService = useCallback(() => {
    if (!claudeService && apiKey) {
      claudeService = new ClaudeService(apiKey);
    }
    if (!claudeService) {
      throw new Error("API key not configured");
    }
    return claudeService;
  }, [apiKey]);

  // Tool execution handler
  const handleToolUse = useCallback(
    (toolName: string, toolInput: any) => {
      console.log("Executing tool:", toolName, toolInput);

      switch (toolName) {
        case "filter_table": {
          const { table_name, filters } = toolInput;
          setTableFilters(table_name, filters);
          return {
            success: true,
            message: `Applied ${filters.length} filter(s) to ${table_name} table`,
            filters_applied: filters,
          };
        }

        case "navigate_to_page": {
          const { page } = toolInput;
          const routes: Record<string, string> = {
            home: "/",
            tableOverview: "/tableOverview",
            candleSticks: "/candleSticks",
          };
          navigate({ to: routes[page] || "/" });
          return {
            success: true,
            message: `Navigated to ${page} page`,
          };
        }

        case "clear_filters": {
          const { table_name } = toolInput;
          clearTableFilters(table_name);
          return {
            success: true,
            message: `Cleared all filters from ${table_name} table`,
          };
        }

        default:
          return {
            success: false,
            error: `Unknown tool: ${toolName}`,
          };
      }
    },
    [navigate, setTableFilters, clearTableFilters]
  );

  const handleSendMessage = useCallback(
    async (userMessage: string) => {
      // Add user message to UI
      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: userMessage,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        // Check if this is an API key submission
        if (needsApiKey && userMessage.startsWith("sk-ant-")) {
          // Validate and store the API key
          const trimmedKey = userMessage.trim();
          localStorage.setItem("anthropic_api_key", trimmedKey);
          setApiKey(trimmedKey);
          setNeedsApiKey(false);
          claudeService = null; // Reset service to use new key

          const successMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content:
              "Great! Your API key has been saved. Now you can ask me to filter tables, navigate pages, or analyze data. Try something like:\n\n• 'Show me trades over $1000'\n• 'Filter holdings by Technology sector'\n• 'Navigate to charts page'",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, successMsg]);
          setIsLoading(false);
          return;
        }

        // Check if API key is needed but not an API key submission
        if (needsApiKey) {
          const reminderMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content:
              "Please provide your Anthropic API key first (it should start with 'sk-ant-'). You can get one from https://console.anthropic.com/",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, reminderMsg]);
          setIsLoading(false);
          return;
        }

        // Initialize service if needed
        const service = initializeClaudeService();

        // Send to Claude with tool execution handler
        const response = await service.sendMessage(userMessage, handleToolUse);

        // Add assistant response to UI
        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch (error: any) {
        console.error("Chat error:", error);
        const errorMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `Error: ${error.message}\n\nIf this is an API key issue, you can clear it by typing '/clear-key' and enter a new one.`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
      }

      // Handle special commands
      if (userMessage === "/clear-key") {
        localStorage.removeItem("anthropic_api_key");
        setApiKey("");
        setNeedsApiKey(true);
        claudeService = null;
        setMessages([
          {
            id: Date.now().toString(),
            role: "assistant",
            content: "API key cleared. Please enter your new API key.",
            timestamp: new Date(),
          },
        ]);
      }
    },
    [handleToolUse, needsApiKey, initializeClaudeService]
  );

  const handleClearChat = useCallback(() => {
    // Clear conversation history in Claude service
    if (claudeService) {
      claudeService.clearHistory();
    }
    // Reset messages to welcome message
    const welcomeMsg: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: needsApiKey
        ? "Welcome! To get started, I'll need your Anthropic API key.\n\nPlease paste your API key (it starts with 'sk-ant-'). You can get one from: https://console.anthropic.com/\n\nYour key will be stored securely in your browser's localStorage."
        : "Hi! I'm your AI assistant. I can help you filter tables, navigate pages, and analyze data. Try asking me something like 'Show me trades over $1000' or 'Navigate to charts page'.",
      timestamp: new Date(),
    };
    setMessages([welcomeMsg]);
  }, [needsApiKey]);

  return (
    <ChatWidget
      onSendMessage={handleSendMessage}
      onClearChat={handleClearChat}
      messages={messages}
      isLoading={isLoading}
    />
  );
}
