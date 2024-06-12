import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';

const ExpensePieChart = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [categories, setCategories] = useState([]);
  const [categorizedData, setCategorizedData] = useState({});
  const [pieChartData, setPieChartData] = useState([]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const fetchTransactions = async () => {
    try {

      // Fetch transactions data from the backend
      const response = await axios.get('http://localhost:8080/transactions/' + localStorage.getItem('accountID'));

      if (response.data) {

        const mappedTransactions = response.data.map(transaction => ({
          date: new Date(transaction.date),
          amount: transaction.amount,
          currency: transaction.currency.abbreviation,
          category: transaction.category,
        }));
        
        setTransactions(mappedTransactions);

      }
      
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };
  
  useEffect(() => {

    fetchTransactions();
    
  }, []);

  useEffect(() => {
    // Filter transactions by selected month
    const filteredTransactions = transactions.filter(transaction =>
      new Date(transaction.date).getMonth() === selectedMonth
    );

    // Categorize transactions by currency and calculate total amount for each currency
    const data = filteredTransactions.reduce((acc, transaction) => {
      const currency = transaction.currency;
      acc[currency] = acc[currency] || 0;
      acc[currency] += transaction.amount;
      return acc;
    }, {});

    setCategorizedData(data);

    // Create data for pie charts
    const pieData = Object.entries(data).map(([currency, amount]) => ({
      currency,
      value: amount,
    }));
    setPieChartData(pieData);

    // Set categories for rendering Select options
    const uniqueCategories = [...new Set(transactions.map(transaction => transaction.category))];
    setCategories(uniqueCategories);
  }, [selectedMonth, transactions]);

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>Select Month</InputLabel>
        <Select
          value={selectedMonth}
          onChange={event => setSelectedMonth(event.target.value)}
        >
          {/* Render options for months */}
          {Array.from({ length: 12 }, (_, i) => i).map(month => (
            <MenuItem key={month} value={month}>
              {months[month]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Render pie charts for each currency */}
      {Object.entries(categorizedData).map(([currency, amount], index) => (
        <Box key={index}>
          <Typography variant="h6">{currency}</Typography>
          <PieChart
            data={pieChartData.filter(data => data.currency === currency)}
            // Add other pie chart props as needed
          />
        </Box>
      ))}

      {/* Display a message if there are no transactions for the selected month */}
      {transactions.length === 0 && (
        <Typography variant="body1">No expenses for the selected month.</Typography>
      )}
    </Box>
  );
};

export default ExpensePieChart;

// import React, { useState, useEffect } from 'react';
// import { PieChart } from '@mui/x-charts/PieChart';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import axios from 'axios';

// const ExpensePieChart = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [categorizedData, setCategorizedData] = useState({});
//   const [pieChartData, setPieChartData] = useState([]);


//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June', 
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         // Fetch transactions data from the backend
//         const response = await axios.get('http://localhost:8080/transactions/' + localStorage.getItem('accountID'));
//         const mappedTransactions = response.data.map(transaction => ({
//           date: new Date(transaction.date).toLocaleString(),
//           amount: transaction.amount,
//           currency: transaction.currency.abbreviation,
//           category: transaction.category,
//         }));
//         setTransactions(mappedTransactions);
//       } catch (error) {
//         console.error('Error fetching transactions:', error);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   useEffect(() => {
//     // Filter transactions by selected month
//     const filteredTransactions = transactions.filter(transaction =>
//       new Date(transaction.date).getMonth() === selectedMonth
//     );

//     // Categorize transactions by currency and calculate total amount for each currency
//     const data = filteredTransactions.reduce((acc, transaction) => {
//       const currency = transaction.currency;
//       acc[currency] = acc[currency] || 0;
//       acc[currency] += transaction.amount;
//       return acc;
//     }, {});

//     setCategorizedData(data);

//     // Create data for pie charts
//     const pieData = Object.entries(data).map(([currency, amount]) => ({
//       currency,
//       value: amount,
//     }));
//     setPieChartData(pieData);

//     // Set categories for rendering Select options
//     const uniqueCategories = [...new Set(transactions.map(transaction => transaction.category))];
//     setCategories(uniqueCategories);
//   }, [selectedMonth, transactions]);

//   return (
//     <Box>
//       <FormControl fullWidth>
//         <InputLabel>Select Month</InputLabel>
//         <Select
//           value={selectedMonth}
//           onChange={event => setSelectedMonth(event.target.value)}
//         >
//           {/* Render options for months */}
//           {Array.from({ length: 12 }, (_, i) => i).map(month => (
//             <MenuItem key={month} value={month}>
//               {months[month]}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {/* Render pie charts for each currency */}
//       {Object.entries(categorizedData).map(([currency, amount], index) => (
//         <Box key={index}>
//           <Typography variant="h6">{currency}</Typography>
//           <PieChart
//             data={pieChartData.filter(data => data.currency === currency)}
//             // Add other pie chart props as needed
//           />
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default ExpensePieChart;
