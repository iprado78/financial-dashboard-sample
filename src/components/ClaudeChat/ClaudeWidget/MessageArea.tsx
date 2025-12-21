import { Message } from "@/components/ClaudeChat/ClaudeWidget/ChatWidget";

const MESSAGES_CONTAINER_CLASS = "flex-1 overflow-y-auto p-4 space-y-4";

const EMPTY_STATE_CONTAINER_CLASS =
  "text-center text-slate-500 dark:text-slate-400 mt-8";

const EMPTY_STATE_PRIMARY_TEXT_CLASS = "text-sm";

const EMPTY_STATE_SECONDARY_TEXT_CLASS = "text-xs mt-2";

interface EmptyStateProps {
  primaryText: string;
  secondaryText: string;
}

const EmptyState = ({ primaryText, secondaryText }: EmptyStateProps) => {
  return (
    <div className={EMPTY_STATE_CONTAINER_CLASS}>
      <p className={EMPTY_STATE_PRIMARY_TEXT_CLASS}>{primaryText}</p>
      <p className={EMPTY_STATE_SECONDARY_TEXT_CLASS}>{secondaryText}</p>
    </div>
  );
};

const MESSAGE_WRAPPER_USER_CLASS = "flex justify-end";

const MESSAGE_WRAPPER_ASSISTANT_CLASS = "flex justify-start";

const MESSAGE_BUBBLE_BASE_CLASS = "max-w-[80%] rounded-lg px-4 py-2";

const MESSAGE_BUBBLE_USER_CLASS = "bg-blue-600 text-white";

const MESSAGE_BUBBLE_ASSISTANT_CLASS =
  "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100";

const MESSAGE_TEXT_CLASS = "text-sm whitespace-pre-wrap";

// Component: Message Bubble
interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
}

const MessageBubble = ({ role, content }: MessageBubbleProps) => {
  const wrapperClass =
    role === "user"
      ? MESSAGE_WRAPPER_USER_CLASS
      : MESSAGE_WRAPPER_ASSISTANT_CLASS;

  const bubbleClass = `${MESSAGE_BUBBLE_BASE_CLASS} ${
    role === "user" ? MESSAGE_BUBBLE_USER_CLASS : MESSAGE_BUBBLE_ASSISTANT_CLASS
  }`;

  return (
    <div className={wrapperClass}>
      <div className={bubbleClass}>
        <p className={MESSAGE_TEXT_CLASS}>{content}</p>
      </div>
    </div>
  );
};

const LOADING_INDICATOR_CONTAINER_CLASS =
  "bg-slate-100 dark:bg-slate-700 rounded-lg px-4 py-2";

const LOADING_DOTS_CONTAINER_CLASS = "flex space-x-2";

const LOADING_DOT_CLASS = "w-2 h-2 bg-slate-400 rounded-full animate-bounce";

interface LoadingDotProps {
  delay: number;
}

const LoadingDot = ({ delay }: LoadingDotProps) => {
  return (
    <div
      className={LOADING_DOT_CLASS}
      style={{ animationDelay: `${delay}ms` }}
    />
  );
};

const LoadingIndicator = () => {
  return (
    <div className={MESSAGE_WRAPPER_ASSISTANT_CLASS}>
      <div className={LOADING_INDICATOR_CONTAINER_CLASS}>
        <div className={LOADING_DOTS_CONTAINER_CLASS}>
          <LoadingDot delay={0} />
          <LoadingDot delay={150} />
          <LoadingDot delay={300} />
        </div>
      </div>
    </div>
  );
};

interface MessagesAreaProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const MessagesArea = ({
  messages,
  isLoading,
  messagesEndRef,
}: MessagesAreaProps) => {
  return (
    <div className={MESSAGES_CONTAINER_CLASS}>
      {messages.length === 0 && (
        <EmptyState
          primaryText="Ask me to filter tables, analyze data, or navigate the app!"
          secondaryText='Try: "Show me trades over $1000" or "Filter holdings by Technology sector"'
        />
      )}
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          role={message.role}
          content={message.content}
        />
      ))}
      {isLoading && <LoadingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};
