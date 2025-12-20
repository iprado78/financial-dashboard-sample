import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { LayoutItemSelectorModal } from "./LayoutItemSelectorModal";
import { Pill } from "../Pill";

interface LayoutItemSelectorProps {
  title: string;
  availableItems: string[];
  selectedItems: string[];
  onItemSelect: (item: string) => void;
  onItemRemove: (item: string) => void;
  formatLabel?: (item: string) => string;
  highlightButton?: boolean;
}

export default function LayoutItemSelector({
  title,
  availableItems,
  selectedItems,
  onItemSelect,
  onItemRemove,
  formatLabel = (item) => item.toUpperCase(),
  highlightButton = false,
}: LayoutItemSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="relative">
          {highlightButton && (
            <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></span>
          )}
          <button
            onClick={() => setIsOpen(true)}
            className={`relative w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors ${
              highlightButton ? "animate-pulse" : ""
            }`}
            title={`Add ${title.toLowerCase()}`}
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {selectedItems.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedItems.map((item) => (
              <Pill
                key={item}
                label={formatLabel(item)}
                color="blue"
                onRemove={() => onItemRemove(item)}
              />
            ))}
          </div>
        )}
      </div>

      <LayoutItemSelectorModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        availableItems={availableItems}
        selectedItems={selectedItems}
        onItemSelect={onItemSelect}
        formatLabel={formatLabel}
      />
    </div>
  );
}
