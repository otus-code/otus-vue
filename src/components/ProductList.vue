<script setup>
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'
import { useNotification } from '../composables/useNotification'

defineProps({
  products: {
    type: Array,
    required: true
  }
})

const router = useRouter()
const { addToCart } = useCart()
const { showNotification } = useNotification()

function openProduct(product) {
  router.push({ name: 'product', params: { id: product.id } })
}

function handleAddToCart(product) {
  addToCart(product)
  showNotification('Товар добавлен в корзину')
}
</script>

<template>
  <div>
    <p v-if="products.length === 0" class="empty">
      Товары не найдены
    </p>

    <div v-else class="products">
      <article
        v-for="product in products"
        :key="product.id"
        class="product-card"
        @click="openProduct(product)"
      >
        <img
          :src="product.image"
          :alt="product.title"
          class="product-image"
        >

        <div class="product-content">
          <h3>{{ product.title }}</h3>

          <p class="category">
            {{ product.category }}
          </p>

          <p class="price">
            ${{ product.price }}
          </p>

          <p v-if="product.rating" class="rating">
            ⭐ {{ product.rating.rate }} / 5
            <span>({{ product.rating.count }})</span>
          </p>

          <button class="add-button" @click.stop="handleAddToCart(product)">
            Добавить в корзину
          </button>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.empty {
  padding: 2rem;
  text-align: center;
  background: #fff;
  border-radius: 8px;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.product-card {
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid #e5e7eb;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: contain;
}

.product-content h3 {
  font-size: 1rem;
  min-height: 60px;
}

.category {
  color: #6b7280;
  font-size: 0.9rem;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #42b983;
}

.rating {
  color: #374151;
}

.rating span {
  color: #6b7280;
}

.add-button {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.6rem;
  border: none;
  border-radius: 6px;
  background: #42b983;
  color: #fff;
  cursor: pointer;
}

.add-button:hover {
  background: #35966a;
}
</style>