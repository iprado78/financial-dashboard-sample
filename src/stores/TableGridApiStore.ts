import { GridApi } from "ag-grid-community";

type TableName = "trades" | "credit" | "holdings" | "risk" | "transactions";

// Simple registry for ag-grid APIs
const tableGridApis: Map<TableName, GridApi> = new Map();

export function registerTableGridApi(tableName: TableName, gridApi: GridApi) {
  tableGridApis.set(tableName, gridApi);
}

export function unregisterTableGridApi(tableName: TableName) {
  tableGridApis.delete(tableName);
}

export function getTableGridApi(tableName: TableName): GridApi | undefined {
  return tableGridApis.get(tableName);
}
