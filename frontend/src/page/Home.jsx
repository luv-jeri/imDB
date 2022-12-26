import React, { useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { useAuth } from '../context/auth.context';

export default function Home() {
  const { user, logout } = useAuth();
  console.log(user);

  return (
    <div>
      <h1>Welcome {user?.email}</h1>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
