# Design System Documentation

This document outlines the design system patterns and conventions used throughout the Financial Dashboard application.

## Table of Contents

1. [Overview](#overview)
2. [Color System](#color-system)
3. [Component Patterns](#component-patterns)
4. [File Organization](#file-organization)
5. [Usage Examples](#usage-examples)
6. [Migration Guide](#migration-guide)

---

## Overview

The design system is built on three pillars:

1. **Tailwind Config** (`tailwind.config.js`) - Defines semantic color tokens
2. **Design System Constants** (`src/styles/designSystem.ts`) - Reusable Tailwind class combinations
3. **Component Patterns** - Consistent refactoring approach across all components

### Design Principles

- ✅ **Semantic Over Specific**: Use `primary` instead of `blue-600`
- ✅ **Single Source of Truth**: Colors defined once in Tailwind config
- ✅ **Consistent Patterns**: All components follow the same structure
- ✅ **Component Composition**: Break large components into focused sub-components
- ✅ **Type Safety**: TypeScript interfaces for all component props
- ✅ **Accessibility**: ARIA labels and semantic HTML throughout

---

## Color System

### Semantic Colors

All colors are defined in `tailwind.config.js` and follow semantic naming:

#### Brand & Primary Colors

```javascript
brand: {
  DEFAULT: "#00458a",  // Company brand color
  light: "#0057ab",
  dark: "#003366",
}

primary: {
  DEFAULT: "#2563eb",  // Main UI color (blue-600)
  light: "#dbeafe",    // blue-100
  dark: "#1e40af",     // blue-800
  hover: "#1d4ed8",    // blue-700
}

secondary: {
  DEFAULT: "#64748b",  // Neutral UI color (slate-500)
  light: "#f1f5f9",    // slate-100
  dark: "#334155",     // slate-700
}
```

#### Status Colors

```javascript
success: {
  DEFAULT: "#10b981",  // Positive actions (green-500)
  light: "#d1fae5",
  dark: "#065f46",
}

error: {
  DEFAULT: "#ef4444",  // Destructive actions (red-500)
  light: "#fee2e2",
  dark: "#991b1b",
}

warning: {
  DEFAULT: "#f59e0b",  // Caution (amber-500)
  light: "#fef3c7",
  dark: "#92400e",
}

info: {
  DEFAULT: "#3b82f6",  // Informational (blue-500)
  light: "#dbeafe",
  dark: "#1e40af",
}

neutral: {
  DEFAULT: "#9ca3af",  // Neutral states (gray-400)
  light: "#f3f4f6",
  dark: "#374151",
}
```

### Using Semantic Colors

#### In Tailwind Classes

```tsx
// ❌ Old way (hardcoded colors)
<button className="bg-blue-600 hover:bg-blue-700">Click me</button>

// ✅ New way (semantic colors)
<button className="bg-primary hover:bg-primary-hover">Click me</button>
```

#### In Design System Constants

```tsx
// src/styles/designSystem.ts
export const BUTTON_PRIMARY_CLASS =
  "bg-primary hover:bg-primary-hover text-white rounded-lg px-4 py-2";

export const TEXT_ERROR_CLASS = "text-error dark:text-error-light";
```

#### In Dynamic Colors (Grid Renderers)

```tsx
// src/styles/colors.ts
import { getColorClass } from "@/styles/colors";

// Generates: "bg-success-light text-success-dark dark:bg-success-dark dark:text-success-light"
const successClass = getColorClass("success");
```

---

## Component Patterns

### Standard Component Structure

Every refactored component follows this pattern:

```tsx
import { ComponentA, ComponentB } from "some-library";
import {
  DESIGN_SYSTEM_CONSTANT_1,
  DESIGN_SYSTEM_CONSTANT_2,
} from "@/styles/designSystem";

// 1. Props interfaces
interface ComponentProps {
  title: string;
  onClick: () => void;
}

// 2. Class constants (UPPERCASE_SNAKE_CASE)
const CONTAINER_CLASS = "flex items-center gap-2";
const BUTTON_CLASS = `${DESIGN_SYSTEM_CONSTANT_1} additional-classes`;

// 3. Sub-components (if needed)
interface SubComponentProps {
  label: string;
}

const SubComponent = ({ label }: SubComponentProps) => {
  return <div className={CONTAINER_CLASS}>{label}</div>;
};

// 4. Main component
export default function Component({ title, onClick }: ComponentProps) {
  return (
    <div>
      <SubComponent label={title} />
      <button className={BUTTON_CLASS} onClick={onClick}>
        Click
      </button>
    </div>
  );
}
```

### Key Patterns

#### 1. Extract All Class Constants

```tsx
// ❌ Bad: Inline classes
<div className="flex items-center justify-between p-4 bg-white">

// ✅ Good: Extracted constants
const HEADER_CLASS = "flex items-center justify-between p-4 bg-white";
<div className={HEADER_CLASS}>
```

#### 2. Component Composition

```tsx
// ❌ Bad: Large monolithic component
export default function Card({ title, content, onRemove }) {
  return (
    <div>
      <div>
        <h3>{title}</h3>
        <button onClick={onRemove}>×</button>
      </div>
      <div>{content}</div>
    </div>
  );
}

// ✅ Good: Composed sub-components
const CardHeader = ({ title, onRemove }) => (
  <div className={HEADER_CLASS}>
    <h3 className={TITLE_CLASS}>{title}</h3>
    <RemoveButton onClick={onRemove} />
  </div>
);

const RemoveButton = ({ onClick }) => (
  <button onClick={onClick} className={BUTTON_CLASS}>×</button>
);

export default function Card({ title, content, onRemove }) {
  return (
    <div className={CARD_CLASS}>
      <CardHeader title={title} onRemove={onRemove} />
      <div className={BODY_CLASS}>{content}</div>
    </div>
  );
}
```

#### 3. TypeScript Interfaces

```tsx
// Always define interfaces for:
// - Component props
// - Sub-component props
// - Event handlers

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}
```

---

## File Organization

```
src/
├── styles/
│   ├── designSystem.ts      # Reusable class constants
│   ├── colors.ts             # Color utilities for dynamic classes
│   └── index.css             # Global styles
├── components/
│   ├── ComponentName/
│   │   ├── ComponentName.tsx
│   │   ├── SubComponent1.tsx (if large enough)
│   │   └── SubComponent2.tsx (if large enough)
│   └── ...
└── tailwind.config.js        # Semantic color definitions
```

---

## Usage Examples

### Buttons

```tsx
import { BUTTON_PRIMARY_CLASS, BUTTON_DANGER_CLASS } from "@/styles/designSystem";

// Primary action
<button className={BUTTON_PRIMARY_CLASS}>Save</button>

// Destructive action
<button className={BUTTON_DANGER_CLASS}>Delete</button>

// Icon button
import { ICON_BUTTON_PRIMARY_CLASS, ICON_SIZE_MEDIUM_CLASS } from "@/styles/designSystem";
<button className={ICON_BUTTON_PRIMARY_CLASS}>
  <Icon className={ICON_SIZE_MEDIUM_CLASS} />
</button>
```

### Cards

```tsx
import {
  CARD_BASE_CLASS,
  CARD_HEADER_CLASS,
  CARD_BODY_CLASS,
} from "@/styles/designSystem";

<div className={CARD_BASE_CLASS}>
  <div className={CARD_HEADER_CLASS}>
    <h3>Card Title</h3>
  </div>
  <div className={CARD_BODY_CLASS}>
    Card content here
  </div>
</div>
```

### Typography

```tsx
import {
  TEXT_HEADING_LARGE_CLASS,
  TEXT_BODY_SECONDARY_CLASS,
  TEXT_ERROR_CLASS,
} from "@/styles/designSystem";

<h1 className={TEXT_HEADING_LARGE_CLASS}>Page Title</h1>
<p className={TEXT_BODY_SECONDARY_CLASS}>Description text</p>
<span className={TEXT_ERROR_CLASS}>Error message</span>
```

### Layout

```tsx
import {
  FLEX_BETWEEN_CLASS,
  FLEX_CENTER_CLASS,
  PADDING_MEDIUM_CLASS,
} from "@/styles/designSystem";

<div className={FLEX_BETWEEN_CLASS}>
  <span>Left</span>
  <span>Right</span>
</div>

<div className={`${FLEX_CENTER_CLASS} ${PADDING_MEDIUM_CLASS}`}>
  Centered content with padding
</div>
```

### Status Indicators (Grid Renderers)

```tsx
import { getColorClass } from "@/styles/colors";

// For dynamic status colors
const statusClass = getColorClass("success"); // or "error", "warning", "info"

<div className={statusClass}>
  Status text
</div>
```

---

## Migration Guide

### Migrating an Old Component

**Step 1: Read the component**
```bash
# Use Read tool to examine the current implementation
```

**Step 2: Identify patterns**
- Locate inline Tailwind classes
- Find repeated class combinations
- Identify sub-component opportunities
- Note any hardcoded colors

**Step 3: Extract constants**
```tsx
// Before
<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">

// After
const BUTTON_CLASS = "bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg";
// Or better, use existing constant:
import { BUTTON_PRIMARY_CLASS } from "@/styles/designSystem";
```

**Step 4: Create sub-components**
```tsx
// Extract logical sections into separate components with TypeScript interfaces
```

**Step 5: Replace hardcoded colors**
```tsx
// Before: bg-blue-600
// After:  bg-primary

// Before: text-red-500
// After:  text-error

// Before: fill-[#00458a]
// After:  fill-brand
```

### Color Migration Table

| Old Color | New Semantic Color | Usage |
|-----------|-------------------|-------|
| `blue-600`, `blue-500` | `primary` | Main UI elements |
| `blue-100` | `primary-light` | Light backgrounds |
| `blue-800` | `primary-dark` | Dark mode primary |
| `red-500`, `red-600` | `error` | Errors, destructive actions |
| `green-500`, `green-600` | `success` | Success states |
| `amber-500`, `yellow-500` | `warning` | Warnings |
| `slate-500`, `gray-500` | `secondary` | Secondary elements |
| `#00458a` | `brand` | Brand/logo color |

---

## Best Practices

### ✅ DO

- Use semantic color names (`primary`, `error`, `success`)
- Extract all Tailwind classes to constants
- Create sub-components for logical sections
- Use TypeScript interfaces for all props
- Import from `@/styles/designSystem` when possible
- Follow UPPERCASE_SNAKE_CASE for class constants
- Add accessibility attributes (aria-label, role, etc.)
- Compose components hierarchically

### ❌ DON'T

- Use hardcoded colors (`blue-600`, `#00458a`)
- Keep inline Tailwind classes in JSX
- Create monolithic components
- Skip TypeScript interfaces
- Duplicate class combinations across files
- Use camelCase or lowercase for class constants
- Forget dark mode variants
- Create deep component nesting (max 3-4 levels)

---

## Available Design System Constants

See `src/styles/designSystem.ts` for the complete list. Main categories:

### Buttons
- `BUTTON_PRIMARY_CLASS`
- `BUTTON_SECONDARY_CLASS`
- `BUTTON_DANGER_CLASS`
- `BUTTON_SUCCESS_CLASS`
- `BUTTON_GHOST_CLASS`
- `ICON_BUTTON_*_CLASS`

### Cards & Containers
- `CARD_BASE_CLASS`
- `CARD_HEADER_CLASS`
- `CARD_BODY_CLASS`
- `CARD_FOOTER_CLASS`

### Inputs
- `INPUT_TEXT_BASE_CLASS`
- `INPUT_COMBOBOX_CLASS`
- `INPUT_TEXTAREA_CLASS`
- `INPUT_ERROR_CLASS`

### Typography
- `TEXT_HEADING_*_CLASS`
- `TEXT_BODY_CLASS`
- `TEXT_ERROR_CLASS`
- `TEXT_SUCCESS_CLASS`
- `TEXT_PRIMARY_CLASS`

### Layout
- `FLEX_CENTER_CLASS`
- `FLEX_BETWEEN_CLASS`
- `PADDING_*_CLASS`
- `BORDER_*_CLASS`

### Icons
- `ICON_SIZE_*_CLASS`
- `ICON_PRIMARY_CLASS`
- `ICON_BRAND_CLASS`

---

## Support

For questions or clarifications about the design system:
1. Check this documentation
2. Review refactored components as examples:
   - `src/components/Header/Nav.tsx`
   - `src/components/ClaudeChat/ClaudeWidget/ChatWidget.tsx`
   - `src/components/GridLayout/GridCard.tsx`
3. Review `src/styles/designSystem.ts` for available constants

---

**Last Updated**: December 2024
**Version**: 1.0.0
