import { UserState } from '@/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Utility function to validate and return the language
const getValidLanguage = (lang: string | null): 'ar' | 'he' => {
  if (lang === 'ar' || lang === 'he') {
    return lang;
  }
  return 'he'; // Default language
};

// Initial state
const initialState: UserState = {
  language: getValidLanguage(localStorage.getItem('userLanguage')),
  isFirstVisit: !localStorage.getItem('userLanguage'), // true if no language set in localStorage
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'ar' | 'he'>) => {
      state.language = action.payload;
      state.isFirstVisit = false;
      localStorage.setItem('userLanguage', action.payload);
    },
  },
});

export const { setLanguage } = userSlice.actions;

export default userSlice.reducer;
