import { Listener, ObservableValue } from "@/utils/ObservableValue";
import { generateTransactions } from "@/data/generateTransactions";

export const TRANSACTION_TYPES = ["DEBIT", "CREDIT"] as const; //

export type TransactionType = (typeof TRANSACTION_TYPES)[number];

export const TRANSACTION_STATUSES = [
  "COMPLETED",
  "PENDING",
  "FAILED",
  "CANCELLED",
] as const;

export type TransactionStatus = (typeof TRANSACTION_STATUSES)[number];

export const TRANSACTION_CATEGORIES = [
  "Investment",
  "Trading",
  "Settlement",
  "Collateral",
  "Margin",
  "Fee Payment",
  "Dividend",
] as const;

export type TransactionCategory = (typeof TRANSACTION_CATEGORIES)[number];

export interface ITransaction extends Record<string, unknown> {
  id: string;
  accountId: string;
  transactionType: TransactionType;
  amount: number;
  currency: string;
  description: string;
  category: TransactionCategory;
  timestamp: string;
  status: TransactionStatus;
  reference: string;
  counterparty: string;
  fees: number;
}

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

  subscribeToTransactions = (
    listener: Listener<ITransaction[]>
  ): (() => void) => {
    return this.#transactions$.subscribe(listener);
  };
}
