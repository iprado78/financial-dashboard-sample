import { getColorClass } from "@/styles/colors";

export function getPnlColorClass(pnl: number): string {
  if (pnl > 0) return getColorClass("success");
  else if (pnl < 0) return getColorClass("error");
  return getColorClass("neutral");
}
