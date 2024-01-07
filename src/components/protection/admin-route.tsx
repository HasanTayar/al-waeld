import React, { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../common/loader';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const AdminRoute = ({ children }: { children?: React.ReactNode }) => {
  const isAuthenticated = useSelector((state: RootState) => state.admin.isAuthenticated);

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to={`/auth-page?hashingcode=${import.meta.env.VITE_HASH}`} replace />;
  }

  // If authenticated, render the children components
  return (
    <Suspense fallback={<Loader />}>
      {children}
    </Suspense>
  );
};

export default AdminRoute;
