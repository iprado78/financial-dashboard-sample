import CompanyLogo from "@/components/CompanyLogo/CompanyLogo";
import { ICellRendererParams } from "ag-grid-community";

interface CompanyLogoWithTextConfig {
  fieldName: string;
  size?: number;
}

export function createCompanyLogoWithTextCellRenderer(
  config: CompanyLogoWithTextConfig
) {
  const { fieldName, size = 24 } = config;

  return (params: ICellRendererParams) => {
    const ticker = params.data?.[fieldName];

    if (!ticker) {
      return null;
    }

    return (
      <div className="flex items-center gap-3 h-full">
        <CompanyLogo ticker={ticker} size={size} />
        <span className="font-medium">{ticker}</span>
      </div>
    );
  };
}
