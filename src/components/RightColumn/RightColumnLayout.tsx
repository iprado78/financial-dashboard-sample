import { ReactNode } from "react";
import ClaudeChatIntegration from "@/components/ClaudeChat/ClaudeChatIntegration";

interface RightColumnLayoutProps {
  chatHeight?: string;
  children?: ReactNode;
}

export default function RightColumnLayout({
  chatHeight: _chatHeight = "50%",
  children,
}: RightColumnLayoutProps) {
  return (
    <aside className="fixed right-4 top-24 bottom-4 w-96 flex flex-col border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl shadow-lg z-40 overflow-hidden">
      {/* Additional content section */}
      {children && (
        <div className="flex-shrink-0 overflow-y-auto border-b border-slate-200 dark:border-slate-700 max-h-[40vh]">
          {children}
        </div>
      )}

      {/* Claude Chat section */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <ClaudeChatIntegration />
      </div>
    </aside>
  );
}
