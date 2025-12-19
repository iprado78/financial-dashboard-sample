import CandleStick from "@/components/CandleStick";
import { CandlestickService } from "@/services/candleStick/CandlestickService";
import { symbolsService } from "@/services/singletonServices";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useSyncExternalStore } from "react";

export const Route = createFileRoute("/candleSticks")({
  component: RouteComponent,
});

type CandleStickEntry = [number, number, number, number, number];

interface SymbolData {
  symbol: string;
  data: CandleStickEntry[];
}

function RouteComponent() {
  const availableSymbols = useSyncExternalStore(
    symbolsService.subscribeToSymbols,
    symbolsService.getSymbols,
    symbolsService.getSymbols
  );

  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
  const [symbolsData, setSymbolsData] = useState<SymbolData[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSymbolSelect = async (symbol: string) => {
    if (selectedSymbols.includes(symbol)) return;

    setSelectedSymbols((prev) => [...prev, symbol]);
    setLoading((prev) => ({ ...prev, [symbol]: true }));
    setErrors((prev) => ({ ...prev, [symbol]: "" }));

    try {
      const data = await CandlestickService.getCandlestickData(symbol);
      setSymbolsData((prev) => [...prev, { symbol, data }]);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [symbol]:
          error instanceof Error ? error.message : "Failed to load data",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [symbol]: false }));
    }
  };

  const handleRemoveSymbol = (symbol: string) => {
    setSelectedSymbols((prev) => prev.filter((s) => s !== symbol));
    setSymbolsData((prev) => prev.filter((item) => item.symbol !== symbol));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[symbol];
      return newErrors;
    });
  };

  const availableOptions = availableSymbols.filter(
    (symbol) => !selectedSymbols.includes(symbol)
  );

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6">Candlestick Charts</h1>

      <div className="mb-6 space-y-4">
        <Listbox value="" onChange={handleSymbolSelect}>
          <div className="relative">
            <ListboxButton className="relative w-full max-w-md cursor-pointer rounded-lg bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-left shadow-md border border-gray-300 dark:border-gray-600 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300">
              <span className="block truncate">
                Select symbols to display...
              </span>
            </ListboxButton>
            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full max-w-md overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {availableOptions.length > 0 ? (
                availableOptions.map((symbol) => (
                  <ListboxOption
                    key={symbol}
                    value={symbol}
                    className="relative cursor-pointer select-none py-2 px-4 data-[focus]:bg-blue-100 data-[focus]:dark:bg-blue-900 data-[focus]:text-blue-900 data-[focus]:dark:text-blue-100 text-gray-900 dark:text-gray-100"
                  >
                    {symbol.toUpperCase()}
                  </ListboxOption>
                ))
              ) : (
                <div className="py-2 px-4 text-gray-500 dark:text-gray-400">
                  No symbols available
                </div>
              )}
            </ListboxOptions>
          </div>
        </Listbox>

        {selectedSymbols.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedSymbols.map((symbol) => (
              <div
                key={symbol}
                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-full"
              >
                <span className="font-medium">{symbol.toUpperCase()}</span>
                <button
                  onClick={() => handleRemoveSymbol(symbol)}
                  className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5 transition-colors"
                  aria-label={`Remove ${symbol}`}
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-6">
        {symbolsData.map(({ symbol, data }) => (
          <div key={symbol} className="w-full">
            <CandleStick
              title={symbol.toUpperCase()}
              data={data}
              height={500}
            />
          </div>
        ))}

        {Object.entries(loading).map(
          ([symbol, isLoading]) =>
            isLoading && (
              <div key={symbol} className="w-full p-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Loading {symbol.toUpperCase()}...
                </p>
              </div>
            )
        )}

        {Object.entries(errors).map(
          ([symbol, error]) =>
            error && (
              <div
                key={symbol}
                className="w-full p-4 bg-red-50 dark:bg-red-900/20 rounded-lg"
              >
                <p className="text-red-600 dark:text-red-400">
                  {symbol.toUpperCase()}: {error}
                </p>
              </div>
            )
        )}
      </div>
    </div>
  );
}
