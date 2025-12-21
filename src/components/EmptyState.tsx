import { SvgIcon } from "@/components/SvgIcon/SvgIcon";
import {
  CHART_ICON_DEFINITION,
  TABLE_ICON_DEFINITION,
  PLUS_ICON_DEFINITION,
} from "@/components/SvgIcon/iconDefinitions";
import {
  FLEX_CENTER_CLASS,
  TEXT_HEADING_LARGE_CLASS,
  TEXT_BODY_SECONDARY_CLASS,
  TEXT_MUTED_CLASS,
  ICON_SIZE_SMALL_CLASS,
} from "@/styles/designSystem";

interface EmptyStateProps {
  icon: "chart" | "table";
  title: string;
  description: string;
  showAddButton?: boolean;
}

const CONTAINER_CLASS = `${FLEX_CENTER_CLASS} min-h-[400px]`;

const CONTENT_CLASS = "text-center max-w-md";

const ICON_CONTAINER_CLASS = "mb-4";

const ICON_CLASS = "mx-auto h-24 w-24 text-gray-400 dark:text-gray-600";

const TITLE_CLASS = `${TEXT_HEADING_LARGE_CLASS} mb-2`;

const DESCRIPTION_CLASS = `${TEXT_BODY_SECONDARY_CLASS} mb-4`;

const CTA_CONTAINER_CLASS = `${FLEX_CENTER_CLASS} gap-2 text-sm ${TEXT_MUTED_CLASS}`;

const PING_ANIMATION_CLASS =
  "absolute inset-0 rounded-full bg-primary animate-ping opacity-75";

const PULSE_BUTTON_CLASS =
  "relative w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white animate-pulse";

const BUTTON_ICON_WRAPPER_CLASS = "relative inline-flex items-center";

interface AnimatedAddButtonProps {
  iconDefinition: string;
}

const AnimatedAddButton = ({ iconDefinition }: AnimatedAddButtonProps) => {
  return (
    <div className={BUTTON_ICON_WRAPPER_CLASS}>
      <span className={PING_ANIMATION_CLASS}></span>
      <div className={PULSE_BUTTON_CLASS}>
        <SvgIcon className={ICON_SIZE_SMALL_CLASS} definition={iconDefinition} />
      </div>
    </div>
  );
};

interface CTASectionProps {
  showAddButton: boolean;
}

const CTASection = ({ showAddButton }: CTASectionProps) => {
  if (!showAddButton) return null;

  return (
    <div className={CTA_CONTAINER_CLASS}>
      <span>Click the</span>
      <AnimatedAddButton iconDefinition={PLUS_ICON_DEFINITION} />
      <span>button in the right panel to begin</span>
    </div>
  );
};

export default function EmptyState({
  icon,
  title,
  description,
  showAddButton = true,
}: EmptyStateProps) {
  const iconDefinition =
    icon === "chart" ? CHART_ICON_DEFINITION : TABLE_ICON_DEFINITION;

  return (
    <div className={CONTAINER_CLASS}>
      <div className={CONTENT_CLASS}>
        <div className={ICON_CONTAINER_CLASS}>
          <SvgIcon
            className={ICON_CLASS}
            definition={iconDefinition}
            strokeWidth={1.5}
          />
        </div>
        <h3 className={TITLE_CLASS}>{title}</h3>
        <p className={DESCRIPTION_CLASS}>{description}</p>
        <CTASection showAddButton={showAddButton} />
      </div>
    </div>
  );
}
