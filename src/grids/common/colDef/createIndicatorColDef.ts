import { ColDef } from "ag-grid-community";
import { createStatusIndicatorCellRenderer } from "../cellRenderer/createStatusIndicatorCellRenderer";

interface StatusIndicatorColumnConfig<
  TData extends Record<string, unknown>,
  K extends keyof TData
> {
  field: K;
  getColor: (value: TData[K]) => string;
}

export function createIndicatorColDef<
  TData extends Record<string, unknown>,
  K extends keyof TData
>(config: StatusIndicatorColumnConfig<TData, K>): ColDef<TData> {
  const { field, getColor } = config;

  return {
    colId: "statusIndicator",
    headerName: "",
    minWidth: 7,
    maxWidth: 7,
    width: 7,
    cellRenderer: createStatusIndicatorCellRenderer<TData, K>({
      field,
      getColor,
    }),
    sortable: false,
    filter: false,
    resizable: false,
    suppressSizeToFit: true,
    pinned: "left",
    lockPinned: true,
    cellClass: "!p-0",
  };
}
