<template>
  <div
    class="min-h-screen transition-colors duration-200"
    :class="{ dark: isDark }"
  >
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onBeforeMount } from "vue";

const DARK_MODE_KEY = "productivity_pro_dark_mode";

const isDark = ref<boolean>(false);

const initDarkMode = () => {
  if (process.client) {
    const saved = localStorage.getItem(DARK_MODE_KEY);
    isDark.value = saved ? JSON.parse(saved) : false;
    applyDarkMode(isDark.value);
  }
};

const applyDarkMode = (dark: boolean) => {
  if (process.client) {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
};

const toggleDark = () => {
  isDark.value = !isDark.value;
  localStorage.setItem(DARK_MODE_KEY, JSON.stringify(isDark.value));
  applyDarkMode(isDark.value);
};

onBeforeMount(() => {
  initDarkMode();
});

watch(isDark, (newVal) => {
  applyDarkMode(newVal);
});

provide("isDark", isDark);
provide("toggleDark", toggleDark);
</script>

<style scoped>
.min-h-screen {
  transition: background-color 0.2s ease, color 0.2s ease;
}
.ghost-task {
  opacity: 0.5;
  background: #c8ebfb;
  border: 2px dashed #4299e1;
}
.chosen-task {
  opacity: 0.8;
  transform: scale(1.02);
}
.dragging-task {
  transform: rotate(2deg);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
</style>
