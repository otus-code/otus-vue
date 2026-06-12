import { ref, computed } from 'vue'

const items = ref([])

export function useCart() {
  function addToCart(product) {
    const existing = items.value.find((item) => item.product.id === product.id)

    if (existing) {
      existing.quantity += 1
    } else {
      items.value.push({ product, quantity: 1 })
    }
  }

  function removeFromCart(productId) {
    items.value = items.value.filter((item) => item.product.id !== productId)
  }

  function clearCart() {
    items.value = []
  }

  const totalCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity * item.product.price, 0)
  )

  return { items, addToCart, removeFromCart, clearCart, totalCount, totalPrice }
}