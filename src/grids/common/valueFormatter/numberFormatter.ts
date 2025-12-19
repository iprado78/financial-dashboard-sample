import { ValueFormatterParams } from "ag-grid-community";

interface NumberFormatterConfig {
  decimals?: number;
}

export function createNumberFormatter(config: NumberFormatterConfig = {}) {
  const { decimals = 0 } = config;

  return (params: ValueFormatterParams): string => {
    if (params.value == null) {
      return "";
    }

    const num = Number(params.value);
    if (isNaN(num)) {
      return String(params.value);
    }

    return num.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };
}

export const quantityFormatter = createNumberFormatter({ decimals: 0 });
