import { ReactNode } from "react";
import GridLayout from "@/components/GridLayout/GridLayout";
import GridCard from "@/components/GridLayout/GridCard";
import EmptyState from "@/components/EmptyState";
import RightColumnLayout from "@/components/RightColumn/RightColumnLayout";
import LayoutItemSelector from "@/components/RightColumn/LayoutItemSelector";
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

  // Loading items (optional)
  loadingItems?: Record<string, boolean>;
  errorItems?: Record<string, string>;
  renderLoadingItem?: (item: string) => ReactNode;
  renderErrorItem?: (item: string, error: string) => ReactNode;
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
  chatHeight = "60%",
  emptyStateIcon,
  emptyStateTitle,
  emptyStateDescription,
  loadingItems = {},
  errorItems = {},
  renderLoadingItem,
  renderErrorItem,
}: RouteLayoutProps) {
  const hasLoadingItems = Object.keys(loadingItems).length > 0;
  const showEmptyState = selectedItems.length === 0 && !hasLoadingItems;

  return (
    <>
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

            {/* Loading and error states */}
            {(Object.keys(loadingItems).length > 0 ||
              Object.keys(errorItems).length > 0) && (
              <div className="space-y-4 mt-6">
                {renderLoadingItem &&
                  Object.entries(loadingItems).map(
                    ([item, isLoading]) =>
                      isLoading && (
                        <div key={item}>{renderLoadingItem(item)}</div>
                      )
                  )}

                {renderErrorItem &&
                  Object.entries(errorItems).map(
                    ([item, error]) =>
                      error && (
                        <div key={item}>{renderErrorItem(item, error)}</div>
                      )
                  )}
              </div>
            )}
          </>
        )}
      </RouteLayoutWrapper>

      <RightColumnLayout chatHeight={chatHeight}>
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
    </>
  );
}
