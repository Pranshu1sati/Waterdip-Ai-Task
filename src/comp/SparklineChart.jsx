import React from "react";
import ReactApexChart from "react-apexcharts";

const SparklineChart = ({ adultsData, childrenData }) => {
  const dayLabels = Array.from(
    { length: adultsData.length },
    (_, index) => `Day ${index + 1}`
  );

  const options = {
    chart: {
      id: "sparkline-chart",
      animations: {
        enabled: false,
      },
    },
    xaxis: {
      categories: dayLabels,
      labels: {
        style: {
          colors: "black", 
        },
      },
    },
    yaxis: {
      show: false,
    },
    stroke: {
      curve: "smooth",
    },
    sparkline: {
      enabled: true,
    },
  };

  const series = [
    {
      name: "Adults",
      data: adultsData,
    },
    {
      name: "Children",
      data: childrenData,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-4 dark:text-white">
        Sparkline Charts
      </h3>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={650}
        width={1000}
      />
    </div>
  );
};

export default SparklineChart;
