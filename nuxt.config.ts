// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    "@nuxt-themes/elements",
    "@nuxt-themes/typography",
  ],
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    [
      "@nuxtjs/color-mode",
      {
        classSuffix: "",
      },
    ],
  ],
  content: {
    documentDriven: false,
  },
});
