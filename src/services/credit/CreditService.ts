import { Listener, ObservableValue } from "@/utils/ObservableValue";
import { generateCredit, ICredit } from "@/data/generateCredit";

export class CreditService {
  #credits$: ObservableValue<ICredit[]>;

  constructor() {
    this.#credits$ = new ObservableValue<ICredit[]>([]);
  }

  loadSnapshot = async () => {
    const credits = generateCredit();
    this.#credits$.next(credits);
  };

  getCredits = () => {
    return this.#credits$.getValue();
  };

  addCredit = (credit: ICredit) => {
    const currentCredits = this.#credits$.getValue();
    this.#credits$.next([...currentCredits, credit]);
  };

  subscribeToCredits = (listener: Listener<ICredit[]>): (() => void) => {
    return this.#credits$.subscribe(listener);
  };
}
