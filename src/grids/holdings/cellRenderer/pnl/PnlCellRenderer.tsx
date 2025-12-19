import { ICellRendererParams } from "ag-grid-community";

const getPnlStyles = (pnl: number): string => {
  if (pnl > 0) {
    return "bg-success-light text-success-dark dark:bg-success-dark dark:text-success-light";
  } else if (pnl < 0) {
    return "bg-error-light text-error-dark dark:bg-error-dark dark:text-error-light";
  }
  return "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
};

export function PnlCellRenderer(params: ICellRendererParams) {
  const pnl = params.value as number;
  if (pnl == null) return null;

  const styleClasses = getPnlStyles(pnl);
  const formattedValue = `$${pnl.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <div className="flex items-center h-full">
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium ${styleClasses}`}
      >
        {formattedValue}
      </span>
    </div>
  );
}
