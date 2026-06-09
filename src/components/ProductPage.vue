<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])
</script>

<template>
  <div class="product-page">
    <button class="close-button" @click="emit('close')">
      Закрыть товар
    </button>

    <div class="product-content">
      <img
        :src="product.image"
        :alt="product.title"
        class="product-page-image"
      >

      <div class="product-details">
        <p class="product-category">{{ product.category }}</p>

        <h2>{{ product.title }}</h2>

        <p class="product-price">${{ product.price }}</p>

        <p class="product-rating">
          ⭐ Рейтинг: {{ product.rating.rate }} / 5
          <span>({{ product.rating.count }} отзывов)</span>
        </p>

        <p class="product-description">
          {{ product.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-page {
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: #f8f9fa;
  border: 1px solid #ddd;
}

.close-button {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background: #e74c3c;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

.close-button:hover {
  background: #c0392b;
}

.product-content {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.product-page-image {
  width: 240px;
  height: 260px;
  object-fit: contain;
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
}

.product-details {
  text-align: left;
}

.product-category {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  background: #42b983;
  color: #fff;
  border-radius: 20px;
  font-size: 0.85rem;
}

.product-details h2 {
  margin: 1rem 0;
}

.product-price {
  font-size: 1.6rem;
  font-weight: bold;
  color: #42b983;
}

.product-rating span {
  color: #777;
}

.product-description {
  line-height: 1.5;
  color: #333;
}

@media (max-width: 700px) {
  .product-content {
    flex-direction: column;
  }

  .product-page-image {
    width: 100%;
  }
}
</style>