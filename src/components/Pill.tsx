import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  PILL_BASE_CLASS,
  ICON_SIZE_SMALL_CLASS,
  TRANSITION_COLORS_CLASS,
} from "@/styles/designSystem";

type PillColor =
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "secondary"
  | "purple"
  | "pink";

interface PillProps {
  label: string;
  color?: PillColor;
  onRemove?: () => void;
}

const PILL_LABEL_CLASS = "font-medium";

const REMOVE_BUTTON_BASE_CLASS = `rounded-full p-0.5 ${TRANSITION_COLORS_CLASS}`;

// Using semantic colors from Tailwind config
const colorClasses: Record<PillColor, string> = {
  primary:
    "bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light hover:bg-blue-200 dark:hover:bg-blue-800",
  success:
    "bg-success-light dark:bg-success-dark text-success-dark dark:text-success-light hover:bg-green-200 dark:hover:bg-green-800",
  error:
    "bg-error-light dark:bg-error-dark text-error-dark dark:text-error-light hover:bg-red-200 dark:hover:bg-red-800",
  warning:
    "bg-warning-light dark:bg-warning-dark text-warning-dark dark:text-warning-light hover:bg-yellow-200 dark:hover:bg-yellow-800",
  info: "bg-info-light dark:bg-info-dark text-info-dark dark:text-info-light hover:bg-blue-200 dark:hover:bg-blue-800",
  secondary:
    "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600",
  purple:
    "bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 hover:bg-purple-200 dark:hover:bg-purple-800",
  pink: "bg-pink-100 dark:bg-pink-900 text-pink-900 dark:text-pink-100 hover:bg-pink-200 dark:hover:bg-pink-800",
};

const removeButtonColorClasses: Record<PillColor, string> = {
  primary: "hover:bg-blue-200 dark:hover:bg-blue-800",
  success: "hover:bg-green-200 dark:hover:bg-green-800",
  error: "hover:bg-red-200 dark:hover:bg-red-800",
  warning: "hover:bg-yellow-200 dark:hover:bg-yellow-800",
  info: "hover:bg-blue-200 dark:hover:bg-blue-800",
  secondary: "hover:bg-gray-200 dark:hover:bg-gray-600",
  purple: "hover:bg-purple-200 dark:hover:bg-purple-800",
  pink: "hover:bg-pink-200 dark:hover:bg-pink-800",
};

interface RemoveButtonProps {
  onRemove: () => void;
  label: string;
  color: PillColor;
}

const RemoveButton = ({ onRemove, label, color }: RemoveButtonProps) => {
  const buttonClass = `${REMOVE_BUTTON_BASE_CLASS} ${removeButtonColorClasses[color]}`;

  return (
    <button
      onClick={onRemove}
      className={buttonClass}
      aria-label={`Remove ${label}`}
      type="button"
    >
      <XMarkIcon className={ICON_SIZE_SMALL_CLASS} />
    </button>
  );
};

export function Pill({ label, color = "primary", onRemove }: PillProps) {
  const pillClass = `${PILL_BASE_CLASS} ${colorClasses[color]}`;

  return (
    <div className={pillClass}>
      <span className={PILL_LABEL_CLASS}>{label}</span>
      {onRemove && (
        <RemoveButton onRemove={onRemove} label={label} color={color} />
      )}
    </div>
  );
}
