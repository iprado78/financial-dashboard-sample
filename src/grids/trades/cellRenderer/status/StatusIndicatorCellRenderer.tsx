import { ICellRendererParams } from "ag-grid-community";
import { StatusType } from "./statusColors";

const getStatusColorClass = (status: StatusType) => {
  switch (status) {
    case "Pending":
      return "bg-warning";
    case "Filled":
      return "bg-success";
    case "Accepted":
    case "Partial":
    case "Cancelled - Partial":
      return "bg-info";
    case "Rejected":
      return "bg-error";
    case "Cancelled - No Fill":
      return "bg-gray-400 dark:bg-gray-600";
    default:
      return "bg-gray-400 dark:bg-gray-600";
  }
};

export function StatusIndicatorCellRenderer(params: ICellRendererParams) {
  const status = params.data?.status as StatusType;
  if (!status) return null;

  const colorClass = getStatusColorClass(status);

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className={`h-full w-1 ${colorClass}`} />
    </div>
  );
}
