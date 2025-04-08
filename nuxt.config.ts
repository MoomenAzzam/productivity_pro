// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  app: {
    head: {
      title: "Productivity Pro",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "A powerful productivity tool to organize your tasks with drag-and-drop functionality. Boost your efficiency and manage your workflow effectively.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Productivity Tool - Organize Tasks & Boost Efficiency",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Drag-and-drop task management tool to organize your workflow and increase productivity.",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://yourdomain.com/images/og-image.jpg",
        },
      ],
    },
  },
  imports: {
    autoImport: true,
  },
  tailwindcss: {
    config: {
      darkMode: "class",
    },
  },
});
