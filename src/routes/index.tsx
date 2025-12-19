import { TradesTable } from "@/grids/trades/tradesTable";
import GridLayout, { GridItem } from "@/components/GridLayout/GridLayout";
import GridCard from "@/components/GridLayout/GridCard";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "react-grid-layout";
import { RouteLayoutWrapper } from "@/components/RouteLayout/RouteLayoutWrapper";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const initialLayout: GridItem[] = [
  { i: "trades", x: 0, y: 0, w: 12, h: 6, minW: 6, minH: 4 },
];

function RouteComponent() {
  const [layout, setLayout] = useState<GridItem[]>(initialLayout);

  const handleLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout as GridItem[]);
  };

  return (
    <RouteLayoutWrapper>
      <GridLayout layout={layout} onLayoutChange={handleLayoutChange}>
        <div key="trades">
          <GridCard title="Trades">
            <TradesTable />
          </GridCard>
        </div>
      </GridLayout>
    </RouteLayoutWrapper>
  );
}
