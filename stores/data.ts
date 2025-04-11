export const useDataStore = defineStore("data", () => {
  const questionnaire = ref<QuestionSection[]>([
    {
      id: 1,
      title: "Virksomhed",
      questions: [
        newQuestion(1, "Hvad er din virksomheds navn?", "text"),
        newQuestion(2, "Hvilke produkter/tjenester tilbyder I?", "chat"),
        newQuestion(3, "Har I et slogan/tagline?", "chat"),
        newQuestion(4, "Hvad er jeres mission?", "chat"),
        newQuestion(5, "Hvad er jeres vision?", "chat"),
        newQuestion(6, "Hvad er jeres værdier?", "chat"),
        newQuestion(7, "Hvad er jeres unikke salgsargument?", "chat"),
      ],
    },
    {
      id: 2,
      title: "Målgruppe",
      questions: [
        newQuestion(8, "Hvem er jeres primære målgruppe?", "text"),
        newQuestion(9, "Hvilke behov har jeres målgruppe?", "chat"),
        newQuestion(10, "Hvordan når I ud til dem?", "chat"),
      ],
    },
    {
      id: 3,
      title: "Konkurrenter",
      questions: [
        newQuestion(11, "Hvem er jeres største konkurrenter?", "text"),
        newQuestion(12, "Hvad adskiller jer fra dem?", "chat"),
      ],
    },
  ]);

  function toString(): string {
    return JSON.stringify(questionnaire.value);
  }

  return {
    questionnaire,
    toString,
  };
});
