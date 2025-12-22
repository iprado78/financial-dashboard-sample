import Anthropic from "@anthropic-ai/sdk";

export const removeLayoutItemTool: Anthropic.Tool = {
  name: "remove_layout_item",
  description:
    "Remove a table or chart from the layout on the tableOverview or candleSticks page",
  input_schema: {
    type: "object",
    properties: {
      page: {
        type: "string",
        enum: ["tableOverview", "candleSticks"],
        description: "The page where the item should be removed from",
      },
      item_id: {
        type: "string",
        description:
          "The ID of the item to remove. For tableOverview: 'credit', 'holdings', 'risk', 'transactions'. For candleSticks: any stock ticker symbol that's currently displayed (e.g., 'AAPL', 'MSFT', 'TSLA', 'GOOGL', etc.)",
      },
    },
    required: ["page", "item_id"],
  },
};
