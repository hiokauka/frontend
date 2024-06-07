import React, { useState } from 'react';
import { Typography, Grid, Select, MenuItem } from '@mui/material';

const BalanceComponent = ({ height, width }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('Euro');

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const balances = {
    Euro: '€3,000',
    USD: '$2,500',
    MYR: 'RM10,000',
  };

  return (
    <Grid container spacing={3} sx={{ height: 800, width: 800 }}>
      <Grid item xs={12}>
        <Select value={selectedCurrency} onChange={handleCurrencyChange}>
          {Object.keys(balances).map((currency) => (
            <MenuItem key={currency} value={currency}>
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
          {balances[selectedCurrency]}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default BalanceComponent;
