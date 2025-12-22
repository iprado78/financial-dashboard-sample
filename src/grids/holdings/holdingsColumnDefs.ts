import { createBinaryCellClassRules } from "@/grids/common/cellClass/createBinaryCellClassRules";
import { createCompanyLogoWithTextCellRenderer } from "@/grids/common/cellRenderer/createCompanyLogoWithTextCellRenderer";
import {
  number0Formatter,
  number2Formatter,
} from "@/grids/common/valueFormatter/numberFormatter";
import { normalizedPercent2Formatter } from "@/grids/common/valueFormatter/percentFormatter";
import { usd0Formatter } from "@/grids/common/valueFormatter/priceFormatter";
import { getPnlColorClass } from "@/services/holdings/holdingsColors";
import { IHolding } from "@/services/holdings/HoldingsService";
import { ColDef } from "ag-grid-community";

import { createIndicatorColDef } from "../common/colDef/createIndicatorColDef";

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
    valueFormatter: number2Formatter,
  },
  {
    field: "weight",
    headerName: "Weight",
    type: "numericColumn",
    valueFormatter: normalizedPercent2Formatter,
  },
];
