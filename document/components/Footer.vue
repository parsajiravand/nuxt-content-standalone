<template>
  <footer class="dark:bg-gray-800 py-4 mt-4 dark:text-white bg-gray-50">
    <div class="container mx-auto px-4  flex items-center justify-between">
      <div>&copy; {{ currentYear }} My Documentation</div>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { RouteRecordRaw, RouterLink } from "vue-router";

const pages = ref<RouteRecordRaw[]>([
  { path: "/", title: "Home" },
  { path: "/docs", title: "Docs" },
  { path: "/examples", title: "Examples" },
  { path: "/about", title: "About" },
]);

const isDarkTheme = ref<boolean>(true);

// Optional type declarations for better TypeScript support
const routerLinkProps = {
  to: String,
  class: String,
};

// Type declarations for the component props
const props = {
  routerLink: routerLinkProps,
};

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
/* Add any custom styles specific to the header and footer components here */
</style>
