import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({ isAuthenticated: false, user: null, roles: [] });

  useEffect(() => {

    const fetchUser = async () => {

      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');

      if (username && password) {

        try {

          const response = await axios.get('/user/me', { auth: { username, password } });
          setAuth({ isAuthenticated: true, user: response.data, roles: response.data.roles });

        } catch (error) {
            
          console.error(error);

        }

      }

    };

    fetchUser();

  }, []);

  const login = async (username, password) => {

    try {

      const response = await axios.get('/user/me', { auth: { username, password } });

      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      setAuth({ isAuthenticated: true, user: response.data, roles: response.data.roles });

    } catch (error) {

      console.error(error);

    }

  };

  const logout = () => {

    localStorage.removeItem('username');
    localStorage.removeItem('password');

    setAuth({ isAuthenticated: false, user: null, roles: [] });

  };

  return (

    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>

  );
  
};

export default AuthContext;