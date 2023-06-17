<template>
  <ul>
    <li
      v-for="item of items as NavItem[]"
      :key="item._path"
      :class="{ 'pl-4': hasChildren(item) }"
      class="py-1"
    >
      <div
        @click="toggleCollapse(item)"
        class="flex items-center cursor-pointer"
      >
        <span v-if="hasChildren(item)">
          <svg
            :class="{ 'rotate-90': item.isOpen }"
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
          :to="item._path"
          class="block text-sm text-gray-800 dark:text-gray-100"
        >
          <span
            class="hover:text-blue-500 px-2 rounded"
            :class="{ 'text-blue-500': isCurrentRoute(item) }"
          >
            {{ item.title }}
          </span>
        </NuxtLink>
      </div>
      <Sidebar
        v-if="item.isOpen && hasChildren(item)"
        :items="item.children as NavItem[]"
      ></Sidebar>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { NavItem } from "@nuxt/content/dist/runtime/types";

defineProps({
  items: {
    type: Array as PropType<NavItem[]>,
    required: true,
  },
});

const toggleCollapse = (item: NavItem) => {
  item.isOpen = !item.isOpen;
};

const route = useRoute();
const isCurrentRoute = (item: NavItem) => {
  // Your implementation for checking current route
  return item._path === route.path;
};
const hasChildren = (item: NavItem) => {
  return Array.isArray(item.children) && item.children.length > 0;
};
</script>
<style>
/* Additional styling for nested levels */
li.pl-4 {
  padding-left: 1rem; /* Adjust the padding as per your design */
}

li.pl-4::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.75rem; /* Adjust the top position as per your design */
  height: 0.5rem; /* Adjust the height as per your design */
  width: 0.25rem; /* Adjust the width as per your design */
  background-color: #ccc; /* Change the background color as desired */
}
</style>
