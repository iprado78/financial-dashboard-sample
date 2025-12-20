import { getColorClass } from "@/styles/colors";
import {
  CreditRating,
  isExcellentCreditRating,
  isFairCreditRating,
  isGoodCreditRating,
  isPoorCreditRating,
} from "./CreditService";

export function getCreditRatingColorClass(rating: CreditRating): string {
  if (isExcellentCreditRating(rating)) {
    return getColorClass("success");
  }
  if (isGoodCreditRating(rating)) {
    return getColorClass("info");
  }
  if (isFairCreditRating(rating)) {
    return getColorClass("warning");
  }
  if (isPoorCreditRating(rating)) {
    return getColorClass("error");
  }
  return getColorClass("neutral");
}
