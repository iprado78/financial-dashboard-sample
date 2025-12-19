# Financial Dashboard

A modern trading dashboard application built with React, featuring real-time trade tables, portfolio analytics, and interactive candlestick charts.

## Getting Started

This project requires Node.js version 18.

### Check if Node.js is installed

```bash
node --version
```

If Node.js is not installed or you don't have version 18, follow the installation instructions below.

### Installing Node.js

#### Option 1: Official Node.js Installer
1. Visit [nodejs.org](https://nodejs.org/)
2. Download the LTS version (should be v18.x.x or higher)
3. Run the installer and follow the setup wizard
4. Verify installation: `node --version`

#### Option 2: Using Node Version Manager (nvm)
**macOS/Linux:**
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
# Restart terminal or run: source ~/.bashrc

# Install and use Node.js 18
nvm install 18
nvm use 18
```

**Windows:**
```bash
# Install nvm-windows from: https://github.com/coreybutler/nvm-windows
# Then run:
nvm install 18
nvm use 18
```

#### Option 3: Package Managers
**macOS (Homebrew):**
```bash
brew install node@18
```

**Windows (Chocolatey):**
```bash
choco install nodejs --version=18.19.0
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Start the Development Server

Once Node.js 18 is installed:

```bash
# Set Node version (if using nvm)
nvm use 18

# Install dependencies and start development server
pnpm install
pnpm run dev
```


## Features

### Pages

#### Home Page (`/`)
- Interactive trades table displaying real-time trading data
- Sortable columns and filtering capabilities
- Responsive layout with light/dark mode support

#### Table Overview Page (`/tableOverview`)
- Four comprehensive data tables:
  - **Credit Table** - Credit positions and limits
  - **Holdings Table** - Current portfolio holdings
  - **Risk Table** - Risk metrics and exposure
  - **Transactions Table** - Transaction history
- Clean, organized layout with consistent styling

#### Candlestick Charts Page (`/candleSticks`)
- Dynamic candlestick chart visualization
- Multi-select dropdown to choose stock symbols
- Interactive charts with zoom, pan, and range selection
- Real-time data loading for selected symbols
- Removable symbol pills for easy management

### Navigation

- Clean navigation header with page tabs
- Breadcrumb navigation for easy orientation
- Light/Dark mode toggle with persistent theme preference
- Responsive design for various screen sizes

### Technical Features

- Built with React and TypeScript
- TailwindCSS for styling
- AG Grid for advanced table functionality
- AG Charts for financial data visualization
- TanStack Router for client-side routing
- Headless UI for accessible components

## Tech Stack

- **React** - UI library ([react.dev](https://react.dev/))
- **TypeScript** - Type safety and better developer experience
- **TailwindCSS** - Utility-first CSS framework ([tailwindcss.com](https://tailwindcss.com/))
- **TanStack Router** - Type-safe routing ([tanstack.com/router](https://tanstack.com/router/latest))
- **AG Grid** - Advanced data grid ([ag-grid.com](https://www.ag-grid.com/))
- **AG Charts** - Financial charting library
- **Headless UI** - Accessible UI components

## Project Structure

```
src/
├── components/        # Reusable UI components
├── data/             # JSON data files
│   ├── candleStick/  # Stock price data
│   ├── homePage/     # Trades data
│   └── tableOverview/# Table data files
├── grids/            # AG Grid table configurations
├── routes/           # Page components
├── services/         # Business logic and data services
└── stores/           # State management
```

## Available Scripts

```bash
# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Run TypeScript type checking
pnpm run typecheck

# Run linter
pnpm run lint
```

## Browser Support

Optimized for the latest version of Chrome. Other modern browsers should work but are not officially supported.
