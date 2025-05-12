import { z } from "zod";

export const MessageContent = z.object({
  content: z.string(),
  type: z.enum([
    "text",
    "slider-question",
    "color-question",
    "moodboard-question",
    "multiple-choice-question",
    "branding-card-question",
    "link-question",
  ]),
  sliderDetails: z.object({ xAxis: z.object({ minLabel: z.string(), maxLabel: z.string() }) }).nullable(),
  colorOptions: z.array(z.string()),
  moodboardSearchString: z.string().nullable(),
  moodboardImages: z.array(z.object({ alt: z.string(), url: z.string() })).nullable(),
  brandingCardOptions: z.object({ option: z.string().nullable(), oppositeOption: z.string().nullable() }).nullable(),
  multipleChoiceOptions: z.array(z.string()).nullable(),
  link: z.string().nullable(),
  hiddenInChat: z.boolean().nullable(),
  isTitle: z.boolean().nullable(),
  companyName: z.string().nullable(),
  id: z.number(),
});

export type MessageContentType = z.infer<typeof MessageContent>;

export type brandCard = {
  option: string;
  oppositeOption: string;
};

export type ClientMessage = {
  role: "system" | "user" | "assistant";
  content: MessageContentType;
  name: String;
  hiddenContent: string;
};

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type Question = {
  id: number;
  title: string;
  answer: Answer;
  type:
    | "text"
    | "slider-question"
    | "color-question"
    | "moodboard-question"
    | "multiple-choice-question"
    | "branding-card-question"
    | "link-question";
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
  type: QuestionnaireType;
  sections: QuestionSection[];
};

export type QuestionnaireType = "chat" | "survey" | "do-non-ai" | "do-ai";

export const SummarySchema = z.object({
  type: z.enum(["raw", "basic", "interpretation", "questionSuggestions"]),
  sections: z.array(z.object({ title: z.string(), content: z.string() })),
});
export type SummarySchemaType = z.infer<typeof SummarySchema>;
