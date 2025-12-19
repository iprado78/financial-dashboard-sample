import { RowClassParams, RowStyle } from "ag-grid-community";
import { ITransaction } from "@/data/generateTransactions";

const getStatusColor = (status: ITransaction["status"]): string => {
  switch (status) {
    case "COMPLETED":
      return "#10b981"; // success
    case "PENDING":
      return "#f59e0b"; // warning
    case "FAILED":
      return "#ef4444"; // error
    case "CANCELLED":
      return "#9ca3af"; // gray
    default:
      return "#9ca3af";
  }
};

export const getTransactionsRowStyle = (
  params: RowClassParams
): RowStyle | undefined => {
  const status = params.data?.status as ITransaction["status"];
  if (!status) return undefined;

  const color = getStatusColor(status);

  return {
    borderLeft: `4px solid ${color}`,
  };
};
