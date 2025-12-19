import { create } from 'zustand'

export interface TableFilter {
	column: string
	operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'not_contains' | 'in' | 'between'
	value: any
}

interface TableFilters {
	trades: TableFilter[]
	credit: TableFilter[]
	holdings: TableFilter[]
	risk: TableFilter[]
	transactions: TableFilter[]
}

interface TableFilterState {
	filters: TableFilters
	actions: {
		setTableFilters: (tableName: keyof TableFilters, filters: TableFilter[]) => void
		addTableFilter: (tableName: keyof TableFilters, filter: TableFilter) => void
		clearTableFilters: (tableName: keyof TableFilters) => void
		clearAllFilters: () => void
	}
}

const useTableFilterStore = create<TableFilterState>((set) => ({
	filters: {
		trades: [],
		credit: [],
		holdings: [],
		risk: [],
		transactions: []
	},
	actions: {
		setTableFilters: (tableName, filters) => {
			set((state) => ({
				filters: {
					...state.filters,
					[tableName]: filters
				}
			}))
		},
		addTableFilter: (tableName, filter) => {
			set((state) => ({
				filters: {
					...state.filters,
					[tableName]: [...state.filters[tableName], filter]
				}
			}))
		},
		clearTableFilters: (tableName) => {
			set((state) => ({
				filters: {
					...state.filters,
					[tableName]: []
				}
			}))
		},
		clearAllFilters: () => {
			set({
				filters: {
					trades: [],
					credit: [],
					holdings: [],
					risk: [],
					transactions: []
				}
			})
		}
	}
}))

// Selectors
export const useTableFilters = (tableName: keyof TableFilters) => useTableFilterStore((state) => state.filters[tableName])
export const useSetTableFilters = () => useTableFilterStore((state) => state.actions.setTableFilters)
export const useAddTableFilter = () => useTableFilterStore((state) => state.actions.addTableFilter)
export const useClearTableFilters = () => useTableFilterStore((state) => state.actions.clearTableFilters)
export const useClearAllFilters = () => useTableFilterStore((state) => state.actions.clearAllFilters)

// Helper function to apply filters to data
export function applyFilters<T extends Record<string, any>>(data: T[], filters: TableFilter[]): T[] {
	if (filters.length === 0) return data

	return data.filter((row) => {
		return filters.every((filter) => {
			const cellValue = row[filter.column]
			const filterValue = filter.value

			switch (filter.operator) {
				case 'equals':
					return cellValue == filterValue
				case 'not_equals':
					return cellValue != filterValue
				case 'greater_than':
					return Number(cellValue) > Number(filterValue)
				case 'less_than':
					return Number(cellValue) < Number(filterValue)
				case 'contains':
					return String(cellValue).toLowerCase().includes(String(filterValue).toLowerCase())
				case 'not_contains':
					return !String(cellValue).toLowerCase().includes(String(filterValue).toLowerCase())
				case 'in':
					return Array.isArray(filterValue) && filterValue.includes(cellValue)
				case 'between':
					return Array.isArray(filterValue) && Number(cellValue) >= Number(filterValue[0]) && Number(cellValue) <= Number(filterValue[1])
				default:
					return true
			}
		})
	})
}
