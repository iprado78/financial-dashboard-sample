import { ICellRendererParams } from "ag-grid-community";
import { ITransaction } from "@/data/generateTransactions";

const getTypeStyles = (type: ITransaction["transactionType"]): string => {
  switch (type) {
    case "CREDIT":
      return "bg-success-light text-success-dark dark:bg-success-dark dark:text-success-light";
    case "DEBIT":
      return "bg-info-light text-info-dark dark:bg-info-dark dark:text-info-light";
    default:
      return "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
  }
};

export function TransactionTypeCellRenderer(params: ICellRendererParams) {
  const type = params.value as ITransaction["transactionType"];
  if (!type) return null;

  const styleClasses = getTypeStyles(type);

  return (
    <div className="flex items-center h-full">
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium ${styleClasses}`}
      >
        {type}
      </span>
    </div>
  );
}
