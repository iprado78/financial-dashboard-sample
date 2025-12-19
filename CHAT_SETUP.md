# Claude Chat Widget Setup

## Overview
This application includes an AI-powered chat widget that allows users to interact with the dashboard using natural language commands.

## Features
- **Table Filtering**: Ask Claude to filter any table by any criteria
- **Navigation**: Ask Claude to navigate between pages
- **Context Aware**: Claude understands the app structure and available data
- **Dynamic API Key**: Enter your API key directly in the chat interface (no .env file needed!)

## Setup Instructions

### Easy Way: Enter API Key in Chat (Recommended)

1. **Start the app** and open the chat widget in the bottom right
2. **Get your API key** from https://console.anthropic.com/
3. **Paste your API key** directly into the chat (it starts with `sk-ant-`)
4. **Start chatting!** Your key is stored securely in localStorage

That's it! No configuration files needed.

### Alternative: Use .env File

If you prefer to set the API key via environment variable:

1. Get your API key from https://console.anthropic.com/
2. Open the `.env` file and add:
   ```
   VITE_ANTHROPIC_API_KEY=your_actual_api_key_here
   ```
3. Restart the dev server:
   ```bash
   pnpm run dev
   ```

## Usage Examples

Try these commands in the chat widget:

### Filtering Examples
- "Show me trades over $1000"
- "Filter holdings by Technology sector"
- "Show transactions with status completed"
- "Find trades where quantity is greater than 100"
- "Show credit entries with rating AAA"

### Navigation Examples
- "Go to the charts page"
- "Navigate to table overview"
- "Take me to the home page"

### Clear Filters
- "Clear trade filters"
- "Remove all filters from holdings table"

## How It Works

1. **Natural Language Processing**: You type a command in plain English
2. **Tool Selection**: Claude decides which tool(s) to use (filter_table, navigate_to_page, clear_filters)
3. **Execution**: The app executes the tool and updates the UI
4. **Response**: Claude confirms what was done

## Available Tables
- `trades` - Trading activity
- `credit` - Credit information
- `holdings` - Portfolio holdings
- `risk` - Risk metrics
- `transactions` - Transaction history

## Special Commands

- `/clear-key` - Clear your stored API key and enter a new one

## Security Note
⚠️ The current implementation uses `dangerouslyAllowBrowser: true` for the Anthropic SDK. This is **only for development**. In production, you should:
1. Move API calls to a backend server
2. Never expose your API key in the frontend
3. Implement proper authentication and rate limiting

Your API key is stored in browser localStorage. While this is convenient for development, in production you should use a backend proxy to handle API calls securely.
