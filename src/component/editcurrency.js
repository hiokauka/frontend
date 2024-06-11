import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import CurrencyChanger from './currencychanger';
import axios from 'axios';

export default function Dashboard() {
  const [currencies, setCurrencies] = useState([]);
  const [open, setOpen] = useState(false);
  const [newCurrency, setNewCurrency] = useState('');
  const [newRate, setNewRate] = useState('');

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/currencies');
      setCurrencies(response.data);
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
  };

  const handleAddCurrency = async () => {
    try {
      const response = await axios.post('http://localhost:8080/currencies', {
        currency: newCurrency,
        rate: parseFloat(newRate),
      });
      console.log('New currency added:', response.data);
      // Reset form fields and close the dialog
      setNewCurrency('');
      setNewRate('');
      setOpen(false);
      // Fetch updated currency list
      fetchCurrencies();
    } catch (error) {
      console.error('Error adding new currency:', error);
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 2 }}>
        
      </Paper>
      <Button onClick={() => setOpen(true)} variant="contained" color="primary">
        Add Currency
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Currency</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the currency name and rate:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="currency"
            label="Currency"
            type="text"
            fullWidth
            value={newCurrency}
            onChange={(e) => setNewCurrency(e.target.value)}
          />
          <TextField
            margin="dense"
            id="rate"
            label="Rate"
            type="number"
            fullWidth
            value={newRate}
            onChange={(e) => setNewRate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddCurrency} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
