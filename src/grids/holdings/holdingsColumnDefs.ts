import { ColDef } from "ag-grid-community";
import { quantityFormatter } from "@/grids/common/valueFormatter/numberFormatter";
import { createIndicatorColDef } from "../common/colDef/createIndicatorColDef";
import { createBinaryCellClassRules } from "@/grids/common/cellClass/createBinaryCellClassRules";
import { IHolding } from "@/services/holdings/HoldingsService";
import { getPnlColorClass } from "@/services/holdings/holdingsColors";
import { createCompanyLogoWithTextCellRenderer } from "@/grids/common/cellRenderer/createCompanyLogoWithTextCellRenderer";

export const HOLDINGS_COLUMN_DEFS: ColDef<IHolding>[] = [
  createIndicatorColDef<IHolding, "unrealizedGainLoss">({
    field: "unrealizedGainLoss",
    getColor: getPnlColorClass,
  }),
  { field: "id", headerName: "Holding ID", minWidth: 120 },
  { field: "portfolioId", headerName: "Portfolio ID", minWidth: 120 },
  {
    field: "symbol",
    headerName: "Symbol",
    minWidth: 135,
    cellRenderer: createCompanyLogoWithTextCellRenderer({
      fieldName: "symbol",
    }),
  },
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
    cellClassRules: createBinaryCellClassRules<IHolding>({
      isSuccess: (params) => {
        if (!params.data?.unrealizedGainLoss) {
          return undefined;
        }
        return params.data?.unrealizedGainLoss > 0;
      },
    }),
  },
  {
    field: "weight",
    headerName: "Weight",
    type: "numericColumn",
    valueFormatter: (params) => `${(params.value * 100)?.toFixed(2)}%`,
  },
  { field: "sector", headerName: "Sector", minWidth: 150 },
];
