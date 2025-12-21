/**
 * Design System Constants
 *
 * Centralized Tailwind class definitions for consistent styling across the application.
 * Following the pattern established in Nav.tsx and ClaudeChat components.
 *
 * Uses semantic color names from tailwind.config.js:
 * - primary: Main brand color (blue)
 * - secondary: Secondary color (slate/gray)
 * - brand: Company brand color
 * - success: Success/positive actions (green)
 * - error: Error/destructive actions (red)
 * - warning: Warning/caution (amber)
 * - info: Informational (blue)
 */

// ============================================================================
// BUTTONS
// ============================================================================

export const BUTTON_PRIMARY_CLASS =
  "bg-primary hover:bg-primary-hover text-white rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors";

export const BUTTON_SECONDARY_CLASS =
  "bg-secondary-light hover:bg-secondary dark:bg-secondary-dark dark:hover:bg-secondary text-slate-900 dark:text-slate-100 rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors";

export const BUTTON_DANGER_CLASS =
  "bg-error hover:bg-error-dark text-white rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors";

export const BUTTON_SUCCESS_CLASS =
  "bg-success hover:bg-success-dark text-white rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors";

export const BUTTON_GHOST_CLASS =
  "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg px-4 py-2 transition-colors";

// Icon Buttons
export const ICON_BUTTON_NEUTRAL_CLASS =
  "text-secondary hover:text-secondary-dark dark:text-slate-400 dark:hover:text-slate-200 transition-colors";

export const ICON_BUTTON_DANGER_CLASS =
  "text-secondary hover:text-error dark:text-slate-400 dark:hover:text-error transition-colors";

export const ICON_BUTTON_PRIMARY_CLASS =
  "text-primary hover:text-primary-hover dark:text-primary-light dark:hover:text-primary transition-colors";

// Small action buttons (like close/remove buttons)
export const BUTTON_CLOSE_CLASS =
  "p-1 hover:bg-neutral-light dark:hover:bg-neutral-dark rounded transition-colors flex-shrink-0";

// Floating action button
export const BUTTON_FAB_CLASS =
  "bg-primary hover:bg-primary-hover text-white rounded-full p-4 shadow-lg transition-all";

// ============================================================================
// CARDS & CONTAINERS
// ============================================================================

export const CARD_BASE_CLASS =
  "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm";

export const CARD_HEADER_CLASS =
  "px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700";

export const CARD_BODY_CLASS = "p-4";

export const CARD_FOOTER_CLASS =
  "px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700";

// Specialized containers
export const CONTAINER_CHAT_CLASS =
  "w-full h-full bg-white dark:bg-slate-800 flex flex-col relative";

export const CONTAINER_MODAL_BACKDROP_CLASS =
  "fixed inset-0 bg-black/30 dark:bg-black/50 flex items-center justify-center z-40";

export const CONTAINER_SECTION_CLASS = "space-y-4";

// ============================================================================
// INPUTS & FORMS
// ============================================================================

export const INPUT_TEXT_BASE_CLASS =
  "px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100";

export const INPUT_COMBOBOX_CLASS =
  "rounded-lg bg-white dark:bg-gray-700 py-2 pl-3 pr-10 border border-gray-300 dark:border-gray-600 focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary";

export const INPUT_TEXTAREA_CLASS =
  "px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 resize-none";

export const INPUT_DISABLED_CLASS = "opacity-50 cursor-not-allowed";

export const INPUT_ERROR_CLASS = "border-error focus:ring-error";

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const TEXT_HEADING_LARGE_CLASS =
  "text-xl font-semibold text-gray-900 dark:text-gray-100";

export const TEXT_HEADING_MEDIUM_CLASS =
  "text-lg font-semibold text-gray-900 dark:text-gray-100";

export const TEXT_HEADING_SMALL_CLASS =
  "text-base font-semibold text-gray-900 dark:text-gray-100";

export const TEXT_BODY_CLASS = "text-sm text-gray-900 dark:text-gray-100";

export const TEXT_BODY_SECONDARY_CLASS =
  "text-sm text-gray-600 dark:text-gray-400";

export const TEXT_MUTED_CLASS = "text-gray-500 dark:text-gray-500";

export const TEXT_ERROR_CLASS = "text-error dark:text-error-light";

export const TEXT_SUCCESS_CLASS = "text-success dark:text-success-light";

export const TEXT_WARNING_CLASS = "text-warning dark:text-warning-light";

export const TEXT_INFO_CLASS = "text-info dark:text-info-light";

export const TEXT_PRIMARY_CLASS = "text-primary dark:text-primary-light";

// ============================================================================
// LAYOUT & SPACING
// ============================================================================

// Flexbox layouts
export const FLEX_CENTER_CLASS = "flex items-center justify-center";

export const FLEX_BETWEEN_CLASS = "flex items-center justify-between";

export const FLEX_START_CLASS = "flex items-center justify-start";

export const FLEX_END_CLASS = "flex items-center justify-end";

export const FLEX_COL_CLASS = "flex flex-col";

// Common spacing patterns
export const SPACE_X_SMALL_CLASS = "space-x-1";
export const SPACE_X_MEDIUM_CLASS = "space-x-2";
export const SPACE_X_LARGE_CLASS = "space-x-4";

export const SPACE_Y_SMALL_CLASS = "space-y-1";
export const SPACE_Y_MEDIUM_CLASS = "space-y-2";
export const SPACE_Y_LARGE_CLASS = "space-y-4";

export const GAP_SMALL_CLASS = "gap-1";
export const GAP_MEDIUM_CLASS = "gap-2";
export const GAP_LARGE_CLASS = "gap-4";

// Padding
export const PADDING_SMALL_CLASS = "p-2";
export const PADDING_MEDIUM_CLASS = "p-4";
export const PADDING_LARGE_CLASS = "p-6";

export const PADDING_X_SMALL_CLASS = "px-2";
export const PADDING_X_MEDIUM_CLASS = "px-4";
export const PADDING_X_LARGE_CLASS = "px-6";

export const PADDING_Y_SMALL_CLASS = "py-2";
export const PADDING_Y_MEDIUM_CLASS = "py-4";
export const PADDING_Y_LARGE_CLASS = "py-6";

// ============================================================================
// BORDERS
// ============================================================================

export const BORDER_BASE_CLASS = "border border-gray-200 dark:border-gray-700";

export const BORDER_TOP_CLASS =
  "border-t border-gray-200 dark:border-gray-700";

export const BORDER_BOTTOM_CLASS =
  "border-b border-gray-200 dark:border-gray-700";

export const BORDER_LEFT_CLASS =
  "border-l border-gray-200 dark:border-gray-700";

export const BORDER_RIGHT_CLASS =
  "border-r border-gray-200 dark:border-gray-700";

// ============================================================================
// ICONS
// ============================================================================

export const ICON_SIZE_SMALL_CLASS = "h-4 w-4";
export const ICON_SIZE_MEDIUM_CLASS = "h-5 w-5";
export const ICON_SIZE_LARGE_CLASS = "h-6 w-6";
export const ICON_SIZE_XLARGE_CLASS = "h-8 w-8";

// Icon colors
export const ICON_PRIMARY_CLASS = "text-primary dark:text-primary-light";
export const ICON_SECONDARY_CLASS = "text-secondary dark:text-gray-400";
export const ICON_DANGER_CLASS = "text-error dark:text-error-light";
export const ICON_SUCCESS_CLASS = "text-success dark:text-success-light";
export const ICON_WARNING_CLASS = "text-warning dark:text-warning-light";
export const ICON_INFO_CLASS = "text-info dark:text-info-light";
export const ICON_BRAND_CLASS = "text-brand dark:text-brand-light";

// ============================================================================
// BADGES & PILLS
// ============================================================================

export const BADGE_BASE_CLASS =
  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

export const PILL_BASE_CLASS =
  "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";

// ============================================================================
// TRANSITIONS & ANIMATIONS
// ============================================================================

export const TRANSITION_BASE_CLASS = "transition-all duration-200";

export const TRANSITION_COLORS_CLASS = "transition-colors duration-200";

export const TRANSITION_OPACITY_CLASS = "transition-opacity duration-200";

// ============================================================================
// SHADOWS
// ============================================================================

export const SHADOW_SMALL_CLASS = "shadow-sm";
export const SHADOW_MEDIUM_CLASS = "shadow-md";
export const SHADOW_LARGE_CLASS = "shadow-lg";
export const SHADOW_XLARGE_CLASS = "shadow-xl";

// ============================================================================
// STATE VARIANTS
// ============================================================================

export const STATE_LOADING_CLASS = "opacity-50 cursor-wait";
export const STATE_DISABLED_CLASS = "opacity-50 cursor-not-allowed";
export const STATE_SELECTED_CLASS = "bg-blue-50 dark:bg-blue-900/20";
export const STATE_HOVER_CLASS = "hover:bg-gray-100 dark:hover:bg-gray-800";

// ============================================================================
// UTILITY CLASSES
// ============================================================================

export const TRUNCATE_CLASS = "truncate";
export const SR_ONLY_CLASS = "sr-only";
export const ROUNDED_SMALL_CLASS = "rounded";
export const ROUNDED_MEDIUM_CLASS = "rounded-lg";
export const ROUNDED_LARGE_CLASS = "rounded-xl";
export const ROUNDED_FULL_CLASS = "rounded-full";
