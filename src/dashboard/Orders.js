import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Link } from 'react-router-dom';

// Generate Order Data
function createData(id, date, paymentMethod, amount, currency) {
  return { id, date, paymentMethod, amount, currency };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Credit Card', 312.44, 'USD'),
  createData(1, '16 Mar, 2019', 'Bank Transfer', 866.99, 'EUR'),
  createData(2, '16 Mar, 2019', 'PayPal', 100.81, 'GBP'),
  createData(3, '16 Mar, 2019', 'Credit Card', 654.39, 'USD'),
  createData(4, '15 Mar, 2019', 'Bank Transfer', 212.79, 'EUR'),
];

export default function Orders() {
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
