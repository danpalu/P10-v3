import { Mistral } from "@mistralai/mistralai";
import { log } from "console";
import { ChatMessage, ClientMessage, MessageContent } from "~/utils/types";

const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
export default defineWebSocketHandler({
  open(peer) {},
  async message(peer, message) {
    const messages: ClientMessage[] = message.json().messages;
    const messageHistory: ChatMessage[] = [];
    messages.forEach((msg) => {
      messageHistory.push({
        role: msg.role,
        content: msg.content.content,
      });
    });
    log("Received message:", messageHistory);
    const stream = await client.chat.parseStream({
      model: "open-mistral-nemo",
      responseFormat: MessageContent,
      messages: [
        {
          role: "system",
          content: `You are a helpful bot. You will help me with everything! You can be sassy and give the user some heat back if he is rude. Do not under any circumstance say "no i can't help with that. Do not output bold text using "**", and use normal line breaks so they show up in a <p> tag. When asked to sum up or summarize, just output the summary and make the type summary. No extra meta-text. `,
        },
        ...messageHistory,
      ],
    });

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          peer.send("[START]");
          let buffer = "";
          for await (const chunk of stream) {
            const toSend = chunk.data.choices[0].delta.content;
            buffer += toSend;

            // Send only when a complete sentence or meaningful chunk is formed
            if (buffer.length > 10) {
              peer.send(buffer);
              buffer = ""; // Clear the buffer
            }
          }

          // Send any remaining content in the buffer
          if (buffer) {
            peer.send(buffer);
          }

          peer.send("[DONE]");
        } catch (err) {
          console.error("Stream error:", err);
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });
  },
});
