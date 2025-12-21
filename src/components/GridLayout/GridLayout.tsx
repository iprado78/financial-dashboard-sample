import { ReactNode } from "react";
import RGL, { Layout, WidthProvider } from "react-grid-layout";

import "./GridLayout.css";
import "react-grid-layout/css/styles.css";

const ReactGridLayout = WidthProvider(RGL);

export interface GridItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
}

interface GridLayoutProps {
  children: ReactNode;
  layout: GridItem[];
  onLayoutChange?: (layout: Layout[]) => void;
  rowHeight?: number;
  cols?: number;
  isDraggable?: boolean;
  isResizable?: boolean;
  className?: string;
  resizeHandles?: Array<"s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne">;
}

export default function GridLayout({
  children,
  layout,
  onLayoutChange,
  rowHeight = 100,
  cols = 12,
  isDraggable = true,
  isResizable = true,
  className = "",
  resizeHandles = ["s", "w", "e", "n", "sw", "nw", "se", "ne"],
}: GridLayoutProps) {
  return (
    <ReactGridLayout
      className={className}
      layout={layout}
      cols={cols}
      rowHeight={rowHeight}
      isDraggable={isDraggable}
      isResizable={isResizable}
      resizeHandles={resizeHandles}
      onLayoutChange={onLayoutChange}
      draggableHandle=".drag-handle"
      containerPadding={[0, 0]}
      margin={[16, 16]}
    >
      {children}
    </ReactGridLayout>
  );
}
