import DatePicker from "react-datepicker";
import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import TimeSeriesChart from "./TimeSeriesChart";
import ColumnChart from "./ColumnChart";
import hotelData from "../data.json";
import SparklineChart from "./SparklineChart";

const SelectDate = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  // console.log(hotelData)
  useEffect(() => {
    // Set start and end dates to August 15, 2015, on component load
    const initialStartDate = new Date(2015, 6, 15); // Note: Months are zero-based (7 represents August)
    const initialEndDate = new Date(2015, 9, 15);

    setStartDate(initialStartDate);
    setEndDate(initialEndDate);

    // Set filtered data initially with the default date range
    const filtered = hotelData.filter((booking) => {
      const bookingDate = new Date(
        booking.arrival_date_year,
        getMonthNumber(booking.arrival_date_month),
        booking.arrival_date_day_of_month
      );
      return bookingDate >= initialStartDate && bookingDate <= initialEndDate;
    });
    setFilteredData(filtered);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = hotelData.filter((booking) => {
        const bookingDate = new Date(
          booking.arrival_date_year,
          getMonthNumber(booking.arrival_date_month),
          booking.arrival_date_day_of_month
        );
        return (
          bookingDate >= new Date(startDate) && bookingDate <= new Date(endDate)
        );
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(hotelData);
    }
  }, [startDate, endDate]);

  const handleApplyFilter = () => {
    setIsFilterApplied(true);
  };

  const getMonthNumber = (month) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months.indexOf(month);
  };

  return (
    <div className="p-6 text-center">
      <div className="text-center py-12 pb-16">
        <h1 className="text-4xl font-bold text-blue-500">WaterDip Dashboard Task</h1>
      </div>
      <p className="text-gray-500 m-4">
        Enter date ranging between 01/07/2015 to 09/08/2015
      </p>{" "}
      <div
        className="flex space-x-4 mb-4 justify-center pb-10"
        style={{ textAlign: "center" }}
      >
        <label htmlFor="std">Select Start Date:</label>
        <DatePicker
          className="bg-gray-800 border border-gray-500 p-2 rounded-2xl focus:outline-none focus:border-blue-500"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
          id="std"
        />
        <label htmlFor="ed">Select End Date:</label>
        <DatePicker
          className="bg-gray-800 border border-gray-500 rounded-2xl p-2 focus:outline-none focus:border-blue-500"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
          id="ed"
        />
        
        <br/>

        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            transition: "opacity 0.3s ease-in-out",
            outline: "none",
            marginTop: "10px", // Adjust the margin top as needed
          }}
          onClick={handleApplyFilter}
          onMouseOver={(e) => (e.currentTarget.style.opacity = 0.8)}
          onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
          onFocus={(e) => e.currentTarget.blur()}
        >
          Select Date Range
        </button>
      </div>
      {isFilterApplied && (
        <div className="space-y-4">
          <TimeSeriesChart data={filteredData} />
          <ColumnChart data={filteredData} />
          <SparklineChart
            adultsData={filteredData.map((booking) =>
              parseInt(booking.adults, 10)
            )}
            childrenData={filteredData.map((booking) =>
              parseInt(booking.children, 10)
            )}
          />
        </div>
      )}
    </div>
  );
};

export default SelectDate;
