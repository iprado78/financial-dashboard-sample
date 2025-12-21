import { useState, useRef, useEffect } from "react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { MessagesArea } from "@/components/ClaudeChat/ClaudeWidget/MessageArea";
import { ChatInput } from "@/components/ClaudeChat/ClaudeWidget/ChatInput";
import { ChatHeader } from "@/components/ClaudeChat/ClaudeWidget/ChatHeader";

export const ICON_SIZE_CLASS = "h-5 w-5";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface MinimizedButtonProps {
  onClick: () => void;
}

const MINIMIZED_BUTTON_CLASS =
  "absolute bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all z-50";

const MINIMIZED_ICON_CLASS = "h-6 w-6";

const MinimizedButton = ({ onClick }: MinimizedButtonProps) => {
  return (
    <button onClick={onClick} className={MINIMIZED_BUTTON_CLASS}>
      <ChatBubbleLeftRightIcon className={MINIMIZED_ICON_CLASS} />
    </button>
  );
};

interface ChatWidgetProps {
  onSendMessage: (message: string) => Promise<void>;
  onClearChat: () => void;
  messages: Message[];
  isLoading: boolean;
}

const CONTAINER_CLASS =
  "w-full h-full bg-white dark:bg-slate-800 flex flex-col relative";

export default function ChatWidget({
  onSendMessage,
  onClearChat,
  messages,
  isLoading,
}: ChatWidgetProps) {
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    await onSendMessage(userMessage);
  };

  return (
    <div className={CONTAINER_CLASS}>
      {isMinimized && (
        <MinimizedButton onClick={() => setIsMinimized(false)} />
      )}
      {!isMinimized && (
        <>
      <ChatHeader
        onClearChat={onClearChat}
        onMinimize={() => setIsMinimized(true)}
      />
      <MessagesArea
        messages={messages}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef}
      />
      <ChatInput
        input={input}
        isLoading={isLoading}
        onInputChange={setInput}
        onSubmit={handleSubmit}
      />
        </>
      )}
    </div>
  );
}
