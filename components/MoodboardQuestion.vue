<template>
  <p class="intro">
    Vælg billeder, der visuelt udtrykker de følelser, værdier og den personlighed, du ønsker, at dit brand skal
    afspejle.
  </p>
  <div class="container">
    <label v-for="(image, index) in pictures">
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
const pictures = ref([
  {
    alt: "Soft morning light filtering through sheer curtains",
    url: "https://images.stockcake.com/public/3/6/f/36f09c94-1295-43c1-8823-edf78601dbf0_large/morning-light-tranquility-stockcake.jpg",
  },
  {
    alt: "Neon lights reflecting on wet city streets at night",
    url: "https://images.stockcake.com/public/b/a/9/ba94bad1-0d11-4763-a015-2308de249a87_large/rainy-city-night-stockcake.jpg",
  },
  {
    alt: "Sun-drenched Mediterranean coastline with blue water and white buildings",
    url: "https://images.stockcake.com/public/5/3/c/53c524b0-4901-41fd-86f8-ea53c8ab5057_large/santorini-coastal-view-stockcake.jpg",
  },
  {
    alt: "Misty dark forest with tall trees and fog",
    url: "https://images.stockcake.com/public/c/c/2/cc20c541-4070-4f5c-82a6-34eb31aca758_large/misty-forest-path-stockcake.jpg",
  },
  {
    alt: "Vintage Polaroid photo collage scattered on a table",
    url: "https://png.pngtree.com/background/20230528/original/pngtree-photos-scattered-by-a-wooden-table-with-many-other-images-picture-image_2783704.jpg",
  },
  {
    alt: "Minimalist Japanese architecture with clean lines and neutral tones",
    url: "https://images.squarespace-cdn.com/content/v1/63dde481bbabc6724d988548/943f9453-1ddb-43d7-beff-b86e33ff78c6/1.jpg",
  },
  {
    alt: "Colorful maximalist fashion editorial with bold outfits and dynamic poses",
    url: "https://images.stockcake.com/public/7/6/b/76bfb953-772e-4da0-a435-288cf9c86342_large/bold-fashion-fantasy-stockcake.jpg",
  },
  {
    alt: "Brutalist concrete buildings with stark geometry",
    url: "https://cdn.shopify.com/s/files/1/0369/6522/0411/files/10001_4_33039eee-cde6-4afc-bf4f-7ba2b8302594_600x600.jpg?v=1700120376",
  },
  {
    alt: "Golden hour desert landscape with sand dunes and warm tones",
    url: "https://images.stockcake.com/public/7/8/d/78d20e65-3e37-4c4e-be52-c0d98705fdcb_large/golden-desert-sunset-stockcake.jpg",
  },
  {
    alt: "Abstract pastel gradient background with soft blending colors",
    url: "https://img.freepik.com/premium-vector/pastel-gradient-tones-soft-blended-colors-abstract-minimal-background-vector-artistic-texture_797523-5802.jpg?w=360",
  },
  {
    alt: "Candlelit dinner table set for an intimate meal",
    url: "https://images.stockcake.com/public/8/1/b/81b99838-7073-4a1d-8158-3c4396787d28_large/romantic-dinner-setup-stockcake.jpg",
  },
  {
    alt: "Dramatic stormy ocean waves crashing",
    url: "https://images.stockcake.com/public/7/1/8/71863706-162c-4dce-a531-ad82fe675f6a_large/stormy-ocean-waves-stockcake.jpg",
  },
  {
    alt: "Messy artist's studio with scattered paint and canvases",
    url: "https://images.stockcake.com/public/f/f/f/fff3a775-24cf-4238-a210-4d15aa83277b_large/messy-art-studio-stockcake.jpg",
  },
  {
    alt: "Snow-capped mountain peaks under a clear blue sky",
    url: "https://img.freepik.com/premium-photo/panoramic-view-snowcapped-mountains-clear-blue-sky_1022970-53123.jpg",
  },
  {
    alt: "Urban street art wall covered in colorful graffiti",
    url: "https://freerangestock.com/sample/100279/graffiti-covered-wall-with-staircase.jpg",
  },
  {
    alt: "Blooming spring garden full of colorful flowers",
    url: "https://thumbs.dreamstime.com/b/beautiful-colorful-red-tulips-flowers-bloom-spring-garden-decorative-wallpaper-exotic-tulipa-flower-blossom-springtime-117511188.jpg",
  },
  {
    alt: "Cyberpunk city skyline with glowing neon lights and futuristic buildings",
    url: "https://img.freepik.com/premium-photo/futuristic-cyberpunk-city-skyline-with-glowing-neon-lights-fog_14117-809439.jpg",
  },
  {
    alt: "Classic Parisian café scene with outdoor tables and people",
    url: "https://images.stockcake.com/public/a/2/1/a21c79fa-61df-4dbb-b046-be479367efe1_medium/bustling-street-cafe-stockcake.jpg",
  },
  {
    alt: "Warm autumn forest path covered in fallen leaves",
    url: "https://images.stockcake.com/public/4/7/3/47380e42-cbaa-4f65-a814-39e718f6c748_large/autumn-forest-path-stockcake.jpg",
  },
  {
    alt: "High-contrast black and white portrait of a person with dramatic lighting",
    url: "https://x-equals.com/wp-content/uploads/2016/01/image-1-Hollywood-style-portrait-shot-headshotlondon1.jpg",
  },
  {
    alt: "Vintage typewriter with paper and worn keys",
    url: "https://img.freepik.com/premium-photo/vintage-typewriter-with-worn-keys-stained-paper_978921-20552.jpg",
  },
]);
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
