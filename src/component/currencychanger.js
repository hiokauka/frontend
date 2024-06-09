import React, { useState } from 'react';
import { TextField, MenuItem, Button, Typography, Paper } from '@mui/material';
import axios from 'axios';

const currencies = ['Sickle', 'Knut', 'Galleon'];

const CurrencyChanger = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('Sickle');
  const [toCurrency, setToCurrency] = useState('Knut');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [balances, setBalances] = useState({
    Sickle: 0,
    Knut: 0,
    Galleon: 0,
  });

  const handleConvert = async () => {
    if (amount && !isNaN(amount)) {
      try {
        const exchangeRequestDTO = {
          amount: parseFloat(amount),
          fromCurrency,
          toCurrency,
        };
        const response = await axios.post('http://localhost:8080/exchange/convert', exchangeRequestDTO);
        const convertedAmount = response.data.convertedAmount.toFixed(2);
        setConvertedAmount(convertedAmount);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    }
  };

  const handleAdd = async () => {
    if (convertedAmount !== null) {
      const newBalances = { ...balances };
      const newToBalance = newBalances[toCurrency] + parseFloat(convertedAmount);
      const newFromBalance = newBalances[fromCurrency] - parseFloat(amount);
      if (newFromBalance >= 0) {
        newBalances[toCurrency] = newToBalance;
        newBalances[fromCurrency] = newFromBalance;
        setBalances(newBalances);
        setConvertedAmount(null);
        setAmount('');

        // Simulate backend API call to update balances
        try {
          const processExchangeRequestDTO = {
            fromCurrency,
            toCurrency,
            amount: parseFloat(amount),
            convertedAmount: parseFloat(convertedAmount),
          };
          await axios.post('http://localhost:8080/exchange/process', processExchangeRequestDTO);
          console.log('Balances updated successfully.');
        } catch (error) {
          console.error('Error updating balances:', error);
        }
      } else {
        alert('Insufficient balance.');
      }
    }
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Currency Converter
      </Typography>
      <TextField
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        select
        label="From"
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      >
        {currencies.map((currency) => (
          <MenuItem key={currency} value={currency}>
            {currency}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="To"
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      >
        {currencies.map((currency) => (
          <MenuItem key={currency} value={currency}>
            {currency}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" color="primary" onClick={handleConvert} sx={{ mt: 2, mr: 1 }}>
        Convert
      </Button>
      <Button variant="contained" color="primary" onClick={handleAdd} sx={{ mt: 2 }}>
        Add
      </Button>
      {convertedAmount !== null && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </Typography>
      )}
      <Typography variant="body1" sx={{ mt: 2 }}>
        Balances:
      </Typography>
      <ul>
        {Object.entries(balances).map(([currency, balance]) => (
          <li key={currency}>
            {currency}: {balance}
          </li>
        ))}
      </ul>
    </Paper>
  );
};

export default CurrencyChanger;
