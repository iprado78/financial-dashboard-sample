import { Listener, ObservableValue } from "@/utils/ObservableValue";
import { generateCredit } from "@/data/generateCredit";

export const CREDIT_RATINGS = [
  "AAA",
  "AA+",
  "AA",
  "AA-",
  "A+",
  "A",
  "A-",
  "BBB+",
  "BBB",
  "BBB-",
  "BB+",
  "BB",
  "BB-",
] as const;

export type CreditRating = (typeof CREDIT_RATINGS)[number];

export const EXCELLENT_CREDIT_RATINGS = ["AAA"] as const;

export type ExcellentCreditRating = (typeof EXCELLENT_CREDIT_RATINGS)[number];

export const STRONG_CREDIT_RATINGS = ["AA+", "AA", "AA-"] as const;

export type StrongCreditRating = (typeof STRONG_CREDIT_RATINGS)[number];

export const GOOD_CREDIT_RATINGS = ["A+", "A", "A-"] as const;

export type GoodCreditRating = (typeof GOOD_CREDIT_RATINGS)[number];

export const FAIR_CREDIT_RATINGS = ["BBB+", "BBB", "BBB-"] as const;

export type FairCreditRating = (typeof FAIR_CREDIT_RATINGS)[number];

export const POOR_CREDIT_RATINGS = ["BB+", "BB", "BB-"] as const;

export type PoorCreditRating = (typeof POOR_CREDIT_RATINGS)[number];

function createCreditRatingTypeGuard<T extends readonly CreditRating[]>(
  ratings: T
) {
  return (rating: CreditRating): rating is T[number] => {
    return ratings.includes(rating);
  };
}

export const isExcellentCreditRating = createCreditRatingTypeGuard(
  EXCELLENT_CREDIT_RATINGS
);
export const isStrongCreditRating = createCreditRatingTypeGuard(
  STRONG_CREDIT_RATINGS
);
export const isGoodCreditRating =
  createCreditRatingTypeGuard(GOOD_CREDIT_RATINGS);
export const isFairCreditRating =
  createCreditRatingTypeGuard(FAIR_CREDIT_RATINGS);
export const isPoorCreditRating =
  createCreditRatingTypeGuard(POOR_CREDIT_RATINGS);
export interface ICredit extends Record<string, unknown> {
  id: string;
  counterpartyId: string;
  counterpartyName: string;
  creditRating: CreditRating;
  exposure: number;
  collateral: number;
  netExposure: number;
  riskLimit: number;
  utilizationPercent: number;
}

export class CreditService {
  #credits$: ObservableValue<ICredit[]>;

  constructor() {
    this.#credits$ = new ObservableValue<ICredit[]>([]);
  }

  loadSnapshot = async () => {
    const credits = generateCredit();
    this.#credits$.next(credits);
  };

  getCredits = () => {
    return this.#credits$.getValue();
  };

  addCredit = (credit: ICredit) => {
    const currentCredits = this.#credits$.getValue();
    this.#credits$.next([...currentCredits, credit]);
  };

  subscribeToCredits = (listener: Listener<ICredit[]>): (() => void) => {
    return this.#credits$.subscribe(listener);
  };
}
