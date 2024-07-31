// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  telemetry: false,
  modules: ["@nuxt/eslint", "@nuxt/ui"],
  future: {
    compatibilityVersion: 4,
  },

  runtimeConfig: {
    backend: {
      baseUrl: "",
      apiUrl: "",
      authUrl: "",
    },
  },
});
