import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store'; // Adjust the import path as needed
import { logout } from '@/store/adminSlice';

const useInactivityLogout = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.admin.isAuthenticated);

  useEffect(() => {
    let timer:any;
    const onActivity = () => {
      if (isAuthenticated) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          localStorage.removeItem('admin');
          dispatch(logout());
        }, 3600000); // 1 hour
      }
    };

    if (isAuthenticated) {
      window.addEventListener('mousemove', onActivity);
      window.addEventListener('keypress', onActivity);
      window.addEventListener('touchstart', onActivity);

      onActivity();
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', onActivity);
      window.removeEventListener('keypress', onActivity);
      window.removeEventListener('touchstart', onActivity);
    };
  }, [dispatch, isAuthenticated]); // Re-run effect if isAuthenticated changes

  return null; // This hook does not return anything
};

export default useInactivityLogout;
