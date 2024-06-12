import React, { useState, useEffect } from 'react';
import { Typography, Grid, Select, MenuItem, Box } from '@mui/material';
import axios from 'axios';

const BalanceComponent = ({ height, width }) => {

  const [balances, setBalances] = useState([]);
  const [selectedBalanceIndex, setSelectedBalanceIndex] = useState(0);
  const [selectedBalance, setSelectedBalance] = useState();
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [selectedCurrencyAbbreviation, setSelectedCurrencyAbbreviation] = useState();

  const fetchData = async () => {

    try {

      // Fetch currencies
      const response = await axios.get('http://localhost:8080/balances/' + localStorage.getItem('accountID'));
      setBalances(response.data)

      // Extract currency names from the response
      // const currencyNames = currenciesData.map(currency => currency.name);
      // Set the currencies state with the fetched currency names
      // setCurrencies(currencyNames);

      // // Fetch balances
      // const userId = localStorage.getItem('accountId');
      // const balanceResponses = await Promise.all(
      //   currenciesData.map(currency => axios.get(`http://localhost:8080/balances/${userId}/${currency.currencyID}`))
      // );
      // // Extract balances from the response
      // const balancesData = balanceResponses.map(response => response.data.balance);
      // Set the balances state with the fetched balances
      // setBalances(balancesData);

      // Set the default selected currency as the first currency

      setSelectedCurrency(balances[0].currency.name); // Set default to the first currency name
      setSelectedBalance(balances[0].balance);

    } catch (error) {

      console.error('Error fetching data:', error);

      // Handle error: display error message or redirect to error page

    }

  };

  useEffect(() => {


    fetchData();

  }, []);

  

  const handleCurrencyChange = (event) => {

    const selectedIndex = event.target.value;
    setSelectedCurrency(balances[selectedIndex].currency.name);
    // setSelectedBalanceIndex(selectedIndex);
    setSelectedBalance(balances[selectedIndex].balance.toFixed(2));
    setSelectedCurrencyAbbreviation(balances[selectedIndex].currency.abbreviation);

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
            {balances.map((balance, index) => (
              <MenuItem id='menu-item' key={index} value={index}>
                {balance.currency.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
            {selectedCurrency}
          </Typography>
          <Typography variant="h2" gutterBottom sx={{ fontSize: '3rem' }}>
            {selectedBalance} {selectedCurrencyAbbreviation}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BalanceComponent;
