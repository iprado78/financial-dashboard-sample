import { ICellRendererParams } from "ag-grid-community";

const getPnlColorClass = (pnl: number) => {
  if (pnl > 0) {
    return "bg-success";
  } else if (pnl < 0) {
    return "bg-error";
  }
  return "bg-gray-400 dark:bg-gray-600";
};

export function PnlStatusIndicatorCellRenderer(params: ICellRendererParams) {
  const pnl = params.data?.unrealizedGainLoss as number;
  if (pnl == null) return null;

  const colorClass = getPnlColorClass(pnl);

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className={`h-full w-1 ${colorClass}`} />
    </div>
  );
}
