import Table from "@/components/Table/Table";
import { TRADES_COLUMN_DEFS } from "@/grids/trades/tradesColumnDefs";
import { getTradesRowStyle } from "@/grids/trades/getTradesRowStyle";
import { tradesService } from "@/services/singletonServices";
import { useSyncExternalStore } from "react";

export const TradesTable = () => {
  const trades = useSyncExternalStore(
    tradesService.subscribeToTrades,
    tradesService.getTrades,
    tradesService.getTrades
  );
  return (
    <Table
      data={trades}
      columnDefs={TRADES_COLUMN_DEFS}
      getRowStyle={getTradesRowStyle}
    />
  );
};
