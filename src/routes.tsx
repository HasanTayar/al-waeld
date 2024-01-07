import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/main-layout";
import Loader from "./components/common/loader";
import Courses from "./pages/courses";
import AuthPage from "./pages/auth/auth-page";
import PrivateRoute from "./components/protection/private-route";
import AdminHome from "./pages/admin/admin-home";
import AdminLayout from "./layout/admin-layout";
import AdminRoute from "./components/protection/admin-route";
import { useDispatch } from "react-redux";
import { login } from "./store/adminSlice";
// import EmailTemplateEditor from './components/admin/email-editor';

const Home = lazy(() => import("./pages/home"));

const AboutUs = lazy(() => import("./pages/about-us"));
const NotFound = lazy(() => import("./components/common/not-found"));
const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserData = localStorage.getItem('admin');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      dispatch(login(userData));
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Suspense fallback={<Loader />}>
                <Home />
              </Suspense>
            </MainLayout>
          }
        />
        <Route
          path="/courses"
          element={
            <MainLayout>
              <Suspense fallback={<Loader />}>
                <Courses />
              </Suspense>
            </MainLayout>
          }
        />
        <Route
          path="/about-us"
          element={
            <MainLayout>
              <Suspense fallback={<Loader />}>
                <AboutUs />
              </Suspense>
            </MainLayout>
          }
        />
        <Route
          path="/auth-page"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <AuthPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <AdminLayout>
              <AdminRoute>
                <Suspense fallback={<Loader />}>
                  <AdminHome />
                </Suspense>
              </AdminRoute>
            </AdminLayout>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loader />}>
              <MainLayout>
                <NotFound />
              </MainLayout>
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
