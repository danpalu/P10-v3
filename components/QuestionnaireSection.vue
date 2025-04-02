<template>
  <div class="questionnaire-section">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const propts = defineProps(["title"]);
</script>

<style>
.questionnaire-section {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  position: relative;
}
</style>
