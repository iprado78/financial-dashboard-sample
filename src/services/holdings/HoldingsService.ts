import { Listener, ObservableValue } from "@/utils/ObservableValue";
import { generateHoldings } from "@/data/generateHoldings";

export interface IHolding extends Record<string, unknown> {
  id: string;
  portfolioId: string;
  symbol: string;
  quantity: number;
  marketValue: number;
  costBasis: number;
  unrealizedGainLoss: number;
  weight: number;
  sector: string;
}

export class HoldingsService {
  #holdings$: ObservableValue<IHolding[]>;

  constructor() {
    this.#holdings$ = new ObservableValue<IHolding[]>([]);
  }

  loadSnapshot = async () => {
    const holdings = generateHoldings();
    this.#holdings$.next(holdings);
  };

  getHoldings = () => {
    return this.#holdings$.getValue();
  };

  addHolding = (holding: IHolding) => {
    const currentHoldings = this.#holdings$.getValue();
    this.#holdings$.next([...currentHoldings, holding]);
  };

  subscribeToHoldings = (listener: Listener<IHolding[]>): (() => void) => {
    return this.#holdings$.subscribe(listener);
  };
}
