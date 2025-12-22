import Anthropic from "@anthropic-ai/sdk";

export const addLayoutItemTool: Anthropic.Tool = {
  name: "add_layout_item",
  description:
    "Add a table or chart to the layout on the tableOverview or candleSticks page. Each item type can only be added if it's not already visible.",
  input_schema: {
    type: "object",
    properties: {
      page: {
        type: "string",
        enum: ["tableOverview", "candleSticks"],
        description: "The page where the item should be added",
      },
      item_id: {
        type: "string",
        description:
          "The ID of the item to add. For tableOverview: 'credit', 'holdings', 'risk', 'transactions'. For candleSticks: any stock ticker symbol (e.g., 'AAPL', 'MSFT', 'TSLA', 'GOOGL', etc.)",
      },
    },
    required: ["page", "item_id"],
  },
};
