import { z } from "zod";

export const MessageContent = z.object({
  content: z.string(),
  type: z.enum(["text", "slider-question", "binary-question"]),
});

export type MessageContentType = z.infer<typeof MessageContent>;

export type ClientMessage = {
  role: "system" | "user" | "assistant" | "tool";
  content: MessageContentType;
};

export type ChatMessage = {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
};

export class Question {
  id: number;
  title: string;
  answer: string;
  showChat: boolean;

  constructor(
    id: number,
    title: string,
    showChat: boolean = false,
    answer: string = ""
  ) {
    this.id = id;
    this.title = title;
    this.answer = answer;
    this.showChat = showChat;
  }
}
