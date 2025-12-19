import { ReactNode } from "react";
import { GripVertical, X } from "lucide-react";

interface GridCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  onRemove?: () => void;
}

export default function GridCard({
  children,
  title,
  className = "",
  onRemove,
}: GridCardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col overflow-hidden h-full ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="drag-handle flex items-center gap-2 flex-1 cursor-move">
          <GripVertical size={20} className="text-gray-400 dark:text-gray-500" />
          {title && (
            <h3 className="text-lg font-semibold">{title}</h3>
          )}
        </div>
        {onRemove && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove();
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors flex-shrink-0"
            aria-label="Remove card"
            type="button"
          >
            <X size={18} className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400" />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-hidden p-4 min-h-0">{children}</div>
    </div>
  );
}
