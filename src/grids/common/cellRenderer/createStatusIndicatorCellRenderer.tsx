import {
  ColorClassReturnType,
  extractBaseColorClass,
  statusColors,
} from "@/styles/colors";
import { ICellRendererParams } from "ag-grid-community";

interface StatusIndicatorConfig<
  TData extends Record<string, unknown>,
  K extends keyof TData
> {
  field: K;
  getColor: (data: TData[K]) => string;
}

export function createStatusIndicatorCellRenderer<
  TData extends Record<string, unknown>,
  K extends keyof TData
>(config: StatusIndicatorConfig<TData, K>) {
  const { getColor } = config;

  return (params: ICellRendererParams<TData>) => {
    if (!params.data) return null;
    const { field } = config;
    const fieldValue = params.data[field];
    const fullColorClass = getColor(fieldValue) as ColorClassReturnType<
      keyof typeof statusColors
    >;
    const baseColorClass = extractBaseColorClass(fullColorClass);

    return <div className={`h-full w-full ${baseColorClass}`} />;
  };
}
