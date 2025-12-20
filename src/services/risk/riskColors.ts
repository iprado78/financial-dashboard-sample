import { getColorClass } from "@/styles/colors";
import { RiskType } from "./RiskService";

export function getRiskTypeColorClass(riskType: RiskType): string {
  switch (riskType) {
    case "Market Risk":
      return getColorClass("info");
    case "Credit Risk":
      return getColorClass("warning");
    case "Operational Risk":
      return getColorClass("error");
    case "Liquidity Risk":
      return getColorClass("success");
    default:
      return getColorClass("neutral");
  }
}
