import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ roles }) => {

  const { auth } = useContext(AuthContext);

  if (!auth.isAuthenticated) {

    return <Navigate to="/signin" />;

  }

  if (roles && roles.length > 0 && !roles.some((role) => auth.roles.includes(role))) {

    return <Navigate to="/unauthorized" />;

  }

  return <Outlet />;

};

export default PrivateRoute;