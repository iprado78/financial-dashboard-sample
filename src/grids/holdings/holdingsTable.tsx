import Table from "@/components/Table/Table";
import { HOLDINGS_COLUMN_DEFS } from "@/grids/holdings/holdingsColumnDefs";
import { IHolding } from "@/services/holdings/HoldingsService";
import { holdingsService } from "@/services/singletonServices";
import { useSyncExternalStore } from "react";

export const HoldingsTable = () => {
  const holdings = useSyncExternalStore(
    holdingsService.subscribeToHoldings,
    holdingsService.getHoldings,
    holdingsService.getHoldings
  );
  return (
    <Table
      rowIdField={(holding: IHolding) =>
        `${holding.portfolioId}-${holding.symbol}`
      }
      data={holdings}
      columnDefs={HOLDINGS_COLUMN_DEFS}
    />
  );
};
