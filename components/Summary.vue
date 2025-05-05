<template>
  <div class="center-content">
    <button @click.prevent="getSummaries" v-if="!summariesLoaded">
      <span :class="`${loading ? 'invisible' : ''}`">Hent oplysninger</span>
      <div class="spinner" v-if="loading">
        <LoadingSpinner></LoadingSpinner>
      </div>
    </button>
    <a
      class="button"
      v-else-if="summariesLoaded && seenAllSummaries"
      :href="`https://docs.google.com/forms/d/e/1FAIpQLSdJwOXDeLWrA0uwiUpbdRlsiivSLzyedtolIAmTt6eU0YOzXQ/viewform?usp=pp_url&entry.813770840=${data.questionnaire.type}`"
      target="_blank">
      Åbn spørgeskema
    </a>
  </div>
  <p v-if="!summariesLoaded">
    Tryk på knappen ovenfor for at hente informationen du har indsendt 👆 <br />
    <br />
  </p>
  <p>
    Du har nu oplyst forskellige informationer om din organisation. Vi har lavet fire forslag til måder, du kan vælge at
    gemme disse oplysninger på, så du kan medbringe dem til mødet med designeren eller bruge dem som reference for dig
    selv. Du præsenteres nu for de forskellige forslag og bedes om lidt give feedback på, hvad du synes om dem.
  </p>
  <div v-if="summariesLoaded" class="navigator">
    <button
      class="nav"
      @click.prevent="scrollToSummary(--selectedSummaryIndex)"
      :class="`${selectedSummaryIndex == 0 ? 'invisible' : ''}`">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
    </button>
    <div>
      <h2 class="current-summary-type">
        {{ getSummaryTypeName(summaries[selectedSummaryIndex].type) }}
      </h2>
      <div class="explanation center-content">
        <p>
          {{ getSummaryTypeExplanation(summaries[selectedSummaryIndex].type) }}
        </p>
      </div>
    </div>
    <button
      class="nav"
      @click.prevent="scrollToSummary(++selectedSummaryIndex)"
      :class="`${selectedSummaryIndex == 3 ? 'invisible' : ''}`">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  </div>

  <div class="summary-scroller" ref="summary-scroller">
    <div
      v-if="summaries[0].sections[0].content"
      v-for="(summary, index) in summaries"
      class="summary"
      :id="`${summary}-${index}`">
      <div v-for="section in summary.sections">
        <h3>{{ section.title }}</h3>
        <p>{{ section.content }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const data = useDataStore();
let form: HTMLFormElement;

const summariesLoaded = ref(false);
const loading = ref(false);
const seenAllSummaries = ref(false);
const selectedSummaryIndex = ref(-1);

watch(selectedSummaryIndex, (newValue) => {
  if (newValue == 3) {
    seenAllSummaries.value = true;
  }
});

function getSummaryTypeName(summaryType: string) {
  switch (summaryType) {
    case "basic":
      return "Opsummeret information";
    case "interpretation":
      return "Fortolkning af information";
    case "questionSuggestions":
      return "Spørgsmål til information ";
    case "raw":
      return "Alle informationer";
    default:
      return "";
  }
}

function getSummaryTypeExplanation(summaryType: string) {
  switch (summaryType) {
    case "basic":
      return "I denne version kan du gemme et dokument, der indeholder en opsummering af dine oplysninger, opdelt i overskrifter og emner.";
    case "interpretation":
      return "I denne version kan du gemme et dokument, der indeholder en fortolkning af dine oplysninger, set fra et designperspektiv, evt. med forslag til, hvordan man kunne arbejde med din case.";
    case "questionSuggestions":
      return "I denne version kan du gemme et dokument med spørgsmål til dine oplysninger, som du kan reflektere over eller tage med til mødet med designeren for at drøfte dem sammen.";
    case "raw":
      return "I denne version kan du gemme et dokument, der indeholder alle spørgsmål og svar præcist som de er givet.";
    default:
      return "";
  }
}

const summaryScroller = useTemplateRef("summary-scroller");

const summaries = ref<SummarySchemaType[]>([
  { sections: [{ title: "", content: "" }], type: "basic" },
  { sections: [{ title: "", content: "" }], type: "interpretation" },
  { sections: [{ title: "", content: "" }], type: "questionSuggestions" },
  { sections: [{ title: "", content: "" }], type: "raw" },
]);

function scrollToSummary(index: number) {
  let summariesElements = summaryScroller.value?.querySelectorAll(".summary");
  summaryScroller.value?.scrollTo({
    behavior: "smooth",
    left: summaryScroller.value.clientWidth * index,
  });
  if (summaryScroller.value) {
    summaryScroller.value.style.height = `${summariesElements![index].clientHeight}px`;
  }
}

onMounted(() => {
  form = document.querySelector("form")!;
});

async function getSummaries() {
  loading.value = true;

  // if (data.questionnaire.type == "do-non-ai") {
  //   await saveData(formDataToObjectWithArrays(form));
  // } else {
  //   await saveData(data.questionnaire);
  // }
  const fetchPromises = summaries.value.map(async (summary) => {
    return await getSummary(summary.type);
  });
  const fetchedSummaries = await Promise.all(fetchPromises);
  summaries.value = fetchedSummaries;

  loading.value = false;
  summariesLoaded.value = true;
  selectedSummaryIndex.value = 0;
  nextTick(() => {
    scrollToSummary(selectedSummaryIndex.value);
  });
}

async function getSummary(summaryType: string): Promise<SummarySchemaType> {
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
    body: JSON.stringify({ data: dataToSend, summaryType: summaryType }),
  });
  const summary = response as unknown as SummarySchemaType;
  console.log(summary);
  return summary;
}
</script>

<style scoped>
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &.nav {
    background: none;
    color: var(--color-black);
    &:hover {
      color: black;
      background-color: none;
    }
  }
}

.navigator {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  border-bottom: 1px solid var(--color-black);
  margin-bottom: 2rem;

  padding-top: 2rem;

  & span {
    text-transform: capitalize;
  }
}

.explanation {
  & p {
    max-width: 35rem;
    text-wrap: balance;
    text-align: center;
  }
}

.current-summary-type {
  text-align: center;
}

.summary-scroller {
  display: grid;
  grid-template-columns: repeat(4, 100%);
  overflow: hidden;
  transition: height 0.5s ease-in-out;

  & .summary {
    height: fit-content;
    width: 100%;
    overflow-y: scroll;
  }
}
p {
  margin-bottom: 1.4rem;
}

a {
  text-decoration: none;
}
</style>
