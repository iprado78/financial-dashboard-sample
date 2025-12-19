import { ICellRendererParams } from "ag-grid-community";

interface StatusIndicatorConfig {
  getColor: (data: any) => string;
}

export function createStatusIndicatorCellRenderer(config: StatusIndicatorConfig) {
  const { getColor } = config;

  return (params: ICellRendererParams) => {
    if (!params.data) return null;

    const color = getColor(params.data);

    return (
      <div className="flex items-center h-full">
        <div
          className="h-full w-1 rounded-sm"
          style={{ backgroundColor: color }}
        />
      </div>
    );
  };
}
