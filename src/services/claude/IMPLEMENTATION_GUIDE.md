# Claude API Integration Implementation Guide

**[← Back to Documentation Index](../../../DOCUMENTATION.md)**

## Overview
This guide explains how to wire up Claude AI tools in `ClaudeChatIntegration.tsx`. The tools have been designed to minimize state and API costs by directly manipulating component state/stores.

**Related Documentation:**
- [Chat Setup](../../../CHAT_SETUP.md) - User-facing chat widget documentation
- [Main README](../../../README.md) - Getting started with the application
- [Design System](../../../DESIGN_SYSTEM.md) - UI component guidelines

## Tool Handler Implementation

All tool handlers should be added to the `handleToolUse` callback in `ClaudeChatIntegration.tsx`. Here's what needs to be implemented:

### 1. Set Theme Tool
**Tool name:** `set_theme`

**Required imports:**
```typescript
import { setDarkMode, setCurrentTheme, SystemTheme } from "@/stores/DarkModeStore";
```

**Handler:**
```typescript
case "set_theme": {
  const { theme } = toolInput;
  const themeMap = {
    dark: SystemTheme.DARK,
    light: SystemTheme.LIGHT,
    system: SystemTheme.SYSTEM
  };
  setCurrentTheme(themeMap[theme]);
  setDarkMode(theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches));
  return {
    success: true,
    message: `Theme set to ${theme}`
  };
}
```

### 2. Sort Table Tool
**Tool name:** `sort_table`

**Approach:** Access the ag-grid API via a table registry or ref system. Each table component should expose its grid API.

**Recommended implementation:**
1. Create a global table registry: `src/stores/TableGridApiStore.ts`
2. Each table registers its API on mount
3. Tool handler calls `gridApi.applyColumnState()` to sort

**Handler skeleton:**
```typescript
case "sort_table": {
  const { table_name, sort_columns } = toolInput;
  const gridApi = getTableGridApi(table_name); // From registry
  if (!gridApi) return { success: false, error: `Table ${table_name} not found` };

  gridApi.applyColumnState({
    state: sort_columns.map(col => ({
      colId: col.column,
      sort: col.direction
    })),
    defaultState: { sort: null }
  });

  return {
    success: true,
    message: `Sorted ${table_name} by ${sort_columns.map(c => c.column).join(", ")}`
  };
}
```

### 3. Layout Management Tools

**Tools:** `add_layout_item`, `remove_layout_item`, `resize_card`

**Approach:** These need to manipulate layout state on tableOverview and candleSticks pages.

**Recommended implementation:**
1. Expose layout manipulation functions from each page component
2. Register these functions in a global context or store
3. Tool handlers call these functions

**Example for tableOverview page:**
```typescript
// In tableOverview route component
const handleAddItem = useCallback((itemId: string) => {
  setSelectedItems(prev => [...prev, itemId]);
}, []);

// Register in context/store on mount
useEffect(() => {
  registerPageActions("tableOverview", {
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    resizeCard: handleResizeCard
  });
}, []);
```

**Handler:**
```typescript
case "add_layout_item": {
  const { page, item_id } = toolInput;
  const pageActions = getPageActions(page);
  if (!pageActions) return { success: false, error: `Page ${page} not accessible` };

  pageActions.addItem(item_id);
  return {
    success: true,
    message: `Added ${item_id} to ${page}`
  };
}
```

### 4. Chart Manipulation Tool
**Tool name:** `manipulate_chart`

**Approach:** Access chart instances via a registry similar to tables.

**Handler skeleton:**
```typescript
case "manipulate_chart": {
  const { ticker, action, params } = toolInput;
  const chartRef = getChartRef(ticker); // From registry
  if (!chartRef) return { success: false, error: `Chart ${ticker} not found` };

  switch (action) {
    case "toggle_volume":
      chartRef.toggleVolume();
      break;
    case "set_chart_type":
      chartRef.setChartType(params?.type || "candlestick");
      break;
    case "zoom_in":
      chartRef.zoomIn();
      break;
    // ... etc
  }

  return {
    success: true,
    message: `${action} applied to ${ticker} chart`
  };
}
```

## Implementation Strategy

### Phase 1: Theme & Sorting (Easiest)
1. Wire up `set_theme` tool - uses existing store functions
2. Create `TableGridApiStore` to register ag-grid APIs
3. Wire up `sort_table` tool

### Phase 2: Layout Management (Medium)
1. Create `PageActionsStore` or Context for registering page-level functions
2. Update tableOverview and candleSticks pages to register their layout functions
3. Wire up `add_layout_item`, `remove_layout_item`, `resize_card` tools

### Phase 3: Chart Manipulation (Complex)
1. Create `ChartRegistryStore` to track chart instances
2. Update chart components to register themselves
3. Ensure chart toolbar functions are exposed via ref
4. Wire up `manipulate_chart` tool

## Cost Optimization Notes

1. **Minimize State**: Tools directly manipulate existing stores/APIs, no extra state needed
2. **No Polling**: Tools execute actions immediately, no need to check if they succeeded
3. **Concise Responses**: Tool responses are minimal JSON, reducing token usage
4. **Smart Prompting**: System prompt guides Claude to make correct inferences without extra API calls

## Testing Checklist

- [ ] Theme tool works for dark/light/system
- [ ] Sorting works on all 5 tables
- [ ] Can add/remove tables on tableOverview
- [ ] Can add/remove charts on candleSticks (any ticker symbol)
- [ ] Can resize any card
- [ ] Chart toolbar actions work (volume, type, zoom, range)
- [ ] Multiple tools can be chained in one request
- [ ] Error handling works when items not found
