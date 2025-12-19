import { RowClassParams, RowStyle } from "ag-grid-community";

const getPnlColor = (pnl: number): string => {
  if (pnl > 0) {
    return "#10b981"; // success
  } else if (pnl < 0) {
    return "#ef4444"; // error
  }
  return "#9ca3af"; // gray
};

export const getHoldingsRowStyle = (
  params: RowClassParams
): RowStyle | undefined => {
  const pnl = params.data?.unrealizedGainLoss as number;
  if (pnl == null) return undefined;

  const color = getPnlColor(pnl);

  return {
    borderLeft: `4px solid ${color}`,
  };
};
