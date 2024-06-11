import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import SignInSide from './SignInSide';


const ProtectedRoute = ({ element: Component }) => {
  // const isAuthenticated = localStorage.getItem('isAuthenticated');
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Component /> : <SignInSide />;
};

export default ProtectedRoute;

// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const ProtectedRoute = ({ element: Component }) => {
//   const { isAuthenticated } = useAuth();

//   return isAuthenticated ? <Component /> : <Navigate to="/signin" />;
// };

// export default ProtectedRoute;
