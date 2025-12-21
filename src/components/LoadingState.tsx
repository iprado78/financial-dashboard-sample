import {
  CARD_BASE_CLASS,
  TEXT_BODY_SECONDARY_CLASS,
  PADDING_LARGE_CLASS,
  FLEX_CENTER_CLASS,
} from "@/styles/designSystem";

const LOADING_CONTAINER_CLASS = `${CARD_BASE_CLASS} ${PADDING_LARGE_CLASS} ${FLEX_CENTER_CLASS}`;

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState = ({
  message = "Loading...",
  className = "",
}: LoadingStateProps) => {
  const combinedClassName = `${LOADING_CONTAINER_CLASS} ${className}`;

  return (
    <div className={combinedClassName}>
      <p className={TEXT_BODY_SECONDARY_CLASS}>{message}</p>
    </div>
  );
};
