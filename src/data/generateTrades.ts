import { SYMBOLS_UNIVERSE } from "./symbolsUniverse";
import { ITrade } from "@/services/trades/TradesService";

export function generateTrades(): ITrade[] {
  const tickers = SYMBOLS_UNIVERSE.map(s => s.ticker);
  const statuses: ITrade['status'][] = [
    "Pending",
    "Accepted",
    "Rejected",
    "Partial",
    "Cancelled - Partial",
    "Cancelled - No Fill",
    "Filled"
  ];
  const sides: ITrade['side'][] = ["Buy", "Sell"];
  const currencies: ITrade['currency'][] = ["USD", "EUR", "GBP", "JPY"];

  // Realistic Active Directory-style usernames
  const traders: string[] = [
    "jsmith",
    "mjohnson",
    "rwilliams",
    "dbrown",
    "ljones",
    "kmiller",
    "pdavis",
    "sgarcia",
    "trodriguez",
    "awilson",
    "mmartinez",
    "janderson",
    "ctaylor",
    "rthomas",
    "jhernandez",
    "mmoore",
    "pmartin",
    "djackson",
    "sthompson",
    "kwhite"
  ];

  const trades: ITrade[] = [];
  let tradeIdCounter = 1;

  // Randomly select 60-80 tickers to have orders
  const numTickersWithOrders = Math.floor(Math.random() * 21) + 60; // 60-80
  const shuffledTickers = [...tickers].sort(() => Math.random() - 0.5);
  const tickersWithOrders = shuffledTickers.slice(0, numTickersWithOrders);

  tickersWithOrders.forEach(ticker => {
    // Each ticker can have 1-5 orders
    const numOrders = Math.floor(Math.random() * 5) + 1;

    for (let i = 0; i < numOrders; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      // Generate quantity from 1 to 200,000 with exponential distribution
      // This gives us more variety: some small orders, some massive ones
      const quantity = Math.floor(Math.random() * Math.random() * 200000) + 1; // 1-200000

      // Calculate filled and unfilled quantities based on status
      let filledQty = 0;
      let unfilledQty = quantity;

      switch (status) {
        case "Filled":
          filledQty = quantity;
          unfilledQty = 0;
          break;
        case "Partial":
          filledQty = Math.floor(quantity * (Math.random() * 0.6 + 0.2)); // 20-80% filled
          unfilledQty = quantity - filledQty;
          break;
        case "Cancelled - Partial":
          filledQty = Math.floor(quantity * (Math.random() * 0.5)); // 0-50% filled
          unfilledQty = quantity - filledQty;
          break;
        case "Pending":
        case "Accepted":
        case "Rejected":
        case "Cancelled - No Fill":
          filledQty = 0;
          unfilledQty = quantity;
          break;
      }

      const orderTime = new Date(
        Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
      ).toISOString();

      const lastUpdate = new Date(
        new Date(orderTime).getTime() + Math.floor(Math.random() * 24 * 60 * 60 * 1000)
      ).toISOString();

      // Price range varies by ticker (random between $10-$500)
      const price = Math.random() * 490 + 10;

      trades.push({
        id: `TRD-${String(tradeIdCounter).padStart(6, '0')}`,
        status,
        accountId: `ACC-${Math.floor(Math.random() * 1000).toString().padStart(4, '0')}`,
        positionId: `POS-${Math.floor(Math.random() * 10000).toString().padStart(6, '0')}`,
        price: Math.round(price * 100) / 100,
        quantity,
        filledQty,
        unfilledQty,
        side: sides[Math.floor(Math.random() * sides.length)],
        ticker,
        trader: traders[Math.floor(Math.random() * traders.length)],
        orderTime,
        lastUpdate,
        currency: currencies[Math.floor(Math.random() * currencies.length)]
      });

      tradeIdCounter++;
    }
  });

  // Sort by orderTime descending (most recent first)
  return trades.sort((a, b) => new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime());
}
