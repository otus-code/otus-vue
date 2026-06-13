<script setup>
import { useCartStore } from '../stores/cart'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
</script>

<template>
  <div class="cart-item">
    <div class="cart-item__image">
      <img :src="item.image" :alt="item.title" />
    </div>

    <div class="cart-item__info">
      <h3 class="cart-item__title">{{ item.title }}</h3>
      <span class="cart-item__price">{{ item.price }} $</span>
    </div>

    <div class="cart-item__controls">
      <button
        class="cart-item__qty-btn"
        @click="cartStore.decrement(item.id)"
      >
        −
      </button>
      <span class="cart-item__qty">{{ item.quantity }}</span>
      <button
        class="cart-item__qty-btn"
        @click="cartStore.increment(item.id)"
      >
        +
      </button>
    </div>

    <div class="cart-item__sum">
      {{ (item.price * item.quantity).toFixed(2) }} $
    </div>

    <button
      class="cart-item__remove"
      @click="cartStore.removeFromCart(item.id)"
    >
      Удалить
    </button>
  </div>
</template>

<style scoped>
.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr auto auto auto;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #e0e0e0;
}

.cart-item__image {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-item__image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.cart-item__title {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 6px;
}

.cart-item__price {
  font-size: 13px;
  color: #777;
}

.cart-item__controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-item__qty-btn {
  width: 28px;
  height: 28px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
}

.cart-item__qty-btn:hover {
  background: #f0f0f0;
}

.cart-item__qty {
  min-width: 24px;
  text-align: center;
  font-weight: 500;
}

.cart-item__sum {
  font-weight: 700;
  font-size: 16px;
  color: #2c3e50;
  min-width: 80px;
  text-align: right;
}

.cart-item__remove {
  padding: 6px 12px;
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.cart-item__remove:hover {
  background: #c0392b;
}
</style>