<template>
  <div
    class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex-1 min-w-[300px] flex flex-col"
  >
    <h2 class="font-bold text-xl mb-4 dark:text-white">{{ title }}</h2>

    <draggable
      :list="tasks"
      group="tasks"
      item-key="id"
      @change="onDrop"
      class="space-y-3 flex-grow"
      ghost-class="ghost-task"
      chosen-class="chosen-task"
      drag-class="dragging-task"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <template #item="{ element: task }">
        <TaskCard
          :task="task"
          @edit="(task) => $emit('edit', task)"
          @toggleHide="(taskId) => $emit('toggleHide', taskId)"
          class="transition-all duration-200"
          :class="{
            'opacity-60': task.isHidden,
          }"
        />
      </template>

      <template #footer>
        <div
          v-if="tasks.length === 0"
          class="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-8 text-center text-gray-500"
        >
          No tasks here yet. Drag some in or create new ones!
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
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

const isDragging = ref(false);

const onDrop = (event: any) => {
  if (event.added) {
    emit("drop", event.added.element.id, props.status);
  }
};
const handleDelete = () => {
  if (props.taskToEdit) {
    emit("delete", props.taskToEdit.id);
    closeModal();
  }
};
</script>
