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
  { id: 'Transaction ID', label: 'Transaction ID', minWidth: 65 },
  { id: 'Date', label: 'Date', minWidth: 140, align: 'center' },
  { id: 'From', label: 'From', minWidth: 100, align: 'center' },
  { id: 'To', label: 'To', minWidth: 100, align: 'right' },
  { id: 'Payment Method', label: 'Payment Method', minWidth: 170, align: 'right' },
  { id: 'Card Number', label: 'Card Number', minWidth: 170, align: 'right' },
  { id: 'Amount', label: 'Amount', minWidth: 170, align: 'right' },
  { id: 'Currency', label: 'Currency', minWidth: 100, align: 'right' },
  { id: 'Category', label: 'Category', minWidth: 170, align: 'right' },
  { id: 'Download Receipt', label: 'Download Receipt', minWidth: 170, align: 'right' },
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

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/transactions/{accountId}');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
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
      // Toggle sort direction if the same column is clicked again
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set the new sort column and default to ascending direction
      setSortColumn(columnId);
      setSortDirection('asc');
    }
  };

  const sortedRows = [...transactions].sort((a, b) => {
    // Handle sorting based on the sortColumn and sortDirection
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
    const amount = parseFloat(row['Amount']);
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
      <Grid container spacing={2}> {/* Grid container for side-by-side text fields */}
        <Grid item xs={6}> {/* Grid item for minimum amount */}
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
        <Grid item xs={6}> {/* Grid item for maximum amount */}
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row['Transaction ID']}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'Download Receipt' ? (
                          <Button variant="contained" color="primary">
                            Download
                          </Button>
                        ) : (
                          column.format && typeof value === 'number' ?
                            column.format(value) : value
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
