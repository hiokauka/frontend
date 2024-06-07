import React, { useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const expensesData = {
  January: [
    { id: 0, value: 30, label: 'Food' },
    { id: 1, value: 25, label: 'Entertainment' },
    { id: 2, value: 20, label: 'Utilities' },
    { id: 3, value: 25, label: 'Rent' },
    { id: 4, value: 15, label: 'Transportation' },
    { id: 5, value: 10, label: 'Healthcare' },
    { id: 6, value: 5, label: 'Education' },
  ],
};

export default function ExpensePieChart() {
  const [month, setMonth] = useState('January');

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const selectedData = expensesData[month] || [];
  const totalExpenses = selectedData.reduce((total, expense) => total + expense.value, 0);

  return (
    <Box p="10%">
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
      <PieChart
        series={[
          {
            data: selectedData.map((expense) => ({
              ...expense,
              label: `${expense.label} (${((expense.value / totalExpenses) * 100).toFixed(1)}%)`
            })),
          },
        ]}
        width={700}
        height={500}
        label={{
          textAnchor: 'middle', // Center the labels horizontally
        }}
      />
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Total Expenses: ${totalExpenses}
      </Typography>
    </Box>
  );
}
