import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Link } from 'react-router-dom'; 
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/dashboard">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
   
    <ListItemButton component={Link} to="/transfer">
      <ListItemIcon>
      <PaymentIcon/>
      </ListItemIcon>
      <ListItemText primary="Transfer" />
    </ListItemButton>
    <ListItemButton component={Link} to="/transactionshistory"> {/* Add Link component */}
      <ListItemIcon>
        <ReceiptLongIcon />
      </ListItemIcon>
      <ListItemText primary="Transaction History" />
    </ListItemButton>
    <ListItemButton component={Link} to="/currencyexchange"> {/* Add Link component */}
      <ListItemIcon>
        <CurrencyExchangeIcon />
      </ListItemIcon>
      <ListItemText primary="Currency Exchange" />
    </ListItemButton>
    <ListItemButton component={Link} to="/expenditureanalysis"> {/* Add Link component */}
      <ListItemIcon>
        <AnalyticsIcon />
      </ListItemIcon>
      <ListItemText primary="Expenditure Analysis" />
    </ListItemButton>
    <ListItemButton component={Link} to="/settings"> {/* Add Link component */}
      <ListItemIcon>
        <SettingsApplicationsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
  </React.Fragment>
);
