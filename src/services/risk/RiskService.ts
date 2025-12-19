import { Listener, ObservableValue } from "@/utils/ObservableValue";
import { generateRisk, IRisk } from "@/data/generateRisk";

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
