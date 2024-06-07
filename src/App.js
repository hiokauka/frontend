// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInSide from './component/SignInSide';
import SignUp from './component/SignUp';
import Forgot from './component/Forgot';
import Dashboard from './dashboard/Dashboard';
import Transactions from './component/TransactionH';
import Currencyexchg from './component/CurrencyExchange';
import Expenditureanalyst from './component/Expenditureanalysis';
import Settings from './component/Settings';
import Transfer from './component/Transfer';
import Balance from './component/Balance';
import AddCard from './component/AddCard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignInSide />} /> 
          <Route path="/signin" element={<SignInSide />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactionshistory" element={<Transactions/>} />
          <Route path="/currencyexchange" element={<Currencyexchg/>} />
          <Route path="/expenditureanalysis" element={<Expenditureanalyst/>} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="/transfer" element={<Transfer/>} />
          <Route path="/balance" element={<Balance/>} />
          <Route path="/Addcard" element={<AddCard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
