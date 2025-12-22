import Anthropic from "@anthropic-ai/sdk";

export const manipulateChartTool: Anthropic.Tool = {
  name: "manipulate_chart",
  description:
    "Manipulate a candlestick chart by clicking toolbar buttons. Can toggle volume display, change chart type, adjust time range, add indicators, etc. Works on any stock chart visible on the candleSticks page (e.g., AAPL, MSFT, TSLA, or any other ticker symbol).",
  input_schema: {
    type: "object",
    properties: {
      ticker: {
        type: "string",
        description:
          "The stock ticker symbol of the chart to manipulate (e.g., 'AAPL', 'MSFT', 'TSLA', 'GOOGL', etc.)",
      },
      action: {
        type: "string",
        enum: [
          "toggle_volume",
          "set_chart_type",
          "zoom_in",
          "zoom_out",
          "reset_zoom",
          "set_time_range",
        ],
        description: "The action to perform on the chart",
      },
      params: {
        type: "object",
        description:
          "Additional parameters for the action. For 'set_chart_type': {type: 'candlestick'|'line'|'area'}. For 'set_time_range': {range: '1D'|'1W'|'1M'|'3M'|'1Y'|'ALL'}",
      },
    },
    required: ["ticker", "action"],
  },
};
