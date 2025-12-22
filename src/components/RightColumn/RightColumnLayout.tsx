import ClaudeChatIntegration from "@/components/ClaudeChat/ClaudeChatIntegration";
import { PropsWithChildren } from "react";
import {
  BORDER_BASE_CLASS,
  BORDER_BOTTOM_CLASS,
  FLEX_COL_CLASS,
  ROUNDED_LARGE_CLASS,
  SHADOW_LARGE_CLASS,
} from "@/styles/designSystem";

interface RightColumnLayoutProps extends PropsWithChildren {}

const ASIDE_CLASS = `lg:fixed lg:right-8 lg:top-24 lg:bottom-8 w-auto lg:w-96 min-h-20 lg:h-auto ${FLEX_COL_CLASS} z-40 lg:overflow-hidden ${BORDER_BASE_CLASS} bg-white dark:bg-slate-800 ${ROUNDED_LARGE_CLASS} ${SHADOW_LARGE_CLASS}`;

const CHILDREN_CONTAINER_CLASS = `flex-shrink-0 overflow-y-auto ${BORDER_BOTTOM_CLASS} max-h-full lg:max-h-[40vh]`;

const CHAT_CONTAINER_CLASS = "flex-1 min-h-0 lg:overflow-hidden";

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

export default function RightColumnLayout({
  children,
}: RightColumnLayoutProps) {
  return (
    <aside className={ASIDE_CLASS}>
      {children && <ChildrenSection>{children}</ChildrenSection>}
      <ChatSection />
    </aside>
  );
}
