import { ColDef } from "ag-grid-community";
import { number0Formatter } from "@/grids/common/valueFormatter/numberFormatter";
import { createIndicatorColDef } from "../common/colDef/createIndicatorColDef";
import { createBinaryCellClassRules } from "@/grids/common/cellClass/createBinaryCellClassRules";
import { IHolding } from "@/services/holdings/HoldingsService";
import { getPnlColorClass } from "@/services/holdings/holdingsColors";
import { createCompanyLogoWithTextCellRenderer } from "@/grids/common/cellRenderer/createCompanyLogoWithTextCellRenderer";
import {
  usd0Formatter,
  usd2Formatter,
} from "@/grids/common/valueFormatter/priceFormatter";
import { normalizedPercent2Formatter } from "@/grids/common/valueFormatter/percentFormatter";

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
  { field: "sector", headerName: "Sector", minWidth: 150 },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "numericColumn",
    valueFormatter: number0Formatter,
    sort: "desc",
  },
  {
    field: "marketValue",
    headerName: "Market Value",
    type: "numericColumn",
    valueFormatter: usd0Formatter,
  },
  {
    field: "costBasis",
    headerName: "Cost Basis",
    type: "numericColumn",
    valueFormatter: usd0Formatter,
  },
  {
    field: "unrealizedGainLoss",
    headerName: "Unrealized P&L (USD)",
    type: "numericColumn",
    cellClassRules: createBinaryCellClassRules<IHolding>({
      isSuccess: (params) => {
        if (!params.data?.unrealizedGainLoss) {
          return undefined;
        }
        return params.data?.unrealizedGainLoss > 0;
      },
    }),
    valueFormatter: usd2Formatter,
  },
  {
    field: "weight",
    headerName: "Weight",
    type: "numericColumn",
    valueFormatter: normalizedPercent2Formatter,
  },
];
