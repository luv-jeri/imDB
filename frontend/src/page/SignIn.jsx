import React, { useState, useEffect } from 'react';
import { Button, TextField, Stack, Paper } from '@mui/material';
import '../styles/SignIn.css';
import axios from 'axios';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await axios.post('auth/login', {
      email,
      password,
    });

    console.log(data.content.token);
  };
  return (
    <div>
      <Paper elevation={3} className='sign-in-container'>
        <Stack spacing={2} direction='column' sx={{ p: 2 }}>
          <TextField
            id='email-input-sign-in'
            label='Email'
            variant='outlined'
            type='email'
            required
            onChange={handleEmailChange}
          />
          <TextField
            id='password-input-sign-in'
            label='Password'
            variant='outlined'
            type='password'
            required
            onChange={handlePasswordChange}
          />
          <Button
            onClick={handleSubmit}
            id='sign-in-button'
            variant='contained'
            type='submit'
          >
            Sign In
          </Button>
        </Stack>
      </Paper>
    </div>
  );
}
