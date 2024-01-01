import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/main-layout';
import Loader from './components/common/loader';

const Home = lazy(() => import('./pages/home'));
const AboutUs = lazy(() => import('./pages/about-us'));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/' 
          element={
            <MainLayout>
              <Suspense fallback={<Loader/>}>
                <Home />
              </Suspense>
            </MainLayout>
          }
        />
        <Route 
          path='/about-us' 
          element={
            <MainLayout>
              <Suspense fallback={<Loader/>}>
                <AboutUs />
              </Suspense>
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
