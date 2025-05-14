<template>
  <div class="questionnaire-section" :id="`section-${section.id}`">
    <div class="section-wrapper">
      <h2 v-if="section.title != 'Færdig'" class="questionnaire-section-title">{{ section.title }}</h2>
      <slot></slot>
    </div>
        <div class="center-content">
            <a v-if="section.id <= 5" class="button next_button" :href="`#section-${section.id+1}`"> Gå til næste sektion </a>
        </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  section: QuestionSection;
}>();
</script>

<style scoped>
.questionnaire-section {
  height: 100%;
  overflow: hidden scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  &:not(:last-child) {
    margin-bottom: 10rem;
  }

  .next_button {
    text-decoration: none;
    margin-bottom: 5rem;
  }

  .section-wrapper {
    max-width: 80ch;
    width: 100%;
  }

  .questionnaire-section-title {
    margin-top: 4rem;
    margin-bottom: 2rem;
  }

  &:not(#section-6) {
    gap: 3rem;
  }
}
</style>
