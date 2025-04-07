import { useStorage, useDebounceFn, useMagicKeys, whenever } from '@vueuse/core'
import type { Task } from '~/types'

export const useTodoApp = () => {
  const STORAGE_KEY = 'nuxt-todo-app-v2'
  
  // Tasks with localStorage persistence
  const tasks = useStorage<Task[]>(STORAGE_KEY, [], localStorage, {
    serializer: {
      read: (v) => v ? JSON.parse(v) : [],
      write: (v) => JSON.stringify(v)
    }
  })

  // Search functionality
  const searchQuery = ref('')
  const debouncedSearch = useDebounceFn(() => {}, 300)
  
  const filteredTasks = (status: Task['status']) => {
    return [...tasks.value]
      .filter(task => task.status === status)
      .filter(task => 
        task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        task.tag.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
      .sort((a, b) => {
        if (a.isHidden === b.isHidden) return 0
        return a.isHidden ? 1 : -1
      })
  }

  // Keyboard shortcuts
  const keys = useMagicKeys()
  const showModal = ref(false)
  
  whenever(keys['Ctrl+Enter'], () => {
    showModal.value = true
  })

  return {
    tasks,
    searchQuery,
    debouncedSearch,
    filteredTasks,
    showModal
  }
}