import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import API_BASE_URL from "../apiConfig";

const COLORS = ["#82ca9d", "#ff6347"]; // Specify colors for active and banned users

const PieChartComponent = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [bannedUsers, setBannedUsers] = useState([]);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/active`); // Adjust the URL as per your backend setup
        setActiveUsers(response.data);
      } catch (error) {
        console.error("Error fetching active users:", error);
      }
    };

    fetchActiveUsers();
  }, []);

  useEffect(() => {
    const fetchBannedUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/banned`); // Adjust the URL as per your backend setup
        setBannedUsers(response.data);
      } catch (error) {
        console.error("Error fetching active users:", error);
      }
    };

    fetchBannedUsers();
  }, []);

  const data = [
    { name: "Active Users", value: activeUsers.length },
    { name: "Banned Users", value: bannedUsers.length },
  ];

  return (
    <PieChart width={300} height={300}>
      <Pie
        dataKey="value"
        data={data}
        cx={150}
        cy={150}
        outerRadius={60}
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

export default PieChartComponent;
