import { Listener, ObservableValue } from "@/utils/ObservableValue";
import { generateRisk } from "@/data/generateRisk";

export const RISK_TYPES = [
  "Market Risk",
  "Credit Risk",
  "Operational Risk",
  "Liquidity Risk",
] as const;

export type RiskType = (typeof RISK_TYPES)[number];
export interface IRisk extends Record<string, unknown> {
  id: string;
  portfolioId: string;
  riskType: RiskType;
  VaR: number;
  expectedShortfall: number;
  volatility: number;
  beta: number;
  correlation: number;
  riskDate: string;
}

export class RiskService {
  #risks$: ObservableValue<IRisk[]>;

  constructor() {
    this.#risks$ = new ObservableValue<IRisk[]>([]);
  }

  loadSnapshot = async () => {
    const risks = generateRisk();
    this.#risks$.next(risks);
  };

  getRisks = () => {
    return this.#risks$.getValue();
  };

  addRisk = (risk: IRisk) => {
    const currentRisks = this.#risks$.getValue();
    this.#risks$.next([...currentRisks, risk]);
  };

  subscribeToRisks = (listener: Listener<IRisk[]>): (() => void) => {
    return this.#risks$.subscribe(listener);
  };
}
