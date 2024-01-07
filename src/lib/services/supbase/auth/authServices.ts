import { supabase } from '..'; 
import { store } from '@/store/store'; 
import { login, logout } from '@/store/adminSlice'; 

export const loginUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    if (data?.user) {
      localStorage.setItem('admin', JSON.stringify(data?.user));
      store.dispatch(login(data.user));
    }

    return { data };
  } catch (error:any) {
    console.error('Login error:', error.message);
    store.dispatch(logout());
    return { error };
  }
};

export const logoutUser = () => {
  localStorage.removeItem('admin');
  store.dispatch(logout());
};

