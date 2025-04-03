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
  width: 100%;
  padding: 20px;
  max-width: 70ch;
}
</style>
