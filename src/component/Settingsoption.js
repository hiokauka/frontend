import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
  const [userImageURL, setUserImageURL] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [securityQuestionID, setSecurityQuestionID] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [securityPIN, setSecurityPIN] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/accounts/{accountId}/settings');
        const userData = response.data;

        // Update state with fetched data
        setFullName(userData.fullName);
        setGender(userData.gender);
        setDateOfBirth(userData.dateOfBirth);
        setAddress({
          streetName1: userData.streetName1,
          streetName2: userData.streetName2,
          town: userData.town,
          state: userData.state,
          postcode: userData.postcode,
          country: userData.country,
        });
        setUserImageURL(userData.userImageURL);
        setEmailAddress(userData.emailAddress);
        setUsername(userData.username);
        setPassword(userData.password);
        setTelephoneNumber(userData.telephoneNumber);
        setSecurityQuestionID(userData.securityQuestionID);
        setSecurityAnswer(userData.securityAnswer);
        setSecurityPIN(userData.securityPIN);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleSaveChanges = async () => {
    const updatedData = {
      fullName,
      gender,
      dateOfBirth,
      ...address,
      userImageURL,
      emailAddress,
      username,
      password,
      telephoneNumber,
      securityQuestionID,
      securityAnswer,
      securityPIN,
    };

    try {
      await axios.put('http://localhost:8080/accounts/{accountId}/settings', updatedData);
      console.log('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleAddCard = () => {
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
        sx={{ backgroundColor: 'white' }}
      />
      <TextField
        label="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }}
      />
      <TextField
        label="Date of Birth"
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        sx={{ backgroundColor: 'white' }}
      />
      <TextField
        label="Street Name 1"
        value={address.streetName1}
        onChange={(e) => setAddress({ ...address, streetName1: e.target.value })}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }}
      />
      <TextField
        label="Street Name 2"
        value={address.streetName2}
        onChange={(e) => setAddress({ ...address, streetName2: e.target.value })}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }}
      />
      <TextField
        label="Town"
        value={address.town}
        onChange={(e) => setAddress({ ...address, town: e.target.value })}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }}
      />
      <TextField
        label="State"
        value={address.state}
        onChange={(e) => setAddress({ ...address, state: e.target.value })}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }}
      />
      <TextField
        label="Postcode"
        value={address.postcode}
        onChange={(e) => setAddress({ ...address, postcode: e.target.value })}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }}
      />
      <TextField
        label="Country"
        value={address.country}
        onChange={(e) => setAddress({ ...address, country: e.target.value })}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }}
      />
      <TextField
        label="Profile Image URL"
        value={userImageURL}
        onChange={(e) => setUserImageURL(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }}
      />
      <TextField
        label="Email Address"
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }}
      />
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }}
      />
      <TextField
        label="Telephone Number"
        value={telephoneNumber}
        onChange={(e) => setTelephoneNumber(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }}
      />
      <TextField
        label="Security Question ID"
        value={securityQuestionID}
        onChange={(e) => setSecurityQuestionID(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }}
      />
      <TextField
        label="Security Answer"
        value={securityAnswer}
        onChange={(e) => setSecurityAnswer(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }}
      />
      <TextField
        label="Security PIN"
        type="password"
        value={securityPIN}
        onChange={(e) => setSecurityPIN(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white' }}
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
