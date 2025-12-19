export interface ICredit extends Record<string, unknown> {
  id: string;
  counterpartyId: string;
  counterpartyName: string;
  creditRating: "AAA" | "AA+" | "AA" | "AA-" | "A+" | "A" | "A-" | "BBB+" | "BBB" | "BBB-" | "BB+" | "BB" | "BB-";
  exposure: number;
  collateral: number;
  netExposure: number;
  riskLimit: number;
  utilizationPercent: number;
}

const CREDIT_RATINGS: ICredit["creditRating"][] = [
  "AAA", "AA+", "AA", "AA-", "A+", "A", "A-", "BBB+", "BBB", "BBB-", "BB+", "BB", "BB-"
];

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
  "HSBC Holdings",
  "BNP Paribas",
  "Société Générale",
  "Royal Bank of Canada",
  "TD Bank",
];

export function generateCredit(): ICredit[] {
  const credits: ICredit[] = [];
  const numCredits = Math.floor(Math.random() * 21) + 30; // 30-50 credits

  for (let i = 1; i <= numCredits; i++) {
    const exposure = Math.round((Math.random() * 10000000 + 500000) * 100) / 100;
    const collateralPercent = Math.random() * 0.4 + 0.5; // 50-90%
    const collateral = Math.round(exposure * collateralPercent * 100) / 100;
    const netExposure = exposure - collateral;
    const riskLimit = Math.round((exposure * (Math.random() * 2 + 1.5)) * 100) / 100; // 1.5x to 3.5x exposure
    const utilizationPercent = Math.round((exposure / riskLimit * 100) * 100) / 100;

    credits.push({
      id: `CRED-${String(i).padStart(3, '0')}`,
      counterpartyId: `CP-${String(i).padStart(3, '0')}`,
      counterpartyName: COUNTERPARTIES[Math.floor(Math.random() * COUNTERPARTIES.length)],
      creditRating: CREDIT_RATINGS[Math.floor(Math.random() * CREDIT_RATINGS.length)],
      exposure,
      collateral,
      netExposure,
      riskLimit,
      utilizationPercent,
    });
  }

  return credits.sort((a, b) => b.exposure - a.exposure);
}
