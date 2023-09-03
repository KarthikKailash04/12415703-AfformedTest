import React, { useState } from 'react';

const API_BASE_URL = 'http://20.244.56.144/train';

function RegistrationForm() {
  const [registrationData, setRegistrationData] = useState({
    companyName: 'Train Central',
    ownerName: 'Ram',
    rollNo: '7030',
    ownerEmail: 'ram@abc.edu',
    accessCode: 'XGgVsc',
  });

  const [authData, setAuthData] = useState({
    companyName: 'Train Central',
    clientID: "8fed186f-1205-483c-86c5-46c72567d0e6",
    ownerName: 'Ram',
    ownerEmail: 'ram@abc.edu',
    rollNo: '7030',
    clientSecret:"RyaNUvCtOxgMSRur",
  });

  const handleRegistration = () => {
    fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful registration here
        console.log('Registration Successful:', data);
      })
      .catch((error) => {
        // Handle registration errors here
        console.error('Registration Failed:', error);
      });
  };

  const handleAuthentication = () => {
    fetch(`${API_BASE_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful authentication here
        console.log('Authentication Successful:', data);
      })
      .catch((error) => {
        // Handle authentication errors here
        console.error('Authentication Failed:', error);
      });
  };

  return (
    <div>
      <h2>Registration</h2>
      <button onClick={handleRegistration}>Register</button>

      <h2>Authentication</h2>
      <button onClick={handleAuthentication}>Authenticate</button>
    </div>
  );
}

export default RegistrationForm;
