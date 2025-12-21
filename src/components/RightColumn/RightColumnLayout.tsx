import ClaudeChatIntegration from "@/components/ClaudeChat/ClaudeChatIntegration";
import { PropsWithChildren } from "react";
import {
  BORDER_BASE_CLASS,
  BORDER_BOTTOM_CLASS,
  FLEX_COL_CLASS,
  ROUNDED_LARGE_CLASS,
  SHADOW_LARGE_CLASS,
} from "@/styles/designSystem";

const ASIDE_CONTAINER_CLASS = `fixed right-8 top-24 bottom-8 w-96 ${FLEX_COL_CLASS} ${BORDER_BASE_CLASS} bg-white dark:bg-slate-800 ${ROUNDED_LARGE_CLASS} ${SHADOW_LARGE_CLASS} z-40 overflow-hidden`;

const CHILDREN_CONTAINER_CLASS = `flex-shrink-0 overflow-y-auto ${BORDER_BOTTOM_CLASS} max-h-[40vh]`;

const CHAT_CONTAINER_CLASS = "flex-1 min-h-0 overflow-hidden";

interface ChildrenSectionProps {
  children: React.ReactNode;
}

const ChildrenSection = ({ children }: ChildrenSectionProps) => {
  return <div className={CHILDREN_CONTAINER_CLASS}>{children}</div>;
};

const ChatSection = () => {
  return (
    <div className={CHAT_CONTAINER_CLASS}>
      <ClaudeChatIntegration />
    </div>
  );
};

export default function RightColumnLayout({ children }: PropsWithChildren) {
  return (
    <aside className={ASIDE_CONTAINER_CLASS}>
      {children && <ChildrenSection>{children}</ChildrenSection>}
      <ChatSection />
    </aside>
  );
}
