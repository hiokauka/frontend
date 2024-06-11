import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Title from './Title';
import axios from 'axios';

export default function Deposits() {
  const [balance, setBalance] = useState(null);
  const [date, setDate] = useState(null);
  const [accountId, setAccountId] = useState(null);


  useEffect(() => {

    const storedAccount = axios.get(`http://localhost:8080/account/${accountId}`) // Replace {accountId} with the appropriate account ID
    // Fetch balance data from the backend when the component mounts
    accountId = 
    axios.get(`http://localhost:8080/balances/${accountId}`) // Replace {accountId} with the appropriate account ID
      .then(response => {
        // Assuming the response contains balance and date
        const { balance, date } = response.data;
        setBalance(balance);
        setDate(date);
      })
      .catch(error => {
        console.error('Error fetching the balance data:', error);
      });
  }, []);

  return (
    <React.Fragment>
      <Title>Balance</Title>
      <Typography component="p" variant="h4">
        {balance !== null ? `$${balance.toFixed(2)}` : 'Loading...'}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {date !== null ? `on ${date}` : 'Loading...'}
      </Typography>
      <div>
        <Link to="/transactionshistory" color="primary">
          View Balance
        </Link>
      </div>
    </React.Fragment>
  );
}
