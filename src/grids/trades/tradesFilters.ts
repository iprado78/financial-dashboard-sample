import { ITrade } from "@/services/trades/TradesService";
import { StatusType } from "./cellRenderer/status/statusColors";

export const OPEN_STATUSES: StatusType[] = ["Pending", "Accepted", "Partial"];

export const TERMINAL_STATUSES: StatusType[] = [
  "Filled",
  "Rejected",
  "Cancelled - Partial",
  "Cancelled - No Fill",
];

export type QuickFilterType = "myTrades" | "open" | "terminal";

export interface QuickFilter {
  id: QuickFilterType;
  label: string;
  filter: (row: ITrade, currentUser?: string) => boolean;
}

export const TRADES_QUICK_FILTERS: QuickFilter[] = [
  {
    id: "open",
    label: "Open",
    filter: (row) => OPEN_STATUSES.includes(row.status),
  },
  {
    id: "terminal",
    label: "Terminal",
    filter: (row) => TERMINAL_STATUSES.includes(row.status),
  },
];
