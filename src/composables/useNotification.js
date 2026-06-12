import { ref } from 'vue'

const notification = ref('')
let timeoutId = null

export function useNotification() {
  function showNotification(text) {
    notification.value = text
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      notification.value = ''
    }, 3000)
  }

  return { notification, showNotification }
}