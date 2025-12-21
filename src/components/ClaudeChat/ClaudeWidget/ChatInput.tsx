import { ICON_SIZE_CLASS } from "@/components/ClaudeChat/ClaudeWidget/ChatWidget";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

const INPUT_FORM_CLASS =
  "p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0";

const INPUT_CONTAINER_CLASS = "flex space-x-2";

const TEXT_INPUT_CLASS =
  "flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 disabled:opacity-50";

const SUBMIT_BUTTON_CLASS =
  "bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ChatInput = ({
  input,
  isLoading,
  onInputChange,
  onSubmit,
}: ChatInputProps) => {
  return (
    <form onSubmit={onSubmit} className={INPUT_FORM_CLASS}>
      <div className={INPUT_CONTAINER_CLASS}>
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Ask me anything..."
          disabled={isLoading}
          className={TEXT_INPUT_CLASS}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className={SUBMIT_BUTTON_CLASS}
        >
          <PaperAirplaneIcon className={ICON_SIZE_CLASS} />
        </button>
      </div>
    </form>
  );
};
