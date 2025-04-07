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
  <NavigationBar :sections="data.questionnaire"></NavigationBar>
  <Questionnaire>
    <QuestionnaireSection v-for="section in data.questionnaire" :section="section">
      <Question v-for="question in section.questions" :question="question"></Question>
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
  grid-row: 1;
  grid-column: span 2;
}

header > div {
  width: min(100%, 70ch);
}
</style>
