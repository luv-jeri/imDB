import { createContext, useState, useEffect, useContext, useLayoutEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const useAuth = () => {
  const value = useContext(AuthContext);
  return value;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('auth/login', {
        email,
        password,
      });
      setUser(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await axios.get('auth/logout');
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const knock = async () => {
    try {
      const { data } = await axios.get('auth/whoami');
      console.log(data);
      setUser(data.content);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    knock();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {loading ? <h1>Loading...</h1> : children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
