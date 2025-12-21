import {
  createNumberFormatter,
  NumberFormatterConfig,
} from "@/grids/common/valueFormatter/numberFormatter";
import { createPercentFormatter } from "@/grids/common/valueFormatter/percentFormatter";
import {
  Currency,
  CurrencyService,
} from "@/services/currencies/CurrenciesService";
import { ValueFormatterParams } from "ag-grid-community";

interface BaseCurrencyConfig {
  isPercent?: boolean;
  isStaticCurrency: boolean;
}

interface StaticCurrencyConfig extends BaseCurrencyConfig {
  currency?: string;
  isStaticCurrency: true;
}

interface DynamicCurrencyConfig extends BaseCurrencyConfig {
  currencyFieldName: string;
  isStaticCurrency: false;
}

type PriceFormatterConfig = NumberFormatterConfig &
  (StaticCurrencyConfig | DynamicCurrencyConfig);

const DEFAULT_PRICE_CONFIG: PriceFormatterConfig = {
  decimals: 2,
  isStaticCurrency: true,
  currency: "USD",
};

export const createPriceFormatter = (
  config: PriceFormatterConfig = DEFAULT_PRICE_CONFIG
) => {
  return (params: ValueFormatterParams): string => {
    const formatter = config.isPercent
      ? createPercentFormatter
      : createNumberFormatter;
    const number = formatter(config)(params);
    if (!number.length) return "";
    let symbol = "";
    if (config.isStaticCurrency && config.currency) {
      symbol = CurrencyService.getCurrencySymbol(config.currency as Currency);
    } else if (!config.isStaticCurrency && typeof params.data === "object") {
      const currency = params.data[config.currencyFieldName];
      symbol = CurrencyService.getCurrencySymbol(currency as Currency);
    }
    return `${symbol}${number}`;
  };
};

export const usd2Formatter = createPriceFormatter();

export const usd0Formatter = createPriceFormatter({
  ...DEFAULT_PRICE_CONFIG,
  decimals: 0,
});
