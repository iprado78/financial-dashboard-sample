import { CellClassParams, CellClassRules } from "ag-grid-community";

interface ValueComparisonConfig {
  successValue: string | number;
  errorValue: string | number;
  caseInsensitive?: boolean;
}

interface BooleanFieldConfig<TData = Record<string, unknown>> {
  field: keyof TData;
}

interface FunctionConfig<TData = Record<string, unknown>> {
  isSuccess: (params: CellClassParams<TData>) => boolean | undefined;
}

type BinaryCellClassConfig<TData = Record<string, unknown>> =
  | ValueComparisonConfig
  | BooleanFieldConfig<TData>
  | FunctionConfig<TData>;

export function createBinaryCellClassRules<TData = Record<string, unknown>>(
  config: BinaryCellClassConfig<TData>
): CellClassRules {
  // Mode 3: Function-based
  if ("isSuccess" in config) {
    return {
      "!text-success": (params: CellClassParams<TData>) => {
        const result = config.isSuccess(params);
        return result === true;
      },
      "!text-error": (params: CellClassParams<TData>) => {
        const result = config.isSuccess(params);
        return result === false;
      },
    };
  }

  // Mode 2: Boolean field
  if ("field" in config) {
    return {
      "!text-success": (params: CellClassParams<TData>) => {
        const value = params.data?.[config.field as keyof TData];
        return value === true;
      },
      "!text-error": (params: CellClassParams<TData>) => {
        const value = params.data?.[config.field as keyof TData];
        return value === false;
      },
    };
  }

  // Mode 1: Value comparison
  const { successValue, errorValue, caseInsensitive = true } = config;

  const compareValues = (
    cellValue: unknown,
    targetValue: string | number
  ): boolean => {
    if (
      typeof cellValue === "string" &&
      typeof targetValue === "string" &&
      caseInsensitive
    ) {
      return cellValue.toUpperCase() === targetValue.toUpperCase();
    }
    return cellValue === targetValue;
  };

  return {
    "!text-success": (params: CellClassParams<TData>) => {
      return compareValues(params.value, successValue);
    },
    "!text-error": (params: CellClassParams<TData>) => {
      return compareValues(params.value, errorValue);
    },
  };
}
