<template>
  <div class="question" :class="`${isLastQuestion ? 'last-question' : ''}`">
    <template v-if="data.questionnaire.type == 'survey' && !isLastQuestion">
      <label :for="`question-${question.id}`"> {{ question.id }}. {{ question.title }} </label>
      <textarea :id="`question-${question.id}`" @input="saveAnswer($event)" />
    </template>
    <div></div>
    <div v-if="isLastQuestion">
      <Summary></Summary>
    </div>
  </div>
</template>

<script lang="ts" setup>
const data = useDataStore();

const props = defineProps<{
  question: Question;
}>();

const isLastQuestion = props.question == data.questionnaire.sections.at(-1)?.questions.at(-1);

function saveAnswer(event: Event) {
  const input = (event.target as HTMLInputElement).value;
  props.question.answer.summary = input;
}

function initResizeFields() {
  const textareas = document.querySelectorAll("textarea");
  textareas.forEach((textarea) => {
    textarea.rows = 1;

    textarea.addEventListener("input", () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    });
  });
}

onMounted(() => {
  initResizeFields();
});
</script>

<style scoped>
.summary {
  white-space: pre-line;
}
.send-form {
  position: relative;

  & .text.loading {
    visibility: hidden;
  }

  & .send-form-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

h2 {
  margin-bottom: 1em;
}

.button-container {
  padding-top: 5rem;
}

.question.finish-section {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.google-form {
  flex-grow: 1;
  width: 100%;
  border: none;
}

.wrapper {
  height: 100%;
  overflow: hidden;
  scroll-behavior: smooth;
}

section {
  height: 100%;
  overflow: hidden scroll;
  padding: 20px;
  scroll-behavior: smooth;

  &:not(:last-child) {
    margin-bottom: 100vh;
  }

  &:not(#section-6) > :first-child {
    margin-top: 4rem;
  }

  &:not(#section-6) > :last-child {
    margin-bottom: 4rem;
  }
}

.brand-card-section {
  position: relative;
  margin-bottom: 20rem;

  & button {
    display: grid;
    place-content: center;
    transition: all 0.3s ease-in-out;
    margin: 0 auto;
    opacity: 0;
    &.show-button {
      opacity: 1;
    }
  }
}

.brand-card-scroller {
  position: relative;
  height: calc(257px + 32px);
  overflow: hidden;
}
.brand-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;

  & label {
    align-items: center;
    gap: 1rem;
    padding: 100px 0;
    border-radius: 15px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.15);
    outline: 0px solid #729e7200;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    position: relative;

    & > input {
      display: none;
    }
    &:has(> input:checked) {
      outline: 3px solid #333;
      outline-offset: 3px;
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.96);
    }

    &:nth-child(even) {
      background: #333;
      color: #eee;
    }

    &:nth-child(odd) {
      background: #fafafa;
      color: #333;
    }
  }
}

.question {
  & label {
    display: flex;
    flex-direction: column;

    &:has(> input[type="checkbox"]) {
      flex-direction: row;
      gap: 1rem;
      align-items: baseline;
    }
  }

  & > label {
    margin-bottom: 1.4rem;

    &:has(> input[type="checkbox"]),
    &:has(> input[type="radio"]) {
      margin-bottom: 0.8rem;
    }

    &:not(:first-child) {
      font-size: 1rem;
    }
  }

  & fieldset.brand-card > label {
    margin-bottom: 0;
  }

  &:not(:last-child) {
    margin-bottom: 6rem;
  }
}

fieldset {
  border: none;
}

textarea {
  font-size: 1rem;
  padding: 0.5rem;
  overflow: hidden;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fff;
  resize: none;
  height: 41px;
}

.target-group {
  position: relative;

  & legend {
    padding-bottom: 1rem;
    font-weight: 500;
  }

  & .scroller {
    overflow: hidden;
    height: 460px;
    display: grid;
    grid-template-columns: repeat(10, 100%);

    & fieldset {
      width: fit-content;
      height: fit-content;
      margin: auto;
    }
  }

  & label {
    flex-direction: row;
    gap: 1rem;

    &:not(:last-child) {
      margin-bottom: 0.6rem;
    }
  }

  & button {
    position: absolute;
    display: grid;
    place-content: center;
    aspect-ratio: 1;
    &.previous {
      left: 20px;
      top: 250px;
    }
    &.next {
      right: 20px;
      top: 250px;
    }
  }
}

.question > label {
  font-size: 1rem;
}

.question:not(.finish-section) > :first-child {
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}
</style>
