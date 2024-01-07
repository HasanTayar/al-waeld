
import { supabase } from '..'; // Adjust the import path as needed
import { store } from '@/store/store'; // Adjust the import path as needed
import { login, logout } from '@/store/adminSlice'; // Adjust the import path as needed

export const loginUser = async (email: string, password: string): Promise<any> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    if (data) {
      localStorage.setItem('admin', JSON.stringify(data));
      store.dispatch(login(data));
    }

  return  data;
  } catch (error) {
    console.error('Login error:', error);
    store.dispatch(logout());
    return { error };
  }
};

export const logoutUser = () => {
  localStorage.removeItem('admin');
  store.dispatch(logout());
};
