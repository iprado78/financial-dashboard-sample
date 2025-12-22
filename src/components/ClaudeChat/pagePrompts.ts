// Page-specific prompts for Claude chat

export type PageType = 'home' | 'tableOverview' | 'candleSticks';

interface PagePrompt {
  welcome: string;
  capabilities: string[];
  examples: string[];
}

const PAGE_PROMPTS: Record<PageType, PagePrompt> = {
  home: {
    welcome: "Welcome to the Financial Dashboard! I can help you navigate and control this application using natural language.",
    capabilities: [
      "Navigate to different pages (Tables, Charts)",
      "Switch between light and dark themes"
    ],
    examples: [
      "'Go to the tables page'",
      "'Show me the charts'",
      "'Switch to dark mode'"
    ]
  },
  tableOverview: {
    welcome: "I can help you manipulate and analyze the tables on this page using natural language.",
    capabilities: [
      "Filter tables by any criteria",
      "Sort columns ascending or descending",
      "Clear filters and sorting",
      "Add or remove tables from the layout",
      "Navigate to other pages",
      "Switch themes"
    ],
    examples: [
      "'Show me trades over $1000'",
      "'Filter holdings by Technology sector'",
      "'Sort the credit table by amount descending'",
      "'Clear all filters on the risk table'",
      "'Add the transactions table to the layout'"
    ]
  },
  candleSticks: {
    welcome: "I can help you manage the candlestick charts on this page.",
    capabilities: [
      "Add or remove chart symbols",
      "Navigate to other pages",
      "Switch themes"
    ],
    examples: [
      "'Add AAPL to the charts'",
      "'Remove GOOGL chart'",
      "'Show me the tables page'",
      "'Switch to light theme'"
    ]
  }
};

export function getPagePrompt(page: PageType): string {
  const prompt = PAGE_PROMPTS[page];

  const capabilitiesList = prompt.capabilities.map(c => `• ${c}`).join('\n');
  const examplesList = prompt.examples.map(e => `• ${e}`).join('\n');

  return `${prompt.welcome}\n\n**What I can do:**\n${capabilitiesList}\n\n**Try asking:**\n${examplesList}`;
}

export function getGeneralDescription(): string {
  return "**Why use chat?** While you can use the controls directly, chat lets you perform multiple actions at once and express complex queries in natural language. For example: 'Show me all technology holdings over $10k and sort by value' — all in one command.";
}

export function getApiKeyPrompt(): string {
  return `Welcome! To unlock AI-powered control of this dashboard, paste your Anthropic API key below.\n\n**What you'll get:**\n• Control tables, charts, and navigation with natural language\n• Filter and sort data by speaking naturally\n• Perform complex queries in a single command\n\nPaste your API key (starts with 'sk-ant-'). Get one at: https://console.anthropic.com/\n\nYour key is stored securely in your browser's localStorage.`;
}

export function getApiKeySuccessPrompt(currentPage: PageType): string {
  return `Perfect! Your API key is configured. ${getPagePrompt(currentPage)}`;
}
