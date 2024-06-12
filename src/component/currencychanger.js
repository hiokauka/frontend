import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

const CurrencyChanger = () => {
  const [amount, setAmount] = useState('');
  const [Currencies, setCurrency] = useState([]);
  const [fromCurrency, setFromCurrency] = useState({});
  const [toCurrency, setToCurrency] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [processingFees, setProcessingFees] = useState(null);
  const [showProcess, setShowProcess] = useState(false);
  const [conversionDetails, setConversionDetails] = useState('');
  const [balances, setBalances] = useState({});
  const exchangeURL = 'http://localhost:8080/exchange/convert';
  const processExchangeUrl = 'http://localhost:8080/exchange/process';
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  useEffect(() => {
    const currenciesURL = 'http://localhost:8080/currencies/all';
    const fetchData = async () => {
      try {
        const response = await axios.get(currenciesURL);
        setCurrency(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleCurrencyChange1 = (event) => {
    const selectedIndex = event.target.value;
    event.target.value = Currencies[selectedIndex];
    setFromCurrency(Currencies[selectedIndex]);
  };

  const handleCurrencyChange2 = (event) => {
    const selectedIndex = event.target.value;
    event.target.value = Currencies[selectedIndex];
    setToCurrency(Currencies[selectedIndex]);
  };

  const handleConvert = async () => {
    try {
      const requestData = {
        fromCurrencyID: fromCurrency.currencyID,
        toCurrencyID: toCurrency.currencyID,
        initialAmount: parseFloat(amount)
      };

      const response = await axios.post(exchangeURL, requestData);
      const exchangeData = response.data;

      if (exchangeData) {
        const initialAmount = exchangeData.initialAmount;
        const fees = exchangeData.totalProcessingFee.toFixed(2);
        const convertedAmount = exchangeData.exchangedAmount;

        setProcessingFees(fees);
        setConvertedAmount(convertedAmount);
        setConversionDetails(
          `${initialAmount} ${fromCurrency.name} = ${convertedAmount} ${toCurrency.name}, total processing fees = ${fees} ${fromCurrency.name}`
        );

        setShowProcess(true);
      }
    } catch (error) {
      console.error('Error fetching exchange data:', error);
    }
  };

  const handleProcess = async () => {
    try {
      const processExchangeRequestDTO = {
        accountID: localStorage.getItem('accountID'),
        fromCurrencyID: fromCurrency.currencyID,
        toCurrencyID: toCurrency.currencyID,
        initialAmount: parseFloat(amount)
      };

      const response = await axios.post(processExchangeUrl, processExchangeRequestDTO);
      const result = response.data;

      setOpenDialog(true);
      setDialogMessage(result);
    } catch (error) {
      console.error('Error processing exchange:', error);
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
        value={fromCurrency.id}
        onChange={handleCurrencyChange1}
        fullWidth
        margin="normal"
        variant="outlined"
      >
        {Currencies.map((currency, index) => (
          <MenuItem key={index} value={index}>
            {currency.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="To"
        value={toCurrency.id}
        onChange={handleCurrencyChange2}
        fullWidth
        margin="normal"
        variant="outlined"
      >
        {Currencies.map((currency, index) => (
          <MenuItem key={index} value={index}>
            {currency.name}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" color="primary" onClick={handleConvert} sx={{ mt: 2, mr: 1 }}>
        Convert
      </Button>
      {showProcess && (
        <>
          <Typography variant="body1" gutterBottom>
            {conversionDetails}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleProcess} sx={{ mt: 2 }}>
            Process
          </Button>
        </>
      )}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Conversion Status</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CurrencyChanger;
