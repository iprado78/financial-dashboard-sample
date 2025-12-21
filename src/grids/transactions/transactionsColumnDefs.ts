import { ColDef } from "ag-grid-community";
import { createBinaryCellClassRules } from "@/grids/common/cellClass/createBinaryCellClassRules";
import { ITransaction } from "@/services/transactions/TransactionsService";
import { getTransactionStatusColorClass } from "@/services/transactions/transactionsColors";
import { createColoredPillCellRenderer } from "@/grids/common/cellRenderer/createColoredPillCellRenderer";
import { createIndicatorColDef } from "@/grids/common/colDef/createIndicatorColDef";
import {
  createPriceFormatter,
  usd2Formatter,
} from "@/grids/common/valueFormatter/priceFormatter";

export const TRANSACTIONS_COLUMN_DEFS: ColDef<ITransaction>[] = [
  createIndicatorColDef<ITransaction, "status">({
    field: "status",
    getColor: getTransactionStatusColorClass,
  }),
  { field: "id", headerName: "Transaction ID", minWidth: 140 },
  { field: "accountId", headerName: "Account ID", minWidth: 120 },
  {
    field: "transactionType",
    headerName: "Type",
    minWidth: 120,
    cellClassRules: createBinaryCellClassRules({
      successValue: "CREDIT",
      errorValue: "DEBIT",
    }),
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "numericColumn",
    valueFormatter: createPriceFormatter({
      decimals: 2,
      isStaticCurrency: false,
      currencyFieldName: "currency",
    }),
  },
  { field: "currency", headerName: "Currency", minWidth: 80 },
  {
    field: "fees",
    headerName: "Fees (USD)",
    type: "numericColumn",
    valueFormatter: usd2Formatter,
  },
  { field: "description", headerName: "Description", minWidth: 200 },
  { field: "category", headerName: "Category", minWidth: 140 },
  {
    field: "timestamp",
    headerName: "Timestamp",
    minWidth: 160,
    valueFormatter: (params) => new Date(params.value).toLocaleString(),
    sort: "desc",
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 130,
    cellRenderer: createColoredPillCellRenderer<ITransaction, "status">({
      field: "status",
      getStyles: getTransactionStatusColorClass,
    }),
  },
  { field: "reference", headerName: "Reference", minWidth: 160 },
  { field: "counterparty", headerName: "Counterparty", minWidth: 180 },
];
