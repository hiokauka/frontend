import React from 'react';
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

class TransferOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      currency: '',
      searchQuery: '',
      pin: '',
      successDialogOpen: false,
      notificationOpen: false,
    };
  }

  componentDidMount() {
    this.fetchPin();
  }

  fetchPin = async () => {
    try {
      const response = await axios.get('http://localhost:8080'); // Replace with your actual API endpoint
      this.setState({ fetchedPin: response.data.pin });
    } catch (error) {
      console.error('Error fetching the PIN:', error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { pin, fetchedPin } = this.state;
    
    if (pin !== fetchedPin) {
      alert('Invalid PIN');
      return;
    }

    const transferData = {
      amount: this.state.amount,
      currency: this.state.currency,
      searchQuery: this.state.searchQuery,
    };

    try {
      const response = await axios.post('https://your-backend-api.com/transfer', transferData); // Replace with your actual API endpoint
      console.log('Form submitted:', response.data);
      this.setState({
        amount: '',
        currency: '',
        searchQuery: '',
        pin: '',
        successDialogOpen: true,
      });
    } catch (error) {
      console.error('There was an error submitting the form:', error);
    }
  };

  handleSuccessDialogClose = () => {
    this.setState({ successDialogOpen: false });
  };

  handlePrintReceipt = () => {
    console.log('Printing receipt...');
  };

  handleNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ notificationOpen: false });
  };

  render() {
    return (
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Transfer Money
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="searchQuery"
                name="searchQuery"
                label="Search for Name or Telephone Number"
                fullWidth
                value={this.state.searchQuery}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="amount"
                name="amount"
                label="Amount"
                fullWidth
                type="number"
                value={this.state.amount}
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
                value={this.state.currency}
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
                value={this.state.pin}
                onChange={this.handleChange}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Proceed
          </Button>
        </form>
        {/* Success Dialog */}
        <Dialog
          open={this.state.successDialogOpen}
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
          open={this.state.notificationOpen}
          autoHideDuration={6000}
          onClose={this.handleNotificationClose}
          message="Transaction Successful!"
          action={
            <Button color="secondary" size="small" onClick={this.handlePrintReceipt}>
              Print Receipt
            </Button>
          }
        />
      </Paper>
    );
  }
}

export default TransferOptions;
