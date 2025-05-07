import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export default defineEventHandler(async (event) => {
  const supabase = createClient(supabaseUrl!, supabaseKey!);
  const body = await readBody(event);
  const timeSpent = body.timeSpent;
  const dataToSave = body.dataToSave;
  const type = body.type;
  try {
    await supabase.from("logs").insert([{ data: dataToSave, time_spent: timeSpent, type: type }]);
  } catch (error) {
    console.error("Error saving data:", error);
    return "Save failed";
  }
  console.log("Data saved to Supabase");

  return "Save successful";
});
