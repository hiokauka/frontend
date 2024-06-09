import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container, MenuItem, Select, InputLabel, FormControl, Snackbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';

const defaultTheme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUp() {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const accountDTO = {
      role: formData.get('role'),
      fullName: formData.get('fullName'),
      gender: formData.get('gender'),
      dateOfBirth: formData.get('dateOfBirth'),
      streetName1: formData.get('streetName1'),
      streetName2: formData.get('streetName2'),
      town: formData.get('town'),
      state: formData.get('state'),
      postcode: formData.get('postcode'),
      country: formData.get('country'),
      userImageURL: formData.get('userImageURL'),
      emailAddress: formData.get('emailAddress'),
      username: formData.get('username'),
      password: formData.get('password'),
      telephoneNumber: formData.get('telephoneNumber'),
      securityQuestionID: formData.get('securityQuestionID'),
      securityAnswer: formData.get('securityAnswer'),
      securityPIN: formData.get('securityPIN')
    };

    try {
      const response = await axios.post('http://localhost:8080/signup/account', accountDTO);
      console.log(response.data); // Handle successful registration
      setOpen(true);
    } catch (error) {
      console.error('Error:', error); // Handle registration error
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    required
                    label="Gender"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="dateOfBirth"
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="streetName1"
                  label="Street Name 1"
                  name="streetName1"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="streetName2"
                  label="Street Name 2"
                  name="streetName2"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="town"
                  label="Town"
                  name="town"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="postcode"
                  label="Postcode"
                  name="postcode"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userImage"
                  label="User Image URL"
                  name="userImage"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="emailAddress"
                  label="Email Address"
                  name="emailAddress"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="telephoneNumber"
                  label="Telephone Number"
                  name="telephoneNumber"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="securityQuestion-label">Security Question</InputLabel>
                  <Select
                    labelId="securityQuestion-label"
                    id="securityQuestion"
                    name="securityQuestion"
                    required
                    label="Security Question"
                  >
                    <MenuItem value="question1">Question 1</MenuItem>
                    <MenuItem value="question2">Question 2</MenuItem>
                    <MenuItem value="question3">Question 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="securityAnswer"
                  label="Security Answer"
                  name="securityAnswer"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                 
                  id="securityPIN"
                  label="Security PIN"
                  name="securityPIN"
                  type="password"
                  />
                  </Grid>
                
                  <Grid item xs={12}>
                  <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                  </Grid>
                  </Grid>
                  <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  >
                  Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                  <Grid item>
                  <RouterLink to="/signin" variant="body2">
                  Already have an account? Sign in
                  </RouterLink >
                  </Grid>
                  </Grid>
                  </Box>
                  </Box>
                  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  Sign up successful!
                  </Alert>
                  </Snackbar>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
                  {'Copyright © '}
                  <RouterLink color="inherit" href="https://mui.com/">
                  Your Website
                  </RouterLink >{' '}
                  {new Date().getFullYear()}
                  {'.'}
                  </Typography>
                  </Container>
                  </ThemeProvider>
                  );
                  }