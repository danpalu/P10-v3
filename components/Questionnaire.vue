<template>
  <form>
    <slot v-if="data.questionnaire.type == 'survey'"> </slot>
    <Chat v-else :questionnaire="data.questionnaire"></Chat>
  </form>
</template>

<script lang="ts" setup>
const data = useDataStore();
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
}
</style>
