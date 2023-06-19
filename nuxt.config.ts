// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["@nuxt-themes/elements", "@nuxt-themes/typography"],
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
  generate: {
    routes: ["/nuxt-core-markdown__/test"],
  },
  content: {
    documentDriven: false,
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: "github-light",
        // Theme used if `html.dark`
        dark: "github-dark",
        // Theme used if `html.sepia`
        sepia: "monokai",
      },
    },
  },
});
