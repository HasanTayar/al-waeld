import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/main-layout";
import Loader from "./components/common/loader";
import AuthPage from "./pages/auth/auth-page";
import PrivateRoute from "./components/protection/private-route";
import AdminHome from "./pages/admin/admin-home";
import AdminLayout from "./layout/admin-layout";
import AdminRoute from "./components/protection/admin-route";
import { useDispatch } from "react-redux";
import { login } from "./store/adminSlice";
import CoursesPage from "./pages/courses";
// import EmailTemplateEditor from './components/admin/email-editor';
import { HelmetProvider } from "react-helmet-async";
import OurTreatments from "./pages/our-treatments";
const EditPage = lazy(() => import("./components/admin/common/edit-page"));

const Home = lazy(() => import("./pages/home"));

const AboutUs = lazy(() => import("./pages/about-us"));
const NotFound = lazy(() => import("./components/common/not-found"));
const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("admin");
    if (userDataFromStorage) {
      const userData = JSON.parse(userDataFromStorage);
      dispatch(login(userData));
    }
  }, [dispatch]);
  return (
    <HelmetProvider>
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
                  <CoursesPage />
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
            path="/our-treatments"
            element={
              <MainLayout>
                <Suspense fallback={<Loader />}>
                  <OurTreatments />
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
            path="/edit/:pageName"
            element={
              <AdminLayout>
                <AdminRoute>
                  <Suspense fallback={<Loader />}>
                    <EditPage />
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
    </HelmetProvider>
  );
};

export default AppRoutes;
