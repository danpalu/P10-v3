import { ChatMessage, ClientMessage, MessageContent, Question } from "~/utils/types";
import OpenAI from "openai";
import zodToJsonSchema from "zod-to-json-schema";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default defineWebSocketHandler({
  open(peer) {},
  async message(peer, message) {
    const messages: ClientMessage[] = message.json().messages;
    const question: Question = message.json().question;
    const previousAnswers: string = message.json().previousAnswers;
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
          content: `You are a helpful design assistant, tasked with preparing the user for the first talk with a designer. 
          
          Speak in Danish. 
          
          You help the user reflect over the following question: ${question.title}. Focus ONLY on that question during this conversation. 
          
          You ask the user followup question to make sure the user comes up with a well thought out answer. 
          
          The user has previously answered other questions, which can be seen in the following json formatted text: 

          ${previousAnswers} 
          
          If applicable, use the previous answers to help the user reflect over the current question.

          When appropriate, ask a slider-question or a color-question. 
          The slider-question is a slider from a a minimum to a maximum value, with labels for both ends. The color-question is a question where the user can select a color from a list of colors in hex format. Suggest colors based on the information about the vibe and feel of the user's company and previous answers. Do not put the colors in the content text.

          Output in valid JSON format, following the scheme. 
          
          You can summarize the conversation by outputting the summary and asking if it is correct. Make sure to make the type "text" if you do not have confirmation from the user, that the summary is correct. Then, if the summary if correct, output the summary as a direct answer to the stated question, like the user has answered it in first person, and make the type summary. `,
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

/*
const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
export default defineWebSocketHandler({
  open(peer) {},
  async message(peer, message) {
    const messages: ClientMessage[] = message.json().messages;
    const messageHistory: ChatMessage[] = [];
    messages.forEach((msg) => {
      messageHistory.push({
        role: msg.role,
        content: msg.content.content.trim(),
      });
    });
    
    const stream = await client.chat.parseStream({
      model: "mistral-large-latest",
      temperature: 0.5,
      frequencyPenalty: 0.5,
      presencePenalty: 0.5,
      responseFormat: MessageContent,
      messages: [
        {
          role: "system",
          content: `You are a helpful bot. You will help me with everything! You can be sassy and give the user some heat back if he is rude. Do not under any circumstance say "no i can't help with that. Do not output bold text using "**", and use normal line breaks so they show up in a <p> tag. When asked to sum up or summarize, just output the summary and make the type summary. No extra meta-text. Output in valid JSON format, following the scheme`,
        },
        ...messageHistory,
      ],
    });
    peer.send("[START]");
    try {
      for await (const chunck of stream) {
        const streamText = chunck.data.choices[0].delta.content;
        if (!streamText) {
          continue;
        }
        peer.send(streamText);
      }
      peer.send("[DONE]");
    } catch (error) {
      peer.send(`[ERROR] : ${error}`);
    }
    return;
  },
});

*/
