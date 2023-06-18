<template>
  <div>
    <header class="bg-gray-800 text-white">
      <!-- Header content -->
    </header>
    
    <main class="container mx-auto px-4 py-6">
      <!-- Page content -->
      <slot></slot>
    </main>
    
    <footer class="bg-gray-800 text-white">
      <div class="container mx-auto px-4 py-6 flex items-center justify-between">
        <div>
          &copy; {{ currentYear }} My Documentation
        </div>
        <div>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-white hover:text-blue-300 transition duration-300 ease-in-out"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <!-- GitHub icon path -->
            </svg>
          </a>
          <a href="https://npmjs.com" target="_blank" rel="noopener noreferrer" class="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-white hover:text-blue-300 transition duration-300 ease-in-out"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <!-- npm icon path -->
            </svg>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouteRecordRaw, RouterLink } from 'vue-router';

const pages = ref<RouteRecordRaw[]>([
  { path: '/', title: 'Home' },
  { path: '/docs', title: 'Docs' },
  { path: '/examples', title: 'Examples' },
  { path: '/about', title: 'About' },
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
