import { useSelector } from 'react-redux';
import { RootState } from '@/store/store'; 

export const useUserLanguage = () => {
  const { language, isFirstVisit } = useSelector((state: RootState) => state.user);
  return { language, isFirstVisit }; 
}