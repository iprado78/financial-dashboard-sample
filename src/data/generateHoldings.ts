import { SYMBOLS_UNIVERSE } from "./symbolsUniverse";

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

export function generateHoldings(): IHolding[] {
  const symbols = SYMBOLS_UNIVERSE;
  const holdings: IHolding[] = [];
  let holdingIdCounter = 1;

  // Generate 20-50 portfolios
  const numPortfolios = Math.floor(Math.random() * 31) + 20; // 20-50 portfolios

  for (let portfolioIdx = 1; portfolioIdx <= numPortfolios; portfolioIdx++) {
    const portfolioId = `PORT-${String(portfolioIdx).padStart(3, '0')}`;

    // Each portfolio holds 1-3 different symbols
    const numHoldingsInPortfolio = Math.floor(Math.random() * 3) + 1; // 1-3 holdings
    const shuffledSymbols = [...symbols].sort(() => Math.random() - 0.5);
    const portfolioSymbols = shuffledSymbols.slice(0, numHoldingsInPortfolio);

    portfolioSymbols.forEach(symbolData => {
      // Generate quantity from 25 to 500
      const quantity = Math.floor(Math.random() * 476) + 25;

      // Generate cost basis per share from $50 to $400
      const costBasisPerShare = Math.random() * 350 + 50;
      const costBasis = Math.round(quantity * costBasisPerShare * 100) / 100;

      // Generate market value with some variance (-20% to +40% from cost basis)
      const variance = (Math.random() * 0.6 - 0.2); // -0.2 to 0.4
      const marketValue = Math.round(costBasis * (1 + variance) * 100) / 100;

      const unrealizedGainLoss = Math.round((marketValue - costBasis) * 100) / 100;

      // Weight between 0.04 and 0.15 (4% to 15%)
      const weight = Math.round((Math.random() * 0.11 + 0.04) * 10000) / 10000;

      holdings.push({
        id: `HOLD-${String(holdingIdCounter).padStart(3, '0')}`,
        portfolioId,
        symbol: symbolData.ticker,
        quantity,
        marketValue,
        costBasis,
        unrealizedGainLoss,
        weight,
        sector: symbolData.sector,
      });

      holdingIdCounter++;
    });
  }

  // Sort by holding ID
  return holdings.sort((a, b) => a.id.localeCompare(b.id));
}
