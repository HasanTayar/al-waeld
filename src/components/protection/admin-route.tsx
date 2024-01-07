import React, { Suspense } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Loader from '../common/loader';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
const getQueryParam = (param: string, search: string) => {
  const queryParams = new URLSearchParams(search);
  return queryParams.get(param);
};

const AdminRoute = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const hashingcode = getQueryParam('hashingcode', location.search);
  const isAuthenticated = useSelector((state: RootState) => state.admin.isAuthenticated);
  console.log(isAuthenticated)

  if(hashingcode !== import.meta.env.VITE_HASH){
    return <Navigate to="*" replace/>
  }else if (!isAuthenticated || hashingcode !== import.meta.env.VITE_HASH) {
    return <Navigate to="/" replace />; 
  }

  return (
    <Suspense fallback={<Loader />}>
      {children}
    </Suspense>
  );
};

export default AdminRoute;
