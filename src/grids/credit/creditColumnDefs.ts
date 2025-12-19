import { ColDef } from 'ag-grid-community'

export const CREDIT_COLUMN_DEFS: ColDef[] = [
	{ field: 'id', headerName: 'Credit ID', minWidth: 120 },
	{ field: 'counterpartyId', headerName: 'Counterparty ID', minWidth: 140 },
	{ field: 'counterpartyName', headerName: 'Counterparty Name', minWidth: 200 },
	{ field: 'creditRating', headerName: 'Credit Rating', minWidth: 120 },
	{ field: 'exposure', headerName: 'Exposure', type: 'numericColumn', valueFormatter: (params) => `$${params.value?.toLocaleString()}` },
	{ field: 'collateral', headerName: 'Collateral', type: 'numericColumn', valueFormatter: (params) => `$${params.value?.toLocaleString()}` },
	{ field: 'netExposure', headerName: 'Net Exposure', type: 'numericColumn', valueFormatter: (params) => `$${params.value?.toLocaleString()}` },
	{ field: 'riskLimit', headerName: 'Risk Limit', type: 'numericColumn', valueFormatter: (params) => `$${params.value?.toLocaleString()}` },
	{ field: 'utilizationPercent', headerName: 'Utilization %', type: 'numericColumn', valueFormatter: (params) => `${params.value?.toFixed(2)}%` }
]
