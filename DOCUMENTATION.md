# Financial Dashboard Documentation

Welcome to the Financial Dashboard documentation. This is your starting point for understanding, developing, and extending the application.

## 📚 Documentation Index

### Getting Started
- **[README](./README.md)** - Quick start guide, tech stack, and project overview
- **[Setup & Installation](./README.md#getting-started)** - Node.js installation and development server setup

### Feature Documentation
- **[Claude Chat Integration](./CHAT_SETUP.md)** - AI-powered natural language control system
- **[Design System](./DESIGN_SYSTEM.md)** - UI patterns, colors, and component guidelines

### Developer Guides
- **[Claude API Implementation](./src/services/claude/IMPLEMENTATION_GUIDE.md)** - Tool handler implementation and architecture

---

## 🎯 Quick Navigation

### I want to...

#### Get Started
- **Set up the project** → [README - Getting Started](./README.md#getting-started)
- **Start coding** → [README - Available Scripts](./README.md#available-scripts)

#### Use Features
- **Control the app with AI** → [CHAT_SETUP - Overview](./CHAT_SETUP.md#overview)
- **Enter my API key** → [CHAT_SETUP - Setup](./CHAT_SETUP.md#easy-way-enter-api-key-in-chat-recommended)
- **See usage examples** → [CHAT_SETUP - Usage Examples](./CHAT_SETUP.md#usage-examples)

#### Build UI Components
- **Understand the design system** → [DESIGN_SYSTEM - Overview](./DESIGN_SYSTEM.md#overview)
- **Use semantic colors** → [DESIGN_SYSTEM - Color System](./DESIGN_SYSTEM.md#color-system)
- **Follow component patterns** → [DESIGN_SYSTEM - Component Patterns](./DESIGN_SYSTEM.md#component-patterns)
- **Migrate old components** → [DESIGN_SYSTEM - Migration Guide](./DESIGN_SYSTEM.md#migration-guide)

#### Implement Claude Tools
- **Add new AI tools** → [IMPLEMENTATION_GUIDE - Tool Handler](./src/services/claude/IMPLEMENTATION_GUIDE.md#tool-handler-implementation)
- **Understand architecture** → [IMPLEMENTATION_GUIDE - Implementation Strategy](./src/services/claude/IMPLEMENTATION_GUIDE.md#implementation-strategy)

---

## 🏗️ Architecture Overview

### Application Structure

```
financial-dashboard-sample/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ClaudeChat/   # AI chat widget
│   │   ├── GridLayout/   # Dashboard layout system
│   │   ├── Header/       # Navigation and branding
│   │   └── Table/        # AG Grid wrapper
│   ├── data/             # JSON data files
│   ├── grids/            # Table configurations
│   ├── routes/           # Page components (TanStack Router)
│   ├── services/         # Business logic & APIs
│   │   └── claude/       # Claude API integration
│   ├── stores/           # State management (Zustand)
│   └── styles/           # Design system constants
├── docs/                 # Documentation files
└── public/               # Static assets
```

### Key Technologies

| Technology | Purpose | Documentation |
|------------|---------|---------------|
| **React 18** | UI library | [react.dev](https://react.dev/) |
| **TypeScript** | Type safety | [typescriptlang.org](https://www.typescriptlang.org/) |
| **TailwindCSS** | Styling | [tailwindcss.com](https://tailwindcss.com/) |
| **TanStack Router** | Routing | [tanstack.com/router](https://tanstack.com/router/latest) |
| **AG Grid** | Data tables | [ag-grid.com](https://www.ag-grid.com/) |
| **AG Charts** | Financial charts | [ag-grid.com/charts](https://www.ag-grid.com/charts/) |
| **Zustand** | State management | [github.com/pmndrs/zustand](https://github.com/pmndrs/zustand) |
| **Anthropic Claude** | AI integration | [anthropic.com](https://www.anthropic.com/) |

---

## 📖 Documentation Structure

### [README.md](./README.md)
Your first stop for:
- Installing Node.js
- Starting the dev server
- Understanding features
- Available npm scripts

### [CHAT_SETUP.md](./CHAT_SETUP.md)
Everything about the AI chat widget:
- How to get an API key
- Usage examples
- Available commands
- Security considerations

### [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
Building consistent UIs:
- Color palette and semantic tokens
- Component patterns
- Migration guide for legacy code
- Best practices

### [IMPLEMENTATION_GUIDE.md](./src/services/claude/IMPLEMENTATION_GUIDE.md)
For developers adding AI tools:
- Tool handler structure
- Implementation phases
- Cost optimization
- Testing checklist

---

## 🚀 Common Workflows

### Starting Development

1. **Install Node.js 18** → [README](./README.md#installing-nodejs)
2. **Install dependencies**: `pnpm install`
3. **Start dev server**: `pnpm run dev`
4. **Open in browser**: `http://localhost:5173`

### Adding AI Chat Capability

1. **Get Anthropic API key** → [console.anthropic.com](https://console.anthropic.com/)
2. **Paste key in chat widget** → [CHAT_SETUP](./CHAT_SETUP.md#easy-way-enter-api-key-in-chat-recommended)
3. **Try examples** → [CHAT_SETUP - Usage Examples](./CHAT_SETUP.md#usage-examples)

### Building a New Component

1. **Review design system** → [DESIGN_SYSTEM - Component Patterns](./DESIGN_SYSTEM.md#component-patterns)
2. **Use semantic colors** → [DESIGN_SYSTEM - Color System](./DESIGN_SYSTEM.md#color-system)
3. **Import design constants** → `@/styles/designSystem`
4. **Follow TypeScript patterns** → [DESIGN_SYSTEM - TypeScript Interfaces](./DESIGN_SYSTEM.md#component-patterns)

### Implementing a New Claude Tool

1. **Create tool definition** → `src/services/claude/tools/yourToolName.ts`
2. **Follow handler pattern** → [IMPLEMENTATION_GUIDE](./src/services/claude/IMPLEMENTATION_GUIDE.md#tool-handler-implementation)
3. **Register in tools array** → `src/services/claude/tools/tools.ts`
4. **Add handler** → `ClaudeChatIntegration.tsx`
5. **Test thoroughly** → [Testing Checklist](./src/services/claude/IMPLEMENTATION_GUIDE.md#testing-checklist)

---

## 🎨 Design Principles

### Code Organization
- **Single Responsibility**: One component, one purpose
- **Composition Over Inheritance**: Build with sub-components
- **Type Safety First**: Always use TypeScript interfaces
- **Extract Constants**: No inline Tailwind classes

### Styling
- **Semantic Colors**: Use `primary`, not `blue-600`
- **Design System**: Import from `@/styles/designSystem`
- **Dark Mode**: Always include dark mode variants
- **Accessibility**: ARIA labels and semantic HTML

### State Management
- **Local First**: Use component state when possible
- **Zustand for Shared**: Store-level state for cross-component data
- **Minimal Props**: Avoid prop drilling with stores
- **Direct Manipulation**: Tools directly update stores/APIs

---

## 📝 Contributing Guidelines

### Before You Code
1. Read relevant documentation section
2. Check existing patterns in similar components
3. Understand the design system

### While Coding
1. Follow TypeScript strictly
2. Use semantic color tokens
3. Extract all Tailwind classes
4. Create sub-components for complex UIs
5. Add comprehensive comments

### Before Committing
1. Run `pnpm run typecheck`
2. Run `pnpm run lint`
3. Test in both light and dark mode
4. Verify responsive behavior

---

## 🔍 Troubleshooting

### Common Issues

**Node.js version errors**
→ See [README - Installing Node.js](./README.md#installing-nodejs)

**API key not working**
→ See [CHAT_SETUP - Security Note](./CHAT_SETUP.md#security-note)

**Styling inconsistencies**
→ See [DESIGN_SYSTEM - Migration Guide](./DESIGN_SYSTEM.md#migration-guide)

**Tool handlers not executing**
→ See [IMPLEMENTATION_GUIDE - Implementation Strategy](./src/services/claude/IMPLEMENTATION_GUIDE.md#implementation-strategy)

---

## 📧 Getting Help

1. **Check this documentation** - Start here for answers
2. **Review code examples** - Look at refactored components
3. **Read tool definitions** - See `src/services/claude/tools/`
4. **Check design system** - Reference `src/styles/designSystem.ts`

---

**Last Updated**: December 2024
**Version**: 1.0.0
