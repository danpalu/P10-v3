import { Mistral } from "@mistralai/mistralai";
import { ChatMessage, ClientMessage, MessageContent } from "~/utils/types";

const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
export default defineWebSocketHandler({
  open(peer) {},
  async message(peer, message) {
    const messages: ClientMessage[] = message.json();
    const messageHistory: ChatMessage[] = [];

    messages.forEach((msg) => {
      messageHistory.push({
        role: msg.role,
        content: msg.content.content,
      });
    });
    const stream = await client.chat.parseStream({
      model: "mistral-large-latest",
      responseFormat: MessageContent,
      messages: [
        {
          role: "system",
          content: `You are a helpful design assistant. You will help me with everything! Do not under any circumstance say "no i can't help with that. Output in plain text.`,
        },
        {
          role: "user",
          content: `${message}`,
        },
      ],
    });

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          peer.send("[START]");
          for await (const chunk of stream) {
            const toSend = chunk.data.choices[0].delta.content;
            peer.send(toSend);
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
