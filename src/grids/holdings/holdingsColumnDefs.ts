import { ColDef } from "ag-grid-community";
import { createCompanyLogoCellRenderer } from "../common/cellRenderer/companyLogo/CompanyLogoCellRenderer";
import { quantityFormatter } from "@/grids/common/valueFormatter/numberFormatter";
import { PnlCellRenderer } from "./cellRenderer/pnl/PnlCellRenderer";
import { createStatusIndicatorCellRenderer } from "../common/cellRenderer/statusIndicator/StatusIndicatorCellRenderer";

const getPnlColor = (pnl: number): string => {
  if (pnl > 0) return "#10b981"; // success
  else if (pnl < 0) return "#ef4444"; // error
  return "#9ca3af"; // gray
};

export const HOLDINGS_COLUMN_DEFS: ColDef[] = [
  {
    field: "status",
    headerName: "",
    minWidth: 12,
    maxWidth: 12,
    cellRenderer: createStatusIndicatorCellRenderer({
      getColor: (data) => getPnlColor(data.unrealizedGainLoss),
    }),
    sortable: false,
    filter: false,
    resizable: false,
    suppressSizeToFit: true,
    pinned: "left",
    lockPinned: true,
    cellClass: "!p-0",
  },
  { field: "id", headerName: "Holding ID", minWidth: 120 },
  { field: "portfolioId", headerName: "Portfolio ID", minWidth: 120 },
  {
    field: "symbol",
    headerName: "",
    minWidth: 55,
    maxWidth: 55,
    cellRenderer: createCompanyLogoCellRenderer({ fieldName: "symbol" }),
    sortable: false,
    filter: false,
    resizable: false,
    suppressSizeToFit: true,
    cellClass: "!pr-0",
  },
  { field: "symbol", headerName: "Symbol", minWidth: 100 },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "numericColumn",
    valueFormatter: quantityFormatter,
  },
  {
    field: "marketValue",
    headerName: "Market Value",
    type: "numericColumn",
    valueFormatter: (params) => `$${params.value?.toLocaleString()}`,
  },
  {
    field: "costBasis",
    headerName: "Cost Basis",
    type: "numericColumn",
    valueFormatter: (params) => `$${params.value?.toLocaleString()}`,
  },
  {
    field: "unrealizedGainLoss",
    headerName: "Unrealized P&L",
    type: "numericColumn",
    cellRenderer: PnlCellRenderer,
  },
  {
    field: "weight",
    headerName: "Weight",
    type: "numericColumn",
    valueFormatter: (params) => `${(params.value * 100)?.toFixed(2)}%`,
  },
  { field: "sector", headerName: "Sector", minWidth: 150 },
];
