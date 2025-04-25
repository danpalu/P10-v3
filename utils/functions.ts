export function newQuestion(id: number, title: string, type: string): Question {
  return {
    id: id,
    title: title,
    answer: { answer: [], summary: "" },
    type: type,
  };
}

export function getQuestionById(questionnaire: Questionnaire, id: number): Question {
  for (const section of questionnaire.sections) {
    const question = section.questions.find((q) => q.id === id);
    if (question) {
      return question;
    }
  }
  return questionnaire.sections[0].questions[0];
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
