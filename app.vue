<script setup lang="ts">
import "~/assets/styles/main.css";
const data = useDataStore();
</script>

<template>
  <header>
    <div>
      <h1 class="title">Design Brief Generator</h1>
    </div>
  </header>
  <div class="spacer"></div>
  <Questionnaire>
    <QuestionnaireSection :title="'Basic stuff'">
      <Question
        v-for="question in data.questions"
        :question="question"
      ></Question>
    </QuestionnaireSection>
  </Questionnaire>
</template>

<style>
header {
  background: var(--color-background);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

header > div {
  width: min(100%, 70ch);
}
</style>
