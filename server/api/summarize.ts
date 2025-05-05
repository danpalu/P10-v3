import OpenAI from "openai";
import zodToJsonSchema from "zod-to-json-schema";
import { SummarySchema, SummarySchemaType } from "~/utils/types";

export default defineEventHandler(async (event) => {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const body = await readBody(event);
  const questionnaireData = body.data;

  const summaryType = body.summaryType;

  let typeText = "";

  switch (summaryType) {
    case "raw":
      typeText = `You should output the form kinda like in raw format, meaning just put the question into the title and the answer to it into content. Do not change the answers at all. Do not interpret the answers. . 
      
      If a question is unanswered ie. questionContent is empty,  DO NOT PUT IT IN THE OUTPUT. IF YOU INCLUDE IT I WILL KILL YOU. If there is what looks to be an answer in the questionTitle (it is marked with "..." at the end) it is A PART OF THE QUESTION AND NOT THE ANSWER`;
      break;
    case "interpretation":
      typeText = `Do a thorough summary of the following form sent. The form is used to prepare a client for a first talk with a brand / graphical designer. 
    
      The client has answered the form. 

      In the summary, you can reflect and interpret the answers to make it more meta or abstract. Mention the feel, vibe and values of the company.

      In the end, suggest some things that the client should reflect on before meeting the designer, maybe something that seems like the client has not thought that much about. Make it a bit provocative and in its own section called 'Refleksioner'`;

      break;
    case "basic":
      typeText = `Do a thorough summary of the following form sent. 
    
      The client has answered the form. `;
      break;
    case "questionSuggestions":
      typeText = `      
      Give a list of questions that the client should reflect on before meeting the designer. They can be provocative and thought provoking. The title of the question should be the question itself. The content should be a short explanation of why this is important to reflect on.`;
      break;
    default:
      typeText = "raw";
      break;
  }

  console.log(questionnaireData);

  const response = await client.responses.parse({
    model: "gpt-4.1-mini",
    text: {
      format: { type: "json_schema", name: "message_content", schema: zodToJsonSchema(SummarySchema), strict: true },
    },
    input: `
    ${typeText}

    The form is used to prepare a client for a first talk with a brand / graphical designer. 

    Answer in danish. The form is in danish as well. 
    
    Do not use # or ** 

    The summaryType is ${summaryType}

    The form is as follows, with questions and answers in JSON format:


    ${JSON.stringify(questionnaireData)} 
    `,
  });
  const summary = response.output_parsed;

  return summary;
});
