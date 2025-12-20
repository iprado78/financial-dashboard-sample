import { Listener, ObservableValue } from "@/utils/ObservableValue";
import { generateTrades } from "@/data/generateTrades";

export const TRADE_STATUSES = [
  "PENDING",
  "ACCEPTED",
  "PARTIAL",
  "CANCELLED",
  "FILLED",
] as const;

export type TradeStatus = (typeof TRADE_STATUSES)[number];

export const TRADE_SIDES = ["BUY", "SELL"] as const;

export type TradeSide = (typeof TRADE_SIDES)[number];

export const TRADE_CURRENCIES = ["USD", "EUR", "GBP", "JPY"] as const;

export type TradeCurrency = (typeof TRADE_CURRENCIES)[number];

export interface ITrade extends Record<string, unknown> {
  id: string;
  status: TradeStatus;
  accountId: string;
  positionId: string;
  price: number;
  quantity: number;
  filledQty: number;
  unfilledQty: number;
  side: TradeSide;
  ticker: string;
  trader: string;
  orderTime: string;
  lastUpdate: string;
  currency: TradeCurrency;
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
