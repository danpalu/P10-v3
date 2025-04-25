import { z } from "zod";

export const MessageContent = z.object({
  content: z.string(),
  type: z.enum([
    "text",
    "summary",
    "slider-question",
    "color-question",
    "moodboard-question",
    "multiple-choice-question",
    "branding-card-question",
    "yes-no-question",
  ]),
  sliderDetails: z
    .object({
      xAxis: z.object({ minLabel: z.string(), maxLabel: z.string() }),
    })
    .nullable(),
  colorDetails: z.object({ colors: z.array(z.string()) }).nullable(),
  moodboardSearchString: z.string().nullable(),
  brandingCardDetails: z.object({ emotion: z.string(), oppositeEmotion: z.string() }).nullable(),
  multipleChoiceDetails: z.array(z.string()).nullable(),
  hiddenInChat: z.boolean().nullable(),
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
  answer: Answer;
  type: string;
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

export type Questionnaire = {
  type: "chat" | "survey" | "do-non-ai" | "do-ai";
  sections: QuestionSection[];
};
