import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Title from './Title';
import axios from 'axios';

export default function Deposits() {
  const [balance, setBalance] = useState(null);
  const [date, setDate] = useState(null);

  const getBalanceKnut = async() => {

    try {
;
      const getBalanceKnutUrl = 'http://localhost:8080/balances/' + localStorage.getItem('accountID') + '/1'

      const response = await axios.get(getBalanceKnutUrl);
      setBalance(response.data.balance);

    } catch (error) {

      console.log('There was an error collecting the account\'s balance in Knut.', error);

    }
    
  }

  useEffect(() => {

    getBalanceKnut();
    
  }, []);

  return (
    <React.Fragment>
      <Title>Balance</Title>
      <Typography component="p" variant="h4">
        {balance !== null ? balance : 'Loading...'}
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
