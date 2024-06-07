import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isSecurityQuestionCorrect, setIsSecurityQuestionCorrect] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handlePhoneNumberSubmit = () => {
    if (phoneNumber.trim() !== '') {
      setSecurityQuestion('What is your pet\'s name?');
    }
  };

  const handleSecurityQuestionSubmit = () => {
    const isCorrect = answer.toLowerCase() === 'dummy';
    setIsSecurityQuestionCorrect(isCorrect);
    if (isCorrect) {
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handlePasswordReset = () => {
    if (newPassword !== confirmPassword) {
      setErrorText('Confirmation password does not match.');
      return;
    }

    // Reset password logic here
    console.log('New Password:', newPassword);
    setIsSnackbarOpen(true);
    setTimeout(() => {
      navigate('/signin');
    }, 3000);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} textAlign="center">
        <Typography variant="h4">Forgot Password?</Typography>
        <Typography variant="body1">Please enter your phone number to proceed.</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Phone Number"
          size="small"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Button variant="contained" color="primary" onClick={handlePhoneNumberSubmit}>
          Submit Phone Number
        </Button>
      </Grid>
      {securityQuestion && (
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
