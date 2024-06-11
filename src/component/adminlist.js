import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Link } from 'react-router-dom'; 
import PaidIcon from '@mui/icons-material/Paid';
import HomeIcon from '@mui/icons-material/Home';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import ListIcon from '@mui/icons-material/List';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/Admin">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Goblin Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/Adminuserlist">
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="User list" />
    </ListItemButton>
    <ListItemButton component={Link} to="/Admintransactions">
      <ListItemIcon>
        <PriceChangeIcon />
      </ListItemIcon>
      <ListItemText primary="All Transactions" />
    </ListItemButton>
    <ListItemButton component={Link} to="/Admincurrency">
      <ListItemIcon>
        <PaidIcon  />
      </ListItemIcon>
      <ListItemText primary="Edit Currency" />
    </ListItemButton>
  </React.Fragment>
);
