<template>
  <div class="color-question">
    <label v-for="color in colors" :style="`background-color: ${color.hexcode}`">
      <input
        type="checkbox"
        name="Hvilken farver vil du associere med jer?"
        :value="`${color.name} ${color.hexcode}`" />
    </label>
  </div>
</template>

<script lang="ts" setup>
const colors = [
  { hexcode: "#FF0000", name: "Bright Red" },
  { hexcode: "#E55451", name: "Coral Red" },
  { hexcode: "#CD5C5C", name: "Indian Red" },
  { hexcode: "#B22222", name: "Fire Brick" },
  { hexcode: "#8B0000", name: "Dark Red" },
  { hexcode: "#FFA07A", name: "Light Salmon" },
  { hexcode: "#FA8072", name: "Salmon" },
  { hexcode: "#E9967A", name: "Dark Salmon" },
  { hexcode: "#FF6347", name: "Tomato" },
  { hexcode: "#FF4500", name: "Orange Red" },
  { hexcode: "#FF8C00", name: "Dark Orange" },
  { hexcode: "#FFA500", name: "Orange" },
  { hexcode: "#FFB367", name: "Pastel Orange" },
  { hexcode: "#FFD700", name: "Gold" },
  { hexcode: "#FFFF00", name: "Yellow" },
  { hexcode: "#F0E68C", name: "Khaki" },
  { hexcode: "#BDB76B", name: "Dark Khaki" },
  { hexcode: "#ADFF2F", name: "Green Yellow" },
  { hexcode: "#7FFF00", name: "Chartreuse" },
  { hexcode: "#7CFC00", name: "Lawn Green" },
  { hexcode: "#00FF00", name: "Lime" },
  { hexcode: "#32CD32", name: "Lime Green" },
  { hexcode: "#98FB98", name: "Pale Green" },
  { hexcode: "#90EE90", name: "Light Green" },
  { hexcode: "#8FBC8F", name: "Dark Sea Green" },
  { hexcode: "#3CB371", name: "Medium Sea Green" },
  { hexcode: "#2E8B57", name: "Sea Green" },
  { hexcode: "#228B22", name: "Forest Green" },
  { hexcode: "#008000", name: "Green" },
  { hexcode: "#006400", name: "Dark Green" },
  { hexcode: "#9ACD32", name: "Yellow Green" },
  { hexcode: "#6B8E23", name: "Olive Drab" },
  { hexcode: "#808000", name: "Olive" },
  { hexcode: "#556B2F", name: "Dark Olive Green" },
  { hexcode: "#66CDAA", name: "Medium Aquamarine" },
  { hexcode: "#7FFFD4", name: "Aquamarine" },
  { hexcode: "#00FA9A", name: "Medium Spring Green" },
  { hexcode: "#00FF7F", name: "Spring Green" },
  { hexcode: "#20B2AA", name: "Light Sea Green" },
  { hexcode: "#00CED1", name: "Dark Turquoise" },
  { hexcode: "#40E0D0", name: "Turquoise" },
  { hexcode: "#48D1CC", name: "Medium Turquoise" },
  { hexcode: "#008080", name: "Teal" },
  { hexcode: "#00FFFF", name: "Aqua" },
  { hexcode: "#E0FFFF", name: "Light Cyan" },
  { hexcode: "#AFEEEE", name: "Pale Turquoise" },
  { hexcode: "#00BFFF", name: "Deep Sky Blue" },
  { hexcode: "#87CEEB", name: "Sky Blue" },
  { hexcode: "#87CEFA", name: "Light Sky Blue" },
  { hexcode: "#1E90FF", name: "Dodger Blue" },
  { hexcode: "#6495ED", name: "Cornflower Blue" },
  { hexcode: "#ADD8E6", name: "Light Blue" },
  { hexcode: "#B0E0E6", name: "Powder Blue" },
  { hexcode: "#ADD8E6", name: "Light Blue" },
  { hexcode: "#4682B4", name: "Steel Blue" },
  { hexcode: "#5F9EA0", name: "Cadet Blue" },
  { hexcode: "#4169E1", name: "Royal Blue" },
  { hexcode: "#0000FF", name: "Blue" },
  { hexcode: "#0000CD", name: "Medium Blue" },
  { hexcode: "#00008B", name: "Dark Blue" },
  { hexcode: "#000080", name: "Navy" },
  { hexcode: "#191970", name: "Midnight Blue" },
  { hexcode: "#483D8B", name: "Dark Slate Blue" },
  { hexcode: "#6A5ACD", name: "Slate Blue" },
  { hexcode: "#7B68EE", name: "Medium Slate Blue" },
  { hexcode: "#8A2BE2", name: "Blue Violet" },
  { hexcode: "#9370DB", name: "Medium Purple" },
  { hexcode: "#800080", name: "Purple" },
  { hexcode: "#9932CC", name: "Dark Orchid" },
  { hexcode: "#9400D3", name: "Dark Violet" },
  { hexcode: "#BA55D3", name: "Medium Orchid" },
  { hexcode: "#DDA0DD", name: "Plum" },
  { hexcode: "#EE82EE", name: "Violet" },
  { hexcode: "#E6E6FA", name: "Lavender" },
  { hexcode: "#D8BFD8", name: "Thistle" },
  { hexcode: "#FF00FF", name: "Fuchsia" },
  { hexcode: "#FF00FF", name: "Magenta" },
  { hexcode: "#FF1493", name: "Deep Pink" },
  { hexcode: "#FF69B4", name: "Hot Pink" },
  { hexcode: "#FFB6C1", name: "Light Pink" },
  { hexcode: "#FFF0F5", name: "Lavender Blush" },
  { hexcode: "#FFE4E1", name: "Misty Rose" },
  { hexcode: "#F08080", name: "Light Coral" },
  { hexcode: "#CD853F", name: "Peru" },
  { hexcode: "#D2B48C", name: "Tan" },
  { hexcode: "#F4A460", name: "Sandy Brown" },
  { hexcode: "#BC8F8F", name: "Rosy Brown" },
  { hexcode: "#A0522D", name: "Sienna" },
  { hexcode: "#8B4513", name: "Saddle Brown" },
  { hexcode: "#A52A2A", name: "Brown" },
  { hexcode: "#800000", name: "Maroon" },
  { hexcode: "#696969", name: "Dim Gray" },
  { hexcode: "#A9A9A9", name: "Dark Gray" },
  { hexcode: "#C0C0C0", name: "Silver" },
  { hexcode: "#F5F5F5", name: "White Smoke" },
  { hexcode: "#F0F8FF", name: "Alice Blue" },
  { hexcode: "#F5FFFA", name: "Mint Cream" },
  { hexcode: "#F0FFF0", name: "HoneyDew" },
  { hexcode: "#000000", name: "Black" },
];
</script>

<style scoped>
.color-question {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(4rem, 1fr));
  gap: 1.4rem;

  & label {
    box-sizing: content-box;
    border-radius: 5px;
    aspect-ratio: 1;
    transition: all 0.1s ease-in-out;
    outline: 3px solid transparent;
    outline-offset: -3px;
    cursor: pointer;
    box-shadow: 5px 5px 15px #00000050;

    &:active {
      transform: scale(0.9);
    }

    &:has(input:checked) {
      outline: 3px solid #000000;
      outline-offset: 3px;
      z-index: 1;
      transform: scale(1.1);
    }

    & input {
      display: none;
    }
  }
}
</style>
