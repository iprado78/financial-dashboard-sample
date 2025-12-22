import { ClaudeService } from "@/services/claude/claudeService";
import {
  useClearTableFilters,
  useSetTableFilters,
} from "@/stores/TableFilterStore";
import { setDarkMode, setCurrentTheme, SystemTheme } from "@/stores/DarkModeStore";
import { getTableGridApi } from "@/stores/TableGridApiStore";
import { getChartController } from "@/stores/ChartRegistryStore";
import { addTable, removeTable } from "@/stores/TableOverviewStore";
import { addSymbol, removeSymbol, addSymbolData, setSymbolLoading, setSymbolError } from "@/stores/CandleSticksStore";
import { CandlestickService } from "@/services/candleStick/CandlestickService";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { getPagePrompt, getApiKeyPrompt, getApiKeySuccessPrompt, PageType } from "./pagePrompts";

import ChatWidget, { Message } from "./ClaudeWidget/ChatWidget";

let claudeService: ClaudeService | null = null;

export default function ClaudeChatIntegration() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [needsApiKey, setNeedsApiKey] = useState(true);
  const navigate = useNavigate();
  const setTableFilters = useSetTableFilters();
  const clearTableFilters = useClearTableFilters();
  const routerState = useRouterState();

  // Helper to get current page type
  const getCurrentPage = useCallback((): PageType => {
    const pathname = routerState.location.pathname;
    if (pathname === '/') return 'home';
    if (pathname === '/tableOverview') return 'tableOverview';
    if (pathname === '/candleSticks') return 'candleSticks';
    return 'home';
  }, [routerState.location.pathname]);

  // Check for existing API key on mount
  useEffect(() => {
    const storedKey =
      localStorage.getItem("anthropic_api_key") ||
      import.meta.env.VITE_ANTHROPIC_API_KEY;
    if (storedKey) {
      setApiKey(storedKey);
      setNeedsApiKey(false);
      // Show welcome message for current page
      const currentPage = getCurrentPage();
      setMessages([
        {
          id: "1",
          role: "assistant",
          content: getPagePrompt(currentPage),
          timestamp: new Date(),
        },
      ]);
    } else {
      // Show API key prompt
      setMessages([
        {
          id: "1",
          role: "assistant",
          content: getApiKeyPrompt(),
          timestamp: new Date(),
        },
      ]);
    }
  }, [getCurrentPage]);

  // Handle page navigation - clear chat and show new page prompt
  useEffect(() => {
    if (!needsApiKey && messages.length > 0) {
      const currentPage = getCurrentPage();
      setMessages([
        {
          id: Date.now().toString(),
          role: "assistant",
          content: getPagePrompt(currentPage),
          timestamp: new Date(),
        },
      ]);
    }
  }, [routerState.location.pathname, needsApiKey, getCurrentPage]);

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
    async (toolName: string, toolInput: any) => {
      console.log("Executing tool:", toolName, toolInput);

      switch (toolName) {
        case "filter_table": {
          const { table_name, filters } = toolInput;
          const gridApi = getTableGridApi(table_name);

          if (!gridApi) {
            return {
              success: false,
              error: `Table ${table_name} not found or not loaded`
            };
          }

          // Convert our filter format to ag-grid filter model
          const filterModel: Record<string, any> = {};

          filters.forEach((filter: any) => {
            const { column, operator, value } = filter;

            // Map our operators to ag-grid filter types
            switch (operator) {
              case 'equals':
                filterModel[column] = { type: 'equals', filter: value };
                break;
              case 'not_equals':
                filterModel[column] = { type: 'notEqual', filter: value };
                break;
              case 'greater_than':
                filterModel[column] = { type: 'greaterThan', filter: Number(value) };
                break;
              case 'less_than':
                filterModel[column] = { type: 'lessThan', filter: Number(value) };
                break;
              case 'contains':
                filterModel[column] = { type: 'contains', filter: value };
                break;
              case 'not_contains':
                filterModel[column] = { type: 'notContains', filter: value };
                break;
              case 'in':
                // For 'in' operator, use multiple equals conditions
                filterModel[column] = {
                  filterType: 'set',
                  values: Array.isArray(value) ? value : [value]
                };
                break;
              case 'between':
                if (Array.isArray(value) && value.length === 2) {
                  filterModel[column] = {
                    filterType: 'number',
                    type: 'inRange',
                    filter: Number(value[0]),
                    filterTo: Number(value[1])
                  };
                }
                break;
            }
          });

          // Apply the filter model to the grid
          gridApi.setFilterModel(filterModel);

          // Also store in our store for persistence
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
          const gridApi = getTableGridApi(table_name);

          if (!gridApi) {
            return {
              success: false,
              error: `Table ${table_name} not found or not loaded`
            };
          }

          // Clear filters from the grid
          gridApi.setFilterModel(null);

          // Also clear from store
          clearTableFilters(table_name);

          return {
            success: true,
            message: `Cleared all filters from ${table_name} table`,
          };
        }

        case "set_theme": {
          const { theme } = toolInput;
          const themeMap = {
            dark: SystemTheme.DARK,
            light: SystemTheme.LIGHT,
            system: SystemTheme.SYSTEM
          };
          setCurrentTheme(themeMap[theme as keyof typeof themeMap]);
          setDarkMode(
            theme === "dark" ||
            (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
          );
          return {
            success: true,
            message: `Theme set to ${theme}`
          };
        }

        case "sort_table": {
          const { table_name, sort_columns } = toolInput;
          const gridApi = getTableGridApi(table_name);
          if (!gridApi) {
            return {
              success: false,
              error: `Table ${table_name} not found or not loaded`
            };
          }

          gridApi.applyColumnState({
            state: sort_columns.map((col: { column: string; direction: string }) => ({
              colId: col.column,
              sort: col.direction
            })),
            defaultState: { sort: null }
          });

          return {
            success: true,
            message: `Sorted ${table_name} by ${sort_columns.map((c: { column: string }) => c.column).join(", ")}`
          };
        }

        case "clear_sort": {
          const { table_name } = toolInput;
          const gridApi = getTableGridApi(table_name);
          if (!gridApi) {
            return {
              success: false,
              error: `Table ${table_name} not found or not loaded`
            };
          }

          // Clear all sorting by applying empty state
          gridApi.applyColumnState({
            defaultState: { sort: null }
          });

          return {
            success: true,
            message: `Cleared sorting from ${table_name} table`
          };
        }

        case "add_layout_item": {
          const { page, item_id } = toolInput;

          if (page === "tableOverview") {
            addTable(item_id);
            return {
              success: true,
              message: `Added ${item_id} table to layout`
            };
          } else if (page === "candleSticks") {
            // Add the symbol to the layout
            addSymbol(item_id);
            setSymbolLoading(item_id, true);
            setSymbolError(item_id, "");

            // Load the candlestick data
            try {
              const data = await CandlestickService.getCandlestickData(item_id);
              addSymbolData({ symbol: item_id, data });
              setSymbolLoading(item_id, false);
              return {
                success: true,
                message: `Added ${item_id.toUpperCase()} chart to layout`
              };
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : "Failed to load data";
              setSymbolError(item_id, errorMessage);
              setSymbolLoading(item_id, false);
              return {
                success: false,
                error: `Failed to load chart data for ${item_id.toUpperCase()}: ${errorMessage}`
              };
            }
          }

          return {
            success: false,
            error: `Unknown page: ${page}`
          };
        }

        case "remove_layout_item": {
          const { page, item_id } = toolInput;

          if (page === "tableOverview") {
            removeTable(item_id);
            return {
              success: true,
              message: `Removed ${item_id} table from layout`
            };
          } else if (page === "candleSticks") {
            removeSymbol(item_id);
            return {
              success: true,
              message: `Removed ${item_id.toUpperCase()} chart from layout`
            };
          }

          return {
            success: false,
            error: `Unknown page: ${page}`
          };
        }

        case "change_chart_style": {
          const { symbol, chart_type, show_volume } = toolInput;
          const chartController = getChartController(symbol);

          if (!chartController) {
            return {
              success: false,
              error: `Chart for symbol ${symbol.toUpperCase()} not found or not loaded`
            };
          }

          const updates: any = {};

          if (chart_type) {
            chartController.setChartType(chart_type);
            updates.chart_type = chart_type;
          }

          if (show_volume !== undefined) {
            chartController.setVolume(show_volume);
            updates.volume = show_volume;
          }

          return {
            success: true,
            message: `Updated chart style for ${symbol.toUpperCase()}`,
            updates
          };
        }

        case "change_chart_range": {
          const { symbol, range_buttons, toolbar, navigator, status_bar, zoom } = toolInput;
          const chartController = getChartController(symbol);

          if (!chartController) {
            return {
              success: false,
              error: `Chart for symbol ${symbol.toUpperCase()} not found or not loaded`
            };
          }

          const updates: any = {};

          if (range_buttons !== undefined) {
            updates.rangeButtons = range_buttons;
          }
          if (toolbar !== undefined) {
            updates.toolbar = toolbar;
          }
          if (navigator !== undefined) {
            updates.navigator = navigator;
          }
          if (status_bar !== undefined) {
            updates.statusBar = status_bar;
          }
          if (zoom !== undefined) {
            updates.zoom = zoom;
          }

          chartController.updateOptions(updates);

          return {
            success: true,
            message: `Updated chart configuration for ${symbol.toUpperCase()}`,
            updates
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

          // Clear chat and show page-specific prompt
          const currentPage = getCurrentPage();
          const successMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: getApiKeySuccessPrompt(currentPage),
            timestamp: new Date(),
          };
          setMessages([successMsg]); // Clear previous messages and show success prompt
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
    [handleToolUse, needsApiKey, initializeClaudeService, getCurrentPage]
  );

  const handleClearChat = useCallback(() => {
    // Clear conversation history in Claude service
    if (claudeService) {
      claudeService.clearHistory();
    }
    // Reset messages to welcome message based on current page
    const currentPage = getCurrentPage();
    const welcomeMsg: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: needsApiKey ? getApiKeyPrompt() : getPagePrompt(currentPage),
      timestamp: new Date(),
    };
    setMessages([welcomeMsg]);
  }, [needsApiKey, getCurrentPage]);

  return (
    <ChatWidget
      onSendMessage={handleSendMessage}
      onClearChat={handleClearChat}
      messages={messages}
      isLoading={isLoading}
    />
  );
}
