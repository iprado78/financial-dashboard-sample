import Anthropic from "@anthropic-ai/sdk";
import { clearFiltersTool } from "./clearFiltersTool";
import { filterTableTool } from "./filterTableTool";
import { navigateToPageTool } from "./navigateToPageTool";

export const TOOLS: Anthropic.Tool[] = [
  filterTableTool,
  navigateToPageTool,
  clearFiltersTool,
];
