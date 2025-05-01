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
    "yes-no-name-question",
    "link-question",
  ]),
  sliderDetails: z.object({ xAxis: z.object({ minLabel: z.string(), maxLabel: z.string() }) }).nullable(),
  colorOptions: z.array(z.string()).nullable(),
  moodboardSearchString: z.string().nullable(),
  brandingCardOptions: z.object({ option: z.string(), oppositeOption: z.string() }).nullable(),
  multipleChoiceOptions: z.array(z.string()).nullable(),
  link: z.string().nullable(),
  hiddenInChat: z.boolean().nullable(),
  isTitle: z.boolean().nullable(),
  companyName: z.string().nullable(),
});

export type MessageContentType = z.infer<typeof MessageContent>;

export type ClientMessage = {
  role: "system" | "user" | "assistant";
  content: MessageContentType;
  name: String;
};

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type Question = {
  id: number;
  title: string;
  answer: Answer;
  type: "text" | "color" | "moodboard" | "multiple-choice" | "branding-card" | "yes-no" | "link" | "yes-no-name";
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

export const SummarySchema = z.object({ sections: z.array(z.object({ title: z.string(), content: z.string() })) });
export type SummarySchemaType = z.infer<typeof SummarySchema>;
