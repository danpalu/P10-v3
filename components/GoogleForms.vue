<template>
  <div>
    <iframe
          :src="`https://docs.google.com/forms/d/e/1FAIpQLSdJwOXDeLWrA0uwiUpbdRlsiivSLzyedtolIAmTt6eU0YOzXQ/viewform?embedded=true&entry.813770840=${data.questionnaire.type}`"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          class="google-form"
          >Indlæser…</iframe
        >
  </div>
</template>

<script lang="ts" setup>
    const data = useDataStore();
</script>

<style scoped>
div {
    padding-left: 10000px;
}
</style>