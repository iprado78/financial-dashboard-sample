import { ModalWrapper } from "@/components/ModalWrapper";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useState } from "react";

interface LayoutItemSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  availableItems: string[];
  selectedItems: string[];
  onItemSelect: (item: string) => void;
  formatLabel: (item: string) => string;
}

export function LayoutItemSelectorModal({
  isOpen,
  onClose,
  title,
  availableItems,
  selectedItems,
  onItemSelect,
  formatLabel,
}: LayoutItemSelectorModalProps) {
  const [query, setQuery] = useState("");

  const filteredOptions = availableItems
    .filter((item) => !selectedItems.includes(item))
    .filter((item) => {
      const label = formatLabel(item);
      return label.toLowerCase().includes(query.toLowerCase());
    });

  const handleSelect = (item: string | null) => {
    if (item) {
      onItemSelect(item);
      setQuery("");
      onClose();
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title={`Add ${title}`}>
      <Combobox value={null} onChange={handleSelect} immediate>
        <div className="relative min-h-[300px]">
          <ComboboxInput
            className="relative w-full cursor-text rounded-lg bg-white dark:bg-gray-700 py-2 pl-3 pr-10 text-left shadow-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            placeholder="Type to filter..."
            onChange={(event) => setQuery(event.target.value)}
            value={query}
            displayValue={() => query}
            autoFocus
          />
          <ComboboxOptions
            static
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-slate-100 dark:bg-slate-700 py-1 shadow-lg border border-gray-200 dark:border-gray-700 focus:outline-none empty:invisible"
          >
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
    </ModalWrapper>
  );
}
