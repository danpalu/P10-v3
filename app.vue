<script setup lang="ts">
import "~/assets/styles/main.css";
const data = useDataStore();

const questionnaireType = ref<QuestionnaireType>("do-non-ai");
const typeIsSet = ref(false);
const showIntroduction = ref(true);

onMounted(() => {
  const params = new URLSearchParams(document.location.search);
  const type = params.get("type") || "none";

  if (type == "survey" || type == "do-ai" || type == "chat" || type == "do-non-ai") {
    questionnaireType.value = type;
    typeIsSet.value = true;
    data.questionnaire.type = type;
  }
});

function start() {
  showIntroduction.value = false;
  setStartTime();
}
</script>

<template>
  <Introduction v-if="showIntroduction" @start="start" :typeIsSet="typeIsSet"></Introduction>
  <template v-else>
    <NavigationBar :sections="data.questionnaire.sections"></NavigationBar>
    <Questionnaire :questionnaire="data.questionnaire">
      <QuestionnaireSection v-for="section in data.questionnaire.sections" :section="section">
        <Question v-for="question in section.questions" :question="question"></Question>
      </QuestionnaireSection>
    </Questionnaire>
  </template>
</template>

<style></style>
