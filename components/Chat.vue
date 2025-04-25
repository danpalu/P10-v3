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
            :class="`${message.role} ${message.content.type} ${message.content.hiddenInChat ? 'hidden' : ''}`">
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
                <img :src="image.url" :alt="image.alt" class="moodboard-image" />
                </button>
            </div>
            <div
                v-if="message.content.type === 'branding-card-question' && message.content.brandingCardDetails"
                class="branding-card-container">
                <button
                @click.prevent="sendBrandCardAnswer(message.content.brandingCardDetails.emotion)"
                class="branding-option dark">
                {{ message.content.brandingCardDetails.emotion }}
                </button>
                <button
                @click.prevent="sendBrandCardAnswer(message.content.brandingCardDetails.oppositeEmotion)"
                class="branding-option light">
                {{ message.content.brandingCardDetails.oppositeEmotion }}
                </button>
            </div>
            <div v-if="message.content.type === 'yes-no-question'" class="yes-no-options">
            <button
                @click.prevent="sendYesNoAnswer('No')"
                class="yes-no-button"
                :class="{ selected: selectedYesNo === 'No' }"
            >
                Nej, lad mig yddybe
            </button>
            <button
                @click.prevent="sendYesNoAnswer('Yes')"
                class="yes-no-button"
                :class="{ selected: selectedYesNo === 'Yes' }"
            >
                Ja, det er korrekt
            </button>
            </div>
            <div v-if="message.content.type === 'multiple-choice-question'" class="questionnaire-options">
                <ul>
                    <li
                    v-for="(option, index) in message.content.multipleChoiceDetails"
                    :key="index"
                    class="questionnaire-item"
                    style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">

                    <!-- Use v-model for binding -->
                    <input
                        type="checkbox"
                        :id="'option-' + index"
                        v-model="selectedOptions"
                        :value="option"
                        class="checkbox-option"
                    />

                    <!-- Label with clickable text -->
                    <label :for="'option-' + index" 
                        class="clickable-option questionnaire-text" 
                        :class="{ selected: selectedOptions.includes(option) }">
                        {{ option }}
                    </label>
                    </li>
                </ul>
                <button @click.prevent="sendMultipleChoiceAnswer" class="questionnaire-button">
                    Anvend valgte
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
            hiddenInChat: false,
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

    function resetIncomingMessage() {
    incomingString.value = "";
    }

    const selectedOptions = ref<string[]>([]); // Array to store selected options

    // Method to send the selected multiple-choice answers
    // Send the selected multiple-choice answers when the button is clicked
    function sendMultipleChoiceAnswer() {
    if (selectedOptions.value.length > 0) {
        loading.value = true;
        addUserMessage("I choose: " + selectedOptions.value.join(", "), true);
        sendMessages();
        selectedOptions.value = []; // Clear the selected options after submitting
        setTimeout(() => {
        scrollToButtom();
        }, 100);
    }
    }

    // Method to toggle selection when clicking the label
    function toggleSelection(option: string) {
    const index = selectedOptions.value.indexOf(option);
    if (index > -1) {
        selectedOptions.value.splice(index, 1); // Remove option if already selected
    } else {
        selectedOptions.value.push(option); // Add option if not already selected
    }
    }

    const selectedYesNo = ref<string>("");

    function sendYesNoAnswer(answer: string) {
    selectedYesNo.value = answer;
    loading.value = true;
    addUserMessage(answer, true);
    sendMessages();
    setTimeout(() => {
        scrollToButtom();
    }, 100);
    }

    async function handleMoodboard(search: string) {
    try {
        const response = await $fetch("/api/unsplash", {
        method: "POST",
        body: { query: search },
        });

        if (response && response.results) {
        const moodboardImages = response.results.map((img: any) => ({
            url: img.urls.small,
            alt: img.alt_description || "Unsplash image",
        }));

        // Attach the images directly to the *latest* message
        const latestMessage = data.currentQuestion.answer.answer.at(-1);
        if (latestMessage?.content?.type === "moodboard-question") {
            latestMessage.content.moodboardImages = moodboardImages;
        }
        } else {
        console.error("No results found from the Unsplash API.");
        }
    } catch (error) {
        console.error("Error fetching moodboard images:", error);
    }
    }

    function sendImageAnswer(image: string) {
    loading.value = true;
    addUserMessage(image, true);
    sendMessages();
    input.value = "";

    setTimeout(() => {
        scrollToButtom();
    }, 100);
    }

    function sendBrandCardAnswer(text: string) {
    loading.value = true;
    addUserMessage(
        "My company is best represented by " +
        text +
        ". Now ask me a new branding card question. Unless you have already asked me three branding card question, then proceed.",
        true
    );
    sendMessages();
    input.value = "";

    setTimeout(() => {
        scrollToButtom();
    }, 100);
    }

    function sendQuestionnaireAnswer(answer: string) {
    loading.value = true;
    addUserMessage("I choose " + answer + " but don't ask me about that, let's move on", true);
    sendMessages();
    input.value = "";

    setTimeout(() => {
        scrollToButtom();
    }, 100);
    }

    let disableSubmit = computed(() => !ready.value || input.value.trim() === "" || showIncomingMessage.value);

    function addUserMessage(userInput: string, hiddenInChat: boolean = false) {
    data.currentQuestion.answer.answer.push({
        role: "user",
        content: {
        content: userInput.trim(),
        type: "text",
        sliderDetails: null,
        colorDetails: null,
        moodboardSearchString: null,
        brandingCardDetails: null,
        hiddenInChat: hiddenInChat,
        },
    });
    }

    let input = ref<string>("");

    function sendColorAnswer(color: string) {
    loading.value = true;
    addUserMessage(color, true);
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
        messages: [{ role: "user", content: { content: "Start the conversation", type: data.currentQuestion.type} }],
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
    .yes-no-options {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
    }

    .yes-no-button {
        font-size: 0.9rem; /* Adjust text size to smaller */
        padding: 0.5rem 0.8rem; /* Adjust padding to maintain proportions */
        width: 100%; /* Make the button fill the entire width */
        box-sizing: border-box; /* Ensure padding is included in the width */
    }

    button:hover {
    background-color: var(--color-dark-grey); /* Slightly lighter background on hover */
    }

    /* Style for checkboxes to be hidden */
    .checkbox-option {
    display: none; /* Hide checkbox but keep it functional */
    }

    .questionnaire-options {
    padding-top: 0.5rem; /* Add padding before the first option (on top) */
    }

    /* Style for the clickable option text */
    .clickable-option {
    cursor: pointer;
    transition: color 0.2s ease, background-color 0.2s ease;
    padding: 0.25rem 0.5rem; /* space around text */
    border-radius: 0.375rem; /* rounded edges */
    background-color: rgba(0, 0, 0, 0.05); /* lighter background by default */
    display: flex;
    align-items: center; /* Aligns the text and checkmark horizontally */
    justify-content: space-between; /* Ensures the checkmark appears on the right */
    }

    /* Selected option styles */
    .clickable-option.selected {
    background-color: rgba(0, 0, 0, 0.2);
    }

    /* Add a checkmark icon in a circle on the right side */
    .clickable-option.selected::after {
    content: "✔"; /* Unicode for checkmark */
    display: inline-block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-color: #333; /* Circle color */
    color: white; /* Checkmark color */
    text-align: center;
    line-height: 20px; /* Centers the checkmark */
    font-size: 14px; /* Size of the checkmark */
    margin-left: 10px; /* Space between text and checkmark */
    }

    /* Hover effect for clickable text */
    .clickable-option:hover {
    background-color: rgba(0, 0, 0, 0.1); /* subtle dark grey on hover */
    }

    /* Smaller text for the submit button */
    .questionnaire-button {
    font-size: 0.9rem; /* Adjust text size to smaller */
    padding: 0.5rem 0.8rem; /* Adjust padding to maintain proportions */
    width: 100%; /* Make the button fill the entire width */
    box-sizing: border-box; /* Ensure padding is included in the width */
    margin-top: 0.5rem;
    }

    .questionnaire-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
    }

    .questionnaire-text {
    flex-grow: 1;
    }

    .questionnaire-button:hover {
    background-color: #000; /* Slightly lighter black on hover */
    }


    .branding-card-container {
    display: flex;
    gap: 2rem;
    }

    .branding-option {
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
    padding: 60px 70px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    margin: 20px 0;

    &.dark {
        background: #363636;
        color: #fefefe;
    }
    &.light {
        background: #fefefe;
        color: #333;
    }
    }

    .moodboard-container {
    display: flex;
    gap: 1rem; /* space between images */
    overflow-x: auto;
    }

    .moodboard-images {
    padding-top: 40px;
    padding-bottom: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;

    & button {
        padding: 0;
        background: none;
        border-radius: 8px;
        overflow: hidden;
        width: 100%;
        height: 100%;
        aspect-ratio: 1;

        & img {
        width: 100%;
        height: 100%;
        border-radius: 0px;
        object-fit: cover;
        }
    }
}

    .chat-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    transition: height 0.3s ease;
    height: 100%;
    background: var(--color-background);
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

    /* Hide the scrollbar */
    .messages-container::-webkit-scrollbar {
        display: none;
    }

    /* Fallback for other browsers */
    .messages-container {
        -ms-overflow-style: none;  /* Internet Explorer 10+ */
        scrollbar-width: none;      /* Firefox */
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
    color: var(--color-black);
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

    &.user.hidden {
        display: none;
    }

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
    background: #333;
    color: var(--color-background);
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

    &:focus-within {
        border-color: var(--color-black)
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
