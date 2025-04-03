<script setup lang="ts">
import "~/assets/styles/main.css";

function openChat(question: Question) {
  currentQuestion.value = question;
  chatIsOpen.value = true;
}

function closeChat() {
  chatIsOpen.value = false;
  currentQuestion.value = undefined;
}

function updateAnswer(question: Question, event: EventTarget) {
  const input = event as HTMLInputElement;
  const value = input.value;
  question.answer.answer = value;
}

function getQuestionById(id: number): Question {
  return (
    questions.value.find((question) => question.id === id) ?? questions.value[0]
  );
}

const questions = ref<Question[]>([
  new Question(1, "Virksomhedsnavn?", "simpleText"),
  new Question(2, "Hvilke produkter/tjenester tilbyder I?", "chat"),
  new Question(3, "Har i et slogan/tagline?", "chat"),
]);

const chatIsOpen = ref(false);
const currentQuestion = ref<Question | undefined | null>();
</script>

<template>
  <template v-if="!chatIsOpen">
    <header>
      <div>
        <h1 class="title">Design Brief Generator</h1>
      </div>
    </header>
    <div class="spacer"></div>
    <Questionnaire>
      <QuestionnaireSection>
        <Question
          v-for="question in questions"
          :question="question"
          @openChat="openChat"
          @update="(question, event) => updateAnswer(question, event)"
        ></Question>
      </QuestionnaireSection>
    </Questionnaire>
  </template>
  <Chat
    :question="currentQuestion"
    v-if="chatIsOpen"
    @closeChat="closeChat"
  ></Chat>
</template>

<style>
header {
  position: fixed;
  top: 0;
  background: var(--color-background);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spacer {
  height: 112px;
}

header > div {
  width: min(100%, 70ch);
}
</style>
