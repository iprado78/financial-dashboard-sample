import Anthropic from "@anthropic-ai/sdk";

export const changeChartRangeTool: Anthropic.Tool = {
  name: "change_chart_range",
  description:
    "Configure the range buttons and other chart features for a candlestick chart. Can enable/disable range buttons, toolbar, navigator, status bar, and zoom functionality.",
  input_schema: {
    type: "object",
    properties: {
      symbol: {
        type: "string",
        description:
          "The stock symbol (e.g., 'AAPL', 'GOOGL') whose chart to configure",
      },
      range_buttons: {
        type: "boolean",
        description:
          "Show/hide range buttons (1M, 3M, 6M, 1Y, etc.) for quick date range selection",
      },
      toolbar: {
        type: "boolean",
        description: "Show/hide the chart toolbar with additional controls",
      },
      navigator: {
        type: "boolean",
        description:
          "Show/hide the navigator panel for zooming into specific date ranges",
      },
      status_bar: {
        type: "boolean",
        description:
          "Show/hide the status bar displaying current chart information",
      },
      zoom: {
        type: "boolean",
        description: "Enable/disable zoom functionality on the chart",
      },
    },
    required: ["symbol"],
  },
};
