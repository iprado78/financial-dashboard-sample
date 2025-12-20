import { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  colorSchemeDarkBlue,
  ColDef,
  GridOptions,
  RowClassParams,
  RowStyle,
  themeQuartz,
} from "ag-grid-community";
import { useIsDarkMode } from "@/stores/DarkModeStore";
import "./Table.css";
interface TableProps<T extends Record<string, unknown>> {
  data: T[];
  columnDefs: ColDef[];
  rowIdField: keyof T | ((record: T) => string);
  height?: string;
  width?: string;
  paginationPageSize?: number;
  getRowStyle?: (params: RowClassParams) => RowStyle | undefined;
}

const defaultColDef = {
  minWidth: 150,
  flex: 1,
  filter: true,
  floatingFilter: true,
  resizable: true,
  sortable: true,
};

export default function Table<T extends Record<string, unknown>>({
  data,
  columnDefs,
  rowIdField,
  height,
  width = "100%",
  paginationPageSize = 50,
  getRowStyle,
}: TableProps<T>) {
  const gridRef = useRef<AgGridReact>(null);
  const isDarkMode = useIsDarkMode();
  const theme = isDarkMode
    ? themeQuartz.withPart(colorSchemeDarkBlue)
    : themeQuartz;

  const gridOptions: GridOptions = {
    theme: theme,
    columnDefs: columnDefs,
    defaultColDef: defaultColDef,
    rowData: data,
    getRowId: (params) => {
      if (typeof rowIdField === "function") {
        return rowIdField(params.data);
      } else {
        return params.data[rowIdField];
      }
    },
    getRowStyle: getRowStyle,
    pagination: true,
    paginationPageSize: paginationPageSize,
    paginationPageSizeSelector: [50, 100, 200, 500],
  };

  return (
    <div
      style={{ width: width || "100%" }}
      className={height ? "flex flex-col" : "flex flex-col h-full"}
      {...(height && { style: { width: width || "100%", height } })}
    >
      <div className="flex-1 min-h-0">
        <AgGridReact ref={gridRef} {...gridOptions} />
      </div>
    </div>
  );
}
