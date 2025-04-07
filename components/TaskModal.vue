<template>
  <Transition name="fade">
    <div
      @click="closeModal"
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="flex items-center justify-center min-h-screen p-4 w-full">
        <!-- Modal content -->
        <Transition name="scale">
          <div
            v-if="isOpen"
            class="bg-white rounded-lg shadow-xl overflow-hidden transform transition-all w-full max-w-md"
            @click.stop
          >
            <div class="p-6">
              <h2 class="text-xl font-bold mb-4 dark:text-gray-700">
                {{ isEdit ? "Edit Task" : "Add New Task" }}
              </h2>

              <form @submit.prevent="handleSubmit">
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Title</label
                    >
                    <input
                      v-model="form.title"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors dark:text-gray-700"
                      ref="firstInput"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Description</label
                    >
                    <textarea
                      v-model="form.description"
                      rows="3"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors dark:text-gray-700"
                    ></textarea>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Date</label
                    >
                    <input
                      v-model="form.date"
                      type="date"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors dark:text-gray-700"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Tag</label
                    >
                    <select
                      v-model="form.tag"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors dark:text-gray-700"
                    >
                      <option value="work">Work</option>
                      <option value="study">Study</option>
                      <option value="personal">Personal</option>
                    </select>
                  </div>
                </div>

                <div class="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    @click="closeModal"
                    class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    {{ isEdit ? "Update" : "Add" }} Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { Task } from "~/types";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  taskToEdit: {
    type: Object as () => Task | null,
    default: null,
  },
});

const emit = defineEmits(["close", "submit"]);

const firstInput = ref<HTMLInputElement | null>(null);

const isEdit = computed(() => !!props.taskToEdit);

const form = ref({
  title: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
  tag: "work",
});

watch(
  () => props.taskToEdit,
  (task) => {
    if (task) {
      form.value = {
        title: task.title,
        description: task.description,
        date: task.date.split("T")[0],
        tag: task.tag,
      };
    } else {
      resetForm();
    }
  }
);

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      nextTick(() => {
        firstInput.value?.focus();
      });
    }
  }
);

const resetForm = () => {
  form.value = {
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    tag: "work",
  };
};

const closeModal = () => {
  emit("close");
};

const handleSubmit = () => {
  const taskData = {
    ...form.value,
    date: new Date(form.value.date).toISOString(),
  };
  emit("submit", taskData);
  resetForm();
};
</script>

<style>
/* Fade transition for overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Scale transition for modal */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Modal transition */
.modal-enter-active {
  transition: all 0.3s ease-out;
}

.modal-leave-active {
  transition: all 0.2s ease-in;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
