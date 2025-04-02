<template>
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
</template>

<script lang="ts" setup>
let ws: WebSocket;
let wsURL: URL;
let messageScroller: HTMLElement | null;
onMounted(() => {
  messageScroller = document.querySelector("#message-scroller");

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
      return;
    }
    incomingString.value += `${message.data}`;
    scrollToButtom();
  };
});

let messages = ref<ClientMessage[]>([]);

let showIncomingMessage = ref(false);
let incomingString = ref<string>("");

function resetIncomingMessage() {
  incomingString.value = "";
}

let disableSubmit = computed(
  () => input.value.trim() === "" || showIncomingMessage.value
);

function resetMessages() {
  messages.value = [];
}

function addUserMessage(userInput: string) {
  messages.value.push({
    role: "user",
    content: { content: userInput, type: "text" },
  });
}

let input = ref<string>("");

function handleSubmit() {
  addUserMessage(input.value);
  ws.send(JSON.stringify(messages.value));
  input.value = "";
  scrollToButtom();
}

function scrollToButtom() {
  if (messageScroller) {
    messageScroller.scrollTo({
      top: messageScroller.scrollHeight,
      behavior: "smooth",
    });
  }
}

function cleanIncomingString(input: string): string {
  const startLetters: number = 12;
  const endLetters: number = 20;
  return input.slice(startLetters, -endLetters);
}
</script>

<style>
.messages-container {
  margin-bottom: auto;
  width: 100%;
  padding: 0 20px;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.messages {
  max-width: 100%;
  width: 70ch;
  list-style: none;
  padding-top: 50px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
}

.message {
  margin-bottom: 20px;
  width: fit-content;
  max-width: 60ch;
  padding: 10px 20px;
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
  position: absolute;
  bottom: 25px;
  width: 100%;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  bottom: 0;
  height: 100px;
  background: linear-gradient(in oklch 0deg, white, transparent);
}

.input {
  width: 70ch;
  height: fit-content;
  max-width: 100%;
  display: flex;
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
