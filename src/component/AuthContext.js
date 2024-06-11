import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated on initial load
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedRole = localStorage.getItem('role');
  
    if (storedAuth === 'true' && storedRole) {
      setIsAuthenticated(true);
      setRole(storedRole);
    } else {
      setIsAuthenticated(false); // Default to false if no stored authentication info
      setRole(null); // Default to null if no stored role info
    }
  }, [localStorage.getItem('isAuthenticated'), localStorage.getItem('role')]);

  // useEffect(() => {
  //   // Check if the user is authenticated on initial load
  //   const storedAuth = localStorage.getItem('isAuthenticated');
  //   const storedRole = localStorage.getItem('role');

  //   if (storedAuth === 'true' && storedRole) {
  //     setIsAuthenticated(true);
  //     setRole(storedRole);
  //   }
  // }, []);

  const login = (role) => {
    setIsAuthenticated(true);
    setRole(role);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('role', role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);

    localStorage.setItem('isAuthenticated', false);
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};