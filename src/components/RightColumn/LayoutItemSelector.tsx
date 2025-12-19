import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

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
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const availableOptions = availableItems.filter(
    (item) => !selectedItems.includes(item)
  );

  const filteredOptions = query === ""
    ? availableOptions
    : availableOptions.filter((item) =>
        formatLabel(item).toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (item: string | null) => {
    if (item) {
      onItemSelect(item);
      setQuery("");
      setIsOpen(false);
    }
  };

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
              <div
                key={item}
                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-full text-sm"
              >
                <span className="font-medium">{formatLabel(item)}</span>
                <button
                  onClick={() => onItemRemove(item)}
                  className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5 transition-colors"
                  aria-label={`Remove ${item}`}
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <DialogTitle className="text-lg font-semibold">
                Add {title}
              </DialogTitle>
            </div>

            <div className="p-6">
              <Combobox value={null} onChange={handleSelect} immediate>
                <div className="relative">
                  <ComboboxInput
                    className="relative w-full cursor-text rounded-lg bg-white dark:bg-gray-700 py-2 pl-3 pr-10 text-left shadow-md border border-gray-300 dark:border-gray-600 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 text-sm"
                    placeholder="Type to search..."
                    onChange={(event) => setQuery(event.target.value)}
                    value={query}
                    displayValue={() => query}
                  />
                  <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none empty:invisible">
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((item) => (
                        <ComboboxOption
                          key={item}
                          value={item}
                          className="relative cursor-pointer select-none py-2 px-4 data-[focus]:bg-blue-100 data-[focus]:dark:bg-blue-900 data-[focus]:text-blue-900 data-[focus]:dark:text-blue-100 text-gray-900 dark:text-gray-100 text-sm"
                        >
                          {formatLabel(item)}
                        </ComboboxOption>
                      ))
                    ) : (
                      <div className="py-2 px-4 text-gray-500 dark:text-gray-400 text-sm">
                        {query === "" ? "No items available" : "No results found"}
                      </div>
                    )}
                  </ComboboxOptions>
                </div>
              </Combobox>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
