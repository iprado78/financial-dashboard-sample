import { useState, useRef, useEffect } from "react";
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
      <ChatHeader onClearChat={onClearChat} />
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
    </div>
  );
}
