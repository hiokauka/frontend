import React, { useState } from 'react';
import { TextField, MenuItem, Button, Typography, Paper } from '@mui/material';

const exchangeRates = {
  MYR: { USD: 0.23, EUR: 0.21, MYR: 1 },
  USD: { MYR: 4.35, EUR: 0.91, USD: 1 },
  EUR: { MYR: 4.79, USD: 1.10, EUR: 1 },
};

const currencies = ['MYR', 'USD', 'EUR'];

const CurrencyChanger = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('MYR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleConvert = () => {
    if (amount && !isNaN(amount)) {
      const rate = exchangeRates[fromCurrency][toCurrency];
      setConvertedAmount((amount * rate).toFixed(2));
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
      <Button variant="contained" color="primary" onClick={handleConvert} sx={{ mt: 2 }}>
        Convert
      </Button>
      {convertedAmount !== null && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </Typography>
      )}
    </Paper>
  );
};

export default CurrencyChanger;
