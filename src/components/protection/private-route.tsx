import React, { Suspense } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Loader from '../common/loader';


const getQueryParam = (param: string, search: string) => {
  const queryParams = new URLSearchParams(search);
  return queryParams.get(param);
};

const PrivateRoute = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const hashingcode = getQueryParam('hashingcode', location.search);

  if(hashingcode !== import.meta.env.VITE_HASH){
    return <Navigate to="*" replace/>
  }

  return (
    <Suspense fallback={<Loader />}>
      {children}
    </Suspense>
  );
};

export default PrivateRoute;
