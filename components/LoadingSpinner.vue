<template>
  <div class="loading-spinner-container">
    <div class="loading-spinner"></div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.loading-spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 20px;
  mask: radial-gradient(circle at center, transparent 15%, black 17%);
}

.loading-spinner {
  background: linear-gradient(in oklch 0deg, #fff 0%, #696969 100%);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  filter: drop-shadow(0 0 4px #aaaaaa86) drop-shadow(0px 5px 7px #ffffff69);
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
