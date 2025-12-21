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
import { useSyncExternalStore, useEffect, useRef } from "react";
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
  const hasLoadedDefaults = useRef(false);

  // Load data for selected symbols that don't have data yet
  useEffect(() => {
    if (hasLoadedDefaults.current) return;

    const symbolsWithoutData = selectedSymbols.filter(
      (symbol) => !symbolsData.some((data) => data.symbol === symbol)
    );

    if (symbolsWithoutData.length > 0) {
      hasLoadedDefaults.current = true;
      symbolsWithoutData.forEach(async (symbol) => {
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
      });
    }
  }, [selectedSymbols, symbolsData]);

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

  const itemsData = selectedSymbols.map((symbol) => {
    const symbolData = symbolsData.find((d) => d.symbol === symbol);
    const isLoading = loading[symbol];
    const error = errors[symbol];

    let content: React.ReactNode;

    if (error) {
      content = (
        <div className="w-full p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-red-600 dark:text-red-400">
            {symbol.toUpperCase()}: {error}
          </p>
        </div>
      );
    } else if (isLoading || !symbolData) {
      content = (
        <div className="w-full p-8 text-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            Loading {symbol.toUpperCase()}...
          </p>
        </div>
      );
    } else {
      content = <CandleStick title="" data={symbolData.data} />;
    }

    return {
      id: symbol,
      title: symbol.toUpperCase(),
      content,
    };
  });

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
    />
  );
}
