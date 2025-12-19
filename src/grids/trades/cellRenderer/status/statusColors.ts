export type StatusType = "Pending" | "Accepted" | "Rejected" | "Partial" | "Cancelled - Partial" | "Cancelled - No Fill" | "Filled";

export const getStatusColor = (status: StatusType): string => {
  switch (status) {
    case "Pending":
      return "#f59e0b"; // warning
    case "Filled":
      return "#10b981"; // success
    case "Accepted":
    case "Partial":
    case "Cancelled - Partial":
      return "#3b82f6"; // info
    case "Rejected":
      return "#ef4444"; // error
    case "Cancelled - No Fill":
      return "#9ca3af"; // gray-400
    default:
      return "#9ca3af";
  }
};

export const getStatusStyles = (status: StatusType): string => {
  switch (status) {
    case "Pending":
      return "bg-warning-light text-warning-dark dark:bg-warning-dark dark:text-warning-light";
    case "Filled":
      return "bg-success-light text-success-dark dark:bg-success-dark dark:text-success-light";
    case "Accepted":
    case "Partial":
    case "Cancelled - Partial":
      return "bg-info-light text-info-dark dark:bg-info-dark dark:text-info-light";
    case "Rejected":
      return "bg-error-light text-error-dark dark:bg-error-dark dark:text-error-light";
    case "Cancelled - No Fill":
      return "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    default:
      return "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
  }
};
