import Anthropic from "@anthropic-ai/sdk";

export const clearFiltersTool: Anthropic.Tool = {
  name: "clear_filters",
  description: "Clear all filters from a specific table",
  input_schema: {
    type: "object",
    properties: {
      table_name: {
        type: "string",
        enum: ["trades", "credit", "holdings", "risk", "transactions"],
        description: "The name of the table to clear filters from",
      },
    },
    required: ["table_name"],
  },
};
