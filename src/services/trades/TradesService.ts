import { Listener, ObservableValue } from "@/utils/ObservableValue";
import tradesData from "@/data/homePage/trades.json";

export interface ITrade {
  id: string;
  status: "Pending" | "Filled" | "Cancelled";
  accountId: string;
  positionId: string;
  price: number;
  quantity: number;
  side: "Buy" | "Sell";
  ticker: string;
  orderTime: string;
  lastUpdate: string;
  currency: "USD" | "EUR" | "GBP" | "JPY";
}

export class TradesService {
  #trades$: ObservableValue<ITrade[]>;

  constructor() {
    this.#trades$ = new ObservableValue<ITrade[]>([]);
  }

  loadSnapshot = async () => {
    const trades = await Promise.resolve(tradesData as ITrade[]);
    this.#trades$.next(trades);
  };

  getTrades = () => {
    return this.#trades$.getValue();
  };

  addTrade = (trade: ITrade) => {
    const currentTrades = this.#trades$.getValue();
    this.#trades$.next([...currentTrades, trade]);
  };

  subscribeToTrades = (listener: Listener<ITrade[]>): (() => void) => {
    return this.#trades$.subscribe(listener);
  };
}
