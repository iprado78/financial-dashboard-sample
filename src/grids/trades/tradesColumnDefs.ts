import { ColDef } from 'ag-grid-community'

export const TRADES_COLUMN_DEFS: ColDef[] = [
	{ field: 'id', headerName: 'Trade ID', minWidth: 120 },
	{ field: 'status', headerName: 'Status', minWidth: 100 },
	{ field: 'accountId', headerName: 'Account ID', minWidth: 120 },
	{ field: 'positionId', headerName: 'Position ID', minWidth: 120 },
	{ field: 'price', headerName: 'Price', type: 'numericColumn', valueFormatter: (params) => `$${params.value?.toFixed(2)}` },
	{ field: 'quantity', headerName: 'Quantity', type: 'numericColumn' },
	{ field: 'side', headerName: 'Side', minWidth: 80 },
	{ field: 'ticker', headerName: 'Ticker', minWidth: 80 },
	{ field: 'orderTime', headerName: 'Order Time', minWidth: 160, valueFormatter: (params) => new Date(params.value).toLocaleString() },
	{ field: 'lastUpdate', headerName: 'Last Update', minWidth: 160, valueFormatter: (params) => new Date(params.value).toLocaleString() },
	{ field: 'currency', headerName: 'Currency', minWidth: 80 }
]
