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
  type: "simpleText" | "chat";
  answer: Answer;

  constructor(
    id: number,
    title: string,
    type: "simpleText" | "chat" = "simpleText",
    answer: Answer = new Answer("", "")
  ) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.answer = answer;
  }
}

export class Answer {
  answer: ClientMessage[] | string;
  summary: string;

  constructor(answer: ClientMessage[] | string, summary: string) {
    this.answer = answer;
    this.summary = summary;
  }
}
