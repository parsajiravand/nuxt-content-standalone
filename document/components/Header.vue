<template>
  <header
    class="dark:bg-gray-800 dark:text-white bg-gray-100 mb-10 fixed w-full z-50"
  >
    <div class="container mx-auto px-4 py-2 flex items-center justify-between">
      <div
        class="flex items-center tracking-tight dark:text-gray-50 transform hover:scale-105 transition duration-300 ease-in-out"
      >
        <Icon class="mr-2" size="1.25rem" name="logos:nuxt-icon" />
        <nuxt-link to="/" class="font-bold text-lg">
          Nuxt Content Standalone
        </nuxt-link>
      </div>

      <div class="flex items-center">
        <a
          href="https://github.com/parsajiravand/nuxt-content-standalone"
          target="_blank"
          rel="noopener noreferrer"
          class="icon-button"
        >
          <Icon size="1.25rem" name="mdi:github" />
        </a>
        <a
          href="https://www.npmjs.com/package/nuxt-content-stand"
          target="_blank"
          rel="noopener noreferrer"
          class="icon-button"
        >
          <Icon size="1.75rem" name="mdi:npm" />
        </a>
        <button
          v-show="colorMode.preference === 'light'"
          id="theme-toggle"
          @click="colorMode.preference = 'dark'"
          type="button"
          class="icon-button"
        >
          <Icon size="1.25rem" name="mdi:weather-night" />
        </button>
        <button
          id="theme-toggle"
          @click="colorMode.preference = 'light'"
          v-show="colorMode.preference === 'dark'"
          type="button"
          class="icon-button"
        >
          <Icon
            size="1.25rem"
            name="mdi:weather-sunny"
            @click="colorMode.preference = 'light'"
          />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
onMounted(() => {
  /* default nuxt color mode is system */
  const color = localStorage.getItem("nuxt-color-mode");
  /* for first time render color select because default color is system */
  if (color === "system" || !color) {
    colorMode.preference = "light";
  }
});
</script>

<style scoped>
.icon-button {
  @apply text-gray-500 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded text-sm p-2.5;
}
</style>
