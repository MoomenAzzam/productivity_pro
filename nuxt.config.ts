// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  nitro: {
    prerender: {
      routes: ["/"],
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "Productivity Pro",
      titleTemplate: "%s - Productivity Pro | Task Management Tool",
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
          hid: "keywords",
          name: "keywords",
          content:
            "productivity app, task management, kanban board, to-do list, workflow organizer, time management, productivity tools",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://productivity-pro.netlify.app",
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "website",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "Productivity Pro - Advanced Task Management",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content:
            "Drag-and-drop task management tool to organize your workflow and increase productivity.",
        },
      ],
      link: [
        { rel: "canonical", href: "https://productivity-pro.netlify.app" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
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
