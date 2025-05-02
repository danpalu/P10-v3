<template>
    <main class="chat-container" id="chat-container">
        <div class="messages-container" id="message-scroller" ref="message-scroller">
            <ul class="messages">

                <h1 class="title message">
                    {{ data.questionnaire.sections[0].title }}
                    <hr style="margin: 0 auto; width: 100%;">
                </h1>

                <template v-for="prevQuestion in getPreviousQuestions(props.questionnaire, data.currentQuestion)">
                    <template
                    v-for="(message, index) in prevQuestion.answer.answer">
                        <li v-if="message.content.type !== 'yes-no-question' && message.content.type !== 'yes-no-name-question' && message.content.type !== 'summary'" class="message" lang="dk"
                    :class="`${ 
                            index === prevQuestion.answer.answer.length - 1 ? 'last' : ''
                        } ${message.content.isTitle ? 'title' : message.role} ${message.content.hiddenInChat ? 'hidden' : ''}`">
                            <!-- Check for title type and render as h1 -->
                            <h1 v-if="message.content.isTitle === true" class = "title">
                                {{ message.content.content }}
                                <hr style="margin: 0 auto; width: 100%;">
                            </h1>
                            <!-- Don't render if yes-no-question -->
                            <div v-else-if="message.content.type !== 'yes-no-question' && message.content.type !== 'yes-no-name-question' && message.content.type !== 'summary'">
                                {{ message.content.content }}
                            </div>
                            <!-- Handle additional message types like color, moodboard, etc. -->
                            <div v-if="message.content.type === 'color-question'" class="color-container">
                                <div class="color-options">
                                    <button
                                    @click.prevent="sendColorAnswer(color)"
                                    v-for="color in getColors(message.content.colorOptions).slice(0, 8)"
                                    class="color"
                                    :style="{ background: color }" :disabled="data.currentQuestion.answer.answer.at(-1)?.content.content !== message.content.content"></button>
                                </div>
                                <div>
                                    <button @click.prevent="sendNoneOfAbove" class="questionnaire-button" :disabled="data.currentQuestion.answer.answer.at(-1)?.content.content !== message.content.content"        >
                                        Ingen af disse
                                    </button>
                                </div>
                            </div>
                            <div v-if="message.content.type === 'moodboard-question'" style="padding-top: 0.5rem;">
                                <div class="moodboard-images">
                                    <button :disabled="data.currentQuestion.answer.answer.at(-1)?.content.content !== message.content.content"
                                        v-for="(image, index) in getImages(message.content.moodboardImages)?.slice(0, 9)"
                                        :key="index" class="moodboard-image">
                                        <img :src="image.url" class="moodboard-image" />
                                        <!-- Checkmark Circle for selected images -->
                                        <div v-if="selectedImages.includes(image.alt)" class="checkmark-circle">
                                            <span class="checkmark">✔</span>
                                        </div>
                                    </button>
                                </div>
                                <div style="display: flex; gap: 1rem;">
                                    <button :disabled="data.currentQuestion.answer.answer.at(-1)?.content.content !== message.content.content" @click.prevent="sendNoneOfAbove" class="questionnaire-button">
                                        Ingen af ovennævnte
                                    </button>
                                    <button :disabled="data.currentQuestion.answer.answer.at(-1)?.content.content !== message.content.content" @click.prevent="sendMoodboardSelection" class="questionnaire-button">
                                        Anvend valgte
                                    </button>
                                </div>
                            </div>
                            <div
                                v-if="message.content.type === 'branding-card-question'"
                                class="branding-card-container">
                                <button :disabled="data.currentQuestion.answer.answer.at(-1)?.content.content !== message.content.content"
                                    @click.prevent="sendBrandCardAnswer(getBrandCardOption(message.content.brandingCardOptions?.option))"
                                    class="branding-option dark">
                                    {{ getBrandCardOption(message.content.brandingCardOptions?.option) }}
                                </button>
                                <button :disabled="data.currentQuestion.answer.answer.at(-1)?.content.content !== message.content.content"
                                    @click.prevent="sendBrandCardAnswer(getOppositeBrandCardOption(message.content.brandingCardOptions?.oppositeOption))"
                                    class="branding-option light">
                                    {{ getOppositeBrandCardOption(message.content.brandingCardOptions?.oppositeOption) }}
                                </button>
                            </div>
                            <div v-if="message.content.type === 'multiple-choice-question'" class="questionnaire-options">
                                <ul>
                                    <li
                                        v-for="(option, index) in message.content.multipleChoiceOptions"
                                        :key="index"
                                        class="questionnaire-item"
                                        style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                                        <input
                                            type="checkbox"
                                            v-model="selectedOptions"
                                            :value="option"
                                            class="checkbox-option" :disabled="data.currentQuestion.answer.answer.at(-1)?.content.content !== message.content.content" />
                                        <label class="clickable-option questionnaire-text"
                                            :class="{ selected: selectedOptions.includes(option), disabled: data.currentQuestion.answer.answer.at(-1)?.content.content !== message.content.content}">
                                            {{ option }}
                                        </label>
                                    </li>
                                </ul>

                                <!-- Button container to align buttons side by side -->
                                <div class="multiple-choice-buttons" style="display: flex; gap: 1rem;">
                                    <button :disabled="data.currentQuestion.answer.answer.at(-1)?.content.content !== message.content.content" @click.prevent="sendNoneOfAbove" class="questionnaire-button">
                                        Ingen af ovennævnte
                                    </button>
                                    <button  :disabled="data.currentQuestion.answer.answer.at(-1)?.content.content !== message.content.content" @click.prevent="sendMultipleChoiceAnswer" class="questionnaire-button">
                                        Anvend valgte
                                    </button>
                                </div>
                            </div>
                                <div v-if="message.content.type === 'link-question'" class="link">
                                <a v-if="data.questionnaire.type === 'chat'" href="https://docs.google.com/forms/d/e/1FAIpQLSdJwOXDeLWrA0uwiUpbdRlsiivSLzyedtolIAmTt6eU0YOzXQ/viewform?usp=pp_url&entry.813770840=chat" target="_blank" class="link-button">
                                    Besvar venligst spørgeskemaet her.
                                </a>
                                <a v-else-if="data.questionnaire.type === 'do-ai'" href="https://docs.google.com/forms/d/e/1FAIpQLSdJwOXDeLWrA0uwiUpbdRlsiivSLzyedtolIAmTt6eU0YOzXQ/viewform?usp=pp_url&entry.813770840=do-ai" target="_blank" class="link-button">
                                    Besvar venligst spørgeskemaet her.
                            </a>
                        </div>
                        </li>
                        <hr class="between-questions-hr" v-if="index === prevQuestion.answer.answer.length - 1"> 
                    </template>
                </template>
                <template
                    v-for="message in data.currentQuestion.answer.answer">
                    <!-- Check for title type and render as h1 -->
                     <li v-if="message.content.type !== 'yes-no-question' && message.content.type !== 'yes-no-name-question' && message.content.type !== 'summary'" class="message" lang="dk"
                     :class="`${message.content.isTitle ? 'title' : message.role} ${message.content.type} ${message.content.hiddenInChat ? 'hidden' : ''}`">
                    <h1 v-if="message.content.isTitle === true" class = "title">
                        {{ message.content.content }}
                        <hr style="margin: 0 auto; width: 100%;">
                    </h1>
                    <!-- Don't render if yes-no-question -->
                    <div v-else-if="message.content.type !== 'yes-no-question' && message.content.type !== 'yes-no-name-question' && message.content.type !== 'summary'">
                        {{ message.content.content }}
                    </div>
                    <!-- Handle additional message types like color, moodboard, etc. -->
                    <div v-if="message.content.type === 'color-question'" class="color-container">
                        <div class="color-options">
                            <button
                            @click.prevent="sendColorAnswer(color)"
                            v-for="color in getColors(message.content.colorOptions).slice(0, 8)"
                            class="color"
                            :style="{ background: color }" :disabled="data.currentQuestion.answer.answer.at(-1)?.content.content !== message.content.content"></button>
                        </div>
                        <div>
                            <button @click.prevent="sendNoneOfAbove" class="questionnaire-button" :disabled="data.currentQuestion.answer.answer.at(-1)?.content.content !== message.content.content"        >
                                Ingen af disse
                            </button>
                        </div>
                    </div>
                    <div v-if="message.content.type === 'moodboard-question'" style="padding-top: 0.5rem;">
                        <div class="moodboard-images">
                            <button :disabled="data.currentQuestion.answer.answer.at(-1)?.content.content !== message.content.content"
                                v-for="(image, index) in getImages(message.content.moodboardImages)?.slice(0, 9)"
                                :key="index"
                                @click.prevent="toggleImageSelection(image.alt)" class="moodboard-image"
                                :class="{ selected: selectedImages.includes(image.alt) }"
                            >
                                <img :src="image.url" :alt="image.alt" class="moodboard-image" />
                                <!-- Checkmark Circle for selected images -->
                                <div v-if="selectedImages.includes(image.alt)" class="checkmark-circle">
                                    <span class="checkmark">✔</span>
                                </div>
                            </button>
                        </div>
                        <div style="display: flex; gap: 1rem;">
                            <button :disabled="data.currentQuestion.answer.answer.at(-1)?.content.content !== message.content.content" @click.prevent="sendNoneOfAbove" class="questionnaire-button">
                                Ingen af ovennævnte
                            </button>
                            <button :disabled="data.currentQuestion.answer.answer.at(-1)?.content.content !== message.content.content" @click.prevent="sendMoodboardSelection" class="questionnaire-button">
                                Anvend valgte
                            </button>
                        </div>
                    </div>
                    <div
                        v-if="message.content.type === 'branding-card-question'"
                        class="branding-card-container">
                        <button :disabled="data.currentQuestion.answer.answer.at(-1)?.content.content !== message.content.content"
                            @click.prevent="sendBrandCardAnswer(getBrandCardOption(message.content.brandingCardOptions?.option))"
                            class="branding-option dark">
                            {{ getBrandCardOption(message.content.brandingCardOptions?.option) }}
                        </button>
                        <button :disabled="data.currentQuestion.answer.answer.at(-1)?.content.content !== message.content.content"
                            @click.prevent="sendBrandCardAnswer(getOppositeBrandCardOption(message.content.brandingCardOptions?.oppositeOption))"
                            class="branding-option light">
                            {{ getOppositeBrandCardOption(message.content.brandingCardOptions?.oppositeOption) }}
                        </button>
                    </div>
                    <div v-if="message.content.type === 'multiple-choice-question'" class="questionnaire-options">
                        <ul>
                            <li
                                v-for="(option, index) in message.content.multipleChoiceOptions"
                                :key="index"
                                class="questionnaire-item"
                                style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                                <input
                                    type="checkbox"
                                    :id="'option-' + index"
                                    v-model="selectedOptions"
                                    :value="option"
                                    class="checkbox-option" :disabled="data.currentQuestion.answer.answer.at(-1)?.content.content !== message.content.content"  />
                                    <label :for="'option-' + index" 
                                    class="clickable-option questionnaire-text"
                                    :class="{ selected: selectedOptions.includes(option), disabled: data.currentQuestion.answer.answer.at(-1)?.content.content !== message.content.content}">
                                    {{ option }}
                                </label>
                            </li>
                        </ul>

                        <!-- Button container to align buttons side by side -->
                        <div class="multiple-choice-buttons" style="display: flex; gap: 1rem;">
                            <button :disabled="data.currentQuestion.answer.answer.at(-1)?.content.content !== message.content.content" @click.prevent="sendNoneOfAbove" class="questionnaire-button">
                                Ingen af ovennævnte
                            </button>
                            <button  :disabled="data.currentQuestion.answer.answer.at(-1)?.content.content !== message.content.content" @click.prevent="sendMultipleChoiceAnswer" class="questionnaire-button">
                                Anvend valgte
                            </button>
                        </div>
                    </div>
                        <div v-if="message.content.type === 'link-question'" class="link">
                        <a v-if="data.questionnaire.type === 'chat'" href="https://docs.google.com/forms/d/e/1FAIpQLSdJwOXDeLWrA0uwiUpbdRlsiivSLzyedtolIAmTt6eU0YOzXQ/viewform?usp=pp_url&entry.813770840=chat" target="_blank" class="link-button">
                            Besvar venligst spørgeskemaet her.
                        </a>
                        <a v-else-if="data.questionnaire.type === 'do-ai'" href="https://docs.google.com/forms/d/e/1FAIpQLSdJwOXDeLWrA0uwiUpbdRlsiivSLzyedtolIAmTt6eU0YOzXQ/viewform?usp=pp_url&entry.813770840=do-ai" target="_blank" class="link-button">
                            Besvar venligst spørgeskemaet her.
                    </a>
                </div>
                </li>
                </template>
                <li v-if="showIncomingMessage && cleanIncomingString(incomingString).length >= 10" class="incoming message assistant">
                    {{ cleanIncomingString(incomingString) }}
                </li>
                <li
                    v-if="data.currentQuestion.answer.answer.length !== 0 &&
                          data.currentQuestion.answer.answer.at(-1)?.content.type === 'summary'"
                    class="button-container">
                    <button v-if="data.currentQuestion === data.questionnaire.sections.at(-1)?.questions.at(-1)">Finish</button>
                </li>
            </ul>
        </div>

        <ClientOnly>
            <button class="next-question button" @click.prevent="nextQuestion()">
                        <span> Næste spørgsmål <i class="arrow right"></i></span>
                    </button>
                    <div class="form-container">
                    <form id="input-form" @submit.prevent="handleSubmit(input)" class="input">
                        <textarea 
                            @input="setTextField()"
                            v-model="input"
                            ref="input-element"
                            :placeholder="currentPlaceholder"
                            :disabled="chatFieldDisabled"
                            rows="1"
                            id="input-element"
                        ></textarea>
                        <button type="submit" :disabled="disableSubmit" class="send" :class="`${loading ? 'loading' : ''}`">
                            <span>Send</span>
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
        // Keep title messages and filter hidden ones
        data.currentQuestion.answer.answer = data.currentQuestion.answer.answer.filter(
            (message) => !message.content.hiddenInChat
        );

        // Proceed to the next question
        let question_and_title = getQuestionById(props.questionnaire, data.currentQuestion?.id + 1);
        data.currentQuestion = question_and_title[0];
        data.currentTitle = question_and_title[1];

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

    let placeholderText = ref("Skriv dit svar her...");

    const showSaveButton = ref(false);

    const ready = ref(false);

    const showIncomingMessage = ref(false);
    const incomingString = ref<string>("");
    const inputElement = useTemplateRef("input-element");

    function setTextField() {
        if (inputElement.value) {
            inputElement.value.style.height = "auto";
            inputElement.value.style.height = inputElement.value.scrollHeight + "px";
        }
    }

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

        // Submit on enter
        if (inputElement.value) {
            inputElement.value.addEventListener('keydown', (event: KeyboardEvent) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                const trimmed = inputElement.value?.value.trim()
                event.preventDefault()
                if (trimmed) {
                    const form = document.querySelector("#input-form") as HTMLFormElement
                    form.requestSubmit() // 0 is the drop-down, 1 is the text field
                }
                }
            })
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
        try {
            const parsedContent = JSON.parse(incomingString.value.trim());
            
            const newMessage: ClientMessage = {
                role: "assistant",
                content: parsedContent,
                name: companyName
            };
            
            if (newMessage.content.type !== 'yes-no-question' && newMessage.content.type !== 'yes-no-name-question'){
                lastQuestionType.value = newMessage.content.type;
            }

            if (newMessage.content.type === "text") {
                chatFieldDisabled = false;
            }
            else if (newMessage.content.type === "moodboard-question") {
                const search = newMessage.content.moodboardSearchString;
                if (search) {
                    handleMoodboard(search);
                }
            }
            else if (newMessage.content.type === "yes-no-name-question") {
                showIncomingMessage.value = false;
                sendYesNoAnswer("Yes", newMessage.content.companyName);
            }
            else if (newMessage.content.type === "yes-no-question") {
                showIncomingMessage.value = false;
                sendYesNoAnswer("Yes");
            }
            else if (newMessage.content.type === "summary") {
                showIncomingMessage.value = false;
            }

            data.currentQuestion.answer.answer.push(newMessage);
            resetIncomingMessage();
            showIncomingMessage.value = false;

            if (newMessage.content.type === "summary") {
                showSaveButton.value = true;
                data.currentQuestion.answer.summary = newMessage.content.content;
            }

        } catch (error) {
            console.error("Failed to parse JSON:", incomingString.value);
        }
        waitAndScroll();
        return;
        }
        if (message.data == "[ERROR]") {
        data.currentQuestion.answer.answer.push({
            role: "assistant",
            content: {
            content: `Error: ${message.data}`,
            type: "text",
            sliderDetails: null,
            colorOptions: null,
            moodboardSearchString: null,
            brandingCardOptions: null,
            hiddenInChat: false,
            isTitle: false,
            },
        });
        showIncomingMessage.value = false;
        resetIncomingMessage();
        return;
        }
        incomingString.value += `${message.data}`;
        waitAndScroll();
    };
    });

    function resetIncomingMessage() {
    incomingString.value = "";
    };

    function getBrandCardOption(brandCardOption: any){
        if (brandCardOption != null){
            return brandCardOption;
        }
        else {
            return data.brandCards[0].option;
        }      
    }

    function getOppositeBrandCardOption(brandCardOppositeOption: any){
        if (brandCardOppositeOption != null){
            return brandCardOppositeOption;
        }
        else {
            return data.brandCards[0].oppositeOption;
        }      
    }

    const selectedOptions = ref<string[]>([]); // Array to store selected options
    const selectedImages = ref<string[]>([]); // Array to store selected images

    // Method to send the selected multiple-choice answers
    // Send the selected multiple-choice answers when the button is clicked
    function sendMultipleChoiceAnswer() {
        if (selectedOptions.value.length > 0) {
            loading.value = true;
            addUserMessage("My idea is best respresented by " + selectedOptions.value.join(", "), true);
            sendMessages();
            selectedOptions.value = []; // Clear the selected options after submitting
        }
    }

    function sendNoneOfAbove() {
        loading.value = true;
        addUserMessage('Ingen af ovennævnte, lad mig beskrive det med et tekst spørgsmål', true);
        sendMessages();
        selectedOptions.value = []; // Clear the selected options after submitting
        selectedImages.value = []; // Clear the selected images after submitting
    }

    const selectedYesNo = ref<string>("");

    function sendYesNoAnswer(answer: string, name = "none") {
        selectedYesNo.value = answer;
        loading.value = true;

        // Find the latest assistant yes-no-question message
        const messageElements = document.querySelectorAll('.message.assistant.yes-no-question');

        if (messageElements.length > 0) {
            const lastYesNoMessage = messageElements[messageElements.length - 1];
            lastYesNoMessage.classList.remove('green', 'red');
            if (answer === 'Yes') {
                lastYesNoMessage.classList.add('green');
            } else {
                lastYesNoMessage.classList.add('red');
            }
        }

        if (name != "none") {
            companyName = name;
        }

        if (answer === "Yes" && (name != "none" || wordsInAnswer.value >= 60)){
            nextQuestion();
            wordsInAnswer.value = 0;
        } else {
            addUserMessage("Bed mig om at yddybe mine svar med et tekst spørgsmål.", true);
            sendMessages();
        }
    }
    
    watch(() => data.currentTitle, (newTitle) => {
        addTitleMessage(newTitle);
    });

    async function waitAndScroll() {
        await nextTick();
        scrollToButtom();
        setTextField();
    }

    let companyName = "virksomhed/organisation";

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

    waitAndScroll();
}

    function toggleImageSelection(imageAlt: string) {
        const index = selectedImages.value.indexOf(imageAlt);
        if (index === -1) {
            selectedImages.value.push(imageAlt);
        } else {
            selectedImages.value.splice(index, 1);
        }
    }

    // Return default images if less than nine images are found
    function getImages(imageList: any[]){
        if (imageList.length >= 9){
            return imageList;
        }
        else {
            return data.pictures;
        }
    }

    function getColors(colorList: String[]){
        if (colorList.length >= 8){
            return colorList;
        }
        else {
            return data.colors;
        }      
    }

    function setAsSelected(){
        const element = document.activeElement ? document.activeElement : null;
        //element?.classList.add("selected");
    }

    function sendMoodboardSelection() {
        if (selectedImages.value.length > 0) {
            loading.value = true;
            addUserMessage("My idea is best represented by images containing: " + selectedImages.value.join(", "), true);
            sendMessages();
        }
    }

    let brandCardQuestionsAsked = ref<number>(1);
    const brandCardQuestionsToAsk = 3;

    function sendBrandCardAnswer(text: string) {
    wordsInAnswer.value = 0;
    loading.value = true;
    if (brandCardQuestionsAsked.value < brandCardQuestionsToAsk) {
        addUserMessage(
            "My idea is best represented by " +
            text +
            ". Now ask me a new branding card question, but don't any of the same options you have already used.",
            true
        );
        brandCardQuestionsAsked.value++;
    } else {
        addUserMessage(
        "My idea is best represented by " +
        text,
        true
    );
        brandCardQuestionsAsked.value = 0;
    }
    sendMessages();
    input.value = "";
    }

    let disableSubmit = computed(() => !ready.value || input.value.trim() === "" || showIncomingMessage.value);

import type { Image } from 'openai/resources.mjs';
    import { computed } from 'vue';

    let chatFieldDisabled = computed(() => {
        const lastMessage = data.currentQuestion.answer.answer.at(-1);
        return lastMessage?.content.type !== 'text';
    });

    let currentPlaceholder = computed(() => {
        const lastMessage = data.currentQuestion.answer.answer.at(-1);

        if (lastMessage?.content.type === 'text') {
            return "Skriv dit svar her...";
            } else if (lastMessage?.content.type === 'multiple-choice-question') {
                return "Vælg en eller flere af ovenstående muligheder";
            } else if (lastMessage?.content.type === 'color-question') {
                return "Vælg en af farverne";
            } else if (lastMessage?.content.type === 'branding-card-question') {
                return "Vælg en af de to muligheder";
            } else if (lastMessage?.content.type === 'moodboard-question') {
                return "Vælg et af billederne";
            }else {
                return ""; // no placeholder
            }
        });

    let wordsInAnswer = ref<number>(0);
    let lastQuestionType = ref<string>("text");

    function addUserMessage(userInput: string, hiddenInChat: boolean = false) {
        data.currentQuestion.answer.answer.push({
            role: "user",
            content: {
            content: userInput.trim(),
            type: "text",
            sliderDetails: null,
            colorOptions: null,
            moodboardSearchString: null,
            brandingCardOptions: null,
            hiddenInChat: hiddenInChat,
            isTitle: false,
            },
        });
        wordsInAnswer.value += getNumberOfWords(userInput.trim());
        currentPlaceholder = "";
    }

    function getNumberOfWords(string: string){
        return string.trim().split(/\s+/).length;
    }

    function addTitleMessage(title: string) {
    data.currentQuestion.answer.answer.push({
        role: "user",
        content: {
        content: title.trim(),
        type: "text",
        sliderDetails: null,
        colorOptions: null,
        moodboardSearchString: null,
        brandingCardOptions: null,
        hiddenInChat: false,
        isTitle: true,
        },
    });
    }

    let input = ref<string>("");
    let colorQuestionsAsked = ref<number>(0);
    
    function sendColorAnswer(color: string) {
        setAsSelected();

        loading.value = true;
        if (colorQuestionsAsked.value == 0) {
            addUserMessage("I think my idea is well represented by " + color + ". You may ask me a new color question, asking me about what variant of this color i prefer.", true);
            colorQuestionsAsked.value++;
        } else {
            addUserMessage("I think my idea is well represented by " + color, true);
            colorQuestionsAsked.value = 0;
        }
        sendMessages();
        input.value = "";
    }

    function sendMessages() {
    ws.send(
            JSON.stringify({
            messages: data.currentQuestion.answer.answer,
            previousAnswers: data.toString(),
            question: data.currentQuestion,
            questionnaire: props.questionnaire,
            companyName: companyName.toString(),
            })
        );
        waitAndScroll();
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
    }

    function continueConversation() {
    ws.send(
        JSON.stringify({
        messages: [
            {
            role: "user",
            content: {
                content: "We just started on the next question. Continue the conversation by asking me the question.",
                type: "text",
            },
            },
        ],
        previousAnswers: data.toString(),
        question: data.currentQuestion,
        questionnaire: props.questionnaire,
        companyName: companyName.toString(),
        })
    );
    }

    function handleSubmit(text: string) {
        loading.value = true;
        addUserMessage(text);
        sendMessages();
        input.value = "";
    }

    const messageScroller = useTemplateRef("message-scroller");
    const chatContainer = useTemplateRef("chat-container")

    // Only scroll to bottom if user has not scrolled up
    function scrollToButtom() {
        if (!chatContainer) return

        const threshold = 200 // px from bottom — adjust as needed
        
        if (messageScroller.value){
            const isNearBottom =
            messageScroller.value.scrollHeight - messageScroller.value.scrollTop - messageScroller.value.clientHeight < threshold    

            if (isNearBottom) {
                messageScroller.value?.scrollTo({
                    top: messageScroller.value.scrollHeight,
                    behavior: "smooth",
                });
            }
        }
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
    textarea {
        font-size: 1rem;
        padding: 1rem 1.4rem;
        overflow: hidden;
        width: 100%;
        border: none;
        background: #fff;
        resize: none;
        height: 41px;

        &:focus-visible{
            outline: none;
        }
    }

    .arrow {
        border: solid var(--color-grey);
        border-width: 0 1px 1px 0;
        display: inline-block;
        padding: 3px;
    }

    .right {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
    }

    :disabled, .disabled{
        opacity: 0.7;
    }

    .color-options {
        display: flex;
        justify-content: space-between;
    }

    .checkmark-circle {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: var(--color-black); /* Semi-transparent background */
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--color-background);
        font-size: 18px; /* Adjust size of checkmark */
    }

    .moodboard-image.selected .checkmark-circle {
        display: flex; /* Show checkmark circle when image is selected */
    }

    .selected {
        opacity: 1; /* Fully opaque when selected */
    }

    .moodboard-image:hover {
        opacity: 0.9; /* Slightly transparent on hover */
    }

    button:hover {
        background-color: var(--color-dark-grey); /* Slightly lighter background on hover */

        &.next-question {
            background-color: white;
            border-color: var(--color-black); 
            color: var(--color-black);
        }

        & .arrow {
            border-color: var(--color-black);
        }
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
        transition: color 0.2s ease, background-color 0.2s ease;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        background-color: rgba(0, 0, 0, 0.05);
        display: flex;
        align-items: center;
        justify-content: space-between;

        &:not(.disabled){
            cursor: pointer;;
        }
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
    color: var(--color-background); /* Checkmark color */
    text-align: center;
    line-height: 20px; /* Centers the checkmark */
    font-size: 14px; /* Size of the checkmark */
    margin-left: 10px; /* Space between text and checkmark */
    }

    /* Hover effect for clickable text */
    .clickable-option:hover:not(.disabled) {
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
    padding-top: 70px;
    padding-bottom: 70px;
    width: 50%;
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

    .moodboard-image {
        width: 100%; /* Ensures image takes up full container space */
        height: auto;
        position: relative;
    }

    .moodboard-image.selected {
        box-sizing: border-box;
        border: 5px solid var(--color-black);
    }

    .moodboard-image img {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 8px;
    }

    .moodboard-images {
    display: grid; /* Ensure images are placed in a grid */
    grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
    gap: 10px; /* Space between images */
    width: 100%; /* Ensure the container uses the full width */
    padding-bottom: 1rem;

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

    .next-question {
        padding: 5px 20px;
        width: fit-content;
        height: fit-content;
        font-size: small;
        align-self: end;
        z-index: 3;
        background-color: white;
        color: var(--color-grey);
        border: 1px solid #ccc;
        margin-bottom: 0.5rem;
        text-transform: none;
        font-weight: normal;
        transition: none;
        margin-top: 0.5rem;
    }

    .messages {
    max-width: 100%;
    width: 100%;
    list-style: none;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    }

    .message {
        margin-top: 30px;
        width: fit-content;
        max-width: 60ch;
        padding: 10px 20px;
        white-space: pre-line;
        min-height: 45px;
        word-wrap: break-word;
        hyphens: auto;

        &.user.hidden {
            display: none;
    }

    &.assistant {
        align-self: flex-start;
        border-radius: 20px 20px 20px 0;
        background: #f1f1f1;
    }

    &.summary {
        display:none;
        background: #dcf1df;
        &::before {
        content: "Opsummering: ";
        font-weight: 600;
        display: block;
        }
    }
    }

    .color-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    }

    .color {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    }

    .color:hover {
        opacity: 0.8;
    }

    .message.user {
    align-self: flex-end;
    text-align: right;
    border-radius: 20px 20px 0px 20px;
    background: #333;
    color: var(--color-background);
    }

    .message.title {
        align-self: center;
    }

    .message .role {
    font-weight: 600;
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

    .send {
        align-self: end;
    }

    .input {
    width: 100%;
    height: fit-content;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    border-radius: 30px;
    border: 1px solid #ccc;
    overflow: hidden;
    background-color: white;
    margin-bottom: 1rem;

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

    .between-questions-hr {
        margin: calc(2rem + 30px) 0 2rem 0;
        background-color: var(--color-dark-grey);
        height: 1px;
        border: 0;
    }

    </style>
