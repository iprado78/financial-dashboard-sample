import { ColDef } from 'ag-grid-community'
import { RiskTypeCellRenderer } from './cellRenderer/RiskTypeCellRenderer'
import { createStatusIndicatorCellRenderer } from '../common/cellRenderer/statusIndicator/StatusIndicatorCellRenderer'
import { IRisk } from '@/data/generateRisk'

const getRiskTypeColor = (riskType: IRisk["riskType"]): string => {
	switch (riskType) {
		case "Market Risk": return "#3b82f6"; // info
		case "Credit Risk": return "#f59e0b"; // warning
		case "Operational Risk": return "#ef4444"; // error
		case "Liquidity Risk": return "#9ca3af"; // gray
		default: return "#9ca3af";
	}
};

export const RISK_COLUMN_DEFS: ColDef[] = [
	{
		field: 'statusIndicator',
		headerName: '',
		minWidth: 12,
		maxWidth: 12,
		cellRenderer: createStatusIndicatorCellRenderer({
			getColor: (data) => getRiskTypeColor(data.riskType),
		}),
		sortable: false,
		filter: false,
		resizable: false,
		suppressSizeToFit: true,
		pinned: 'left',
		lockPinned: true,
		cellClass: '!p-0',
	},
	{ field: 'id', headerName: 'Risk ID', minWidth: 120 },
	{ field: 'portfolioId', headerName: 'Portfolio ID', minWidth: 120 },
	{ field: 'riskType', headerName: 'Risk Type', minWidth: 140, cellRenderer: RiskTypeCellRenderer },
	{ field: 'VaR', headerName: 'VaR', type: 'numericColumn', valueFormatter: (params) => `$${params.value?.toLocaleString()}` },
	{ field: 'expectedShortfall', headerName: 'Expected Shortfall', type: 'numericColumn', valueFormatter: (params) => `$${params.value?.toLocaleString()}` },
	{ field: 'volatility', headerName: 'Volatility', type: 'numericColumn', valueFormatter: (params) => `${(params.value * 100)?.toFixed(2)}%` },
	{ field: 'beta', headerName: 'Beta', type: 'numericColumn', valueFormatter: (params) => params.value?.toFixed(2) },
	{ field: 'correlation', headerName: 'Correlation', type: 'numericColumn', valueFormatter: (params) => params.value?.toFixed(2) },
	{ field: 'riskDate', headerName: 'Risk Date', minWidth: 160, valueFormatter: (params) => new Date(params.value).toLocaleString() }
]
