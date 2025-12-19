import { Listener, ObservableValue } from "@/utils/ObservableValue";
import { generateHoldings, IHolding } from "@/data/generateHoldings";

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
