export function newQuestion(
  id: number,
  title: string,
  type:
    | "text"
    | "summary"
    | "slider-question"
    | "color-question"
    | "moodboard-question"
    | "multiple-choice-question"
    | "branding-card-question"
    | "yes-no-question"
    | "yes-no-name-question"
    | "link-question"
): Question {
  return {
    id: id,
    title: title,
    answer: { answer: [], summary: "" },
    type: type,
  };
}

export function newBrandCard(option: string, oppositeOption: string): brandCard {
  return {
    option: option,
    oppositeOption: oppositeOption,
  };
}

export function getQuestionById(questionnaire: Questionnaire, id: number): [Question, string] {
  for (const section of questionnaire.sections) {
    const question = section.questions.find((q) => q.id === id);
    if (question) {
      return [question, section.title]; // Return the question and its section title;
    }
  }
  return [questionnaire.sections[0].questions[0], "Default Title"]; // Return a default question if not found
}

export function getPreviousQuestions(questionnaire: Questionnaire, currentQuestion: Question): Question[] {
  const previousQuestions: Question[] = [];
  for (const section of questionnaire.sections) {
    for (const question of section.questions) {
      if (question.id === currentQuestion.id) {
        return previousQuestions;
      }
      previousQuestions.push(question);
    }
  }
  return previousQuestions;
}

export function formDataToObjectWithArrays(
  form: HTMLFormElement
): Record<string, FormDataEntryValue | FormDataEntryValue[]> {
  const formData = new FormData(form);
  const result: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {};

  // Get unique keys first to avoid processing the same key multiple times unnecessarily
  const uniqueKeys = [...new Set(formData.keys())];

  for (const key of uniqueKeys) {
    // Use getAll() which always returns an array of values for the key
    const values = formData.getAll(key); // Type: FormDataEntryValue[]

    // If there's only one value for this key, store it directly.
    // Otherwise, store the whole array of values.
    if (values.length === 1) {
      result[key] = values[0];
    } else {
      // Since we are iterating over keys obtained from formData.keys(),
      // values.length will always be >= 1. So if it's not 1, it's > 1.
      result[key] = values;
    }
  }

  return result;
}

export function setStartTime() {
  const startTime = Date.now();
  localStorage.setItem("startTime", startTime.toString());
}

export async function saveData(dataToSave: object) {
  const startTime = Number(localStorage.getItem("startTime"));
  const endTime = Date.now();
  const timeSpent = endTime - startTime;
  const response = await $fetch("/api/saveData", {
    method: "POST",
    body: {
      timeSpent: timeSpent,
      dataToSave: JSON.stringify(dataToSave),
    },
  });
}
