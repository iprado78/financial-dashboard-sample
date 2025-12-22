import Anthropic from "@anthropic-ai/sdk";

export const setThemeTool: Anthropic.Tool = {
  name: "set_theme",
  description:
    "Change the application theme preference to dark, light, or system (follows OS preference)",
  input_schema: {
    type: "object",
    properties: {
      theme: {
        type: "string",
        enum: ["dark", "light", "system"],
        description:
          "The theme preference: 'dark' for dark mode, 'light' for light mode, 'system' to follow OS preference",
      },
    },
    required: ["theme"],
  },
};
