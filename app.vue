<script setup lang="ts">
import "~/assets/styles/main.css";

const questions = ref<Question[]>([
  new Question(1, "Virksomhedsnavn?", true),
  new Question(2, "Hvilke produkter/tjenester tilbyder I?", false, "Ja tak"),
  new Question(3, "Har i et slogan/tagline?"),
]);

watch(
  questions,
  (newQuestions) => {
    let firstUnansweredFound = false;
    newQuestions.forEach((question) => {
      if (question.answer != "" && !firstUnansweredFound) {
        question.showChat = true;
        firstUnansweredFound = true;
      } else {
        question.showChat = false;
      }
    });
  },
  { deep: true }
);
</script>

<template>
  <header>
    <div>
      <h1 class="title">Design Brief Generator</h1>
    </div>
  </header>
  <KeepAlive>
    <Questionnaire>
      <QuestionnaireSection>
        <Question
          v-for="question in questions"
          :key="question.id"
          :question="question"
        ></Question>
      </QuestionnaireSection>
    </Questionnaire>
  </KeepAlive>
</template>

<style>
header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

header > div {
  width: min(100%, 70ch);
}
</style>
