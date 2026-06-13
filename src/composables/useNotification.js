import { ref } from 'vue'

// Состояние вынесено за пределы функции — общее для всего приложения
const notifications = ref([])
let nextId = 0

export function useNotification() {
  function notify(message, type = 'info', duration = 3000) {
    const id = nextId++
    notifications.value.push({ id, message, type })

    setTimeout(() => {
      remove(id)
    }, duration)
  }

  function remove(id) {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }

  return { notifications, notify, remove }
}