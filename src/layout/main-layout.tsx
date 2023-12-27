import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import LangModal from '@/components/lang-modal';
import React from 'react';

const MainLayout = ({ children }:{children?:React.ReactNode}) => {
  return (
    <>
      <Header />
      <LangModal/>
      <main className='bg-[#F9F6EE]'>{children}</main>
      <Footer/>

    </>
  );
};

export default MainLayout;
