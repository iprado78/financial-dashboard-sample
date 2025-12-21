import { ICON_SIZE_CLASS } from "@/components/ClaudeChat/ClaudeWidget/ChatWidget";
import {
  ArrowsPointingInIcon,
  ChatBubbleLeftRightIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const HEADER_TITLE_CONTAINER_CLASS = "flex items-center space-x-2";

const HEADER_TITLE_ICON_CLASS = "h-5 w-5 text-blue-600";

const HEADER_TITLE_TEXT_CLASS = "font-semibold";

interface HeaderTitleProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}

const HeaderTitle = ({ icon: Icon, title }: HeaderTitleProps) => {
  return (
    <div className={HEADER_TITLE_CONTAINER_CLASS}>
      <Icon className={HEADER_TITLE_ICON_CLASS} />
      <h3 className={HEADER_TITLE_TEXT_CLASS}>{title}</h3>
    </div>
  );
};

const ICON_BUTTON_DANGER_CLASS =
  "text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 transition-colors";

const ICON_BUTTON_NEUTRAL_CLASS =
  "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors";

interface IconButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  title: string;
  variant?: "danger" | "neutral";
}

const IconButton = ({
  icon: Icon,
  onClick,
  title,
  variant = "neutral",
}: IconButtonProps) => {
  const variantClass =
    variant === "danger" ? ICON_BUTTON_DANGER_CLASS : ICON_BUTTON_NEUTRAL_CLASS;

  return (
    <button onClick={onClick} className={variantClass} title={title}>
      <Icon className={ICON_SIZE_CLASS} />
    </button>
  );
};

const HEADER_ACTIONS_CONTAINER_CLASS = "flex items-center space-x-2";

interface HeaderActionsProps {
  onClearChat: () => void;
  onMinimize: () => void;
}

const HeaderActions = ({ onClearChat, onMinimize }: HeaderActionsProps) => {
  return (
    <div className={HEADER_ACTIONS_CONTAINER_CLASS}>
      <IconButton
        icon={TrashIcon}
        onClick={onClearChat}
        title="Clear chat history"
        variant="danger"
      />
      <IconButton
        icon={ArrowsPointingInIcon}
        onClick={onMinimize}
        title="Minimize chat"
        variant="neutral"
      />
    </div>
  );
};

const HEADER_CLASS =
  "flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex-shrink-0";

interface ChatHeaderProps {
  onClearChat: () => void;
  onMinimize: () => void;
}

export const ChatHeader = ({ onClearChat, onMinimize }: ChatHeaderProps) => {
  return (
    <div className={HEADER_CLASS}>
      <HeaderTitle icon={ChatBubbleLeftRightIcon} title="Claude Assistant" />
      <HeaderActions onClearChat={onClearChat} onMinimize={onMinimize} />
    </div>
  );
};
