import { ModalWrapper } from "@/components/ModalWrapper";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import {
  INPUT_COMBOBOX_CLASS,
  TEXT_MUTED_CLASS,
  TEXT_BODY_CLASS,
  SHADOW_MEDIUM_CLASS,
  BORDER_BASE_CLASS,
  ROUNDED_MEDIUM_CLASS,
} from "@/styles/designSystem";

interface LayoutItemSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  availableItems: string[];
  selectedItems: string[];
  onItemSelect: (item: string) => void;
  formatLabel: (item: string) => string;
}

const CONTAINER_CLASS = "relative min-h-[300px] w-full";

// Match ag-grid scrollbar style: thin, subtle, auto-hide behavior
const OPTIONS_CONTAINER_CLASS = `absolute z-10 mt-2 max-h-60 w-full overflow-auto ${ROUNDED_MEDIUM_CLASS} bg-gray-50 dark:bg-gray-900 py-1 ${SHADOW_MEDIUM_CLASS} ${BORDER_BASE_CLASS} focus:outline-none empty:invisible scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800 hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500`;

const OPTION_CLASS = `relative cursor-pointer select-none py-3 px-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 data-[focus]:bg-primary-light data-[focus]:dark:bg-primary-dark data-[focus]:text-primary-dark data-[focus]:dark:text-primary-light ${TEXT_BODY_CLASS} transition-colors`;

const EMPTY_STATE_CLASS = `py-3 px-4 ${TEXT_MUTED_CLASS} text-sm`;

interface EmptyStateProps {
  hasQuery: boolean;
}

const EmptyState = ({ hasQuery }: EmptyStateProps) => {
  const message = hasQuery ? "No results found" : "No items available";
  return <div className={EMPTY_STATE_CLASS}>{message}</div>;
};

interface OptionsListProps {
  filteredOptions: string[];
  formatLabel: (item: string) => string;
  query: string;
}

const OptionsList = ({
  filteredOptions,
  formatLabel,
  query,
}: OptionsListProps) => {
  return (
    <ComboboxOptions static className={OPTIONS_CONTAINER_CLASS}>
      {filteredOptions.length > 0 ? (
        filteredOptions.map((item) => (
          <ComboboxOption key={item} value={item} className={OPTION_CLASS}>
            {formatLabel(item)}
          </ComboboxOption>
        ))
      ) : (
        <EmptyState hasQuery={query !== ""} />
      )}
    </ComboboxOptions>
  );
};

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
        <div className={CONTAINER_CLASS}>
          <ComboboxInput
            className={`${INPUT_COMBOBOX_CLASS} w-full text-gray-900 dark:text-gray-100`}
            placeholder="Type to filter..."
            onChange={(event) => setQuery(event.target.value)}
            value={query}
            displayValue={() => query}
            autoFocus
          />
          <OptionsList
            filteredOptions={filteredOptions}
            formatLabel={formatLabel}
            query={query}
          />
        </div>
      </Combobox>
    </ModalWrapper>
  );
}
