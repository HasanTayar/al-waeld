import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { logout } from '@/store/adminSlice';

const useInactivityLogout = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.admin.isAuthenticated);
  const [timeLeft, setTimeLeft] = useState(1800);

  useEffect(() => {
    const onActivity = () => {
      setTimeLeft(1800); 
    };

    window.addEventListener('mousemove', onActivity);
    window.addEventListener('keypress', onActivity);
    window.addEventListener('touchstart', onActivity);

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime > 0 ? prevTime - 1 : 0);
    }, 1000);

    const timeout = setTimeout(() => {
      if (isAuthenticated && timeLeft === 0) {
        localStorage.removeItem('admin');
        localStorage.removeItem('sb-ctucmkaslgeyneatnall-auth-token')
        dispatch(logout());
      }
    }, timeLeft * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      window.removeEventListener('mousemove', onActivity);
      window.removeEventListener('keypress', onActivity);
      window.removeEventListener('touchstart', onActivity);
    };
  }, [timeLeft, isAuthenticated, dispatch]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const isWarning = timeLeft <= 180;

  return {
    formattedTime,
    isWarning
  };
};

export default useInactivityLogout;
