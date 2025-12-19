import { RowClassParams, RowStyle } from "ag-grid-community";
import { ICredit } from "@/data/generateCredit";

const getRatingColor = (rating: ICredit["creditRating"]): string => {
  // AAA, AA+, AA, AA- are excellent
  if (["AAA", "AA+", "AA", "AA-"].includes(rating)) {
    return "#10b981"; // success
  }
  // A+, A, A- are good
  if (["A+", "A", "A-"].includes(rating)) {
    return "#3b82f6"; // info
  }
  // BBB+, BBB, BBB- are medium
  if (["BBB+", "BBB", "BBB-"].includes(rating)) {
    return "#f59e0b"; // warning
  }
  // BB+, BB, BB- are poor
  return "#ef4444"; // error
};

export const getCreditRowStyle = (
  params: RowClassParams
): RowStyle | undefined => {
  const rating = params.data?.creditRating as ICredit["creditRating"];
  if (!rating) return undefined;

  const color = getRatingColor(rating);

  return {
    borderLeft: `4px solid ${color}`,
  };
};
