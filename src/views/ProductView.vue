<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useCart } from '../composables/useCart'
import { useNotification } from '../composables/useNotification'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const product = ref(null)
const loading = ref(false)
const error = ref('')

const { addToCart } = useCart()
const { showNotification } = useNotification()

async function loadProduct(id) {
  try {
    loading.value = true
    error.value = ''
    product.value = null

    const response = await axios.get(`https://fakestoreapi.com/products/${id}`)

    if (!response.data) {
      error.value = 'Товар не найден'
      return
    }

    product.value = response.data
  } catch {
    error.value = 'Не удалось загрузить товар'
  } finally {
    loading.value = false
  }
}

function handleAddToCart() {
  addToCart(product.value)
  showNotification('Товар добавлен в корзину')
}

onMounted(() => loadProduct(props.id))

watch(() => props.id, (newId) => loadProduct(newId))
</script>

<template>
  <div class="product-page">
    <router-link to="/" class="back-link">
      Назад к товарам
    </router-link>

    <p v-if="loading">
      Загрузка товара...
    </p>

    <p v-if="error" class="error">
      {{ error }}
    </p>

    <div v-if="product" class="product">
      <img
        :src="product.image"
        :alt="product.title"
        class="product-image"
      >

      <div class="product-info">
        <p class="category">
          {{ product.category }}
        </p>

        <h1>{{ product.title }}</h1>

        <p class="price">
          ${{ product.price }}
        </p>

        <p v-if="product.rating" class="rating">
          ⭐ Рейтинг: {{ product.rating.rate }} / 5
          <span>({{ product.rating.count }} отзывов)</span>
        </p>

        <p class="description">
          {{ product.description }}
        </p>

        <button class="order-button" @click="handleAddToCart">
          Добавить в корзину
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-page {
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
}

.back-link {
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.6rem 1rem;
  background: #6b7280;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
}

.error {
  color: #dc2626;
  font-weight: bold;
}

.product {
  display: flex;
  gap: 2rem;
}

.product-image {
  width: 300px;
  height: 350px;
  object-fit: contain;
}

.product-info {
  flex: 1;
}

.category {
  display: inline-block;
  padding: 0.3rem 0.7rem;
  background: #e0f2fe;
  color: #0369a1;
  border-radius: 20px;
}

.price {
  font-size: 2rem;
  font-weight: bold;
  color: #42b983;
}

.rating span {
  color: #6b7280;
}

.description {
  line-height: 1.6;
}

.order-button {
  padding: 0.8rem 1.2rem;
  border: none;
  background: #42b983;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
}

.order-button:hover {
  background: #35966a;
}

@media (max-width: 750px) {
  .product {
    flex-direction: column;
  }

  .product-image {
    width: 100%;
  }
}
</style>