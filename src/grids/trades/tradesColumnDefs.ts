import { ColDef } from "ag-grid-community";
import { createCompanyLogoWithTextCellRenderer } from "../common/cellRenderer/createCompanyLogoWithTextCellRenderer";
import { ITrade } from "@/services/trades/TradesService";
import { number0Formatter } from "@/grids/common/valueFormatter/numberFormatter";
import { createBinaryCellClassRules } from "@/grids/common/cellClass/createBinaryCellClassRules";
import { createColoredPillCellRenderer } from "@/grids/common/cellRenderer/createColoredPillCellRenderer";
import { getTradeStatusColorClass } from "@/services/trades/tradesColors";
import { createIndicatorColDef } from "@/grids/common/colDef/createIndicatorColDef";
import { usd2Formatter } from "@/grids/common/valueFormatter/priceFormatter";

export const TRADES_COLUMN_DEFS: ColDef[] = [
  createIndicatorColDef<ITrade, "status">({
    field: "status",
    getColor: getTradeStatusColorClass,
  }),
  { field: "trader", headerName: "Trader", minWidth: 100 },
  { field: "id", headerName: "Trade ID", minWidth: 120 },
  { field: "accountId", headerName: "Account ID", minWidth: 120 },
  { field: "positionId", headerName: "Position ID", minWidth: 120 },
  {
    field: "ticker",
    headerName: "Ticker",
    minWidth: 135,
    cellRenderer: createCompanyLogoWithTextCellRenderer({
      fieldName: "ticker",
    }),
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 180,
    cellRenderer: createColoredPillCellRenderer<ITrade, "status">({
      field: "status",
      getStyles: getTradeStatusColorClass,
    }),
  },
  {
    field: "price",
    headerName: "Price (USD)",
    type: "numericColumn",
    valueFormatter: usd2Formatter,
  },
  { field: "currency", headerName: "Currency", minWidth: 80 },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "numericColumn",
    valueFormatter: number0Formatter,
  },
  {
    field: "filledQty",
    headerName: "Filled Qty",
    type: "numericColumn",
    valueFormatter: number0Formatter,
  },
  {
    field: "unfilledQty",
    headerName: "Unfilled Qty",
    type: "numericColumn",
    valueFormatter: number0Formatter,
  },
  {
    field: "side",
    headerName: "Side",
    minWidth: 80,
    cellClass: "font-medium",
    cellClassRules: createBinaryCellClassRules({
      successValue: "BUY",
      errorValue: "SELL",
    }),
  },
  {
    field: "orderTime",
    headerName: "Order Time",
    minWidth: 160,
    valueFormatter: (params) => new Date(params.value).toLocaleString(),
    sort: "desc",
  },
  {
    field: "lastUpdate",
    headerName: "Last Update",
    minWidth: 160,
    valueFormatter: (params) => new Date(params.value).toLocaleString(),
  },
];
