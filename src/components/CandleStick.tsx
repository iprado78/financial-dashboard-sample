import { useIsDarkMode } from "@/stores/DarkModeStore";
import {
  AgChartInstance,
  AgFinancialChartOptions,
  AgPriceVolumeChartType,
} from "ag-charts-enterprise";
import { AgFinancialCharts } from "ag-charts-react";
import { useEffect, useRef, useState } from "react";

import "ag-charts-enterprise";

type CandleStickEntry = [number, number, number, number, number];

interface CandleStickProps {
  title: string;
  data: CandleStickEntry[];
  symbol?: string;
  height?: number;
  width?: string;
}

export default function CandleStick({
  height,
  title,
  data,
  width = "100%",
}: CandleStickProps) {
  const chartRef = useRef<AgChartInstance>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDarkMode = useIsDarkMode();
  const [containerHeight, setContainerHeight] = useState(height || 500);

  const getData = (rawData: CandleStickEntry[]) => {
    return rawData.map((item) => ({
      date: new Date(item[0]),
      open: item[1],
      high: item[2],
      low: item[3],
      close: item[4],
      volume: Math.random() * 1000 + 100,
    }));
  };

  const [options, setOptions] = useState<AgFinancialChartOptions>({
    data: getData(data),
    title: { text: title },
    chartType: "candlestick" as AgPriceVolumeChartType,
    navigator: true,
    toolbar: true,
    rangeButtons: true,
    volume: true,
    statusBar: true,
    zoom: true,
    height: containerHeight,
    theme: isDarkMode ? "ag-financial-dark" : "ag-financial",
  });

  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      theme: isDarkMode ? "ag-financial-dark" : "ag-financial",
    }));
  }, [isDarkMode]);

  useEffect(() => {
    if (!height && containerRef.current) {
      // Use requestAnimationFrame to wait for layout to settle
      const timeoutId = setTimeout(() => {
        if (containerRef.current) {
          const initialHeight = containerRef.current.clientHeight;
          if (initialHeight > 0) {
            setContainerHeight(initialHeight);
          }
        }
      }, 0);

      const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry && entry.contentRect.height > 0) {
          setContainerHeight(entry.contentRect.height);
        }
      });
      resizeObserver.observe(containerRef.current);

      return () => {
        clearTimeout(timeoutId);
        resizeObserver.disconnect();
      };
    }
  }, [height]);

  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      height: containerHeight,
    }));
  }, [containerHeight]);

  return (
    <div
      ref={containerRef}
      style={height ? { width, height: `${height}px` } : { width }}
      className={height ? "" : "h-full"}
    >
      <AgFinancialCharts options={options} ref={chartRef} />
    </div>
  );
}
