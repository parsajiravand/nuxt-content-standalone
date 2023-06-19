<template>
  <li
    v-for="link of navigation"
    :key="link._path"
    class="py-2 dark:text-gray-100"
  >
    <div @click="toggleCollapse(link)" class="flex items-center cursor-pointer">
      <span class="mr-2">
        <svg
          v-if="link.children?.length"
          :class="{ 'rotate-90': link.isOpen }"
          class="w-4 h-4 transition-transform duration-300 transform"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </span>

      <NuxtLink
        :to="link._path"
        class="block text-sm text-gray-800 dark:text-gray-100"
      >
        <span
          class="hover:text-blue-500 rounded"
          :class="{ 'text-blue-500 dark:text-blue-300': isCurrentRoute(link) }"
        >
          {{ link.title }}
        </span>
      </NuxtLink>
    </div>
    <Sidebar v-if="link.isOpen" :items="link.children || []"></Sidebar>
  </li>
</template>

<script setup lang="ts">
import { INavigation } from "~/interfaces/navigation";
import { NavItem } from "@nuxt/content/dist/runtime/types";

defineProps({
  navigation: {
    type: Array as PropType<INavigation[]>,
    required: true,
  },
});
// toggle collapse item
const toggleCollapse = (link: NavItem) => {
  link.isOpen = !link.isOpen;
};
const route = useRoute();
const isCurrentRoute = (item: NavItem) => {
  // Your implementation for checking current route
  return item._path === route.path;
};
</script>

<style></style>
