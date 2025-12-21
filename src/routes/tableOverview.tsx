import RouteLayout from "@/components/RouteLayout/RouteLayout";
import { HoldingsTable } from "@/grids/holdings/holdingsTable";
import { CreditTable } from "@/grids/credit/creditTable";
import { RiskTable } from "@/grids/risk/riskTable";
import {
  useSelectedTables,
  useTableLayout,
  addTable,
  removeTable,
  setTableLayout,
} from "@/stores/TableOverviewStore";
import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "react-grid-layout";
import { TransactionsTable } from "@/grids/transactions/transactionsTable";

export const Route = createFileRoute("/tableOverview")({
  component: TableOverviewRoute,
});

const AVAILABLE_TABLES = ["credit", "holdings", "risk", "transactions"];

const TABLE_COMPONENTS: Record<string, React.ReactNode> = {
  holdings: <HoldingsTable />,
  transactions: <TransactionsTable />,
  credit: <CreditTable />,
  risk: <RiskTable />,
};

function TableOverviewRoute() {
  const selectedTables = useSelectedTables();
  const layout = useTableLayout();

  const handleTableSelect = (tableName: string) => {
    if (selectedTables.includes(tableName)) return;
    addTable(tableName);
  };

  const handleTableRemove = (tableName: string) => {
    removeTable(tableName);
  };

  const handleLayoutChange = (newLayout: Layout[]) => {
    setTableLayout(newLayout);
  };

  const itemsData = selectedTables.map((tableName) => ({
    id: tableName,
    title: tableName.charAt(0).toUpperCase() + tableName.slice(1),
    content: TABLE_COMPONENTS[tableName],
  }));

  return (
    <RouteLayout
      title="Table Overview"
      selectedItems={selectedTables}
      itemsData={itemsData}
      layout={layout}
      onLayoutChange={handleLayoutChange}
      availableItems={AVAILABLE_TABLES}
      onItemSelect={handleTableSelect}
      onItemRemove={handleTableRemove}
      formatLabel={(item) => item.charAt(0).toUpperCase() + item.slice(1)}
      itemSelectorTitle="Tables"
      emptyStateIcon="table"
      emptyStateTitle="No Tables Selected"
      emptyStateDescription="Get started by adding tables to view your data."
    />
  );
}
