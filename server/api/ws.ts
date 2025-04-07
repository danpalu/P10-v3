import { ChatMessage, ClientMessage, MessageContent } from "~/utils/types";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

    const stream = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.5,
      stream: true,
      response_format: zodResponseFormat(MessageContent, "message_content"),
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
        const streamText = chunck.choices[0].delta.content;
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
