<template>
  <nav>
    <ul>
      <li v-for="section in sections">
        {{ section.title }}
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
const props = defineProps<{
  sections: QuestionSection[];
}>();
</script>

<style scoped>
nav {
  padding: 0 20px;
}
nav ul {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}
</style>
