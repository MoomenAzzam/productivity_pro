<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col text-gray-800 dark:text-gray-200"
  >
    <NavBar @toggle-theme="toggleDark" />

    <main class="flex-grow p-4 md:p-8">
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-center mb-10">
          <div class="space-y-2">
            <h1
              class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white"
            >
              My Task Boards
            </h1>
            <p
              class="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-md"
            >
              Organize your work, boost productivity, and stay on top of your
              goals.
            </p>
          </div>
          <button
            @click="openAddModal"
            class="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-md hover:from-blue-600 hover:to-blue-800 dark:hover:from-blue-700 dark:hover:to-blue-800 flex items-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 transform group-hover:scale-110 transition-transform duration-200"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Add Task</span>
            <span
              class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 bg-white dark:bg-gray-200 transition-opacity duration-300"
            ></span>
          </button>
        </div>

        <div class="flex flex-col md:flex-row gap-4">
          <TaskBoard
            title="To Do"
            :tasks="filteredTodoTasks"
            status="todo"
            @drop="handleDrop"
            @edit="openEditModal"
            @toggle-hide="toggleTaskVisibility"
          />
          <TaskBoard
            title="In Progress"
            :tasks="filteredInProgressTasks"
            status="in-progress"
            @drop="handleDrop"
            @edit="openEditModal"
            @toggle-hide="toggleTaskVisibility"
          />
          <TaskBoard
            title="Done"
            :tasks="filteredDoneTasks"
            status="done"
            @drop="handleDrop"
            @edit="openEditModal"
            @toggle-hide="toggleTaskVisibility"
          />
        </div>
      </div>
    </main>

    <AppFooter />
    <TaskModal
      :is-open="isModalOpen"
      :task-to-edit="taskToEdit"
      @close="closeModal"
      @submit="handleTaskSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import type { Task } from "~/types";
import { onMounted, ref, watch, computed } from "vue";

// Inject dark mode toggle from app.vue
const toggleDark = inject<() => void>("toggleDark", () => {});

// Task storage
const STORAGE_KEY = "nuxt-todo-app-tasks";
const tasks = ref<Task[]>([]);

// Load tasks from localStorage on mount
onMounted(() => {
  const savedTasks = localStorage.getItem(STORAGE_KEY);
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks);
  }
});

// Sync tasks with localStorage
watch(
  tasks,
  (newTasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
  },
  { deep: true }
);

// Filter tasks by status and sort by visibility
const filterTasksByStatus = (status: Task["status"]) =>
  computed(() =>
    tasks.value
      .filter((task) => task.status === status)
      .sort((a, b) => (a.isHidden === b.isHidden ? 0 : a.isHidden ? 1 : -1))
  );

const filteredTodoTasks = filterTasksByStatus("todo");
const filteredInProgressTasks = filterTasksByStatus("in-progress");
const filteredDoneTasks = filterTasksByStatus("done");

// Modal state
const isModalOpen = ref(false);
const taskToEdit = ref<Task | null>(null);

// Modal handlers
const openAddModal = () => {
  taskToEdit.value = null;
  isModalOpen.value = true;
};

const openEditModal = (task: Task) => {
  taskToEdit.value = { ...task }; // Shallow copy to avoid direct mutation
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// Task submission handler
const handleTaskSubmit = (
  taskData: Omit<Task, "id" | "status" | "isHidden">
) => {
  if (taskToEdit.value) {
    // Update existing task
    const index = tasks.value.findIndex((t) => t.id === taskToEdit.value!.id);
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...taskData };
    }
  } else {
    // Add new task
    tasks.value.push({
      id: Date.now(),
      status: "todo",
      isHidden: false,
      ...taskData,
    });
  }
  closeModal();
};

// Drag-and-drop handler
const handleDrop = (taskId: number, newStatus: Task["status"]) => {
  const task = tasks.value.find((t) => t.id === taskId);
  if (task) {
    task.status = newStatus;
  }
};

// Toggle task visibility
const toggleTaskVisibility = (taskId: number) => {
  const task = tasks.value.find((t) => t.id === taskId);
  if (task) {
    task.isHidden = !task.isHidden;
  }
};

useHead({
  meta: [
    {
      hid: "keywords",
      name: "keywords",
      content:
        "productivity tool, task management, drag and drop tasks, efficiency booster, workflow organizer",
    },
    {
      hid: "twitter:card",
      name: "twitter:card",
      content: "summary_large_image",
    },
  ],
});
</script>
