/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./routes/**/*.{ts,tsx}",
  ],
  prefix: "",
  safelist: [
    // Base background colors for status indicators
    "bg-success",
    "bg-error",
    "bg-warning",
    "bg-info",
    "bg-neutral",
    "bg-primary",
    "bg-secondary",
    "bg-brand",
    // Light/dark variants for colored pills (light mode)
    "bg-success-light",
    "bg-success-dark",
    "bg-error-light",
    "bg-error-dark",
    "bg-warning-light",
    "bg-warning-dark",
    "bg-info-light",
    "bg-info-dark",
    "bg-primary-light",
    "bg-primary-dark",
    "bg-secondary-light",
    "bg-secondary-dark",
    // Light/dark variants for colored pills (dark mode)
    "dark:bg-success-light",
    "dark:bg-success-dark",
    "dark:bg-error-light",
    "dark:bg-error-dark",
    "dark:bg-warning-light",
    "dark:bg-warning-dark",
    "dark:bg-info-light",
    "dark:bg-info-dark",
    "dark:bg-primary-light",
    "dark:bg-primary-dark",
    // Text colors for colored pills (light mode)
    "text-success-dark",
    "text-success-light",
    "text-error-dark",
    "text-error-light",
    "text-warning-dark",
    "text-warning-light",
    "text-info-dark",
    "text-info-light",
    "text-primary-dark",
    "text-primary-light",
    "text-brand",
    // Text colors for colored pills (dark mode)
    "dark:text-success-dark",
    "dark:text-success-light",
    "dark:text-error-dark",
    "dark:text-error-light",
    "dark:text-warning-dark",
    "dark:text-warning-light",
    "dark:text-info-dark",
    "dark:text-info-light",
    "dark:text-primary-dark",
    "dark:text-primary-light",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Brand colors
        brand: {
          DEFAULT: "#00458a",
          light: "#0057ab",
          dark: "#003366",
        },
        // Primary (replaces scattered blue-600 usage)
        primary: {
          DEFAULT: "#2563eb", // blue-600
          light: "#dbeafe", // blue-100
          dark: "#1e40af", // blue-800
          hover: "#1d4ed8", // blue-700
        },
        // Secondary (replaces scattered slate usage)
        secondary: {
          DEFAULT: "#64748b", // slate-500
          light: "#f1f5f9", // slate-100
          dark: "#334155", // slate-700
        },
        // Semantic status colors
        success: {
          DEFAULT: "#10b981", // green-500
          light: "#d1fae5", // green-100
          dark: "#065f46", // green-800
        },
        error: {
          DEFAULT: "#ef4444", // red-500
          light: "#fee2e2", // red-100
          dark: "#991b1b", // red-800
        },
        warning: {
          DEFAULT: "#f59e0b", // amber-500
          light: "#fef3c7", // amber-100
          dark: "#92400e", // amber-800
        },
        info: {
          DEFAULT: "#3b82f6", // blue-500
          light: "#dbeafe", // blue-100
          dark: "#1e40af", // blue-800
        },
        // Neutral (for consistency)
        neutral: {
          DEFAULT: "#9ca3af", // gray-400
          light: "#f3f4f6", // gray-100
          dark: "#374151", // gray-700
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        DEFAULT: "0.375rem", // 6px - matches rounded-md, good for buttons
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shine: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shine: "shine 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
};
