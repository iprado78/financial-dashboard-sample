import Anthropic from "@anthropic-ai/sdk";

export const filterTableTool: Anthropic.Tool = {
  name: "filter_table",
  description:
    "Filter a table by specific criteria. Can filter trades, credit, holdings, risk, or transactions tables. Supports filtering by any column with operators like greater than, less than, equals, contains, etc.",
  input_schema: {
    type: "object",
    properties: {
      table_name: {
        type: "string",
        enum: ["trades", "credit", "holdings", "risk", "transactions"],
        description: "The name of the table to filter",
      },
      filters: {
        type: "array",
        items: {
          type: "object",
          properties: {
            column: {
              type: "string",
              description: "The column name to filter on",
            },
            operator: {
              type: "string",
              enum: [
                "equals",
                "not_equals",
                "greater_than",
                "less_than",
                "contains",
                "not_contains",
                "in",
                "between",
              ],
              description: "The comparison operator",
            },
            value: {
              description:
                'The value(s) to compare against. Can be a single value or array for "in" and "between" operators',
            },
          },
          required: ["column", "operator", "value"],
        },
        description:
          "Array of filter conditions. All conditions are ANDed together.",
      },
    },
    required: ["table_name", "filters"],
  },
};
