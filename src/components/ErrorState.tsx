import { PADDING_MEDIUM_CLASS, TEXT_ERROR_CLASS } from "@/styles/designSystem";

const ERROR_CONTAINER_CLASS = `${PADDING_MEDIUM_CLASS} bg-red-50 dark:bg-red-900/20 rounded-lg w-full`;

interface ErrorStateProps {
  message: string;
  title?: string;
  className?: string;
}

export const ErrorState = ({
  message,
  title,
  className = "",
}: ErrorStateProps) => {
  const combinedClassName = `${ERROR_CONTAINER_CLASS} ${className}`;

  return (
    <div className={combinedClassName}>
      <p className={TEXT_ERROR_CLASS}>
        {title && <strong>{title}: </strong>}
        {message}
      </p>
    </div>
  );
};
