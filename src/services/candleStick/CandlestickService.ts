type CandleStickEntry = [number, number, number, number, number];

export class CandlestickService {
  static async getCandlestickData(symbol: string): Promise<CandleStickEntry[]> {
    if (!symbol) {
      throw new Error("Symbol is required");
    }

    const normalizedSymbol = symbol.toLowerCase().trim();

    if (!normalizedSymbol.match(/^[a-z]+$/)) {
      throw new Error("Invalid symbol format.");
    }

    try {
      const data = await import(
        `../../data/candleStick/${normalizedSymbol}.json`
      );

      if (!data.default || !Array.isArray(data.default)) {
        throw new Error(`Invalid data format for symbol: ${symbol}`);
      }

      return data.default as CandleStickEntry[];
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("Cannot find module")
      ) {
        throw new Error(`No data available for symbol: ${symbol}`);
      }
      throw error;
    }
  }
}
