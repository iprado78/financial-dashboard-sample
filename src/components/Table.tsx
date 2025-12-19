import { useEffect, useRef, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { colorSchemeDarkBlue, ColDef, GridOptions, themeQuartz } from 'ag-grid-community'
import { useIsDarkMode } from '@/stores/DarkModeStore'
import { useTableFilters, applyFilters } from '@/stores/TableFilterStore'

interface TableProps {
	title: string
	data: any[]
	columnDefs: ColDef[]
	tableName?: 'trades' | 'credit' | 'holdings' | 'risk' | 'transactions'
	rowIdField?: string
	height?: string
	width?: string
	paginationPageSize?: number
}

const defaultColDef = {
	minWidth: 150,
	flex: 1,
	filter: 'agTextColumnFilter',
	resizable: true,
	sortable: true
}

export default function Table({
	title,
	data,
	columnDefs,
	tableName,
	rowIdField = 'id',
	height = '450px',
	width = '100%',
	paginationPageSize = 50
}: TableProps) {
	const gridRef = useRef<AgGridReact>(null)
	const isDarkMode = useIsDarkMode()
	const theme = isDarkMode ? themeQuartz.withPart(colorSchemeDarkBlue) : themeQuartz

	// Get filters for this table
	const filters = tableName ? useTableFilters(tableName) : []

	// Apply filters to data
	const filteredData = useMemo(() => {
		if (!tableName || filters.length === 0) return data
		return applyFilters(data, filters)
	}, [data, filters, tableName])

	const gridOptions: GridOptions = {
		theme: theme,
		columnDefs: columnDefs,
		defaultColDef: defaultColDef,
		rowModelType: 'clientSide',
		rowData: filteredData,
		pagination: true,
		paginationPageSize: paginationPageSize,
		getRowId: (params: any) => params.data[rowIdField]
	}

	useEffect(() => {
		if (gridRef.current?.api) {
			gridRef.current.api.setGridOption('rowData', filteredData)
		}
	}, [filteredData])

	return (
		<div style={{ width, height }} className="flex flex-col">
			<div className="flex items-center justify-between mb-3">
				<h2 className="text-xl font-semibold">{title}</h2>
				{tableName && filters.length > 0 && (
					<span className="text-sm text-blue-600 dark:text-blue-400">
						{filters.length} filter{filters.length !== 1 ? 's' : ''} active
					</span>
				)}
			</div>
			<div className="flex-1">
				<AgGridReact ref={gridRef} {...gridOptions} />
			</div>
		</div>
	)
}
