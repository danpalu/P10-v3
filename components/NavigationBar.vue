<template>
  <nav class="center-content">
    <ul>
      <li v-for="section in sections" class="section">
        <a
          class="section-link"
          :href="`#section-${section.id}`"
          @click="
            data.questionnaire.type == 'survey' || data.questionnaire.type == 'do-non-ai'
              ? sectionClick(section.id)
              : null
          "
          :class="`${selectedSectionIndex === section.id ? 'selected' : ''} ${
            selectedSectionIndex > section.id ? 'completed' : ''
          }
          ${data.questionnaire.type == 'chat' ? 'disable-link' : ''}`">
          {{ section.id }}. {{ section.title }}
        </a>
      </li>
      <div class="indicator">
        <div class="container">
          <div class="indicator-inner-track"></div>
          <div ref="indicator" class="indicator-inner"></div>
        </div>
      </div>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
const props = defineProps<{
  sections: QuestionSection[];
}>();

const data = useDataStore();

const selectedSectionIndex = ref<number>(1);

const indicator = useTemplateRef("indicator");

let totalNumberOfQuestions = 0;
props.sections.forEach((section) => {
  section.questions.forEach(() => totalNumberOfQuestions++);
});

const progress: number[] = [];
let height = ref(0);
watch(
  () => data.currentQuestion,
  (newValue) => {
    let currentQuestionFound = false;
    data.questionnaire.sections.forEach((section, index) => {
      if (currentQuestionFound) return;
      let numberQuestionsCompleted = 0;
      section.questions.forEach((question) => {
        if (currentQuestionFound) return;
        if (question == data.currentQuestion) {
          currentQuestionFound = true;
        } else {
          numberQuestionsCompleted++;
        }
      });
      progress[index] =
        (numberQuestionsCompleted / section.questions.length) * (1 / (data.questionnaire.sections.length - 1));
      if (progress[index] > 0.249) {
        selectedSectionIndex.value = section.id + 1;
      }
    });
    height.value = 0;

    progress.forEach((value) => (height.value += value));
    indicator.value?.style.setProperty("height", `${height.value * 100}%`);
  }
);

function sectionClick(id: number) {
  selectedSectionIndex.value = id;
  const calculatedHeight = (selectedSectionIndex.value - 1) / (props.sections.length - 1);
  console.log(calculatedHeight);
  indicator.value?.style.setProperty("height", `${calculatedHeight * 100}%`);
}

onMounted(() => {
  indicator.value?.style.setProperty("grid-row", `1 / span ${props.sections.length}`);
});
</script>

<style scoped>
nav {
  padding: 0 40px;
  justify-content: start;
  min-height: 100dvh;
  background-color: var(--color-black);
}
nav ul {
  display: grid;
  gap: 5rem;
  position: relative;
}

.section {
  z-index: 1;
  transition: all 0.2s ease-in-out;
}

.indicator {
  position: absolute;
  height: 100%;
  width: 5px;
  left: 11px;
  transform: translateX(-50%);
  padding: 1.3em 0;

  & .container {
    position: relative;
    height: 100%;
    width: 100%;
  }
}

.indicator-inner {
  position: absolute;
  inset: 0;
  height: 0%;
  width: 100%;
  border-radius: 999px;
  transition: height 0.5s ease-in-out;
  background: var(--color-background);
}

.indicator-inner-track {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  transform: scaleX(0.6);
  transform-origin: center;
  border-radius: 999px;
  background: var(--color-grey);
}

.section-link {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  text-decoration: none;
  border-radius: 999px;
  color: var(--color-grey);

  &.selected {
    color: var(--color-background);
  }

  &:not(.selected):not(.completed):hover {
    color: #eee;
  }

  &.completed {
    color: var(--color-dark-grey);
  }

  &::before {
    transition: all 0.2s ease-in-out;
    content: "";
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    width: 18px;
    height: 18px;
    border-radius: 999px;
    background: var(--color-dark-grey);
    border: var(--color-grey) 2px solid;
  }

  &.selected::before {
    background: var(--color-background);
  }

  &.completed::before {
    content: "✓";
    background: var(--color-dark-grey);
    color: var(--color-background);
    border-color: var(--color-background);
  }

  &.selected::before {
    border-color: var(--color-grey);
  }

  &.disable-link {
    pointer-events: none;
    cursor: text;
  }
}
</style>
