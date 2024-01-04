// services/subscriptionService.js
import { supabase } from "../supbase";

const subscribeToNewsletter = async (email:string) => {
  const { data, error } = await supabase
    .from('email_subscriptions')
    .insert([
      { email }
    ]);

  if (error) throw new Error(error.message);
  return data;
};

export const sendConfirmationEmail = async (email:string) => {

  console.log(`Send an email to ${email}`);
};

export default subscribeToNewsletter;
