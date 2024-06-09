import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LinkMui from '@mui/material/Link'; // Rename Link to LinkMui to avoid naming conflicts
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const defaultTheme = createTheme();

export default function SignInSide() {
  const [adminDialogOpen, setAdminDialogOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    try {
      const response = await axios.post('http://localhost:8080/signin/auth', {
        username, // use username instead of email in login < < < <
        password,
      });
      console.log(response.data); // Handle successful login
    } catch (error) {
      console.error('Error:', error); // Handle login error
    }
  };


const handleAdminSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = formData.get('username');
  const password = formData.get('password');

// Actually, the way i implemented it makes it so that both user and admin can log in at the same login button (user login). If the account’s role in the database is Goblin, it goes to admin, else, it goes to /dashboard (for any of the 3 user classes)

  try {
    const response = await axios.post('http://localhost:8080/signin/auth', {
      username,
      password,
    });
    console.log(response.data); // Handle successful admin login
  } catch (error) {
    console.error('Error:', error); // Handle admin login error
  }
};


  const handleAdminDialogOpen = () => {
    setAdminDialogOpen(true);
  };

  const handleAdminDialogClose = () => {
    setAdminDialogOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh', backgroundColor: '#FFF8E1' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/gringgotsbank.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white', // Cream color
              padding: 2,
            }}
          >
            <Typography component="h1" variant="h4" sx={{ mb: 4, fontFamily: 'Gothic' }}>
              E-GRINGGOTS
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Link to="/dashboard">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Link>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
                onClick={handleAdminDialogOpen}
              >
                Goblin
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgot" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={adminDialogOpen} onClose={handleAdminDialogClose}>
        <DialogTitle>Goblin Sign In</DialogTitle>
        <Box component="form" noValidate onSubmit={handleAdminSubmit} sx={{ mt: 1 }}>
          <DialogContent>
            <DialogContentText>
              Please enter your Goblin credentials.
            </DialogContentText>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="admin-password"
              autoComplete="current-password"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAdminDialogClose}>Cancel</Button>
            <Link to="/Admin" style={{ textDecoration: 'none' }}>
  <Button variant="contained">
    Sign In
  </Button>
</Link>
          </DialogActions>
        </Box>
      </Dialog>
    </ThemeProvider>
  );
}
