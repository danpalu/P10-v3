export const useDataStore = defineStore("data", () => {
  const questionnaire = ref<Questionnaire>({
    type: "chat",
    sections: [
      {
        id: 1,
        title: "Virksomhedsoplysninger",
        questions: [
          newQuestion(1, "Hvad er navnet på din virksomhed/organisation?"),
          newQuestion(2, "Hvilke produkter eller tjenester udbyder din virksomhed/organisation?"),
          newQuestion(
            3,
            "Hvordan vil du beskrive din virksomheds vision med få ord – har I evt. et slogan eller tagline, der indkapsler, hvad I stræber efter?"
          ),
          newQuestion(
            4,
            "Hvad er historien bag din virksomhed/organisation – hvorfor blev den startet, og hvad har formet den undervejs?"
          ),
          newQuestion(5, "Hvad vil du gerne have, at folk siger om din virksomhed/organisation?"),
          newQuestion(
            6,
            "Hvis du skulle vælge en kendt person eller fiktiv karakter som ambassadør for din  virksomhed/organisation – hvem ville det så være, og hvorfor?"
          ),
        ],
      },
      {
        id: 2,
        title: "Mål og branding",
        questions: [
          newQuestion(7, "Hvad ønsker din virksomhed/organisation at opnå med en ny visuel identitet eller design?"),
          newQuestion(8, "Hvem er virksomhedens/organisationens konkurrenter og hvordan adskiller den sig fra dem?"),
          newQuestion(9, "Hvilke brands eller designs finder du inspirerende? Hvad er det, du godt kan lide ved dem?"),
          newQuestion(10, "Hvem er virksomhedens/organisationens nuværende og ønskede kunder?"),
          newQuestion(11, "Hvilke værdier eller følelser ønsker du, at din virksomhed/organisation udstråler?"),
          newQuestion(
            12,
            "Er der særlige symboler, ikoner, farver eller andet visuelt, der har en særlig betydning for din virksomhed/organisation?"
          ),
          newQuestion(13, "Hvor skal virksomhedens/organisationens visuelle identitet bruges eller vises?"),
        ],
      },
      {
        id: 3,
        title: "Praktiske detaljer",
        questions: [
          newQuestion(14, "Hvilke leverancer forventer du?"),
          newQuestion(15, "Hvad er deadlinen for projektet - hvilken tidsramme arbejder vi med?"),
          newQuestion(16, "Hvad er virksomhedens/organisationens budget til projektet?"),
        ],
      },
      {
        id: 4,
        title: "Andet",
        questions: [newQuestion(17, "Er der andet, du gerne vil tilføje?")],
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
