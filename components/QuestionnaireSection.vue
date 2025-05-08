<template>
  <div class="questionnaire-section" :id="`section-${section.id}`">
    <h2>{{ section.title }}</h2>
    <slot></slot>
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
  flex-direction: column;
  width: 100%;
  padding: 20px;
  &:not(:last-child) {
    margin-bottom: 10rem;
  }

  &:not(#section-5) {
    gap: 3rem;
  }

  &:not(#section-5) > :first-child {
    margin-top: 4rem;
  }

  &:not(#section-5) > :last-child {
    margin-bottom: 4rem;
  }
}
</style>
