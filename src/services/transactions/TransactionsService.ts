import { Listener, ObservableValue } from "@/utils/ObservableValue";
import { generateTransactions, ITransaction } from "@/data/generateTransactions";

export class TransactionsService {
  #transactions$: ObservableValue<ITransaction[]>;

  constructor() {
    this.#transactions$ = new ObservableValue<ITransaction[]>([]);
  }

  loadSnapshot = async () => {
    const transactions = generateTransactions();
    this.#transactions$.next(transactions);
  };

  getTransactions = () => {
    return this.#transactions$.getValue();
  };

  addTransaction = (transaction: ITransaction) => {
    const currentTransactions = this.#transactions$.getValue();
    this.#transactions$.next([...currentTransactions, transaction]);
  };

  subscribeToTransactions = (listener: Listener<ITransaction[]>): (() => void) => {
    return this.#transactions$.subscribe(listener);
  };
}
