import { ColDef } from "ag-grid-community";
import { IRisk } from "@/services/risk/RiskService";
import { getRiskTypeColorClass } from "@/services/risk/riskColors";
import { createColoredPillCellRenderer } from "@/grids/common/cellRenderer/createColoredPillCellRenderer";
import { createIndicatorColDef } from "@/grids/common/colDef/createIndicatorColDef";
import { usd0Formatter } from "@/grids/common/valueFormatter/priceFormatter";
import { number2Formatter } from "@/grids/common/valueFormatter/numberFormatter";
import { percent2Formatter } from "@/grids/common/valueFormatter/percentFormatter";

export const RISK_COLUMN_DEFS: ColDef<IRisk>[] = [
  createIndicatorColDef<IRisk, "riskType">({
    field: "riskType",
    getColor: getRiskTypeColorClass,
  }),
  { field: "id", headerName: "Risk ID", minWidth: 120 },
  { field: "portfolioId", headerName: "Portfolio ID", minWidth: 120 },
  {
    field: "riskType",
    headerName: "Risk Type",
    minWidth: 140,
    cellRenderer: createColoredPillCellRenderer<IRisk, "riskType">({
      field: "riskType",
      getStyles: getRiskTypeColorClass,
    }),
  },
  {
    field: "VaR",
    headerName: "VaR",
    type: "numericColumn",
    valueFormatter: usd0Formatter,
    sort: "desc",
  },
  {
    field: "expectedShortfall",
    headerName: "Expected Shortfall",
    type: "numericColumn",
    valueFormatter: usd0Formatter,
  },
  {
    field: "volatility",
    headerName: "Volatility",
    type: "numericColumn",
    valueFormatter: percent2Formatter,
  },
  {
    field: "beta",
    headerName: "Beta",
    type: "numericColumn",
    valueFormatter: number2Formatter,
  },
  {
    field: "correlation",
    headerName: "Correlation",
    type: "numericColumn",
    valueFormatter: number2Formatter,
  },
  {
    field: "riskDate",
    headerName: "Risk Date",
    minWidth: 160,
    valueFormatter: (params) => new Date(params.value).toLocaleString(),
  },
];
