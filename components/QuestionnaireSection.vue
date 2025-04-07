<template>
  <div class="questionnaire-section">
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
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
}

h2 {
  background: linear-gradient(-10deg in oklch, #5900ff, #007bff);
  background-clip: text;
  color: transparent;
  width: fit-content;
}
</style>
