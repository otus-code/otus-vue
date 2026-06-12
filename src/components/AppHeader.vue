<script setup>
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { totalCount } = useCart()
const { isAuthenticated, logout } = useAuth()

function handleLogout() {
  logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <router-link to="/" class="logo">
        Fake Store
      </router-link>

      <nav class="nav">
        <router-link to="/">Каталог</router-link>

        <router-link :to="{ name: 'cart' }" class="cart-link">
          Корзина
          <span v-if="totalCount" class="cart-badge">{{ totalCount }}</span>
        </router-link>

        <router-link :to="{ name: 'createProduct' }">
          Создать товар
        </router-link>

        <router-link v-if="!isAuthenticated" :to="{ name: 'login' }">
          Войти
        </router-link>

        <button v-else class="logout-button" @click="handleLogout">
          Выйти
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: #111827;
  padding: 1rem;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.logo {
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.nav a {
  color: #d1d5db;
  text-decoration: none;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
}

.nav a.router-link-active {
  color: #fff;
  background: #1f2937;
}

.cart-link {
  position: relative;
}

.cart-badge {
  background: #42b983;
  color: #fff;
  border-radius: 999px;
  padding: 0 0.5rem;
  font-size: 0.8rem;
  margin-left: 0.3rem;
}

.logout-button {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  background: #ef4444;
  color: #fff;
  cursor: pointer;
}
</style>