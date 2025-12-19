import { ICellRendererParams } from "ag-grid-community";
import { ITransaction } from "@/data/generateTransactions";

const getStatusStyles = (status: ITransaction["status"]): string => {
  switch (status) {
    case "COMPLETED":
      return "bg-success-light text-success-dark dark:bg-success-dark dark:text-success-light";
    case "PENDING":
      return "bg-warning-light text-warning-dark dark:bg-warning-dark dark:text-warning-light";
    case "FAILED":
      return "bg-error-light text-error-dark dark:bg-error-dark dark:text-error-light";
    case "CANCELLED":
      return "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    default:
      return "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
  }
};

export function TransactionStatusCellRenderer(params: ICellRendererParams) {
  const status = params.value as ITransaction["status"];
  if (!status) return null;

  const styleClasses = getStatusStyles(status);

  return (
    <div className="flex items-center h-full">
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium ${styleClasses}`}
      >
        {status}
      </span>
    </div>
  );
}
