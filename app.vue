<script setup lang="ts">
import "~/assets/styles/main.css";
const data = useDataStore();
const startTime = Date.now();

async function saveOnExit() {
  console.log("Saving data on exit...");

  const saveData = JSON.stringify({ questionnaire: data.questionnaire, startTime: startTime, endTime: Date.now() });
  console.log("Data to save:", saveData);
  navigator.sendBeacon("/api/saveData", saveData);
}

onMounted(() => {
  window.addEventListener("beforeunload", () => saveOnExit());
});
</script>

<template>
  <NavigationBar :sections="data.questionnaire.sections"></NavigationBar>
  <Questionnaire :questionnaire="data.questionnaire">
    <QuestionnaireSection v-for="section in data.questionnaire.sections" :section="section">
      <Question v-for="question in section.questions" :question="question"></Question>
    </QuestionnaireSection>
  </Questionnaire>
</template>

<style></style>
