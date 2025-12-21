import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  PILL_BASE_CLASS,
  ICON_SIZE_SMALL_CLASS,
  TRANSITION_COLORS_CLASS,
} from "@/styles/designSystem";

type PillColor =
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "gray"
  | "purple"
  | "pink";

interface PillProps {
  label: string;
  color?: PillColor;
  onRemove?: () => void;
}

const PILL_LABEL_CLASS = "font-medium";

const REMOVE_BUTTON_BASE_CLASS = `rounded-full p-0.5 ${TRANSITION_COLORS_CLASS}`;

const colorClasses: Record<PillColor, string> = {
  blue: "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800",
  green:
    "bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-800",
  red: "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 hover:bg-red-200 dark:hover:bg-red-800",
  yellow:
    "bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 hover:bg-yellow-200 dark:hover:bg-yellow-800",
  gray: "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600",
  purple:
    "bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 hover:bg-purple-200 dark:hover:bg-purple-800",
  pink: "bg-pink-100 dark:bg-pink-900 text-pink-900 dark:text-pink-100 hover:bg-pink-200 dark:hover:bg-pink-800",
};

const removeButtonColorClasses: Record<PillColor, string> = {
  blue: "hover:bg-blue-200 dark:hover:bg-blue-800",
  green: "hover:bg-green-200 dark:hover:bg-green-800",
  red: "hover:bg-red-200 dark:hover:bg-red-800",
  yellow: "hover:bg-yellow-200 dark:hover:bg-yellow-800",
  gray: "hover:bg-gray-200 dark:hover:bg-gray-600",
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

export function Pill({ label, color = "blue", onRemove }: PillProps) {
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
