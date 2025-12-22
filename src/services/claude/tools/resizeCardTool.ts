import Anthropic from "@anthropic-ai/sdk";

export const resizeCardTool: Anthropic.Tool = {
  name: "resize_card",
  description:
    "Resize a card in the grid layout to specific dimensions. Width is in grid columns (1-12), height is in grid rows. Used on pages with grid layouts.",
  input_schema: {
    type: "object",
    properties: {
      item_id: {
        type: "string",
        description:
          "The ID of the card to resize (e.g., 'trades', 'credit', 'holdings', 'risk', 'transactions', 'AAPL', 'MSFT', 'TSLA')",
      },
      width: {
        type: "number",
        description:
          "Width in grid columns (1-12). 12 = full width, 6 = half width, 4 = third width",
        minimum: 1,
        maximum: 12,
      },
      height: {
        type: "number",
        description:
          "Height in grid rows. Each row is approximately 100px. Typical values: 4-8 for tables, 6-10 for charts",
        minimum: 1,
      },
    },
    required: ["item_id", "width", "height"],
  },
};
