import { ColDef } from "ag-grid-community";
import { IRisk } from "@/services/risk/RiskService";
import { getRiskTypeColorClass } from "@/services/risk/riskColors";
import { createColoredPillCellRenderer } from "@/grids/common/cellRenderer/createColoredPillCellRenderer";
import { createIndicatorColDef } from "@/grids/common/colDef/createIndicatorColDef";

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
    valueFormatter: (params) => `$${params.value?.toLocaleString()}`,
  },
  {
    field: "expectedShortfall",
    headerName: "Expected Shortfall",
    type: "numericColumn",
    valueFormatter: (params) => `$${params.value?.toLocaleString()}`,
  },
  {
    field: "volatility",
    headerName: "Volatility",
    type: "numericColumn",
    valueFormatter: (params) => `${(params.value * 100)?.toFixed(2)}%`,
  },
  {
    field: "beta",
    headerName: "Beta",
    type: "numericColumn",
    valueFormatter: (params) => params.value?.toFixed(2),
  },
  {
    field: "correlation",
    headerName: "Correlation",
    type: "numericColumn",
    valueFormatter: (params) => params.value?.toFixed(2),
  },
  {
    field: "riskDate",
    headerName: "Risk Date",
    minWidth: 160,
    valueFormatter: (params) => new Date(params.value).toLocaleString(),
  },
];
