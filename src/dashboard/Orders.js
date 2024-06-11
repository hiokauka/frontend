import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for HTTP requests

export default function Orders() {
  const [rows, setRows] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem('username'));

  const getTransactionHistory = async () => {

    if (!localStorage.getItem('username')) return; // Ensure accountID is not null before making the request

    const getTransactionHistoryURL = 'http://localhost:8080/transactions/' + localStorage.getItem('accountID');

    try {

      const response = await axios.get(getTransactionHistoryURL);
      setRows(response.data); // Setting the array of transactions to response.data

    } catch (error) {

      console.error('There was an error fetching the transaction history.', error);

    }

  };

  useEffect(() => {

    getTransactionHistory();

  }, [username]); // Run this effect whenever username or accountID changes

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
              <TableCell>{row.transactionId}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell>{row.currency.abbreviation}</TableCell>
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