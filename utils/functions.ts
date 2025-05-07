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

export function getQuestionById(questionnaire: Questionnaire, id: number): [Question, string, number] {
  for (const section of questionnaire.sections) {
    const question = section.questions.find((q) => q.id === id);
    if (question) {
      return [question, section.title, section.id]; // Return the question and its section title;
    }
  }
  return [questionnaire.sections[0].questions[0], "Default Title", 0]; // Return a default question if not found
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
): Array<{ questionTitle: string; questionContent: FormDataEntryValue }> {
  const formData = new FormData(form);
  // Change result to be an array of objects with the specified structure
  const result: Array<{ questionTitle: string; questionContent: FormDataEntryValue }> = [];

  // Iterate over all entries directly, which handles multiple values per key naturally
  for (const [key, value] of formData.entries()) {
    // For each entry, create an object with the desired template
    result.push({
      questionTitle: key,
      questionContent: value,
    });
  }

  return result;
}

export function setStartTime() {
  const startTime = Date.now();
  localStorage.setItem("startTime", startTime.toString());
}

export async function saveData(dataToSave: object, type: QuestionnaireType) {
  const startTime = Number(localStorage.getItem("startTime"));
  const endTime = Date.now();
  const timeSpent = endTime - startTime;
  const response = await $fetch("/api/saveData", {
    method: "POST",
    body: {
      timeSpent: timeSpent,
      dataToSave: JSON.stringify(dataToSave),
      type: type,
    },
  });
}
