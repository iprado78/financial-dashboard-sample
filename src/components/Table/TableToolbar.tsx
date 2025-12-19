import { useState } from "react";
import { ColDef } from "ag-grid-community";
import { Plus } from "lucide-react";

interface SortModel {
  colId: string;
  sort: "asc" | "desc";
}

interface FilterModel {
  colId: string;
  type: string;
  filter: any;
}

export interface QuickFilter<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  id: string;
  label: string;
  filter: (row: T, currentUser?: string) => boolean;
}

interface TableToolbarProps<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  columnDefs: ColDef[];
  sortModel: SortModel[];
  filterModel: FilterModel[];
  onSortChange: (sortModel: SortModel[]) => void;
  onFilterChange: (filterModel: FilterModel[]) => void;
  quickFilters?: QuickFilter<T>[];
  activeQuickFilter?: string | null;
  onQuickFilterChange?: (filterId: string | null) => void;
}

export default function TableToolbar<
  T extends Record<string, unknown> = Record<string, unknown>
>({
  columnDefs,
  sortModel,
  filterModel,
  onSortChange,
  onFilterChange,
  quickFilters,
  activeQuickFilter,
  onQuickFilterChange,
}: TableToolbarProps<T>) {
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filterInput, setFilterInput] = useState<{
    colId: string;
    value: string;
  }>({ colId: "", value: "" });

  // Get column name from colId
  const getColumnName = (colId: string): string => {
    const col = columnDefs.find((c) => c.field === colId);
    return col?.headerName || colId;
  };

  // Get sortable columns
  const sortableColumns = columnDefs.filter(
    (col) => col.field && col.sortable !== false
  );

  const handleAddSort = (colId: string) => {
    if (!sortModel.find((s) => s.colId === colId)) {
      onSortChange([...sortModel, { colId, sort: "asc" }]);
    }
    setShowSortMenu(false);
  };

  const handleRemoveSort = (colId: string) => {
    onSortChange(sortModel.filter((s) => s.colId !== colId));
  };

  const handleToggleSortDirection = (colId: string) => {
    onSortChange(
      sortModel.map((s) =>
        s.colId === colId
          ? { ...s, sort: s.sort === "asc" ? "desc" : "asc" }
          : s
      )
    );
  };

  const handleSelectFilterColumn = (colId: string) => {
    setFilterInput({ colId, value: "" });
  };

  const handleAddFilter = () => {
    if (filterInput.colId && filterInput.value) {
      onFilterChange([
        ...filterModel,
        {
          colId: filterInput.colId,
          type: "contains",
          filter: filterInput.value,
        },
      ]);
      setFilterInput({ colId: "", value: "" });
      setShowFilterMenu(false);
    }
  };

  return (
    <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
      {/* Quick Filters Section */}
      {quickFilters && quickFilters.length > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {quickFilters.map((qf) => (
              <button
                key={qf.id}
                onClick={() =>
                  onQuickFilterChange?.(
                    activeQuickFilter === qf.id ? null : qf.id
                  )
                }
                className={`px-3 py-1 text-sm rounded border transition-colors ${
                  activeQuickFilter === qf.id
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400"
                }`}
              >
                {qf.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sort Section */}
      <div
        className={`flex items-center gap-2 ${
          quickFilters && quickFilters.length > 0
            ? "border-l border-gray-300 dark:border-gray-600 pl-4"
            : ""
        }`}
      >
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Sort:
        </span>
        {sortModel.length === 0 ? (
          <span className="text-sm text-gray-500 dark:text-gray-400">None</span>
        ) : (
          <div className="flex items-center gap-2">
            {sortModel.map((sort) => (
              <div
                key={sort.colId}
                className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm"
              >
                <span>{getColumnName(sort.colId)}</span>
                <button
                  onClick={() => handleToggleSortDirection(sort.colId)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  {sort.sort === "asc" ? "↑" : "↓"}
                </button>
                <button
                  onClick={() => handleRemoveSort(sort.colId)}
                  className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="relative">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
            title="Add sort"
          >
            <Plus size={16} />
          </button>
          {showSortMenu && (
            <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-10 min-w-[150px]">
              {sortableColumns
                .filter((col) => !sortModel.find((s) => s.colId === col.field))
                .map((col) => (
                  <button
                    key={col.field}
                    onClick={() => handleAddSort(col.field!)}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    {col.headerName || col.field}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex items-center gap-2 border-l border-gray-300 dark:border-gray-600 pl-4">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Filter:
        </span>
        {filterModel.length === 0 ? (
          <span className="text-sm text-gray-500 dark:text-gray-400">None</span>
        ) : (
          <div className="flex items-center gap-2">
            {filterModel.map((filter, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm"
              >
                <span className="font-medium">
                  {getColumnName(filter.colId)}:
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {filter.filter}
                </span>
                <button
                  onClick={() =>
                    onFilterChange(filterModel.filter((_, i) => i !== idx))
                  }
                  className="ml-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="relative">
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
            title="Add filter"
          >
            <Plus size={16} />
          </button>
          {showFilterMenu && (
            <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-10 min-w-[250px] p-3">
              {!filterInput.colId ? (
                <div className="space-y-1">
                  <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Select Column:
                  </div>
                  {sortableColumns.map((col) => (
                    <button
                      key={col.field}
                      onClick={() => handleSelectFilterColumn(col.field!)}
                      className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                    >
                      {col.headerName || col.field}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    Filter {getColumnName(filterInput.colId)}:
                  </div>
                  <input
                    type="text"
                    value={filterInput.value}
                    onChange={(e) =>
                      setFilterInput({ ...filterInput, value: e.target.value })
                    }
                    onKeyDown={(e) => e.key === "Enter" && handleAddFilter()}
                    placeholder="Enter filter value..."
                    className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddFilter}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setFilterInput({ colId: "", value: "" });
                        setShowFilterMenu(false);
                      }}
                      className="px-3 py-1 text-sm bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
