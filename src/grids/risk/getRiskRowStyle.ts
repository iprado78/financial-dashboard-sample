import { RowClassParams, RowStyle } from "ag-grid-community";
import { IRisk } from "@/data/generateRisk";

const getRiskTypeColor = (riskType: IRisk["riskType"]): string => {
  switch (riskType) {
    case "Market Risk":
      return "#3b82f6"; // info
    case "Credit Risk":
      return "#f59e0b"; // warning
    case "Operational Risk":
      return "#ef4444"; // error
    case "Liquidity Risk":
      return "#9ca3af"; // gray
    default:
      return "#9ca3af";
  }
};

export const getRiskRowStyle = (
  params: RowClassParams
): RowStyle | undefined => {
  const riskType = params.data?.riskType as IRisk["riskType"];
  if (!riskType) return undefined;

  const color = getRiskTypeColor(riskType);

  return {
    borderLeft: `4px solid ${color}`,
  };
};
