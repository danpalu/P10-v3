import { z } from "zod";

export const MessageContent = z.object({
  content: z.string(),
  type: z.enum(["text", "slider-question", "binary-question", "summary"]),
});

export type MessageContentType = z.infer<typeof MessageContent>;

export type ClientMessage = {
  role: "system" | "user" | "assistant";
  content: MessageContentType;
};

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type Question = {
  id: number;
  title: string;
  type: "text" | "chat";
  answer: Answer;
};

export type Answer = {
  answer: ClientMessage[] | string;
  summary: string;
};

export type QuestionSection = {
  title: string;
  questions: Question[];
};
