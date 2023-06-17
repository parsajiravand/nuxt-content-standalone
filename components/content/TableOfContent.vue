<template>
  <ul class="toc-links">
    <li
      v-for="link in links"
      :key="link.text"
      :class="[{ 'ml-3': link.depth === 4 }, `toc-link _${link.depth}`]"
    >
      <a
        :href="`#${link.id}`"
        class="block py-1 font-medium text-sm"
        :class="[
          activeHeadings.includes(link.id)
            ? 'text-blue-500 dark:text-blue-400'
            : 'hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300',
        ]"
        @click.prevent="scrollToHeading(link.id)"
      >
        {{ link.text }}
      </a>

      <TableOfContent v-if="link.children" :links="link.children" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { TocLink } from "@nuxt/content/dist/runtime/types";

defineProps({
  links: {
    type: Array as PropType<TocLink[]>,
    default: () => [],
  },
});

const emit = defineEmits(["move"]);

const route = useRoute();
const { activeHeadings, updateHeadings } = useScrollspy();

watch(
  () => route.path,
  () => {
    setTimeout(() => {
      if (process.client) {
        updateHeadings([
          ...document.querySelectorAll("h2"),
          ...document.querySelectorAll("h3"),
        ]);
      }
    }, 500);
  },
  { immediate: true }
);

const scrollToHeading = (id: string) => {
  // set smooth behavior
  window.scrollTo({
    top: document.getElementById(id)?.offsetTop,
    behavior: "smooth",
  });
  emit("move", id);
};
</script>
<style scoped>
.toc-links {
  @apply flex flex-col gap-2 px-1;
}

.toc-link {
  @apply text-slate-500 dark:text-gray-50 px-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded;
}

.toc-link._3 {
  @apply pl-3 text-sm;
}

.toc-link._4 {
  @apply pl-6;
}

.toc-link._undefined {
  @apply pl-8;
}
</style>
