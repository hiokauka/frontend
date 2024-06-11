import React, { useState, useEffect } from 'react';
import { Typography, Grid, Select, MenuItem, Box } from '@mui/material';
import axios from 'axios';

const BalanceComponent = ({ height, width }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch currencies
        const currencyResponse = await axios.get('http://localhost:8080/currencies');
        const currenciesData = currencyResponse.data;
        // Extract currency names from the response
        const currencyNames = currenciesData.map(currency => currency.name);
        // Set the currencies state with the fetched currency names
        setCurrencies(currencyNames);

        // Fetch balances
        const userId = localStorage.getItem('accountId');
        const balanceResponses = await Promise.all(
          currenciesData.map(currency => axios.get(`http://localhost:8080/balances/${userId}/${currency.currencyId}`))
        );
        // Extract balances from the response
        const balancesData = balanceResponses.map(response => response.data.balance);
        // Set the balances state with the fetched balances
        setBalances(balancesData);

        // Set the default selected currency as the first currency
        setSelectedCurrency(currencyNames[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error: display error message or redirect to error page
      }
    };

    fetchData();
  }, []);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <Box
      sx={{
        height: height || 'auto',
        width: '300px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: 3,
        backgroundColor: 'white',
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Select value={selectedCurrency} onChange={handleCurrencyChange} fullWidth>
            {currencies.map((currency, index) => (
              <MenuItem key={index} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
            {selectedCurrency}
          </Typography>
          <Typography variant="h2" gutterBottom sx={{ fontSize: '3rem' }}>
            {balances[currencies.indexOf(selectedCurrency)]}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BalanceComponent;
