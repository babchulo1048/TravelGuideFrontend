import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import API_BASE_URL from "../apiConfig";

const COLORS = ["#82ca9d", "#ff6347"]; // Specify colors for active and banned users

const GuidePieChartComponent = () => {
  const [activeUserGuides, setActiveUserGuides] = useState([]);
  const [bannedUserGuides, setBannedUserGuides] = useState([]);

  useEffect(() => {
    const fetchActiveUserGuides = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/guide/active`); // Adjust the URL as per your backend setup
        setActiveUserGuides(response.data);
      } catch (error) {
        console.error("Error fetching active userGuides:", error);
      }
    };

    fetchActiveUserGuides();
  }, []);

  useEffect(() => {
    const fetchBannedUserGuides = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/guide/banned`); // Adjust the URL as per your backend setup
        setBannedUserGuides(response.data);
      } catch (error) {
        console.error("Error fetching active userGuides:", error);
      }
    };

    fetchBannedUserGuides();
  }, []);

  const data = [
    { name: "Active TourGuides", value: activeUserGuides.length },
    { name: "Banned TourGuides", value: bannedUserGuides.length },
  ];

  return (
    <PieChart width={300} height={300}>
      {" "}
      {/* Decrease width and height here */}
      <Pie
        dataKey="value"
        data={data}
        cx={150} // Adjust cx and cy to center the pie
        cy={150}
        outerRadius={60} // Adjust outer radius to decrease size
        label
        fill="#8884d8"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};
export default GuidePieChartComponent;
