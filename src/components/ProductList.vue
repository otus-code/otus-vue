<script setup>
defineProps({
  products: {
    type: Array,
    required: true
  },
  selectedProductId: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['selectProduct'])
</script>

<template>
  <div class="products-list">
    <div
      v-for="product in products"
      :key="product.id"
      class="product-card"
      :class="{ active: product.id === selectedProductId }"
      @click="emit('selectProduct', product.id)"
    >
      <img
        :src="product.image"
        :alt="product.title"
        class="product-image"
      >

      <div class="product-info">
        <h3>{{ product.title }}</h3>
        <p class="category">{{ product.category }}</p>
        <p class="price">${{ product.price }}</p>
        <p class="rating">
          ⭐ {{ product.rating.rate }} / 5
          <span>({{ product.rating.count }})</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.product-card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  background: #fff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}

.product-card.active {
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.25);
}

.product-image {
  width: 100%;
  height: 160px;
  object-fit: contain;
  margin-bottom: 1rem;
}

.product-info h3 {
  font-size: 1rem;
  min-height: 48px;
  margin: 0 0 0.5rem;
}

.category {
  color: #777;
  font-size: 0.9rem;
  margin: 0.25rem 0;
}

.price {
  font-weight: bold;
  font-size: 1.1rem;
  color: #42b983;
}

.rating {
  font-size: 0.9rem;
}

.rating span {
  color: #777;
}
</style>