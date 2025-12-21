import {
  createNumberFormatter,
  NumberFormatterConfig,
} from "@/grids/common/valueFormatter/numberFormatter";
import { ValueFormatterParams } from "ag-grid-community";

export const createPercentFormatter = (config: NumberFormatterConfig) => {
  return (params: ValueFormatterParams) => {
    const number = createNumberFormatter(config)(params);
    if (!number?.length) return number;
    return number + "%";
  };
};

export const percent2Formatter = createPercentFormatter({
  decimals: 2,
});

export const normalizedPercent2Formatter = createPercentFormatter({
  decimals: 2,
  makePercent: true,
});
