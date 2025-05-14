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

import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import userStore from "./UserStore";

const url: string = `${import.meta.env.VITE_API_URL}/UserActivity`;

const UserActivityGraphs: React.FC = () => {
  const [monthlyData, setMonthlyData] = useState<{ day: number; visits: number }[]>([]);
  const [yearlyData, setYearlyData] = useState<{ month: string; visits: number }[]>([]);

  const userId = userStore.getUserId();
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);

  useEffect(() => {
    if (userId) {
      fetchMonthlyUsage(userId, selectedYear, selectedMonth);
    }
  }, [userId, selectedYear, selectedMonth]);

  useEffect(() => {
    if (userId) {
      fetchYearlyUsage(userId, selectedYear);
    }
  }, [userId, selectedYear]);

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

  const handlePreviousMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(prev => prev + 1);
    } else {
      setSelectedMonth(prev => prev + 1);
    }
  };

  const handlePreviousYear = () => {
    setSelectedYear(prev => prev - 1);
  };

  const handleNextYear = () => {
    setSelectedYear(prev => prev + 1);
  };

  return (
    <Box display={{ xs: 'block', md: 'flex' }} justifyContent="space-between" p={2} width={"100%"}>
      {/* Monthly Activity */}
      <Box flex={1} mr={{ md: 1 }} sx={{backgroundColor: "#f0f0f045", padding: 2, borderRadius: 2}}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
          <IconButton onClick={handlePreviousMonth} sx={{color: "#016e6e"}}><ArrowBackIos /></IconButton>
          <Typography variant="h6" sx={{color: "#016e6e"}}>
            Monthly Activity  {selectedMonth}/{selectedYear}
          </Typography>
          <IconButton onClick={handleNextMonth} sx={{color: "#016e6e"}}><ArrowForwardIos /></IconButton>
        </Box>

        <ResponsiveContainer width={"100%"} height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" angle={-45} textAnchor="end" fontSize={10} />
            <YAxis domain={[0, 'dataMax']} />
            <Tooltip />
            <Legend />
            <Bar dataKey="visits" fill="#016e6e" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Yearly Activity */}
      <Box flex={1} ml={{ md: 1 }} sx={{backgroundColor: "#f0f0f045", padding: 2, borderRadius: 2}}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
          <IconButton onClick={handlePreviousYear} sx={{color: "#579FBA"}}><ArrowBackIos /></IconButton>
          <Typography variant="h6" sx={{color: "#579FBA"}}>
            Yearly Activity {selectedYear}
          </Typography>
          <IconButton onClick={handleNextYear}><ArrowForwardIos /></IconButton>
        </Box>

        <ResponsiveContainer width={"100%"} height={300}>
          <LineChart data={yearlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" angle={-45} textAnchor="end" fontSize={10} />
            <YAxis domain={[0, 'dataMax']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="visits" stroke="#579FBA" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default UserActivityGraphs;
