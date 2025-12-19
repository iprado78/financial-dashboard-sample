import { ICellRendererParams } from "ag-grid-community";
import { IRisk } from "@/data/generateRisk";

const getRiskTypeStyles = (riskType: IRisk["riskType"]): string => {
  switch (riskType) {
    case "Market Risk":
      return "bg-info-light text-info-dark dark:bg-info-dark dark:text-info-light";
    case "Credit Risk":
      return "bg-warning-light text-warning-dark dark:bg-warning-dark dark:text-warning-light";
    case "Operational Risk":
      return "bg-error-light text-error-dark dark:bg-error-dark dark:text-error-light";
    case "Liquidity Risk":
      return "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    default:
      return "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
  }
};

export function RiskTypeCellRenderer(params: ICellRendererParams) {
  const riskType = params.value as IRisk["riskType"];
  if (!riskType) return null;

  const styleClasses = getRiskTypeStyles(riskType);

  return (
    <div className="flex items-center h-full">
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium ${styleClasses}`}
      >
        {riskType}
      </span>
    </div>
  );
}
