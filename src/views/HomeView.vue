<script setup>
import { computed, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '../stores/products'
import ProductList from '../components/ProductList.vue'

const productsStore = useProductsStore()
const { products, isLoading, error } = storeToRefs(productsStore)

onMounted(() => {
  if (products.value.length === 0) {
    productsStore.fetchProducts()
  }
})

const filters = ref({
  title: '',
  minPrice: '',
  maxPrice: ''
})

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchesTitle = product.title
      .toLowerCase()
      .includes(filters.value.title.toLowerCase())

    const price = Number(product.price)
    const min = filters.value.minPrice ? Number(filters.value.minPrice) : null
    const max = filters.value.maxPrice ? Number(filters.value.maxPrice) : null

    const matchesMin = min === null || price >= min
    const matchesMax = max === null || price <= max

    return matchesTitle && matchesMin && matchesMax
  })
})
</script>

<template>
  <section>
    <h1>Интернет-магазин</h1>

    <form class="filters" @submit.prevent>
      <input
        v-model="filters.title"
        type="text"
        placeholder="Поиск по названию"
      >
      <input
        v-model="filters.minPrice"
        type="number"
        min="0"
        placeholder="Цена от"
      >
      <input
        v-model="filters.maxPrice"
        type="number"
        min="0"
        placeholder="Цена до"
      >
    </form>

    <p v-if="isLoading">Загрузка товаров...</p>
    <p v-else-if="error" class="error">{{ error }}</p>
    <ProductList v-else :products="filteredProducts" />
  </section>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.filters input {
  padding: 0.6rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
}

.error {
  color: #dc2626;
  font-weight: bold;
}

@media (max-width: 650px) {
  .filters {
    flex-direction: column;
  }
}
</style>