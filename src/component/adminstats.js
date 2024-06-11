import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';

export default function Statistics() {
  const [statisticsData, setStatisticsData] = useState({
    totalUsers: null,
    transactionsPerDay: null,
    revenueThisMonth: null,
  });

  useEffect(() => {
    const fetchStatisticsData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/accounts/count');
        setStatisticsData(response.data);
      } catch (error) {
        console.error('Error fetching statistics data:', error);
      }
    };

    fetchStatisticsData();
  }, []);

  return (
    <Grid container spacing={3}>
      {/* Total number of users */}
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Total Users
          </Typography>
          <Typography variant="h4">{statisticsData.totalUsers}</Typography>
        </Paper>
      </Grid>

      {/* Number of transactions per day */}
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Transactions per Day
          </Typography>
          <Typography variant="h4">{statisticsData.transactionsPerDay}</Typography>
        </Paper>
      </Grid>

    

      {/* Add more statistics as needed */}
    </Grid>
  );
}
