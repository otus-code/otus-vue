import { defineStore } from 'pinia'
import { ref } from 'vue'
import productsData from '../data/products.json'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  function fetchProducts() {
    isLoading.value = true
    error.value = null
    try {
      products.value = productsData
    } catch (e) {
      error.value = 'Не удалось загрузить товары.'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  function getProductById(id) {
    return products.value.find((p) => p.id === Number(id))
  }

  function addProduct(product) {
    const newId = products.value.length
      ? Math.max(...products.value.map((p) => p.id)) + 1
      : 1
    products.value.unshift({ id: newId, ...product })
  }

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    getProductById,
    addProduct
  }
})