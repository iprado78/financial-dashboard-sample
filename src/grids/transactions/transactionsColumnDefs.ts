import { ColDef } from 'ag-grid-community'

export const TRANSACTIONS_COLUMN_DEFS: ColDef[] = [
	{ field: 'id', headerName: 'Transaction ID', minWidth: 140 },
	{ field: 'accountId', headerName: 'Account ID', minWidth: 120 },
	{ field: 'transactionType', headerName: 'Type', minWidth: 100 },
	{ field: 'amount', headerName: 'Amount', type: 'numericColumn', valueFormatter: (params) => `$${params.value?.toLocaleString()}` },
	{ field: 'currency', headerName: 'Currency', minWidth: 80 },
	{ field: 'description', headerName: 'Description', minWidth: 200 },
	{ field: 'category', headerName: 'Category', minWidth: 140 },
	{ field: 'timestamp', headerName: 'Timestamp', minWidth: 160, valueFormatter: (params) => new Date(params.value).toLocaleString() },
	{ field: 'status', headerName: 'Status', minWidth: 100 },
	{ field: 'reference', headerName: 'Reference', minWidth: 160 },
	{ field: 'counterparty', headerName: 'Counterparty', minWidth: 180 },
	{ field: 'fees', headerName: 'Fees', type: 'numericColumn', valueFormatter: (params) => `$${params.value?.toFixed(2)}` }
]
