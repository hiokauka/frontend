import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isSecurityQuestionCorrect, setIsSecurityQuestionCorrect] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [accountFound, setAccountFound] = useState(false);

  const handleFindAccount = async () => {
    try {
      const response = await axios.post('http://your-backend-url/api/find-account', {
        username: username.trim(),
      });
      if (response.data.securityQuestion) {
        setSecurityQuestion(response.data.securityQuestion);
        setAccountFound(true);
      }
    } catch (error) {
      console.error('Error finding account:', error);
      // Handle error: display error message or redirect to error page
    }
  };

  const handleSecurityQuestionSubmit = async () => {
    try {
      const response = await axios.post('http://your-backend-url/api/validate-security-question', {
        answer: answer.trim().toLowerCase(),
      });
      setIsSecurityQuestionCorrect(response.data.isCorrect);
      if (response.data.isCorrect) {
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      console.error('Error submitting security question answer:', error);
      // Handle error: display error message or redirect to error page
    }
  };

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setErrorText('Confirmation password does not match.');
      return;
    }

    try {
      await axios.post('http://your-backend-url/api/reset-password', {
        newPassword: newPassword.trim(),
      });
      setIsSnackbarOpen(true);
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    } catch (error) {
      console.error('Error resetting password:', error);
      // Handle error: display error message or redirect to error page
    }
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} textAlign="center">
        <Typography variant="h4" style={{ color: 'gold', fontFamily: 'Bigelow Rules', fontSize: '3rem', fontWeight: 'bold' }}>Forgot Password?</Typography>
        <Typography variant="body1" style={{ color: 'gold', fontFamily: 'Bigelow Rules', fontSize: '1.75rem' }}>Please enter your username to find your account.</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label={<Typography sx={{ fontFamily: 'Bigelow Rules', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>Username</Typography>}
          size="small"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            style: { backgroundColor: 'white' }, // Set background color of TextField
          }}
        />
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleFindAccount}>
          <Typography sx={{ fontFamily: 'Bigelow Rules', fontSize: '1.25rem' }}>Find Account</Typography>
        </Button>
      </Grid>
      {accountFound && (
        <>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h6">{securityQuestion}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Your Answer"
              size="small"
              type="password"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              InputProps={{
                style: { backgroundColor: 'white' }, // Set background color of TextField
              }}
            />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Button variant="contained" color="primary" onClick={handleSecurityQuestionSubmit}>
              Submit Answer
            </Button>
          </Grid>
        </>
      )}
      {isSecurityQuestionCorrect && (
        <>
          <Grid item xs={12} textAlign="center">
            <Typography variant="body1">Please enter your new password.</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="New Password"
              size="small"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                style: { backgroundColor: 'white' }, // Set background color of TextField
              }}
            />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="body1">Please confirm your new password.</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Confirm Password"
              size="small"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmPassword !== '' && newPassword !== confirmPassword}
              helperText={errorText}
              InputProps={{
                style: { backgroundColor: 'white' }, // Set background color of TextField
              }}
            />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Button variant="contained" color="primary" onClick={handlePasswordReset}>
              Reset Password
            </Button>
          </Grid>
        </>
      )}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Your password has been reset."
      />
    </Grid>
  );
};

export default ForgotPasswordPage;
