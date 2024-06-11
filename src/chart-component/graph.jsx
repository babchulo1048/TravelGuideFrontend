import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import API_BASE_URL from "../apiConfig";
import axios from "axios";

const ChartComponent = () => {
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    fetchBookingData();
  }, []);

  const fetchBookingData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/book/detail`); // Adjust the URL as per your backend setup
      setBookingData(response.data);
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };
  //   const data = [
  //     { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  //     { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  //     { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  //     { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  //     { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  //     { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
  //     { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
  //   ];

  // Group booking data by date
  const groupedData = bookingData.reduce((acc, booking) => {
    const date = new Date(booking.createdAt).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date]++;
    return acc;
  }, {});

  console.log(" groupedData:", groupedData);

  // Convert grouped data into an array of objects for Rechart
  const chartData = Object.keys(groupedData).map((date) => ({
    name: date,
    bookings: groupedData[date],
  }));

  console.log("chartData:", chartData);

  return (
    <div className="p-6">
      <LineChart width={600} height={300} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis
          label={{
            value: "Number of Orders",
            angle: -90,
            position: "insideLeft",
            dy: 45,
          }}
        />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="bookings" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default ChartComponent;
