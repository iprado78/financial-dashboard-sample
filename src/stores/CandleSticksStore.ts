import { useLocalStorage } from "@/utils/useLocalStorage";
import { create } from "zustand";
import { GridItem } from "@/components/GridLayout/GridLayout";

type CandleStickEntry = [number, number, number, number, number];

interface SymbolData {
  symbol: string;
  data: CandleStickEntry[];
}

type State = {
  selectedSymbols: string[];
  symbolsData: SymbolData[];
  loading: Record<string, boolean>;
  errors: Record<string, string>;
  layout: GridItem[];
};

interface Actions {
  actions: {
    setSelectedSymbols: (symbols: string[]) => void;
    setSymbolsData: (data: SymbolData[]) => void;
    setLoading: (loading: Record<string, boolean>) => void;
    setErrors: (errors: Record<string, string>) => void;
    setLayout: (layout: GridItem[]) => void;
    addSymbol: (symbol: string) => void;
    addSymbolData: (symbolData: SymbolData) => void;
    removeSymbol: (symbol: string) => void;
    setSymbolLoading: (symbol: string, isLoading: boolean) => void;
    setSymbolError: (symbol: string, error: string) => void;
  };
}

const DEFAULT_SYMBOLS = ["TSLA", "AAPL", "NVDA"];
const DEFAULT_LAYOUT: GridItem[] = [
  { i: "TSLA", x: 0, y: 0, w: 12, h: 6, minW: 6, minH: 4 },
  { i: "AAPL", x: 6, y: 6, w: 6, h: 6, minW: 6, minH: 4 },
  { i: "NVDA", x: 0, y: 6, w: 6, h: 6, minW: 6, minH: 4 },
];

const getInitialState = (): Omit<State, "loading" | "errors"> => {
  const { getNestedValue } = useLocalStorage("candleSticksSettings");
  const storedSymbols = getNestedValue(["selectedSymbols"]);
  const storedLayout = getNestedValue(["layout"]);

  // If nothing is stored, default to showing the 3 default symbols
  const selectedSymbols =
    storedSymbols && storedSymbols.length > 0 ? storedSymbols : DEFAULT_SYMBOLS;
  const symbolsData = getNestedValue(["symbolsData"]) || [];
  const layout =
    storedLayout && storedLayout.length > 0 ? storedLayout : DEFAULT_LAYOUT;

  return { selectedSymbols, symbolsData, layout };
};

const useCandleSticksStore = create<State & Actions>((set) => {
  const { setNestedValue } = useLocalStorage("candleSticksSettings");
  const initialState = getInitialState();

  return {
    selectedSymbols: initialState.selectedSymbols,
    symbolsData: initialState.symbolsData,
    loading: {},
    errors: {},
    layout: initialState.layout,
    actions: {
      setSelectedSymbols: (symbols) => {
        setNestedValue(["selectedSymbols"], symbols);
        set({ selectedSymbols: symbols });
      },
      setSymbolsData: (data) => {
        setNestedValue(["symbolsData"], data);
        set({ symbolsData: data });
      },
      setLoading: (loading) => {
        set({ loading });
      },
      setErrors: (errors) => {
        set({ errors });
      },
      setLayout: (layout) => {
        setNestedValue(["layout"], layout);
        set({ layout });
      },
      addSymbol: (symbol) => {
        set((state) => {
          const newSelectedSymbols = [...state.selectedSymbols, symbol];
          setNestedValue(["selectedSymbols"], newSelectedSymbols);

          // Add new grid item for this symbol
          const newLayout = [
            ...state.layout,
            { i: symbol, x: 0, y: 0, w: 6, h: 6, minW: 6, minH: 4 },
          ];
          setNestedValue(["layout"], newLayout);

          return {
            selectedSymbols: newSelectedSymbols,
            layout: newLayout,
          };
        });
      },
      addSymbolData: (symbolData) => {
        set((state) => {
          const newSymbolsData = [...state.symbolsData, symbolData];
          setNestedValue(["symbolsData"], newSymbolsData);
          return { symbolsData: newSymbolsData };
        });
      },
      removeSymbol: (symbol) => {
        set((state) => {
          const newSelectedSymbols = state.selectedSymbols.filter(
            (s) => s !== symbol
          );
          const newSymbolsData = state.symbolsData.filter(
            (item) => item.symbol !== symbol
          );
          const newLayout = state.layout.filter((item) => item.i !== symbol);
          const newErrors = { ...state.errors };
          delete newErrors[symbol];

          setNestedValue(["selectedSymbols"], newSelectedSymbols);
          setNestedValue(["symbolsData"], newSymbolsData);
          setNestedValue(["layout"], newLayout);

          return {
            selectedSymbols: newSelectedSymbols,
            symbolsData: newSymbolsData,
            layout: newLayout,
            errors: newErrors,
          };
        });
      },
      setSymbolLoading: (symbol, isLoading) => {
        set((state) => ({
          loading: { ...state.loading, [symbol]: isLoading },
        }));
      },
      setSymbolError: (symbol, error) => {
        set((state) => ({
          errors: { ...state.errors, [symbol]: error },
        }));
      },
    },
  };
});

// MARK: State
export const useSelectedSymbols = () =>
  useCandleSticksStore((state) => state.selectedSymbols);
export const useSymbolsData = () =>
  useCandleSticksStore((state) => state.symbolsData);
export const useSymbolsLoading = () =>
  useCandleSticksStore((state) => state.loading);
export const useSymbolsErrors = () =>
  useCandleSticksStore((state) => state.errors);
export const useSymbolsLayout = () =>
  useCandleSticksStore((state) => state.layout);

// MARK: Actions
export const setSelectedSymbols = (symbols: string[]) =>
  useCandleSticksStore.getState().actions.setSelectedSymbols(symbols);
export const setSymbolsData = (data: SymbolData[]) =>
  useCandleSticksStore.getState().actions.setSymbolsData(data);
export const setSymbolsLoading = (loading: Record<string, boolean>) =>
  useCandleSticksStore.getState().actions.setLoading(loading);
export const setSymbolsErrors = (errors: Record<string, string>) =>
  useCandleSticksStore.getState().actions.setErrors(errors);
export const setSymbolsLayout = (layout: GridItem[]) =>
  useCandleSticksStore.getState().actions.setLayout(layout);
export const addSymbol = (symbol: string) =>
  useCandleSticksStore.getState().actions.addSymbol(symbol);
export const addSymbolData = (symbolData: SymbolData) =>
  useCandleSticksStore.getState().actions.addSymbolData(symbolData);
export const removeSymbol = (symbol: string) =>
  useCandleSticksStore.getState().actions.removeSymbol(symbol);
export const setSymbolLoading = (symbol: string, isLoading: boolean) =>
  useCandleSticksStore.getState().actions.setSymbolLoading(symbol, isLoading);
export const setSymbolError = (symbol: string, error: string) =>
  useCandleSticksStore.getState().actions.setSymbolError(symbol, error);

export type { SymbolData, CandleStickEntry };
