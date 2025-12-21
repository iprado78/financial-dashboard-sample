import { ColDef } from "ag-grid-community";
import { ICredit } from "@/services/credit/CreditService";
import { getCreditRatingColorClass } from "@/services/credit/creditColors";
import { createColoredPillCellRenderer } from "@/grids/common/cellRenderer/createColoredPillCellRenderer";
import { createIndicatorColDef } from "@/grids/common/colDef/createIndicatorColDef";
import { usd0Formatter } from "@/grids/common/valueFormatter/priceFormatter";
import { percent2Formatter } from "@/grids/common/valueFormatter/percentFormatter";

export const CREDIT_COLUMN_DEFS: ColDef<ICredit>[] = [
  createIndicatorColDef<ICredit, "creditRating">({
    field: "creditRating",
    getColor: getCreditRatingColorClass,
  }),
  { field: "id", headerName: "Credit ID", minWidth: 120 },
  { field: "counterpartyId", headerName: "Counterparty ID", minWidth: 140 },
  { field: "counterpartyName", headerName: "Counterparty Name", minWidth: 200 },
  {
    field: "creditRating",
    headerName: "Credit Rating",
    minWidth: 110,
    cellRenderer: createColoredPillCellRenderer<ICredit, "creditRating">({
      field: "creditRating",
      getStyles: getCreditRatingColorClass,
    }),
  },
  {
    field: "exposure",
    headerName: "Exposure",
    type: "numericColumn",
    valueFormatter: usd0Formatter,
  },
  {
    field: "collateral",
    headerName: "Collateral",
    type: "numericColumn",
    valueFormatter: usd0Formatter,
    sort: "desc",
  },
  {
    field: "netExposure",
    headerName: "Net Exposure",
    type: "numericColumn",
    valueFormatter: usd0Formatter,
  },
  {
    field: "riskLimit",
    headerName: "Risk Limit",
    type: "numericColumn",
    valueFormatter: usd0Formatter,
  },
  {
    field: "utilizationPercent",
    headerName: "Utilization %",
    type: "numericColumn",
    valueFormatter: percent2Formatter,
  },
];
