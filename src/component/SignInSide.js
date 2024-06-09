import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LinkMui from '@mui/material/Link'; // To avoid naming conflict with react-router-dom's Link
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
  // State variables to manage form errors and dialog state
  const [adminDialogOpen, setAdminDialogOpen] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [adminUsernameError, setAdminUsernameError] = useState(false);
  const [adminPasswordError, setAdminPasswordError] = useState(false);
  const navigate = useNavigate(); // Navigation hook for routing

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    // Set error states if email or password is missing
    setEmailError(!email);
    setPasswordError(!password);

    if (!email || !password) {
      return;
    }

    try {
      // API call to authenticate the user
      const response = await axios.post('http://localhost:8080/signin/auth', { email, password });
      const { role } = response.data;

      // Store authentication details in local storage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('role', role);

      // Navigate to appropriate dashboard based on user role
      if (role === 'Goblin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error:', error); // Handle login error
    }
  };

  const handleAdminSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');

    // Set error states if username or password is missing
    setAdminUsernameError(!username);
    setAdminPasswordError(!password);

    if (!username || !password) {
      return;
    }

    try {
      // API call to authenticate the admin
      const response = await axios.post('http://localhost:8080/signin/auth', { username, password });
      const { role } = response.data;

      // Store authentication details in local storage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('role', role);

      // Navigate to appropriate dashboard based on user role
      if (role === 'Goblin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error:', error); // Handle admin login error
    }
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
        <Grid 
          item 
          xs={12} 
          sm={8} 
          md={5} 
          component={Paper} 
          elevation={6} 
          square 
          sx={{ 
            backgroundColor: '#FFF8E1', // Cream color for the whole right section
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 2,
            }}
          >
            <Typography component="h1" variant="h4" className="harry-potter-font" sx={{ mb: 4 }}>
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
                error={emailError}
                helperText={emailError ? "Email is required" : ""}
                InputProps={{
                  style: {
                    backgroundColor: '#FFF8E1', // Cream color for input fields
                  },
                }}
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
                error={passwordError}
                helperText={passwordError ? "Password is required" : ""}
                InputProps={{
                  style: {
                    backgroundColor: '#FFF8E1', // Cream color for input fields
                  },
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: 'brown' }}
              >
                Sign In
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

     
    </ThemeProvider>
  );
}
