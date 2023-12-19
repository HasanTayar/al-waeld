
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPBASE_URI
const supabaseKey = import.meta.env.VITE_SUPBASE_API

export const supabase = createClient(supabaseUrl, supabaseKey)