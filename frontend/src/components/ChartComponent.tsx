import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const ChartComponent = ({ chartOptions }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && chartOptions) {
      const chart = new ApexCharts(chartRef.current, chartOptions);
      chart.render();
      return () => chart.destroy(); // Clean up chart when component unmounts
    }
  }, [chartOptions]);

  return <div ref={chartRef}></div>;
};

export default ChartComponent;
