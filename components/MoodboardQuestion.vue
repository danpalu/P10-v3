<template>
  <p class="intro">
    Vælg billeder, der visuelt udtrykker de følelser, værdier og den personlighed, du ønsker, at dit brand skal
    afspejle.
  </p>
  <div class="container">
    <label v-for="(image, index) in data.pictures">
      <img :src="image.url" :alt="image.alt" />
      <input
        class="hidden"
        type="checkbox"
        name="Vælg billedebeskrivelser, der visuelt udtrykker de følelser, værdier og den personlighed, du ønsker, at dit brand skal afspejle"
        :value="image.alt" />
    </label>
  </div>
</template>

<script lang="ts" setup>
const data = useDataStore();
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.intro {
  margin-bottom: 2rem;
}

label {
  cursor: pointer;
  width: 100%;
  height: 100%;
  transition: all 0.1s ease-in-out;
  outline: 3px solid transparent;
  outline-offset: -3px;

  &:has(input:checked) img {
    outline: 3px solid #000000;
    outline-offset: 3px;
  }

  &:active {
    transform: scale(0.98);
  }
}

img {
  transition: all 0.1s ease-in-out;
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}
</style>
