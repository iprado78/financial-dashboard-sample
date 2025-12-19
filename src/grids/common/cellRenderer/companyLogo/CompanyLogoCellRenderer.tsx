import CompanyLogo from '@/components/CompanyLogo';
import { ICellRendererParams } from 'ag-grid-community';

interface CompanyLogoConfig {
  fieldName: string;
  size?: number;
}

export function createCompanyLogoCellRenderer(config: CompanyLogoConfig) {
  const { fieldName, size = 24 } = config;

  return (params: ICellRendererParams) => {
    const ticker = params.data?.[fieldName];

    if (!ticker) {
      return null;
    }

    return (
      <div className="flex items-center justify-end h-full pr-0">
        <CompanyLogo ticker={ticker} size={size} />
      </div>
    );
  };
}
