import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Pill } from "@/components/Pill";
import { LayoutItemSelectorModal } from "@/components/LayoutItemSelector/LayoutItemSelectorModal";
import {
  CARD_HEADER_CLASS,
  TEXT_HEADING_MEDIUM_CLASS,
  BORDER_BOTTOM_CLASS,
  FLEX_BETWEEN_CLASS,
  PADDING_MEDIUM_CLASS,
  ICON_SIZE_SMALL_CLASS,
} from "@/styles/designSystem";

interface LayoutItemSelectorProps {
  title: string;
  availableItems: string[];
  selectedItems: string[];
  onItemSelect: (item: string) => void;
  onItemRemove: (item: string) => void;
  formatLabel?: (item: string) => string;
  highlightButton?: boolean;
}

const HEADER_CLASS = `${CARD_HEADER_CLASS} ${BORDER_BOTTOM_CLASS} ${FLEX_BETWEEN_CLASS}`;

const PILLS_CONTAINER_CLASS = `${PADDING_MEDIUM_CLASS} space-y-4`;

const PILLS_WRAPPER_CLASS = "flex flex-wrap gap-2";

const BUTTON_WRAPPER_CLASS = "relative";

const PING_ANIMATION_CLASS =
  "absolute inset-0 rounded-full bg-primary animate-ping opacity-75";

const ADD_BUTTON_ENABLED_CLASS =
  "relative w-6 h-6 flex items-center justify-center rounded-full transition-colors bg-primary text-white hover:bg-primary-hover dark:bg-primary dark:hover:bg-primary-hover";

const ADD_BUTTON_DISABLED_CLASS =
  "relative w-6 h-6 flex items-center justify-center rounded-full transition-colors bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed";

const ADD_BUTTON_PULSE_CLASS = "animate-pulse";

interface AddButtonProps {
  onClick: () => void;
  disabled: boolean;
  highlighted: boolean;
  title: string;
}

const AddButton = ({
  onClick,
  disabled,
  highlighted,
  title,
}: AddButtonProps) => {
  const buttonClass = disabled
    ? ADD_BUTTON_DISABLED_CLASS
    : `${ADD_BUTTON_ENABLED_CLASS} ${highlighted ? ADD_BUTTON_PULSE_CLASS : ""}`;

  return (
    <div className={BUTTON_WRAPPER_CLASS}>
      {highlighted && <span className={PING_ANIMATION_CLASS}></span>}
      <button
        onClick={onClick}
        disabled={disabled}
        className={buttonClass}
        title={title}
        type="button"
      >
        <PlusIcon className={ICON_SIZE_SMALL_CLASS} />
      </button>
    </div>
  );
};

interface HeaderProps {
  title: string;
  onAddClick: () => void;
  hasAvailableItems: boolean;
  highlightButton: boolean;
}

const Header = ({
  title,
  onAddClick,
  hasAvailableItems,
  highlightButton,
}: HeaderProps) => {
  const addButtonTitle = hasAvailableItems
    ? `Add ${title.toLowerCase()}`
    : `No ${title.toLowerCase()} available to add`;

  return (
    <div className={HEADER_CLASS}>
      <h3 className={TEXT_HEADING_MEDIUM_CLASS}>{title}</h3>
      <AddButton
        onClick={onAddClick}
        disabled={!hasAvailableItems}
        highlighted={highlightButton}
        title={addButtonTitle}
      />
    </div>
  );
};

interface SelectedItemsProps {
  selectedItems: string[];
  formatLabel: (item: string) => string;
  onItemRemove: (item: string) => void;
}

const SelectedItems = ({
  selectedItems,
  formatLabel,
  onItemRemove,
}: SelectedItemsProps) => {
  if (selectedItems.length === 0) return null;

  return (
    <div className={PILLS_CONTAINER_CLASS}>
      <div className={PILLS_WRAPPER_CLASS}>
        {selectedItems.map((item) => (
          <Pill
            key={item}
            label={formatLabel(item)}
            color="primary"
            onRemove={() => onItemRemove(item)}
          />
        ))}
      </div>
    </div>
  );
};

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

  const hasAvailableItems = availableItems.some(
    (item) => !selectedItems.includes(item)
  );

  return (
    <div>
      <Header
        title={title}
        onAddClick={() => setIsOpen(true)}
        hasAvailableItems={hasAvailableItems}
        highlightButton={highlightButton}
      />
      <SelectedItems
        selectedItems={selectedItems}
        formatLabel={formatLabel}
        onItemRemove={onItemRemove}
      />
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
