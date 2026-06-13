import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const customer = ref(null)

  const isAuthenticated = computed(() => customer.value !== null)

  function login(data) {
    customer.value = {
      name: data.name,
      email: data.email,
      address: data.address
    }
  }

  function logout() {
    customer.value = null
  }

  function updateAddress(address) {
    if (customer.value) {
      customer.value.address = address
    }
  }

  return { customer, isAuthenticated, login, logout, updateAddress }
})