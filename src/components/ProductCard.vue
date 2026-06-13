<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useNotification } from '../composables/useNotification'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
const { notify } = useNotification()

function handleAddToCart() {
  cartStore.addToCart(props.product)
  notify(`«${props.product.title}» добавлен в корзину`, 'success')
}
</script>

<template>
  <div class="product-card">
    <RouterLink
      :to="{ name: 'product', params: { id: product.id } }"
      class="product-card__link"
    >
      <div class="product-card__image">
        <img :src="product.image" :alt="product.title" />
      </div>
      <h3 class="product-card__title">{{ product.title }}</h3>
    </RouterLink>

    <div class="product-card__footer">
      <span class="product-card__price">{{ product.price }} $</span>
      <button class="product-card__btn" @click="handleAddToCart">
        В корзину
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
  transition: box-shadow 0.2s;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-card__link {
  text-decoration: none;
  color: inherit;
  flex-grow: 1;
}

.product-card__image {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.product-card__image img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.product-card__title {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
  margin: 0 0 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.product-card__price {
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
}

.product-card__btn {
  padding: 8px 16px;
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.product-card__btn:hover {
  background: #369870;
}
</style>