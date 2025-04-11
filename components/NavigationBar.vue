<template>
  <nav class="center-content">
    <ul>
      <li v-for="section in sections" class="section">
        <a
          class="section-link"
          :href="`#section-${section.id}`"
          @click="sectionClick(section.id)"
          :class="`${selectedSectionIndex === section.id ? 'selected' : ''} ${
            selectedSectionIndex > section.id ? 'completed' : ''
          }`">
          {{ section.id }}. {{ section.title }}
        </a>
      </li>
      <div class="indicator">
        <div class="container">
          <div class="indicator-inner-track"></div>
          <div ref="indicator" class="indicator-inner"></div>
        </div>
      </div>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
const props = defineProps<{
  sections: QuestionSection[];
}>();

const selectedSectionIndex = ref<number>(1);

const indicator = useTemplateRef("indicator");

function sectionClick(id: number) {
  selectedSectionIndex.value = id;
  const calculatedHeight = (100 * (selectedSectionIndex.value - 1)) / (props.sections.length - 1);
  indicator.value?.style.setProperty("height", `${calculatedHeight}%`);
}

onMounted(() => {
  indicator.value?.style.setProperty("grid-row", `1 / span ${props.sections.length}`);
});
</script>

<style scoped>
nav {
  padding: 0 40px;
  justify-content: start;
}
nav ul {
  display: grid;
  gap: 5rem;
  position: relative;
}

.section {
  z-index: 1;
  transition: all 0.2s ease-in-out;
}

.indicator {
  position: absolute;
  height: 100%;
  width: 5px;
  left: 11px;
  transform: translateX(-50%);
  padding: 0.5em 0;

  & .container {
    position: relative;
    height: 100%;
    width: 100%;
  }
}

.indicator-inner {
  position: absolute;
  inset: 0;
  height: 0%;
  width: 100%;
  border-radius: 999px;
  transition: height 0.5s ease-in-out;
  background: linear-gradient(in oklch 180deg, var(--color-blue) 0%, var(--color-purple) 100%);
}

.indicator-inner-track {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  transform: scaleX(0.6);
  transform-origin: center;
  border-radius: 999px;
  background: #ddd;
}

.section-link {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  text-decoration: none;
  border-radius: 999px;
  color: var(--color-text);

  &.selected {
    color: var(--color-blue);
  }

  &:not(.selected):not(.completed):hover {
    color: var(--color-blue);
  }

  &.completed {
    color: var(--color-blue);
  }

  &::before {
    transition: all 0.2s ease-in-out;
    content: "";
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    width: 20px;
    height: 20px;
    border-radius: 999px;
    background: white;
    border: var(--color-text) 1px solid;
  }

  &.completed::before {
    content: "✓";
    background: var(--color-blue);
    color: white;
    border-color: var(--color-blue);
  }

  &.selected::before {
    border-color: var(--color-blue);
  }
}
</style>
