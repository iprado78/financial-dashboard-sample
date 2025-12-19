import Table from "@/components/Table";
import creditData from "@/data/tableOverview/credit.json";
import holdingsData from "@/data/tableOverview/holdings.json";
import riskData from "@/data/tableOverview/risk.json";
import transactionsData from "@/data/tableOverview/transactions.json";
import { CREDIT_COLUMN_DEFS } from "@/grids/credit/creditColumnDefs";
import { HOLDINGS_COLUMN_DEFS } from "@/grids/holdings/holdingsColumnDefs";
import { RISK_COLUMN_DEFS } from "@/grids/risk/riskColumnDefs";
import { TRANSACTIONS_COLUMN_DEFS } from "@/grids/transactions/transactionsColumnDefs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tableOverview")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6">Table Overview</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="w-full">
          <Table
            title="Credit"
            data={creditData}
            columnDefs={CREDIT_COLUMN_DEFS}
            tableName="credit"
            height="500px"
          />
        </div>
        <div className="w-full">
          <Table
            title="Holdings"
            data={holdingsData}
            columnDefs={HOLDINGS_COLUMN_DEFS}
            tableName="holdings"
            height="500px"
          />
        </div>
        <div className="w-full">
          <Table
            title="Risk"
            data={riskData}
            columnDefs={RISK_COLUMN_DEFS}
            tableName="risk"
            height="500px"
          />
        </div>
        <div className="w-full">
          <Table
            title="Transactions"
            data={transactionsData}
            columnDefs={TRANSACTIONS_COLUMN_DEFS}
            tableName="transactions"
            height="500px"
          />
        </div>
      </div>
    </div>
  );
}
