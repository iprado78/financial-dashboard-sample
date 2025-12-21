import { ICON_SIZE_MEDIUM_CLASS } from "@/styles/designSystem";

export interface SvgIconProps {
  className?: string;
  definition: string;
  strokeWidth?: number;
  viewBox?: string;
  fill?: string;
}

const DEFAULT_STROKE_WIDTH = 2;
const DEFAULT_VIEW_BOX = "0 0 24 24";
const DEFAULT_FILL = "none";

export const SvgIcon = ({
  className = ICON_SIZE_MEDIUM_CLASS,
  definition,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  viewBox = DEFAULT_VIEW_BOX,
  fill = DEFAULT_FILL,
}: SvgIconProps) => (
  <svg
    className={className}
    fill={fill}
    viewBox={viewBox}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d={definition}
    />
  </svg>
);
