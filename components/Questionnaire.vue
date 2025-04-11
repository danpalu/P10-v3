<template>
  <form>
    <slot> </slot>
  </form>
</template>

<script lang="ts" setup></script>

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
