<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

import AppHeader from './components/AppHeader.vue'
import ProductList from './components/ProductList.vue'
import ProductPage from './components/ProductPage.vue'
import OrderForm from './components/OrderForm.vue'
import CreateProductForm from './components/CreateProductForm.vue'

const products = ref([])
const loading = ref(false)
const error = ref('')

const currentPage = ref('home')
const selectedProduct = ref(null)

const filters = ref({
  title: '',
  minPrice: '',
  maxPrice: ''
})

const notification = ref('')

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const title = product.title.toLowerCase()
    const searchTitle = filters.value.title.toLowerCase()

    const productPrice = Number(product.price)
    const minPrice = filters.value.minPrice ? Number(filters.value.minPrice) : null
    const maxPrice = filters.value.maxPrice ? Number(filters.value.maxPrice) : null

    const matchesTitle = title.includes(searchTitle)

    const matchesMinPrice = minPrice === null || productPrice >= minPrice
    const matchesMaxPrice = maxPrice === null || productPrice <= maxPrice

    return matchesTitle && matchesMinPrice && matchesMaxPrice
  })
})

async function loadProducts() {
  try {
    loading.value = true
    error.value = ''

    const response = await axios.get('https://fakestoreapi.com/products')
    products.value = response.data
  } catch (err) {
    error.value = 'Не удалось загрузить товары'
  } finally {
    loading.value = false
  }
}

function openProduct(product) {
  selectedProduct.value = product
  currentPage.value = 'product'
}

function goHome() {
  currentPage.value = 'home'
  selectedProduct.value = null
}

function goToCreateProduct() {
  currentPage.value = 'createProduct'
}

function goToOrder() {
  currentPage.value = 'order'
}

function addNewProduct(product) {
  products.value.unshift(product)
  notification.value = 'Товар успешно создан'
  currentPage.value = 'home'

  setTimeout(() => {
    notification.value = ''
  }, 3000)
}

function orderSuccess() {
  notification.value = 'Заказ успешно оформлен'
  currentPage.value = 'home'
  selectedProduct.value = null

  setTimeout(() => {
    notification.value = ''
  }, 3000)
}

onMounted(() => {
  loadProducts()
})
</script>

<template>
  <div class="app">
    <AppHeader
      v-model:title="filters.title"
      v-model:min-price="filters.minPrice"
      v-model:max-price="filters.maxPrice"
      @home="goHome"
      @create-product="goToCreateProduct"
      @order="goToOrder"
    />

    <main class="container">
      <div v-if="notification" class="notification">
        {{ notification }}
      </div>

      <section v-if="currentPage === 'home'">
        <h1>Интернет-магазин</h1>

        <p v-if="loading">
          Загрузка товаров...
        </p>

        <p v-if="error" class="error">
          {{ error }}
        </p>

        <ProductList
          v-if="!loading && !error"
          :products="filteredProducts"
          @select-product="openProduct"
        />
      </section>

      <section v-if="currentPage === 'product' && selectedProduct">
        <ProductPage
          :product="selectedProduct"
          @back="goHome"
          @order="goToOrder"
        />
      </section>

      <section v-if="currentPage === 'order'">
        <OrderForm
          :product="selectedProduct"
          @success="orderSuccess"
          @back="goHome"
        />
      </section>

      <section v-if="currentPage === 'createProduct'">
        <CreateProductForm
          @created="addNewProduct"
          @back="goHome"
        />
      </section>
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: #f4f6f8;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.notification {
  padding: 1rem;
  margin-bottom: 1rem;
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #10b981;
  border-radius: 8px;
}

.error {
  color: #dc2626;
  font-weight: bold;
}
</style>