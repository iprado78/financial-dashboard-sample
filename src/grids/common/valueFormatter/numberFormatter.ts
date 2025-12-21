import { ValueFormatterParams } from "ag-grid-community";

export interface NumberFormatterConfig {
  decimals?: number;
  makePercent?: boolean;
}

export function createNumberFormatter(config: NumberFormatterConfig = {}) {
  const { decimals = 0 } = config;

  return (params: ValueFormatterParams): string => {
    if (params.value == null) {
      return "";
    }

    let num = Number(params.value);
    if (isNaN(num)) {
      return String(params.value);
    }

    if (config.makePercent) {
      num = num * 100;
    }

    return num.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };
}

export const number0Formatter = createNumberFormatter({ decimals: 0 });

export const number2Formatter = createNumberFormatter({
  decimals: 2,
});
