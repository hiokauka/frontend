import React, { Component } from 'react';

import {
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
} from '@mui/material';

import axios from 'axios';

class TransferOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionTransfer: {
        type: '',
        fromAccountId: '',
        toAccountId: '',
        paymentMethod: '',
        cardId: '',
        amount: '',
        currencyId: '',
        category: '',
        description: '',
        securityPIN: '',
      },
      fetchedPin: '',
      successDialogOpen: false,
      notificationOpen: false,
      accountFound: false,
      searchResults: [], // New state variable to store search results
      selectedAccount: null, // New state variable to store selected account
      targetAccount: null
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      transactionTransfer: {
        ...prevState.transactionTransfer,
        [name]: value,
      },
    }));
  };

  handleSearchSubmit = async (event) => {
    event.preventDefault();
    const { transactionTransfer } = this.state;
    const { searchQuery } = transactionTransfer;
    
    try {
      const response = await axios.get(`http://localhost:8080/accounts/search?fullName=${searchQuery}`);
      const searchResults = response.data;

      if (searchResults.length === 0) {

        try {

          const response = await axios.get(`http://localhost:8080/accounts/search?telephoneNumber=${searchQuery}`);
          const searchResults = response.data;

          if (searchResults.length === 0) {
            alert('No account found');

            return;

          } else {

            this.setState({ searchResults });

          }

        } catch (error) {

          alert('There was an error while searching for accounts, please try again.', error);

          return;
          
        }
        
      } else {

        this.setState({ searchResults });

      }
      
    } catch (error) {

      console.error('There was an error while searching for accounts, please try again.', error);

    }

  };

  handleAccountSelect = async (account) => {

    await this.setState({ selectedAccount: account });

    const { selectedAccount } = this.state;

  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { pin, fetchedPin, transactionTransfer } = this.state;
    const { amount, currency } = transactionTransfer;
    
    if (pin !== fetchedPin) {
      alert('Invalid PIN');
      return;
    }

    try {
      // Simulating the transfer process
      // Here, you would send the transfer details to your backend API
      console.log('Transfer details:', transactionTransfer);
      
      // After successful transfer, open success dialog
      this.setState({ successDialogOpen: true });
    } catch (error) {
      console.error('There was an error submitting the form:', error);
    }
  };

  handleSuccessDialogClose = () => {
    this.setState({ successDialogOpen: false });
  };

  handlePrintReceipt = () => {
    console.log('Downloading receipt...');
    // Here, you would implement the logic to download the receipt
  };

  handleNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ notificationOpen: false });
  };

  render() {
    const { transactionTransfer, fetchedPin, successDialogOpen, notificationOpen, searchResults, selectedAccount } = this.state;

    return (
      <div>
        {/* First Box */}
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Find Account
          </Typography>
          <form onSubmit={this.handleSearchSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="searchQuery"
                  name="searchQuery"
                  label="Search for Name or Telephone Number"
                  fullWidth
                  value={transactionTransfer.searchQuery}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
              Find Account
            </Button>
          </form>
        </Paper>

        {/* Display search results */}
        {searchResults.length > 0 && (
          <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Search Results
            </Typography>
            <Grid container spacing={3}>
              {searchResults.map((account) => (
                <Grid item xs={12} key={account.accountID}>
                  <Button variant="outlined" onClick={() => this.handleAccountSelect(account)}>
                    {account.fullName} - {account.telephoneNumber}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

        {/* Conditionally render the "Transfer Money" section */}
        {selectedAccount && (
          <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Transfer Money
            </Typography>
            <form onSubmit={this.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="amount"
                    name="amount"
                    label="Amount"
                    fullWidth
                    type="number"
                    value={transactionTransfer.amount}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="currency"
                    name="currency"
                    select
                    label="Currency"
                    fullWidth
                    value={transactionTransfer.currency}
                    onChange={this.handleChange}
                  >
                    <MenuItem value="Knut">Knut</MenuItem>
                    <MenuItem value="Sickle">Sickle</MenuItem>
                    <MenuItem value="Galleon">Galleon</MenuItem>
                    {/* Add more currencies as needed */}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="pin"
                    name="pin"
                    label="Security PIN"
                    fullWidth
                    type="password"
                    value={fetchedPin}
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Proceed
              </Button>
            </form>
          </Paper>
        )}
        
        {/* Success Dialog */}
        <Dialog
          open={successDialogOpen}
          onClose={this.handleSuccessDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Transfer Successful!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your transfer was successful. Do you want to print the receipt?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSuccessDialogClose} color="primary">
              No, Thanks
            </Button>
            <Button onClick={this.handlePrintReceipt} color="primary" autoFocus>
              Print Receipt
            </Button>
          </DialogActions>
        </Dialog>
        {/* Notification */}
        <Snackbar
          open={notificationOpen}
          autoHideDuration={6000}
          onClose={this.handleNotificationClose}
          message="Transaction Successful!"
          action={
            <Button color="secondary" size="small" onClick={this.handlePrintReceipt}>
              Print Receipt
            </Button>
          }
        />
      </div>
    );
  }
}

export default TransferOptions;