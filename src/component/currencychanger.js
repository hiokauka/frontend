import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button, Typography, Paper } from '@mui/material';
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
    if (fromCurrency && Object.keys(fromCurrency).length > 0) {
      console.log('fromCurrency:', fromCurrency);
      // You can also render something based on this condition
    } else {
      console.log('fromCurrency is not set properly');
    }
    
  };
  
  const handleCurrencyChange2 = (event) => {
    const selectedIndex = event.target.value;
    event.target.value = Currencies[selectedIndex];
    setToCurrency(Currencies[selectedIndex]);
    if (toCurrency && Object.keys(toCurrency).length > 0) {
      console.log('toCurrency:', toCurrency);
      // You can also render something based on this condition
    } else {
      console.log('toCurrency is not set properly');
    }
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
      console.log('Exchange Data:', exchangeData);

      if (exchangeData) {
        const initialAmount = exchangeData.initialAmount;
        const exchangeRate = exchangeData.exchangedamount;
        const fees = exchangeData.totalProcessingFee;
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
    
    const processExchangeRequestDTO = {

      "accountID": localStorage.getItem('accountID'),
      "fromCurrencyID": fromCurrency.currencyID,
      "toCurrencyID": toCurrency.currencyID,
      "initialAmount": parseFloat(amount)

    };

    const response = await axios.post(processExchangeUrl, processExchangeRequestDTO);

    const result = response.data;
    console.log(result);

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
    </Paper>
  );
};

export default CurrencyChanger;
