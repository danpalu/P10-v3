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
  gap: 3rem;
  width: 100%;
  padding: 20px 0;
  padding-right: 20px;
  &:not(:last-child) {
    margin-bottom: 10rem;
  }
}

h2 {
  background: linear-gradient(-10deg in oklch, #5900ff, #007bff);
  background-clip: text;
  color: transparent;
  width: fit-content;
}
</style>
