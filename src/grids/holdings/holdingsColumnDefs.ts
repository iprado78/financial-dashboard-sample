import { ColDef } from 'ag-grid-community'

export const HOLDINGS_COLUMN_DEFS: ColDef[] = [
	{ field: 'id', headerName: 'Holding ID', minWidth: 120 },
	{ field: 'portfolioId', headerName: 'Portfolio ID', minWidth: 120 },
	{ field: 'symbol', headerName: 'Symbol', minWidth: 100 },
	{ field: 'quantity', headerName: 'Quantity', type: 'numericColumn' },
	{ field: 'marketValue', headerName: 'Market Value', type: 'numericColumn', valueFormatter: (params) => `$${params.value?.toLocaleString()}` },
	{ field: 'costBasis', headerName: 'Cost Basis', type: 'numericColumn', valueFormatter: (params) => `$${params.value?.toLocaleString()}` },
	{ field: 'unrealizedGainLoss', headerName: 'Unrealized P&L', type: 'numericColumn', valueFormatter: (params) => `$${params.value?.toLocaleString()}` },
	{ field: 'weight', headerName: 'Weight', type: 'numericColumn', valueFormatter: (params) => `${(params.value * 100)?.toFixed(2)}%` },
	{ field: 'sector', headerName: 'Sector', minWidth: 150 }
]
