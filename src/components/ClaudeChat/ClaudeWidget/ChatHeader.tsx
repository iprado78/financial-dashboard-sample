import { ICON_SIZE_CLASS } from "@/components/ClaudeChat/ClaudeWidget/ChatWidget";
import {
  ChatBubbleLeftRightIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { PILL_BASE_CLASS } from "@/styles/designSystem";

const HEADER_TITLE_CONTAINER_CLASS = "flex items-center space-x-2";

const HEADER_TITLE_ICON_CLASS = "h-5 w-5 text-blue-600";

const HEADER_TITLE_TEXT_CLASS = "font-semibold";

const BETA_BADGE_CLASS = `${PILL_BASE_CLASS} bg-warning-light text-warning-dark dark:bg-warning-dark dark:text-warning-light border border-warning text-xs px-1.5 py-0.5 ml-2`;

interface HeaderTitleProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}

const HeaderTitle = ({ icon: Icon, title }: HeaderTitleProps) => {
  return (
    <div className={HEADER_TITLE_CONTAINER_CLASS}>
      <Icon className={HEADER_TITLE_ICON_CLASS} />
      <h3 className={HEADER_TITLE_TEXT_CLASS}>{title}</h3>
      <span className={BETA_BADGE_CLASS}>BETA</span>
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
}

const HeaderActions = ({ onClearChat }: HeaderActionsProps) => {
  return (
    <div className={HEADER_ACTIONS_CONTAINER_CLASS}>
      <IconButton
        icon={TrashIcon}
        onClick={onClearChat}
        title="Clear chat history"
        variant="danger"
      />
    </div>
  );
};

const HEADER_CLASS =
  "flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex-shrink-0";

interface ChatHeaderProps {
  onClearChat: () => void;
}

export const ChatHeader = ({ onClearChat }: ChatHeaderProps) => {
  return (
    <div className={HEADER_CLASS}>
      <HeaderTitle icon={ChatBubbleLeftRightIcon} title="Claude Assistant" />
      <HeaderActions onClearChat={onClearChat} />
    </div>
  );
};
