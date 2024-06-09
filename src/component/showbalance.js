import React, { useState } from 'react';
import { Typography, Grid, Select, MenuItem, Box } from '@mui/material';

const BalanceComponent = ({ height, width }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('Euro');
  const [balances, setBalances] = useState({});

  useEffect(() => {
    // Fetch balances from backend upon component mount
    fetchBalances();
  }, []);

  const fetchBalances = async () => {
    try {
      const response = await axios.get('http://localhost:8080/balances/{accountId}/{currencyId}');
      setBalances(response.data);
    } catch (error) {
      console.error('Error fetching balances:', error);
      // Handle error: display error message or redirect to error page
    }
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };


  return (
    <Box
      sx={{
        height: height || 'auto', // Set height to the passed prop or 'auto'
        width: width || 'auto',   // Set width to the passed prop or 'auto'
        border: '1px solid #ccc', // Add border to the box
        borderRadius: '8px',      // Optional: Add border-radius for rounded corners
        padding: '16px',          // Add padding inside the box
        boxShadow: 3,             // Optional: Add box-shadow for a subtle effect
        backgroundColor: 'white', // Set background color to white
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Select value={selectedCurrency} onChange={handleCurrencyChange} fullWidth>
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
    </Box>
  );
};

export default BalanceComponent;
