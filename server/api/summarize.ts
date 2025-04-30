import OpenAI from "openai";

export default defineEventHandler(async (event) => {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const body = await readBody(event);
  const urlParams = new URLSearchParams(body);

  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: `
    Summarize the following form. Leave out unanswered questions. 
    Output only 100 words. 

    ${urlParams} 
    `,
  });
  const summary = response.output_text;

  return summary;
});
