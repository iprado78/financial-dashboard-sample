import Table from "@/components/Table/Table";
import { TRANSACTIONS_COLUMN_DEFS } from "@/grids/transactions/transactionsColumnDefs";
import { transactionsService } from "@/services/singletonServices";
import { useSyncExternalStore } from "react";

export const TransactionsTable = () => {
  const transactions = useSyncExternalStore(
    transactionsService.subscribeToTransactions,
    transactionsService.getTransactions,
    transactionsService.getTransactions
  );
  return (
    <Table
      rowIdField={"id"}
      data={transactions}
      columnDefs={TRANSACTIONS_COLUMN_DEFS}
    />
  );
};
