export const NavIcon = ({
  className = "h-5 w-5",
  definition,
}: {
  className?: string;
  definition: string;
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d={definition}
    />
  </svg>
);
