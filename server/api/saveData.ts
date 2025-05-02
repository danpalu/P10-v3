import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export default defineEventHandler(async (event) => {
  const supabase = createClient(supabaseUrl!, supabaseKey!);
  const body = await readBody(event);
  const timeSpent = body.timeSpent;
  const dataToSave = body.dataToSave;
  console.log(timeSpent, dataToSave);
  //await supabase.from("logs").insert({});
  return "Save successful";
});
