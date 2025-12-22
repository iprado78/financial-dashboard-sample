import Anthropic from "@anthropic-ai/sdk";

export const sortTableTool: Anthropic.Tool = {
  name: "sort_table",
  description:
    "Sort a table by one or more columns. Can sort in ascending or descending order. Works on trades, credit, holdings, risk, and transactions tables.",
  input_schema: {
    type: "object",
    properties: {
      table_name: {
        type: "string",
        enum: ["trades", "credit", "holdings", "risk", "transactions"],
        description: "The name of the table to sort",
      },
      sort_columns: {
        type: "array",
        items: {
          type: "object",
          properties: {
            column: {
              type: "string",
              description: "The column name to sort by",
            },
            direction: {
              type: "string",
              enum: ["asc", "desc"],
              description: "'asc' for ascending (A-Z, 0-9), 'desc' for descending (Z-A, 9-0)",
            },
          },
          required: ["column", "direction"],
        },
        description:
          "Array of sort specifications. First item has highest priority.",
      },
    },
    required: ["table_name", "sort_columns"],
  },
};
