import { Listener, ObservableValue } from "@/utils/ObservableValue";
import { generateTrades } from "@/data/generateTrades";

export interface ITrade extends Record<string, unknown> {
  id: string;
  status: "Pending" | "Accepted" | "Rejected" | "Partial" | "Cancelled - Partial" | "Cancelled - No Fill" | "Filled";
  accountId: string;
  positionId: string;
  price: number;
  quantity: number;
  filledQty: number;
  unfilledQty: number;
  side: "Buy" | "Sell";
  ticker: string;
  trader: string;
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
    const trades = generateTrades();
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
