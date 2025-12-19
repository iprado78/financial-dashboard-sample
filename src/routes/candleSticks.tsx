import CandleStick from "@/components/CandleStick";
import RouteLayout from "@/components/RouteLayout/RouteLayout";
import { CandlestickService } from "@/services/candleStick/CandlestickService";
import { symbolsService } from "@/services/singletonServices";
import {
  useSelectedSymbols,
  useSymbolsData,
  useSymbolsLoading,
  useSymbolsErrors,
  useSymbolsLayout,
  addSymbol,
  addSymbolData,
  removeSymbol,
  setSymbolsLayout,
  setSymbolLoading,
  setSymbolError,
} from "@/stores/CandleSticksStore";
import { createFileRoute } from "@tanstack/react-router";
import { useSyncExternalStore } from "react";
import { Layout } from "react-grid-layout";

export const Route = createFileRoute("/candleSticks")({
  component: RouteComponent,
});

function RouteComponent() {
  const availableSymbols = useSyncExternalStore(
    symbolsService.subscribeToSymbols,
    symbolsService.getSymbols,
    symbolsService.getSymbols
  );

  const selectedSymbols = useSelectedSymbols();
  const symbolsData = useSymbolsData();
  const loading = useSymbolsLoading();
  const errors = useSymbolsErrors();
  const layout = useSymbolsLayout();

  const handleSymbolSelect = async (symbol: string) => {
    if (selectedSymbols.includes(symbol)) return;

    addSymbol(symbol);
    setSymbolLoading(symbol, true);
    setSymbolError(symbol, "");

    try {
      const data = await CandlestickService.getCandlestickData(symbol);
      addSymbolData({ symbol, data });
    } catch (error) {
      setSymbolError(
        symbol,
        error instanceof Error ? error.message : "Failed to load data"
      );
    } finally {
      setSymbolLoading(symbol, false);
    }
  };

  const handleRemoveSymbol = (symbol: string) => {
    removeSymbol(symbol);
  };

  const handleLayoutChange = (newLayout: Layout[]) => {
    setSymbolsLayout(newLayout);
  };

  const itemsData = symbolsData.map(({ symbol, data }) => ({
    id: symbol,
    title: symbol.toUpperCase(),
    content: <CandleStick title="" data={data} />,
  }));

  return (
    <RouteLayout
      title="Candlestick Charts"
      selectedItems={selectedSymbols}
      itemsData={itemsData}
      layout={layout}
      onLayoutChange={handleLayoutChange}
      availableItems={availableSymbols}
      onItemSelect={handleSymbolSelect}
      onItemRemove={handleRemoveSymbol}
      formatLabel={(symbol) => symbol.toUpperCase()}
      itemSelectorTitle="Symbols"
      emptyStateIcon="chart"
      emptyStateTitle="No Charts Selected"
      emptyStateDescription="Get started by adding candlestick charts for your favorite symbols."
      loadingItems={loading}
      errorItems={errors}
      renderLoadingItem={(symbol) => (
        <div className="w-full p-8 text-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            Loading {symbol.toUpperCase()}...
          </p>
        </div>
      )}
      renderErrorItem={(symbol, error) => (
        <div className="w-full p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-red-600 dark:text-red-400">
            {symbol.toUpperCase()}: {error}
          </p>
        </div>
      )}
    />
  );
}
