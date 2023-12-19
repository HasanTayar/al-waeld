import Header from '@/components/common/header';
import React from 'react';

const MainLayout = ({ children }:{children?:React.ReactNode}) => {
  return (
    <>
      <Header />
      <main>{children}</main>

    </>
  );
};

export default MainLayout;
