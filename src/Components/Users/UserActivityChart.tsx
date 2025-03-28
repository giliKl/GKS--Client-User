import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import axios from "axios";
import { Box, Typography } from '@mui/material'; 
import userStore from "./UserStore";

const url: string = `http://localhost:3000/api/UserActivity`;
const UserActivityGraphs: React.FC = () => {
  const [monthlyData, setMonthlyData] = useState<{ day: number; visits: number }[]>([]);
  const [yearlyData, setYearlyData] = useState<{ month: string; visits: number }[]>([]);
  
  const userId = userStore.getUserId();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    if (userId) {
      fetchMonthlyUsage(userId, currentYear, currentMonth);
      fetchYearlyUsage(userId, currentYear);
    }
  }, [userId, currentYear, currentMonth]);

  const fetchMonthlyUsage = async (userId: number, year: number, month: number): Promise<void> => {
    try {
      const response = await axios.get<Record<string, number>>(
        `${url}/user-monthly-usage/${userId}`,
        {
          params: { year, month },
        }
      );

      const data = Array.from({ length: 31 }, (_, i) => ({
        day: i + 1,
        visits: response.data[i + 1] || 0,
      }));

      setMonthlyData(data);
    } catch (error) {
      console.error("Failed to fetch monthly usage:", error);
    }
  };

  const fetchYearlyUsage = async (userId: number, year: number): Promise<void> => {
    try {
      const response = await axios.get<Record<string, number>>(`${url}/user-yearly-usage/${userId}`, {
        params: { year },
      });

      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      
      const data = Array.from({ length: 12 }, (_, i) => ({
        month: monthNames[i],
        visits: response.data[i + 1] || 0,
      }));
     
      setYearlyData(data);
    } catch (error) {
      console.error("Failed to fetch yearly usage:", error);
    }
  };

  return (
    <Box display={{ xs: 'block', md: 'flex' }} justifyContent="space-between" p={2} width={"100%"}>
      <Box flex={1} mr={{ md: 1 }}>
        <Typography variant="h6" align="left" paddingLeft={10}>Monthly Activity</Typography>
        <ResponsiveContainer width={"100%"} height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" angle={-45} textAnchor="end" fontSize={10} />
            <YAxis domain={[0, 'dataMax']} />
            <Tooltip />
            <Legend />
            <Bar dataKey="visits" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Box flex={1} ml={{ md: 1 }}>
        <Typography variant="h6" align="left" paddingLeft={10}>Yearly Activity</Typography>
        <ResponsiveContainer width={"100%"} height={300}>
          <LineChart data={yearlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" angle={-45} textAnchor="end" fontSize={10}  />
            <YAxis domain={[0, 'dataMax']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="visits" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default UserActivityGraphs;
