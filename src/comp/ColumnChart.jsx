import React from 'react';
import ApexChart from 'react-apexcharts';

const ColumnChart = ({ data }) => {
  const countries = [...new Set(data.map((booking) => booking.country))];
  const visitorsPerCountry = countries.map((country) => ({
    name: country,
    data: data.filter((booking) => booking.country === country).length,
  }));

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      foreColor: 'black', 
      background: 'transparent', 
    },
    xaxis: {
      categories: visitorsPerCountry.map((item) => item.name),
      labels: {
        style: {
          colors: 'black', 
        },
      },
    },
    fill:{
      colors :["#87888A"]
    },
    dataLabels: {
      enabled : false
    }

  };

  const seriesData = [
    {
      name: 'Visitors',
      data: visitorsPerCountry.map((item) => item.data),
    },
  ];

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-2">Column Chart - Number of Visitors Per Country</h2>
      {data.length > 0 ? (
        <ApexChart options={chartOptions} series={seriesData} type="bar" 
        height={650}
        width={1000} />
      ) : (
        <p className="text-white">No data available for the selected date range.</p>
      )}
    </div>
  );
};

export default ColumnChart;
