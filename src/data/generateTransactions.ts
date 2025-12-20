import {
  ITransaction,
  TRANSACTION_CATEGORIES,
  TRANSACTION_STATUSES,
  TRANSACTION_TYPES,
} from "@/services/transactions/TransactionsService";

const COUNTERPARTIES = [
  "Goldman Sachs Group Inc",
  "JPMorgan Chase & Co",
  "Morgan Stanley",
  "Bank of America",
  "Citigroup Inc",
  "Wells Fargo",
  "Credit Suisse",
  "Deutsche Bank",
  "Barclays",
  "UBS Group",
];

export function generateTransactions(): ITransaction[] {
  const transactions: ITransaction[] = [];
  const numTransactions = Math.floor(Math.random() * 51) + 50; // 50-100 transactions

  for (let i = 1; i <= numTransactions; i++) {
    const transactionType =
      TRANSACTION_TYPES[Math.floor(Math.random() * TRANSACTION_TYPES.length)];
    const status =
      TRANSACTION_STATUSES[
        Math.floor(Math.random() * TRANSACTION_STATUSES.length)
      ];
    const amount = Math.round((Math.random() * 50000 + 1000) * 100) / 100;
    const fees =
      Math.round(amount * (Math.random() * 0.005 + 0.001) * 100) / 100;

    const timestamp = new Date(
      Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
    ).toISOString();

    transactions.push({
      id: `TXN-${String(i).padStart(3, "0")}`,
      accountId: `ACC-${String(Math.floor(Math.random() * 50) + 1).padStart(
        3,
        "0"
      )}`,
      transactionType,
      amount,
      currency: "USD",
      description: `${
        transactionType === "DEBIT" ? "Wire Transfer to" : "Deposit from"
      } ${COUNTERPARTIES[Math.floor(Math.random() * COUNTERPARTIES.length)]}`,
      category:
        TRANSACTION_CATEGORIES[
          Math.floor(Math.random() * TRANSACTION_CATEGORIES.length)
        ],
      timestamp,
      status,
      reference: `REF-${String(i).padStart(3, "0")}-${timestamp
        .slice(0, 10)
        .replace(/-/g, "")}`,
      counterparty:
        COUNTERPARTIES[Math.floor(Math.random() * COUNTERPARTIES.length)],
      fees,
    });
  }

  return transactions.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}
