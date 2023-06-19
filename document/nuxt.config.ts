// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["nuxt-content-stand"],
  devtools: { enabled: true },
  generate: {
    routes: ["/apis/components"],
  },
});
