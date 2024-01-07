import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AdminState {
  isAuthenticated: boolean;
  userData: any | null;
}

const userDataFromStorage = localStorage.getItem('admin');
const initialState: AdminState = {
  isAuthenticated: Boolean(userDataFromStorage),
  userData: userDataFromStorage ? JSON.parse(userDataFromStorage) : null,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = adminSlice.actions;

export default adminSlice.reducer;
