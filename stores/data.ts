export const useDataStore = defineStore("data", () => {
  const questionnaire = ref<Questionnaire>({
    type: "do-non-ai",
    sections: [
      {
        id: 1,
        title: "Virksomhedsoplysninger",
        questions: [
          newQuestion(1, "Hvad er navnet på din virksomhed/organisation?", "text"),
          newQuestion(2, "Hvilke produkter eller tjenester udbyder din virksomhed/organisation?", "multiple-choice"),
          // newQuestion(
          //   3,
          //   "Hvordan vil du beskrive din virksomheds vision med få ord – har I evt. et slogan eller tagline, der indkapsler, hvad I stræber efter?"
          // ),
          // newQuestion(
          //   4,
          //   "Hvad er historien bag din virksomhed/organisation – hvorfor blev den startet, og hvad har formet den undervejs?"
          // ),
          // newQuestion(5, "Hvad vil du gerne have, at folk siger om din virksomhed/organisation?"),
          newQuestion(
            3,
            "Hvis du skulle vælge en kendt person eller fiktiv karakter som ambassadør for din  virksomhed/organisation – hvem ville det så være, og hvorfor?",
            "text"
          ),
        ],
      },
      {
        id: 2,
        title: "Mål og branding",
        questions: [
          newQuestion(4, "Hvad ønsker din virksomhed/organisation at opnå med en ny visuel identitet eller design?", "multiple-choice"),
          newQuestion(5, "Hvilke værdier eller følelser ønsker du, at din virksomhed/organisation udstråler?", "moodboard"),
          newQuestion(6, "Er der særlige symboler, ikoner, farver eller andet visuelt, der har en særlig betydning for din virksomhed/organisation?", "color"),
          newQuestion(7, "Hvor skal virksomhedens/organisationens visuelle identitet bruges eller vises?", "text"),
        ],
      },
      {
        id: 3,
        title: "Praktiske detaljer",
        questions: [
          newQuestion(8, "Hvilke leverancer forventer du?", "multiple-choice"),
          newQuestion(9, "Hvad er deadlinen for projektet - hvilken tidsramme arbejder vi med?", "text"),
          newQuestion(10, "Hvad er virksomhedens/organisationens budget til projektet?", "text"),
        ],
      },
      {
        id: 4,
        title: "Andet",
        questions: [newQuestion(11, "Er der andet, du gerne vil tilføje?", "text")],
      },
    ],
  });

  function toString(): string {
    return JSON.stringify(questionnaire.value);
  }

  const currentQuestion = ref<Question>(questionnaire.value.sections[0].questions[0]);

  return {
    questionnaire,
    currentQuestion,
    toString,
  };
});
