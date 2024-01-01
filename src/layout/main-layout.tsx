import React, { Suspense } from 'react';
import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import Loader from '@/components/common/loader';
const LangModal = React.lazy(() => import('@/components/lang-modal'));

const MainLayout = ({ children }:{children?:React.ReactNode}) => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader/>}>
        <LangModal/>
      </Suspense>
      <main className='bg-slate-300'>{children}</main>
      <Footer/>
    </>
  );
};

export default MainLayout;
