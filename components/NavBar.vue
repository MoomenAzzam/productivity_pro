<template>
  <nav
    class="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-800 dark:to-gray-900 text-white shadow-lg transition-colors duration-200"
  >
    <div class="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <span class="text-xl font-bold">Productivity Pro</span>
      </div>

      <div class="flex items-center space-x-4">
        <div class="text-sm md:text-base italic animate-pulse hidden sm:block">
          {{ motivationalStatement }}
        </div>

        <button
          @click="toggleDark"
          class="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
          :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <svg
            v-if="isDark"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useIntervalFn, useDocumentVisibility } from "@vueuse/core";
import { ref, watch } from "vue";

// Inject dark mode state and toggle
const isDark = inject<boolean>("isDark", false);
const toggleDark = inject<() => void>("toggleDark", () => {});

// Motivational statements
const motivationalStatements = [
  "Progress, not perfection!",
  "Small steps lead to big achievements!",
  "You're capable of amazing things!",
  "One task at a time - you've got this!",
];

const motivationalStatement = ref(motivationalStatements[0]);

// Rotate statements every 10 seconds
const { pause, resume } = useIntervalFn(() => {
  const currentIndex = motivationalStatements.indexOf(
    motivationalStatement.value
  );
  const nextIndex = (currentIndex + 1) % motivationalStatements.length;
  motivationalStatement.value = motivationalStatements[nextIndex];
}, 10000);

// Pause when tab is inactive
const visibility = useDocumentVisibility();
watch(visibility, (v) => {
  if (v === "visible") resume();
  else pause();
});
</script>
