<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['back', 'order'])
</script>

<template>
  <div class="product-page">
    <button class="back-button" @click="emit('back')">
      Назад к товарам
    </button>

    <div class="product">
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

        <button class="order-button" @click="emit('order')">
          Оформить заказ
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

.back-button {
  margin-bottom: 1rem;
  padding: 0.6rem 1rem;
  border: none;
  background: #6b7280;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
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