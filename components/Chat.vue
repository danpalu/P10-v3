<template>
    <main class="chat-container">
      <div class="messages-container" id="message-scroller" ref="message-scroller">
        <ul class="messages">
          <template v-for="prevQuestion in getPreviousQuestions(props.questionnaire, data.currentQuestion)">
            <li
              v-for="(message, index) in prevQuestion.answer.answer"
              class="message"
              :class="`${message.role} ${message.content.type} ${
                index === prevQuestion.answer.answer.length - 1 ? 'last' : ''
              }`">
              {{ message.content.content }}
            </li>
          </template>
  
          <li
            v-for="message in data.currentQuestion.answer.answer"
            class="message"
            :class="`${message.role} ${message.content.type}`">
            {{ message.content.content }}
            <div v-if="message.content.type === 'color-question'" class="color-container">
              <button
                @click.prevent="sendColorAnswer(color)"
                v-for="color in message.content.colorDetails?.colors"
                class="color"
                :style="{ background: color }"></button>
            </div>
            <div v-if="message.content.type === 'moodboard-question'" class="moodboard-images">
            <button
                v-for="(image, index) in message.content.moodboardImages?.slice(0, 9)"
                :key="index"
                @click.prevent="sendImageAnswer(image.alt)">
                <img
                :src="image.url"
                :alt="image.alt"
                class="moodboard-image"
                />
            </button>
            </div>
            <div v-if="message.content.type === 'branding-card-question'" class="branding-card-container">
            <button
                @click.prevent="sendTextAnswer(message.content.brandingCardDetails.emotion)"
                class="branding-option"> {{ message.content.brandingCardDetails.emotion }}
            </button>
            <button
                @click.prevent="sendTextAnswer(message.content.brandingCardDetails.oppositeEmotion)"
                class="branding-option"> {{ message.content.brandingCardDetails.oppositeEmotion }}
            </button>
            </div>
          </li>
          <li v-if="showIncomingMessage" class="incoming message assistant">
            {{ cleanIncomingString(incomingString) }}
          </li>
          <li
            v-if="
              data.currentQuestion.answer.answer.length != 0 &&
               data.currentQuestion.answer.answer.at(-1)?.content.type == 'summary'
            "
            class="button-container">
            <button v-if="data.currentQuestion == data.questionnaire.sections.at(-1)?.questions.at(-1)">Finish</button>
            <button v-else @click.prevent="nextQuestion">Næste spørgsmål</button>
          </li>
        </ul>
      </div>
      <ClientOnly>
        <div class="form-container">
          <form @submit.prevent="handleSubmit(input)" class="input">
            <input v-model="input" ref="inputElement" />
            <button type="submit" :disabled="disableSubmit" class="send" :class="`${loading ? 'loading' : ''}`">
              <span> Send </span>
              <div class="spinner" v-if="loading">
                <LoadingSpinner></LoadingSpinner>
              </div>
            </button>
          </form>
        </div>
      </ClientOnly>
    </main>
  </template>
  
  <script lang="ts" setup>
  const props = defineProps<{
    questionnaire: Questionnaire;
  }>();
  
  const data = useDataStore();
  
  function nextQuestion() {
    data.currentQuestion = getQuestionById(props.questionnaire, data.currentQuestion?.id + 1);
    if (data.currentQuestion.answer.answer.length == 0) {
      continueConversation();
    } else {
      ready.value = true;
      loading.value = false;
    }
  }
  
  let ws: WebSocket;
  let wsURL: URL;
  let loading = ref(true);
  
  const showSaveButton = ref(false);
  
  const ready = ref(false);
  
  const showIncomingMessage = ref(false);
  const incomingString = ref<string>("");
  const inputElement = useTemplateRef("inputElement");
  
  onMounted(() => {
    inputElement.value?.focus();
    wsURL = new URL(window.location.href);
    wsURL.protocol = "ws";
    wsURL.pathname = "/api/ws";
    wsURL.hash = "";
    ws = new WebSocket(wsURL);
  
    ws.onopen = () => {
      if (data.currentQuestion.answer.answer.length == 0) {
        startConversation();
      } else {
        ready.value = true;
        loading.value = false;
      }
    };
    ws.onmessage = (message) => {
      if (message.data == "[START]") {
        showIncomingMessage.value = true;
        loading.value = true;
        return;
      }
      if (message.data == "[DONE]") {
        if (!ready.value) {
          ready.value = true;
        }
        loading.value = false;
        const newMessage: ClientMessage = {
          role: "assistant",
          content: JSON.parse(incomingString.value.trim()),
        };
        if (newMessage.content.type === "moodboard-question") {
        console.log("Handling moodboard:", newMessage.content.moodboardSearchString);
        const search = newMessage.content.moodboardSearchString;
        if (search) {
            handleMoodboard(search);
        }
        }
        data.currentQuestion.answer.answer.push(newMessage);
        resetIncomingMessage();
        showIncomingMessage.value = false;
        if (newMessage.content.type == "summary") {
          showSaveButton.value = true;
          data.currentQuestion.answer.summary = newMessage.content.content;
          setTimeout(() => {
            scrollToButtom();
          }, 100);
        }
        scrollToButtom();
        return;
      }
      if (message.data == "[ERROR]") {
        data.currentQuestion.answer.answer.push({
          role: "assistant",
          content: {
            content: `Error: ${message.data}`,
            type: "text",
            sliderDetails: null,
            colorDetails: null,
            moodboardSearchString: null,
            brandingCardDetails: null,
          },
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
  
  async function handleMoodboard(search: string) {
  try {
    const response = await $fetch('/api/unsplash', {
      method: 'POST',
      body: { query: search },
    });

    if (response && response.results) {
      const moodboardImages = response.results.map((img: any) => ({
        url: img.urls.small,
        alt: img.alt_description || 'Unsplash image',
      }));

      // Attach the images directly to the *latest* message
      const latestMessage = data.currentQuestion.answer.answer.at(-1);
      if (latestMessage?.content?.type === "moodboard-question") {
        latestMessage.content.moodboardImages = moodboardImages;
      }
    } else {
      console.error('No results found from the Unsplash API.');
    }
  } catch (error) {
    console.error('Error fetching moodboard images:', error);
  }
}
  
  function resetIncomingMessage() {
    incomingString.value = "";
  }
  
  let disableSubmit = computed(() => !ready.value || input.value.trim() === "" || showIncomingMessage.value);
  
  function addUserMessage(userInput: string) {
    data.currentQuestion.answer.answer.push({
      role: "user",
      content: {
        content: userInput.trim(),
        type: "text",
        sliderDetails: null,
        colorDetails: null,
        moodboardSearchString: null,
        brandingCardDetails: null,
      },
    });
  }
  
  let input = ref<string>("");
  
  function sendColorAnswer(color: string) {
    loading.value = true;
    addUserMessage(color);
    sendMessages();
    input.value = "";
  
    setTimeout(() => {
      scrollToButtom();
    }, 100);
  }

  function sendImageAnswer(image: string) {
    loading.value = true;
    addUserMessage(image);
    sendMessages();
    input.value = "";
  
    setTimeout(() => {
      scrollToButtom();
    }, 100);
  }

  function sendTextAnswer(text: string) {
    loading.value = true;
    addUserMessage(text);
    sendMessages();
    input.value = "";

    setTimeout(() => {
        scrollToButtom();
    }, 100);
}
  
  function sendMessages() {
    ws.send(
      JSON.stringify({
        messages: data.currentQuestion.answer.answer,
        previousAnswers: data.toString(),
        question: data.currentQuestion,
        questionnaire: props.questionnaire,
      })
    );
  }
  
  function startConversation() {
    ws.send(
      JSON.stringify({
        messages: [{ role: "user", content: { content: "Start the conversation", type: "text" } }],
        previousAnswers: data.toString(),
        question: data.currentQuestion,
        questionnaire: props.questionnaire,
      })
    );
    setTimeout(() => {
      scrollToButtom();
    }, 100);
  }
  
  function continueConversation() {
    ws.send(
      JSON.stringify({
        messages: [
          {
            role: "user",
            content: {
              content: "We just started on the next question. Continue the conversation by asking me the question",
              type: "text",
            },
          },
        ],
        previousAnswers: data.toString(),
        question: data.currentQuestion,
        questionnaire: props.questionnaire,
      })
    );
    setTimeout(() => {
      scrollToButtom();
    }, 100);
  }
  function handleSubmit(text: string) {
    loading.value = true;
    addUserMessage(text);
    sendMessages();
    input.value = "";
  
    setTimeout(() => {
      scrollToButtom();
    }, 100);
  }
  const messageScroller = useTemplateRef("message-scroller");
  function scrollToButtom() {
    messageScroller.value?.scrollTo({
      top: messageScroller.value.scrollHeight,
      behavior: "smooth",
    });
  }
  
  function cleanIncomingString(input: string): string {
    return input
      .replace(/^(\s*.*?\"content\":\")|(^\s*?.*$)/, "")
      .replace(/","type":".*$/, "")
      .replace(/\\n/g, "\n")
      .replace(/\\"/g, '"');
  }
  </script>
  
  <style>
.branding-card-container {
  display: flex;
  gap: 1rem;
  margin-top: 10px;
}

.branding-option {
  padding: 12px 20px;
  border-radius: 8px;
  background-color: #f3f3f3;
  border: 1px solid #ccc;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.branding-option:hover {
  background-color: #e0e0e0;
}

.moodboard-container {
  display: flex;
  gap: 1rem; /* space between images */
  overflow-x: auto;
}

.moodboard-image {
  height: 140px;
  width: 140px;
  border-radius: 8px;
  object-fit: cover;
}
  
  .chat-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    transition: height 0.3s ease;
    height: 100%;
    background: white;
    border-radius: 20.5px 20.5px 0 0;
    overflow: hidden;
    grid-column: span 2;
  }
  
  .messages-container {
    width: 100%;
    padding: 0 20px;
    overflow-y: scroll;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: auto;
  }
  
  .button-back-container {
    height: fit-content;
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
  
    &.assistant {
      align-self: flex-start;
      border-radius: 20px 20px 20px 0;
      background: #f1f1f1;
    }
  
    &.summary {
      background: #dcf1df;
  
      &::before {
        content: "Summary: ";
        font-weight: 600;
        display: block;
      }
    }
  }
  
  .color-container {
    display: flex;
    flex-direction: row;
    gap: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  .color {
    width: 50px;
    height: 50px;
    border-radius: 5px;
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
  
  .message.last {
    margin-bottom: 15rem;
  }
  
  .form-container {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 2;
  
    &::after {
      z-index: -1;
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
  
      height: 100px;
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
  
  button.send {
    position: relative;
  
    & .spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  
    &.loading span {
      visibility: hidden;
    }
  }
  
  .button-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  </style>
  