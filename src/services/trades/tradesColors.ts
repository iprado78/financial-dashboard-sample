import { TradeStatus } from "@/services/trades/TradesService";
import { getColorClass } from "@/styles/colors";

export function getTradeStatusColorClass(status: TradeStatus): string {
  switch (status) {
    case "PENDING":
      return getColorClass("warning");
    case "FILLED":
      return getColorClass("success");
    case "ACCEPTED":
    case "PARTIAL":
      return getColorClass("info");
    case "CANCELLED":
      return getColorClass("error");
    default:
      return getColorClass("neutral");
  }
}
