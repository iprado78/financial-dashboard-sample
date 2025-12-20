export const colors = {
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
  gray: {
    DEFAULT: "#9ca3af", // gray-400
    light: "#f3f4f6", // gray-100
    dark: "#374151", // gray-700
  },
} as const;

export const statusColors = {
  success: colors.success.DEFAULT,
  error: colors.error.DEFAULT,
  warning: colors.warning.DEFAULT,
  info: colors.info.DEFAULT,
  neutral: colors.gray.DEFAULT,
} as const;

export type ColorClassReturnType<T extends keyof typeof statusColors> =
  `bg-${T}-light text-${T}-dark dark:bg-${T}-dark dark:text-${T}-light`;

export const getColorClass = <T extends keyof typeof statusColors>(
  statusColor: T
): ColorClassReturnType<T> => {
  return `bg-${statusColor}-light text-${statusColor}-dark dark:bg-${statusColor}-dark dark:text-${statusColor}-light`;
};

export type BaseColorClass<T extends keyof typeof statusColors> = `bg-${T}`;

export function extractBaseColorClass<T extends keyof typeof statusColors>(
  colorClass: ColorClassReturnType<T>
): BaseColorClass<T> {
  const match = colorClass.match(/^bg-(\w+)-light/);
  if (!match) {
    throw new Error(`Invalid color class format: ${colorClass}`);
  }
  return `bg-${match[1]}` as BaseColorClass<T>;
}
