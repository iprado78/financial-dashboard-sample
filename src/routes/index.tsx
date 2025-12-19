import { TradesTable } from "@/grids/trades/tradesTable";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6">Trade Table</h1>
      <div className="w-full">
        <TradesTable />
      </div>
    </div>
  );
}
