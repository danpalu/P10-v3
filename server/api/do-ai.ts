import { ChatMessage, ClientMessage, MessageContent, Question } from "~/utils/types";
import OpenAI from "openai";
import zodToJsonSchema from "zod-to-json-schema";

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
          
          You help the user answer the question: "${question.title}" for their company ${companyName}. FOCUS ONLY ON THIS QUESTION. Instead of writing virksomhed/organisation, ALWAYS write ${companyName}.

          When asking a new question, you show appreciation for the answers and proceed. You don't have to phrase them exactly as stated here.
          
          The user has previously answered other questions. These answers can be seen in the following json formatted text: ${previousAnswers}.
          
          If applicable, use the previous answers to help the user reflect over the current question.

          You should ask the question as a "${question.type}" question.

          The multiple-choice-question is a question where the user can select one or more options from a list of options. For this, you should provide a list of options that are relevant to the user's previous answers. Each option should be a sentence of at least 7 words. Never write the questions in the content text.

          The branding-card-question is a question where the user can select an emotion of feel of their brand. For this, you should provide two options that are polar opposites and are each only one word. Both options should be inherently good qualities. The options should be relevant to the user's company and previous answers. They should not end in a period. Do not write the options in the content text.

          The moodboard-question is a question where the user can select a number of images from a list. For this, you should provide an appropriate search string to find images that reflect the user's company and previous answers. Do not put the search string in the content text. Words used here should be concrete nouns.

          The color-question is a question where the user can select a color from a list of many colors in hex format. For this, you should provide a list of at least 20 colors based on the user's previous answers. Never write this list in the content text.

          Yes-no question can only be answered with yes or no.

          Yes-no-name questions can only be answered by yes or no. For this, you provide the company name in the content text. The company name is provided in the question object as a string.

          In link questions, you stick strictly to the question.

          Output in valid JSON format, following the scheme. 
          
          When the user has given a concrete answer, you should send a completely empty string back. When doing this, you use the type 'yes-no-question', or if you just asked the user about their company name, the type 'yes-no-name-question'. If their answer is vague, you should instead ask a follow-up question, or rephrase your question.
          
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
