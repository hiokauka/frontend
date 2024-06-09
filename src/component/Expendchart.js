import React, { useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';


export default function ExpensePieChart() {
  const [month, setMonth] = useState('January');
  const [expensesData, setExpensesData] = useState({});

  useEffect(() => {
    const fetchExpensesData = async () => {
      try {
        // Fetch expenses data from the backend
        const response = await axios.get('http://localhost:8080/transactions/{accountId}');
        setExpensesData(response.data);
      } catch (error) {
        console.error('Error fetching expenses data:', error);
      }
    };

    fetchExpensesData();
  }, []);

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const selectedData = expensesData[month] || [];
  const totalExpenses = selectedData.reduce((total, expense) => total + expense.value, 0);

  return (
    <Box
      p="10%"
      sx={{
        backgroundColor: '#ffffff', // Set to white or any color you prefer
        borderRadius: '8px', // Optional: add border radius
        boxShadow: 3, // Optional: add shadow for better visual appearance
      }}
    >
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="month-select-label">Select Month</InputLabel>
        <Select
          labelId="month-select-label"
          id="month-select"
          value={month}
          label="Select Month"
          onChange={handleMonthChange}
        >
          {Object.keys(expensesData).map((monthName) => (
            <MenuItem key={monthName} value={monthName}>
              {monthName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Sickle Expenses Chart */}
      <PieChart
        series={[
          {
            data: selectedData.sickle.map((expense) => ({
              ...expense,
              label: `${expense.label} (${((expense.value / totalExpenses.sickle) * 100).toFixed(1)}%)`
            })),
          },
        ]}
        width={300}
        height={300}
        label={{
          textAnchor: 'middle', // Center the labels horizontally
        }}
      />
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Total Expenses (Sickle): {totalExpenses.sickle}
      </Typography>
      
      {/* Knut Expenses Chart */}
      <PieChart
        series={[
          {
            data: selectedData.knut.map((expense) => ({
              ...expense,
              label: `${expense.label} (${((expense.value / totalExpenses.knut) * 100).toFixed(1)}%)`
            })),
          },
        ]}
        width={300}
        height={300}
        label={{
          textAnchor: 'middle', // Center the labels horizontally
        }}
      />
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Total Expenses (Knut): {totalExpenses.knut}
      </Typography>
      
      {/* Galleon Expenses Chart */}
      <PieChart
        series={[
          {
            data: selectedData.galleon.map((expense) => ({
              ...expense,
              label: `${expense.label} (${((expense.value / totalExpenses.galleon) * 100).toFixed(1)}%)`
            })),
          },
        ]}
        width={300}
        height={300}
        label={{
          textAnchor: 'middle', // Center the labels horizontally
        }}
      />
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Total Expenses (Galleon): {totalExpenses.galleon}
      </Typography>
    </Box>
  );
}
