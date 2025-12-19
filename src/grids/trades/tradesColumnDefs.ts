import { ColDef } from "ag-grid-community";
import { createCompanyLogoCellRenderer } from "../common/cellRenderer/companyLogo/CompanyLogoCellRenderer";
import { StatusCellRenderer } from "./cellRenderer/status/StatusCellRenderer";
import { ITrade } from "@/services/trades/TradesService";
import { quantityFormatter } from "@/grids/common/valueFormatter/numberFormatter";

// Currency symbol mapping
const CURRENCY_SYMBOLS: Record<ITrade["currency"], string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
};

function getCurrencySymbol(currency: string): string {
  const upperCurrency = currency?.toUpperCase() as ITrade["currency"];
  return CURRENCY_SYMBOLS[upperCurrency] || currency || "$";
}

export const TRADES_COLUMN_DEFS: ColDef[] = [
  { field: "trader", headerName: "Trader", minWidth: 100 },
  { field: "accountId", headerName: "Account ID", minWidth: 120 },
  { field: "positionId", headerName: "Position ID", minWidth: 120 },
  {
    field: "ticker",
    headerName: "",
    minWidth: 55,
    maxWidth: 55,
    cellRenderer: createCompanyLogoCellRenderer({ fieldName: "ticker" }),
    sortable: false,
    filter: false,
    resizable: false,
    suppressSizeToFit: true,
    cellClass: "!pr-0",
  },
  { field: "ticker", headerName: "Ticker", minWidth: 80 },
  {
    field: "status",
    headerName: "Status",
    minWidth: 180,
    cellRenderer: StatusCellRenderer,
  },
  {
    field: "price",
    headerName: "Price",
    type: "numericColumn",
    valueFormatter: (params) => {
      const currency = params.data?.currency;
      const symbol = getCurrencySymbol(currency);
      return `${symbol}${params.value?.toFixed(2)}`;
    },
  },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "numericColumn",
    valueFormatter: quantityFormatter,
  },
  {
    field: "filledQty",
    headerName: "Filled Qty",
    type: "numericColumn",
    valueFormatter: quantityFormatter,
  },
  {
    field: "unfilledQty",
    headerName: "Unfilled Qty",
    type: "numericColumn",
    valueFormatter: quantityFormatter,
  },
  {
    field: "side",
    headerName: "Side",
    minWidth: 80,
    cellClass: "font-medium",
    cellClassRules: {
      "!text-success": (params) => params.value?.toUpperCase() === "BUY",
      "!text-error": (params) => params.value?.toUpperCase() === "SELL",
    },
  },

  {
    field: "orderTime",
    headerName: "Order Time",
    minWidth: 160,
    valueFormatter: (params) => new Date(params.value).toLocaleString(),
  },
  {
    field: "lastUpdate",
    headerName: "Last Update",
    minWidth: 160,
    valueFormatter: (params) => new Date(params.value).toLocaleString(),
  },
  { field: "currency", headerName: "Currency", minWidth: 80 },
  { field: "id", headerName: "Trade ID", minWidth: 120 },
];
