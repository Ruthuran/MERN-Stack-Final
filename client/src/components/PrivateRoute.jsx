import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const PrivateRoute = () => {
  const { user, isAuthenticated, hydrated } = useAuth();
  const location = useLocation();

  // Handle the loading state while context is being hydrated
  if (!hydrated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  // If the user is not authenticated, redirect to login
  if (!isAuthenticated) {
    // Ensure the toast notification is not triggered repeatedly
    if (location.pathname !== "/login") {
      toast.error("You must be logged in to access this page.");
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
