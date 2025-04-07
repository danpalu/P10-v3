export const useDataStore = defineStore("data", () => {
  const questionnaire = ref<QuestionSection[]>([
    {
      title: "Virksomhed",
      questions: [
        newQuestion(1, "Hvad er din virksomheds navn?", "text"),
        newQuestion(2, "Hvilke produkter/tjenester tilbyder I?", "chat"),
        newQuestion(3, "Har I et slogan/tagline?", "chat"),
      ],
    },
    {
      title: "Målgruppe",
      questions: [
        newQuestion(4, "Hvem er jeres primære målgruppe?", "text"),
        newQuestion(5, "Hvilke behov har jeres målgruppe?", "chat"),
        newQuestion(6, "Hvordan når I ud til dem?", "chat"),
      ],
    },
    {
      title: "Konkurrenter",
      questions: [
        newQuestion(7, "Hvem er jeres største konkurrenter?", "text"),
        newQuestion(8, "Hvad adskiller jer fra dem?", "chat"),
      ],
    },
  ]);
  return {
    questionnaire,
  };
});
