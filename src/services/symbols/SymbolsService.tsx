import { TradesService } from "@/services/trades/TradesService";
import { Listener, ObservableValue, Subscribe } from "@/utils/ObservableValue";

export class SymbolsService {
  #cleanUpFunctions: ReturnType<Subscribe<string[]>>[] = [];
  #symbols$ = new ObservableValue<string[]>([]);
  #tradesService: TradesService;
  constructor(tradesService: TradesService) {
    this.#tradesService = tradesService;
  }

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
