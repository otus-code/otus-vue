<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const cartStore = useCartStore()

const { items, totalCount, totalPrice } = storeToRefs(cartStore)
const { removeFromCart, increment, decrement, clearCart } = cartStore
</script>

<template>
  <div class="cart-page">
    <h1>Корзина</h1>

    <p v-if="items.length === 0" class="empty">
      Корзина пуста.
      <router-link to="/">Перейти в каталог</router-link>
    </p>

    <template v-else>
      <ul class="cart-list">
        <li v-for="item in items" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.title">

          <div class="cart-item-info">
            <router-link :to="{ name: 'product', params: { id: item.id } }">
              {{ item.title }}
            </router-link>
            <p>${{ item.price }} за шт.</p>
          </div>

          <div class="qty-controls">
            <button @click="decrement(item.id)">−</button>
            <span>{{ item.quantity }}</span>
            <button @click="increment(item.id)">+</button>
          </div>

          <strong class="cart-item-sum">
            ${{ (item.price * item.quantity).toFixed(2) }}
          </strong>

          <button class="remove-button" @click="removeFromCart(item.id)">
            ✕
          </button>
        </li>
      </ul>

      <div class="cart-summary">
        <p>
          Товаров: {{ totalCount }}, итого:
          <strong>${{ totalPrice.toFixed(2) }}</strong>
        </p>

        <div class="cart-actions">
          <button class="clear-button" @click="clearCart">
            Очистить корзину
          </button>
          <button
            class="checkout-button"
            @click="router.push({ name: 'checkout' })"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.cart-page {
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
}

.empty {
  padding: 1rem 0;
}

.cart-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 60px 1fr auto auto auto;
  gap: 1rem;
  align-items: center;
  padding: 0.8rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.cart-item img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.cart-item-info a {
  color: #111827;
  font-weight: 600;
  text-decoration: none;
}

.cart-item-info a:hover {
  text-decoration: underline;
}

.cart-item-info p {
  margin: 0.3rem 0 0;
  color: #6b7280;
}

.qty-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty-controls button {
  width: 28px;
  height: 28px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.qty-controls button:hover {
  background: #f0f0f0;
}

.cart-item-sum {
  min-width: 80px;
  text-align: right;
}

.remove-button {
  border: none;
  background: #fee2e2;
  color: #dc2626;
  border-radius: 6px;
  padding: 0.4rem 0.7rem;
  cursor: pointer;
}

.cart-summary {
  margin-top: 1.5rem;
}

.cart-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.clear-button {
  padding: 0.7rem 1rem;
  border: none;
  border-radius: 6px;
  background: #6b7280;
  color: #fff;
  cursor: pointer;
}

.checkout-button {
  padding: 0.7rem 1rem;
  border: none;
  border-radius: 6px;
  background: #42b983;
  color: #fff;
  cursor: pointer;
}
</style>