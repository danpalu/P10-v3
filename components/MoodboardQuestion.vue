<template>
  <div class="container">
    <label v-for="(image, index) in pictures">
      <img :src="image.url" :alt="image.alt" />
      <input class="hidden" type="checkbox" :name="`image-${index}`" :value="image.alt" />
    </label>
  </div>
</template>

<script lang="ts" setup>
const pictures = ref([
  {
    url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    alt: "Person walking during sunset",
  },
  {
    url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    alt: "Person walking during sunset",
  },
  {
    url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    alt: "Person walking during sunset",
  },
]);
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
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
