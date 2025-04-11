<template>
  <div class="question" :class="`${chatIsOpen ? 'chat-open' : ''}`">
    <div v-if="chatIsOpen" class="button-back-container">
      <button class="center-content button-back" @click.prevent="chatIsOpen = false">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </button>
    </div>
    <label :for="`question-${question.id}`"> {{ question.id }}. {{ question.title }} </label>
    <button
      v-if="question.type == 'chat' && !chatIsOpen && showChatButton"
      class="button-chat center-content"
      @click.prevent="chatIsOpen = true">
      {{ question.answer.answer.length == 0 ? "Chat" : "Edit" }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    </button>
    <p v-if="question.type == 'chat' && question.answer.summary && !chatIsOpen">
      {{ question.answer.summary }}
    </p>
    <input v-if="question.type == 'text'" type="text" :id="`question-${question.id}`" @input="saveAnswer($event)" />
    <Chat v-if="chatIsOpen" :question="question" @closeChat="chatIsOpen = false"></Chat>
  </div>
</template>

<script lang="ts" setup>
const chatIsOpen = ref(false);
const showChatButton = ref(true);

const props = defineProps<{
  question: Question;
}>();

function saveAnswer(event: Event) {
  const input = (event.target as HTMLInputElement).value;
  props.question.answer.summary = input;
}

function updateSummary(event: Event) {
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
  border-bottom: 2px solid var(--color-blue);
  padding: 1rem;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
    border-color: var(--color-purple);
    /* box-shadow: 0px 0px 5px var(--color-blue); */
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
