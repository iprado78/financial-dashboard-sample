import Anthropic from "@anthropic-ai/sdk";

export const clearSortTool: Anthropic.Tool = {
  name: "clear_sort",
  description:
    "Clear all sorting from a table, returning it to its default unsorted state. Works on trades, credit, holdings, risk, and transactions tables.",
  input_schema: {
    type: "object",
    properties: {
      table_name: {
        type: "string",
        enum: ["trades", "credit", "holdings", "risk", "transactions"],
        description: "The name of the table to clear sorting from",
      },
    },
    required: ["table_name"],
  },
};
