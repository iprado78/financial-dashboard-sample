import Anthropic from "@anthropic-ai/sdk";

export const changeChartStyleTool: Anthropic.Tool = {
  name: "change_chart_style",
  description:
    "Change the visualization style of a candlestick chart. Supported chart types: 'candlestick', 'ohlc' (open-high-low-close bars), 'line' (line chart), 'step' (step line), or 'hlc' (high-low-close). Can also toggle volume display on/off.",
  input_schema: {
    type: "object",
    properties: {
      symbol: {
        type: "string",
        description:
          "The stock symbol (e.g., 'AAPL', 'GOOGL') whose chart style to change",
      },
      chart_type: {
        type: "string",
        enum: ["candlestick", "ohlc", "line", "step", "hlc"],
        description: "The chart type to display",
      },
      show_volume: {
        type: "boolean",
        description: "Whether to show the volume chart below the main chart",
      },
    },
    required: ["symbol"],
  },
};
