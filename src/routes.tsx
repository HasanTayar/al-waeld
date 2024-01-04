import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/main-layout';
import Loader from './components/common/loader';
import Courses from './pages/courses';
// import EmailTemplateEditor from './components/admin/email-editor';

const Home = lazy(() => import('./pages/home'));

const AboutUs = lazy(() => import('./pages/about-us'));
const NotFound = lazy(() => import('./components/common/not-found'));
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
          path='/courses' 
          element={
            <MainLayout>
              <Suspense fallback={<Loader/>}>
                <Courses />
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
        {/* <Route 
          path='/test' 
          element={
            <MainLayout>
              <Suspense fallback={<Loader/>}>
                <EmailTemplateEditor />
              </Suspense>
            </MainLayout>
          }
        /> */}
        <Route
        path='*'
        element={
          <Suspense fallback={<Loader/>}>
            <MainLayout>
            <NotFound/>
            </MainLayout>
          </Suspense>
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
