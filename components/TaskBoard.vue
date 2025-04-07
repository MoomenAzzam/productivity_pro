<template>
  <div
    @drop="onDrop"
    @dragover.prevent
    @dragenter.prevent
    class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex-1 min-w-[300px] flex flex-col"
    :class="{
      'border-2 border-dashed border-gray-300': isDraggingOver,
    }"
  >
    <h2 class="font-bold text-xl mb-4 dark:text-white">{{ title }}</h2>
    <div class="space-y-3 flex-grow">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit="(task) => $emit('edit', task)"
        @toggleHide="(taskId) => $emit('toggleHide', taskId)"
        class="transition-all duration-200"
        :class="{
          'sortable-chosen': isDragging,
          'opacity-60': task.isHidden,
        }"
      />
      <div
        v-if="tasks.length === 0"
        class="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-8 text-center text-gray-500"
      >
        No tasks here yet. Drag some in or create new ones!
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from "~/types";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  tasks: {
    type: Array as () => Task[],
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["drop", "edit", "toggleHide"]);

const isDraggingOver = ref(false);
const isDragging = ref(false);

const onDrop = (e: DragEvent) => {
  isDraggingOver.value = false;
  isDragging.value = false;
  const taskId = e.dataTransfer?.getData("taskId");
  if (taskId) {
    emit("drop", parseInt(taskId), props.status);
  }
};

const onDragEnter = () => {
  isDraggingOver.value = true;
};

const onDragLeave = () => {
  isDraggingOver.value = false;
};
</script>
