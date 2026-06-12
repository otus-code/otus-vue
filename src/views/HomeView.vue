<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import ProductList from '../components/ProductList.vue'

const products = ref([])
const loading = ref(false)
const error = ref('')

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

async function loadProducts() {
  try {
    loading.value = true
    error.value = ''

    const response = await axios.get('https://fakestoreapi.com/products')
    products.value = response.data
  } catch {
    error.value = 'Не удалось загрузить товары'
  } finally {
    loading.value = false
  }
}

onMounted(loadProducts)
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

    <p v-if="loading">
      Загрузка товаров...
    </p>

    <p v-if="error" class="error">
      {{ error }}
    </p>

    <ProductList
      v-if="!loading && !error"
      :products="filteredProducts"
    />
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