<template>
  <header class="bg-gray-800 text-white mb-10 fixed w-full">
    <div class="container mx-auto px-4 py-6 flex items-center justify-between">
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-blue-300 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 2a8 8 0 100 16 8 8 0 000-16zM4.343 11.657a1 1 0 010-1.414 1 1 0 011.414 0 1 1 0 010 1.414 1 1 0 01-1.414 0zm1.414-5.657a1 1 0 011.414 0 1 1 0 010 1.414 1 1 0 01-1.414 0 1 1 0 010-1.414zm7.778 0a1 1 0 011.414 0 1 1 0 010 1.414 1 1 0 01-1.414 0 1 1 0 010-1.414zM5.657 8.343a1 1 0 010-1.414 1 1 0 011.414 0 1 1 0 010 1.414 1 1 0 01-1.414 0zm4.95 6.364a6.002 6.002 0 01-4.95-6.364c0-2.15 1.118-4.084 2.803-5.18A7.963 7.963 0 0010 2c2.206 0 4.233.877 5.743 2.316A6.002 6.002 0 0110.607 14.707z"
            clip-rule="evenodd"
          />
        </svg>
        <router-link to="/" class="text-xl font-bold">
          My Documentation
        </router-link>
      </div>
      
      <div class="flex items-center">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-white hover:text-blue-300 transition duration-300 ease-in-out"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a8 8 0 00-8 8c0 3.866 2.763 7.104 6.424 7.858.47.087.643-.204.643-.454v-2.31c-2.623.577-3.176-1.258-3.176-1.258-.428-1.088-1.044-1.378-1.044-1.378-.853-.58.064-.568.064-.568.944.064 1.438.97 1.438.97.835 1.43 2.192 1.018 2.722.778.086-.624.328-1.018.597-1.254-2.09-.233-4.278-1.045-4.278-4.65 0-1.03.367-1.876.97-2.534-.098-.232-.42-1.195.092-2.494 0 0 .785-.253 2.572.964A9.12 9.12 0 0110 5.484a9.12 9.12 0 012.674-.475c1.787-1.217 2.57-.964 2.57-.964.514 1.299.19 2.262.092 2.494.603.658.97 1.504.97 2.534 0 3.614-2.19 4.414-4.286 4.645.337.29.64.864.64 1.744v2.588c0 .249.173.541.65.453A8.003 8.003 0 0018 10a8 8 0 00-8-8zm0 2a6 6 0 00-6 6c0 1.964 1.18 3.662 2.872 4.416-.017-.145-.04-.326-.04-.53 0-1.274.923-2.296 2.055-2.296a2.33 2.33 0 011.465.517 2.322 2.322 0 01.57-.074c.198 0 .392.025.57.074a2.33 2.33 0 011.465-.517c1.132 0 2.055 1.022 2.055 2.296 0 .204-.023.385-.04.53A5.98 5.98 0 0010 18a6 6 0 000-12z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
        <a href="https://npmjs.com" target="_blank" rel="noopener noreferrer" class="mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-white hover:text-blue-300 transition duration-300 ease-in-out"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.486 2 2 6.487 2 12c0 2.555.953 4.897 2.518 6.678L8.8 16.166c-.338-.413-.74-.98-.74-1.963 0-1.288.845-2.334 1.887-2.334s1.888 1.046 1.888 2.334c0 .982-.402 1.55-.74 1.963l4.282 2.512C20.047 16.898 21 14.556 21 12c0-5.513-4.487-10-10-10zm0 18.35c-.433 0-.802-.225-.998-.527L6.384 9.265h4.063V8.095H4.85L11.308 4.7v6.536h1.274v1.17h-1.274v6.002l4.045-2.359c.276-.161.465-.446.465-.766v-1.778c0-.78-.632-1.412-1.41-1.412zm.762-9.065h4.06v1.171h-4.06v-1.17zm0 2.341h2.786v1.17H13.75v-1.17zm0 2.34h2.786v1.17H13.75v-1.17zm0 2.34h2.786v1.17H13.75v-1.17z" />
          </svg>
        </a>
        <button @click="toggleTheme" class="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            v-if="isDarkTheme"
            class="h-6 w-6 text-white hover:text-blue-300 transition duration-300 ease-in-out"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            v-else
            class="h-6 w-6 text-white hover:text-blue-300 transition duration-300 ease-in-out"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12zM9 6a1 1 0 00-2 0v2H6a1 1 0 100 2h1v2a1 1 0 102 0v-2h2a1 1 0 100-2H9V6z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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

function toggleTheme() {
  isDarkTheme.value = !isDarkTheme.value;
  // Implement your theme toggling logic here
}
</script>

<style scoped>
/* Add any custom styles specific to the header component here */
</style>
