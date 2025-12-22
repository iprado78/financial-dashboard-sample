import { ReactNode, useState, useEffect } from "react";
import RGL, { Layout, WidthProvider } from "react-grid-layout";

import "./GridLayout.css";
import "react-grid-layout/css/styles.css";

const ReactGridLayout = WidthProvider(RGL);

// Tailwind breakpoints: sm: 640px, md: 768px, lg: 1024px
const MOBILE_BREAKPOINT = 1024; // Follows right column resizing

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Check on mount
    checkIfMobile();

    // Add resize listener
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // On mobile/tablet: 1 column, full width, no horizontal resize
  const responsiveCols = isMobile ? 1 : cols;
  const responsiveLayout = isMobile
    ? layout.map((item) => ({ ...item, x: 0, w: 1 }))
    : layout;
  const responsiveResizable = isMobile ? false : isResizable;
  const responsiveDraggable = isMobile ? false : isDraggable;
  const responsiveResizeHandles: Array<
    "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne"
  > = isMobile ? ["s"] : resizeHandles;

  // Only propagate layout changes when not in mobile mode
  // This prevents mobile layout from overwriting desktop layout
  const handleLayoutChange = (newLayout: Layout[]) => {
    if (!isMobile && onLayoutChange) {
      onLayoutChange(newLayout);
    }
  };

  return (
    <ReactGridLayout
      className={className}
      layout={responsiveLayout}
      cols={responsiveCols}
      rowHeight={rowHeight}
      isDraggable={responsiveDraggable}
      isResizable={responsiveResizable}
      resizeHandles={responsiveResizeHandles}
      onLayoutChange={handleLayoutChange}
      draggableHandle=".drag-handle"
      containerPadding={[0, 0]}
      margin={[16, 16]}
    >
      {children}
    </ReactGridLayout>
  );
}
