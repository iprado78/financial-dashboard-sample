import { ReactNode } from "react";
import { GripVertical, X } from "lucide-react";
import {
  CARD_BASE_CLASS,
  CARD_HEADER_CLASS,
  CARD_BODY_CLASS,
  TEXT_HEADING_MEDIUM_CLASS,
  BUTTON_CLOSE_CLASS,
  FLEX_COL_CLASS,
} from "@/styles/designSystem";

const GRID_CARD_CONTAINER_CLASS = `${CARD_BASE_CLASS} ${FLEX_COL_CLASS} overflow-hidden h-full`;

const GRID_CARD_HEADER_CLASS = `${CARD_HEADER_CLASS} flex items-center gap-2 flex-shrink-0`;

const DRAG_HANDLE_CLASS = "flex items-center gap-2 flex-1 cursor-move";

const DRAG_ICON_CLASS = "text-gray-400 dark:text-gray-500";

const CLOSE_ICON_BASE_CLASS = "text-gray-500 dark:text-gray-400";

const CLOSE_ICON_HOVER_CLASS = "hover:text-red-600 dark:hover:text-red-400";

const CLOSE_ICON_COMBINED_CLASS = `${CLOSE_ICON_BASE_CLASS} ${CLOSE_ICON_HOVER_CLASS}`;

const GRID_CARD_BODY_CLASS = `${CARD_BODY_CLASS} flex-1 overflow-hidden min-h-0`;

interface DragHandleProps {
  title?: string;
}

const DragHandle = ({ title }: DragHandleProps) => {
  return (
    <div className={DRAG_HANDLE_CLASS}>
      <GripVertical size={20} className={DRAG_ICON_CLASS} />
      {title && <h3 className={TEXT_HEADING_MEDIUM_CLASS}>{title}</h3>}
    </div>
  );
};

interface RemoveButtonProps {
  onRemove: () => void;
}

const RemoveButton = ({ onRemove }: RemoveButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <button
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      className={BUTTON_CLOSE_CLASS}
      aria-label="Remove card"
      type="button"
    >
      <X size={18} className={CLOSE_ICON_COMBINED_CLASS} />
    </button>
  );
};

interface CardHeaderProps {
  title?: string;
  onRemove?: () => void;
}

const CardHeader = ({ title, onRemove }: CardHeaderProps) => {
  return (
    <div className={GRID_CARD_HEADER_CLASS}>
      <DragHandle title={title} />
      {onRemove && <RemoveButton onRemove={onRemove} />}
    </div>
  );
};

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
  const combinedClassName = `${GRID_CARD_CONTAINER_CLASS} ${className}`;

  return (
    <div className={combinedClassName}>
      <CardHeader title={title} onRemove={onRemove} />
      <div className={GRID_CARD_BODY_CLASS}>{children}</div>
    </div>
  );
}
