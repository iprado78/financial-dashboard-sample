import Table from "@/components/Table/Table";
import { CREDIT_COLUMN_DEFS } from "@/grids/credit/creditColumnDefs";
import { creditService } from "@/services/singletonServices";
import { useSyncExternalStore } from "react";

export const CreditTable = () => {
  const credits = useSyncExternalStore(
    creditService.subscribeToCredits,
    creditService.getCredits,
    creditService.getCredits
  );
  return (
    <Table
      rowIdField={"counterpartyId"}
      data={credits}
      columnDefs={CREDIT_COLUMN_DEFS}
    />
  );
};
