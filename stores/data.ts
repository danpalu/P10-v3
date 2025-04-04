export const useDataStore = defineStore("data", () => {
  const questions = ref<Question[]>([
    newQuestion(1, "Hvad er din virksomheds navn?", "text"),
    newQuestion(2, "Hvilke produkter/tjenester tilbyder I?", "chat"),
    newQuestion(3, "Har I et slogan/tagline?", "chat"),
  ]);
  return {
    questions,
  };
});
