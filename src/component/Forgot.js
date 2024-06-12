import React from 'react';
import ForgotPasswordPage from './PasswordReset';
import { Box } from '@mui/material';

function PasswordResetPage() {
  return (
    <Box
      sx={{
        backgroundImage: `url('/signupforgot.jpg')`, // Replace 'path/to/background-image.jpg' with the path to your background image
        backgroundSize: 'cover',
        minHeight: '100vh', // Ensure the background covers the entire viewport
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ForgotPasswordPage />
    </Box>
  );
}

export default PasswordResetPage;