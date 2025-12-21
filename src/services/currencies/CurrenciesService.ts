export const CURRENCIES = ["USD", "EUR", "GBP", "JPY"] as const;

export type Currency = (typeof CURRENCIES)[number];

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
};

export class CurrencyService {
  static readonly CURRENCIES = CURRENCIES;
  static readonly CURRENCY_SYMBOLS = CURRENCY_SYMBOLS;

  static getCurrencySymbol(currency: Currency): string {
    const upperCurrency = currency?.toUpperCase() as Currency;
    return CURRENCY_SYMBOLS[upperCurrency] || currency || "$";
  }

  getCurrencies(): Currency[] {
    return [...CURRENCIES];
  }
}
