import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, isSignedIn }) {
  if (!isSignedIn) {
    return <Navigate to='/' replace />;
  }

  return children;
}

export default ProtectedRoute;
