<template>
  <form>
    <slot v-if="props.questionnaire.type == 'survey'"> </slot>
    <Chat v-else :questionnaire="props.questionnaire"></Chat>
  </form>
</template>

<script lang="ts" setup>
const props = defineProps<{
  questionnaire: Questionnaire;
}>();
</script>

<style scoped>
form {
  gap: 10rem;
  overflow: hidden scroll;
  scroll-behavior: smooth;
  height: 100%;
  overflow: hidden;
  place-self: center;
  width: 100%;
  padding: 20px 0;
  max-width: 80ch;
}
</style>
