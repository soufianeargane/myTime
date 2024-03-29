import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

interface ChartOptions {
  chart: {
    type: string;
    height: number;
  };
  series: Array<{
    name: string;
    data: number[];
  }>;
  xaxis: {
    categories: string[];
  };
}

const LineChart = ({ chartOptions }: { chartOptions: ChartOptions }) => {
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

export default LineChart;
