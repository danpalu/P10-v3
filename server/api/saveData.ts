import { writeFile, openSync, access } from "fs";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  const timestamp: number = Date.now();
  writeFile(`./logs/saveData-${timestamp}.json`, data, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return "Error writing file";
    }
  });
  return "Save successful";
});
