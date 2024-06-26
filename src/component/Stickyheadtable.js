import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem'; // Import MenuItem
import Grid from '@mui/material/Grid'; // Import Grid
import axios from 'axios';

const columns = [
  { id: 'transactionId', label: 'Transaction ID', minWidth: 65 },
  { id: 'date', label: 'Date', minWidth: 140, align: 'center' },
  { id: 'fromAccount', label: 'From', minWidth: 100, align: 'center' },
  { id: 'toAccount', label: 'To', minWidth: 100, align: 'right' },
  { id: 'paymentMethod', label: 'Payment Method', minWidth: 170, align: 'right' },
  { id: 'cardNumber', label: 'Card Number', minWidth: 170, align: 'right' },
  { id: 'amount', label: 'Amount', minWidth: 170, align: 'right' },
  { id: 'currency', label: 'Currency', minWidth: 100, align: 'right' },
  { id: 'category', label: 'Category', minWidth: 170, align: 'right' },
  { id: 'downloadReceipt', label: 'Download Receipt', minWidth: 170, align: 'right' },
];

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('');

  const transactionsURL = 'http://localhost:8080/transactions/' + localStorage.getItem('accountID');

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(transactionsURL);
      const mappedTransactions = response.data.map(transaction => {
        // Log each transaction to identify the problematic one
        console.log('Transaction:', transaction);
        
        const mappedTransaction = {
          transactionId: transaction.transactionId,
          date: new Date(transaction.date).toLocaleString(),
          fromAccount: transaction.fromAccount.fullName,
          toAccount: transaction.toAccount.fullName,
          paymentMethod: transaction.paymentMethod,
          amount: transaction.amount,
          currency: transaction.currency.abbreviation,
          category: transaction.category,
          downloadReceipt: transaction.receiptFileName
        };
  
        // Check if card exists before accessing its properties
        if (transaction.card && transaction.card.cardNumber) {
          mappedTransaction.cardNumber = transaction.card.cardNumber;
        } else {
          mappedTransaction.cardNumber = 'N/A'; // or any default value
        }
        
        return mappedTransaction;
      });
  
      console.log('Fetched Transactions:', mappedTransactions);
  
      setTransactions(mappedTransactions);
    } catch (error) {
      console.error('Error fetching transactions', error);
    }
  };
  
  useEffect(() => {
    
    fetchTransactions();

  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMinAmountChange = (event) => {
    setMinAmount(event.target.value);
  };

  const handleMaxAmountChange = (event) => {
    setMaxAmount(event.target.value);
  };

  const handleSort = (columnId) => {
    if (sortColumn === columnId) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnId);
      setSortDirection('asc');
    }
  };

  const handleDownload = async (transactionId) => {
    try {
      const getReceiptFileUrl = 'http://localhost:8080/transactions/' + transactionId + '/download';
      const response = await axios.get(getReceiptFileUrl, {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `receipt_${transactionId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading the receipt:', error);
    }
  };

  const sortedRows = [...transactions].sort((a, b) => {
  if (sortColumn !== '') {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  }
  return 0;
});

const filteredRows = sortedRows.filter((row) =>
  Object.values(row).some((value) =>
    value.toString().toLowerCase().includes(searchQuery.toLowerCase())
  )
).filter(row => {
  const amount = parseFloat(row.amount);
  if (minAmount !== '' && maxAmount !== '') {
    return amount >= parseFloat(minAmount) && amount <= parseFloat(maxAmount);
  } else if (minAmount !== '') {
    return amount >= parseFloat(minAmount);
  } else if (maxAmount !== '') {
    return amount <= parseFloat(maxAmount);
  } else {
    return true;
  }
});

console.log(filteredRows); // Log filteredRows to verify the data


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Transaction History
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearchChange}
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Minimum Amount"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={minAmount}
            onChange={handleMinAmountChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Maximum Amount"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={maxAmount}
            onChange={handleMaxAmountChange}
          />
        </Grid>
      </Grid>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>{column.label}</span>
                    <Button onClick={() => handleSort(column.id)}>
                      {sortColumn === column.id && sortDirection === 'asc' ? '▲' : '▼'}
                    </Button>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {filteredRows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.transactionId}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === 'downloadReceipt' ? (
                        <Button 
                          variant="contained" 
                          color="primary" 
                          onClick={() => handleDownload(row.transactionId)}
                        >
                          Download
                        </Button>
                      ) : (
                        value
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
          ))}

          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
