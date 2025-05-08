import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export default defineEventHandler(async (event) => {
  const supabase = createClient(supabaseUrl!, supabaseKey!);
  const { data, error } = await supabase.rpc("least_common_type");
  if (error) {
    console.error("Error fetching questionnaire type:", error);
    return "do-ai";
  }
  return data[0].type;
});
