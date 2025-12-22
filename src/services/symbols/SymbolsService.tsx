import { SYMBOLS_UNIVERSE } from "@/data/symbolsUniverse";
import { TradesService } from "@/services/trades/TradesService";
import { Listener, ObservableValue, Subscribe } from "@/utils/ObservableValue";

export class SymbolsService {
  #cleanUpFunctions: ReturnType<Subscribe<string[]>>[] = [];
  #symbols$ = new ObservableValue<string[]>([]);
  #tradesService: TradesService;

  constructor(tradesService: TradesService) {
    this.#tradesService = tradesService;
  }

  loadSnapshot = async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    const symbols = SYMBOLS_UNIVERSE.map((s) => s.ticker);
    this.#symbols$.next(symbols.sort((a, b) => a.localeCompare(b)));
  };

  init() {
    const func = this.#tradesService.subscribeToTrades((trades) => {
      const symbols = Array.from(new Set(trades.map((trade) => trade.ticker)));
      this.#symbols$.next(symbols);
    });
    this.#cleanUpFunctions.push(func);
  }

  cleanup() {
    this.#cleanUpFunctions.forEach((func) => func());
  }

  getSymbols = () => {
    return this.#symbols$.getValue();
  };

  subscribeToSymbols = (listener: Listener<string[]>): (() => void) => {
    return this.#symbols$.subscribe(listener);
  };
}
