import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for HTTP requests
import { AuthProvider } from '../component/AuthContext';

export default function Orders() {
  const [rows, setRows] = useState([]);
  const [accountID, setAccountID] = useState(null);
  const [username, getUsername] =

  
  
  useEffect(() => {
    // Fetch data from the backend
    // Get the account ID
    const getAccountURL = 'https://localhost:8080/accounts/' + username
    axios.get(getAccountURL).then (response => { setAccountID(response.data.accountID)});

    // Get the balance of the account for the first currency (Knut, K)
    // const getKnutBalanceURL = 'http://localhost:8080/balances/' + accountID + '/1';
    // axios.get(getKnutBalanceURL).then(response => { set })

    // Get the transaction history array
    // const getTransactionHistoryURL = 'http://localhost:8080/transactions/' + accountID;
    // axios.get(getTransactionHistoryURL)
    //   .then(response => {

    //     // Set the array to the list of transactions of an account from the API
    //     setRows(response.data);

    //   })
    //   .catch(error => {
    //     console.error('There was an error fetching the transactions for the account.', error);
    //   });
    }, []);

  return (
    <React.Fragment>
      <Title>Recent Transactions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Transaction ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell>Currency</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount.toFixed(2)}`}</TableCell>
              <TableCell>{row.currency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link
        color="primary"
        to="/transactionshistory"
        sx={{ mt: 3 }}
      >
        See more transactions
      </Link>
    </React.Fragment>
  );
}
