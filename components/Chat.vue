<template>
  <main class="chat-container">
    <div class="button-container">
      <button class="center-content button-back" @click.prevent="$emit('closeChat')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </button>
    </div>

    <div class="messages-container" id="message-scroller">
      <ul class="messages">
        <li v-for="message in messages" class="message" :class="message.role">
          {{ message.content.content }}
        </li>
        <li v-if="showIncomingMessage" class="incoming message assistant">
          {{ cleanIncomingString(incomingString) }}
        </li>
      </ul>
    </div>
    <div class="form-container">
      <form @submit.prevent="handleSubmit" class="input">
        <input v-model="input" />
        <button type="submit" :disabled="disableSubmit">Send</button>
      </form>
    </div>
  </main>
</template>

<script lang="ts" setup>
const props = defineProps<{
  question: Question;
}>();

let ws: WebSocket;
let wsURL: URL;
let messages = ref<ClientMessage[]>([]);

let showIncomingMessage = ref(false);
let incomingString = ref<string>("");

onMounted(() => {
  wsURL = new URL(window.location.href);
  wsURL.protocol = "ws";
  wsURL.pathname = "/api/ws";
  ws = new WebSocket(wsURL);

  ws.onopen = () => {};
  ws.onmessage = (message) => {
    if (message.data == "[START]") {
      showIncomingMessage.value = true;
      return;
    }
    if (message.data == "[DONE]") {
      const newMessage: ClientMessage = {
        role: "assistant",
        content: JSON.parse(incomingString.value),
      };
      messages.value.push(newMessage);
      resetIncomingMessage();
      showIncomingMessage.value = false;
      if (newMessage.content.type == "summary") {
        props.question.answer.answer = messages.value;
        props.question.answer.summary = newMessage.content.content;
      }
      scrollToButtom();
      return;
    }
    if (message.data == "[ERROR]") {
      messages.value.push({
        role: "assistant",
        content: { content: `Error: ${message.data}`, type: "text" },
      });
      showIncomingMessage.value = false;
      resetIncomingMessage();
      scrollToButtom();
      return;
    }
    incomingString.value += `${message.data}`;
    scrollToButtom();
  };
});

function resetIncomingMessage() {
  incomingString.value = "";
}

let disableSubmit = computed(() => input.value.trim() === "" || showIncomingMessage.value);

function resetMessages() {
  messages.value = [];
}

function addUserMessage(userInput: string) {
  messages.value.push({
    role: "user",
    content: { content: userInput.trim(), type: "text" },
  });
}

let input = ref<string>("");

// Get answers from all the other questions
function getAllAnswers() {}

const data = useDataStore();
const prevAnswers = "";

function handleSubmit() {
  addUserMessage(input.value);
  ws.send(JSON.stringify({ messages: messages.value, prevAnswers: prevAnswers }));
  input.value = "";

  setTimeout(() => {
    scrollToButtom();
  }, 100);
}

function scrollToButtom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
}

function cleanIncomingString(input: string): string {
  console.log(input);
  return input.replace(/^\s*.*?\{\s*"?[^"]*"?\s*:\s*"?/, "").slice(0, -24);
}
</script>

<style>
.chat-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  transition: height 0.3s ease;
}

.messages-container {
  width: 100%;
  padding: 0 20px;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20.5px;
  background: white;
}

.button-container {
  position: absolute;
  height: fit-content;
  left: 20px;
}

.button-back {
  position: sticky;
  border-radius: 999px;
  padding: 10px;
  border: none;
  cursor: pointer;
  z-index: 2;
  background: none;
  color: var(--color-blue);
}

.messages {
  max-width: 100%;
  width: 70ch;
  list-style: none;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
}

.message {
  margin-bottom: 30px;
  width: fit-content;
  max-width: 60ch;
  padding: 10px 20px;
  white-space: pre-line;
  min-height: 45px;
}

.message.assistant {
  align-self: flex-start;
  border-radius: 20px 20px 20px 0;
  background: #f1f1f1;
}

.message.user {
  align-self: flex-end;
  text-align: right;
  border-radius: 20px 20px 0px 20px;
  background: linear-gradient(in oklch -190deg, #1c89ff, #4900d1);
  color: white;
}

.message .role {
  font-weight: 600;
}

.form-container {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
  left: 0;
  right: 0;
  bottom: 0;
  height: 80px;
  z-index: 2;

  &::after {
    z-index: -1;
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    height: 150px;
    background: linear-gradient(in oklch 0deg, var(--color-background) 40%, transparent 100%);
  }
}

.input {
  width: calc(70ch - 40px);
  height: fit-content;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  border-radius: 999px;
  border: 1px solid #ccc;
  overflow: hidden;
  background-color: white;

  &:focus-within {
    border-color: #007bff;
  }
}

.input input {
  flex-shrink: 1;
  min-width: 100px;
  flex-grow: 1;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;

  &:focus {
    outline: none;
  }
}

.input [type="submit"] {
  border: none;
  padding: 10px 20px;
  border-radius: 999px;
  color: white;
  margin: 2px;
  background: linear-gradient(in oklch -45deg, #1c89ff, #4900d1);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  letter-spacing: 2px;

  &:disabled {
    background: linear-gradient(in oklch -45deg, #78b9ff, #6760c3);
    color: #fff;
    cursor: not-allowed;
  }
}
</style>
