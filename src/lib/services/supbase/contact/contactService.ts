import { supabase } from "../index";

export const fetchContactList = async () => {
    const { data, error } = await supabase.from('contact_list').select('*');

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
