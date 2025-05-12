// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  devtools: { enabled: true },

  nitro: {
    experimental: {
      websocket: true,
    },
  },

  app: {
    head: {
      title: "AIDIA", // default fallback title
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }],
    },
  },

  modules: ["@pinia/nuxt"],
});
