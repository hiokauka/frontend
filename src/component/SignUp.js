import React, { useState, useEffect } from 'react';
import {
  Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container, MenuItem, Select, InputLabel, FormControl, Snackbar
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const defaultTheme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUp() {
  const [open, setOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch security questions from the backend

    // 1. Craft the URL string
    const securityquestionsURL = 'http://localhost:8080/securityquestions/all';

    const fetchSecurityQuestions = async () => {
      try {
        await axios.get(securityquestionsURL)
        .then(response => {

          setSecurityQuestions(response.data);
          
        })
      } catch (error) {
        console.error('Error fetching security questions:', error);
      }
    };

    fetchSecurityQuestions();
  }, []);

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
      emailAddress: formData.get('emailAddress'),
      username: formData.get('username'),
      password: formData.get('password'),
      telephoneNumber: formData.get('telephoneNumber'),
      securityQuestionID: formData.get('securityQuestionID'),
      securityAnswer: formData.get('securityAnswer'),
      securityPIN: formData.get('securityPIN')
    };

    // Form validation
    const errors = {};
    for (const [key, value] of formData.entries()) {
      if (!value) {
        errors[key] = 'This field is required';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    } else {
      setFormErrors({});
    }

    try {
      const response = await axios.post('http://localhost:8080/signup/account', accountDTO);
      console.log(response.data); // Handle successful registration
      setOpen(true);
      navigate('/signin');
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
                <FormControl fullWidth required error={!!formErrors.role}>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="role"
                    label="Role"
                  >
                    <MenuItem value="Platinum Patronus">Platinum Patronus</MenuItem>
                    <MenuItem value="Silver Snitch">Silver Snitch</MenuItem>
                    <MenuItem value="Golden Galleon">Golden Galleon</MenuItem>
                  </Select>
                  {formErrors.role && <Typography color="error">{formErrors.role}</Typography>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                  error={!!formErrors.fullName}
                  helperText={formErrors.fullName}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required error={!!formErrors.gender}>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    label="Gender"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  {formErrors.gender && <Typography color="error">{formErrors.gender}</Typography>}
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
                  error={!!formErrors.dateOfBirth}
                  helperText={formErrors.dateOfBirth}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="streetName1"
                  label="Street Name 1"
                  name="streetName1"
                  error={!!formErrors.streetName1}
                  helperText={formErrors.streetName1}
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
                  error={!!formErrors.town}
                  helperText={formErrors.town}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  error={!!formErrors.state}
                  helperText={formErrors.state}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="postcode"
                  label="Postcode"
                  name="postcode"
                  error={!!formErrors.postcode}
                  helperText={formErrors.postcode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  error={!!formErrors.country}
                  helperText={formErrors.country}
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
                  error={!!formErrors.emailAddress}
                  helperText={formErrors.emailAddress}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  error={!!formErrors.username}
                  helperText={formErrors.username}
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
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="telephoneNumber"
                  label="Telephone Number"
                  name="telephoneNumber"
                  error={!!formErrors.telephoneNumber}
                  helperText={formErrors.telephoneNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required error={!!formErrors.securityQuestionID}>
                  <InputLabel id="securityQuestion-label">Security Question</InputLabel>
                  <Select
                    labelId="securityQuestion-label"
                    id="securityQuestionID"
                    name="securityQuestionID"
                    label="Security Question"
                  >
                    {securityQuestions.map((question) => (
                      <MenuItem key={question.securityQuestionID} value={question.securityQuestionID}>{question.question}</MenuItem>
                    ))}
                  </Select>
                  {formErrors.securityQuestionID && <Typography color="error">{formErrors.securityQuestionID}</Typography>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="securityAnswer"
                  label="Security Answer"
                  name="securityAnswer"
                  error={!!formErrors.securityAnswer}
                  helperText={formErrors.securityAnswer}
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
                  error={!!formErrors.securityPIN}
                  helperText={formErrors.securityPIN}
                />
              </Grid>
              <Grid item xs={12}>
              
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
                </RouterLink>
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
          </RouterLink> {' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
