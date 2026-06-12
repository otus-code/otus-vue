import { ref } from 'vue'

const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')

export function useAuth() {
  function login() {
    localStorage.setItem('isAuthenticated', 'true')
    isAuthenticated.value = true
  }

  function logout() {
    localStorage.removeItem('isAuthenticated')
    isAuthenticated.value = false
  }

  return { isAuthenticated, login, logout }
}