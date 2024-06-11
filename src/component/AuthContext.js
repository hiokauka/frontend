import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  useEffect(() => {
    // Check if the user is authenticated on initial load
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedRole = localStorage.getItem('role');
  
    if (storedAuth === 'true' && storedRole) {
      setIsAuthenticated(true);
      setRole(storedRole);
      setUsername(storedUsername);
      setPassword(storedPassword);
    } else {
      setIsAuthenticated(false); // Default to false if no stored authentication info
      setRole(null); // Default to null if no stored role info
      setUsername('');
      setPassword('');
    }
  }, [localStorage.getItem('isAuthenticated'), localStorage.getItem('role')]);

  const login = (role, username, password) => {
    setIsAuthenticated(true);
    setRole(role);
    setUsername(username);
    setPassword(password);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    setUsername('');
    setPassword('');
    
    localStorage.setItem('isAuthenticated', false);
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};