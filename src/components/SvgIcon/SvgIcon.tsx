export interface SvgIconProps {
  className?: string;
  definition: string;
  strokeWidth?: number;
  viewBox?: string;
  fill?: string;
}

export const SvgIcon = ({
  className = "h-5 w-5",
  definition,
  strokeWidth = 2,
  viewBox = "0 0 24 24",
  fill = "none",
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
