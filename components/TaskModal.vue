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

                <div class="mt-6 flex justify-between">
                  <div>
                    <button
                      v-if="isEdit"
                      @click="handleDelete"
                      type="button"
                      class="px-4 py-2 bg-red-600  rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors mr-2"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                  <div class="flex space-x-3">
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

const emit = defineEmits(["close", "submit", "delete"]); // Added delete emit

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

// Add this new method for handling delete
const handleDelete = () => {
  if (props.taskToEdit) {
    emit("delete", props.taskToEdit.id);
    closeModal();
  }
};
</script>
