<template>
    <footer class="bg-gray-800 text-white py-8 mt-12">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">About This App</h3>
            <p class="text-gray-300">
              A productivity tool to help you organize your tasks and boost your efficiency.
              Drag and drop tasks between boards as you make progress.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Data Storage</h3>
            <p class="text-gray-300">
              All your tasks are stored locally in your browser's localStorage.
              Your data never leaves your device.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Technologies Used</h3>
            <ul class="text-gray-300 space-y-1">
              <li>• Nuxt.js - Vue framework</li>
              <li>• Tailwind CSS - Styling</li>
              <li>• TypeScript - Type safety</li>
              <li>• HTML5 Drag & Drop API</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {{ new Date().getFullYear() }} Productivity Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </template>