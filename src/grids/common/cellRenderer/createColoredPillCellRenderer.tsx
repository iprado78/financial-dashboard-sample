import { ICellRendererParams } from "ag-grid-community";

interface ColoredPillConfig<
  TData extends Record<string, unknown>,
  K extends keyof TData
> {
  field: K;
  getStyles: (value: TData[K]) => string;
}

export function createColoredPillCellRenderer<
  TData extends Record<string, unknown>,
  K extends keyof TData
>(config: ColoredPillConfig<TData, K>) {
  const { field, getStyles } = config;

  return function (params: ICellRendererParams<TData>) {
    if (!params.data) return null;
    const fieldValue = params.data[field];
    if (typeof fieldValue != "string") return null;
    const styleClasses = getStyles(fieldValue);
    return (
      <div className="flex items-center h-full">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${styleClasses}`}
        >
          {fieldValue}
        </span>
      </div>
    );
  };
}
