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
import AdminDashboard from './component/Admindashboard';
import AddCard from './component/AddCard';
import { AuthProvider } from './component/AuthContext';
import ProtectedRoute from './component/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<SignInSide />} />
            <Route path="/signin" element={<SignInSide />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
            <Route path="/transactionshistory" element={<ProtectedRoute element={Transactions} />} />
            <Route path="/currencyexchange" element={<ProtectedRoute element={Currencyexchg} />} />
            <Route path="/expenditureanalysis" element={<ProtectedRoute element={Expenditureanalyst} />} />
            <Route path="/settings" element={<ProtectedRoute element={Settings} />} />
            <Route path="/transfer" element={<ProtectedRoute element={Transfer} />} />
            <Route path="/Admin" element={<ProtectedRoute element={AdminDashboard} />} />
            <Route path="/Addcard" element={<ProtectedRoute element={AddCard} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
