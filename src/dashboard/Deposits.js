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
    // Define the username and password
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    const getAccountUrl = 'http://localhost:8080/accounts/' + username;

    const getAccount = async () => {
      await axios.get(getAccountUrl)
        .then(response => {
          const accountID = response.data.accountID;

          // Create a base64 encoded string for Basic Authentication
          const basicAuth = btoa(`${username}:${password}`);
          const basic = 'Basic ' + btoa(username + ':' + password);

          // Use the obtained accountId to fetch balance data
          const balanceKnut = 'http://localhost:8080/balances/' + accountID + '/1';

          axios.get(balanceKnut, {
            headers: { Authorization: basic }
          })
            .then(balanceResponse => {
              // Assuming the response contains balance and date
              const { balance, date } = balanceResponse.data;
              setBalance(balance);
              setDate(date);
            })
            .catch(balanceError => {
              console.error('Error fetching the balance data:', balanceError);
            });
        })
        .catch(accountError => {
          console.error('Error fetching the account data:', accountError);
        });
    };

    getAccount();
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
