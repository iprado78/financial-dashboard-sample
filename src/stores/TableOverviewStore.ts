import { useLocalStorage } from "@/utils/useLocalStorage";
import { create } from "zustand";
import { GridItem } from "@/components/GridLayout/GridLayout";

type State = {
  selectedTables: string[];
  layout: GridItem[];
};

interface Actions {
  actions: {
    setSelectedTables: (tables: string[]) => void;
    setLayout: (layout: GridItem[]) => void;
    addTable: (tableName: string) => void;
    removeTable: (tableName: string) => void;
  };
}

const getInitialState = (): State => {
  const { getNestedValue } = useLocalStorage("tableOverviewSettings");
  const selectedTables = getNestedValue(["selectedTables"]) || [];
  const layout = getNestedValue(["layout"]) || [];
  return { selectedTables, layout };
};

const useTableOverviewStore = create<State & Actions>((set) => {
  const { setNestedValue } = useLocalStorage("tableOverviewSettings");
  const initialState = getInitialState();

  return {
    selectedTables: initialState.selectedTables,
    layout: initialState.layout,
    actions: {
      setSelectedTables: (tables) => {
        setNestedValue(["selectedTables"], tables);
        set({ selectedTables: tables });
      },
      setLayout: (layout) => {
        setNestedValue(["layout"], layout);
        set({ layout });
      },
      addTable: (tableName) => {
        set((state) => {
          const newSelectedTables = [...state.selectedTables, tableName];
          setNestedValue(["selectedTables"], newSelectedTables);

          // Add new grid item for this table
          const index = state.selectedTables.length;
          const col = (index % 2) * 6;
          const row = Math.floor(index / 2) * 6;
          const newLayout = [
            ...state.layout,
            { i: tableName, x: col, y: row, w: 6, h: 6, minW: 6, minH: 6 },
          ];
          setNestedValue(["layout"], newLayout);

          return {
            selectedTables: newSelectedTables,
            layout: newLayout,
          };
        });
      },
      removeTable: (tableName) => {
        set((state) => {
          const newSelectedTables = state.selectedTables.filter(
            (t) => t !== tableName
          );
          const newLayout = state.layout.filter((item) => item.i !== tableName);
          setNestedValue(["selectedTables"], newSelectedTables);
          setNestedValue(["layout"], newLayout);

          return {
            selectedTables: newSelectedTables,
            layout: newLayout,
          };
        });
      },
    },
  };
});

// MARK: State
export const useSelectedTables = () =>
  useTableOverviewStore((state) => state.selectedTables);
export const useTableLayout = () =>
  useTableOverviewStore((state) => state.layout);

// MARK: Actions
export const setSelectedTables = (tables: string[]) =>
  useTableOverviewStore.getState().actions.setSelectedTables(tables);
export const setTableLayout = (layout: GridItem[]) =>
  useTableOverviewStore.getState().actions.setLayout(layout);
export const addTable = (tableName: string) =>
  useTableOverviewStore.getState().actions.addTable(tableName);
export const removeTable = (tableName: string) =>
  useTableOverviewStore.getState().actions.removeTable(tableName);
