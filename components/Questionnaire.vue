<template>
  <form>
    <slot> </slot>
  </form>
</template>

<script lang="ts" setup></script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10rem;
  width: max(100%, 70ch);
  max-width: min(70ch, 100%);
  overflow: hidden;
  padding-right: 20px;
}
</style>
