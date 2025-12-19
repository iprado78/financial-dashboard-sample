import { ColDef } from 'ag-grid-community'
import { CreditRatingCellRenderer } from './cellRenderer/CreditRatingCellRenderer'
import { createStatusIndicatorCellRenderer } from '../common/cellRenderer/statusIndicator/StatusIndicatorCellRenderer'
import { ICredit } from '@/data/generateCredit'

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

export const CREDIT_COLUMN_DEFS: ColDef[] = [
	{
		field: 'statusIndicator',
		headerName: '',
		minWidth: 12,
		maxWidth: 12,
		cellRenderer: createStatusIndicatorCellRenderer({
			getColor: (data) => getRatingColor(data.creditRating),
		}),
		sortable: false,
		filter: false,
		resizable: false,
		suppressSizeToFit: true,
		pinned: 'left',
		lockPinned: true,
		cellClass: '!p-0',
	},
	{ field: 'id', headerName: 'Credit ID', minWidth: 120 },
	{ field: 'counterpartyId', headerName: 'Counterparty ID', minWidth: 140 },
	{ field: 'counterpartyName', headerName: 'Counterparty Name', minWidth: 200 },
	{ field: 'creditRating', headerName: 'Credit Rating', minWidth: 110, cellRenderer: CreditRatingCellRenderer },
	{ field: 'exposure', headerName: 'Exposure', type: 'numericColumn', valueFormatter: (params) => `$${params.value?.toLocaleString()}` },
	{ field: 'collateral', headerName: 'Collateral', type: 'numericColumn', valueFormatter: (params) => `$${params.value?.toLocaleString()}` },
	{ field: 'netExposure', headerName: 'Net Exposure', type: 'numericColumn', valueFormatter: (params) => `$${params.value?.toLocaleString()}` },
	{ field: 'riskLimit', headerName: 'Risk Limit', type: 'numericColumn', valueFormatter: (params) => `$${params.value?.toLocaleString()}` },
	{ field: 'utilizationPercent', headerName: 'Utilization %', type: 'numericColumn', valueFormatter: (params) => `${params.value?.toFixed(2)}%` }
]
