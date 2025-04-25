<template>
  <div class="question" v-if="data.questionnaire.type == 'survey'">
    <label :for="`question-${question.id}`"> {{ question.id }}. {{ question.title }} </label>
    <input type="text" :id="`question-${question.id}`" @input="saveAnswer($event)" />
  </div>
</template>

<script lang="ts" setup>
const data = useDataStore();

const props = defineProps<{
  question: Question;
}>();

function saveAnswer(event: Event) {
  const input = (event.target as HTMLInputElement).value;
  props.question.answer.summary = input;
}
</script>

<style scoped>
label {
  grid-column: 1 / span 2;
  grid-row: 1;
}

.button-back-container {
  grid-row: 1;
  grid-column: 1;
}

input {
  border: none;
  border-bottom: 2px solid var(--color-black);
  padding: 1rem;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
    border-color: var(--color-purple);
    /* box-shadow: 0px 0px 5px var(--color-black); */
  }
}

.question {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 70ch;
  transition: margin 0.3s ease-out, opacity 0.3s ease-out;

  &.chat-open {
    place-items: center;
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 48px 1fr;
    transition: grid-template-columns 0.5s ease-out;
  }

  &.chat {
    display: none;
  }
}

.button-chat {
  width: fit-content;
  padding: 0.5rem 1rem;
  gap: 0.7rem;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
}

.summary {
  background: white;
  border-radius: 20.5px;
  padding: 20px;
}
</style>
