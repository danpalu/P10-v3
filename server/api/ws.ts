import { ChatMessage, ClientMessage, MessageContent, Question } from "~/utils/types";
import OpenAI from "openai";
import zodToJsonSchema from "zod-to-json-schema";
import { writeFile } from "fs";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default defineWebSocketHandler({
  open(peer) {},
  async message(peer, message) {
    const messageParsed = JSON.parse(message.toString());
    const messages: ClientMessage[] = messageParsed.messages;
    const question: Question = messageParsed.question;
    const previousAnswers: string = messageParsed.previousAnswers;
    let companyName: string = messageParsed.companyName;
    if (companyName === undefined) companyName = "virksomhed/organisation"; // Default value if companyName is not provided
    const messageHistory: ChatMessage[] = [];
    messages.forEach((msg) => {
      messageHistory.push({
        role: msg.role,
        content: msg.content.content.trim(),
      });
    });

    const stream = client.responses.stream({
      model: "gpt-4o-mini",
      temperature: 0.5,
      stream: true,
      text: {
        format: { type: "json_schema", name: "message_content", schema: zodToJsonSchema(MessageContent), strict: true },
      },
      input: [
        {
          role: "system",
          content: `You are a helpful design assistant, tasked with preparing the user for the first talk with a brand / graphical designer. 
          
          You help the user answer the question: "${question.title}" for their company ${companyName}. FOCUS ONLY ON THIS QUESTION. Instead of writing virksomhed/organisation, write ${companyName}.
          
          The user has previously answered other questions and will answer the unaswered ones in the future, which can be seen in the following json formatted text: 
          ${previousAnswers} 
          
          If applicable, use the previous answers to help the user reflect over the current question.

          You should ask the question as a "${question.type}" question.

          The multiple-choice-question is a question where the user can select one or more options from a list of options. For this, you should provide a list of options that are relevant to the user's previous answers. Each option should be a sentence of at least 7 words. Never write the questions in the content text.

          The branding-card-question is a question where the user can select an emotion of feel of their brand. For this, you should provide two options that are polar opposites. The options should be relevant to the user's company and previous answers. These might be e.g. Venlig vs Professionel, Modig vs Tryghedsskabende, Kreativ vs Struktureret. You should ask 3-5 of these questions in a row. Do not write the options in the content text.

          The moodboard-question is a question where the user can select a number of images from a list. For this, you should provide an appropriate search string to find images that reflect the user's company and previous answers. Do not put the search string in the content text. You should ask moodboard questions when talking about company values or the feel of a company.

          The color-question is a question where the user can select a color from a list of colors in hex format. For this, you should provide a list of colors based on the user's previous answers. Never show hex-codes or color names in the content text.

          Yes-no question can only be answered with yes or no.

          Yes-no-name questions can only be answered by yes or no. For this, you provide the company name in the content text. The company name is provided in the question object as a string.

          In link questions, you stick strictly to the question.

          Output in valid JSON format, following the scheme. 
          
          You can summarize the answer to the question by outputting the summary and asking if it is correct. If the summary if correct, output the summary as a answer to the stated question and make the type 'summary'. Summary questions are always of type 'yes-no-question', or if you asked the user about their company name, type 'yes-no-name-question'.
          
          Do not use ** for bold text. 

          Speak in Danish. 
          `,
        },
        ...messageHistory,
      ],
    });
    try {
      peer.send("[START]");
      for await (const chunck of stream) {
        if (chunck.type === "response.refusal.delta") {
          peer.send("[ERROR]");
        } else if (chunck.type === "response.output_text.delta") {
          if (!chunck.delta) continue;
          peer.send(chunck.delta);
        } else if (chunck.type === "error") {
          peer.send(`[ERROR] : ${chunck.message}`);
        } else if (chunck.type === "response.completed") {
          peer.send("[DONE]");
        }
      }
    } catch (error) {
      peer.send(`[ERROR] : ${error}`);
    }
  },
});
