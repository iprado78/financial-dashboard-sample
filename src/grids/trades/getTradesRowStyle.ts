import { RowClassParams, RowStyle } from "ag-grid-community";
import { getStatusColor, StatusType } from "./cellRenderer/status/statusColors";

export const getTradesRowStyle = (
  params: RowClassParams
): RowStyle | undefined => {
  const status = params.data?.status as StatusType;
  if (!status) return undefined;

  const color = getStatusColor(status);

  return {
    borderLeft: `4px solid ${color}`,
  };
};
