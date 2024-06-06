import * as React from 'react';
import LinkMUi from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Link } from 'react-router-dom';

// Generate Order Data
function createData(id, date, name, Type, Status, amount) {
  return { id, date, name, Type, Status, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'DuitNow QR',
    'Pending',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'DuitNow QR',
    'Successful',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Payment', 'DuitNow QR', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'DuitNow QR',
    'Successful',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'DuitNow QR',
    'Successful',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.Type}</TableCell>
              <TableCell>{row.Status}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
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
