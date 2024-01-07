import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
  isAuthenticated: boolean;
  userData: any; 
}

const initialState: AdminState = {
  isAuthenticated: false,
  userData: null,
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

export const selectIsAuthenticated = (state: { admin: AdminState }) => state.admin.isAuthenticated;
export const selectUserData = (state: { admin: AdminState }) => state.admin.userData;

export default adminSlice.reducer;
