import { UserState } from '@/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// Initial state
const initialState: UserState = {
  language: localStorage.getItem('userLanguage') || 'he',
  isFirstVisit: !localStorage.getItem('userLanguage'), // true if no language set in localStorage
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      state.isFirstVisit = false;
      localStorage.setItem('userLanguage', action.payload);
    },
  },
});

export const { setLanguage } = userSlice.actions;

export default userSlice.reducer;
