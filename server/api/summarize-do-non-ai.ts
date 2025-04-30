import OpenAI from "openai";
import zodToJsonSchema from "zod-to-json-schema";
import { SummarySchema } from "~/utils/types";

export default defineEventHandler(async (event) => {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const body = await readBody(event);

  const response = await client.responses.parse({
    model: "gpt-4o-mini",
    text: {
      format: { type: "json_schema", name: "message_content", schema: zodToJsonSchema(SummarySchema), strict: true },
    },
    input: `
    Do a thorough summary of the following form sent. The form is used to prepare a client for a first talk with a brand / graphical designer. 
    The client has answered the form. 

    In the summary, you can reflect and interpret the answers to make it more meta or abstract. 
    Mention the feel, vibe and values of the company.
    
    If there is no answer, just say so. Do not make things up. 

    Answer in danish. The form is in danish as well. 
    
    Do not use # or ** 
    
    The summary is for the client to make sure that you have interpreted the answers correctly. 

    In the end, suggest some things that the client should reflect on before meeting the designer, maybe something that seems like the client has not thought that much about.  

    The form is as follows, with questions and answers in JSON format:


    ${body} 
    `,
  });
  const summary = response.output_parsed;

  return summary;
});
