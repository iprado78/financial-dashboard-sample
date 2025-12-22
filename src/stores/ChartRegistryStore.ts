import { AgFinancialChartOptions, AgPriceVolumeChartType } from "ag-charts-enterprise";

export interface ChartController {
  setChartType: (type: AgPriceVolumeChartType) => void;
  toggleVolume: () => void;
  setVolume: (enabled: boolean) => void;
  updateOptions: (options: Partial<AgFinancialChartOptions>) => void;
}

// Simple registry for chart controllers
const chartControllers: Map<string, ChartController> = new Map();

export function registerChartController(symbol: string, controller: ChartController) {
  chartControllers.set(symbol.toUpperCase(), controller);
}

export function unregisterChartController(symbol: string) {
  chartControllers.delete(symbol.toUpperCase());
}

export function getChartController(symbol: string): ChartController | undefined {
  return chartControllers.get(symbol.toUpperCase());
}
