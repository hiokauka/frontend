import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useAuth } from './AuthContext';

const theme = createTheme({
  typography: {
    fontFamily: 'Bigelow Rules, cursive',
    h1: {
      fontSize: '4rem',
    },
    h2: {
      fontSize: '2.5rem',
    },
    h3: {
      fontSize: '2rem',
    },
    h4: {
      fontSize: '1.75rem',
    },
    h5: {
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1.25rem',
    },
    body2: {
      fontSize: '1rem',
    },
  },
});

export default function SignInSide() {
  const [adminDialogOpen, setAdminDialogOpen] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate(); 
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');

    // Store the username
    localStorage.setItem('username', username);

    setUsernameError(!username);
    setPasswordError(!password);

    if (!username || !password) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/signin/auth', { username, password }, {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'text' // specify the response type as text
      });

      const role = response.data;

      login(role, username, password); // Set authenticated state and role

      if (role === 'ROLE_GOBLIN') {
        navigate('/admin');
      } else if (role === 'ROLE_PLATINUM_PATRONUS' || role === 'ROLE_GOLDEN_GALLEON' || role === 'ROLE_SILVER_SNITCH') {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
            backgroundColor: '#FFF8E1',
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
            <Typography 
              component="h1" 
              variant="h1" 
              sx={{ mb: 4 ,  fontWeight:'bold' }}
            >
              E-GRINGOTTS
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
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                error={usernameError}
                helperText={usernameError ? "Username is required" : ""}
                InputProps={{
                  style: {
                    backgroundColor: '#FFF8E1',
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
                    backgroundColor: '#FFF8E1',
                  },
                }}
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
