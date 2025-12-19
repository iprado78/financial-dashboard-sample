import { ICellRendererParams } from "ag-grid-community";
import { ICredit } from "@/data/generateCredit";

const getRatingStyles = (rating: ICredit["creditRating"]): string => {
  // AAA, AA+, AA, AA- are excellent
  if (["AAA", "AA+", "AA", "AA-"].includes(rating)) {
    return "bg-success-light text-success-dark dark:bg-success-dark dark:text-success-light";
  }
  // A+, A, A- are good
  if (["A+", "A", "A-"].includes(rating)) {
    return "bg-info-light text-info-dark dark:bg-info-dark dark:text-info-light";
  }
  // BBB+, BBB, BBB- are medium
  if (["BBB+", "BBB", "BBB-"].includes(rating)) {
    return "bg-warning-light text-warning-dark dark:bg-warning-dark dark:text-warning-light";
  }
  // BB+, BB, BB- are poor
  return "bg-error-light text-error-dark dark:bg-error-dark dark:text-error-light";
};

export function CreditRatingCellRenderer(params: ICellRendererParams) {
  const rating = params.value as ICredit["creditRating"];
  if (!rating) return null;

  const styleClasses = getRatingStyles(rating);

  return (
    <div className="flex items-center h-full">
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium ${styleClasses}`}
      >
        {rating}
      </span>
    </div>
  );
}
