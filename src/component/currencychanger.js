import React, { useState } from 'react';
import { TextField, MenuItem, Button, Typography, Paper } from '@mui/material';

const exchangeRates = {
  MYR: { Knut: 0.23, Galleon: 0.21, Sickle: 1 },
  USD: { Sickle: 4.35, Galleon: 0.91, Knut: 1 },
  EUR: { Sickle: 4.79, Knut: 1.10, Galleon: 1 },
};

const currencies = ['Sickle', 'Knut', 'Galleon'];

const CurrencyChanger = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('MYR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [balances, setBalances] = useState({
    Sickle: 0,
    Knut: 0,
    Galleon: 0,
  });

  const handleConvert = () => {
    if (amount && !isNaN(amount)) {
      const rate = exchangeRates[fromCurrency][toCurrency];
      const converted = parseFloat((amount * rate).toFixed(2));
      setConvertedAmount(converted);
    }
  };

  const handleAdd = () => {
    if (convertedAmount !== null) {
      const updatedBalances = { ...balances };
      updatedBalances[toCurrency] += convertedAmount;
      updatedBalances[fromCurrency] -= parseFloat(amount);
      setBalances(updatedBalances);
      setConvertedAmount(null);
      setAmount('');
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
