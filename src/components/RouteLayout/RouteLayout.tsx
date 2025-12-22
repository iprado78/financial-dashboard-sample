import { ReactNode } from "react";
import GridLayout from "@/components/GridLayout/GridLayout";
import GridCard from "@/components/GridLayout/GridCard";
import EmptyState from "@/components/EmptyState";
import RightColumnLayout from "@/components/RightColumn/RightColumnLayout";
import LayoutItemSelector from "@/components/LayoutItemSelector/LayoutItemSelector";
import { Layout } from "react-grid-layout";
import { GridItem } from "@/components/GridLayout/GridLayout";
import { RouteLayoutWrapper } from "@/components/RouteLayout/RouteLayoutWrapper";

interface RouteLayoutProps {
  title?: string;
  selectedItems: string[];
  itemsData: Array<{ id: string; content: ReactNode; title: string }>;
  layout: GridItem[];
  onLayoutChange: (newLayout: Layout[]) => void;

  // Right column props
  availableItems: string[];
  onItemSelect: (item: string) => void;
  onItemRemove: (item: string) => void;
  formatLabel: (item: string) => string;
  itemSelectorTitle: string;
  chatHeight?: string;

  // Empty state props
  emptyStateIcon: "table" | "chart";
  emptyStateTitle: string;
  emptyStateDescription: string;
}

export default function RouteLayout({
  selectedItems,
  itemsData,
  layout,
  onLayoutChange,
  availableItems,
  onItemSelect,
  onItemRemove,
  formatLabel,
  itemSelectorTitle,
  emptyStateIcon,
  emptyStateTitle,
  emptyStateDescription,
}: RouteLayoutProps) {
  const showEmptyState = selectedItems.length == 0;

  return (
    <>
      {/* Right Column - appears at top on mobile, fixed on desktop */}
      <RightColumnLayout>
        <LayoutItemSelector
          title={itemSelectorTitle}
          availableItems={availableItems}
          selectedItems={selectedItems}
          onItemSelect={onItemSelect}
          onItemRemove={onItemRemove}
          formatLabel={formatLabel}
          highlightButton={selectedItems.length === 0}
        />
      </RightColumnLayout>

      <RouteLayoutWrapper>
        {showEmptyState ? (
          <EmptyState
            icon={emptyStateIcon}
            title={emptyStateTitle}
            description={emptyStateDescription}
          />
        ) : (
          <>
            {itemsData.length > 0 && (
              <GridLayout layout={layout} onLayoutChange={onLayoutChange}>
                {itemsData.map(({ id, title, content }) => (
                  <div key={id}>
                    <GridCard title={title} onRemove={() => onItemRemove(id)}>
                      {content}
                    </GridCard>
                  </div>
                ))}
              </GridLayout>
            )}
          </>
        )}
      </RouteLayoutWrapper>
    </>
  );
}
