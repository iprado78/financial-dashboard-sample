import { ICellRendererParams } from "ag-grid-community";
import { getStatusStyles, StatusType } from "./statusColors";

export function StatusCellRenderer(params: ICellRendererParams) {
  const status = params.value as StatusType;
  if (!status) return null;

  const styleClasses = getStatusStyles(status);

  return (
    <div className="flex items-center h-full">
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium ${styleClasses}`}
      >
        {status}
      </span>
    </div>
  );
}
