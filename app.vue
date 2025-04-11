<script setup lang="ts">
import "~/assets/styles/main.css";
const data = useDataStore();
</script>

<template>
  <NavigationBar :sections="data.questionnaire"></NavigationBar>
  <Questionnaire>
    <QuestionnaireSection v-for="section in data.questionnaire" :section="section">
      <Question v-for="question in section.questions" :question="question"></Question>
    </QuestionnaireSection>
  </Questionnaire>
</template>

<style></style>
