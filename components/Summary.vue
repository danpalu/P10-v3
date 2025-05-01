<template>
  <div>
    <select name="summaryType" v-model="summaryType">
      <option value="basic">Opsummering</option>
      <option value="raw">Raw data</option>
      <option value="interpretation">Fortolkning</option>
      <option value="questionSuggestions">Spørgsmålsforslag</option>
    </select>
  </div>
  <LoadingSpinner v-if="loading" />
  <div v-if="summaryType == 'basic'">
    <div v-for="section in summary.sections">
      <br />
      <h4>{{ section.title }}</h4>
      <p>{{ section.content }}</p>
    </div>
  </div>
  <div v-else-if="summaryType == 'interpretation'">
    <div v-for="section in summary.sections">
      <br />
      <h4>{{ section.title }}</h4>
      <p>{{ section.content }}</p>
    </div>
  </div>
  <div v-else-if="summaryType == 'questionSuggestions'">
    <div v-for="section in summary.sections">
      <br />
      <h4>{{ section.title }}</h4>
      <p>{{ section.content }}</p>
    </div>
  </div>
  <div v-else-if="summaryType == 'raw'">
    <div v-for="section in summary.sections">
      <br />
      <h4>{{ section.title }}</h4>
      <p>{{ section.content }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const data = useDataStore();

let form: HTMLFormElement;

const summaryType = ref<"raw" | "basic" | "interpretation" | "questionSuggestions">("basic");
const summary = ref<SummarySchemaType>({
  sections: [],
});

const loading = ref(false);

watch(summaryType, async () => {
  await getSummary();
});

onMounted(() => {
  form = document.querySelector("form")!;
});

async function getSummary() {
  loading.value = true;
  let dataToSend;
  switch (data.questionnaire.type) {
    case "do-non-ai":
      dataToSend = formDataToObjectWithArrays(form);
      break;
    case "survey":
      dataToSend = data.questionnaire;
      break;
    case "do-ai":
      dataToSend = data.questionnaire;
      break;
    case "chat":
      dataToSend = data.questionnaire;
      break;
    default:
      break;
  }

  const response = await $fetch("/api/summarize", {
    method: "POST",
    body: JSON.stringify({ data: dataToSend, summaryType: summaryType.value }),
  });
  summary.value = response as unknown as SummarySchemaType;
  loading.value = false;
}
</script>

<style></style>
