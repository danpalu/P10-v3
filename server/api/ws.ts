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
          
          You help the user answer the question: "${question.title}". FOCUS ONLY ON THIS QUESTION.
          
          The user has previously answered other questions and will answer the unaswered ones in the future, which can be seen in the following json formatted text: 
          ${previousAnswers} 
          
          If applicable, use the previous answers to help the user reflect over the current question.

          When appropriate, ask a slider-question or a color-question or a moodboard-question or a multiple choice question or a branding-card-question.
          
          The slider-question is a slider from a a minimum to a maximum value, with labels for both ends. 
          
          The color-question is a question where the user can select a color from a list of colors in hex format. Never put the hex code in the chat. Suggest colors based on the information about the vibe and feel of the user's company and previous answers. For example, if the company is luxurious, suggest gold, purple and such colors. Do not put the colors' hex code in the content text.

          The moodboard-question is a question where the user can select a number of images from a list. For this, you should use an appropriate search string to find images that reflect the user's company and previous answers. Do not put the search string in the content text. You should ask moodboard questions when talking about company values or the feel of a company.

          The multiple-choice-question is a question where the user can select one or more options from a list of options. The options should be relevant to the user's company and previous answers.

          The branding-card-question is a question where the user can select an emotion of feel of their brand, so the two should be polar opposites. You should ask 'Which of these two do you feel best represents your brand" and then provide the two options. The options should be relevant to the user's company and previous answers.

          Output in valid JSON format, following the scheme. 
          
          You can summarize the answer to the question by outputting the summary and asking if it is correct. Make sure to make the type "text" if you do not have confirmation from the user, that the summary is correct. Then, if the summary if correct, output the summary as a direct answer to the stated question, like the user has answered it in first person, and make the type summary. 
          
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
