<template>
  <div
    class="bg-white dark:bg-gray-800 dark:border dark:border-gray-700 rounded-lg shadow p-4 mb-3 cursor-move hover:shadow-md transition-shadow duration-200"
    :class="{
      'opacity-60 bg-gray-100 dark:bg-gray-900 dark:border-gray-800': task.isHidden,
    }"
  >
    <div class="flex justify-between items-start">
      <h3
        class="font-bold text-lg text-gray-800 dark:text-gray-100"
        :class="{
          'line-through text-gray-500 dark:text-gray-500': task.isHidden,
        }"
      >
        {{ task.title }}
      </h3>
      <div class="flex space-x-2">
        <button
          @click.stop="toggleHideTask"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          :title="task.isHidden ? 'Show task' : 'Hide task'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>
        <button
          @click.stop="emit('edit', task)"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          title="Edit task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            />
          </svg>
        </button>
      </div>
    </div>
    <p
      class="text-gray-600 dark:text-gray-300 mt-1"
      :class="{ 'line-through': task.isHidden }"
    >
      {{ task.description }}
    </p>
    <div class="mt-2 flex items-center justify-between">
      <span class="text-sm text-gray-500 dark:text-gray-400">
        {{ formatDate(task.date) }}
      </span>
      <span
        :class="`px-2 py-1 rounded-full text-xs font-medium ${
          task.tag === 'work'
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            : task.tag === 'study'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
        }`"
      >
        {{ task.tag }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from "~/types";

const props = defineProps({
  task: {
    type: Object as () => Task,
    required: true,
  },
});

const emit = defineEmits(["edit", "toggleHide"]);

const toggleHideTask = () => {
  emit("toggleHide", props.task.id);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
</script>