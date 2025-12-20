import { getColorClass } from "@/styles/colors";
import { ITransaction } from "./TransactionsService";

export function getTransactionStatusColorClass(
  status: ITransaction["status"]
): string {
  switch (status) {
    case "COMPLETED":
      return getColorClass("success");
    case "PENDING":
      return getColorClass("warning");
    case "FAILED":
    case "CANCELLED":
      return getColorClass("error");
    default:
      return getColorClass("neutral");
  }
}
