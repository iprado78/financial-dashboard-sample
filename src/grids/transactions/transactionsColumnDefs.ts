import { ColDef } from 'ag-grid-community'
import { TransactionTypeCellRenderer } from './cellRenderer/TransactionTypeCellRenderer'
import { TransactionStatusCellRenderer } from './cellRenderer/TransactionStatusCellRenderer'
import { createStatusIndicatorCellRenderer } from '../common/cellRenderer/statusIndicator/StatusIndicatorCellRenderer'
import { ITransaction } from '@/data/generateTransactions'

const getStatusColor = (status: ITransaction["status"]): string => {
	switch (status) {
		case "COMPLETED": return "#10b981"; // success
		case "PENDING": return "#f59e0b"; // warning
		case "FAILED": return "#ef4444"; // error
		case "CANCELLED": return "#9ca3af"; // gray
		default: return "#9ca3af";
	}
};

export const TRANSACTIONS_COLUMN_DEFS: ColDef[] = [
	{
		field: 'statusIndicator',
		headerName: '',
		minWidth: 12,
		maxWidth: 12,
		cellRenderer: createStatusIndicatorCellRenderer({
			getColor: (data) => getStatusColor(data.status),
		}),
		sortable: false,
		filter: false,
		resizable: false,
		suppressSizeToFit: true,
		pinned: 'left',
		lockPinned: true,
		cellClass: '!p-0',
	},
	{ field: 'id', headerName: 'Transaction ID', minWidth: 140 },
	{ field: 'accountId', headerName: 'Account ID', minWidth: 120 },
	{ field: 'transactionType', headerName: 'Type', minWidth: 120, cellRenderer: TransactionTypeCellRenderer },
	{ field: 'amount', headerName: 'Amount', type: 'numericColumn', valueFormatter: (params) => `$${params.value?.toLocaleString()}` },
	{ field: 'currency', headerName: 'Currency', minWidth: 80 },
	{ field: 'description', headerName: 'Description', minWidth: 200 },
	{ field: 'category', headerName: 'Category', minWidth: 140 },
	{ field: 'timestamp', headerName: 'Timestamp', minWidth: 160, valueFormatter: (params) => new Date(params.value).toLocaleString() },
	{ field: 'status', headerName: 'Status', minWidth: 130, cellRenderer: TransactionStatusCellRenderer },
	{ field: 'reference', headerName: 'Reference', minWidth: 160 },
	{ field: 'counterparty', headerName: 'Counterparty', minWidth: 180 },
	{ field: 'fees', headerName: 'Fees', type: 'numericColumn', valueFormatter: (params) => `$${params.value?.toFixed(2)}` }
]
