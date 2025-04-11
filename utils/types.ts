import { z } from "zod";

export const MessageContent = z.object({
  type: z.enum(["text", "slider-question", "binary-question", "summary", "color-question"]),
  sliderDetails: z
    .object({
      xAxis: z.object({ minLabel: z.string(), maxLabel: z.string() }),
    })
    .nullable(),
  colorDetails: z.object({ colors: z.array(z.string()) }).nullable(),
  content: z.string(),
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
  answer: ClientMessage[];
  summary: string;
};

export type QuestionSection = {
  id: number;
  title: string;
  questions: Question[];
};
