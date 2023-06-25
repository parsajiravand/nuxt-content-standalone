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
  pinceau: {
    // (pinceau-transforms plugin) Sourcemap is likely to be incorrect: a plugin (pinceau-transforms) was used to transform files, but didn't generate a sourcemap for the transformation. Consult the plugin documentation for help
    configLayers: [
      {
        tokens: {
          color: {
            primary: {
              50: "#F1FCFF",
              100: "#DCF7FF",
              200: "#C5F2FF",
              300: "#82E3FF",
              400: "#55E1FF",
              500: "#1AD6FF",
              600: "#09A0C1",
              700: "#024757",
              800: "#00232B",
              900: "#001A1F",
            },
            secondary: {
              50: "#F2FAFF",
              100: "#DFF3FF",
              200: "#C6EAFF",
              300: "#A1DDFF",
              400: "#64C7FF",
              500: "#1AADFF",
              600: "#0069A6",
              700: "#014267",
              800: "#002235",
              900: "#00131D",
            },
          },
        },
      },
    ],
  },
});
