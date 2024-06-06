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
  DialogActions
} from '@mui/material';

class TransferOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      to: '',
      category: '',
      type: '',
      successDialogOpen: false // State for success dialog
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', this.state);
    // Reset form fields
    this.setState({
      amount: '',
      to: '',
      category: '',
      type: ''
    });
    // Open success dialog
    this.setState({ successDialogOpen: true });
  };

  handleSuccessDialogClose = () => {
    this.setState({ successDialogOpen: false });
  };

  handlePrintReceipt = () => {
    // Implement printing receipt logic here
    console.log('Printing receipt...');
  };

  render() {
    return (
      <Paper elevation={3} style={{ padding: '20px' }}>
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
                value={this.state.amount}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="to"
                name="to"
                label="To"
                fullWidth
                value={this.state.to}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="category"
                name="category"
                select
                label="Category"
                fullWidth
                value={this.state.category}
                onChange={this.handleChange}
              >
                <MenuItem value="food">Food</MenuItem>
                <MenuItem value="transport">Transport</MenuItem>
                <MenuItem value="utility">Utility</MenuItem>
                {/* Add more options as needed */}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="type"
                name="type"
                select
                label="Type"
                fullWidth
                value={this.state.type}
                onChange={this.handleChange}
              >
                <MenuItem value="debit">Debit</MenuItem>
                <MenuItem value="credit">Credit</MenuItem>
                {/* Add more options as needed */}
              </TextField>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Submit
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
      </Paper>
    );
  }
}

export default TransferOptions;
