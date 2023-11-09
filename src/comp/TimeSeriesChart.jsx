import React, { useRef, useEffect } from "react";
import ApexCharts from "react-apexcharts";

const TimeSeriesChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const visitorCountsByDate = new Map();
      data.forEach((booking) => {
        const dateKey = `${booking.arrival_date_month} ${booking.arrival_date_day_of_month}`;
        const visitorCount =
          parseInt(booking.adults) +
          parseInt(booking.children) +
          parseInt(booking.babies);

        if (visitorCountsByDate.has(dateKey)) {
          visitorCountsByDate.set(
            dateKey,
            visitorCountsByDate.get(dateKey) + visitorCount
          );
        } else {
          visitorCountsByDate.set(dateKey, visitorCount);
        }
      });

      const dates = Array.from(visitorCountsByDate.keys());
      const totalVisitorCounts = Array.from(visitorCountsByDate.values());

      const options = {
        chart: {
          id: "time-series-chart",
          toolbar: {
            show: true,
            tools: {
              download: false,
              selection: true,
              zoom: false,
              zoomin: true,
              zoomout: true,
              pan: true,
            },
          },
        },
        xaxis: {
          categories: dates,
          labels: {
            style: {
              colors: "black",
            },
          },
        },
       
        yaxis: {
          labels: {
            style: {
              colors: "black",
            },
          },
        },
        // tooltip: {
        //   enabled: true,
        //   style: {
        //     fontSize: '20px',
        //     fontFamily: 'Roboto',
        //     colors:["#000000"]
        //   },
        //   // theme:'dark'
        // },
        colors: ["#87888A"], // Set the line color to green
      };

      const series = [
        {
          name: "Visitors",
          data: totalVisitorCounts,
        
        },
        
      ];

      const chart = chartRef.current.chart;
      chart.updateOptions(options);
      chart.updateSeries(series);
    }
  }, [data]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Time Series Chart - Number of Visitors Per Day
      </h3>
      <ApexCharts
        ref={chartRef}
        options={{}}
        series={[]}
        type="line"
        markerSettings = {{visible:[`All`]}}
        dataLableSettings = {{visible :['Start','End']}}
        height={450}
        width={1000}
      />
    </div>
  );
};

export default TimeSeriesChart;
