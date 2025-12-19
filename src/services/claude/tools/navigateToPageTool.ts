import Anthropic from "@anthropic-ai/sdk";

export const navigateToPageTool: Anthropic.Tool = {
  name: "navigate_to_page",
  description: "Navigate to a different page in the application",
  input_schema: {
    type: "object",
    properties: {
      page: {
        type: "string",
        enum: ["home", "tableOverview", "candleSticks"],
        description:
          "The page to navigate to. home shows the trades table, tableOverview shows all 4 tables, candleSticks shows stock charts",
      },
    },
    required: ["page"],
  },
};
