import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import Title from './Title';

function createData(currency, exchangeRateUSD, exchangeRateEUR, exchangeRateMYR) {
  return { currency, exchangeRateUSD, exchangeRateEUR, exchangeRateMYR };
}

const rows = [
  createData('USD', 1.0, 0.91, 4.35),
  createData('EUR', 1.10, 1.0, 4.79),
  createData('MYR', 0.23, 0.21, 1.0),
];

export default function CurrencyComparisonTable() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Exchange Rate Comparison</Title>
      <Box sx={{ width: '100%', overflow: 'auto' }}>
        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
          <Table stickyHeader aria-label="currency comparison table">
            <TableHead>
              <TableRow>
                <TableCell>Currency</TableCell>
                <TableCell align="right">Exchange Rate to USD</TableCell>
                <TableCell align="right">Exchange Rate to EUR</TableCell>
                <TableCell align="right">Exchange Rate to MYR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.currency}>
                  <TableCell component="th" scope="row">
                    {row.currency}
                  </TableCell>
                  <TableCell align="right">{row.exchangeRateUSD}</TableCell>
                  <TableCell align="right">{row.exchangeRateEUR}</TableCell>
                  <TableCell align="right">{row.exchangeRateMYR}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </React.Fragment>
  );
}
