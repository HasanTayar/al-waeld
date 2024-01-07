import { supabase } from "../supbase";

export const subscribeToNewsletter = async (email:string) => {
  const { data, error } = await supabase
    .from('email_subscriptions')
    .insert([
      { email, is_admin: false } // Set is_admin to false by default
    ]);

  if (error) throw new Error(error.message);

  return data;
};

export const isAdmin = async (email:string) => {
  const { data, error } = await supabase
    .from('email_subscriptions')
    .select('is_admin')
    .eq('email', email)
    .single();

  if (error) {
    console.error(error.message);
    return false;
  }

  return data ? data.is_admin : false; 
};

export const sendConfirmationEmail = async (email:string) => {
  console.log(`Send an email to ${email}`);
};
