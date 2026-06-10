<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  minPrice: {
    type: [String, Number],
    default: ''
  },
  maxPrice: {
    type: [String, Number],
    default: ''
  }
})

const emit = defineEmits([
  'update:title',
  'update:minPrice',
  'update:maxPrice',
  'home',
  'createProduct',
  'order'
])
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <button class="logo" @click="emit('home')">
        Fake Store
      </button>

      <form class="search-form" @submit.prevent>
        <input
          :value="title"
          type="text"
          placeholder="Поиск по названию"
          @input="emit('update:title', $event.target.value)"
        >

        <input
          :value="minPrice"
          type="number"
          min="0"
          placeholder="Цена от"
          @input="emit('update:minPrice', $event.target.value)"
        >

        <input
          :value="maxPrice"
          type="number"
          min="0"
          placeholder="Цена до"
          @input="emit('update:maxPrice', $event.target.value)"
        >
      </form>

      <nav class="nav">
        <button @click="emit('createProduct')">
          Создать товар
        </button>

        <button @click="emit('order')">
          Оформить заказ
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: #111827;
  color: #fff;
  padding: 1rem;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  align-items: center;
}

.logo {
  font-size: 1.2rem;
  font-weight: bold;
  background: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
}

.search-form {
  display: flex;
  gap: 0.5rem;
}

.search-form input {
  width: 100%;
  padding: 0.6rem;
  border: none;
  border-radius: 6px;
}

.nav {
  display: flex;
  gap: 0.5rem;
}

.nav button {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 6px;
  background: #42b983;
  color: #fff;
  cursor: pointer;
}

.nav button:hover {
  background: #35966a;
}

@media (max-width: 850px) {
  .header-inner {
    grid-template-columns: 1fr;
  }

  .search-form {
    flex-direction: column;
  }

  .nav {
    flex-direction: column;
  }
}
</style>