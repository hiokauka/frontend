import React, { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const SettingsComponent = () => {
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState({
    streetName1: '',
    streetName2: '',
    town: '',
    state: '',
    postcode: '',
    country: '',
  });
  const [userImage, setUserImage] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [securityPIN, setSecurityPIN] = useState('');
  
  const handleSaveChanges = () => {
    // Logic to save changes to the backend
    console.log('Changes saved successfully!');
  };

  const handleAddCard = () => {
    // Logic to handle adding a new card
    console.log('Add card clicked!');
  };

  return (
    <div>
      <Typography variant="h6">Account Settings</Typography>
      <TextField
        label="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }} // Set background color to white
      />
      <TextField
        label="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }} // Set background color to white
      />
      <TextField
        label="Date of Birth"
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }} // Set background color to white
      />
      <TextField
        label="Street Name 1"
        value={address.streetName1}
        onChange={(e) => setAddress({ ...address, streetName1: e.target.value })}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }} // Set background color to white
      />
      <TextField
        label="Street Name 2"
        value={address.streetName2}
        onChange={(e) => setAddress({ ...address, streetName2: e.target.value })}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }} // Set background color to white
      />
      <TextField
        label="Town"
        value={address.town}
        onChange={(e) => setAddress({ ...address, town: e.target.value })}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }} // Set background color to white
      />
      <TextField
        label="State"
        value={address.state}
        onChange={(e) => setAddress({ ...address, state: e.target.value })}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }} // Set background color to white
      />
      <TextField
        label="Postcode"
        value={address.postcode}
        onChange={(e) => setAddress({ ...address, postcode: e.target.value })}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }} // Set background color to white
      />
      <TextField
        label="Country"
        value={address.country}
        onChange={(e) => setAddress({ ...address, country: e.target.value })}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }} // Set background color to white
      />
      <TextField
        label="Profile Image URL"
        value={userImage}
        onChange={(e) => setUserImage(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }} // Set background color to white
      />
      <TextField
        label="Email Address"
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }} // Set background color to white
      />
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }} // Set background color to white
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }} // Set background color to white
      />
      <TextField
        label="Telephone Number"
        value={telephoneNumber}
        onChange={(e) => setTelephoneNumber(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }} // Set background color to white
      />
      <TextField
        label="Security Question"
        value={securityQuestion}
        onChange={(e) => setSecurityQuestion(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }} // Set background color to white
      />
      <TextField
        label="Security Answer"
        value={securityAnswer}
        onChange={(e) => setSecurityAnswer(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }} // Set background color to white
      />
      <TextField
        label="Security PIN"
        type="password"
        value={securityPIN}
        onChange={(e) => setSecurityPIN(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }} // Set background color to white
      />
      <Link to="/Addcard" color="inherit" underline="none">
        <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }}>
          Add Card
        </Button>
      </Link>
      <Button variant="contained" color="primary" onClick={handleSaveChanges} sx={{ mt: 2 }}>
        Save Changes
      </Button>
    </div>
  );
};

export default SettingsComponent;
