import React, { useState } from 'react';
import { Button, TextField, Stack, Paper } from '@mui/material';
import '../styles/SignIn.css';
import { useAuth } from '../context/auth.context';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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
            onClick={() => {
              login(email, password);
            }}
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
