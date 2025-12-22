import Anthropic from "@anthropic-ai/sdk";
import { addLayoutItemTool } from "./addLayoutItemTool";
import { changeChartRangeTool } from "./changeChartRangeTool";
import { changeChartStyleTool } from "./changeChartStyleTool";
import { clearFiltersTool } from "./clearFiltersTool";
import { clearSortTool } from "./clearSortTool";
import { filterTableTool } from "./filterTableTool";
import { navigateToPageTool } from "./navigateToPageTool";
import { removeLayoutItemTool } from "./removeLayoutItemTool";
import { setThemeTool } from "./setThemeTool";
import { sortTableTool } from "./sortTableTool";

export const TOOLS: Anthropic.Tool[] = [
  // Navigation
  navigateToPageTool,

  // Table operations
  filterTableTool,
  clearFiltersTool,
  sortTableTool,
  clearSortTool,

  // Layout management
  addLayoutItemTool,
  removeLayoutItemTool,

  // Chart operations
  changeChartStyleTool,
  changeChartRangeTool,

  // Theme
  setThemeTool,
];
